"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MissionBadge } from "./mission-badge";
import { startingPrice } from "@/lib/constants";
import { portfolioProjectCount } from "@/lib/portfolio";

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
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-72 w-72 rounded-full bg-indigo/10 blur-3xl" />
        <div className="absolute -right-4 top-1/3 h-96 w-96 rounded-full bg-violet/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MissionBadge />
          </motion.div>

          <motion.h1
            className="font-display mx-auto mt-6 max-w-5xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Enterprise Engineers Who{" "}
            <span className="gradient-text">Ship AI for India</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Based in Hyderabad — we bridge Fortune 500 engineering with production
            AI: RAG pipelines, multi-agent systems, full-stack apps.{" "}
            {portfolioProjectCount}+ products live on Vercel through our 5-Level
            Framework.
          </motion.p>

          <motion.p
            className="mx-auto mt-3 max-w-xl text-sm text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            Led by Girish Hiremath — 14+ years enterprise, M.Tech DSAI @ IIIT
            Dharwad
          </motion.p>

          <motion.div
            className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
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
                    ? "bg-gradient-to-r from-indigo to-violet text-white shadow-lg shadow-indigo/20"
                    : "bg-gradient-to-r from-indigo/15 to-violet/15 text-indigo hover:from-indigo/25 hover:to-violet/25"
                }`}
              >
                {audience}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeAudience}
              className="mx-auto mt-4 max-w-xl text-base text-gray-300"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {audienceCopy[activeAudience]}
            </motion.p>
          </AnimatePresence>

          <motion.p
            className="mt-4 text-sm font-medium text-cyan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Starting at {startingPrice}
          </motion.p>

          <motion.div
            className="mx-auto mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact?intent=strategy-call"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-xl hover:shadow-indigo/25 sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book Free AI Strategy Call
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <button
              type="button"
              onClick={scrollToPortfolio}
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-gray-300 transition-colors hover:bg-surface hover:text-white sm:w-auto"
              aria-label="Scroll to portfolio section"
            >
              See Our Work
              <ChevronDown
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
