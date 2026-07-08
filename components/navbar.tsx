"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig, startingPrice } from "@/lib/constants";
import { RagMasterClassPromo } from "@/components/rag-masterclass-promo";
import { isEventUpcoming, ragMasterClass } from "@/lib/events";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi! I'm interested in IntelliForge AI's services. Can we discuss?",
  )}`;
  const showEventBanner = isEventUpcoming(ragMasterClass);

  return (
    <header className="fixed top-0 z-50 w-full">
      {showEventBanner && <RagMasterClassPromo />}
      <nav
        className="w-full border-b border-border bg-navy/80 backdrop-blur-xl"
        aria-label="Main navigation"
      >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="IntelliForge AI home">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-indigo/30 bg-indigo/15">
            <span
              className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full bg-forge/70"
              aria-hidden="true"
            />
            <Zap className="h-4 w-4 text-indigo" aria-hidden="true" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Intelli<span className="text-forge">Forge</span> AI
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-surface text-cyan"
                  : "text-gray-300 hover:bg-surface hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="text-xs font-medium text-gray-500">
            From {startingPrice}
          </span>
          <Link
            href="/contact?intent=strategy-call"
            className="rounded-full border border-indigo/40 px-5 py-2.5 text-sm font-semibold text-indigo transition-all hover:border-indigo hover:bg-indigo/10"
          >
            Book Free Strategy Call
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-gray-300 hover:bg-surface lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-navy lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-surface text-cyan"
                      : "text-gray-300 hover:bg-surface hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact?intent=strategy-call"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-full border border-indigo/40 px-5 py-3 text-center text-sm font-semibold text-indigo"
              >
                Book Free Strategy Call
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-400"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </header>
  );
}
