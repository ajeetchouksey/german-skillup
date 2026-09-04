import { authHeaders, parseAiFeedbackResponse, type AiFeedbackResult } from "./aiFeedback";

const AUTH_WORKER_URL = (import.meta.env.VITE_AUTH_WORKER_URL as string | undefined) || "";

export type WritingCheckResult = AiFeedbackResult;

/** Optional, on-demand LLM writing feedback (Phase 4b). No auth token is
 * required, mirrors FR-3.3 (the app stays usable without signing in) — `token`
 * is passed through only so the Worker can key its daily cap by identity
 * instead of IP when the caller happens to be logged in. Never throws — any
 * failure comes back as a typed `{ ok: false, reason }` for the caller to render. */
export async function checkWritingWithAI(text: string, token?: string | null): Promise<WritingCheckResult> {
  if (!AUTH_WORKER_URL) return { ok: false, reason: "unavailable" };
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/writing/check`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ text }),
    });
    return await parseAiFeedbackResponse(res);
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

export async function reportWritingFeedback(text: string, feedback: string, token?: string | null): Promise<boolean> {
  if (!AUTH_WORKER_URL) return false;
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/writing/report`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ text, feedback }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
