import { siteConfig } from "@/lib/constants";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = "https://www.intelliforge.tech";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "IntelliForge AI",
  legalName: "IntelliForge AI",
  alternateName: ["IntelliForge", "IntelliForge AI Agency"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/logo.svg`,
  slogan: "We Build AI Agents, Automate Workflows & Ship AI Apps — In Weeks, Not Months",
  description:
    "AI Agent Development & Workflow Automation Company based in Hyderabad, India. End-to-end AI solutions from prompt engineering to full app development. Aligned with the Bharat AI Mission.",
  foundingDate: "2025",
  foundingLocation: {
    "@type": "Place",
    name: "Hyderabad, Telangana, India",
  },
  knowsAbout: [
    "AI Agent Development",
    "AI Workflow Automation",
    "Prompt Engineering",
    "Retrieval-Augmented Generation (RAG)",
    "Model Context Protocol (MCP)",
    "Multi-Agent Systems",
    "LLM Fine-Tuning (RLHF, SFT)",
    "n8n Workflow Automation",
    "Make.com Automation",
    "Zapier Automation",
    "AI Application Development",
    "Vibe Coding",
    "Enterprise AI Integration",
    "Bharat AI Mission",
  ],
  knowsLanguage: ["English", "Hindi", "Telugu"],
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.postalAddress.streetAddress,
    addressLocality: siteConfig.postalAddress.locality,
    addressRegion: siteConfig.postalAddress.region,
    postalCode: siteConfig.postalAddress.postalCode,
    addressCountry: siteConfig.postalAddress.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  hasMap: siteConfig.mapsUrl,
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Worldwide (remote engagements)" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: siteConfig.email,
    availableLanguage: ["English", "Hindi"],
    areaServed: "Worldwide",
  },
  founder: {
    "@type": "Person",
    name: "Girish Hiremath",
    jobTitle: "Founder & AI Practitioner",
    url: "https://founder.intelliforge.tech/",
    email: siteConfig.email,
    description:
      "AI practitioner and full stack architect with 14+ years across compliance, banking, pharma, telecom, and IoT. M.Tech in Data Science & AI from IIIT Dharwad.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Information Technology Dharwad",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Retrieval-Augmented Generation",
      "Enterprise Software Engineering",
    ],
  },
  sameAs: [
    "https://founder.intelliforge.tech/",
    "https://linkedin.com/company/intelliforge-ai",
    "https://github.com/gengirish",
    "https://youtube.com/@intelliforge-ai",
  ],
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#professional-service`,
  name: "IntelliForge AI",
  url: SITE_URL,
  image: `${SITE_URL}/logo.svg`,
  priceRange: "₹₹",
  description:
    "AI consulting and development agency offering prompt engineering, workflow automation, AI agent development, and full AI app development.",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.postalAddress.streetAddress,
    addressLocality: siteConfig.postalAddress.locality,
    addressRegion: siteConfig.postalAddress.region,
    postalCode: siteConfig.postalAddress.postalCode,
    addressCountry: siteConfig.postalAddress.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  hasMap: siteConfig.mapsUrl,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Worldwide" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IntelliForge AI Service Catalog",
    itemListElement: [
      {
        "@type": "Offer",
        name: "AI Foundations",
        priceCurrency: "INR",
        price: "25000",
        description: "Prompt engineering training and AI readiness for teams.",
      },
      {
        "@type": "Offer",
        name: "Workflow Automation",
        priceCurrency: "INR",
        price: "50000",
        description: "RAG, MCP integrations, and end-to-end business workflow automation.",
      },
      {
        "@type": "Offer",
        name: "AI Agent Development",
        priceCurrency: "INR",
        price: "200000",
        description: "Custom autonomous AI agents and multi-agent systems with QA and human-in-the-loop oversight.",
      },
      {
        "@type": "Offer",
        name: "AI App Development",
        priceCurrency: "INR",
        price: "500000",
        description: "Full-stack AI applications, micro-SaaS, dashboards, and enterprise platforms.",
      },
    ],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: "IntelliForge AI",
  description:
    "AI Agent Development & Workflow Automation Company based in Hyderabad, India.",
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-IN",
};

export function createFaqSchema(
  faqs: { q: string; a: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function createServiceSchema(services: {
  name: string;
  description: string;
}[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: "IntelliForge AI",
        },
      },
    })),
  };
}

export function createBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// Backwards compatibility: keep old export name available
export const localBusinessSchema = professionalServiceSchema;
