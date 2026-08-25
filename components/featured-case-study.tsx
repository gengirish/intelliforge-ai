import { TrendingUp, ExternalLink, Clock } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import { LiveProductPreview } from "./live-product-preview";
import type { CaseStudy } from "@/lib/constants";

type CaseStudyMeta = CaseStudy & {
  clientDescriptor?: string;
  location?: string;
};

interface FeaturedCaseStudyProps {
  study: CaseStudy;
}

function getMetaLine(study: CaseStudyMeta): string {
  if (study.clientDescriptor) return study.clientDescriptor;
  return `${study.industry} · ${study.timeline}`;
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
