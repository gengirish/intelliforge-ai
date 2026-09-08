export type Faq = {
  q: string;
  a: string;
};

/**
 * Rendered on /pricing, emitted as FAQPage JSON-LD, and folded into
 * llms-full.txt. Kept here so all three stay in step.
 */
export const faqs: Faq[] = [
  {
    q: "AI is everywhere now. What makes IntelliForge different?",
    a: "Access to AI is easy; shipping reliable outcomes is hard. We design, build, and deploy production-ready workflows, agents, and AI apps with clear KPIs from day one. The result: faster execution, lower operating effort, and systems your teams can trust.",
  },
  {
    q: "How does licensing work for AI solutions?",
    a: "Our model is simple: IntelliForge covers implementation and support, while your organization owns run-time licenses (LLM APIs, cloud, and tooling). You get full cost transparency, operational control, and no lock-in.",
  },
  {
    q: "Can you explain the 5 levels briefly?",
    a: "Level 1: Foundations (team capability + use cases). Level 2: Automation (remove repetitive work). Level 3: Creative Studio (scale output quality and speed). Level 4: Agents (autonomous, 24/7 task execution). Level 5: AI Apps (custom, production-grade products).",
  },
  {
    q: "Which organizations are you targeting initially?",
    a: "Our initial focus is SaaS companies, digital agencies, startups, and enterprise teams with repeatable knowledge workflows (research, ops, marketing, reporting). These teams typically see ROI fastest - often in weeks, not months.",
  },
];
