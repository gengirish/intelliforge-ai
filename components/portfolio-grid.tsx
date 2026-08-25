"use client";

import { useMemo, useState } from "react";
import {
  Zap,
  ExternalLink,
  Globe,
  Shield,
  ShieldCheck,
  Users,
  Play,
  Brain,
  FileText,
  FilePlus,
  UserCircle,
  Fingerprint,
  Briefcase,
  Megaphone,
  Linkedin,
  Mic,
  HeartPulse,
  Building,
  Truck,
  Utensils,
  GitPullRequest,
  Database,
  ClipboardList,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";
import type { PortfolioProject } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Shield,
  ShieldCheck,
  Zap,
  Users,
  Play,
  Brain,
  FileText,
  FilePlus,
  UserCircle,
  Fingerprint,
  Briefcase,
  Megaphone,
  Linkedin,
  Mic,
  HeartPulse,
  Building,
  Truck,
  Utensils,
  GitPullRequest,
  Database,
  ClipboardList,
  Activity,
};

type LevelFilter = "all" | 1 | 2 | 4 | 5;

const filterPills: { label: string; value: LevelFilter }[] = [
  { label: "All", value: "all" },
  { label: "Agent (Level 4)", value: 4 },
  { label: "App (Level 5)", value: 5 },
  { label: "Automation (Level 2)", value: 2 },
  { label: "Training (Level 1)", value: 1 },
];

interface PortfolioGridProps {
  projects: PortfolioProject[];
  /** Show the whole set immediately, for the dedicated /portfolio page. */
  initialExpanded?: boolean;
}

export function PortfolioGrid({
  projects,
  initialExpanded = false,
}: PortfolioGridProps) {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");

  const handleFilter = (value: LevelFilter) => {
    setLevelFilter(value);
    if (value !== "all") setExpanded(true);
  };

  const filtered = useMemo(() => {
    if (levelFilter === "all") return projects;
    return projects.filter((p) => p.levels.includes(levelFilter));
  }, [projects, levelFilter]);

  const featured = useMemo(
    () => projects.filter((p) => p.featured),
    [projects],
  );

  const displayProjects = expanded ? filtered : featured;
  const totalCount = projects.length;

  return (
    <>
      <div
        className="mb-8 flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Filter portfolio by level"
      >
        {filterPills.map((pill) => (
          <button
            key={pill.value}
            type="button"
            onClick={() => handleFilter(pill.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
              levelFilter === pill.value
                ? "bg-gradient-to-r from-indigo to-violet text-white"
                : "border border-border text-gray-400 hover:border-indigo/30 hover:text-white"
            }`}
            aria-pressed={levelFilter === pill.value}
          >
            {pill.label}
          </button>
        ))}
      </div>

      <div
        className="grid gap-8 transition-all duration-500 md:grid-cols-2 lg:grid-cols-3"
        style={{
          maxHeight: expanded ? "none" : undefined,
        }}
      >
        {displayProjects.map((project, i) => {
          const Icon = iconMap[project.icon] || Zap;
          const tagline =
            project.tagline ??
            project.description.split("—")[0].split(".")[0].trim();

          return (
            <AnimateOnScroll key={project.title} delay={i * 0.05}>
              <div className="glass-card group relative h-full overflow-hidden rounded-2xl">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 lg:p-8"
                  aria-label={`View ${project.title} project`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <ExternalLink
                      className="h-4 w-4 text-gray-500 transition-colors group-hover:text-cyan"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.levels.map((level) => (
                      <span
                        key={level}
                        className="rounded-full bg-gradient-to-r from-indigo/20 to-violet/20 px-2.5 py-0.5 text-xs font-semibold text-indigo"
                      >
                        Level {level}
                      </span>
                    ))}
                  </div>
                </a>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-navy/90 p-6 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                  <p className="text-center text-sm font-medium text-white">
                    {tagline}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan hover:text-cyan-light"
                  >
                    View Project
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>

      {!expanded && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 rounded-full border border-indigo/40 px-6 py-3 text-sm font-semibold text-indigo transition-all hover:border-indigo hover:bg-indigo/10"
            aria-expanded={expanded}
          >
            View all {totalCount} projects →
          </button>
        </div>
      )}

      {expanded && levelFilter !== "all" && filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-gray-400">
          No projects match this filter.
        </p>
      )}
    </>
  );
}
