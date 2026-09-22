import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import { FounderAvatar } from "./founder-avatar";
import { founder } from "@/lib/founder";

const proofPoints = [
  "Production AI shipped on Vercel — RAG systems, multi-agent workflows, full-stack apps",
  "All five levels, one team — from prompt workshops to full AI applications",
  "Human-in-the-loop by default — review checkpoints, audit trails, escalation paths",
];

export function FounderSpotlight() {
  return (
    <section className="relative border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <FounderAvatar size={56} className="rounded-xl" />
                <div>
                  <h2 className="font-display text-xl font-bold text-heading sm:text-2xl">
                    {founder.name}
                  </h2>
                  <p className="mt-1 text-sm text-cyan">{founder.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Bridging existing business systems and modern AI for
                    Indian businesses of every size.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-forge">
                Why IntelliForge
              </p>
              <ul className="mt-4 space-y-3">
                {proofPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo/20">
                      <Check className="h-3 w-3 text-indigo" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
                >
                  Our story
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
