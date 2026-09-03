"use client";

import Script from "next/script";

const SECRET_KEY = process.env.NEXT_PUBLIC_OMNIDIM_WIDGET_SECRET_KEY;

/**
 * IntelliForge AI Studio — Website Voice Assistant (OmniDimension agent
 * 248463). The secret_key is a widget identifier meant to be public — it's
 * visible in any page's HTML source, the same trust level as a GA id — not a
 * true secret, unlike OMNIDIM_API_KEY.
 *
 * Positioned bottom-left in the OmniDimension dashboard (Deploy → Web Bot
 * Widget) so it doesn't collide with WhatsAppButton, which is fixed
 * bottom-right.
 */
export function OmniDimWidget() {
  if (!SECRET_KEY) return null;

  return (
    <Script
      id="omnidimension-web-widget"
      src={`https://omnidim.io/web_widget.js?secret_key=${SECRET_KEY}`}
      async
      strategy="afterInteractive"
    />
  );
}
