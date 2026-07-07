import { siteConfig } from "@/lib/constants";

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildAdminEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  service: string;
  companySize?: string;
  challenge?: string;
  message: string;
}) {
  const { name, email, phone, service, companySize, challenge, message } = data;
  const rows = [
    ["Name", name],
    ["Email", `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`],
    ["Phone", phone || "Not provided"],
    ["Service", service],
    ...(companySize ? [["Company Size", companySize] as const] : []),
    ...(challenge ? [["Biggest Challenge", challenge] as const] : []),
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 8px 0; color: #666; width: 140px;"><strong>${escapeHtml(label)}</strong></td>
          <td style="padding: 8px 0;">${typeof value === "string" && value.includes("<a ") ? value : escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366f1;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">${tableRows}</table>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <h3 style="color: #333;">Message</h3>
      <p style="color: #555; line-height: 1.6;">${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <p style="color: #999; font-size: 12px;">Sent from IntelliForge AI website contact form</p>
    </div>
  `;
}

export function buildConfirmationEmailHtml(data: {
  name: string;
  service: string;
}) {
  const firstName = escapeHtml(data.name.split(" ")[0] || data.name);

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366f1;">Thanks for reaching out, ${firstName}!</h2>
      <p style="color: #555; line-height: 1.6;">
        We received your inquiry about <strong>${escapeHtml(data.service)}</strong>.
        Our team will review your message and get back to you within 30 minutes during business hours.
      </p>
      <p style="color: #555; line-height: 1.6;">
        In the meantime, feel free to explore our
        <a href="${siteConfig.url}/services" style="color: #6366f1;">services</a>
        or book a
        <a href="${siteConfig.url}/contact?intent=strategy-call" style="color: #6366f1;">free strategy call</a>.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <p style="color: #999; font-size: 12px;">
        IntelliForge AI · ${siteConfig.email} · ${siteConfig.url}
      </p>
    </div>
  `;
}
