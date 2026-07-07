import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import { founder } from "@/lib/founder";
import { portfolioProjectCount } from "@/lib/portfolio";

const FOUNDER_AVATAR_URL =
  "https://avatars.githubusercontent.com/u/gengirish";

const proofPoints = [
  "Fortune 500 delivery across banking, pharma, telecom, compliance, and IoT",
  "M.Tech in Data Science & AI — IIIT Dharwad (Institute of National Importance)",
  `${portfolioProjectCount}+ AI products shipped on Vercel in production`,
];

export function FounderSpotlight() {
  return (
    <section className="relative border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <Image
                  src={FOUNDER_AVATAR_URL}
                  alt={founder.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
                />
                <div>
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {founder.name}
                  </h2>
                  <p className="mt-1 text-sm text-cyan">{founder.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    IoT and neural networks since 2012 — now bridging legacy
                    enterprise systems and modern AI for Indian businesses.
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
                  <li key={point} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo/20">
                      <Check className="h-3 w-3 text-indigo" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={founder.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
                >
                  View full portfolio
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 transition-colors hover:text-white"
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
