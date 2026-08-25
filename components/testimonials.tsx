import { Quote, Linkedin, BadgeCheck } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { Testimonial } from "@/lib/constants";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function companyInitials(company: string): string {
  return company
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div>
      <p className="mb-8 text-center text-sm text-gray-500">
        From teams we&apos;ve worked with
      </p>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {testimonials.map((t, i) => (
          <AnimateOnScroll key={i} delay={i * 0.1}>
            <article className="glass-card relative min-w-[320px] max-w-[400px] shrink-0 snap-start rounded-2xl p-6 sm:min-w-[380px]">
              <div
                className="absolute left-0 top-6 h-12 w-1 rounded-full bg-gradient-to-b from-indigo to-violet"
                aria-hidden="true"
              />

              <Quote
                className="h-6 w-6 text-indigo/30"
                aria-hidden="true"
              />

              <blockquote className="mt-4 text-base leading-relaxed text-gray-100">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <footer className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {t.avatarInitials ??
                    t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                </div>

                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-xs font-bold text-gray-300"
                  aria-hidden="true"
                >
                  {companyInitials(t.company)}
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
                    {t.linkedinUrl && t.verified && (
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
              </footer>
            </article>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
