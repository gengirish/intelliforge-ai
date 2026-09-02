"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/constants";

const CONTACT_PATH = "/contact";
export const CONTACT_FORM_ID = "contact-form";

type BookCallLinkProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

/**
 * Single entry point for every "Book a strategy call" CTA.
 *
 * `siteConfig.bookingUrl` is the Calendly link when NEXT_PUBLIC_CALENDLY_URL is
 * set, otherwise it falls back to the contact form. Without this component the
 * fallback links to `/contact` from `/contact` — a same-route soft navigation
 * that does nothing at all.
 */
export function BookCallLink({ className, onClick, children }: BookCallLinkProps) {
  const pathname = usePathname();
  const bookingUrl = siteConfig.bookingUrl;

  if (bookingUrl.startsWith("http")) {
    return (
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // Already on the contact page: the fallback URL would point at this very
  // page, so send the visitor to the form instead. Plain anchor, so it still
  // works without JS; the handler only adds smooth scroll + focus.
  if (pathname === CONTACT_PATH) {
    return (
      <a
        href={`#${CONTACT_FORM_ID}`}
        className={className}
        onClick={(e) => {
          onClick?.();
          const form = document.getElementById(CONTACT_FORM_ID);
          if (!form) return;
          e.preventDefault();
          window.history.replaceState(null, "", `#${CONTACT_FORM_ID}`);
          form.scrollIntoView({ behavior: "smooth", block: "start" });
          // Skip the honeypot (`tabIndex={-1}`, visually hidden) — focusing it
          // would send the visitor's typing into the bot trap and their
          // enquiry would be silently discarded.
          const fields = form.querySelectorAll<HTMLElement>(
            "input, select, textarea"
          );
          for (const field of fields) {
            if (field.tabIndex >= 0 && field.offsetParent !== null) {
              field.focus({ preventScroll: true });
              break;
            }
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={bookingUrl} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
