"use client";

import { useMemo, useState } from "react";
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
  FileText,
  Sparkles,
  Target,
  Clock,
} from "lucide-react";
import {
  generateAuditReport,
  formatAuditReportText,
  type AuditReport,
} from "@/lib/audit-report";

const steps = [
  { id: 1, label: "Company", icon: Building2 },
  { id: 2, label: "Industry", icon: Briefcase },
  { id: 3, label: "Tools", icon: Wrench },
  { id: 4, label: "Challenge", icon: AlertTriangle },
  { id: 5, label: "Report", icon: FileText },
  { id: 6, label: "Contact", icon: User },
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

function AuditReportCard({ report }: { report: AuditReport }) {
  return (
    <div className="space-y-5">
      {/* Maturity Score */}
      <div className="rounded-xl border border-indigo/20 bg-gradient-to-br from-indigo/10 to-violet/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-300">
              Your AI Maturity
            </p>
            <h4 className="mt-1 text-xl font-bold text-white">
              {report.maturityLabel}
            </h4>
            <p className="mt-1 text-sm text-gray-400">
              Level {report.maturityLevel} of 5
            </p>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-8 w-2 rounded-full transition-all ${
                  level <= report.maturityLevel
                    ? "bg-gradient-to-t from-indigo to-violet"
                    : "bg-surface"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Service */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2 text-indigo-300">
          <Sparkles className="h-4 w-4" />
          <p className="text-xs font-medium uppercase tracking-wider">
            Recommended Path
          </p>
        </div>
        <p className="mt-2 text-lg font-semibold text-white">
          Level {report.recommendedLevel}: {report.recommendedService}
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4 shrink-0 text-violet-400" />
          <span>
            Estimated timeline:{" "}
            <strong className="text-gray-200">{report.estimatedTimeline}</strong>
          </span>
        </div>
      </div>

      {/* Top Opportunities */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2 text-indigo-300">
          <Target className="h-4 w-4" />
          <p className="text-xs font-medium uppercase tracking-wider">
            Top Opportunities
          </p>
        </div>
        <ul className="mt-3 space-y-2.5">
          {report.topOpportunities.map((opp, i) => (
            <li
              key={opp}
              className="flex gap-3 text-sm text-gray-300"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo/20 text-xs font-bold text-indigo-300">
                {i + 1}
              </span>
              {opp}
            </li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-violet-300">
          Recommended Next Steps
        </p>
        <ul className="mt-3 space-y-2">
          {report.nextSteps.map((step) => (
            <li
              key={step}
              className="flex gap-2 text-sm text-gray-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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

  const report = useMemo(() => {
    if (!formData.challenge) return null;
    return generateAuditReport({
      companySize: formData.companySize,
      industry: formData.industry,
      tools: formData.tools,
      challenge: formData.challenge,
    });
  }, [formData.companySize, formData.industry, formData.tools, formData.challenge]);

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
        return true;
      case 6:
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
    if (!report) return;
    setStatus("sending");
    try {
      const reportText = formatAuditReportText(
        {
          companySize: formData.companySize,
          industry: formData.industry,
          tools: formData.tools,
          challenge: formData.challenge,
        },
        report
      );

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: "Free AI Audit",
          companySize: formData.companySize,
          challenge: formData.challenge,
          message: reportText,
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

  if (status === "sent" && report) {
    return (
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            Report Sent to Your Inbox!
          </h3>
          <p className="mx-auto mt-3 max-w-md text-gray-400">
            Your personalized AI readiness report has been emailed. Here&apos;s
            your instant summary — keep it handy.
          </p>
        </div>

        <AuditReportCard report={report} />

        <div className="mt-6 rounded-xl bg-surface p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-white">What happens next:</strong>
          </p>
          <ol className="mt-2 space-y-1 text-left text-sm text-gray-400">
            <li>1. Review your report and note your top priority opportunity</li>
            <li>2. We&apos;ll follow up within 24 hours with tailored insights</li>
            <li>3. Optional: Free 30-min strategy call to discuss your roadmap</li>
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
                  className={`hidden h-0.5 w-4 sm:block sm:w-6 lg:w-10 ${
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

        {step === 5 && report && (
          <div>
            <h3 className="text-lg font-bold text-white">
              Your AI Readiness Report
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Generated instantly from your answers. Enter your email on the
              next step to receive a copy.
            </p>
            <div className="mt-5">
              <AuditReportCard report={report} />
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h3 className="text-lg font-bold text-white">
              Get it emailed to you
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              We&apos;ll send your full AI readiness report to this email so you
              can share it with your team.
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

        {step < 6 ? (
          <button
            type="button"
            onClick={() => canProceed() && setStep(step + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo/25 disabled:opacity-40"
          >
            {step === 5 ? "Get It Emailed" : "Next"}
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
                Sending...
              </>
            ) : (
              <>
                Send My Report
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
