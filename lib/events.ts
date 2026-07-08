export type MasterClassEvent = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  startAt: Date;
  endAt: Date;
  timezoneLabel: string;
  host: string;
  price: string;
  priceAmount: number;
  courseUrl: string;
  demoUrl: string;
  seats: string;
  zoom: {
    joinUrl: string;
    meetingId: string;
    meetingIdFormatted: string;
    passcode: string;
    chatUrl: string;
  };
  topics: string[];
  agenda: string[];
};

export const ragMasterClass: MasterClassEvent = {
  slug: "rag-masterclass",
  title: "RAG Systems & Architecture Masterclass",
  subtitle:
    "From reading about RAG to shipping it — a 3-hour live masterclass for builders",
  description:
    "Retrieval-Augmented Generation couples a generative language model with an external knowledge store so answers are grounded in retrieved evidence, not parametric memory alone. Walk the full pipeline — ingestion, chunking, embedding, indexing, retrieval, reranking, and grounded generation — plus architectural patterns and enterprise reference architecture.",
  startAt: new Date("2026-07-11T17:00:00+05:30"),
  endAt: new Date("2026-07-11T20:00:00+05:30"),
  timezoneLabel: "IST",
  host: "Girish Hiremath",
  price: "₹299",
  priceAmount: 299,
  courseUrl:
    "https://learning.intelliforge.tech/courses/rag-systems-masterclass",
  demoUrl: "https://learning.intelliforge.tech/courses/rag-systems-masterclass",
  seats: "Up to 100 seats",
  zoom: {
    joinUrl:
      "https://us06web.zoom.us/j/86945231060?pwd=R5RqM4BHxQtNBhLkdLO0mPJoKGBi01.1",
    meetingId: "86945231060",
    meetingIdFormatted: "869 4523 1060",
    passcode: "557422",
    chatUrl: "https://us06web.zoom.us/launch/jc/86945231060",
  },
  agenda: [
    "Hour 1 — Why RAG & the 7-stage pipeline",
    "Hour 2 — Patterns, design decisions & hands-on architecture",
    "Hour 3 — Enterprise RAG, evaluation, study library & live Q&A",
  ],
  topics: [
    "Why RAG exists and the three problems it solves",
    "The full pipeline: indexing, chunking, embedding, retrieval & generation",
    "Architectural patterns — naive, advanced, modular, agentic & GraphRAG",
    "Design decisions, evaluation, and enterprise reference architecture",
    "11 structured lessons · live session · recording included",
  ],
};

export function isEventUpcoming(event: MasterClassEvent, now = new Date()): boolean {
  return now < event.endAt;
}

export function formatEventDate(
  event: MasterClassEvent,
  options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  },
): string {
  const date = event.startAt.toLocaleString("en-IN", options);
  return `${date} ${event.timezoneLabel}`;
}

export function formatEventTimeRange(event: MasterClassEvent): string {
  const start = event.startAt.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
  const end = event.endAt.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
  return `${start} – ${end} ${event.timezoneLabel}`;
}

export function formatEventShortDate(event: MasterClassEvent): string {
  return event.startAt.toLocaleString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}
