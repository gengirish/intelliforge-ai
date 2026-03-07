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

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IntelliForge AI",
  url: "https://intelliforge.tech",
  logo: "https://intelliforge.tech/logo.png",
  description:
    "AI Agent Development & Workflow Automation Company based in Hyderabad, India. End-to-end AI solutions from prompt engineering to full app development.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@intelliforge.tech",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://linkedin.com/company/intelliforge-ai",
    "https://github.com/intelliforge-ai",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "IntelliForge AI",
  url: "https://intelliforge.tech",
  description:
    "AI consulting and development agency offering prompt engineering, workflow automation, AI agent development, and full AI app development.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500001",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 09:00-19:00",
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
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
