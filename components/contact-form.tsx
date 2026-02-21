"use client";

import { useState } from "react";
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

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
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
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
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
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
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
            placeholder="Girish Hiremath"
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

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo focus:outline-none"
          placeholder="Tell us about your project and how we can help..."
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
