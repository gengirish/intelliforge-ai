import { type CSSProperties } from "react";
import { ArrowRight, CalendarCheck, ChevronDown } from "lucide-react";
import { BookCallLink } from "@/components/book-call-link";
import { StatBar } from "@/components/stat-bar";

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden pb-10 pt-12 sm:pb-20 sm:pt-16">
      {/* No decorative blur blobs here on purpose. The three-gradient-orb hero is
          the house style of every AI agency template. */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className="rise-in font-display mx-auto max-w-5xl text-balance text-4xl font-bold leading-tight text-heading sm:text-5xl lg:text-6xl"
            style={{ "--rise-from": "30px" } as CSSProperties}
          >
            We Build AI Agents, Automate Workflows, and Ship AI Apps{" "}
            <span className="gradient-text sm:whitespace-nowrap">in Weeks, Not Months</span>
          </h1>

          <p
            className="rise-in mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl"
            style={{ "--rise-delay": "0.1s" } as CSSProperties}
          >
            RAG pipelines, multi-agent systems and full-stack AI apps, built
            from Hyderabad. Our 5-Level Framework decides where you start.
          </p>

          <div
            className="rise-in mx-auto mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
            style={{ "--rise-delay": "0.2s" } as CSSProperties}
          >
            <BookCallLink
              testId="hero-book-call-cta"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-on-accent transition-all hover:shadow-xl hover:shadow-indigo/25 sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book Free AI Strategy Call
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </BookCallLink>
            <a
              href="#starting-level"
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-body transition-colors hover:bg-surface hover:text-heading sm:w-auto"
            >
              Find Your Starting Level
              <ChevronDown
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <p
            className="rise-in mt-4 text-sm text-muted"
            style={{ "--rise-delay": "0.25s", "--rise-from": "0px" } as CSSProperties}
          >
            Free call: we scope your idea and product together.
          </p>
        </div>

        <div className="mt-8 border-t border-border pt-8 sm:mt-12 sm:pt-10">
          <StatBar />
        </div>
      </div>
    </section>
  );
}
