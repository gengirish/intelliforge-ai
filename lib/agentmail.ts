import { AgentMailClient } from "agentmail";
import { siteConfig } from "@/lib/constants";

export type SendEmailInput = {
  to: string | string[];
  cc?: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  fromInboxId?: string;
};

let client: AgentMailClient | null = null;
let inboxIdPromise: Promise<string> | null = null;

function getApiKey(): string {
  const apiKey = process.env.AGENTMAIL_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("AGENTMAIL_API_KEY is not configured");
  }
  return apiKey;
}

function getClient(): AgentMailClient {
  if (!client) {
    client = new AgentMailClient({ apiKey: getApiKey() });
  }
  return client;
}

function resolveSupportInboxId(): string {
  return (
    process.env.AGENTMAIL_SUPPORT_INBOX_ID?.trim() || siteConfig.supportEmail
  );
}

async function resolveOutboxInboxId(override?: string): Promise<string> {
  const configured = override?.trim() || process.env.AGENTMAIL_INBOX_ID?.trim();
  if (configured) {
    return configured;
  }

  if (!inboxIdPromise) {
    inboxIdPromise = (async () => {
      const agentmail = getClient();
      const inboxes = await agentmail.inboxes.list({ limit: 50 });
      const existing = inboxes.inboxes?.find(
        (inbox) => inbox.inboxId === "contact@intelliforge.tech"
      );
      if (existing?.inboxId) {
        return existing.inboxId;
      }

      const inbox = await agentmail.inboxes.create({
        clientId: "intelliforge-contact-inbox",
        username: process.env.AGENTMAIL_INBOX_USERNAME || "contact",
        displayName: siteConfig.name,
        domain: process.env.AGENTMAIL_DOMAIN || "intelliforge.tech",
      });
      return inbox.inboxId;
    })();
  }

  return inboxIdPromise;
}

export function getAgentMailErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "body" in error) {
    const body = (error as { body?: { message?: string } }).body;
    if (body?.message) {
      return body.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export async function sendEmail({
  to,
  cc,
  subject,
  html,
  text,
  replyTo,
  fromInboxId,
}: SendEmailInput): Promise<void> {
  const agentmail = getClient();
  const inboxId = await resolveOutboxInboxId(fromInboxId);

  await agentmail.inboxes.messages.send(inboxId, {
    to,
    subject,
    html,
    text: text ?? stripHtml(html),
    ...(cc && cc.length ? { cc } : {}),
    ...(replyTo ? { replyTo } : {}),
  });
}

export async function sendEnquiryNotifications({
  to,
  cc,
  subject,
  html,
  replyTo,
}: {
  to: string;
  /** Private notification copy. Only ever used on the internal admin notice —
   *  never on the confirmation that goes to the enquirer. */
  cc?: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const supportInboxId = resolveSupportInboxId();

  await sendEmail({
    fromInboxId: supportInboxId,
    to,
    cc,
    subject,
    html,
    replyTo,
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
