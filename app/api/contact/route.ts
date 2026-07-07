import { NextRequest, NextResponse } from "next/server";
import { getAgentMailErrorMessage, sendEmail } from "@/lib/agentmail";
import {
  buildAdminEmailHtml,
  buildConfirmationEmailHtml,
} from "@/lib/contact-emails";
import { siteConfig } from "@/lib/constants";

const ADMIN_EMAIL = process.env.CONTACT_EMAIL || siteConfig.email;

export async function POST(req: NextRequest) {
  if (!process.env.AGENTMAIL_API_KEY) {
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
      await sendEmail({
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
