import { useCallback, useEffect, useState } from "react";
import type { ProgressState } from "@/types";
import { loadProgress, markLessonComplete, recordQuizScore, resetProgress, updateStreak } from "./progress";

// React hook wrapping the localStorage-backed progress engine.
// No login/account — progress is per-browser, by design (Phase 1).
export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => updateStreak(loadProgress()));

  useEffect(() => {
    // Re-sync in case another tab updated progress.
    const onStorage = () => setProgress(loadProgress());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const completeLesson = useCallback((lessonId: string, xp?: number) => {
    setProgress(markLessonComplete(lessonId, xp));
  }, []);

  const submitQuiz = useCallback((lessonId: string, correct: number, total: number) => {
    setProgress(recordQuizScore(lessonId, correct, total));
  }, []);

  const reset = useCallback(() => {
    resetProgress();
    setProgress(updateStreak(loadProgress()));
  }, []);

  return { progress, completeLesson, submitQuiz, reset };
}
