import vercelProjects from "@/data/vercel-projects.json";
import type { PortfolioProject } from "./constants";

/** Vercel slugs excluded from public portfolio (infra, duplicates, client one-offs) */
/**
 * Portfolio entries are curated only: a project appears here when it has an
 * entry in PORTFOLIO_META with real copy, and its Vercel deploy is live.
 * New deploys from `npm run sync:vercel` do NOT surface automatically — add a
 * PORTFOLIO_META entry for anything you want shown.
 */
export const FEATURED_VERCEL_SLUGS = [
  "multi-agent-deep-research",
  "complianceforge",
  "ai-native-agency",
  "interview-with-giri",
  "training-feedback",
  "campaignforge-ai",
] as const;

/**
 * The landing-page showcase — deliberately short, and every entry is a product
 * whose production URL was manually verified to load. Keep this list curated by
 * hand: do NOT wire it back to `featured`, or dead Vercel deploys leak onto the
 * homepage again. Re-verify before adding a slug here.
 */
export const HOMEPAGE_SLUGS = [
  "multi-agent-deep-research",
  "complianceforge",
  "interview-with-giri",
  "ai-native-agency",
  "training-feedback",
  "campaignforge-ai",
] as const;

type PortfolioMeta = Omit<PortfolioProject, "url"> & { vercelSlug: string };

/** Curated copy + levels; URLs come from Vercel production deploys */
const PORTFOLIO_META: PortfolioMeta[] = [
  {
    vercelSlug: "digital-product-ai",
    title: "AI Digital Profile",
    description:
      'Interactive portfolio with a "Talk to My Resume" AI chatbot, neural-themed design, and SEO — built and deployed in hours.',
    tagline: "Your resume, but it talks back to recruiters.",
    tags: ["Next.js", "AI Chatbot", "Portfolio", "RAG", "Vercel"],
    levels: [4, 5],
    icon: "UserCircle",
  },
  {
    vercelSlug: "multi-agent-deep-research",
    title: "Multi-Agent Deep Research",
    description:
      "AI deep-research platform where multiple agents work in parallel to produce cited reports — fast and autonomous.",
    tagline: "Parallel AI agents that compile cited research reports in minutes.",
    tags: ["Multi-Agent", "RAG", "LLM", "Deep Research"],
    levels: [4, 5],
    icon: "Brain",
    featured: true,
  },
  {
    vercelSlug: "markdown-to-pdf",
    title: "IntelliForge Certs",
    description:
      "Markdown editor with live preview and server-side PDF generation for certificates and professional documents.",
    tags: ["React", "PDF", "Documents", "Full Stack"],
    levels: [5],
    icon: "FileText",
  },
  {
    vercelSlug: "youtube-scrapper",
    title: "YouTube Transcript Scraper",
    description:
      "Extract transcripts from any YouTube video — API-ready for n8n, Zapier, and Make automation workflows.",
    tags: ["API", "n8n", "Zapier", "Automation"],
    levels: [2, 5],
    icon: "Play",
  },
  {
    vercelSlug: "movemore",
    title: "MoveMore",
    description:
      "AI-powered wellness platform helping users build healthier movement routines with a conversion-first UX.",
    tags: ["Wellness", "AI App", "Next.js"],
    levels: [5],
    icon: "Zap",
  },
  {
    vercelSlug: "interview-with-giri",
    title: "Vettd",
    description:
      "AI hiring intelligence OS — 45-minute structured interviews, scored reports, integrity monitoring, and free candidate practice.",
    tagline: "Structured AI interviews with scored reports and integrity signals.",
    tags: ["Interview AI", "Hiring", "SaaS", "HR Tech"],
    levels: [4, 5],
    icon: "UserCircle",
    featured: true,
  },
  {
    vercelSlug: "training-feedback",
    title: "IntelliForge Learning",
    description:
      "End-to-end AI learning platform for registration, training access, progress tracking, and feedback.",
    tagline: "Register, train, track progress, and collect feedback at scale.",
    tags: ["LMS", "AI Training", "Learning Platform"],
    levels: [1, 2, 5],
    icon: "FileText",
    featured: true,
  },
  {
    vercelSlug: "learning-bootcamp",
    title: "IntelliForge Upskill",
    description:
      "Bootcamp-style upskilling portal for AI foundations, workshops, and structured learning paths.",
    tags: ["LMS", "Bootcamp", "AI Training"],
    levels: [1, 2],
    icon: "FileText",
  },
  {
    vercelSlug: "complianceforge",
    title: "ComplianceForge AI",
    description:
      "AI compliance and governance — automates policy reviews, risk assessments, and audit trails for regulated industries.",
    tagline: "Automate policy reviews, risk assessments, and audit trails.",
    tags: ["Compliance", "GRC", "AI Agents", "Enterprise"],
    levels: [4, 5],
    icon: "ShieldCheck",
    featured: true,
  },
  {
    vercelSlug: "aegisforge",
    title: "AegisForge",
    description:
      "AI security platform monitoring agents, prompts, and workflows for misuse, jailbreaks, and policy violations.",
    tags: ["AI Security", "Guardrails", "LLM Safety"],
    levels: [4, 5],
    icon: "Shield",
  },
  {
    vercelSlug: "pdfforge-frontend",
    title: "PDFForge",
    description:
      "Document toolkit — generate, transform, sign, and extract data from PDFs with AI parsing and templates.",
    tags: ["PDF", "Document AI", "OCR", "SaaS"],
    levels: [2, 5],
    icon: "FilePlus",
  },
  {
    vercelSlug: "ai-native-agency",
    title: "AgencyOS",
    description:
      "Operating system for AI-native agencies — clients, content pipelines, agents, and deliverables in one workspace.",
    tagline: "One workspace for clients, content pipelines, and AI agents.",
    tags: ["Agency", "Operations", "AI Workflows", "SaaS"],
    levels: [3, 4, 5],
    icon: "Briefcase",
    featured: true,
  },
  {
    vercelSlug: "interviewcopilot",
    title: "InfinityHire",
    description:
      "AI interview copilot — structured plans, real-time scoring, and decision-ready scorecards for hiring teams.",
    tags: ["HR Tech", "Interview AI", "Hiring"],
    levels: [4, 5],
    icon: "Users",
  },
  {
    vercelSlug: "hrms-intelliforge",
    title: "HRMS IntelliForge",
    description:
      "Lightweight HRMS for AI-first teams — records, leave, payroll insights, and AI-assisted performance reviews.",
    tags: ["HRMS", "People Ops", "Enterprise"],
    levels: [5],
    icon: "Users",
  },
  {
    vercelSlug: "campaignforge-ai",
    title: "CampaignForge AI",
    description:
      "End-to-end AI marketing campaigns — ideation, copy, creatives, channels, and performance via multi-agent orchestration.",
    tags: ["Marketing AI", "Multi-Agent", "Campaigns"],
    levels: [3, 4, 5],
    icon: "Megaphone",
    featured: true,
  },
  {
    vercelSlug: "linkedin-post-generator",
    title: "LinkedIn Post Generator",
    description:
      "Turn ideas, links, or transcripts into high-performing LinkedIn posts with hooks and your voice.",
    tags: ["Content AI", "LinkedIn", "Copywriting"],
    levels: [3, 5],
    icon: "Linkedin",
  },
  {
    vercelSlug: "meetcoach",
    title: "MeetCoach",
    description:
      "Real-time AI meeting coach — talk-time, sentiment, and actionable feedback after every sales or leadership call.",
    tags: ["Meeting AI", "Sales Enablement", "Coaching"],
    levels: [4, 5],
    icon: "Mic",
  },
  {
    vercelSlug: "medforce",
    title: "MedForce",
    description:
      "Clinical workflow assistant — documentation, encounter summaries, and care plans with audit-ready compliance.",
    tags: ["Healthcare AI", "Clinical", "Documentation"],
    levels: [4, 5],
    icon: "HeartPulse",
  },
  {
    vercelSlug: "mortgageflowai",
    title: "MortgageFlowAI",
    description:
      "AI loan origination — document collection, underwriting checks, and borrower communication automation.",
    tags: ["Fintech", "Lending", "Document AI"],
    levels: [4, 5],
    icon: "Building",
  },
  {
    vercelSlug: "fleetos",
    title: "FleetOS",
    description:
      "AI fleet management — vehicle tracking, predictive maintenance, route optimization, and ops dashboard.",
    tags: ["Logistics", "Fleet", "IoT", "Operations"],
    levels: [4, 5],
    icon: "Truck",
  },
  {
    vercelSlug: "restaurantbrain",
    title: "RestaurantBrain",
    description:
      "Restaurant ops AI — menu engineering, demand forecasting, review intelligence, and staff scheduling.",
    tags: ["F&B", "Forecasting", "Vertical SaaS"],
    levels: [4, 5],
    icon: "Utensils",
  },
  {
    vercelSlug: "pr-reviewer",
    title: "PR Reviewer",
    description:
      "AI code-review agent for pull requests — flags risk, suggests fixes, and posts inline comments.",
    tags: ["Developer Tools", "Code Review", "GitHub"],
    levels: [4, 5],
    icon: "GitPullRequest",
  },
  {
    vercelSlug: "rlhf-annotation-studio",
    title: "RLHF Annotation Studio",
    description:
      "Annotation platform for RLHF, SFT, and red-teaming — built for AI labs fine-tuning LLMs.",
    tags: ["RLHF", "LLM Training", "Annotation"],
    levels: [4, 5],
    icon: "Database",
  },
  {
    vercelSlug: "sopforge",
    title: "SOPForge",
    description:
      "AI-generated SOPs from recordings, transcripts, or notes — structured, versioned procedures teams follow.",
    tags: ["Operations", "SOP", "Knowledge Base"],
    levels: [2, 3, 5],
    icon: "ClipboardList",
  },
  {
    vercelSlug: "agentwatch",
    title: "AgentWatch",
    description:
      "Observability for AI agents — trace steps, score outputs, catch regressions in multi-agent systems.",
    tags: ["Observability", "AI Agents", "Monitoring"],
    levels: [4, 5],
    icon: "Activity",
  },
  {
    vercelSlug: "buildwithaigiri",
    title: "MVPLabs",
    description:
      "Rapid AI MVP lab — describe features, ship micro-SaaS and AI products in days with vibe coding workflows.",
    tags: ["MVP", "Micro-SaaS", "AI Apps"],
    levels: [5],
    icon: "Zap",
  },
  {
    vercelSlug: "aios-landing",
    title: "AIOS",
    description:
      "AI operating system landing and product hub for IntelliForge's agent-native platform vision.",
    tags: ["Platform", "AI Agents", "Landing"],
    levels: [4, 5],
    icon: "Briefcase",
  },
  {
    vercelSlug: "prompt-engg",
    title: "Prompt Engineering Lab",
    description:
      "Interactive prompt engineering practice environment with PRD method exercises and templates.",
    tags: ["Prompt Engineering", "Training", "Level 1"],
    levels: [1, 2],
    icon: "FileText",
  },
  {
    vercelSlug: "citeforge",
    title: "CiteForge",
    description:
      "AI citation and reference management for research writing with automated source verification.",
    tags: ["Research", "Citations", "Academic AI"],
    levels: [4, 5],
    icon: "FileText",
  },
  {
    vercelSlug: "job-hunt-forge",
    title: "Forge Ahead",
    description:
      "AI job search copilot — tailored applications, interview prep, and pipeline tracking for candidates.",
    tags: ["Career", "Job Search", "AI Copilot"],
    levels: [4, 5],
    icon: "Briefcase",
  },
  {
    vercelSlug: "thesis-radar",
    title: "Thesis Radar",
    description:
      "Research thesis discovery and trend radar powered by AI literature scanning and summarization.",
    tags: ["Research", "Academic", "AI"],
    levels: [4, 5],
    icon: "Brain",
  },
  {
    vercelSlug: "contentforge",
    title: "ContentForge",
    description:
      "Multi-format AI content pipeline — blogs, social, email, and ad copy with brand consistency.",
    tags: ["Content AI", "Marketing", "Automation"],
    levels: [3, 4],
    icon: "Megaphone",
  },
  {
    vercelSlug: "creditforge",
    title: "CreditForge",
    description:
      "AI credit analysis and underwriting assistant for lenders and fintech teams.",
    tags: ["Fintech", "Credit", "Underwriting"],
    levels: [4, 5],
    icon: "Building",
  },
  {
    vercelSlug: "examforge",
    title: "ExamForge",
    description:
      "AI exam generation, proctoring insights, and assessment analytics for educators and trainers.",
    tags: ["EdTech", "Assessment", "AI"],
    levels: [4, 5],
    icon: "FileText",
  },
  {
    vercelSlug: "gaas",
    title: "GaaS",
    description:
      "Generative AI as a Service platform for deploying and managing AI capabilities at scale.",
    tags: ["Platform", "Generative AI", "Enterprise"],
    levels: [4, 5],
    icon: "Zap",
  },
  {
    vercelSlug: "ycworthy",
    title: "YC Worthy",
    description:
      "Startup idea validator and pitch refinement tool powered by AI market and competitor analysis.",
    tags: ["Startups", "Validation", "Pitch"],
    levels: [5],
    icon: "Zap",
  },
  {
    vercelSlug: "hridlink",
    title: "HRIDLink",
    description:
      "HR identity and employee lifecycle linking platform with AI-assisted onboarding workflows.",
    tags: ["HR Tech", "Identity", "Onboarding"],
    levels: [4, 5],
    icon: "Users",
  },
  {
    vercelSlug: "ai-financial-analyst",
    title: "AI Financial Analyst",
    description:
      "AI copilot for financial modeling, earnings analysis, and investor-ready report generation.",
    tags: ["Fintech", "Analytics", "Copilot"],
    levels: [4, 5],
    icon: "Building",
  },
  {
    vercelSlug: "remoteforge-web",
    title: "RemoteForge",
    description:
      "Remote team operations hub with AI standups, async updates, and distributed workflow automation.",
    tags: ["Remote Work", "Ops", "Automation"],
    levels: [2, 4],
    icon: "Users",
  },
  {
    vercelSlug: "awaazos",
    title: "AwaazOS",
    description:
      "Voice-first AI platform for multilingual content creation and audio workflow automation.",
    tags: ["Voice AI", "Audio", "Multilingual"],
    levels: [3, 4],
    icon: "Mic",
  },
  {
    vercelSlug: "masterclass-first-agent",
    title: "First Agent Masterclass",
    description:
      "Hands-on course environment for building your first autonomous AI agent from scratch.",
    tags: ["Training", "Agents", "Workshop"],
    levels: [1, 4],
    icon: "FileText",
  },
];

const metaBySlug = new Map(PORTFOLIO_META.map((m) => [m.vercelSlug, m]));

const urlBySlug = new Map(
  vercelProjects.projects
    .filter((p) => p.productionUrl)
    .map((p) => [p.slug, p.productionUrl as string]),
);

export function buildPortfolioProjects(): PortfolioProject[] {
  const projects: PortfolioProject[] = [];

  for (const meta of PORTFOLIO_META) {
    const url = urlBySlug.get(meta.vercelSlug);
    if (!url) continue;
    const { vercelSlug: _, ...rest } = meta;
    projects.push({
      ...rest,
      url,
      featured:
        rest.featured ??
        FEATURED_VERCEL_SLUGS.includes(
          meta.vercelSlug as (typeof FEATURED_VERCEL_SLUGS)[number],
        ),
    });
  }

  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.title.localeCompare(b.title);
  });
}

export const portfolioProjects = buildPortfolioProjects();

/** Landing-page projects, in `HOMEPAGE_SLUGS` order, skipping any dropped deploy. */
export function getHomepagePortfolio(): PortfolioProject[] {
  const projects: PortfolioProject[] = [];
  for (const slug of HOMEPAGE_SLUGS) {
    const meta = metaBySlug.get(slug);
    const url = urlBySlug.get(slug);
    if (!meta || !url) continue;
    const { vercelSlug: _, ...rest } = meta;
    projects.push({ ...rest, url, featured: true });
  }
  return projects;
}

export const homepagePortfolio = getHomepagePortfolio();

export const vercelSyncMeta = {
  syncedAt: vercelProjects.syncedAt,
  totalVercelProjects: vercelProjects.total,
  withProductionUrl: vercelProjects.withProductionUrl,
};
