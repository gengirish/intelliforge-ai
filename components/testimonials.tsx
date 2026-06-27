"use client";

import { Quote, Linkedin, BadgeCheck, Building2 } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { Testimonial } from "@/lib/constants";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div>
      <p className="mb-8 text-center text-sm text-gray-500">
        Names changed for confidentiality. Case study details available on
        request.
      </p>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {testimonials.map((t, i) => (
          <AnimateOnScroll key={i} delay={i * 0.1}>
            <div className="glass-card min-w-[320px] max-w-[400px] shrink-0 snap-start rounded-2xl p-6 sm:min-w-[380px]">
              <Quote
                className="h-8 w-8 text-indigo/40"
                aria-hidden="true"
              />
              <p className="mt-4 text-base leading-relaxed text-gray-200 not-italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-sm font-bold text-white">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-700/50">
                  <Building2
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {t.linkedinUrl ? (
                      <a
                        href={t.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white hover:text-cyan"
                      >
                        {t.author}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-white">
                        {t.author}
                      </p>
                    )}
                    {t.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo/10 px-2 py-0.5 text-[10px] font-medium text-indigo">
                        <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                        Verified via LinkedIn
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {t.role}, {t.company}
                  </p>
                  {t.linkedinUrl && (
                    <Linkedin
                      className="mt-1 h-3 w-3 text-gray-500"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
