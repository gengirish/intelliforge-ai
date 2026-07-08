import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI automation, agent development, RAG, prompt engineering, and building AI-powered businesses. From the IntelliForge AI team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | IntelliForge AI",
    description:
      "Insights on AI agents, workflow automation, RAG, prompt engineering, and the 5-level AI framework.",
    url: "https://www.intelliforge.tech/blog",
  },
};

const blogPosts = [
  {
    slug: "10-ai-agents-every-company-should-build",
    title: "10 AI Agents Every Company Should Build in 2026",
    excerpt:
      "From inbox triaging to automated research — these are the AI agents that deliver real ROI. Learn which ones your business should build first and how to get started.",
    category: "AI Agents",
    readTime: "8 min read",
    date: "March 2026",
  },
  {
    slug: "how-to-automate-business-workflows-using-ai",
    title: "How to Automate Business Workflows Using AI",
    excerpt:
      "A practical guide to identifying automation opportunities, choosing the right tools (n8n, Zapier, Make), and implementing AI-powered workflows that save 20+ hours per week.",
    category: "Automation",
    readTime: "10 min read",
    date: "March 2026",
  },
  {
    slug: "rag-vs-fine-tuning-explained",
    title: "RAG vs Fine-Tuning: Which Approach Is Right for Your Business?",
    excerpt:
      "Two powerful techniques, very different use cases. We break down when to use Retrieval-Augmented Generation vs fine-tuning, with real examples from our projects.",
    category: "Technical",
    readTime: "12 min read",
    date: "March 2026",
  },
] as const;

function guideRequestHref(title: string) {
  const topic = encodeURIComponent(title);
  return `/contact?intent=guide-request&topic=${topic}`;
}

export default function BlogPage() {
  return (
    <div className="pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Blog"
          title="AI Insights & Guides"
          description="Practical insights on AI automation, agent development, and building AI-powered businesses."
        />

        <div className="mx-auto max-w-3xl space-y-8">
          {blogPosts.map((post, i) => (
            <AnimateOnScroll key={post.slug} delay={i * 0.1}>
              <article className="glass-card group rounded-2xl p-6 sm:p-8 transition-all">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 rounded-full bg-indigo/10 px-3 py-1 font-semibold text-indigo">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                  <span className="text-gray-500">{post.date}</span>
                </div>

                <h2 className="mt-4 text-xl font-bold text-white group-hover:text-cyan transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {post.excerpt}
                </p>

                <div className="mt-4">
                  <Link
                    href={guideRequestHref(post.title)}
                    className="group/link inline-flex items-center gap-1 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light"
                  >
                    Request this guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="mt-16">
          <div className="mx-auto max-w-2xl rounded-2xl border border-indigo/20 bg-gradient-to-br from-indigo/5 via-navy-light to-violet/5 p-8 text-center sm:p-12">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Ready to put these ideas to work?
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Guides are in progress — meanwhile, get a personalized AI readiness
              report or book a strategy call with our team.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/ai-audit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25"
              >
                Get a free AI audit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact?intent=strategy-call"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-indigo/40 hover:bg-surface-hover"
              >
                Book a strategy call
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
