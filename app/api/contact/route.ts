import { NextRequest, NextResponse } from "next/server";
import { getAgentMailErrorMessage, sendEmail, sendEnquiryNotifications } from "@/lib/agentmail";
import {
  buildAdminEmailHtml,
  buildConfirmationEmailHtml,
} from "@/lib/contact-emails";
import { siteConfig } from "@/lib/constants";

// The local part must permit dots: firstname.lastname@ is the common shape, and
// the previous class omitted `.` so those addresses were silently rejected. The
// lookaheads already bar a leading dot and doubled dots, and the trailing
// character class bars a dot immediately before the @.
const EMAIL_PATTERN =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+.\\-]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\.)+[A-Za-z]{2,}$/;

const PUBLIC_DOMAIN = "@intelliforge.tech";

/**
 * Enquiry notifications are addressed to a branded @intelliforge.tech inbox.
 *
 * An earlier version did the opposite — it rejected @intelliforge.tech to keep
 * notices out of unmonitored aliases. That concern is now handled by the
 * private CC below rather than by making a personal inbox the public address.
 *
 * A CONTACT_EMAIL that is not on the company domain is treated as a
 * misconfiguration rather than obeyed: it would put a personal inbox in the
 * To: line of mail that leaves the system. It is folded into the private CC
 * instead, so nothing is lost.
 */
function resolveAdminEmail(): string {
  const configured = process.env.CONTACT_EMAIL?.trim();
  if (
    configured &&
    EMAIL_PATTERN.test(configured) &&
    configured.toLowerCase().endsWith(PUBLIC_DOMAIN)
  ) {
    return configured;
  }

  if (configured && EMAIL_PATTERN.test(configured)) {
    console.warn(
      `CONTACT_EMAIL (${configured}) is not on ${PUBLIC_DOMAIN}. Enquiries will ` +
        `be addressed to ${siteConfig.email} and it will be added to the ` +
        "private CC instead.",
    );
  }

  return siteConfig.email;
}

/**
 * Private copies of each enquiry, supplied at runtime so no personal address
 * lives in the repo, the client bundle, or any public page. Comma-separated.
 * Applied ONLY to the internal admin notice — never to the confirmation that
 * goes to the enquirer.
 */
function resolveNotificationCc(adminEmail: string): string[] {
  const configured = process.env.CONTACT_EMAIL?.trim();
  const candidates = [
    ...(process.env.CONTACT_NOTIFY_CC?.trim() ?? "").split(","),
    // A non-company CONTACT_EMAIL is demoted to a CC rather than dropped.
    ...(configured && !configured.toLowerCase().endsWith(PUBLIC_DOMAIN)
      ? [configured]
      : []),
  ];

  const seen = new Set([adminEmail.toLowerCase()]);
  const cc: string[] = [];
  for (const entry of candidates) {
    const address = entry.trim();
    if (!address || !EMAIL_PATTERN.test(address)) continue;
    if (seen.has(address.toLowerCase())) continue;
    seen.add(address.toLowerCase());
    cc.push(address);
  }

  if (cc.length === 0) {
    console.warn(
      `CONTACT_NOTIFY_CC is not set — enquiries will reach ${adminEmail} only, ` +
        "with no private copy.",
    );
  }

  return cc;
}

const ADMIN_EMAIL = resolveAdminEmail();
const NOTIFICATION_CC = resolveNotificationCc(ADMIN_EMAIL);

export async function POST(req: NextRequest) {
  const apiKey = process.env.AGENTMAIL_API_KEY?.trim();
  if (!apiKey) {
    console.error("Contact API error: AGENTMAIL_API_KEY is not configured");
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, phone, service, companySize, challenge, message, website } =
      body;

    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailData = { name, email, phone, service, companySize, challenge, message };

    try {
      await sendEnquiryNotifications({
        to: ADMIN_EMAIL,
        cc: NOTIFICATION_CC,
        replyTo: email,
        subject: `New Inquiry: ${service} — from ${name}`,
        html: buildAdminEmailHtml(emailData),
      });
    } catch (error) {
      console.error("AgentMail admin email error:", getAgentMailErrorMessage(error));
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    try {
      await sendEmail({
        to: email,
        subject: "We received your message — IntelliForge AI",
        html: buildConfirmationEmailHtml({ name, service }),
      });
    } catch (error) {
      console.error(
        "AgentMail confirmation email error:",
        getAgentMailErrorMessage(error)
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
