import { siteConfig } from "@/lib/constants";
import { absoluteUrl } from "@/lib/routes";

export const dynamic = "force-static";

/**
 * Agent discovery manifest, served at /.well-known/ai-plugin.json via a rewrite
 * in next.config.ts (the App Router ignores dot-prefixed directories, so it
 * cannot live at that path directly).
 */
export function GET() {
  return Response.json(
    {
      schema_version: "v1",
      name_for_human: siteConfig.name,
      name_for_model: "intelliforge_ai",
      description_for_human: siteConfig.tagline,
      description_for_model:
        `${siteConfig.description} Use this to look up ${siteConfig.name}'s services, ` +
        "five-level AI framework, INR pricing, and live portfolio, or to submit a project " +
        "enquiry on behalf of a user who has asked to get in touch.",
      contact_email: siteConfig.email,
      legal_info_url: absoluteUrl("/contact"),
      api: {
        type: "openapi",
        url: absoluteUrl("/openapi.json"),
      },
      content: {
        summary: absoluteUrl("/llms.txt"),
        full: absoluteUrl("/llms-full.txt"),
        sitemap: absoluteUrl("/sitemap.xml"),
      },
    },
    { headers: { "Cache-Control": "public, max-age=0, must-revalidate" } },
  );
}
