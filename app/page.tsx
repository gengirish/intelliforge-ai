import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { IndustryLogos } from "@/components/industry-logos";
import { MissionBadge } from "@/components/mission-badge";
import { WhyIntelliforge } from "@/components/why-intelliforge";
import { FrameworkStepper } from "@/components/framework-stepper";
import { AudienceCards } from "@/components/audience-cards";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { FeaturedCaseStudy } from "@/components/featured-case-study";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { AiDemo } from "@/components/ai-demo";
import { HomeTestimonial } from "@/components/home-testimonial";
import { HomeFaq } from "@/components/home-faq";
import { services, caseStudies, testimonials, type CaseStudy } from "@/lib/constants";
import { homepagePortfolio } from "@/lib/portfolio";
import { BookCallLink } from "@/components/book-call-link";

/** `undefined` when the list is empty, in which case the section is skipped. */
const featuredCaseStudy: CaseStudy | undefined =
  caseStudies.find((study) => study.featured) ?? caseStudies[0];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Proof band */}
      <section className="border-y border-border bg-navy-light/50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IndustryLogos />
          <div className="mt-6 text-center">
            <MissionBadge />
          </div>
        </div>
      </section>

      {/* Why IntelliForge */}
      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why IntelliForge"
            title="What You Get When You Work With Us"
            description="One team, transparent pricing and full ownership of everything we build for you."
          />
          <WhyIntelliforge />
        </div>
      </section>

      {/* 5-Level Framework */}
      <section className="section-blueprint py-14 sm:py-24">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-8">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              centered={false}
              className="mb-6"
              label="Our 5-Level Framework"
              title="From AI Foundations to Full Applications"
              description="A clear roadmap that takes your business from learning how to talk to AI all the way to building production-grade AI applications."
            />
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
            >
              See our full 5-level AI framework
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <FrameworkStepper services={services} />
        </div>
      </section>

      {/* Framework starting-point tool */}
      <section id="starting-level" className="scroll-mt-20 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Try It Yourself"
            title="Find Your Starting Level on Our 5-Level Framework"
            description="Pick your business type and get a tailored recommendation: which level to start at and what to automate first. No signup required."
          />
          <AiDemo />
          <AnimateOnScroll className="mt-8 text-center">
            <Link
              href="/ai-audit"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
            >
              Want a fuller assessment? Get a free AI audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section-blueprint py-14 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Who It's For"
            title="Start From Where You Are"
          />
          <AudienceCards />
        </div>
      </section>

      {/* Featured project */}
      {featuredCaseStudy && (
        <section className="py-14 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Case Study"
              title="We Built This for Ourselves First"
              description="Before offering an AI Digital Profile to anyone else, we built our own. It's public, so you can open it and ask it questions."
            />
            <FeaturedCaseStudy study={featuredCaseStudy} />
          </div>
        </section>
      )}

      {/* Recommendation — hidden while `testimonials` is empty, rather than
          rendering a heading with nothing under it. */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Testimonial"
              title="What Clients Say"
            />
            <HomeTestimonial testimonial={testimonials[0]} />
          </div>
        </section>
      )}

      {/* Portfolio */}
      <section id="portfolio" className="section-blueprint scroll-mt-20 py-14 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Portfolio"
            title="Built by Us, Powered by AI"
            description="Real tools and products we've built — proof of what's possible at every level."
          />

          <PortfolioGrid projects={homepagePortfolio} initialExpanded compact />

          <AnimateOnScroll className="mt-8 text-center sm:mt-12">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
            >
              See every project we&apos;ve shipped
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="FAQ"
            title="Cost, Ownership and Your Data"
          />
          <HomeFaq />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="glass-card rounded-3xl p-6 text-center sm:p-16">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Ready to Ship Production AI?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
                Hyderabad-based, Bharat AI aligned — from prompt workshops to
                multi-agent systems. Book a free call and we&apos;ll scope your
                idea and product together.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <BookCallLink
                  testId="closing-book-call-cta"
                  className="rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-on-accent transition-all hover:shadow-xl hover:shadow-indigo/25"
                >
                  Book Free AI Strategy Call
                </BookCallLink>
                <Link
                  href="/ai-audit"
                  className="rounded-full border border-border px-8 py-4 text-sm font-semibold text-body transition-colors hover:bg-surface hover:text-heading"
                >
                  Get Free AI Audit
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
