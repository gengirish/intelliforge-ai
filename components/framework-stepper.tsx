"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { ServiceLevel } from "@/lib/constants";
import { BookCallLink } from "@/components/book-call-link";

interface FrameworkStepperProps {
  services: ServiceLevel[];
}

export function FrameworkStepper({ services }: FrameworkStepperProps) {
  const [activeLevel, setActiveLevel] = useState(1);

  return (
    <div className="space-y-3">
      {services.map((service) => {
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
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-sm font-bold text-on-accent">
                {service.level}
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                  {service.badge}
                </span>
                <h3 className="text-base font-bold text-heading">
                  {service.title}
                </h3>
              </div>
              <ArrowRight
                className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <div className={`collapsible ${isOpen ? "collapsible-open" : ""}`}>
              <div inert={!isOpen}>
                <div className="border-t border-border px-5 pb-5 pt-2">
                  <p className="text-sm text-violet">{service.subtitle}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <p className="mt-3 text-sm text-body">
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
                    testId="framework-book-call-cta"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo transition-colors hover:text-cyan"
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
  );
}
