import type { Metadata } from "next";
import { Shield, Zap, Target, BarChart3 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { AiAuditForm } from "@/components/ai-audit-form";

export const metadata: Metadata = {
  title: "Free AI Audit",
  description:
    "Get a free AI readiness report for your company. Discover automation opportunities, identify the right AI tools, and get a personalized roadmap.",
};

const benefits = [
  {
    icon: Target,
    title: "Identify Opportunities",
    desc: "We pinpoint the top 3 areas where AI can save you time and money.",
  },
  {
    icon: BarChart3,
    title: "AI Maturity Assessment",
    desc: "Understand where you are on the AI readiness scale — and where you could be.",
  },
  {
    icon: Zap,
    title: "Actionable Roadmap",
    desc: "Get a clear, step-by-step plan to implement AI in your business.",
  },
  {
    icon: Shield,
    title: "No Strings Attached",
    desc: "Completely free. No sales pressure. Just genuine value and insights.",
  },
];

export default function AiAuditPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Free AI Audit"
          title="Get Your AI Readiness Report"
          description="Answer 5 quick questions and receive a personalized AI automation roadmap for your business — completely free."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AiAuditForm />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <AnimateOnScroll>
              <h3 className="text-lg font-bold text-white">
                What You&apos;ll Get
              </h3>
              <div className="mt-4 space-y-4">
                {benefits.map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <AnimateOnScroll key={benefit.title} delay={i * 0.1}>
                      <div className="flex items-start gap-3 rounded-xl bg-surface p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo/20 to-violet/20">
                          <Icon className="h-5 w-5 text-indigo" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {benefit.title}
                          </h4>
                          <p className="mt-0.5 text-xs text-gray-400">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    </AnimateOnScroll>
                  );
                })}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
              <div className="rounded-xl border border-cyan/20 bg-cyan/5 p-4">
                <p className="text-sm text-cyan">
                  <strong>500+ businesses</strong> have used our AI audit to
                  discover automation opportunities. Average time saved:{" "}
                  <strong>15+ hours per week</strong>.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
