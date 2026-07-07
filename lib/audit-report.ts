import { services } from "./constants";

export type AuditReportData = {
  companySize: string;
  industry: string;
  tools: string[];
  challenge: string;
};

export type AuditReport = {
  maturityLevel: number;
  maturityLabel: string;
  recommendedLevel: number;
  recommendedService: string;
  topOpportunities: string[];
  nextSteps: string[];
  estimatedTimeline: string;
};

const MATURITY_LABELS: Record<number, string> = {
  1: "AI Explorer",
  2: "Early Adopter",
  3: "Workflow Integrator",
  4: "AI Optimizer",
  5: "AI Innovator",
};

const CHALLENGE_TO_LEVEL: Record<string, number> = {
  "Too many manual / repetitive tasks": 2,
  "Need to implement AI but don't know where to start": 1,
  "Existing AI tools aren't delivering results": 2,
  "Want to build AI-powered products": 5,
  "Need to upskill my team on AI": 1,
  "Want to reduce costs with automation": 2,
};

const INDUSTRY_OPPORTUNITIES: Record<string, string[]> = {
  "SaaS / Software": [
    "Automate customer onboarding and activation workflows",
    "Deploy an AI support agent trained on your product docs",
    "Build a RAG knowledge base for internal engineering teams",
    "Generate release notes and changelog content automatically",
  ],
  "E-commerce / Retail": [
    "AI-powered product descriptions at scale across your catalog",
    "Automated customer inquiry routing and response drafting",
    "Inventory demand forecasting from sales and seasonality data",
    "Personalized product recommendation agents for your storefront",
  ],
  "Healthcare / Pharma": [
    "Clinical documentation summarization and note automation",
    "Patient appointment scheduling and follow-up agents",
    "Medical records retrieval with HIPAA-aware RAG systems",
    "Automated prior authorization and claims documentation",
  ],
  "Finance / Banking": [
    "Automated compliance document review and flagging",
    "AI-powered financial report and memo generation",
    "Client onboarding KYC workflow automation",
    "Fraud pattern detection integrated into existing CRM tools",
  ],
  "Marketing / Agency": [
    "End-to-end content production pipeline with brand consistency",
    "Campaign performance analysis and reporting automation",
    "Multi-channel creative generation (copy, images, video briefs)",
    "Client reporting dashboards with AI-generated insights",
  ],
  Education: [
    "Personalized learning path recommendations for students",
    "Automated grading assistance and feedback generation",
    "24/7 student inquiry chatbot for admissions and support",
    "Curriculum content summarization and study guide creation",
  ],
  Manufacturing: [
    "Predictive maintenance alerts from equipment sensor data",
    "Quality inspection documentation and defect reporting",
    "Supply chain optimization agents for procurement teams",
    "Automated production scheduling and shift handoff summaries",
  ],
  Consulting: [
    "Proposal and SOW generation from engagement templates",
    "Automated research and client briefing agents",
    "Deliverable production pipeline for recurring engagements",
    "Meeting transcription with action-item extraction",
  ],
  Other: [
    "Identify and automate your top 3 repetitive workflows",
    "Deploy a company knowledge base with RAG-powered search",
    "Build custom AI agents for your most time-consuming tasks",
    "Upskill your team with structured prompt engineering training",
  ],
};

const CHALLENGE_OPPORTUNITY_BIAS: Record<string, number> = {
  "Too many manual / repetitive tasks": 0,
  "Need to implement AI but don't know where to start": 3,
  "Existing AI tools aren't delivering results": 1,
  "Want to build AI-powered products": 2,
  "Need to upskill my team on AI": 3,
  "Want to reduce costs with automation": 0,
};

const TIMELINE_BY_LEVEL: Record<number, Record<string, string>> = {
  1: {
    "1": "2–3 weeks",
    "2-10": "2–4 weeks",
    "11-50": "3–5 weeks",
    "51-200": "4–6 weeks",
    "200+": "5–8 weeks",
  },
  2: {
    "1": "4–6 weeks",
    "2-10": "4–8 weeks",
    "11-50": "6–10 weeks",
    "51-200": "8–12 weeks",
    "200+": "10–16 weeks",
  },
  3: {
    "1": "6–8 weeks",
    "2-10": "8–12 weeks",
    "11-50": "10–14 weeks",
    "51-200": "12–18 weeks",
    "200+": "16–24 weeks",
  },
  4: {
    "1": "8–12 weeks",
    "2-10": "10–16 weeks",
    "11-50": "14–20 weeks",
    "51-200": "18–26 weeks",
    "200+": "24–36 weeks",
  },
  5: {
    "1": "12–16 weeks",
    "2-10": "14–20 weeks",
    "11-50": "18–26 weeks",
    "51-200": "24–36 weeks",
    "200+": "32–48 weeks",
  },
};

function calculateMaturityLevel(tools: string[]): number {
  if (tools.length === 0 || tools.includes("No AI tools currently")) return 1;

  let score = 1;

  if (tools.includes("ChatGPT / Claude / Gemini")) score = Math.max(score, 2);
  if (tools.includes("Slack / Teams")) score = Math.max(score, 2);
  if (tools.includes("CRM (Salesforce, HubSpot, etc.)")) score = Math.max(score, 2);
  if (tools.includes("Zapier / Make / n8n")) score = Math.max(score, 3);
  if (tools.includes("Custom internal tools")) score = Math.max(score, 4);

  if (
    tools.includes("Zapier / Make / n8n") &&
    tools.includes("Custom internal tools")
  ) {
    score = 5;
  }

  return Math.min(5, score);
}

function getRecommendedLevel(challenge: string, maturityLevel: number): number {
  const challengeLevel = CHALLENGE_TO_LEVEL[challenge] ?? 2;
  const target = Math.max(challengeLevel, maturityLevel + (maturityLevel < 3 ? 1 : 0));
  return Math.min(5, Math.max(1, target));
}

function pickOpportunities(industry: string, challenge: string): string[] {
  const pool = INDUSTRY_OPPORTUNITIES[industry] ?? INDUSTRY_OPPORTUNITIES.Other;
  const bias = CHALLENGE_OPPORTUNITY_BIAS[challenge] ?? 0;
  const rotated = [...pool.slice(bias), ...pool.slice(0, bias)];
  return rotated.slice(0, 3);
}

function buildNextSteps(
  maturityLevel: number,
  recommendedLevel: number,
  challenge: string
): string[] {
  const service = services.find((s) => s.level === recommendedLevel);
  const serviceName = service?.title ?? "AI Workflow Automation";

  const steps: string[] = [];

  if (maturityLevel <= 2) {
    steps.push(
      "Audit your top 5 repetitive workflows and score each for automation potential"
    );
  } else {
    steps.push(
      "Map your existing AI tools and identify integration gaps causing poor results"
    );
  }

  if (challenge.includes("upskill") || challenge.includes("don't know where")) {
    steps.push(
      `Start with ${services[0].title}: prompt engineering workshops and tool setup for quick wins`
    );
  } else if (challenge.includes("AI-powered products")) {
    steps.push(
      `Scope an MVP with ${services[4].title} — define one core feature to ship in 30 days`
    );
  } else {
    steps.push(
      `Engage ${serviceName} to connect AI to your CRM, email, and team communication tools`
    );
  }

  if (recommendedLevel >= 4) {
    steps.push(
      "Design a pilot AI agent for your highest-volume operational task before full rollout"
    );
  } else {
    steps.push(
      "Book a free 30-minute strategy call to validate priorities and build a phased roadmap"
    );
  }

  return steps;
}

export function generateAuditReport(data: AuditReportData): AuditReport {
  const maturityLevel = calculateMaturityLevel(data.tools);
  const recommendedLevel = getRecommendedLevel(data.challenge, maturityLevel);
  const recommendedService =
    services.find((s) => s.level === recommendedLevel)?.title ??
    "AI Workflow Automation";

  const topOpportunities = pickOpportunities(data.industry, data.challenge);
  const nextSteps = buildNextSteps(
    maturityLevel,
    recommendedLevel,
    data.challenge
  );

  const sizeTimelines = TIMELINE_BY_LEVEL[recommendedLevel];
  const estimatedTimeline =
    sizeTimelines[data.companySize] ?? sizeTimelines["11-50"];

  return {
    maturityLevel,
    maturityLabel: MATURITY_LABELS[maturityLevel],
    recommendedLevel,
    recommendedService,
    topOpportunities,
    nextSteps,
    estimatedTimeline,
  };
}

export function formatAuditReportText(
  data: AuditReportData,
  report: AuditReport
): string {
  return [
    "=== AI READINESS REPORT ===",
    "",
    `Company Size: ${data.companySize}`,
    `Industry: ${data.industry}`,
    `Current Tools: ${data.tools.join(", ")}`,
    `Biggest Challenge: ${data.challenge}`,
    "",
    `AI Maturity Level: ${report.maturityLevel}/5 — ${report.maturityLabel}`,
    `Recommended Service: Level ${report.recommendedLevel} — ${report.recommendedService}`,
    `Estimated Timeline: ${report.estimatedTimeline}`,
    "",
    "Top Opportunities:",
    ...report.topOpportunities.map((o, i) => `${i + 1}. ${o}`),
    "",
    "Recommended Next Steps:",
    ...report.nextSteps.map((s, i) => `${i + 1}. ${s}`),
  ].join("\n");
}
