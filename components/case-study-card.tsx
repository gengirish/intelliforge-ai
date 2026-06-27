import Link from "next/link";
import { TrendingUp, ExternalLink } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { CaseStudy } from "@/lib/constants";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  return (
    <AnimateOnScroll delay={index * 0.1}>
      <div className="glass-card flex h-full flex-col rounded-2xl p-6 lg:p-8">
        <span className="inline-block w-fit rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
          {study.industry}
        </span>

        <p className="mt-3 text-xs text-gray-500">
          Timeline: {study.timeline} | Stack: {study.tech.join(", ")}
        </p>

        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            The Problem
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-gray-400">
            {study.problem}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Our Solution
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">
            {study.solution}
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-indigo/20 bg-indigo/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Product used
          </p>
          <a
            href={study.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:text-cyan-light"
          >
            {study.productUsed}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-5 space-y-2">
          {study.impact.map((metric) => (
            <div
              key={metric}
              className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2"
            >
              <TrendingUp
                className="h-4 w-4 shrink-0 text-green-400"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-green-300">
                {metric}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {study.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
