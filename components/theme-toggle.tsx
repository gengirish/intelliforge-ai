"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

export type Theme = "light" | "dark";

/**
 * The active theme lives as a `dark` class on <html>, set before first paint by
 * the inline script in `app/layout.tsx`. Rather than mirror it into React state
 * (which would fight the pre-hydration script), subscribe to it: the DOM is the
 * store, `setTheme` is the only writer, and the server snapshot is the `dark`
 * class the layout renders.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function setTheme(next: Theme) {
  const root = document.documentElement;

  // Only cross-fade on an explicit toggle, never on load.
  root.classList.add("theme-transition");
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;
  window.setTimeout(() => root.classList.remove("theme-transition"), 300);

  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private mode / blocked storage: the choice just won't persist.
  }
  listeners.forEach((listener) => listener());
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Server and first client render agree on "dark" (the class on <html>), so
  // the icon settles on the real theme in the same tick as hydration.
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as const);
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={label}
      aria-label={label}
      data-testid="theme-toggle"
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-surface hover:text-heading ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
