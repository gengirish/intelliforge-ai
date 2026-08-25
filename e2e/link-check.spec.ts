import { test, expect, type APIRequestContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { caseStudies, navLinks } from "../lib/constants";
import { portfolioProjects } from "../lib/portfolio";

const BASE_URL =
  process.env.PLAYWRIGHT_BASE_URL ?? "https://www.intelliforge.tech";

const SITE_PAGES = [
  "/",
  "/services",
  "/pricing",
  "/about",
  "/blog",
  "/contact",
  "/ai-audit",
  ...navLinks
    .map((l) => l.href)
    .filter((h) => h.startsWith("/") && !h.includes("#")),
];

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const SOFT_OK = new Set([403, 405, 429]);

type AuditEntry = {
  url: string;
  status: number | "error";
  ok: boolean;
  source: string;
  note?: string;
};

async function checkUrl(
  request: APIRequestContext,
  page: Page,
  url: string,
  source: string,
): Promise<AuditEntry> {
  try {
    const response = await request.get(url, {
      maxRedirects: 5,
      timeout: 25_000,
      failOnStatusCode: false,
      headers: { "User-Agent": BROWSER_UA, Accept: "text/html" },
    });
    let status = response.status();

    if (status === 404 || status >= 500) {
      try {
        const nav = await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 25_000,
        });
        if (nav) status = nav.status();
      } catch {
        /* keep API status */
      }
    }

    const ok = status < 400 || SOFT_OK.has(status);
    return { url, status, ok, source, note: ok ? undefined : "broken" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { url, status: "error", ok: false, source, note: msg };
  }
}

function normalizeUrl(href: string, pageUrl: string): string | null {
  if (
    !href ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:") ||
    href === "#"
  )
    return null;
  if (href.startsWith("#")) return null;
  try {
    const resolved = new URL(href, pageUrl);
    if (resolved.protocol !== "http:" && resolved.protocol !== "https:")
      return null;
    resolved.hash = "";
    return resolved.toString();
  } catch {
    return null;
  }
}

test("full link audit — portfolio, crawl, and Vettd", async ({ page, request }) => {
  const entries: AuditEntry[] = [];
  const checked = new Set<string>();

  const portfolioUrls = [
    ...new Set([
      ...portfolioProjects.map((p) => p.url),
      ...caseStudies.map((c) => c.productUrl),
      "https://vettd-app.com/",
    ]),
  ];

  for (const url of portfolioUrls) {
    if (checked.has(url)) continue;
    checked.add(url);
    entries.push(await checkUrl(request, page, url, "portfolio/constants"));
  }

  for (const route of [...new Set(SITE_PAGES)]) {
    const pageUrl = `${BASE_URL}${route === "/" ? "" : route}`;
    await page.goto(pageUrl, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });

    const hrefs: string[] = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a[href]"))
        .map((a) => a.getAttribute("href"))
        .filter(Boolean) as string[],
    );

    for (const href of hrefs) {
      const normalized = normalizeUrl(href, pageUrl);
      if (!normalized || checked.has(normalized)) continue;
      checked.add(normalized);
      entries.push(await checkUrl(request, page, normalized, pageUrl));
    }
  }

  const broken = entries.filter((e) => !e.ok);
  const reportPath = path.join(process.cwd(), "e2e", "link-audit-report.json");
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        checkedAt: new Date().toISOString(),
        baseUrl: BASE_URL,
        total: entries.length,
        broken: broken.length,
        brokenLinks: broken,
        allEntries: entries,
      },
      null,
      2,
    ),
  );

  console.log("\n========== LINK AUDIT ==========");
  console.log(`Checked: ${entries.length} URLs | Broken: ${broken.length}`);
  console.log(`Report: ${reportPath}\n`);
  for (const b of broken) {
    console.log(`  [${b.status}] ${b.url}`);
    console.log(`         source: ${b.source}${b.note ? ` — ${b.note}` : ""}`);
  }
  console.log("================================\n");

  await page.goto("https://vettd-app.com/", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(/Vettd/i);

  const vettdEntry = entries.find((e) => e.url.includes("vettd-app.com"));
  expect(vettdEntry?.ok, "Vettd must be reachable").toBe(true);

  expect(
    broken.filter((b) => b.url.includes("vettd-app.com")),
    "Vettd interview platform link must work",
  ).toHaveLength(0);
});
