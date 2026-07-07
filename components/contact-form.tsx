"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Loader2 } from "lucide-react";

const serviceOptions = [
  "AI Foundations & Training (Level 1)",
  "Workflow Automation (Level 2)",
  "AI Creative Studio (Level 3)",
  "Agent Development (Level 4)",
  "App Development — Vibe Coding (Level 5)",
  "Full AI Transformation (All Levels)",
  "Other / Not Sure",
];

const planToService: Record<string, string> = {
  "AI Foundations": "AI Foundations & Training (Level 1)",
  "Workflow Automation": "Workflow Automation (Level 2)",
  "AI Agent Development": "Agent Development (Level 4)",
  "AI App Development": "App Development — Vibe Coding (Level 5)",
};

const companySizeOptions = [
  "Just me (Solo founder)",
  "2–10 employees",
  "11–50 employees",
  "51–200 employees",
  "200+ employees",
];

const challengeOptions = [
  "Too many manual/repetitive tasks",
  "Need to implement AI but don't know where to start",
  "Existing AI tools aren't delivering results",
  "Want to build AI-powered products",
  "Need to upskill team on AI",
  "Other",
];

const defaultMessagePlaceholder =
  "What would you like to automate or build with AI? What does success look like for you?";

function getPrefillFromParams(searchParams: URLSearchParams) {
  const intent = searchParams.get("intent");
  const plan = searchParams.get("plan");

  let service = "";
  let messagePlaceholder = defaultMessagePlaceholder;

  if (intent === "strategy-call") {
    service = "Full AI Transformation (All Levels)";
    messagePlaceholder =
      "Tell us about your AI goals for the strategy call — what's your biggest challenge or opportunity right now?";
  } else if (intent === "guide-request") {
    const topic = searchParams.get("topic");
    service = "Other / Not Sure";
    messagePlaceholder = topic
      ? `I'd like the guide: "${topic}". Please share when available.`
      : "I'd like to request a guide from your blog. Please share when available.";
  } else if (intent === "pricing" && plan) {
    const matchedService = planToService[plan];
    if (matchedService) {
      service = matchedService;
      messagePlaceholder = `I'm interested in the ${plan} plan. Here's a bit more about my project...`;
    }
  }

  return { service, messagePlaceholder };
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const prefill = useMemo(
    () => getPrefillFromParams(searchParams),
    [searchParams]
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: prefill.service,
    companySize: "",
    challenge: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          companySize: "",
          challenge: "",
          message: "",
          website: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <Send className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Message Sent!</h3>
        <p className="mt-2 text-gray-400">
          Thank you for reaching out. A confirmation email is on its way, and we&apos;ll get back to you within 30 minutes during business hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-border px-6 py-2 text-sm text-gray-300 transition-colors hover:bg-surface"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo focus:outline-none"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo focus:outline-none"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-300">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo focus:outline-none"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-gray-300">
            Service Interest
          </label>
          <select
            id="service"
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white transition-colors focus:border-indigo focus:outline-none"
          >
            <option value="" className="bg-navy">Select a service...</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-navy">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="companySize" className="mb-1.5 block text-sm font-medium text-gray-300">
            Company Size
          </label>
          <select
            id="companySize"
            value={formData.companySize}
            onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white transition-colors focus:border-indigo focus:outline-none"
          >
            <option value="" className="bg-navy">Select company size...</option>
            {companySizeOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-navy">
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="challenge" className="mb-1.5 block text-sm font-medium text-gray-300">
            Biggest Challenge
          </label>
          <select
            id="challenge"
            value={formData.challenge}
            onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white transition-colors focus:border-indigo focus:outline-none"
          >
            <option value="" className="bg-navy">What&apos;s your biggest challenge?</option>
            {challengeOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-navy">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">
          Tell Us About Your AI Goals
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo focus:outline-none"
          placeholder={prefill.messagePlaceholder}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or reach out via WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25 disabled:opacity-50"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
