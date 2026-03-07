"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Building2,
  Briefcase,
  Wrench,
  AlertTriangle,
  User,
} from "lucide-react";

const steps = [
  { id: 1, label: "Company", icon: Building2 },
  { id: 2, label: "Industry", icon: Briefcase },
  { id: 3, label: "Tools", icon: Wrench },
  { id: 4, label: "Challenge", icon: AlertTriangle },
  { id: 5, label: "Contact", icon: User },
];

const companySizes = [
  { value: "1", label: "Just me (Solo founder)" },
  { value: "2-10", label: "2–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "200+", label: "200+ employees" },
];

const industries = [
  "SaaS / Software",
  "E-commerce / Retail",
  "Healthcare / Pharma",
  "Finance / Banking",
  "Marketing / Agency",
  "Education",
  "Manufacturing",
  "Consulting",
  "Other",
];

const toolOptions = [
  "ChatGPT / Claude / Gemini",
  "Zapier / Make / n8n",
  "Slack / Teams",
  "CRM (Salesforce, HubSpot, etc.)",
  "Custom internal tools",
  "No AI tools currently",
];

const challenges = [
  "Too many manual / repetitive tasks",
  "Need to implement AI but don't know where to start",
  "Existing AI tools aren't delivering results",
  "Want to build AI-powered products",
  "Need to upskill my team on AI",
  "Want to reduce costs with automation",
];

export function AiAuditForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [formData, setFormData] = useState({
    companySize: "",
    industry: "",
    tools: [] as string[],
    challenge: "",
    name: "",
    email: "",
  });

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.companySize !== "";
      case 2:
        return formData.industry !== "";
      case 3:
        return formData.tools.length > 0;
      case 4:
        return formData.challenge !== "";
      case 5:
        return formData.name !== "" && formData.email !== "";
      default:
        return false;
    }
  };

  const toggleTool = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter((t) => t !== tool)
        : [...prev.tools, tool],
    }));
  };

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: "Free AI Audit",
          message: `AI Audit Request:\nCompany Size: ${formData.companySize}\nIndustry: ${formData.industry}\nCurrent Tools: ${formData.tools.join(", ")}\nBiggest Challenge: ${formData.challenge}`,
        }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="glass-card rounded-2xl p-8 text-center sm:p-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">
          Your AI Audit Is On Its Way!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-gray-400">
          We&apos;ll review your submission and send a personalized AI readiness
          report within 24 hours. Keep an eye on your inbox.
        </p>
        <div className="mt-6 rounded-xl bg-surface p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-white">What happens next:</strong>
          </p>
          <ol className="mt-2 space-y-1 text-left text-sm text-gray-400">
            <li>1. We analyze your current AI maturity level</li>
            <li>2. Identify top 3 automation opportunities</li>
            <li>3. Send your personalized AI roadmap</li>
            <li>4. Optional: Free 30-min strategy call to discuss</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isCompleted = step > s.id;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-indigo to-violet text-white"
                    : isCompleted
                      ? "bg-green-500/20 text-green-400"
                      : "bg-surface text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`hidden h-0.5 w-8 sm:block lg:w-16 ${
                    isCompleted ? "bg-green-500/30" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[280px]">
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-white">
              How big is your company?
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              This helps us tailor recommendations to your scale.
            </p>
            <div className="mt-6 space-y-3">
              {companySizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, companySize: size.value })
                  }
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    formData.companySize === size.value
                      ? "border-indigo bg-indigo/10 text-white"
                      : "border-border bg-surface text-gray-300 hover:border-indigo/50"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-white">
              What industry are you in?
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Different industries have different AI opportunities.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setFormData({ ...formData, industry: ind })}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    formData.industry === ind
                      ? "border-indigo bg-indigo/10 text-white"
                      : "border-border bg-surface text-gray-300 hover:border-indigo/50"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-white">
              What tools do you currently use?
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Select all that apply. This helps us understand your current stack.
            </p>
            <div className="mt-6 space-y-3">
              {toolOptions.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => toggleTool(tool)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    formData.tools.includes(tool)
                      ? "border-indigo bg-indigo/10 text-white"
                      : "border-border bg-surface text-gray-300 hover:border-indigo/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                        formData.tools.includes(tool)
                          ? "border-indigo bg-indigo text-white"
                          : "border-gray-500"
                      }`}
                    >
                      {formData.tools.includes(tool) && "✓"}
                    </span>
                    {tool}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-lg font-bold text-white">
              What&apos;s your biggest challenge?
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              We&apos;ll focus our recommendations on solving this.
            </p>
            <div className="mt-6 space-y-3">
              {challenges.map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setFormData({ ...formData, challenge: ch })}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    formData.challenge === ch
                      ? "border-indigo bg-indigo/10 text-white"
                      : "border-border bg-surface text-gray-300 hover:border-indigo/50"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="text-lg font-bold text-white">
              Where should we send your AI report?
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              We&apos;ll send your personalized AI readiness report to this
              email.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="audit-name"
                  className="mb-1.5 block text-sm font-medium text-gray-300"
                >
                  Full Name
                </label>
                <input
                  id="audit-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="audit-email"
                  className="mb-1.5 block text-sm font-medium text-gray-300"
                >
                  Work Email
                </label>
                <input
                  id="audit-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo focus:outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-surface"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            type="button"
            onClick={() => canProceed() && setStep(step + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25 disabled:opacity-40"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || status === "sending"}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25 disabled:opacity-40"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get My AI Report
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
