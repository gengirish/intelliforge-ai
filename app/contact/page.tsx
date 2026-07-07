import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  CalendarCheck,
  Zap,
} from "lucide-react";
import { ContactPageForm } from "@/components/contact-page-form";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with IntelliForge AI. Book a free AI strategy call, chat on WhatsApp, or send us a message. We respond within 30 minutes.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | IntelliForge AI",
    description:
      "Book a free AI strategy call or send a project inquiry. We respond within 30 minutes.",
    url: "https://www.intelliforge.tech/contact",
  },
};

export default function ContactPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.whatsapp;
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in IntelliForge AI's services. Can we discuss?"
  );
  const bookingUrl = siteConfig.bookingUrl;
  const isExternalBooking = bookingUrl.startsWith("http");
  const bookingCardClass =
    "flex items-center gap-4 rounded-2xl border border-indigo/30 bg-indigo/10 p-6 transition-colors hover:bg-indigo/20";

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeading
          label="Contact Us"
          title="Let's Build Your AI Future"
          description="Book a free strategy call, send us a message, or chat instantly on WhatsApp."
        />

        {/* Response Time Guarantee */}
        <AnimateOnScroll>
          <div className="mb-12 flex items-center justify-center gap-3 rounded-2xl border border-cyan/20 bg-cyan/5 px-6 py-4">
            <Zap className="h-5 w-5 text-cyan" />
            <p className="text-sm font-medium text-cyan">
              We respond within 30 minutes during business hours (Mon–Sat, 9 AM – 7 PM IST)
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <AnimateOnScroll>
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-6 text-xl font-bold text-white">
                  Tell Us About Your AI Goals
                </h3>
                <ContactPageForm />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-2">
            {/* Calendly Booking */}
            <AnimateOnScroll delay={0.05}>
              {isExternalBooking ? (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={bookingCardClass}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet">
                    <CalendarCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Book Free Strategy Call</h4>
                    <p className="text-sm text-gray-400">
                      30-min call to discuss your AI goals
                    </p>
                  </div>
                </a>
              ) : (
                <Link href={bookingUrl} className={bookingCardClass}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet">
                    <CalendarCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Book Free Strategy Call</h4>
                    <p className="text-sm text-gray-400">
                      30-min call to discuss your AI goals
                    </p>
                  </div>
                </Link>
              )}
            </AnimateOnScroll>

            {/* WhatsApp CTA */}
            <AnimateOnScroll delay={0.1}>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 transition-colors hover:bg-green-500/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Instant Chat on WhatsApp</h4>
                  <p className="text-sm text-gray-400">
                    Quick response, usually within minutes
                  </p>
                </div>
              </a>
            </AnimateOnScroll>

            {/* Contact Details */}
            <AnimateOnScroll delay={0.2}>
              <div className="glass-card rounded-2xl p-6">
                <h4 className="mb-4 font-bold text-white">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Email</p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-sm text-gray-400 hover:text-cyan"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Phone</p>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="text-sm text-gray-400 hover:text-cyan"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Office</p>
                      <a
                        href={siteConfig.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-cyan"
                      >
                        {siteConfig.address}
                      </a>
                      <p className="mt-1 text-xs text-gray-500">
                        <a
                          href={siteConfig.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-cyan"
                        >
                          Open in Google Maps →
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Business Hours</p>
                      <p className="text-sm text-gray-400">
                        Mon – Sat: 9:00 AM – 7:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Map Embed */}
            <AnimateOnScroll delay={0.3}>
              <div className="overflow-hidden rounded-2xl border border-border">
                <iframe
                  src={siteConfig.mapsEmbedUrl}
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IntelliForge AI office — Jyothi Granules, Kondapur, Hyderabad"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
