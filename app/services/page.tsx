import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Check,
  Clock,
  Sparkles,
  UserCircle,
  MessageSquare,
  BarChart3,
  Search,
  Smartphone,
  Globe,
} from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { services, aiDigitalProfile } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore IntelliForge AI's 5-level AI service framework — from prompt engineering and workflow automation to AI agents and full application development.",
};

const featureIcons = [UserCircle, MessageSquare, BarChart3, Search, Smartphone, Globe];

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

        {/* AI Digital Profile — Productized Service */}
        <section className="mt-24">
          <SectionHeading
            label="Productized Service"
            title="AI Digital Profile"
            description={aiDigitalProfile.tagline}
          />

          <AnimateOnScroll>
            <div className="rounded-2xl border border-indigo/20 bg-gradient-to-br from-indigo/5 via-navy-light to-violet/5 p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-2">
                {/* Left — Description + Features */}
                <div>
                  <p className="text-gray-400 leading-relaxed">
                    {aiDigitalProfile.description}
                  </p>

                  <div className="mt-6 flex gap-2">
                    {aiDigitalProfile.levels.map((level) => (
                      <span
                        key={level}
                        className="rounded-full bg-gradient-to-r from-indigo/20 to-violet/20 px-3 py-1 text-xs font-semibold text-indigo"
                      >
                        Level {level}
                      </span>
                    ))}
                  </div>

                  <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-gray-300">
                    What&apos;s Included
                  </h4>
                  <ul className="mt-3 space-y-3">
                    {aiDigitalProfile.features.map((feature, i) => {
                      const Icon = featureIcons[i] || Check;
                      return (
                        <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                          {feature}
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href={aiDigitalProfile.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
                  >
                    <Sparkles className="h-4 w-4" />
                    View Live Demo
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

                {/* Right — Tiers */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                    Pricing Tiers
                  </h4>
                  <div className="mt-3 space-y-4">
                    {aiDigitalProfile.tiers.map((tier, i) => (
                      <AnimateOnScroll key={tier.name} delay={i * 0.1}>
                        <div
                          className={`rounded-xl p-5 ${
                            i === 1
                              ? "border border-indigo/30 bg-indigo/10"
                              : "bg-surface"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-white">{tier.name}</h5>
                            <span className="text-lg font-bold gradient-text">
                              {tier.price}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">{tier.includes}</p>
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {tier.turnaround}
                          </div>
                        </div>
                      </AnimateOnScroll>
                    ))}
                  </div>

                  <h4 className="mt-8 text-sm font-semibold uppercase tracking-wider text-gray-300">
                    Who It&apos;s For
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {aiDigitalProfile.targetAudience.map((audience) => (
                      <li key={audience} className="flex items-start gap-2 text-sm text-gray-400">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                        {audience}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="mt-6 block w-full rounded-full bg-gradient-to-r from-indigo to-violet py-3 text-center text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25"
                  >
                    Get Your AI Digital Profile
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

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
