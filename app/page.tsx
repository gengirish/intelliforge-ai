import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { FounderSpotlight } from "@/components/founder-spotlight";
import { FrameworkStepper } from "@/components/framework-stepper";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { FeaturedCaseStudy } from "@/components/featured-case-study";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { AiDemo } from "@/components/ai-demo";
import { HomeTestimonial } from "@/components/home-testimonial";
import { services, caseStudies, testimonials } from "@/lib/constants";
import { getHomepagePortfolio, portfolioProjects } from "@/lib/portfolio";

const featuredCaseStudy =
  caseStudies.find((study) => study.featured) ?? caseStudies[0];

const homepagePortfolio = getHomepagePortfolio(portfolioProjects);

export default function HomePage() {
  return (
    <>
      <Hero />

      <FounderSpotlight />

      {/* Framework starting-point tool */}
      <section className="blueprint-grid bg-navy-light/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Try It Yourself"
            title="Find Your Starting Level on Our 5-Level Framework"
            description="Pick your business type and get a tailored recommendation — which level to start at, what to automate first, and a realistic timeline. No signup required."
          />
          <AiDemo />
        </div>
      </section>

      {/* 5-Level Framework */}
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

      {/* Featured case study */}
      <section className="section-blueprint py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Case Study"
            title="Real Results, Real Impact"
            description="How we helped a research firm cut report time by 10x with a multi-agent AI system."
          />
          <FeaturedCaseStudy study={featuredCaseStudy} />
        </div>
      </section>

      {/* Client testimonial */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Client Voice"
            title="What Teams Say After Shipping"
            description="Real feedback from B2B teams we've automated, integrated, and shipped to production."
          />
          <HomeTestimonial testimonial={testimonials[0]} />
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Portfolio"
            title="Built by Us, Powered by AI"
            description="Real tools and products we've built — proof of what's possible at every level."
          />

          <PortfolioGrid projects={homepagePortfolio} />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo via-violet to-indigo p-12 text-center sm:p-16">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              <div className="relative">
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  Ready to Ship Production AI?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                  Hyderabad-based, Bharat AI aligned — from prompt workshops to
                  multi-agent systems. Book a call and we&apos;ll map your
                  starting level on the framework.
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
