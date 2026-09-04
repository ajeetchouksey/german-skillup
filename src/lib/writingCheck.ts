const AUTH_WORKER_URL = (import.meta.env.VITE_AUTH_WORKER_URL as string | undefined) || "";

export type WritingCheckResult =
  | { ok: true; feedback: string }
  | { ok: false; reason: "rate_limited" | "daily_limit_reached" | "unavailable" };

/** Optional, on-demand LLM writing feedback (Phase 4b). Anonymous — no auth
 * token needed, mirrors FR-3.3 (the app stays usable without signing in).
 * Never throws — any failure (network, rate limit, misconfigured worker)
 * comes back as a typed `{ ok: false, reason }` for the caller to render. */
export async function checkWritingWithAI(text: string): Promise<WritingCheckResult> {
  if (!AUTH_WORKER_URL) return { ok: false, reason: "unavailable" };
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/writing/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.status === 429) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      return { ok: false, reason: data?.error === "daily_limit_reached" ? "daily_limit_reached" : "rate_limited" };
    }
    if (!res.ok) return { ok: false, reason: "unavailable" };
    const data = (await res.json()) as { feedback?: string };
    return data.feedback ? { ok: true, feedback: data.feedback } : { ok: false, reason: "unavailable" };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

export async function reportWritingFeedback(text: string, feedback: string): Promise<boolean> {
  if (!AUTH_WORKER_URL) return false;
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/writing/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, feedback }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
