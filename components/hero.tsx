"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, CalendarCheck, ChevronDown } from "lucide-react";
import { MissionBadge } from "./mission-badge";
import { FounderAvatar } from "./founder-avatar";
import { founder } from "@/lib/founder";
import { startingPrice } from "@/lib/constants";
import { BookCallLink } from "@/components/book-call-link";

type AudienceKey = "Startups" | "SaaS Companies" | "Enterprises" | "Agencies";

const audiences: AudienceKey[] = [
  "Startups",
  "SaaS Companies",
  "Enterprises",
  "Agencies",
];

const audienceCopy: Record<AudienceKey, string> = {
  Startups:
    "Idea to AI-powered MVP — without burning runway on the wrong stack.",
  "SaaS Companies":
    "Embed agents in your product, cut churn, and ship features your competitors can't copy.",
  Enterprises:
    "Production AI that respects compliance and legacy systems — banking, pharma, telecom, IoT.",
  Agencies:
    "White-label AI builds. You keep the client; we handle the engineering.",
};

export function Hero() {
  const [activeAudience, setActiveAudience] = useState<AudienceKey>("Startups");

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-gradient relative overflow-hidden pb-20 pt-8 sm:pb-32 sm:pt-12">
      {/* No decorative blur blobs here on purpose. The three-gradient-orb hero is
          the house style of every AI agency template, and this pitch is one named
          senior engineer, not an abstract. The founder byline below carries the
          hero instead. */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="rise-in">
            <MissionBadge />
          </div>

          <h1
            className="rise-in font-display mx-auto mt-6 max-w-5xl text-4xl font-bold leading-tight text-heading sm:text-5xl lg:text-6xl"
            style={{ "--rise-delay": "0.1s", "--rise-from": "30px" } as CSSProperties}
          >
            Enterprise Engineers Who{" "}
            <span className="gradient-text">Ship AI for India</span>
          </h1>

          <p
            className="rise-in mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl"
            style={{ "--rise-delay": "0.2s" } as CSSProperties}
          >
            We build RAG pipelines, multi-agent systems and full-stack AI apps
            from Hyderabad, on top of fourteen years of Fortune 500 engineering.
            Our 5-Level Framework decides where you start.
          </p>

          {/* The person, not a logo wall. Swap FOUNDER_PHOTO in
              components/founder-avatar.tsx for a real headshot and this becomes
              a face at the top of the page. */}
          <a
            href={founder.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rise-in group mx-auto mt-6 flex w-fit items-center gap-3 rounded-full border border-border bg-surface/60 py-2 pl-2 pr-5 text-left transition-colors hover:border-indigo/50"
            style={{ "--rise-delay": "0.22s", "--rise-from": "10px" } as CSSProperties}
          >
            <FounderAvatar size={40} className="rounded-full" />
            <span className="text-sm leading-tight">
              <span className="block font-semibold text-heading">
                Built by {founder.name}
              </span>
              <span className="block text-xs text-subtle">
                14 years enterprise engineering. M.Tech DSAI, IIIT Dharwad.
              </span>
            </span>
          </a>

          <div
            className="rise-in mx-auto mt-6 flex flex-wrap items-center justify-center gap-2"
            style={{ "--rise-delay": "0.25s", "--rise-from": "10px" } as CSSProperties}
            role="tablist"
            aria-label="Target audience"
          >
            {audiences.map((audience) => (
              <button
                key={audience}
                type="button"
                role="tab"
                aria-selected={activeAudience === audience}
                onClick={() => setActiveAudience(audience)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeAudience === audience
                    ? "bg-gradient-to-r from-indigo to-violet text-on-accent shadow-lg shadow-indigo/20"
                    : "bg-gradient-to-r from-indigo/15 to-violet/15 text-indigo hover:from-indigo/25 hover:to-violet/25"
                }`}
              >
                {audience}
              </button>
            ))}
          </div>

          {/* Keyed so switching audience remounts the node and replays the
              CSS fade — no animation library needed for a 250ms swap. */}
          <p
            key={activeAudience}
            className="rise-in mx-auto mt-4 max-w-xl text-base text-body"
            style={{ "--rise-from": "8px" } as CSSProperties}
          >
            {audienceCopy[activeAudience]}
          </p>

          <p
            className="rise-in mt-4 text-sm font-medium text-cyan"
            style={{ "--rise-delay": "0.35s", "--rise-from": "0px" } as CSSProperties}
          >
            Starting at {startingPrice}
          </p>

          <div
            className="rise-in mx-auto mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
            style={{ "--rise-delay": "0.3s" } as CSSProperties}
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
            <button
              type="button"
              onClick={scrollToPortfolio}
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-body transition-colors hover:bg-surface hover:text-heading sm:w-auto"
              aria-label="Scroll to portfolio section"
            >
              See Our Work
              <ChevronDown
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
