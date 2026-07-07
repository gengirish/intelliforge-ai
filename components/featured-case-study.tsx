"use client";

import { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  ExternalLink,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { CaseStudy } from "@/lib/constants";

type CaseStudyMeta = CaseStudy & {
  clientDescriptor?: string;
  location?: string;
};

interface FeaturedCaseStudyProps {
  study: CaseStudy;
}

const IFRAME_LOAD_TIMEOUT_MS = 12_000;

function getMetaLine(study: CaseStudyMeta): string {
  if (study.clientDescriptor) return study.clientDescriptor;
  return `${study.industry} · ${study.timeline}`;
}

function LiveProductPreview({
  study,
  displayUrl,
}: {
  study: CaseStudy;
  displayUrl: string;
}) {
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "blocked">(
    "loading",
  );
  const loadTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setLoadState("loading");

    loadTimeoutRef.current = window.setTimeout(() => {
      setLoadState((current) =>
        current === "loading" ? "blocked" : current,
      );
    }, IFRAME_LOAD_TIMEOUT_MS);

    return () => {
      if (loadTimeoutRef.current !== undefined) {
        window.clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [study.productUrl]);

  const handleLoad = () => {
    if (loadTimeoutRef.current !== undefined) {
      window.clearTimeout(loadTimeoutRef.current);
    }
    setLoadState("loaded");
  };

  const handleError = () => {
    if (loadTimeoutRef.current !== undefined) {
      window.clearTimeout(loadTimeoutRef.current);
    }
    setLoadState("blocked");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-navy-card shadow-2xl shadow-indigo/5">
      <div className="flex items-center gap-3 border-b border-border bg-navy-light/90 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-surface px-3 py-1.5 font-mono text-[11px] text-gray-400">
          {displayUrl}
        </div>
      </div>

      <div className="relative h-[400px] overflow-hidden bg-navy-light/50">
        {loadState === "loading" && (
          <div
            className="absolute inset-0 z-10 animate-pulse bg-gradient-to-br from-indigo/10 via-violet/5 to-cyan/10"
            aria-hidden="true"
          >
            <div className="flex h-full flex-col gap-4 p-6">
              <div className="h-4 w-1/3 rounded-md bg-white/5" />
              <div className="h-3 w-2/3 rounded-md bg-white/5" />
              <div className="mt-4 h-3 w-full rounded-md bg-white/5" />
              <div className="h-3 w-5/6 rounded-md bg-white/5" />
              <div className="mt-auto h-24 w-full rounded-lg bg-white/5" />
            </div>
            <span className="sr-only">Loading live product preview</span>
          </div>
        )}

        {loadState !== "blocked" && (
          <iframe
            src={study.productUrl}
            title={`${study.productUsed} live demo`}
            sandbox="allow-scripts allow-same-origin allow-popups"
            className={`h-full w-full border-0 bg-white transition-opacity duration-300 ${
              loadState === "loaded" ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}

        {loadState === "blocked" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-indigo/15 via-violet/10 to-cyan/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">
              {study.productUsed}
            </p>
            <p className="max-w-xs text-sm text-gray-400">
              This live demo can&apos;t be embedded here. Open it in a new tab
              to explore the full product.
            </p>
            <a
              href={study.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25"
            >
              Open live demo
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function FeaturedCaseStudy({ study }: FeaturedCaseStudyProps) {
  const extended = study as CaseStudyMeta;
  const displayUrl = study.productUrl.replace(/^https?:\/\//, "");

  return (
    <AnimateOnScroll>
      <div className="glass-card overflow-hidden rounded-3xl">
        <div className="grid gap-0 lg:grid-cols-2">
          {/* Left: narrative + impact */}
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                Featured case study
              </span>
              <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-medium text-gray-400">
                {study.industry}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              {study.client}
            </h3>

            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
              <span>{getMetaLine(extended)}</span>
              {extended.location && (
                <>
                  <span className="hidden text-gray-600 sm:inline" aria-hidden="true">
                    ·
                  </span>
                  <span>{extended.location}</span>
                </>
              )}
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  The problem
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-base">
                  {study.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Our solution
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base">
                  {study.solution}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {study.impact.map((metric) => (
                <div
                  key={metric}
                  className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-4"
                >
                  <TrendingUp
                    className="h-4 w-4 text-green-400"
                    aria-hidden="true"
                  />
                  <p className="mt-2 text-sm font-semibold leading-snug text-green-300">
                    {metric}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {study.timeline}
              </span>
              <span className="text-gray-600" aria-hidden="true">
                ·
              </span>
              <span>{study.tech.join(" · ")}</span>
            </div>
          </div>

          {/* Right: live product preview */}
          <div className="border-t border-border bg-navy-light/30 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Live product
            </p>

            <LiveProductPreview study={study} displayUrl={displayUrl} />

            <a
              href={study.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:text-cyan-light"
            >
              {study.productUsed}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
