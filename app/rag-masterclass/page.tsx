import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ExternalLink,
  MessageSquare,
  Video,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/constants";
import {
  formatEventDate,
  formatEventTimeRange,
  isEventUpcoming,
  ragMasterClass,
} from "@/lib/events";

export const metadata: Metadata = {
  title: "RAG Systems & Architecture Masterclass",
  description:
    "Enroll in IntelliForge AI's RAG Systems & Architecture Masterclass — 3-hour live session on July 11, 2026. ₹299 · recording included · pipeline, patterns & enterprise architecture.",
  alternates: { canonical: "/rag-masterclass" },
  openGraph: {
    title: "RAG Systems & Architecture Masterclass | IntelliForge AI",
    description:
      "3-hour live masterclass on RAG pipelines, architectural patterns, and enterprise reference architecture. July 11, 2026 · 5–8 PM IST · ₹299.",
    url: "https://www.intelliforge.tech/rag-masterclass",
  },
};

function CopyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-sm text-white">{value}</p>
    </div>
  );
}

export default function RagMasterClassPage() {
  const upcoming = isEventUpcoming(ragMasterClass);
  const eventDate = formatEventDate(ragMasterClass);
  const timeRange = formatEventTimeRange(ragMasterClass);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: ragMasterClass.title,
    description: ragMasterClass.description,
    startDate: ragMasterClass.startAt.toISOString(),
    endDate: ragMasterClass.endAt.toISOString(),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: upcoming
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventPast",
    location: {
      "@type": "VirtualLocation",
      url: ragMasterClass.courseUrl,
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    performer: {
      "@type": "Person",
      name: ragMasterClass.host,
    },
    offers: {
      "@type": "Offer",
      price: String(ragMasterClass.priceAmount),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: ragMasterClass.courseUrl,
    },
  };

  return (
    <div className="pt-8 pb-24">
      <JsonLd data={eventSchema} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Live Masterclass"
          title={ragMasterClass.title}
          description={ragMasterClass.description}
        />

        <AnimateOnScroll>
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            {upcoming ? (
              <>
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-cyan/20 bg-cyan/5 p-4">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                  <div>
                    <p className="font-semibold text-white">{eventDate}</p>
                    <p className="mt-1 text-sm text-gray-400">
                      {timeRange} · {ragMasterClass.seats} · Instructor:{" "}
                      {ragMasterClass.host}
                    </p>
                  </div>
                </div>

                <a
                  href={ragMasterClass.courseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forge to-amber-500 px-8 py-4 text-sm font-semibold text-navy transition-all hover:shadow-lg hover:shadow-forge/25"
                >
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                  Enroll on IntelliForge Learning — {ragMasterClass.price}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>

                <p className="mt-4 text-center text-sm text-gray-500">
                  3 hours live · recording included · free RAG primer available on
                  the course page
                </p>

                <div className="mt-8 border-t border-border pt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Already enrolled? Join on Zoom
                  </h3>
                  <a
                    href={ragMasterClass.zoom.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-surface hover:text-white"
                  >
                    <Video className="h-4 w-4" aria-hidden="true" />
                    Join Zoom Meeting
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <CopyField
                      label="Meeting ID"
                      value={ragMasterClass.zoom.meetingIdFormatted}
                    />
                    <CopyField
                      label="Passcode"
                      value={ragMasterClass.zoom.passcode}
                    />
                  </div>

                  <div className="mt-4">
                    <a
                      href={ragMasterClass.zoom.chatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-cyan transition-colors hover:text-cyan-light"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      Open meeting chat
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-lg font-semibold text-white">
                  This session has ended
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Missed it? Check the course page for the recording, or book a
                  strategy call for private RAG workshops.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={ragMasterClass.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 text-sm font-semibold text-white"
                  >
                    View course on Learning
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link
                    href="/contact?intent=strategy-call"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-gray-300 hover:bg-surface"
                  >
                    Book a strategy call
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12">
          <h2 className="font-display text-xl font-bold text-white">
            Session agenda
          </h2>
          <ul className="mt-4 space-y-3">
            {ragMasterClass.agenda.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-gray-400"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-forge"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12">
          <h2 className="font-display text-xl font-bold text-white">
            What you&apos;ll learn
          </h2>
          <ul className="mt-4 space-y-3">
            {ragMasterClass.topics.map((topic) => (
              <li
                key={topic}
                className="flex items-start gap-3 text-sm text-gray-400"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-cyan"
                  aria-hidden="true"
                />
                {topic}
              </li>
            ))}
          </ul>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12">
          <div className="rounded-2xl border border-indigo/20 bg-indigo/5 p-6 text-center">
            <p className="text-sm text-gray-400">
              Full course outline, free demo, and enrollment on{" "}
              <a
                href={ragMasterClass.courseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo transition-colors hover:text-indigo/80"
              >
                IntelliForge Learning
              </a>
              .
            </p>
            <a
              href={ragMasterClass.courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo/40 px-6 py-3 text-sm font-semibold text-indigo transition-colors hover:bg-indigo/10"
            >
              Open course page
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
