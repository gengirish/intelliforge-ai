import { test, expect, type BrowserContext, type Locator } from "@playwright/test";
import path from "node:path";

/**
 * End-to-end proof that every "Book a Strategy Call" CTA on the deployed site
 * opens the real Calendly booking page (not the /contact fallback). Runs
 * against PLAYWRIGHT_BASE_URL (defaults to production — see playwright.config.ts).
 *
 * Screenshot + video evidence is written to e2e/evidence/ so each scenario has
 * a visual record, not just an assertion result.
 */
test.use({ video: "on", screenshot: "on" });

const EVIDENCE_DIR = path.join(process.cwd(), "e2e", "evidence", "screenshots");
const shot = (name: string) => path.join(EVIDENCE_DIR, name);

const CALENDLY_URL_PATTERN = /calendly\.com\/gen-girish\/30min/;

/** Click a CTA, wait for its popup to fully settle, screenshot it, and assert it's the real booking widget. */
async function clickAndCapturePopup(
  context: BrowserContext,
  cta: Locator,
  screenshotName: string,
) {
  const [popup] = await Promise.all([context.waitForEvent("page"), cta.click()]);
  await popup.waitForLoadState("domcontentloaded");
  await popup.waitForLoadState("networkidle").catch(() => {});
  await expect(popup.getByText(/AI Strategy Call/i).first()).toBeVisible({ timeout: 15_000 });
  await popup.screenshot({ path: shot(screenshotName), fullPage: true });

  expect(popup.url()).toMatch(CALENDLY_URL_PATTERN);
  await popup.close();
}

test.describe("Book Your Strategy Call — end to end", () => {
  test("homepage hero CTA opens the Calendly booking page", async ({ page, context }) => {
    await page.goto("/");
    // The homepage has a second, visually distinct CTA with identical text
    // further down the page (the closing section) — testId disambiguates.
    const cta = page.getByTestId("hero-book-call-cta");
    await expect(cta).toBeVisible();
    await page.screenshot({ path: shot("01-homepage-hero.png") });

    await expect(cta).toHaveAttribute("href", CALENDLY_URL_PATTERN);
    await expect(cta).toHaveAttribute("target", "_blank");

    await clickAndCapturePopup(context, cta, "02-hero-calendly-popup.png");
  });

  test("desktop navbar CTA opens the Calendly booking page", async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services");

    const cta = page.getByTestId("navbar-book-call-cta-desktop");
    await expect(cta).toBeVisible();
    await page.screenshot({ path: shot("03-navbar-desktop-services.png") });

    await expect(cta).toHaveAttribute("href", CALENDLY_URL_PATTERN);

    await clickAndCapturePopup(context, cta, "04-navbar-calendly-popup.png");
  });

  test("mobile navbar CTA opens the Calendly booking page", async ({ page, context }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileCta = page.getByTestId("navbar-book-call-cta-mobile");
    await expect(mobileCta).toBeVisible();
    // The mobile menu panel animates open (grid-template-rows 0fr -> 1fr,
    // 0.28s — app/globals.css .collapsible). The link is interactive as soon
    // as it's un-inert, before the animation finishes, so wait it out before
    // screenshotting or the panel is caught mid-collapse.
    await page.waitForTimeout(350);
    await page.screenshot({ path: shot("05-mobile-menu-open.png") });

    await expect(mobileCta).toHaveAttribute("href", CALENDLY_URL_PATTERN);

    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      mobileCta.click(),
    ]);
    await popup.waitForLoadState("domcontentloaded");
    await popup.waitForLoadState("networkidle").catch(() => {});
    await popup.setViewportSize({ width: 390, height: 844 });
    await expect(popup.getByText(/AI Strategy Call/i).first()).toBeVisible({ timeout: 15_000 });
    await popup.screenshot({ path: shot("06-mobile-calendly-popup.png"), fullPage: true });

    expect(popup.url()).toMatch(CALENDLY_URL_PATTERN);
    await popup.close();
  });

  test("homepage closing-section CTA opens the Calendly booking page", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    const cta = page.getByTestId("closing-book-call-cta");
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
    await page.screenshot({ path: shot("10-homepage-closing-cta.png") });

    await expect(cta).toHaveAttribute("href", CALENDLY_URL_PATTERN);

    await clickAndCapturePopup(context, cta, "11-closing-cta-calendly-popup.png");
  });

  test("contact page booking card opens Calendly instead of scrolling to the form", async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/contact");

    const cta = page.getByTestId("contact-book-call-cta");
    await expect(cta).toBeVisible();
    await page.screenshot({ path: shot("07-contact-page.png") });

    // Regression guard for the exact bug BookCallLink exists to prevent: on
    // /contact the fallback link used to point at /contact itself (a dead
    // same-route navigation). It must go straight to Calendly instead.
    await expect(cta).toHaveAttribute("href", CALENDLY_URL_PATTERN);
    await expect(cta).not.toHaveAttribute("href", /^#|\/contact$/);

    await clickAndCapturePopup(context, cta, "08-contact-calendly-popup.png");
  });

  test("Calendly booking page renders a live, bookable widget", async ({ page }) => {
    // This hits calendly.com directly (a third-party page, not our own site)
    // as the last test in a video-recording run, after five prior tests have
    // kept ffmpeg busy encoding — give it more room than the other, same-origin
    // scenarios so contention doesn't make an otherwise-fine load flaky.
    test.slow();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("https://calendly.com/gen-girish/30min");
    await page.waitForLoadState("networkidle").catch(() => {});

    await expect(page.getByText(/AI Strategy Call/i).first()).toBeVisible({ timeout: 30_000 });
    // A real, active Calendly widget renders a month calendar grid with at
    // least one enabled, bookable day — proof this isn't a broken/removed
    // event type. Calendly gives each day button an accessible name like
    // "Friday, September 4 - Times available" (disabled days say "No times
    // available"), so match on that rather than the visible digit.
    await expect(
      page.getByRole("button", { name: /Times available/ }).first(),
    ).toBeVisible({ timeout: 15_000 });
    await page.screenshot({ path: shot("09-calendly-widget-live.png"), fullPage: true });
  });
});
