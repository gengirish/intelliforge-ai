import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IntelliForge AI — AI Solutions for Every Level of Your Business",
    template: "%s | IntelliForge AI",
  },
  description:
    "IntelliForge AI is a Hyderabad-based AI agency offering end-to-end AI solutions — from prompt engineering and workflow automation to AI agents and full app development. Aligned with the Bharat AI Mission.",
  keywords: [
    "AI Agency",
    "AI Consulting",
    "Prompt Engineering",
    "AI Agents",
    "RAG",
    "MCP Integration",
    "Vibe Coding",
    "Hyderabad",
    "India",
    "Bharat AI Mission",
    "IntelliForge AI",
  ],
  authors: [{ name: "Girish Basavaraj Hiremath" }],
  openGraph: {
    title: "IntelliForge AI — AI Solutions for Every Level of Your Business",
    description:
      "End-to-end AI solutions from prompt engineering to full app development. Aligned with the Bharat AI Mission.",
    url: "https://intelliforge.ai",
    siteName: "IntelliForge AI",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
