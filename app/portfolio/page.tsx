import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { portfolioProjects } from "@/lib/portfolio";
import { BookCallLink } from "@/components/book-call-link";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Production AI products built and shipped by IntelliForge AI — multi-agent research systems, RAG platforms, compliance tooling, and full-stack AI apps, each with a live URL you can open.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | IntelliForge AI",
    description:
      "Production AI products built by IntelliForge AI — every one with a live URL you can open.",
    url: "https://www.intelliforge.tech/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Portfolio"
          title="Built by Us, Powered by AI"
          description="Every project below is live on Vercel with a URL you can open right now — not mockups in a deck. Filter by the framework level each one sits at."
        />

        <PortfolioGrid projects={portfolioProjects} initialExpanded />

        <AnimateOnScroll className="mt-16 text-center">
          <div className="glass-card mx-auto max-w-2xl rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-white">
              Want something like this for your business?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-400">
              Book a free strategy call and we&apos;ll map which level of the
              framework your first build should start at.
            </p>
            <BookCallLink
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25"
            >
              Book Free AI Strategy Call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </BookCallLink>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
