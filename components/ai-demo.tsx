"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react";

type BusinessType =
  | ""
  | "saas"
  | "agency"
  | "ecommerce"
  | "consulting"
  | "startup";

type BusinessInsight = {
  opportunities: string[];
  recommendedLevel: string;
  roiTimeframe: string;
};

const businessInsights: Record<Exclude<BusinessType, "">, BusinessInsight> = {
  saas: {
    opportunities: [
      "Automated support ticket triage and intelligent routing with AI agents",
      "Churn prediction agent that flags at-risk accounts before they leave",
      "RAG-powered internal knowledge base for support and sales teams",
    ],
    recommendedLevel: "Start at Level 2 — Workflow Automation",
    roiTimeframe: "Most similar businesses see results in 4–6 weeks",
  },
  agency: {
    opportunities: [
      "AI content production pipeline for blog posts, social, and ad copy at scale",
      "Multi-agent research system for competitive analysis and market intel",
      "Automated client reporting with AI-generated insights and summaries",
    ],
    recommendedLevel: "Start at Level 3 — AI Creative Studio",
    roiTimeframe: "Most similar businesses see results in 3–5 weeks",
  },
  ecommerce: {
    opportunities: [
      "AI customer support agent handling 80% of common queries 24/7",
      "Automated inventory forecasting using sales pattern analysis",
      "AI product description generator trained on your brand voice",
    ],
    recommendedLevel: "Start at Level 2 — Workflow Automation",
    roiTimeframe: "Most similar businesses see results in 4–6 weeks",
  },
  consulting: {
    opportunities: [
      "AI-powered research assistant that compiles market intelligence in minutes",
      "RAG system over your knowledge base for instant institutional memory",
      "Automated report generation from raw data with executive summaries",
    ],
    recommendedLevel: "Start at Level 4 — AI Agent Development",
    roiTimeframe: "Most similar businesses see results in 5–8 weeks",
  },
  startup: {
    opportunities: [
      "AI-powered MVP prototyping — describe features, ship in days not months",
      "Automated competitor monitoring and market intelligence agent",
      "Multi-channel outreach automation with personalized AI messaging",
    ],
    recommendedLevel: "Start at Level 5 — AI App Development",
    roiTimeframe: "Most similar businesses see results in 2–4 weeks",
  },
};

export function AiDemo() {
  const [business, setBusiness] = useState<BusinessType>("");

  // The panel stays mounted so it can animate closed. `lastChosen` holds the
  // most recent real selection so there is still something to render while it
  // collapses after the user picks the placeholder option again.
  const [lastChosen, setLastChosen] = useState<Exclude<BusinessType, ""> | null>(
    null,
  );

  const insight = business ? businessInsights[business] : null;
  const panelInsight = lastChosen ? businessInsights[lastChosen] : null;

  const handleChange = (value: BusinessType) => {
    setBusiness(value);
    if (value) setLastChosen(value);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet">
          <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-white">
          Find Your Starting Level on Our 5-Level Framework
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          A tailored recommendation based on your business type — not a live AI
          demo. Select your industry to see where we&apos;d typically start.
        </p>

        <div className="relative mt-6">
          <label htmlFor="business-type" className="sr-only">
            Business type
          </label>
          <select
            id="business-type"
            value={business}
            onChange={(e) => handleChange(e.target.value as BusinessType)}
            className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 pr-10 text-sm text-white transition-colors focus:border-indigo focus:outline-none"
          >
            <option value="" className="bg-navy">
              Choose your business type...
            </option>
            <option value="saas" className="bg-navy">
              SaaS / Software Company
            </option>
            <option value="agency" className="bg-navy">
              Marketing / Creative Agency
            </option>
            <option value="ecommerce" className="bg-navy">
              E-commerce / Retail
            </option>
            <option value="consulting" className="bg-navy">
              Consulting / Professional Services
            </option>
            <option value="startup" className="bg-navy">
              Startup / Early Stage
            </option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          />
        </div>

        {/* Kept mounted so the panel can transition closed as well as open. */}
        <div className={`collapsible ${insight ? "collapsible-open" : ""}`}>
          <div inert={!insight}>
            {panelInsight && (
            <div className="mt-6 rounded-xl border border-indigo/20 bg-indigo/5 p-5">
              <h4 className="text-sm font-bold text-indigo">
                Top automation opportunities for you
              </h4>
              <ul className="mt-3 space-y-2">
                {panelInsight.opportunities.map((idea, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo/20 text-xs font-bold text-indigo"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    {idea}
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-2 border-t border-indigo/10 pt-4">
                <p className="text-sm font-semibold text-cyan">
                  {panelInsight.recommendedLevel}
                </p>
                <p className="text-sm text-gray-400">
                  {panelInsight.roiTimeframe}
                </p>
              </div>

              <Link
                href="/contact?intent=strategy-call"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25"
              >
                Want this built for you? Book a free call
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
