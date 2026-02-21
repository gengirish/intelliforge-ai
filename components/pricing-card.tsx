import Link from "next/link";
import { Check } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { PricingTier } from "@/lib/constants";

interface PricingCardProps {
  tier: PricingTier;
  index: number;
}

export function PricingCard({ tier, index }: PricingCardProps) {
  return (
    <AnimateOnScroll delay={index * 0.15}>
      <div
        className={`relative h-full rounded-2xl p-8 ${
          tier.highlighted
            ? "border-2 border-indigo bg-gradient-to-b from-indigo/10 to-violet/5 shadow-xl shadow-indigo/10"
            : "glass-card"
        }`}
      >
        {tier.highlighted && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo to-violet px-4 py-1 text-xs font-bold text-white">
            MOST POPULAR
          </div>
        )}

        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
            {tier.levels}
          </span>
          <h3 className="mt-1 text-2xl font-bold text-white">{tier.name}</h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">{tier.price}</span>
            <span className="text-sm text-gray-400">/ {tier.period}</span>
          </div>
          <p className="mt-3 text-sm text-gray-400">{tier.description}</p>
        </div>

        <ul className="mb-8 space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
            tier.highlighted
              ? "bg-gradient-to-r from-indigo to-violet text-white hover:shadow-lg hover:shadow-indigo/25"
              : "border border-border bg-surface text-white hover:bg-surface-hover"
          }`}
        >
          {tier.cta}
        </Link>
      </div>
    </AnimateOnScroll>
  );
}
