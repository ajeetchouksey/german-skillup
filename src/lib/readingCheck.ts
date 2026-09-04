import { authHeaders, parseAiFeedbackResponse, type AiFeedbackResult } from "./aiFeedback";

const AUTH_WORKER_URL = (import.meta.env.VITE_AUTH_WORKER_URL as string | undefined) || "";

export interface ReadingCheckItem {
  target: string;
  heard: string;
}

export type ReadingCheckResult = AiFeedbackResult;

/** Optional, on-demand LLM feedback on a read-aloud passage (Phase 4b) — the
 * `items` are target/heard sentence pairs from the browser's own local speech
 * recognition (ReadAloudPractice.tsx), never raw audio (NFR-4). Same
 * optional-token/never-throws contract as checkWritingWithAI — see that file. */
export async function checkReadingWithAI(items: ReadingCheckItem[], token?: string | null): Promise<ReadingCheckResult> {
  if (!AUTH_WORKER_URL) return { ok: false, reason: "unavailable" };
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/reading/check`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ items }),
    });
    return await parseAiFeedbackResponse(res);
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

export async function reportReadingFeedback(items: ReadingCheckItem[], feedback: string, token?: string | null): Promise<boolean> {
  if (!AUTH_WORKER_URL) return false;
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/reading/report`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ items, feedback }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
