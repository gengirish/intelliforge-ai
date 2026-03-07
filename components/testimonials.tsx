"use client";

import { Quote } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { Testimonial } from "@/lib/constants";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
      {testimonials.map((t, i) => (
        <AnimateOnScroll key={i} delay={i * 0.1}>
          <div className="glass-card min-w-[320px] max-w-[400px] shrink-0 snap-start rounded-2xl p-6 sm:min-w-[380px]">
            <Quote className="h-8 w-8 text-indigo/40" />
            <p className="mt-4 text-sm leading-relaxed text-gray-300 italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-sm font-bold text-white">
                {t.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t.author}</p>
                <p className="text-xs text-gray-400">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
