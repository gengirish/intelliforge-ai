const DISPATCH_URL = "https://backend.omnidim.io/api/v1/calls/dispatch";

export type DispatchCallParams = {
  toNumber: string;
  callContext?: Record<string, string>;
  metadata?: Record<string, string>;
};

export class OmniDimensionError extends Error {}

/**
 * Dispatches an outbound call via the OmniDimension voice agent platform.
 * agent_id comes from OMNIDIM_CONFIRMATION_AGENT_ID — see docs.omnidim.io
 * (POST /calls/dispatch). API key is server-only, never exposed to the client.
 */
export async function dispatchCall({ toNumber, callContext, metadata }: DispatchCallParams) {
  const apiKey = process.env.OMNIDIM_API_KEY?.trim();
  const agentId = process.env.OMNIDIM_CONFIRMATION_AGENT_ID?.trim();

  if (!apiKey || !agentId) {
    throw new OmniDimensionError(
      "OMNIDIM_API_KEY or OMNIDIM_CONFIRMATION_AGENT_ID is not configured",
    );
  }

  const res = await fetch(DISPATCH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_id: Number(agentId),
      to_number: toNumber,
      call_context: callContext,
      metadata,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new OmniDimensionError(`OmniDimension dispatch failed (${res.status}): ${body}`);
  }

  return res.json() as Promise<{
    success: boolean;
    status: string;
    requestId: number;
  }>;
}
