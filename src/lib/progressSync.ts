import type { ProgressState, QuizScore } from "@/types";

const AUTH_WORKER_URL = (import.meta.env.VITE_AUTH_WORKER_URL as string | undefined) || "";

export async function loadCloudProgress(token: string): Promise<ProgressState | null> {
  if (!AUTH_WORKER_URL) return null;
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/profile/load`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { progress: ProgressState | null };
    return data.progress;
  } catch {
    return null;
  }
}

export async function saveCloudProgress(token: string, progress: ProgressState): Promise<boolean> {
  if (!AUTH_WORKER_URL) return false;
  try {
    const res = await fetch(`${AUTH_WORKER_URL}/profile/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(progress),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function mergeQuizScores(a: Record<string, QuizScore>, b: Record<string, QuizScore>): Record<string, QuizScore> {
  const merged: Record<string, QuizScore> = { ...a };
  for (const [lessonId, score] of Object.entries(b)) {
    const existing = merged[lessonId];
    // ProgressState carries no per-attempt timestamp, so "most recent" (the
    // plan's original wording) isn't determinable — take the better attempt
    // instead, which can never lose a learner's best result on either device.
    if (!existing || score.pct > existing.pct) merged[lessonId] = score;
  }
  return merged;
}

/** Merges a device's local progress with the cloud copy on login. Never loses
 * data from either side: union of completed lessons, the higher xp/streak,
 * the better quiz score per lesson, the more recent lastVisit. */
export function mergeProgress(local: ProgressState, cloud: ProgressState): ProgressState {
  return {
    xp: Math.max(local.xp, cloud.xp),
    streak: Math.max(local.streak, cloud.streak),
    lastVisit: [local.lastVisit, cloud.lastVisit].filter((d): d is string => !!d).sort().pop() ?? null,
    completedLessons: Array.from(new Set([...local.completedLessons, ...cloud.completedLessons])),
    quizScores: mergeQuizScores(local.quizScores, cloud.quizScores),
  };
}
