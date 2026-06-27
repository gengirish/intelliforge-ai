import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { StatBar } from "@/components/stat-bar";
import { FrameworkStepper } from "@/components/framework-stepper";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CaseStudyCard } from "@/components/case-study-card";
import { Testimonials } from "@/components/testimonials";
import { AiDemo } from "@/components/ai-demo";
import {
  services,
  whyIntelliforge,
  portfolioProjects,
  caseStudies,
  testimonials,
} from "@/lib/constants";
import {
  Globe,
  Shield,
  Zap,
  Users,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Shield,
  Zap,
  Users,
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stat bar (replaces industry logos) */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatBar />
        </div>
      </section>

      {/* 5-Level Framework — visual stepper */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our 5-Level Framework"
            title="From AI Foundations to Full Applications"
            description="A proven roadmap that takes your business from learning how to talk to AI all the way to building production-grade AI applications."
          />

          <FrameworkStepper services={services} />

          <AnimateOnScroll className="mt-12 text-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
            >
              See our full 5-level AI framework
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* AI Business Analyzer — moved up after framework */}
      <section className="py-24 bg-navy-light/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="AI Readiness"
            title="See What AI Can Do for Your Business"
            description="Pick your business type and get a tailored starting point — no signup required."
          />
          <AiDemo />
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Portfolio"
            title="Built by Us, Powered by AI"
            description="Real tools and products we've built — proof of what's possible at every level."
          />

          <PortfolioGrid projects={portfolioProjects} />
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-navy-light/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Case Studies"
            title="Real Results, Real Impact"
            description="See how we've helped businesses automate workflows, build AI systems, and save thousands of hours."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.client} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="What Clients Tell Us"
            description="Feedback from teams we've worked with across startups, enterprises, and agencies."
          />

          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* Why IntelliForge */}
      <section className="py-24 bg-navy-light/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why IntelliForge AI"
            title="Enterprise Depth, Startup Speed"
            description="Built on 13+ years of enterprise engineering and cutting-edge AI expertise."
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyIntelliforge.map((item, i) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <AnimateOnScroll key={item.title} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo/20 to-violet/20">
                      <Icon className="h-7 w-7 text-indigo" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400">
            Questions about differentiation, licensing, the 5-level framework, or fit?
          </p>
          <Link
            href="/pricing#faq"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
          >
            Read our FAQs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo via-violet to-indigo p-12 text-center sm:p-16">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Stop Losing Time to Manual Work
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                  Companies using our AI solutions save 20+ hours per week.
                  Whether you&apos;re a startup or enterprise — let&apos;s build
                  your AI advantage.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/contact?intent=strategy-call"
                    className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-indigo transition-all hover:bg-gray-100"
                  >
                    Book Free AI Strategy Call
                  </Link>
                  <Link
                    href="/ai-audit"
                    className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  >
                    Get Free AI Audit
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
