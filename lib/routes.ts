import { siteConfig } from "./constants";

export type SiteRoute = {
  path: string;
  /** Short label used in llms.txt link lists. */
  title: string;
  /** One-line summary of what an agent will find on the page. */
  summary: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
  /**
   * Source files that determine when this route's content last changed.
   * `npm run sync:routes` reads their git history to stamp the sitemap.
   */
  sources: string[];
};

/**
 * The public, indexable surface of the site — the single source of truth for
 * both `app/sitemap.ts` and the generated llms.txt.
 *
 * /blog is deliberately absent: the three posts listed there have no article
 * pages behind them, so advertising it to crawlers and LLMs pointed them at a
 * lead form. Add it back here the moment real posts ship.
 */
export const siteRoutes: SiteRoute[] = [
  {
    path: "",
    title: "Home",
    summary:
      "Company overview, the 5-level AI framework, portfolio, and case studies.",
    priority: 1,
    changeFrequency: "weekly",
    sources: ["app/page.tsx", "components/hero.tsx", "lib/constants.ts"],
  },
  {
    path: "/services",
    title: "Services",
    summary:
      "Full breakdown of all five service levels and the offerings inside each.",
    priority: 0.9,
    changeFrequency: "monthly",
    sources: ["app/services/page.tsx", "lib/constants.ts"],
  },
  {
    path: "/portfolio",
    title: "Portfolio",
    summary:
      "Live, openable project URLs, filterable by the framework level each one sits at.",
    priority: 0.9,
    changeFrequency: "monthly",
    sources: [
      "app/portfolio/page.tsx",
      "lib/portfolio.ts",
      "data/vercel-projects.json",
    ],
  },
  {
    path: "/pricing",
    title: "Pricing",
    summary:
      "Transparent INR pricing tiers plus FAQs on licensing and the engagement model.",
    priority: 0.8,
    changeFrequency: "monthly",
    sources: ["app/pricing/page.tsx", "lib/faqs.ts", "lib/constants.ts"],
  },
  {
    path: "/about",
    title: "About",
    summary: "Founder background, mission, and Bharat AI Mission alignment.",
    priority: 0.8,
    changeFrequency: "monthly",
    sources: ["app/about/page.tsx", "lib/founder.ts"],
  },
  {
    path: "/contact",
    title: "Contact",
    summary: "Book a free strategy call or send a project inquiry.",
    priority: 0.8,
    changeFrequency: "monthly",
    sources: ["app/contact/page.tsx"],
  },
  {
    path: "/ai-audit",
    title: "AI Audit",
    summary: "Free AI readiness audit that returns a scored maturity report.",
    priority: 0.8,
    changeFrequency: "monthly",
    sources: ["app/ai-audit/page.tsx", "lib/audit-report.ts"],
  },
  {
    path: "/rag-masterclass",
    title: "RAG Masterclass",
    summary: "Live RAG systems and architecture masterclass — agenda and pricing.",
    priority: 0.8,
    changeFrequency: "monthly",
    sources: ["app/rag-masterclass/page.tsx", "lib/events.ts"],
  },
];

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}
