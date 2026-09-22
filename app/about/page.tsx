import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Linkedin, Github, Mail } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { MissionBadge } from "@/components/mission-badge";
import { CaseStudyCard } from "@/components/case-study-card";
import { StatBar } from "@/components/stat-bar";
import { FounderAvatar } from "@/components/founder-avatar";
import { founder } from "@/lib/founder";
import { caseStudies } from "@/lib/constants";
import { BookCallLink } from "@/components/book-call-link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about IntelliForge AI — a Hyderabad-based AI agency founded by Girish Hiremath, aligned with India's Bharat AI Mission.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | IntelliForge AI",
    description:
      "A Hyderabad-based AI agency making AI accessible to businesses of every size — aligned with India's Bharat AI Mission.",
    url: "https://www.intelliforge.tech/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeading
          as="h1"
          label="About Us"
          title="Building India's AI Future"
          description="Founded in Hyderabad with a mission to make AI accessible to businesses of every size — from startups to enterprises."
        />

        {/* Our Story */}
        <AnimateOnScroll>
          <div className="mb-20 max-w-3xl">
            <div>
              <h3 className="text-2xl font-bold text-heading sm:text-3xl">
                AI for Every{" "}
                <span className="gradient-text">Indian Business</span>
              </h3>
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  IntelliForge AI was born from a simple observation: while big tech companies
                  race ahead with AI, millions of businesses in India are left behind — not
                  because AI is too hard, but because no one is meeting them where they are.
                </p>
                <p>
                  We follow the <strong className="text-heading">AI Generalist</strong>{" "}
                  philosophy. In a world where one person can use AI to solve problems across
                  marketing, design, code, research, and content, most companies no longer
                  need five specialists. They need one partner who can orchestrate AI across
                  all five.
                </p>
                <p>
                  That is what IntelliForge AI does. Think of us as your AI department
                  rather than another vendor.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Why IntelliForge Started */}
        <section className="mb-20">
          <AnimateOnScroll>
            <div className="rounded-2xl border border-indigo/20 bg-gradient-to-br from-indigo/5 via-navy-light to-violet/5 p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-heading sm:text-3xl">
                {founder.originStory.title}
              </h3>
              <div className="mt-6 space-y-4">
                {founder.originStory.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        {/* Bharat AI Mission Alignment */}
        <section className="mb-20">
          <AnimateOnScroll>
            <div className="rounded-2xl border border-cyan/20 bg-gradient-to-br from-cyan/5 via-navy-light to-indigo/5 p-8 sm:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <MissionBadge />
                  <h3 className="mt-4 text-2xl font-bold text-heading">
                    Aligned with Bharat AI Mission
                  </h3>
                  <p className="mt-4 text-muted">
                    The Bharat AI Mission envisions an India where AI innovation is accessible
                    to all — empowering communities and safeguarding societal interests. As
                    part of the government&apos;s &#8377;10,372 crore IndiaAI Mission, we
                    contribute to this vision by bringing enterprise-grade AI to businesses
                    across India.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Skill Development at Scale",
                      desc: "Training teams in Tier II/III cities through our Level 1 & 2 programs",
                    },
                    {
                      title: "Open Collaboration",
                      desc: "Building on open-source tools and fostering community-driven AI adoption",
                    },
                    {
                      title: "Responsible AI & Awareness",
                      desc: "Human-in-the-loop design ensuring ethical, safe, and accountable AI",
                    },
                    {
                      title: "Innovation for Social Impact",
                      desc: "Using AI to address societal challenges beyond just profit",
                    },
                  ].map((pillar, i) => (
                    <AnimateOnScroll key={pillar.title} delay={i * 0.1}>
                      <div className="rounded-xl bg-surface p-4">
                        <h4 className="text-sm font-bold text-cyan">{pillar.title}</h4>
                        <p className="mt-1 text-sm text-muted">{pillar.desc}</p>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
              <div className="mt-6 text-center">
                <a
                  href="https://bharataimission.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:text-cyan-light"
                >
                  Visit bharataimission.org
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        {/* Founder Section */}
        <section className="mb-20">
          <SectionHeading label="Founder" title="Meet the Founder" />
          <AnimateOnScroll>
            <div className="glass-card mx-auto flex max-w-md flex-col items-center rounded-2xl p-8 text-center">
              <FounderAvatar size={80} className="rounded-xl" />
              <h3 className="mt-4 text-xl font-bold text-heading">{founder.name}</h3>
              <p className="text-sm text-cyan">{founder.title}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <a
                  href={founder.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-muted transition-colors hover:bg-indigo/20 hover:text-indigo"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={founder.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-muted transition-colors hover:bg-indigo/20 hover:text-indigo"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={founder.socialLinks.email}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-muted transition-colors hover:bg-indigo/20 hover:text-indigo"
                  aria-label="Email the founder"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        {/* Stats */}
        <section className="mb-20 border-y border-border py-12">
          <StatBar />
        </section>

        {/* Client work. The grid tracks the number of published case studies so
            a short list stays centred instead of stranding one card in a
            three-column row. */}
        {caseStudies.length > 0 && (
          <section className="mb-20">
            <SectionHeading
              label="Case Studies"
              title="Client Work"
              description="Engagements we can show publicly. Each one links to a product you can open and use."
            />
            <div
              className={`mx-auto grid gap-8 ${
                caseStudies.length === 1
                  ? "max-w-2xl"
                  : caseStudies.length === 2
                    ? "max-w-4xl md:grid-cols-2"
                    : "lg:grid-cols-3"
              }`}
            >
              {caseStudies.map((study, i) => (
                <CaseStudyCard key={study.client} study={study} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <AnimateOnScroll className="text-center">
          <h3 className="text-2xl font-bold text-heading">
            Let&apos;s Build Something Together
          </h3>
          <p className="mt-2 text-muted">
            Book a free call to discuss your AI goals.
          </p>
          <BookCallLink
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-on-accent transition-all hover:shadow-xl hover:shadow-indigo/25"
          >
            Book Free AI Strategy Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </BookCallLink>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
