"use client";

import { isEventUpcoming, ragMasterClass } from "@/lib/events";

export function SiteHeaderSpacer() {
  return (
    <div
      aria-hidden="true"
      className={isEventUpcoming(ragMasterClass) ? "h-[7.25rem]" : "h-16"}
    />
  );
}
