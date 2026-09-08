import type { Metadata } from "next";
import {
  ArrowRight,
  Award,
  Briefcase,
  Brain,
  ExternalLink,
  User,
  Linkedin,
  Github,
  Mail,
  BookOpen,
  Sparkles,
} from "lucide-react";
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
    "Learn about IntelliForge AI — founded by Girish Hiremath, built on 14+ years of enterprise experience and M.Tech DSAI @ IIIT Dharwad.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | IntelliForge AI",
    description:
      "14+ years of enterprise engineering and M.Tech DSAI — aligned with India's Bharat AI Mission.",
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
          <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-heading sm:text-3xl">
                From Enterprise Engineering to{" "}
                <span className="gradient-text">AI Innovation</span>
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
            <div className="grid grid-cols-2 gap-4">
              {founder.stats.map((stat, i) => (
                <AnimateOnScroll key={stat.label} delay={i * 0.1}>
                  <div className="glass-card rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="mt-1 text-sm text-muted">{stat.label}</div>
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
          <SectionHeading
            label="Founder"
            title="Built by Practitioners, Not Just Consultants"
            description={founder.headline}
          />

          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <div className="glass-card overflow-hidden rounded-2xl">
                  <a
                    href={founder.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-64 flex-col items-center justify-center bg-gradient-to-br from-indigo/20 to-violet/20 transition-colors hover:from-indigo/30 hover:to-violet/30"
                    aria-label="View Girish Hiremath full portfolio"
                  >
                    <FounderAvatar
                      size={80}
                      className="rounded-xl transition-transform group-hover:scale-105"
                    />
                    <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-cyan group-hover:text-cyan-light">
                      View full portfolio
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </a>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-heading">{founder.name}</h3>
                    <p className="text-sm text-cyan">{founder.title}</p>
                    <p className="mt-4 text-sm italic text-muted">
                      &ldquo;{founder.tagline}&rdquo;
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={founder.socialLinks.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-muted transition-colors hover:bg-indigo/20 hover:text-indigo"
                        aria-label="Founder portfolio"
                      >
                        <User className="h-4 w-4" />
                      </a>
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
                        aria-label="Email Girish Hiremath"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="mt-6 space-y-3">
                      {founder.credentials.map((cred) => (
                        <div key={cred.label} className="flex items-start gap-2">
                          <Award className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                          <div>
                            <p className="text-sm font-semibold text-heading">{cred.label}</p>
                            <p className="text-xs text-muted">{cred.detail}</p>
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
                    <p key={i} className="text-muted leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimateOnScroll>

              {/* Industry Experience */}
              <AnimateOnScroll delay={0.2}>
                <div className="mt-8">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-body">
                    <Briefcase className="h-4 w-4 text-indigo" />
                    Industry Experience
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {founder.industries.map((industry) => (
                      <span
                        key={industry}
                        className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-body"
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
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-body">
                    <Brain className="h-4 w-4 text-indigo" />
                    Skills Powering Each Service Level
                  </h4>
                  <div className="mt-3 space-y-2">
                    {founder.skillsToServices.map((item) => (
                      <div
                        key={item.level}
                        className="flex items-start gap-3 rounded-xl bg-surface p-3"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo to-violet text-xs font-bold text-on-accent">
                          {item.level}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-heading">{item.service}</p>
                          <p className="text-xs text-muted">{item.skills}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* AI/ML Toolkit */}
              <AnimateOnScroll delay={0.35}>
                <div className="mt-8">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-body">
                    <Sparkles className="h-4 w-4 text-indigo" />
                    AI/ML Toolkit
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {founder.toolkit.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-body"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Publications & Links */}
              <AnimateOnScroll delay={0.4}>
                <div className="mt-8">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-body">
                    <BookOpen className="h-4 w-4 text-indigo" />
                    Portfolio & Demos
                  </h4>
                  <div className="mt-3 space-y-2">
                    {founder.publications.map((pub) => (
                      <a
                        key={pub.title}
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 rounded-xl bg-surface p-3 transition-colors hover:bg-surface-hover"
                      >
                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                        <div>
                          <p className="text-sm font-semibold text-heading">{pub.title}</p>
                          <p className="text-xs text-muted">{pub.type}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Featured enterprise work (from founder portfolio) */}
          <AnimateOnScroll delay={0.2}>
            <div className="mt-12">
              <h4 className="text-lg font-bold text-heading">Featured Enterprise Work</h4>
              <p className="mt-1 text-sm text-muted">
                Highlights from{" "}
                <a
                  href={founder.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:text-cyan-light"
                >
                  founder.intelliforge.tech
                </a>
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {founder.featuredWork.map((project) => (
                  <div key={project.title} className="glass-card rounded-xl p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                      {project.domain}
                    </span>
                    <h5 className="mt-2 font-bold text-heading">{project.title}</h5>
                    <p className="mt-2 text-sm text-muted">{project.impact}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2 py-0.5 text-[10px] text-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Colleague testimonials from founder portfolio */}
          <AnimateOnScroll delay={0.3}>
            <div className="mt-12">
              <h4 className="text-lg font-bold text-heading">What Colleagues Say</h4>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {founder.colleagueTestimonials.map((t) => (
                  <blockquote
                    key={t.author}
                    className="glass-card rounded-xl p-6 text-base leading-relaxed text-strong"
                  >
                    &ldquo;{t.quote}&rdquo;
                    <footer className="mt-4 text-sm text-muted">
                      — {t.author}, {t.role}
                    </footer>
                  </blockquote>
                ))}
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

        {/* The colleague recommendations above are the site's only testimonials,
            so there is no second testimonial section here to duplicate them. */}

        {/* CTA */}
        <AnimateOnScroll className="text-center">
          <h3 className="text-2xl font-bold text-heading">
            Let&apos;s Build Something Together
          </h3>
          <p className="mt-2 text-muted">
            14+ years of enterprise engineering meets cutting-edge AI. Book a free call to discuss your goals.
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
