import { TrendingUp, ExternalLink, MapPin, Clock } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { CaseStudy } from "@/lib/constants";

type CaseStudyMeta = CaseStudy & {
  clientDescriptor?: string;
  location?: string;
};

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const extended = study as CaseStudyMeta;

  return (
    <AnimateOnScroll delay={index * 0.1}>
      <div className="glass-card group flex h-full flex-col rounded-2xl p-6 lg:p-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-block rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
              {study.industry}
            </span>
            <h3 className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-cyan">
              {study.client}
            </h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
              {extended.clientDescriptor && (
                <span>{extended.clientDescriptor}</span>
              )}
              {!extended.clientDescriptor && extended.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {extended.location}
                </span>
              )}
              {(extended.clientDescriptor || extended.location) && (
                <span className="text-gray-600" aria-hidden="true">
                  ·
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
                {study.timeline}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 border-t border-border pt-5">
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-indigo/80">
              Problem
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
              {study.problem}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-indigo/80">
              Solution
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-300">
              {study.solution}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          {study.impact.map((metric) => (
            <div
              key={metric}
              className="flex items-center gap-2 rounded-lg border border-green-500/15 bg-green-500/5 px-3 py-2"
            >
              <TrendingUp
                className="h-3.5 w-3.5 shrink-0 text-green-400"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-green-300">
                {metric}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <a
            href={study.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo/20 bg-indigo/5 px-4 py-2.5 text-sm font-semibold text-cyan transition-colors hover:border-indigo/40 hover:bg-indigo/10"
          >
            {study.productUsed}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {study.tech.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
