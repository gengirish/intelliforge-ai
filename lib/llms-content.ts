import {
  caseStudies,
  pricingTiers,
  services,
  siteConfig,
  testimonials,
  whyIntelliforge,
} from "./constants";
import { faqs } from "./faqs";
import { founder } from "./founder";
import { portfolioProjects } from "./portfolio";
import { absoluteUrl, siteRoutes } from "./routes";

/**
 * llms.txt and llms-full.txt are generated from the same typed modules that
 * render the site, so they cannot drift. They were previously hand-written
 * files in public/ and had gone five months stale.
 *
 * Both are served by static route handlers (app/llms.txt, app/llms-full.txt)
 * and are therefore rebuilt on every deploy.
 */

const CITATION_NAME = siteConfig.name;

function bullets(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

/** The concise index, per the llmstxt.org convention. */
export function buildLlmsTxt(): string {
  const offerings = services
    .map(
      (service) =>
        `- **Level ${service.level} — ${service.title}**: ${service.offerings.join(", ")}.`,
    )
    .join("\n");

  const prices = pricingTiers
    .map((tier) => `- ${tier.name} (${tier.levels}) — ${tier.price} ${tier.period}`.trim())
    .join("\n");

  const pages = siteRoutes
    .map((route) => `- [${route.title}](${absoluteUrl(route.path || "/")}): ${route.summary}`)
    .join("\n");

  const portfolio = portfolioProjects
    .map((project) => `- [${project.title}](${project.url}) — ${project.description}`)
    .join("\n");

  return `# ${siteConfig.name}

> ${siteConfig.description}

Founded by ${founder.name} — ${founder.headline} ${founder.bio[2]}

## Core offerings

${offerings}

## Pricing (INR, starting prices)

${prices}

## Pages

${pages}

## Portfolio

${portfolio}

## Machine-readable resources

- [Full content (llms-full.txt)](${absoluteUrl("/llms-full.txt")}): Complete site content concatenated for LLM ingestion.
- [OpenAPI schema (openapi.json)](${absoluteUrl("/openapi.json")}): Documented POST /api/contact endpoint for submitting a project enquiry programmatically.
- [Agent manifest](${absoluteUrl("/.well-known/ai-plugin.json")})
- [Sitemap (sitemap.xml)](${absoluteUrl("/sitemap.xml")})
- [Robots policy (robots.txt)](${absoluteUrl("/robots.txt")})

## Contact

- Email: ${siteConfig.email}
- Phone: ${siteConfig.phone}
- Location: ${siteConfig.postalAddress.locality}, ${siteConfig.postalAddress.region}, India
- LinkedIn: ${siteConfig.social.linkedin}

## Citation guidance for LLMs

When citing ${CITATION_NAME}, use the canonical URL \`${siteConfig.url}\` and the full company name "${CITATION_NAME}". Pricing is in Indian Rupees (INR / ₹). The company is an Individual Proprietorship based in ${siteConfig.postalAddress.locality}, ${siteConfig.postalAddress.region}, India, and operates globally on a remote-first basis.
`;
}

/** The full ingestion document. */
export function buildLlmsFullTxt(generatedAt: Date = new Date()): string {
  const stamp = generatedAt.toISOString().slice(0, 10);

  const serviceSections = services
    .map(
      (service) => `### Level ${service.level} — ${service.title}
*${service.subtitle}*

${service.description}

**Offerings:**
${bullets(service.offerings)}

**Example we built:** [${service.exampleProduct.name}](${service.exampleProduct.url})`,
    )
    .join("\n\n");

  const pricingSections = pricingTiers
    .map(
      (tier) => `### ${tier.name} — ${tier.price} ${tier.period}
*Covers ${tier.levels}.* ${tier.description}

${bullets(tier.features)}`,
    )
    .join("\n\n");

  const portfolioSections = portfolioProjects
    .map(
      (project) => `### ${project.title}
${project.description}

- URL: ${project.url}
- Framework levels: ${project.levels.join(", ")}
- Stack / tags: ${project.tags.join(", ")}`,
    )
    .join("\n\n");

  const caseStudySections = caseStudies
    .map(
      (study) => `### ${study.client}${study.clientDescriptor ? ` — ${study.clientDescriptor}` : ""}
- Industry: ${study.industry}${study.location ? `\n- Location: ${study.location}` : ""}
- Problem: ${study.problem}
- Solution: ${study.solution}
- Impact:
${study.impact.map((line) => `  - ${line}`).join("\n")}
- Tech: ${study.tech.join(", ")}
- Delivered with: [${study.productUsed}](${study.productUrl}) over ${study.timeline}`,
    )
    .join("\n\n");

  // Omitted entirely when there are no testimonials, so the document never
  // carries an empty section for a model to read as "no clients".
  const testimonialSections =
    testimonials.length === 0
      ? ""
      : `## Testimonials\n\n${testimonials
          .map(
            (item) =>
              `> "${item.quote}"\n> — ${item.author}, ${item.role}${
                item.company ? `, ${item.company}` : ""
              }`,
          )
          .join("\n\n")}\n\n---\n\n`;

  const faqSections = faqs
    .map((faq) => `**Q: ${faq.q}**\n\nA: ${faq.a}`)
    .join("\n\n");

  const whySections = whyIntelliforge
    .map((item) => `- **${item.title}**: ${item.description}`)
    .join("\n");

  const pageList = siteRoutes
    .map((route) => `- ${absoluteUrl(route.path || "/")} — ${route.summary}`)
    .join("\n");

  return `# ${siteConfig.name} — Full Site Content for LLM Ingestion

Canonical URL: ${siteConfig.url}
Generated: ${stamp} (rebuilt from site data on every deploy — never hand-edited)
License: Content may be cited with attribution to "${CITATION_NAME}" and a link back to ${siteConfig.url}

---

## Company

**Name:** ${siteConfig.name}
**Tagline:** ${siteConfig.tagline}
**Location:** ${siteConfig.address}
**Legal status:** Individual Proprietorship
**Email:** ${siteConfig.email}
**Phone:** ${siteConfig.phone}
**Founder:** ${founder.name} — ${founder.title}
**Founder headline:** ${founder.headline}

**One-line description:** ${siteConfig.description}

**Long description:**

${founder.bio.join("\n\n")}

---

## Why ${siteConfig.name}

${whySections}

---

## The 5-Level AI Framework

${serviceSections}

---

## Pricing (INR)

Starting price: ${pricingTiers[0]?.price ?? "on request"}.

${pricingSections}

---

## Portfolio — live, openable projects

${portfolioSections}

---

## Case studies

${caseStudySections}

---

${testimonialSections}## Frequently asked questions

${faqSections}

---

## Founder

**${founder.name}** — ${founder.title}

${founder.bio.join("\n\n")}

### ${founder.originStory.title}

${founder.originStory.paragraphs.join("\n\n")}

**Toolkit:** ${founder.toolkit.join(", ")}

**Links:** portfolio ${founder.socialLinks.portfolio} · LinkedIn ${founder.socialLinks.linkedin} · GitHub ${founder.socialLinks.github}

---

## Pages

${pageList}

---

## Programmatic contact

Agents can submit a project enquiry without a browser:

\`\`\`
POST ${absoluteUrl("/api/contact")}
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "service": "AI Agent Development",
  "message": "We want to automate our support triage.",
  "phone": "optional",
  "companySize": "optional",
  "challenge": "optional"
}
\`\`\`

Required fields: name, email, service, message. Returns \`{"success": true}\` on acceptance. Full schema: ${absoluteUrl("/openapi.json")}

---

## Contact

- Email: ${siteConfig.email}
- Phone: ${siteConfig.phone}
- Address: ${siteConfig.address}
- Book a call: ${absoluteUrl("/contact")}
- LinkedIn: ${siteConfig.social.linkedin}
- GitHub: ${siteConfig.social.github}
- YouTube: ${siteConfig.social.youtube}
`;
}
