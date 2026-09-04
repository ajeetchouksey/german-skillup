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

export interface FeedbackSegment {
  type: "text" | "wrong" | "right";
  content: string;
}

/** Splits AI feedback text on the [wrong]...[/wrong] / [right]...[/right] markup
 * the Worker's system prompts ask the model to use around the specific German
 * words being compared, so the UI can color-code them. Untagged text (including
 * a reply that ignores the markup instruction) comes back as a single "text"
 * segment — callers must render that plainly, never assume tags are present. */
export function parseAiFeedbackMarkup(text: string): FeedbackSegment[] {
  const segments: FeedbackSegment[] = [];
  const re = /\[wrong\](.*?)\[\/wrong\]|\[right\](.*?)\[\/right\]/gs;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
    if (match[1] !== undefined) segments.push({ type: "wrong", content: match[1] });
    else if (match[2] !== undefined) segments.push({ type: "right", content: match[2] });
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) segments.push({ type: "text", content: text.slice(lastIndex) });
  return segments;
}

export interface FeatureQuota {
  used: number;
  limit: number;
  remaining: number;
}

export interface AiQuota {
  writing: FeatureQuota;
  reading: FeatureQuota;
}

const AUTH_WORKER_URL = (import.meta.env.VITE_AUTH_WORKER_URL as string | undefined) || "";

/** Today's remaining writing/reading AI-feedback checks for this learner (or
 * null if unavailable/misconfigured — callers should just omit the quota UI
 * rather than block on it, same as every other AI feature here). A read-only
 * peek: never throws, never counts as a check itself. */
export async function getAiQuota(token?: string | null): Promise<AiQuota | null> {
  if (!AUTH_WORKER_URL) return null;
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/ai/quota`, { headers: authHeaders(token) });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<AiQuota>;
    return data.writing && data.reading ? (data as AiQuota) : null;
  } catch {
    return null;
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
