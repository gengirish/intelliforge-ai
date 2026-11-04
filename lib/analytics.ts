type AnalyticsEvent =
  | "book_call_click"
  | "starting_level_select"
  | "ai_audit_start"
  | "ai_audit_submit"
  | "contact_submit";

type AnalyticsParams = Record<string, string>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: AnalyticsParams) => void;
    clarity?: (command: "event", name: string) => void;
  }
}

/**
 * Both trackers load only when their NEXT_PUBLIC_* id is set, so this is a
 * no-op in local dev and previews. Never pass form contents as params: these
 * go to third parties, and only the event and its labels are needed.
 */
export function trackEvent(name: AnalyticsEvent, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
  window.clarity?.("event", name);
}
