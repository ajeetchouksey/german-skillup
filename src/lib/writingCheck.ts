const AUTH_WORKER_URL = (import.meta.env.VITE_AUTH_WORKER_URL as string | undefined) || "";

/** Optional, on-demand LLM writing feedback (Phase 4b). Anonymous — no auth
 * token needed, mirrors FR-3.3 (the app stays usable without signing in).
 * Returns null on any failure (network, rate limit, misconfigured worker) —
 * callers should treat null as "AI feedback unavailable right now", not throw. */
export async function checkWritingWithAI(text: string): Promise<string | null> {
  if (!AUTH_WORKER_URL) return null;
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/writing/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { feedback?: string };
    return data.feedback ?? null;
  } catch {
    return null;
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
