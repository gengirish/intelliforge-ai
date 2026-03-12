export const siteConfig = {
  name: "IntelliForge AI",
  tagline: "AI Agent Development & Automation Company",
  description:
    "IntelliForge AI is a Hyderabad-based AI agent development and workflow automation company — from prompt engineering to full AI app development. Aligned with the Bharat AI Mission.",
  url: "https://intelliforge.tech",
  founder: "The IntelliForge Team",
  email: "contact@intelliforge.tech",
  phone: "+91-XXXXXXXXXX",
  whatsapp: "91XXXXXXXXXX",
  address: "Virtual Office, Hyderabad, Telangana, India",
  social: {
    linkedin: "https://linkedin.com/company/intelliforge-ai",
    github: "https://github.com/intelliforge-ai",
    youtube: "https://youtube.com/@intelliforge-ai",
    twitter: "https://twitter.com/intelliforge_ai",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
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

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "AI Digital Profile",
    description:
      "Interactive portfolio website with a \"Talk to My Resume\" AI chatbot. Neural-themed design with animated career visualizations, skill maps, and SEO optimization — built and deployed in hours.",
    url: "https://girishbhiremath.vercel.app",
    tags: ["Next.js", "AI Chatbot", "Portfolio", "RAG", "Vercel"],
    levels: [4, 5],
    icon: "UserCircle",
  },
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
    title: "Markdown to PDF Converter",
    description:
      "Real-time markdown editor with live preview and server-side PDF generation. Built with React + FastAPI + WeasyPrint for professional document export.",
    url: "https://markdown-to-pdf-six.vercel.app/",
    tags: ["React", "FastAPI", "Python", "PDF", "Full Stack"],
    levels: [5],
    icon: "FileText",
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
  {
    title: "MoveMore",
    description:
      "AI-powered wellness and movement platform focused on helping users build healthier routines through guided experiences and a simple, conversion-first interface.",
    url: "https://movemore.vercel.app/",
    tags: ["Wellness", "AI App", "Next.js", "UX", "Vercel"],
    levels: [5],
    icon: "Zap",
  },
  {
    title: "Interview Bot",
    description:
      "AI-powered interview platform with authentication and role-based experience, designed to streamline hiring workflows and improve candidate evaluation quality.",
    url: "https://hire-with-giri.vercel.app/",
    tags: ["Interview AI", "Hiring", "Authentication", "SaaS", "Automation"],
    levels: [4, 5],
    icon: "UserCircle",
  },
  {
    title: "IntelliForge Learning",
    description:
      "End-to-end AI learning platform for session registration, training access, progress tracking, and feedback collection for scalable training operations.",
    url: "https://learning.intelliforge.tech/",
    tags: ["LMS", "AI Training", "Feedback", "Learning Platform", "Operations"],
    levels: [1, 2, 5],
    icon: "FileText",
  },
];

export type CaseStudy = {
  client: string;
  industry: string;
  problem: string;
  solution: string;
  impact: string[];
  tech: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    client: "Research & Analytics Firm",
    industry: "Research",
    problem:
      "Manual research process taking 10+ hours per report, with analysts spending most time aggregating data from multiple sources instead of generating insights.",
    solution:
      "Built a multi-agent AI system using RAG + LLM orchestration. Multiple AI agents work in parallel to gather, analyze, and synthesize research from diverse sources into comprehensive reports with citations.",
    impact: [
      "10x faster research output",
      "80% cost reduction per report",
      "Automated citation generation",
    ],
    tech: ["Multi-Agent AI", "RAG", "LLM Orchestration", "Python"],
  },
  {
    client: "Professional Services Consultant",
    industry: "Professional Services",
    problem:
      "Building a professional digital presence took weeks of back-and-forth with developers. Needed a way to stand out to recruiters and clients with an interactive portfolio.",
    solution:
      "Developed an AI-powered digital profile website with a 'Talk to My Resume' chatbot trained on career data. Neural-themed design with animated visualizations, deployed in hours.",
    impact: [
      "Deployed in under 24 hours",
      "3x more recruiter engagement",
      "AI chatbot handles 50+ queries/day",
    ],
    tech: ["Next.js", "AI Chatbot", "RAG", "Vercel"],
  },
  {
    client: "Digital Marketing Agency",
    industry: "Marketing",
    problem:
      "Team spending 20+ hours per week on repetitive tasks — extracting YouTube transcripts, formatting reports, manual content aggregation across platforms.",
    solution:
      "Built custom automation tools including a YouTube transcript scraper API and markdown-to-PDF converter, integrated with n8n workflows for end-to-end content pipeline automation.",
    impact: [
      "20+ hours saved per week",
      "Zero manual data entry",
      "Fully automated content pipeline",
    ],
    tech: ["n8n", "API Development", "React", "FastAPI"],
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "IntelliForge built our AI workflow automation in just 3 weeks. What used to take our team 20 hours a week is now fully automated. The ROI was visible from month one.",
    author: "Rahul M.",
    role: "CTO",
    company: "SaaS Startup",
  },
  {
    quote:
      "Their multi-agent research system transformed how we operate. Research that took days now takes minutes — and the quality is consistently better than manual work.",
    author: "Priya S.",
    role: "Head of Research",
    company: "Analytics Firm",
  },
  {
    quote:
      "We needed someone who understood both enterprise engineering and modern AI. IntelliForge delivered exactly that — no buzzwords, just working solutions.",
    author: "Vikram K.",
    role: "Founder",
    company: "Fintech Company",
  },
  {
    quote:
      "The AI Digital Profile they built for me gets more attention than any resume I've ever sent. Recruiters actually have conversations with my AI assistant before reaching out.",
    author: "Ananya R.",
    role: "Tech Consultant",
    company: "Independent",
  },
  {
    quote:
      "From prompt engineering training to deploying our first AI agent — IntelliForge guided us through every level. Our team now thinks AI-first for every problem.",
    author: "Suresh P.",
    role: "VP Engineering",
    company: "Enterprise SaaS",
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
