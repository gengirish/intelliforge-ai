import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with IntelliForge AI. Whether you need AI training, workflow automation, agent development, or full app building — we're here to help.",
};

export default function ContactPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.whatsapp;
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in IntelliForge AI's services. Can we discuss?"
  );

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeading
          label="Contact Us"
          title="Let's Build Your AI Future"
          description="Have a question, a project idea, or need a consultation? We'd love to hear from you."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <AnimateOnScroll>
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-6 text-xl font-bold text-white">Send Us a Message</h3>
                <ContactForm />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-2">
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
                  <h4 className="font-bold text-white">Chat on WhatsApp</h4>
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
                      <p className="text-sm text-gray-400">{siteConfig.address}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Virtual office via myHQ
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.34203828824!2d78.24323105!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IntelliForge AI - Hyderabad, Telangana"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
