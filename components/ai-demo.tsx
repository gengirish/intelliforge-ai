"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ChevronDown,
  ExternalLink,
  Play,
  FileText,
} from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";

type BusinessType =
  | ""
  | "saas"
  | "agency"
  | "ecommerce"
  | "consulting"
  | "startup";

const suggestions: Record<
  Exclude<BusinessType, "">,
  { title: string; ideas: string[] }
> = {
  saas: {
    title: "AI Automation Ideas for SaaS Companies",
    ideas: [
      "AI-powered customer onboarding that adapts to user behavior",
      "Automated support ticket triage + intelligent routing with AI agents",
      "Churn prediction agent that flags at-risk accounts before they leave",
      "AI content pipeline: auto-generate blog posts, changelogs, and help docs",
      "RAG-powered internal knowledge base for your support and sales teams",
    ],
  },
  agency: {
    title: "AI Automation Ideas for Agencies",
    ideas: [
      "AI content production pipeline: blog posts, social media, ad copy at scale",
      "Automated client reporting with AI-generated insights and summaries",
      "Multi-agent research system for competitive analysis and market research",
      "AI proposal generator trained on your past winning proposals",
      "Automated transcription and action item extraction from client calls",
    ],
  },
  ecommerce: {
    title: "AI Automation Ideas for E-commerce",
    ideas: [
      "AI product description generator trained on your brand voice",
      "Automated inventory forecasting using sales pattern analysis",
      "AI customer support agent handling 80% of common queries 24/7",
      "Personalized product recommendation engine using customer behavior",
      "Automated review analysis and sentiment tracking across platforms",
    ],
  },
  consulting: {
    title: "AI Automation Ideas for Consulting Firms",
    ideas: [
      "AI-powered research assistant that compiles market intelligence in minutes",
      "Automated report generation from raw data with executive summaries",
      "RAG system over your knowledge base for instant institutional memory",
      "AI meeting prep agent that briefs you on client context before calls",
      "Automated time tracking and utilization analysis for better billing",
    ],
  },
  startup: {
    title: "AI Automation Ideas for Startups",
    ideas: [
      "AI-powered MVP prototyping — describe features, ship in days not months",
      "Automated competitor monitoring and market intelligence agent",
      "AI customer interview analyzer that extracts patterns from feedback",
      "Investor update generator using your actual metrics and milestones",
      "Multi-channel outreach automation with personalized AI messaging",
    ],
  },
};

const freeTools = [
  {
    title: "YouTube Transcript Scraper",
    desc: "Extract transcripts from any YouTube video — free and API-ready",
    url: "https://youtube-scrapper-pi.vercel.app/",
    icon: Play,
  },
  {
    title: "Markdown to PDF Converter",
    desc: "Real-time markdown editor with live preview and PDF export",
    url: "https://markdown-to-pdf-six.vercel.app/",
    icon: FileText,
  },
];

export function AiDemo() {
  const [business, setBusiness] = useState<BusinessType>("");
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (value: BusinessType) => {
    setBusiness(value);
    setShowResults(value !== "");
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* AI Business Analyzer */}
      <AnimateOnScroll>
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">AI Business Analyzer</h3>
          <p className="mt-1 text-sm text-gray-400">
            Select your business type to see personalized AI automation ideas.
          </p>

          <div className="relative mt-6">
            <select
              value={business}
              onChange={(e) => handleSelect(e.target.value as BusinessType)}
              className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 pr-10 text-sm text-white transition-colors focus:border-indigo focus:outline-none"
            >
              <option value="" className="bg-navy">
                Choose your business type...
              </option>
              <option value="saas" className="bg-navy">
                SaaS / Software Company
              </option>
              <option value="agency" className="bg-navy">
                Marketing / Creative Agency
              </option>
              <option value="ecommerce" className="bg-navy">
                E-commerce / Retail
              </option>
              <option value="consulting" className="bg-navy">
                Consulting / Professional Services
              </option>
              <option value="startup" className="bg-navy">
                Startup / Early Stage
              </option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>

          {showResults && business && (
            <div className="mt-6 rounded-xl border border-indigo/20 bg-indigo/5 p-5">
              <h4 className="text-sm font-bold text-indigo">
                {suggestions[business].title}
              </h4>
              <ul className="mt-3 space-y-2">
                {suggestions[business].ideas.map((idea, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo/20 text-xs font-bold text-indigo">
                      {i + 1}
                    </span>
                    {idea}
                  </li>
                ))}
              </ul>
              <Link
                href="/ai-audit"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan hover:text-cyan-light"
              >
                Get a full AI audit for your business →
              </Link>
            </div>
          )}
        </div>
      </AnimateOnScroll>

      {/* Free Tools */}
      <AnimateOnScroll delay={0.1}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Try Our Free Tools</h3>
            <p className="mt-1 text-sm text-gray-400">
              Built by us, free to use. See our engineering quality firsthand.
            </p>
          </div>

          {freeTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.title}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group flex items-start gap-4 rounded-2xl p-6 transition-all hover:border-indigo/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo/20 to-violet/20 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-indigo" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white group-hover:text-cyan transition-colors">
                      {tool.title}
                    </h4>
                    <ExternalLink className="h-3.5 w-3.5 text-gray-500 group-hover:text-cyan" />
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{tool.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </AnimateOnScroll>
    </div>
  );
}
