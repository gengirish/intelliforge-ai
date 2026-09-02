#!/usr/bin/env node
/**
 * Read the booking link straight from Calendly so the slug is never typed by hand.
 *
 *   node scripts/sync-calendly.mjs                  # list active event types
 *   node scripts/sync-calendly.mjs --write          # also set NEXT_PUBLIC_CALENDLY_URL in .env.local
 *   node scripts/sync-calendly.mjs --write --slug 30min
 *
 * Needs a Calendly personal access token (any plan, including Free) from
 * Calendly → Integrations → API & Webhooks. Put it in .env.local as
 * CALENDLY_API_TOKEN=... — it is read from there, never printed, and .env.local
 * is gitignored. Read-only against Calendly; the only thing written is the
 * NEXT_PUBLIC_CALENDLY_URL line in .env.local.
 *
 * NEXT_PUBLIC_* is inlined at build time, so after this you still need the same
 * value in the Vercel project env plus a redeploy.
 */
import fs from "node:fs";
import path from "node:path";

const API = process.env.CALENDLY_API_BASE || "https://api.calendly.com";
const ENV_FILE = path.join(process.cwd(), ".env.local");
const ENV_KEY = "NEXT_PUBLIC_CALENDLY_URL";

const args = process.argv.slice(2);
const shouldWrite = args.includes("--write");
const slugFlag = args.indexOf("--slug");
const wantedSlug = slugFlag === -1 ? undefined : args[slugFlag + 1];
if (slugFlag !== -1 && (!wantedSlug || wantedSlug.startsWith("--"))) {
  console.error("\n✖ --slug needs a value, e.g. --slug 30min\n");
  process.exit(1);
}

function readEnvFile() {
  if (!fs.existsSync(ENV_FILE)) return {};
  const env = {};
  for (const line of fs.readFileSync(ENV_FILE, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!match) continue;
    env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

async function calendly(url, token) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 401) fail("Calendly rejected the token (401). Regenerate CALENDLY_API_TOKEN in Calendly → Integrations → API & Webhooks.");
  if (!res.ok) fail(`Calendly returned ${res.status} for ${url.replace(API, "")}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

const token = process.env.CALENDLY_API_TOKEN || readEnvFile().CALENDLY_API_TOKEN;
if (!token) {
  fail(
    "No CALENDLY_API_TOKEN found.\n" +
      "  1. Calendly → Integrations → API & Webhooks → generate a personal access token\n" +
      "  2. Add CALENDLY_API_TOKEN=<token> to .env.local (gitignored)"
  );
}

const { resource: user } = await calendly(`${API}/users/me`, token);
const { collection } = await calendly(
  `${API}/event_types?user=${encodeURIComponent(user.uri)}&active=true&count=100`,
  token
);

if (collection.length === 0) {
  fail(`No active event types on ${user.scheduling_url}. Create one in Calendly first (a new account normally ships with "30 Minute Meeting").`);
}

console.log(`\nCalendly user: ${user.name} (${user.scheduling_url})\n`);
for (const et of collection) {
  console.log(`  ${et.duration} min  ${et.name}`);
  console.log(`           ${et.scheduling_url}`);
}

if (!shouldWrite) {
  console.log(`\nRe-run with --write to set ${ENV_KEY} in .env.local.\n`);
  process.exit(0);
}

const bySlug = wantedSlug
  ? collection.filter((et) => et.scheduling_url.endsWith(`/${wantedSlug}`))
  : collection.filter((et) => et.duration === 30);

if (bySlug.length !== 1) {
  fail(
    wantedSlug
      ? `--slug ${wantedSlug} matched ${bySlug.length} event types. Use the slug at the end of one of the URLs above.`
      : `Expected exactly one 30-minute event type, found ${bySlug.length}. Re-run with --slug <slug> to pick one.`
  );
}

const url = bySlug[0].scheduling_url;
const existing = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, "utf8") : "";
const assignment = new RegExp(`^\s*${ENV_KEY}\s*=.*$`, "m");
const updated = assignment.test(existing)
  ? existing.replace(assignment, `${ENV_KEY}=${url}`)
  : `${existing}${existing.endsWith("\n") || existing === "" ? "" : "\n"}${ENV_KEY}=${url}\n`;

fs.writeFileSync(ENV_FILE, updated);

console.log(`\n✔ ${ENV_KEY}=${url}`);
console.log(`  written to .env.local — restart \`npm run dev\` to pick it up.`);
console.log(`  Also add it to the Vercel project env (Production/Preview/Development) and redeploy;`);
console.log(`  NEXT_PUBLIC_* is inlined at build time, so a dashboard change alone won't reach the live site.\n`);
