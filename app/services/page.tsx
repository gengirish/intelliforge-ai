import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { services } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore IntelliForge AI's 5-level AI service framework — from prompt engineering and workflow automation to AI agents and full application development.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeading
          label="Services"
          title="Five Levels to AI Mastery"
          description="Our services follow a proven 5-level roadmap. Start wherever you are and progress at your pace — each level builds on the last."
        />

        {/* AI Generalist Philosophy */}
        <AnimateOnScroll>
          <div className="mb-20 rounded-2xl border border-border bg-navy-light p-8 sm:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                We Don&apos;t Build Cooks. We Build{" "}
                <span className="gradient-text">AI Chefs.</span>
              </h3>
              <p className="mt-4 text-gray-400">
                Most people using AI are cooks — they copy a prompt, paste it in, and get a
                result. Until that same prompt fails on a different problem. An AI generalist
                is a <strong className="text-white">chef</strong>: when something breaks, the
                chef adapts. And the head chef doesn&apos;t cook every dish — they orchestrate
                specialists. That&apos;s where AI is going:{" "}
                <strong className="text-white">
                  you are the head chef, your AI agents are your specialists.
                </strong>
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Service Levels */}
        <div className="space-y-8">
          {services.map((service, i) => (
            <ServiceCard key={service.level} service={service} index={i} />
          ))}
        </div>

        {/* How They Work Together */}
        <AnimateOnScroll>
          <div className="mt-20 rounded-2xl border border-border bg-navy-light p-8 sm:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                All Five Levels, Working Together
              </h3>
              <p className="mt-4 text-gray-400">
                Imagine building an executive assistant: You start with{" "}
                <strong className="text-cyan">prompt engineering</strong> for your
                communication style (Level 1). Plug it into your calendar, Slack, and email
                via <strong className="text-cyan">MCP</strong> (Level 2). It generates{" "}
                <strong className="text-cyan">branded visuals</strong> (Level 3). An{" "}
                <strong className="text-cyan">agent triages your inbox</strong> and drafts
                replies (Level 4). And you{" "}
                <strong className="text-cyan">vibe code a dashboard</strong> that ties it all
                together (Level 5). That&apos;s the AI generalist in action.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* CTA */}
        <AnimateOnScroll className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white">
            Ready to start your AI journey?
          </h3>
          <p className="mt-2 text-gray-400">
            Tell us where you are today, and we&apos;ll build a roadmap to get you there.
          </p>
          <Link
            href="/contact"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-xl hover:shadow-indigo/25"
          >
            Get Your AI Roadmap
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
