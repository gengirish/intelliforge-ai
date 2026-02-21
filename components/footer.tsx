import Link from "next/link";
import { Zap, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy-light">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo to-violet">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Intelli<span className="text-cyan">Forge</span> AI
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "AI Foundations & Training",
                "Workflow Automation",
                "AI Creative Studio",
                "Agent Development",
                "App Development",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-gray-400 transition-colors hover:text-cyan"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-gray-400 transition-colors hover:text-cyan"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-sm text-gray-400 transition-colors hover:text-cyan"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <span className="text-sm text-gray-400">{siteConfig.address}</span>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="https://bharataimission.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-xs font-medium text-cyan transition-colors hover:bg-cyan/20"
              >
                Aligned with Bharat AI Mission
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} IntelliForge AI. All rights reserved.
            Individual Proprietorship — Hyderabad, Telangana, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
