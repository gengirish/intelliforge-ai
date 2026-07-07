export const siteConfig = {
  name: "IntelliForge AI",
  tagline: "AI Agent Development & Automation Company",
  description:
    "IntelliForge AI is a Hyderabad-based AI agent development and workflow automation company — from prompt engineering to full AI app development. Aligned with the Bharat AI Mission.",
  url: "https://www.intelliforge.tech",
  founder: "Girish Hiremath",
  email: "gen.girish@gmail.com",
  phone: "+91 85559 60837",
  whatsapp: "918555960837",
  address:
    "Vamsiram's Jyothi Granules, Tower-2, Kondapur Main Road, Opp. Chirec School, Laxmi Nagar, Kondapur, Hyderabad, Telangana 500084",
  postalAddress: {
    streetAddress:
      "Vamsiram's Jyothi Granules, Tower-2, Kondapur Main Road, Opp. Chirec School, Laxmi Nagar, Kondapur",
    locality: "Hyderabad",
    region: "Telangana",
    postalCode: "500084",
    country: "IN",
  },
  mapsUrl: "https://maps.app.goo.gl/qHHtDmgLMUUHDuod7",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.0408871197635!2d78.3485649!3d17.4617647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f736f49d39%3A0x464b4748869662bf!2sJYOTHI%20GRANULES!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin",
  geo: {
    latitude: 17.4617596,
    longitude: 78.3511398,
  },
  social: {
    linkedin: "https://linkedin.com/company/intelliforge-ai",
    github: "https://github.com/gengirish/intelliforge-ai",
    youtube: "https://youtube.com/@intelliforge-ai",
    twitter: "https://twitter.com/intelliforge_ai",
  },
};

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const startingPrice = "₹25,000/project";

export type ServiceLevel = {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  exampleProduct: { name: string; url: string };
  offerings: string[];
};

export const services: ServiceLevel[] = [
  {
    level: 1,
    title: "AI Foundations & Training",
    subtitle: "Learn to speak AI's language",
    icon: "BookOpen",
    badge: "Foundation",
    exampleProduct: {
      name: "IntelliForge Learning",
      url: "https://learning.intelliforge.tech/",
    },
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
    badge: "Automation",
    exampleProduct: {
      name: "YouTube Transcript Scraper",
      url: "https://youtube-scrapper-pi.vercel.app/",
    },
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
    badge: "Creative",
    exampleProduct: {
      name: "CampaignForge AI",
      url: "https://campaignforge-ai-three.vercel.app",
    },
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
    badge: "Agents",
    exampleProduct: {
      name: "Multi-Agent Deep Research",
      url: "https://deep-research.intelliforge.tech",
    },
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
    badge: "Apps",
    exampleProduct: {
      name: "AgencyOS",
      url: "https://agencyos.intelliforge.tech",
    },
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
    name: "AI Foundations",
    levels: "Level 1",
    price: "₹25,000",
    period: "starting price",
    description:
      "Master prompt engineering, upskill your team, and build a solid AI foundation. The essential first step.",
    features: [
      "Prompt Engineering Workshop (PRD Method)",
      "AI Readiness Assessment",
      "Tool Selection & Setup (ChatGPT, Claude, etc.)",
      "Custom Prompt Libraries for Your Business",
      "Team Upskilling Sessions",
      "Email & Chat Support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Workflow Automation",
    levels: "Levels 1–2",
    price: "₹50,000",
    period: "starting price",
    description:
      "Connect AI to your business tools — Slack, CRM, email, calendar. Automate repetitive work permanently.",
    features: [
      "Everything in AI Foundations",
      "RAG (Retrieval-Augmented Generation) Setup",
      "MCP Integrations (up to 5 tools)",
      "n8n / Zapier / Make Workflow Automation",
      "Custom Knowledge Base Setup",
      "Context Stack Optimization",
      "Priority Support",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    name: "AI Agent Development",
    levels: "Levels 1–4",
    price: "₹2,00,000",
    period: "starting price",
    description:
      "Build autonomous AI agents that work 24/7 — not chatbots, real agents that proactively handle operations.",
    features: [
      "Everything in Workflow Automation",
      "Custom Autonomous Agent Design",
      "Multi-Agent System Architecture",
      "AI Creative Pipeline Setup",
      "Agent Monitoring & QA",
      "Human-in-the-Loop Oversight",
      "LLM Fine-Tuning (RLHF / SFT)",
    ],
    highlighted: false,
    cta: "Start Building",
  },
  {
    name: "AI App Development",
    levels: "All 5 Levels",
    price: "₹5,00,000+",
    period: "custom engagement",
    description:
      "Full AI-powered applications — from micro-SaaS to enterprise platforms. End-to-end design, build, and deploy.",
    features: [
      "Everything in AI Agent Development",
      "Custom App Development (Vibe Coding)",
      "Micro-SaaS / Dashboard Building",
      "Enterprise Integration (Java, Spring Boot)",
      "MVP Rapid Prototyping",
      "Dedicated AI Consultant",
      "Ongoing Maintenance & Support",
    ],
    highlighted: false,
    cta: "Contact Us",
  },
];

export const trustItems = [
  "14+ Years Experience",
  "Fortune 500 Clients",
  "Banking & Fintech",
  "Pharma & Healthcare",
  "Telecom & IoT",
  "LLM Trainer & Evaluator",
];

export type PortfolioProject = {
  title: string;
  description: string;
  tagline?: string;
  url: string;
  tags: string[];
  levels: number[];
  icon: string;
  featured?: boolean;
};

export type ProductizedService = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  levels: number[];
  tiers: { name: string; includes: string; turnaround: string; price: string }[];
  targetAudience: string[];
  demoUrl: string;
};

export const aiDigitalProfile: ProductizedService = {
  name: "AI Digital Profile",
  tagline:
    "Get a production-ready, AI-powered portfolio website built in hours — not weeks.",
  description:
    "We build stunning, interactive digital profile websites for professionals, founders, and consultants. Each profile features a neural-themed dark design, animated sections, career visualizations, and a \"Talk to My Resume\" AI chatbot trained on your career data — so recruiters, clients, and collaborators can have a conversation with your professional story.",
  features: [
    "Interactive single-page portfolio (Next.js + React)",
    "AI chat assistant that answers questions about your career",
    "Animated skill visualizations and career timeline",
    "SEO-optimized metadata and social sharing (OG images)",
    "Mobile-responsive, dark-themed neural design",
    "Deployed live on Vercel with custom domain support",
  ],
  levels: [4, 5],
  tiers: [
    {
      name: "Starter",
      includes: "Data setup + default theme + live deployment",
      turnaround: "Same day",
      price: "₹9,999",
    },
    {
      name: "Professional",
      includes: "Custom theme + AI chat + projects + testimonials",
      turnaround: "1–2 days",
      price: "₹24,999",
    },
    {
      name: "Premium",
      includes: "Full customization + custom sections + ongoing updates",
      turnaround: "3–5 days",
      price: "₹49,999",
    },
  ],
  targetAudience: [
    "Tech professionals looking to stand out",
    "Founders and consultants building personal brand",
    "Freelancers who need a portfolio fast",
    "Anyone who wants their resume to talk back",
  ],
  demoUrl: "https://girishbhiremath.vercel.app",
};

export type CaseStudy = {
  client: string;
  clientDescriptor?: string;
  location?: string;
  industry: string;
  problem: string;
  solution: string;
  impact: string[];
  tech: string[];
  productUsed: string;
  productUrl: string;
  timeline: string;
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "Confidential — Hyderabad Analytics Firm",
    clientDescriptor:
      "B2B market research firm, ~50 employees, HITEC City corridor",
    location: "Hyderabad, Telangana",
    industry: "Market Research & Analytics",
    featured: true,
    problem:
      "Competitive landscape reports took 12–15 analyst-hours each — pulling SEC filings, trade press, LinkedIn headcount data, and notes from the internal CRM by hand. Senior staff were reviewing drafts instead of doing actual analysis.",
    solution:
      "Shipped a multi-agent deep research system: RAG over the client's proprietary brief library, parallel web-research agents for live sources, and a synthesis agent that outputs cited reports with a human review checkpoint before delivery.",
    impact: [
      "Full competitive brief in ~90 min vs. 1–2 days",
      "~75% less analyst time on data gathering",
      "Every claim traceable to source or internal doc",
    ],
    tech: ["Multi-Agent AI", "RAG", "LangGraph", "Python", "FastAPI"],
    productUsed: "Multi-Agent Deep Research",
    productUrl: "https://deep-research.intelliforge.tech",
    timeline: "4 weeks",
  },
  {
    client: "Independent Cloud Architect",
    clientDescriptor:
      "Senior AWS/Azure consultant, 12+ years, solo practice",
    location: "Bengaluru, Karnataka",
    industry: "Professional Services",
    problem:
      "Six weeks of back-and-forth with a freelance web dev on a static portfolio. Recruiters skimmed PDFs and missed the migration and FinOps projects that actually mattered for senior roles.",
    solution:
      "Built an AI Digital Profile on Next.js with RAG over project write-ups, certifications, and case notes — plus a 'Talk to My Resume' chatbot so visitors can ask about specific engagements instead of scrolling.",
    impact: [
      "Live on Vercel in under 48 hours",
      "Recruiters citing chatbot answers in outreach",
      "40+ AI queries/week within first month",
    ],
    tech: ["Next.js", "RAG", "Vercel AI SDK", "Vercel"],
    productUsed: "AI Digital Profile",
    productUrl: "https://girishbhiremath.vercel.app",
    timeline: "2 days",
  },
  {
    client: "Confidential — Performance Marketing Agency",
    clientDescriptor:
      "Content-led agency, ~15-person ops team, Andheri West",
    location: "Mumbai, Maharashtra",
    industry: "Digital Marketing",
    problem:
      "Three ops staff spent most of Monday copying YouTube transcripts, reformatting competitor teardowns, and stitching markdown into client PDFs — roughly 22 hours/week of work that didn't need human judgment.",
    solution:
      "Deployed the YouTube transcript scraper API, a markdown-to-PDF converter, and wired both into n8n workflows that pull URLs from a shared sheet, run transcripts, and drop finished reports into client Notion workspaces overnight.",
    impact: [
      "~22 hrs/week reclaimed for strategy work",
      "Zero manual copy-paste on weekly reports",
      "Pipeline runs unattended Sun→Mon before standup",
    ],
    tech: ["n8n", "FastAPI", "React", "Notion API"],
    productUsed: "YouTube Transcript Scraper + Markdown to PDF",
    productUrl: "https://youtube-scrapper-pi.vercel.app/",
    timeline: "3 weeks",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  linkedinUrl?: string;
  verified?: boolean;
  avatarInitials?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We had three people copying YouTube transcripts every Monday. Girish hooked the scraper API into our n8n flow in about two weeks — transcripts land in Notion before we've finished coffee. He stayed on through the weird edge cases, not just the happy path.",
    author: "Rahul M.",
    role: "CTO",
    company: "Pune B2B SaaS, ~30 engineers",
    avatarInitials: "RM",
  },
  {
    quote:
      "Our analysts didn't trust 'AI research' until they saw a multi-agent report pulling from our internal data room plus live web sources — with citations. A competitive brief that ate a full day is now maybe 90 minutes, and there's still a human sign-off before it goes to clients.",
    author: "Priya S.",
    role: "Head of Research",
    company: "Hyderabad analytics firm (NDA)",
    avatarInitials: "PS",
  },
  {
    quote:
      "I was six weeks into a portfolio redesign that wasn't going anywhere. IntelliForge shipped the AI Digital Profile with RAG over my project docs in a weekend. Recruiters messaged saying they asked the bot about my Kubernetes work — that's weird, and honestly better than another PDF.",
    author: "Ananya R.",
    role: "Cloud Architect",
    company: "Independent consultant, Bengaluru",
    avatarInitials: "AR",
  },
  {
    quote:
      "Started with a prompt workshop for eight engineers in Hyderabad, ended up with a RAG chatbot over our Confluence. Six months later we added an n8n agent that triages L1 support tickets. Not a keynote transformation — just systems that actually run in prod.",
    author: "Suresh P.",
    role: "VP Engineering",
    company: "RegTech SaaS, ~120 employees",
    avatarInitials: "SP",
  },
];

export const statBarItems = [
  { value: "70+", label: "Production Apps on Vercel" },
  { value: "14+", label: "Years Enterprise Engineering" },
  { value: "20+", label: "Client Hours Automated Weekly" },
  { value: "6", label: "Industry Verticals" },
];

export const whyIntelliforge = [
  {
    icon: "Zap",
    title: "70+ Production Apps on Vercel",
    description:
      "Live URLs you can click — multi-agent research tools, RAG chatbots, n8n automations, and micro-SaaS dashboards. Built from Hyderabad, deployed globally on Vercel, not mockups in a deck.",
  },
  {
    icon: "Shield",
    title: "14+ Years Enterprise Engineering",
    description:
      "Banking, pharma, telecom, compliance, IoT — Fortune 500 delivery before the AI wave. Every IntelliForge build inherits that rigor, plus ongoing M.Tech DSAI work at IIIT Dharwad.",
  },
  {
    icon: "Zap",
    title: "All Five Levels, One Team",
    description:
      "Prompt workshops for your Hyderabad or Tier-II team today; multi-agent systems and full-stack apps next quarter. No handoffs between a trainer, an integrator, and a dev shop.",
  },
  {
    icon: "Users",
    title: "Human-in-the-Loop by Default",
    description:
      "Indian businesses can't afford hallucinated compliance answers or rogue agents. We design review checkpoints, audit trails, and escalation paths — aligned with responsible AI practice under Bharat AI Mission goals.",
  },
];
