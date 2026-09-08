#!/usr/bin/env node
/**
 * Stamps each public route with the commit date of the files that actually
 * produce its content, and writes data/route-modified.json.
 *
 * The sitemap previously used `new Date()` for every URL, which told crawlers
 * that all pages changed on every deploy — a signal they learn to discount.
 *
 * Run after content changes (or via `npm run sync:routes`); the generated file
 * is committed so builds do not need git history available.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = resolve(root, "data/route-modified.json");

// Read the route registry without a TypeScript toolchain: the paths and source
// lists are plain string literals, so a targeted parse is enough and keeps this
// script dependency-free.
const registry = await import("node:fs").then(({ readFileSync }) =>
  readFileSync(resolve(root, "lib/routes.ts"), "utf8"),
);

const routes = [];
const blockPattern = /\{\s*path:\s*"([^"]*)",[\s\S]*?sources:\s*\[([\s\S]*?)\],\s*\}/g;
for (const match of registry.matchAll(blockPattern)) {
  const [, path, rawSources] = match;
  const sources = [...rawSources.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  routes.push({ path, sources });
}

if (routes.length === 0) {
  console.error("No routes parsed from lib/routes.ts — aborting.");
  process.exit(1);
}

function lastCommitDate(sources) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...sources],
      { cwd: root, encoding: "utf8" },
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

const now = new Date().toISOString();
const modified = {};
for (const route of routes) {
  const date = lastCommitDate(route.sources);
  if (!date) {
    console.warn(`No git history for ${route.path || "/"} — falling back to now.`);
  }
  modified[route.path] = date ?? now;
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(modified, null, 2)}\n`);
console.log(`Wrote ${Object.keys(modified).length} route dates to data/route-modified.json`);
