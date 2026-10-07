import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { dispatchCall, OmniDimensionError } from "@/lib/omnidimension";

/**
 * Cal.com BOOKING_CREATED webhook → OmniDimension confirmation call.
 *
 * Replaces the Calendly webhook, which needed Calendly's Standard plan to
 * subscribe at all (`POST /webhook_subscriptions` returns Permission Denied on
 * Free). Cal.com ships webhooks on its free tier.
 *
 * Set the webhook up at Cal.com → Settings → Developer → Webhooks, pointing at
 * https://www.intelliforge.tech/api/cal-webhook for BOOKING_CREATED, with a
 * secret mirrored in CAL_WEBHOOK_SECRET.
 */

type CalResponseValue =
  | string
  | number
  | boolean
  | string[]
  | { label?: string; value?: unknown; optionValue?: unknown }
  | null;

type CalAttendee = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  timeZone?: string;
};

type CalBookingPayload = {
  uid?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  attendees?: CalAttendee[];
  attendeePhoneNumber?: string;
  additionalNotes?: string;
  /** Every booking question, system and custom, keyed by field identifier. */
  responses?: Record<string, CalResponseValue>;
  /** Custom (user-added) questions only — a subset of `responses`. */
  userFieldsResponses?: Record<string, CalResponseValue>;
};

type CalWebhookBody = {
  triggerEvent?: string;
  createdAt?: string;
  payload?: CalBookingPayload;
};

/**
 * Cal.com signs the raw request body with HMAC-SHA256 and sends the hex digest
 * in `X-Cal-Signature-256` (packages/features/webhooks/lib/sendPayload.ts —
 * `createHmac("sha256", secret).update(body).digest("hex")`, no prefix). Some
 * community docs show a `sha256=` prefix, so one is tolerated if present.
 *
 * Unlike Calendly there is no timestamp in the scheme, so a captured delivery
 * stays replayable; the worst case is a duplicate confirmation call, which is
 * why nothing here mutates state.
 */
function isValidCalSignature(
  rawBody: string,
  header: string | null,
  secret: string,
): boolean {
  if (!header) return false;

  // Cal.com sends this literal when a webhook has no secret configured.
  const received = header.trim().replace(/^sha256=/i, "");
  if (!received || received === "no-secret-provided") return false;

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(received, "hex");
  return (
    expectedBuf.length > 0 &&
    expectedBuf.length === receivedBuf.length &&
    crypto.timingSafeEqual(expectedBuf, receivedBuf)
  );
}

const PREP_QUESTION_HINTS = ["prepare", "notes", "anything else"];

/**
 * Cal.com's booking-question keys are slugs the dashboard generates from the
 * label ("Contact Number" → `contact-number`), and the label is editable, so
 * match a set of likely words rather than one exact key — the same lesson the
 * Calendly route learned when "Phone Number" was renamed "Contact Number".
 */
const PHONE_QUESTION_HINTS = [
  "phone",
  "mobile",
  "contact-number",
  "contact number",
  "whatsapp",
  "cell",
];

/** Responses arrive as a bare string, an array, or a {label, value} object. */
function responseToString(value: CalResponseValue): string | undefined {
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.find((item) => item.trim())?.trim();
  if (value && typeof value === "object") {
    const inner = (value as { value?: unknown }).value;
    if (typeof inner === "string") return inner.trim() || undefined;
    if (typeof inner === "number") return String(inner);
    if (Array.isArray(inner)) {
      const first = inner.find((item) => typeof item === "string" && item.trim());
      return typeof first === "string" ? first.trim() : undefined;
    }
  }
  return undefined;
}

function responseLabel(key: string, value: CalResponseValue): string {
  const label =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as { label?: string }).label
      : undefined;
  return `${key} ${label ?? ""}`.toLowerCase();
}

/**
 * OmniDimension requires E.164 (leading +, country code, no separators).
 * Invitees type numbers in whatever format they like, so this normalizes the
 * common cases rather than rejecting anything not already E.164: strips
 * spaces/dashes/parens, keeps a leading +, and assumes a bare 10-digit number
 * is Indian (IntelliForge's primary market). Anything else is treated as
 * unparseable rather than guessed at.
 */
function normalizePhoneNumber(raw: string): string | null {
  const cleaned = raw.trim().replace(/[\s\-().]/g, "");
  if (/^\+\d{8,15}$/.test(cleaned)) return cleaned;
  if (/^\d{10}$/.test(cleaned)) return `+91${cleaned}`;
  return null;
}

/**
 * Looks for the number in the dedicated phone fields first, then a
 * label-matched booking question, then any answer that parses as a phone
 * number — so renaming the question in the Cal.com dashboard cannot silently
 * switch confirmation calls off. Prose answers can't match, because
 * normalizePhoneNumber only accepts a wholly numeric string.
 */
function findPhoneNumber(payload: CalBookingPayload): string | undefined {
  const direct =
    payload.attendeePhoneNumber?.trim() || payload.attendees?.[0]?.phoneNumber?.trim();
  if (direct) return direct;

  const entries = Object.entries({
    ...(payload.responses ?? {}),
    ...(payload.userFieldsResponses ?? {}),
  });

  const labelled = entries.find(([key, value]) => {
    const haystack = responseLabel(key, value);
    return PHONE_QUESTION_HINTS.some((hint) => haystack.includes(hint));
  });
  const labelledValue = labelled && responseToString(labelled[1]);
  if (labelledValue) return labelledValue;

  for (const [, value] of entries) {
    const text = responseToString(value);
    if (text && normalizePhoneNumber(text)) return text;
  }
  return undefined;
}

function findPrepNote(payload: CalBookingPayload): string | undefined {
  if (payload.additionalNotes?.trim()) return payload.additionalNotes.trim();

  const entries = Object.entries({
    ...(payload.responses ?? {}),
    ...(payload.userFieldsResponses ?? {}),
  });
  const match = entries.find(([key, value]) => {
    const haystack = responseLabel(key, value);
    return PREP_QUESTION_HINTS.some((hint) => haystack.includes(hint));
  });
  return match ? responseToString(match[1]) : undefined;
}

function findAttendee(payload: CalBookingPayload): { name: string; email: string } {
  const attendee = payload.attendees?.[0];
  const name =
    attendee?.name ||
    responseToString(payload.responses?.name ?? null) ||
    "there";
  const email =
    attendee?.email || responseToString(payload.responses?.email ?? null) || "unknown";
  return { name, email };
}

/**
 * Triggers the "IntelliForge AI Strategy Call Confirmation" OmniDimension
 * agent to call the prospect right after they book. Best-effort: bookings with
 * no usable number are skipped and logged, not errored, so Cal.com still gets
 * a fast 200 and does not retry.
 */
async function triggerConfirmationCall(payload: CalBookingPayload) {
  const { name, email } = findAttendee(payload);
  const rawNumber = findPhoneNumber(payload);

  if (!rawNumber) {
    console.warn(`Cal webhook: no phone number for ${email} — skipping confirmation call.`);
    return;
  }

  const toNumber = normalizePhoneNumber(rawNumber);
  if (!toNumber) {
    console.warn(
      `Cal webhook: unparseable phone number "${rawNumber}" for ${email} — skipping confirmation call.`,
    );
    return;
  }

  if (!payload.startTime) {
    console.warn(`Cal webhook: booking for ${email} has no startTime — skipping.`);
    return;
  }

  const startTime = new Date(payload.startTime);
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
      name,
      date: dateFormatter.format(startTime),
      time: timeFormatter.format(startTime),
      topic: findPrepNote(payload) || "not specified",
    },
    metadata: {
      source: "cal_webhook",
      invitee_email: email,
      booking_uid: payload.uid ?? "unknown",
    },
  });
}

export async function POST(req: NextRequest) {
  const secret = process.env.CAL_WEBHOOK_SECRET?.trim();
  if (!secret) {
    console.error("Cal webhook: CAL_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signatureHeader = req.headers.get("x-cal-signature-256");

  if (!isValidCalSignature(rawBody, signatureHeader, secret)) {
    console.error("Cal webhook: signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: CalWebhookBody;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.triggerEvent === "BOOKING_CREATED" && body.payload) {
    try {
      await triggerConfirmationCall(body.payload);
    } catch (err) {
      const message = err instanceof OmniDimensionError ? err.message : String(err);
      console.error("Cal webhook: failed to dispatch confirmation call:", message);
    }
  }

  return NextResponse.json({ success: true });
}
