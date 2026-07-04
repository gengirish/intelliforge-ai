import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  JsonLd,
  organizationSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/components/json-ld";
import { Analytics } from "@/components/analytics";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.intelliforge.tech"),
  title: {
    default:
      "IntelliForge AI — AI Agent Development & Workflow Automation Company",
    template: "%s | IntelliForge AI",
  },
  description:
    "IntelliForge AI is a Hyderabad-based AI agent development and workflow automation company. From prompt engineering and RAG pipelines to autonomous agents and full AI app development. Aligned with the Bharat AI Mission.",
  keywords: [
    "AI automation services India",
    "AI agent development company",
    "AI workflow automation",
    "prompt engineering services",
    "AI consulting India",
    "AI Agency",
    "RAG implementation",
    "MCP Integration",
    "multi-agent systems",
    "AI app development",
    "Hyderabad",
    "Bharat AI Mission",
    "IntelliForge AI",
  ],
  authors: [{ name: "IntelliForge AI" }],
  openGraph: {
    title:
      "IntelliForge AI — AI Agent Development & Workflow Automation Company",
    description:
      "We build AI agents, automate workflows, and ship AI apps — in weeks, not months. Hyderabad-based, serving India and beyond.",
    url: "https://www.intelliforge.tech",
    siteName: "IntelliForge AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntelliForge AI — AI Agent Development & Automation",
    description:
      "We build AI agents, automate workflows, and ship AI apps — in weeks, not months.",
  },
  alternates: {
    canonical: "https://www.intelliforge.tech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* LLM / AI search discovery (llmstxt.org) */}
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="LLM-friendly site summary"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="Full content for LLM ingestion"
        />
      </head>
      <body
        className={`${sourceSans3.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Analytics />
        <JsonLd data={organizationSchema} />
        <JsonLd data={professionalServiceSchema} />
        <JsonLd data={websiteSchema} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
