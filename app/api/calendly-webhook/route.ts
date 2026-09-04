import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { dispatchCall, OmniDimensionError } from "@/lib/omnidimension";

// Calendly rejects deliveries it can't get a fast ack for and retries later,
// so signature checks and the outbound dispatch both need to stay quick.
const SIGNATURE_TOLERANCE_SECONDS = 180;

type CalendlyQuestionAndAnswer = {
  question: string;
  answer: string;
  position: number;
};

type CalendlyInviteePayload = {
  name: string;
  email: string;
  text_reminder_number: string | null;
  questions_and_answers: CalendlyQuestionAndAnswer[];
  scheduled_event: {
    name: string;
    start_time: string;
  };
};

type CalendlyWebhookBody = {
  event: string;
  payload: CalendlyInviteePayload;
};

/**
 * Verifies the `Calendly-Webhook-Signature` header per
 * https://developer.calendly.com/api-docs/overview/webhooks/webhook-signatures.md
 * Header shape: `t=<unix_seconds>,v1=<hex hmac-sha256 of "t.rawBody">`.
 */
function isValidCalendlySignature(
  rawBody: string,
  header: string | null,
  signingKey: string,
): boolean {
  if (!header) return false;

  const parts = Object.fromEntries(
    header.split(",").map((part) => part.split("=") as [string, string]),
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > SIGNATURE_TOLERANCE_SECONDS) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", signingKey)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const signatureBuf = Buffer.from(signature, "hex");
  return (
    expectedBuf.length === signatureBuf.length &&
    crypto.timingSafeEqual(expectedBuf, signatureBuf)
  );
}

const PREP_QUESTION_HINT = "prepare";
const PHONE_QUESTION_HINT = "phone";

function findPrepAnswer(qa: CalendlyQuestionAndAnswer[]): string | undefined {
  return qa.find((entry) => entry.question.toLowerCase().includes(PREP_QUESTION_HINT))
    ?.answer;
}

function findPhoneAnswer(qa: CalendlyQuestionAndAnswer[]): string | undefined {
  return qa.find((entry) => entry.question.toLowerCase().includes(PHONE_QUESTION_HINT))
    ?.answer;
}

/**
 * OmniDimension requires E.164 (leading +, country code, no separators).
 * Invitees type phone numbers in whatever format they like, so this
 * normalizes the common cases rather than rejecting anything not already
 * E.164: strips spaces/dashes/parens, keeps a leading +, and assumes a bare
 * 10-digit number is Indian (IntelliForge's primary market) since that's
 * the shape a local invitee is most likely to type. Anything else is
 * treated as unparseable rather than guessed at.
 */
function normalizePhoneNumber(raw: string): string | null {
  const cleaned = raw.trim().replace(/[\s\-().]/g, "");
  if (/^\+\d{8,15}$/.test(cleaned)) return cleaned;
  if (/^\d{10}$/.test(cleaned)) return `+91${cleaned}`;
  return null;
}

/**
 * Triggers the "IntelliForge AI Strategy Call Confirmation" OmniDimension
 * agent to call the prospect right after they book.
 *
 * Phone number source, in priority order:
 *  1. A custom "Phone Number" invitee question on the event type (reliable,
 *     available on every Calendly plan — add it under Event Types → Invitee
 *     Questions).
 *  2. `text_reminder_number` — Calendly's optional SMS-reminders opt-in.
 *     Gated behind Calendly's Teams plan or higher, so this is a bonus
 *     fallback, not something to rely on: it won't appear on the booking
 *     form at all on Free/Essentials/Professional plans.
 *
 * Best-effort either way: bookings with neither are skipped, not errored.
 */
async function triggerConfirmationCall(payload: CalendlyInviteePayload) {
  const questionAnswer = findPhoneAnswer(payload.questions_and_answers);
  const rawNumber = questionAnswer || payload.text_reminder_number;

  if (!rawNumber) {
    console.warn(
      `Calendly webhook: no phone number for ${payload.email} — skipping confirmation call.`,
    );
    return;
  }

  const toNumber = normalizePhoneNumber(rawNumber);
  if (!toNumber) {
    console.warn(
      `Calendly webhook: unparseable phone number "${rawNumber}" for ${payload.email} — skipping confirmation call.`,
    );
    return;
  }

  const startTime = new Date(payload.scheduled_event.start_time);
  const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  await dispatchCall({
    toNumber,
    callContext: {
      name: payload.name,
      date: dateFormatter.format(startTime),
      time: timeFormatter.format(startTime),
      topic: findPrepAnswer(payload.questions_and_answers) || "not specified",
    },
    metadata: {
      source: "calendly_webhook",
      invitee_email: payload.email,
    },
  });
}

export async function POST(req: NextRequest) {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY?.trim();
  if (!signingKey) {
    console.error("Calendly webhook: CALENDLY_WEBHOOK_SIGNING_KEY is not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signatureHeader = req.headers.get("calendly-webhook-signature");

  if (!isValidCalendlySignature(rawBody, signatureHeader, signingKey)) {
    console.error("Calendly webhook: signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: CalendlyWebhookBody;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.event === "invitee.created") {
    try {
      await triggerConfirmationCall(body.payload);
    } catch (err) {
      const message = err instanceof OmniDimensionError ? err.message : String(err);
      console.error("Calendly webhook: failed to dispatch confirmation call:", message);
    }
  }

  return NextResponse.json({ success: true });
}
