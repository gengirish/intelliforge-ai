import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  Brain,
  ExternalLink,
  User,
  Linkedin,
  Github,
  Twitter,
  BookOpen,
  Mic,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { MissionBadge } from "@/components/mission-badge";
import { founder } from "@/lib/founder";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about IntelliForge AI — built on 13+ years of enterprise experience, aligned with the Bharat AI Mission to democratize AI for India.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeading
          label="About Us"
          title="Building India's AI Future"
          description="Founded in Hyderabad with a mission to make AI accessible to businesses of every size — from startups to enterprises."
        />

        {/* Our Story */}
        <AnimateOnScroll>
          <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                From Enterprise Engineering to{" "}
                <span className="gradient-text">AI Innovation</span>
              </h3>
              <div className="mt-6 space-y-4 text-gray-400">
                <p>
                  IntelliForge AI was born from a simple observation: while big tech companies
                  race ahead with AI, millions of businesses in India are left behind — not
                  because AI is too hard, but because no one is meeting them where they are.
                </p>
                <p>
                  We follow the <strong className="text-white">AI Generalist</strong>{" "}
                  philosophy. In a world where one person can use AI to solve problems across
                  marketing, design, code, research, and content, companies don&apos;t need
                  five specialists anymore — they need one partner who can orchestrate AI to
                  solve all five problems.
                </p>
                <p>
                  That&apos;s IntelliForge AI. We&apos;re not just a vendor — we&apos;re your
                  AI department.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "13+", label: "Years Experience" },
                { value: "5+", label: "Industries Served" },
                { value: "5", label: "AI Service Levels" },
                { value: "100%", label: "AI-First Approach" },
              ].map((stat, i) => (
                <AnimateOnScroll key={stat.label} delay={i * 0.1}>
                  <div className="glass-card rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Why IntelliForge Started */}
        <section className="mb-20">
          <AnimateOnScroll>
            <div className="rounded-2xl border border-indigo/20 bg-gradient-to-br from-indigo/5 via-navy-light to-violet/5 p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {founder.originStory.title}
              </h3>
              <div className="mt-6 space-y-4">
                {founder.originStory.paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-400 leading-relaxed">
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
                  <h3 className="mt-4 text-2xl font-bold text-white">
                    Aligned with Bharat AI Mission
                  </h3>
                  <p className="mt-4 text-gray-400">
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
                        <p className="mt-1 text-sm text-gray-400">{pillar.desc}</p>
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
          <SectionHeading
            label="Our Expertise"
            title="Built by Practitioners, Not Just Consultants"
            description={founder.headline}
          />

          <div className="grid gap-12 lg:grid-cols-5">
            {/* Founder Profile */}
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <div className="glass-card overflow-hidden rounded-2xl">
                  <div className="flex h-64 items-center justify-center bg-gradient-to-br from-indigo/20 to-violet/20">
                    <User className="h-24 w-24 text-indigo/50" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                    <p className="text-sm text-cyan">{founder.title}</p>
                    <p className="mt-4 text-sm italic text-gray-400">
                      &ldquo;{founder.tagline}&rdquo;
                    </p>

                    <div className="mt-4 flex gap-3">
                      <a
                        href={founder.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-gray-400 transition-colors hover:bg-indigo/20 hover:text-indigo"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={founder.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-gray-400 transition-colors hover:bg-indigo/20 hover:text-indigo"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={founder.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-gray-400 transition-colors hover:bg-indigo/20 hover:text-indigo"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="mt-6 space-y-3">
                      {founder.credentials.map((cred) => (
                        <div key={cred.label} className="flex items-start gap-2">
                          <Award className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                          <div>
                            <p className="text-sm font-semibold text-white">{cred.label}</p>
                            <p className="text-xs text-gray-400">{cred.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Bio + Skills Mapping */}
            <div className="lg:col-span-3">
              <AnimateOnScroll delay={0.1}>
                <div className="space-y-4">
                  {founder.bio.map((paragraph, i) => (
                    <p key={i} className="text-gray-400 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimateOnScroll>

              {/* Industry Experience */}
              <AnimateOnScroll delay={0.2}>
                <div className="mt-8">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-300">
                    <Briefcase className="h-4 w-4 text-indigo" />
                    Industry Experience
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {founder.industries.map((industry) => (
                      <span
                        key={industry}
                        className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-gray-300"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Skills-to-Services Mapping */}
              <AnimateOnScroll delay={0.3}>
                <div className="mt-8">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-300">
                    <Brain className="h-4 w-4 text-indigo" />
                    Skills Powering Each Service Level
                  </h4>
                  <div className="mt-3 space-y-2">
                    {founder.skillsToServices.map((item) => (
                      <div
                        key={item.level}
                        className="flex items-start gap-3 rounded-xl bg-surface p-3"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo to-violet text-xs font-bold text-white">
                          {item.level}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.service}</p>
                          <p className="text-xs text-gray-400">{item.skills}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Publications & Talks */}
              <AnimateOnScroll delay={0.4}>
                <div className="mt-8">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-300">
                    <BookOpen className="h-4 w-4 text-indigo" />
                    Publications & Talks
                  </h4>
                  <div className="mt-3 space-y-2">
                    {founder.publications.map((pub) => (
                      <a
                        key={pub.title}
                        href={pub.url}
                        className="flex items-start gap-3 rounded-xl bg-surface p-3 transition-colors hover:bg-surface-hover"
                      >
                        {pub.type === "Talk" ? (
                          <Mic className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                        ) : (
                          <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {pub.title}
                          </p>
                          <p className="text-xs text-gray-400">{pub.type}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* CTA */}
        <AnimateOnScroll className="text-center">
          <h3 className="text-2xl font-bold text-white">
            Let&apos;s Build Something Together
          </h3>
          <p className="mt-2 text-gray-400">
            13+ years of enterprise engineering meets cutting-edge AI. Book a free call to discuss your goals.
          </p>
          <Link
            href="/contact?intent=strategy-call"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-xl hover:shadow-indigo/25"
          >
            Book Free AI Strategy Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
