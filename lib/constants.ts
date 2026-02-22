export const siteConfig = {
  name: "IntelliForge AI",
  tagline: "AI Solutions for Every Level of Your Business",
  description:
    "IntelliForge AI is a Hyderabad-based AI agency offering end-to-end AI solutions — from prompt engineering to full app development. Aligned with the Bharat AI Mission.",
  url: "https://intelliforge.tech",
  founder: "The IntelliForge Team",
  email: "contact@intelliforge.tech",
  phone: "+91-XXXXXXXXXX",
  whatsapp: "91XXXXXXXXXX",
  address: "Virtual Office, Hyderabad, Telangana, India",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export type ServiceLevel = {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  offerings: string[];
};

export const services: ServiceLevel[] = [
  {
    level: 1,
    title: "AI Foundations & Training",
    subtitle: "Learn to speak AI's language",
    icon: "BookOpen",
    description:
      "Master prompt engineering with the PRD method (Problem, Role, Deliverable). We train your team to get real, actionable output from AI — not garbage. This is where everything starts.",
    offerings: [
      "Prompt Engineering Workshops (PRD Method)",
      "AI Readiness Assessments",
      "Team Upskilling Programs",
      "Tool Selection & Setup (ChatGPT, Claude, Perplexity, Notebook LM)",
      "Custom Prompt Libraries for Your Business",
    ],
  },
  {
    level: 2,
    title: "AI Workflow Automation",
    subtitle: "Connect AI to your entire business",
    icon: "Workflow",
    description:
      "Stop doing busy work permanently. We implement RAG and MCP integrations that connect AI to your Slack, email, calendar, CRM — your entire operation. AI that knows your data gives accurate answers, not hallucinations.",
    offerings: [
      "RAG (Retrieval-Augmented Generation) Implementations",
      "MCP (Model Context Protocol) Integrations",
      "Business Tool Automation (Slack, Email, Calendar, CRM)",
      "Context Stack Design & Optimization",
      "Custom Knowledge Base Setup",
    ],
  },
  {
    level: 3,
    title: "AI Creative Studio",
    subtitle: "Become a one-person agency",
    icon: "Palette",
    description:
      "Build production-grade content pipelines at scale. Tool chaining from image generation to video to audio — all with brand consistency. What used to take teams of five now takes one person and AI.",
    offerings: [
      "AI Content Production Pipelines",
      "Image Generation (Midjourney, DALL-E, Nano Banana Pro)",
      "Video Production (Cling, VO3, Sora)",
      "Voice Cloning & Audio (ElevenLabs, Suno)",
      "Brand-Consistent Visual Systems",
    ],
  },
  {
    level: 4,
    title: "AI Agent Development",
    subtitle: "Your 24/7 digital workforce",
    icon: "Bot",
    description:
      "Build autonomous AI agents that work for you around the clock. Not chatbots — agents that proactively go and do things. Design, deploy, monitor, and quality-check AI systems that handle real business operations.",
    offerings: [
      "Custom Autonomous Agent Design & Deployment",
      "n8n / Make.com / Zapier Workflow Automation",
      "Multi-Agent AI Systems",
      "Agent Monitoring, QA & Human-in-the-Loop Oversight",
      "LLM Fine-Tuning & Alignment (RLHF, SFT)",
    ],
  },
  {
    level: 5,
    title: "AI App Development",
    subtitle: "Vibe coding — build without limits",
    icon: "Code",
    description:
      "Build real applications without traditional development constraints. Describe what you want, we architect, build, and ship it. From micro-SaaS tools to full dashboards — this level is creating the most income right now.",
    offerings: [
      "Micro-SaaS Tool Development",
      "Custom Dashboard & Admin Panel Building",
      "MVP Rapid Prototyping",
      "Full-Stack AI Applications",
      "Enterprise Software Solutions (Java, Spring Boot, Angular, React)",
    ],
  },
];

export type PricingTier = {
  name: string;
  levels: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    levels: "Levels 1–2",
    price: "₹49,999",
    period: "per project",
    description:
      "Perfect for teams getting started with AI. Master prompt engineering and connect AI to your workflows.",
    features: [
      "Prompt Engineering Workshop (PRD Method)",
      "AI Readiness Assessment",
      "Tool Selection & Setup",
      "Basic Workflow Automation",
      "2 MCP Integrations",
      "Email & Chat Support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    levels: "Levels 1–4",
    price: "₹1,49,999",
    period: "per project",
    description:
      "Full AI transformation — from foundations through agent development. The complete toolkit.",
    features: [
      "Everything in Starter",
      "RAG Implementation",
      "AI Creative Pipeline Setup",
      "Custom Agent Development",
      "Multi-Agent System Design",
      "Agent Monitoring & QA",
      "Priority Support",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    levels: "All 5 Levels",
    price: "Custom",
    period: "tailored engagement",
    description:
      "End-to-end AI transformation including full app development. For businesses ready to lead with AI.",
    features: [
      "Everything in Professional",
      "Custom App Development (Vibe Coding)",
      "Micro-SaaS / Dashboard Building",
      "Enterprise Integration (Java, Spring Boot)",
      "LLM Fine-Tuning & Alignment",
      "Dedicated AI Consultant",
      "Ongoing Maintenance & Support",
    ],
    highlighted: false,
    cta: "Contact Us",
  },
];

export const trustItems = [
  "13+ Years Experience",
  "Fortune 500 Clients",
  "Banking & Fintech",
  "Pharma & Healthcare",
  "Telecom & IoT",
  "LLM Trainer & Evaluator",
];

export type PortfolioProject = {
  title: string;
  description: string;
  url: string;
  tags: string[];
  levels: number[];
  icon: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Multi-Agent Deep Research",
    description:
      "AI-powered deep research platform using multiple agents working in parallel to generate comprehensive research reports with citations — fast and autonomous.",
    url: "https://multi-agent-deep-research-eight.vercel.app/research",
    tags: ["Multi-Agent", "RAG", "LLM", "Deep Research", "Autonomous"],
    levels: [4, 5],
    icon: "Brain",
  },
  {
    title: "YouTube Transcript Scraper",
    description:
      "Extract transcripts from any YouTube video — free, fast, and API-ready. Built for automation workflows with n8n, Zapier, and Make compatibility.",
    url: "https://youtube-scrapper-pi.vercel.app/",
    tags: ["API", "n8n", "Zapier", "Make", "Automation"],
    levels: [2, 5],
    icon: "Play",
  },
];

export const whyIntelliforge = [
  {
    icon: "Globe",
    title: "Bharat AI Mission Aligned",
    description:
      "We're committed to democratizing AI for India — inclusive, ethical, and accessible to businesses of all sizes, including Tier II/III cities.",
  },
  {
    icon: "Shield",
    title: "13+ Years Enterprise Engineering",
    description:
      "Every AI solution is backed by deep enterprise experience across banking, pharma, telecom, and IoT — working with Fortune 500 companies globally.",
  },
  {
    icon: "Zap",
    title: "End-to-End Coverage",
    description:
      "From teaching your team to talk to AI (Level 1) to building full applications with vibe coding (Level 5) — one agency, all five levels.",
  },
  {
    icon: "Users",
    title: "Ethical & Responsible AI",
    description:
      "AI agents work best with human oversight. We build systems with human-in-the-loop design, ensuring quality, safety, and accountability.",
  },
];
