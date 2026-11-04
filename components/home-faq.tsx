import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import { faqs } from "@/lib/faqs";

export function HomeFaq() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {faqs
        .filter((faq) => faq.home)
        .map((faq, i) => (
          <AnimateOnScroll key={faq.q} delay={i * 0.05}>
            <details className="glass-card group rounded-xl">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-bold text-heading sm:p-6 [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-subtle transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6">
                {faq.a}
              </p>
            </details>
          </AnimateOnScroll>
        ))}

      <AnimateOnScroll className="pt-4 text-center">
        <Link
          href="/pricing#faq"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
        >
          See pricing and every FAQ
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </AnimateOnScroll>
    </div>
  );
}
