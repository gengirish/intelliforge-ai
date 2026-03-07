"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck, FileSearch } from "lucide-react";
import { motion } from "framer-motion";
import { MissionBadge } from "./mission-badge";

const targetAudiences = ["Startups", "SaaS Companies", "Enterprises", "Agencies"];

const trustBadges = [
  "13+ Years Enterprise Experience",
  "Fortune 500 Clients",
  "Banking & Fintech",
  "Pharma & Healthcare",
  "Telecom & IoT",
  "M.Tech DSAI — IIIT Dharwad",
];

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden pb-20 pt-32 sm:pb-32 sm:pt-40">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-72 w-72 rounded-full bg-indigo/10 blur-3xl" />
        <div className="absolute -right-4 top-1/3 h-96 w-96 rounded-full bg-violet/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MissionBadge />
          </motion.div>

          <motion.h1
            className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We Build <span className="gradient-text">AI Agents</span>, Automate
            Workflows & Ship AI Apps —{" "}
            <span className="text-cyan">In Weeks, Not Months</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From prompt engineering and RAG pipelines to autonomous multi-agent
            systems — we take your business through all five levels of AI
            readiness. Based in Hyderabad, serving India and beyond.
          </motion.p>

          <motion.div
            className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {targetAudiences.map((audience) => (
              <span
                key={audience}
                className="rounded-full bg-gradient-to-r from-indigo/15 to-violet/15 px-4 py-1.5 text-sm font-medium text-indigo"
              >
                {audience}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact?intent=strategy-call"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-xl hover:shadow-indigo/25"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Free AI Strategy Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-audit"
              className="group flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-gray-300 transition-colors hover:bg-surface hover:text-white"
            >
              <FileSearch className="h-4 w-4" />
              Get Your AI Roadmap
            </Link>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {trustBadges.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-gray-400"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
