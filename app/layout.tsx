import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  JsonLd,
  organizationSchema,
  localBusinessSchema,
} from "@/components/json-ld";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://intelliforge.tech"),
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
    url: "https://intelliforge.tech",
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
    canonical: "https://intelliforge.tech",
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
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Analytics />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
