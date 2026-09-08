export const siteConfig = {
  name: "IntelliForge AI",
  tagline: "AI Agent Development & Automation Company",
  description:
    "IntelliForge AI is a Hyderabad-based AI agent development and workflow automation company — from prompt engineering to full AI app development. Aligned with the Bharat AI Mission.",
  url: "https://www.intelliforge.tech",
  founder: "Girish Hiremath",
  /**
   * Public-facing addresses only. Never put a personal inbox in siteConfig —
   * client components import it, so it ships in the browser bundle, renders in
   * the footer, and goes out in the JSON-LD. The private notification address
   * is supplied at runtime via CONTACT_NOTIFY_CC (see app/api/contact/route.ts).
   */
  email: "contact@intelliforge.tech",
  founderEmail: "founder@intelliforge.tech",
  supportEmail: "support@intelliforge.tech",
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
  bookingUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL || "/contact?intent=strategy-call",
};

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  // Blog hidden from nav — no published posts yet; /blog remains reachable via direct URL
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
      name: "PDFForge",
      url: "https://pdfforge.intelliforge.tech",
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

/**
 * Only engagements we can stand behind publicly. Two earlier entries — a
 * Hyderabad market research firm and a Mumbai marketing agency, both "under
 * NDA" — were removed rather than reworded: an unverifiable client story is
 * worse than a short list. Add a new one only when the client and the numbers
 * are real, and prefer ones with a link a visitor can open.
 */
export const caseStudies: CaseStudy[] = [
  {
    client: "Independent cloud architect",
    featured: true,
    clientDescriptor: "AWS and Azure consultant, solo practice",
    location: "Bengaluru, Karnataka",
    industry: "Professional Services",
    problem:
      "A static portfolio had stalled in redesign. Recruiters skimmed the PDF and missed the migration and FinOps work that mattered most for senior roles.",
    solution:
      "We built an AI Digital Profile on Next.js, with RAG over the project write-ups, certifications and case notes. A \"Talk to My Resume\" chatbot lets a visitor ask about one specific engagement rather than scroll past it.",
    impact: [
      "Live on Vercel in under 48 hours",
      "The full project history is queryable, and the site is public at the link below",
    ],
    tech: ["Next.js", "RAG", "Vercel AI SDK", "Vercel"],
    productUsed: "AI Digital Profile",
    productUrl: "https://girishbhiremath.vercel.app",
    timeline: "2 days",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  /** Omit when we can't name the employer accurately. Rendered conditionally. */
  company?: string;
  linkedinUrl?: string;
  verified?: boolean;
  avatarInitials?: string;
};

/**
 * Empty until testimonials we can attribute accurately are ready — the previous
 * set was removed pending verification. Consumers render their section only
 * when this is non-empty, so re-adding entries here restores the UI.
 */
export const testimonials: Testimonial[] = [];

export const statBarItems = [
  { value: "M.Tech", label: "Data Science & AI, IIIT Dharwad" },
  { value: "14+", label: "Years Enterprise Engineering" },
  { value: "20+", label: "Client Hours Automated Weekly" },
  { value: "6", label: "Industry Verticals" },
];

export const whyIntelliforge = [
  {
    icon: "Zap",
    title: "Production Apps You Can Click",
    description:
      "Multi-agent research tools, RAG chatbots, n8n automations, micro-SaaS dashboards. Every one has a live URL you can open right now. Built in Hyderabad, deployed on Vercel.",
  },
  {
    icon: "Shield",
    title: "14+ Years Enterprise Engineering",
    description:
      "Banking, pharma, telecom, compliance, IoT. Fourteen years of Fortune 500 delivery before the AI wave, and an M.Tech in Data Science and AI in progress at IIIT Dharwad.",
  },
  {
    icon: "Zap",
    title: "All Five Levels, One Team",
    description:
      "Prompt workshops for your team this month, multi-agent systems and full-stack apps next quarter. You are not handing off between a trainer, an integrator and a dev shop.",
  },
  {
    icon: "Users",
    title: "Human-in-the-Loop by Default",
    description:
      "Indian businesses can't afford hallucinated compliance answers or rogue agents. Every system we ship has review checkpoints, audit trails and an escalation path.",
  },
];
