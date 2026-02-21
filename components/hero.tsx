"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { MissionBadge } from "./mission-badge";

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
            className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            AI Solutions for{" "}
            <span className="gradient-text">Every Level</span> of Your
            Business
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From prompt engineering foundations to building full AI-powered
            applications — we take your business through all five levels of AI
            readiness. Based in Hyderabad, serving India and beyond.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/services"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-xl hover:shadow-indigo/25"
            >
              <Sparkles className="h-4 w-4" />
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border px-8 py-4 text-sm font-semibold text-gray-300 transition-colors hover:bg-surface hover:text-white"
            >
              Get in Touch
            </Link>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="font-medium text-gray-400">Trusted expertise from:</span>
            {["JPMC", "Wells Fargo", "Santander", "Labcorp", "Ericsson", "Qualcomm"].map(
              (client) => (
                <span key={client} className="font-semibold text-gray-400">
                  {client}
                </span>
              )
            )}
            <span className="text-gray-600">|</span>
            <span className="font-medium text-cyan/70">M.Tech DSAI — IIIT Dharwad</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
