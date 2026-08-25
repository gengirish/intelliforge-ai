import { NextRequest, NextResponse } from "next/server";
import { getAgentMailErrorMessage, sendEmail, sendEnquiryNotifications } from "@/lib/agentmail";
import {
  buildAdminEmailHtml,
  buildConfirmationEmailHtml,
} from "@/lib/contact-emails";
import { siteConfig } from "@/lib/constants";

const EMAIL_PATTERN =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\\-]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\.)+[A-Za-z]{2,}$/;

function resolveAdminEmail(): string {
  const configured = process.env.CONTACT_EMAIL?.trim();
  if (
    configured &&
    EMAIL_PATTERN.test(configured) &&
    !configured.toLowerCase().endsWith("@intelliforge.tech")
  ) {
    return configured;
  }
  // siteConfig.email is the last resort. If it ever becomes an
  // @intelliforge.tech address, enquiries would land in an unmonitored
  // AgentMail alias instead of a real inbox — surface that loudly.
  if (siteConfig.email.toLowerCase().endsWith("@intelliforge.tech")) {
    console.error(
      "Contact API misconfiguration: siteConfig.email is an @intelliforge.tech address, " +
        "so admin enquiry notifications will not reach a monitored inbox.",
    );
  }
  return siteConfig.email;
}

const ADMIN_EMAIL = resolveAdminEmail();

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
