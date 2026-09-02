import type { LevelContent, ProgressState } from "@/types";

const STORAGE_KEY = "deutsch_skillup_progress_v1";

export function emptyProgress(): ProgressState {
  return { xp: 0, streak: 0, lastVisit: null, completedLessons: [], quizScores: {} };
}

export function loadProgress(): ProgressState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyProgress();
  try {
    return JSON.parse(raw) as ProgressState;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: ProgressState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function updateStreak(progress: ProgressState): ProgressState {
  const today = new Date().toDateString();
  if (progress.lastVisit === today) return progress;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const next: ProgressState = { ...progress };
  next.streak = progress.lastVisit === yesterday.toDateString() ? progress.streak + 1 : 1;
  next.lastVisit = today;
  saveProgress(next);
  return next;
}

export function markLessonComplete(lessonId: string, xpGain = 10): ProgressState {
  const progress = loadProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.xp += xpGain;
    saveProgress(progress);
  }
  return progress;
}

export function recordQuizScore(lessonId: string, correct: number, total: number): ProgressState {
  const progress = loadProgress();
  progress.quizScores[lessonId] = { correct, total, pct: Math.round((correct / total) * 100) };
  progress.xp += correct * 5;
  saveProgress(progress);
  return progress;
}

export function getTotalLessonCount(data: LevelContent): number {
  return data.modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

export function getCompletionPct(data: LevelContent, progress: ProgressState): number {
  const total = getTotalLessonCount(data);
  if (total === 0) return 0;
  const completedInLevel = progress.completedLessons.filter((id) =>
    data.modules.some((m) => m.lessons.some((l) => l.id === id))
  ).length;
  return Math.round((completedInLevel / total) * 100);
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
