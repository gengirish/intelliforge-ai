import type { MetadataRoute } from "next";
import routeModified from "@/data/route-modified.json";
import { absoluteUrl, siteRoutes } from "@/lib/routes";

const modifiedDates = routeModified as Record<string, string>;

/**
 * `lastModified` comes from the git history of each route's source files
 * (regenerate with `npm run sync:routes`), not from the build clock. Stamping
 * every URL with the deploy time told crawlers the whole site changed on each
 * deploy, which devalues the signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();

  return siteRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: modifiedDates[route.path]
      ? new Date(modifiedDates[route.path])
      : buildTime,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
