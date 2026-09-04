// Shared by writingCheck.ts and readingCheck.ts — both talk to the same
// Worker, in the same shape (typed ok/error result, optional auth header,
// identical 429-reason mapping), so this is the one place that logic lives.

export type AiFeedbackResult =
  | { ok: true; feedback: string }
  | { ok: false; reason: "rate_limited" | "daily_limit_reached" | "daily_budget_reached" | "unavailable" };

/** Attaches a Bearer token when the caller happens to be logged in — never
 * required (these routes stay fully usable signed out, per FR-3.3), but when
 * present it lets the Worker key the daily cap by identity instead of IP. */
export function authHeaders(token?: string | null): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/** User-facing copy for each failure reason — shared so Writing and Reading
 * show identically-worded messages for the same underlying condition. */
export function aiErrorMessage(reason: Extract<AiFeedbackResult, { ok: false }>["reason"]): string {
  switch (reason) {
    case "daily_limit_reached":
      return "You've used up today's free AI feedback — please try again tomorrow.";
    case "daily_budget_reached":
      return "AI feedback has hit its shared daily limit for everyone today — please try again tomorrow.";
    case "rate_limited":
      return "Too many requests in a short time — please wait a bit and try again.";
    default:
      return "AI feedback isn't available right now — try again in a moment.";
  }
}

export async function parseAiFeedbackResponse(res: Response): Promise<AiFeedbackResult> {
  if (res.status === 429) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    const reason =
      data?.error === "daily_limit_reached" ? "daily_limit_reached" :
      data?.error === "daily_budget_reached" ? "daily_budget_reached" :
      "rate_limited";
    return { ok: false, reason };
  }
  if (!res.ok) return { ok: false, reason: "unavailable" };
  const data = (await res.json()) as { feedback?: string };
  return data.feedback ? { ok: true, feedback: data.feedback } : { ok: false, reason: "unavailable" };
}
