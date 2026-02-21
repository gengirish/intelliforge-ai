import Link from "next/link";
import { ArrowRight, Globe, Shield, Zap, Users } from "lucide-react";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { MissionBadge } from "@/components/mission-badge";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { services, whyIntelliforge } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = { Globe, Shield, Zap, Users };

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services Overview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our 5-Level Framework"
            title="From AI Foundations to Full Applications"
            description="A proven roadmap that takes your business from learning how to talk to AI all the way to building production-grade AI applications."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.level} service={service} index={i} compact />
            ))}
          </div>

          <AnimateOnScroll className="mt-12 text-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
            >
              Explore all services in detail
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Bharat AI Mission */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MissionBadge size="lg" />
        </div>
      </section>

      {/* Why IntelliForge */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why IntelliForge AI"
            title="Enterprise Depth, Startup Speed"
            description="Built on 13+ years of enterprise engineering and cutting-edge AI expertise."
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyIntelliforge.map((item, i) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <AnimateOnScroll key={item.title} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo/20 to-violet/20">
                      <Icon className="h-7 w-7 text-indigo" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo via-violet to-indigo p-12 text-center sm:p-16">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Ready to Become AI-Ready?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                  Whether you&apos;re just starting with AI or ready to build autonomous
                  agents — we&apos;ll meet you at your level and take you further.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-indigo transition-all hover:bg-gray-100"
                  >
                    Start Your AI Journey
                  </Link>
                  <Link
                    href="/pricing"
                    className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
