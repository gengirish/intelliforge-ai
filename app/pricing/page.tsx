import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { PricingCard } from "@/components/pricing-card";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { pricingTiers } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for IntelliForge AI's 5-level AI services. From starter packages to enterprise engagements — find the right plan for your business.",
};

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Starter projects (Levels 1-2) typically take 2-4 weeks. Professional engagements (Levels 1-4) run 6-12 weeks. Enterprise projects are scoped individually based on complexity.",
  },
  {
    q: "Can I start at Level 1 and upgrade later?",
    a: "Absolutely. Our framework is designed to be progressive. Most clients start with Foundations & Training, see immediate value, and then move to higher levels. Each level builds on the previous one.",
  },
  {
    q: "Do you work with businesses outside Hyderabad?",
    a: "Yes! While we're based in Hyderabad, we work with businesses across India and globally. All our services can be delivered remotely — aligned with the Bharat AI Mission's goal of reaching Tier II/III cities.",
  },
  {
    q: "What industries do you serve?",
    a: "Our team has enterprise experience across banking & fintech, pharma & healthcare, telecom, and IoT — working with Fortune 500 companies globally. We serve businesses in any industry that can benefit from AI.",
  },
  {
    q: "Do you offer ongoing support after project completion?",
    a: "Yes. We offer maintenance and support packages for all tiers. Enterprise clients get dedicated ongoing support with SLAs. We also provide training to ensure your team can manage the systems independently.",
  },
  {
    q: "What makes IntelliForge different from other AI agencies?",
    a: "Two things: depth and breadth. We're backed by 13+ years of enterprise engineering (not just marketing), and we cover all 5 levels of AI readiness — most agencies only do one or two. Plus, we actively train and evaluate LLMs, so we're practitioners, not just consultants.",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeading
          label="Pricing"
          title="Invest in Your AI Future"
          description="Transparent pricing with no hidden fees. Pick the level that matches where you are — and where you want to go."
        />

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
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
        <section className="mt-24">
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
            Let&apos;s discuss your needs — no commitment, no pressure.
          </p>
          <Link
            href="/contact"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-xl hover:shadow-indigo/25"
          >
            Get a Free Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
