import Link from "next/link";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import {
  formatEventShortDate,
  isEventUpcoming,
  ragMasterClass,
} from "@/lib/events";

type RagMasterClassPromoProps = {
  variant?: "banner" | "card";
};

export function RagMasterClassPromo({ variant = "banner" }: RagMasterClassPromoProps) {
  if (!isEventUpcoming(ragMasterClass)) {
    return null;
  }

  const shortDate = formatEventShortDate(ragMasterClass);

  if (variant === "card") {
    return (
      <div className="rounded-2xl border border-forge/30 bg-gradient-to-r from-forge/15 via-indigo/10 to-violet/10 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-forge">
              Live Masterclass · {ragMasterClass.price} · Recording included
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              {ragMasterClass.title}
            </h2>
            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              {ragMasterClass.subtitle}. Instructor: {ragMasterClass.host}.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-cyan">
              <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
              {shortDate} {ragMasterClass.timezoneLabel}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={ragMasterClass.courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forge to-amber-500 px-6 py-3 text-sm font-semibold text-navy transition-all hover:shadow-lg hover:shadow-forge/25"
            >
              Enroll — {ragMasterClass.price}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/rag-masterclass"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-surface hover:text-white"
            >
              Zoom details for attendees
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-forge/20 bg-gradient-to-r from-forge/10 via-indigo/5 to-violet/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-300 sm:text-left">
          <span className="font-semibold text-forge">{ragMasterClass.title}</span>
          <span className="mx-2 hidden text-gray-600 sm:inline" aria-hidden="true">
            ·
          </span>
          <span className="mt-1 block sm:mt-0 sm:inline">
            {shortDate} · {ragMasterClass.price}
          </span>
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/rag-masterclass"
            className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            Zoom details
          </Link>
          <a
            href={ragMasterClass.courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-forge/20 px-4 py-1.5 text-sm font-semibold text-forge transition-colors hover:bg-forge/30"
          >
            Enroll on Learning
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
