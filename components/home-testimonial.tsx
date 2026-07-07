import { Quote } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { Testimonial } from "@/lib/constants";

interface HomeTestimonialProps {
  testimonial: Testimonial;
}

export function HomeTestimonial({ testimonial }: HomeTestimonialProps) {
  const initials =
    testimonial.avatarInitials ??
    testimonial.author
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <AnimateOnScroll>
      <figure className="glass-card relative mx-auto max-w-3xl rounded-2xl p-6 sm:p-8">
        <div
          className="absolute left-0 top-6 h-10 w-1 rounded-full bg-gradient-to-b from-indigo to-violet"
          aria-hidden="true"
        />

        <Quote className="h-5 w-5 text-indigo/30" aria-hidden="true" />

        <blockquote className="mt-4 text-base leading-relaxed text-gray-100 sm:text-lg">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-sm font-bold text-white"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {testimonial.author}
            </p>
            <p className="text-xs text-gray-400">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </figcaption>
      </figure>
    </AnimateOnScroll>
  );
}
