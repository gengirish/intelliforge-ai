"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, BookOpen, Workflow, Palette, Bot, Code, type LucideIcon } from "lucide-react";
import type { ServiceLevel } from "@/lib/constants";
import { BookCallLink } from "@/components/book-call-link";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Workflow,
  Palette,
  Bot,
  Code,
};

interface FrameworkStepperProps {
  services: ServiceLevel[];
}

export function FrameworkStepper({ services }: FrameworkStepperProps) {
  const [activeLevel, setActiveLevel] = useState(1);
  const displayedLevel = activeLevel || 1;

  return (
    <>
      {/* Desktop: horizontal stepper */}
      <div className="hidden lg:block">
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-6 h-0.5 bg-gradient-to-r from-gray-700 via-indigo/60 to-cyan"
            aria-hidden="true"
          />
          <div className="relative flex justify-between">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Code;
              const isActive = displayedLevel === service.level;

              return (
                <button
                  key={service.level}
                  type="button"
                  onMouseEnter={() => setActiveLevel(service.level)}
                  onFocus={() => setActiveLevel(service.level)}
                  onClick={() => setActiveLevel(service.level)}
                  className="group flex flex-1 flex-col items-center px-2"
                  aria-expanded={isActive}
                  aria-label={`Level ${service.level}: ${service.title}`}
                >
                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                      isActive
                        ? "border-indigo bg-gradient-to-br from-indigo to-violet shadow-lg shadow-indigo/30"
                        : "border-gray-600 bg-navy-card group-hover:border-indigo/50"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-400"}`}
                    >
                      {service.level}
                    </span>
                  </div>
                  <span
                    className={`mt-3 text-xs font-semibold uppercase tracking-wider ${
                      isActive ? "text-cyan" : "text-gray-500"
                    }`}
                  >
                    {service.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {services
          .filter((s) => s.level === displayedLevel)
          .map((service) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <div
                key={service.level}
                className="rise-in glass-card mt-10 rounded-2xl p-8"
                style={{ "--rise-from": "12px" } as CSSProperties}
              >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet">
                      <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                        Level {service.level} · {service.badge}
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-white">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-violet">{service.subtitle}</p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-400">
                        {service.description}
                      </p>
                      <p className="mt-4 text-sm text-gray-300">
                        Example:{" "}
                        <a
                          href={service.exampleProduct.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-cyan hover:text-cyan-light"
                        >
                          {service.exampleProduct.name} →
                        </a>
                      </p>
                      <BookCallLink
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo transition-colors hover:text-cyan"
                      >
                        Start here
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </BookCallLink>
                    </div>
                  </div>
              </div>
            );
          })}
      </div>

      {/* Mobile: accordion */}
      <div className="space-y-3 lg:hidden">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Code;
          const isOpen = activeLevel === service.level;

          return (
            <div
              key={service.level}
              className="glass-card overflow-hidden rounded-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveLevel(isOpen ? 0 : service.level)}
                className="flex w-full items-center gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-sm font-bold text-white">
                  {service.level}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                    {service.badge}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                <ArrowRight
                  className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div className={`collapsible ${isOpen ? "collapsible-open" : ""}`}>
                <div inert={!isOpen}>
                  <div className="border-t border-border px-5 pb-5 pt-2">
                      <p className="text-sm text-violet">{service.subtitle}</p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">
                        {service.description}
                      </p>
                      <p className="mt-3 text-sm text-gray-300">
                        Example:{" "}
                        <a
                          href={service.exampleProduct.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-cyan"
                        >
                          {service.exampleProduct.name} →
                        </a>
                      </p>
                      <BookCallLink
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo"
                      >
                        Start here
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </BookCallLink>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
