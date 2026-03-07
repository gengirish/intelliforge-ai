import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI automation, agent development, RAG, prompt engineering, and building AI-powered businesses. From the IntelliForge AI team.",
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
];

export default function BlogPage() {
  return (
    <div className="pt-24 pb-24">
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
                  <span className="group/link inline-flex items-center gap-1 text-sm font-semibold text-cyan transition-colors hover:text-cyan-light">
                    Coming Soon
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </span>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Newsletter CTA */}
        <AnimateOnScroll className="mt-16">
          <div className="mx-auto max-w-2xl rounded-2xl border border-indigo/20 bg-gradient-to-br from-indigo/5 via-navy-light to-violet/5 p-8 text-center sm:p-12">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Get AI Insights in Your Inbox
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Weekly tips on AI automation, agent development, and building
              AI-powered businesses. No spam, unsubscribe anytime.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="you@company.com"
                className="rounded-full border border-border bg-surface px-5 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo focus:outline-none sm:w-72"
              />
              <button
                type="button"
                className="rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </AnimateOnScroll>

        {/* CTA */}
        <AnimateOnScroll className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Want to implement these ideas?{" "}
            <Link
              href="/contact?intent=strategy-call"
              className="font-medium text-cyan hover:text-cyan-light"
            >
              Book a free strategy call
            </Link>{" "}
            and let&apos;s discuss.
          </p>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
