import { Layers, Shield, Users, Zap, type LucideIcon } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import { whyIntelliforge } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Shield,
  Users,
  Zap,
};

export function WhyIntelliforge() {
  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
      {whyIntelliforge.map((item, i) => {
        const Icon = iconMap[item.icon] || Zap;

        return (
          <AnimateOnScroll key={item.title} delay={i * 0.05}>
            <div className="glass-card h-full rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/10">
                  <Icon className="h-5 w-5 text-indigo" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-heading">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </AnimateOnScroll>
        );
      })}
    </div>
  );
}
