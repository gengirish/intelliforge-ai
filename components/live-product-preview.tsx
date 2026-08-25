"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/constants";

const IFRAME_LOAD_TIMEOUT_MS = 12_000;

interface LiveProductPreviewProps {
  study: CaseStudy;
  displayUrl: string;
}

/**
 * Embeds the live product, but only once the frame is actually scrolled near.
 * Mounting the iframe eagerly pulls a whole second app onto the page while the
 * landing page is still competing for bandwidth and main thread during LCP.
 */
export function LiveProductPreview({
  study,
  displayUrl,
}: LiveProductPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "blocked">(
    "loading",
  );
  const loadTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldMount(true);
        observer.disconnect();
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldMount) return;

    loadTimeoutRef.current = window.setTimeout(() => {
      setLoadState((current) => (current === "loading" ? "blocked" : current));
    }, IFRAME_LOAD_TIMEOUT_MS);

    return () => {
      if (loadTimeoutRef.current !== undefined) {
        window.clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [shouldMount, study.productUrl]);

  const clearLoadTimeout = () => {
    if (loadTimeoutRef.current !== undefined) {
      window.clearTimeout(loadTimeoutRef.current);
    }
  };

  const handleLoad = () => {
    clearLoadTimeout();
    setLoadState("loaded");
  };

  const handleError = () => {
    clearLoadTimeout();
    setLoadState("blocked");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-navy-card shadow-2xl shadow-indigo/5">
      <div className="flex items-center gap-3 border-b border-border bg-navy-light/90 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-surface px-3 py-1.5 font-mono text-[11px] text-gray-400">
          {displayUrl}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[400px] overflow-hidden bg-navy-light/50"
      >
        {loadState === "loading" && (
          <div
            className="absolute inset-0 z-10 animate-pulse bg-gradient-to-br from-indigo/10 via-violet/5 to-cyan/10"
            aria-hidden="true"
          >
            <div className="flex h-full flex-col gap-4 p-6">
              <div className="h-4 w-1/3 rounded-md bg-white/5" />
              <div className="h-3 w-2/3 rounded-md bg-white/5" />
              <div className="mt-4 h-3 w-full rounded-md bg-white/5" />
              <div className="h-3 w-5/6 rounded-md bg-white/5" />
              <div className="mt-auto h-24 w-full rounded-lg bg-white/5" />
            </div>
            <span className="sr-only">Loading live product preview</span>
          </div>
        )}

        {shouldMount && loadState !== "blocked" && (
          <iframe
            src={study.productUrl}
            title={`${study.productUsed} live demo`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            className={`h-full w-full border-0 bg-white transition-opacity duration-300 ${
              loadState === "loaded" ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}

        {loadState === "blocked" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-indigo/15 via-violet/10 to-cyan/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">
              {study.productUsed}
            </p>
            <p className="max-w-xs text-sm text-gray-400">
              This live demo can&apos;t be embedded here. Open it in a new tab
              to explore the full product.
            </p>
            <a
              href={study.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25"
            >
              Open live demo
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
