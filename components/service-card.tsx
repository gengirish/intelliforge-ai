import { BookOpen, Workflow, Palette, Bot, Code, type LucideIcon } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { ServiceLevel } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Workflow,
  Palette,
  Bot,
  Code,
};

interface ServiceCardProps {
  service: ServiceLevel;
  index: number;
  compact?: boolean;
}

export function ServiceCard({ service, index, compact = false }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Code;

  return (
    <AnimateOnScroll delay={index * 0.1}>
      <div className="glass-card group h-full rounded-2xl p-6 lg:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet transition-transform group-hover:scale-110">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
              Level {service.level}
            </span>
            <h3 className="text-lg font-bold text-white">{service.title}</h3>
          </div>
        </div>

        <p className="mb-1 text-sm font-medium text-violet">{service.subtitle}</p>

        {!compact && (
          <p className="mb-6 text-sm leading-relaxed text-gray-400">
            {service.description}
          </p>
        )}

        {!compact && (
          <ul className="space-y-2">
            {service.offerings.map((offering) => (
              <li key={offering} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                {offering}
              </li>
            ))}
          </ul>
        )}
      </div>
    </AnimateOnScroll>
  );
}
