import { Building2, Handshake, Layers, Rocket, type LucideIcon } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import { audiences } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Handshake,
  Layers,
  Rocket,
};

export function AudienceCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {audiences.map((audience, i) => {
        const Icon = iconMap[audience.icon] || Rocket;

        return (
          <AnimateOnScroll key={audience.name} delay={i * 0.05}>
            <div className="glass-card flex h-full items-start gap-4 rounded-2xl p-5 sm:p-6 lg:flex-col">
              <Icon className="h-6 w-6 shrink-0 text-indigo" aria-hidden="true" />
              <div>
                <h3 className="text-base font-bold text-heading">
                  {audience.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {audience.copy}
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        );
      })}
    </div>
  );
}
