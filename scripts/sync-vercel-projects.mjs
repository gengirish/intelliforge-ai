#!/usr/bin/env node
/**
 * Pull all Vercel projects for girish-hiremaths-projects and write data/vercel-projects.json
 * Usage: node scripts/sync-vercel-projects.mjs
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const TEAM_SCOPE = "team_PsUWYasoQF6BYqGVcJUyL8wt";
const OUT = path.join(process.cwd(), "data", "vercel-projects.json");

function parseProjectTable(output) {
  const projects = [];
  for (const line of output.split("\n")) {
    const urlMatch = line.match(/(https?:\/\/[^\s]+|--)/);
    if (!urlMatch) continue;

    const slug = line.slice(0, urlMatch.index).trim();
    if (!slug || slug === "Project Name" || slug.startsWith(">")) continue;

    const afterUrl = line.slice(urlMatch.index + urlMatch[0].length).trim();
    const parts = afterUrl.split(/\s+/);
    const updated = parts[0] ?? "";
    const nodeVersion = parts[1] ?? "";

    projects.push({
      slug,
      productionUrl: urlMatch[0] === "--" ? null : urlMatch[0],
      updated,
      nodeVersion,
    });
  }
  return projects;
}

function fetchAllProjects() {
  const all = [];
  let nextFlag = "";
  for (let page = 0; page < 10; page++) {
    const cmd = nextFlag
      ? `vercel project ls --scope ${TEAM_SCOPE} --next ${nextFlag}`
      : `vercel project ls --scope ${TEAM_SCOPE}`;
    const output = execSync(`${cmd} 2>&1`, {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
    all.push(...parseProjectTable(output));
    const nextMatch = output.match(/--next (\d+)/);
    if (!nextMatch) break;
    nextFlag = nextMatch[1];
  }
  const bySlug = new Map();
  for (const p of all) bySlug.set(p.slug, p);
  return [...bySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

const projects = fetchAllProjects();
const withUrl = projects.filter((p) => p.productionUrl);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(
  OUT,
  JSON.stringify(
    {
      syncedAt: new Date().toISOString(),
      team: "girish-hiremaths-projects",
      teamScope: TEAM_SCOPE,
      total: projects.length,
      withProductionUrl: withUrl.length,
      projects,
    },
    null,
    2,
  ),
);

console.log(`Synced ${projects.length} Vercel projects (${withUrl.length} with production URLs)`);
console.log(`Written to ${OUT}`);
