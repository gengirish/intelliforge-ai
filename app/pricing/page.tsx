import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { PricingCard } from "@/components/pricing-card";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { JsonLd, createFaqSchema } from "@/components/json-ld";
import { pricingTiers } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for IntelliForge AI's 5-level AI services. From starter packages to enterprise engagements — find the right plan for your business.",
};

const faqs = [
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

export default function PricingPage() {
  return (
    <div className="pt-24 pb-24">
      <JsonLd data={createFaqSchema(faqs)} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeading
          label="Pricing"
          title="Invest in Your AI Future"
          description="Transparent pricing with no hidden fees. Pick the level that matches where you are — and where you want to go."
        />

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pricingTiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Custom Note */}
        <AnimateOnScroll className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            All prices are starting prices in INR. Final pricing depends on scope and
            complexity.{" "}
            <Link href="/contact" className="font-medium text-cyan hover:text-cyan-light">
              Contact us
            </Link>{" "}
            for a detailed proposal.
          </p>
        </AnimateOnScroll>

        {/* FAQs */}
        <section id="faq" className="mt-24">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know before getting started."
          />

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <div className="glass-card rounded-xl p-6">
                  <h3 className="flex items-start gap-2 text-base font-bold text-white">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo" />
                    {faq.q}
                  </h3>
                  <p className="mt-2 pl-7 text-sm leading-relaxed text-gray-400">{faq.a}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* CTA */}
        <AnimateOnScroll className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white">
            Not sure which plan is right for you?
          </h3>
          <p className="mt-2 text-gray-400">
            Book a free strategy call — no commitment, no pressure. We&apos;ll map the right plan for your goals.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact?intent=strategy-call"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-xl hover:shadow-indigo/25"
            >
              Book Free Strategy Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-audit"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-gray-300 transition-colors hover:bg-surface hover:text-white"
            >
              Get Free AI Audit
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
