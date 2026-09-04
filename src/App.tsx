import { useEffect, useMemo, useRef, useState } from "react";
import { Header, type AppView } from "@/components/Header";
import { NavSidebar } from "@/components/NavSidebar";
import { DashboardHome } from "@/components/DashboardHome";
import { Landing } from "@/components/Landing";
import { LessonView } from "@/components/LessonView";
import { OnboardingQuiz } from "@/components/OnboardingQuiz";
import { StudyPlanView } from "@/components/StudyPlanView";
import { VocabBuilder } from "@/components/VocabBuilder";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { AgentPanel } from "@/components/agents/AgentPanel";
import { LEVELS, AVAILABLE_LEVELS } from "@/data/levels";
import { useProgress } from "@/lib/useProgress";
import { getCompletionPct } from "@/lib/progress";
import { usePersona } from "@/lib/usePersona";
import { loadLevel, saveLevel, skippedPersona } from "@/lib/persona";
import { useAuth } from "@/lib/auth";
import { loadCloudProgress, mergeProgress, saveCloudProgress } from "@/lib/progressSync";
import type { CEFRLevel, Lesson, Module } from "@/types";

const ENTERED_KEY = "deutsch_skillup_entered_v1";

export default function App() {
  const [entered, setEntered] = useState(() => localStorage.getItem(ENTERED_KEY) === "1");
  const { persona, setPersona } = usePersona();
  const [showQuiz, setShowQuiz] = useState(false);
  const [level, setLevel] = useState<CEFRLevel>(
    () => loadLevel() ?? persona?.startLevel ?? AVAILABLE_LEVELS[0] ?? "A1"
  );
  const [selection, setSelection] = useState<{ mod: Module; lesson: Lesson } | null>(null);
  const [view, setView] = useState<AppView>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  // Tracks which token's already been merged — not a boolean. A boolean would
  // stay true across logout (nothing resets it), so a second login in the
  // same session would skip the merge and silently overwrite cloud data with
  // unmerged local state. Each login mints a fresh token, so comparing
  // against the actual token value re-triggers a merge on every real login
  // (same account or different) while still running at most once per token.
  const [syncedForToken, setSyncedForToken] = useState<string | null>(null);

  const { progress, completeLesson, submitQuiz, reset, applyProgress } = useProgress();
  const { token } = useAuth();
  const toastTimer = useRef<number | undefined>(undefined);
  // Mirrors `progress` for the async sync effect below, so a merge that
  // resolves after the user completes a lesson/quiz mid-fetch reads the
  // latest local state instead of the stale snapshot captured when the
  // effect fired (the promise can outlive that render).
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // On login: pull cloud progress once and merge with whatever's local. The
  // "push to cloud" effect below picks up the merged (or unchanged, if there
  // was no cloud copy yet) result on the next render once syncedForToken matches.
  useEffect(() => {
    if (!token || syncedForToken === token) return;
    loadCloudProgress(token).then((cloud) => {
      if (cloud) applyProgress(mergeProgress(progressRef.current, cloud));
      setSyncedForToken(token);
    });
  }, [token, syncedForToken, applyProgress]);

  // After the initial sync, keep pushing local changes to the cloud.
  useEffect(() => {
    if (!token || syncedForToken !== token) return;
    saveCloudProgress(token, progress);
  }, [token, syncedForToken, progress]);

  const data = LEVELS[level];

  const completionPct = useMemo(() => (data ? getCompletionPct(data, progress) : 0), [data, progress]);

  if (!entered) {
    return (
      <Landing
        onStart={() => {
          localStorage.setItem(ENTERED_KEY, "1");
          setEntered(true);
        }}
      />
    );
  }

  if (!persona || showQuiz) {
    return (
      <OnboardingQuiz
        onComplete={(p) => {
          setPersona(p);
          setLevel(p.startLevel);
          saveLevel(p.startLevel);
          setShowQuiz(false);
        }}
        onSkip={() => {
          // Re-opened via "edit preferences" with an existing persona: skip = cancel,
          // don't overwrite real answers with the skipped placeholder.
          if (!persona) setPersona(skippedPersona(level));
          setShowQuiz(false);
        }}
      />
    );
  }

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3000);
  };

  const goHome = () => { setSelection(null); setView("home"); };

  const openLesson = (moduleId: string, lessonId: string) => {
    if (!data) return;
    for (const mod of data.modules) {
      if (mod.id === moduleId) {
        const lesson = mod.lessons.find((l) => l.id === lessonId);
        if (lesson) { setSelection({ mod, lesson }); setView("lesson"); return; }
      }
    }
  };

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center text-muted">
        Content for level {level} is coming soon. Switch back to an available level from the selector above.
      </div>
    );
  }

  const activeView: AppView = view === "lesson" ? "lesson" : view;
  const pageKey = `${view}-${selection?.lesson.id ?? ""}`;

  const handleReset = () => {
    if (confirm("Reset all your local progress? This cannot be undone.")) {
      reset();
      showToast("Progress reset.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <div key={`np-${pageKey}`} className="nav-progress" aria-hidden="true" />
      <Header
        level={level}
        onHome={goHome}
        onSidebarToggle={() => setSidebarOpen((o) => !o)}
      />

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[9] bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1">
        <NavSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          view={activeView}
          level={level}
          onLevelChange={(lvl) => { setLevel(lvl); saveLevel(lvl); goHome(); }}
          progress={progress}
          completionPct={completionPct}
          activeView={activeView}
          onHome={goHome}
          onPlan={() => setView((v) => v === "plan" ? "home" : "plan")}
          onVocab={() => setView((v) => v === "vocab" ? "home" : "vocab")}
          onAgents={() => setView((v) => v === "agents" ? "home" : "agents")}
          onReset={handleReset}
          onEditPreferences={() => setShowQuiz(true)}
          data={data}
          activeLessonId={selection?.lesson.id ?? null}
          onSelectLesson={(mod, lesson) => { setSelection({ mod, lesson }); setView("lesson"); }}
        />

        <main id="main" className="flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-5xl">
            <div key={pageKey} className="animate-[fadeIn_0.38s_cubic-bezier(0.22,1,0.36,1)_both]">
              {view === "agents" ? (
                <AgentPanel level={level} />
              ) : view === "plan" ? (
                <StudyPlanView data={data} persona={persona} onBack={goHome} onOpenLesson={openLesson} />
              ) : view === "vocab" ? (
                <VocabBuilder data={data} onBack={goHome} />
              ) : view === "lesson" && selection ? (
                <LessonView
                  data={data}
                  mod={selection.mod}
                  lesson={selection.lesson}
                  progress={progress}
                  onComplete={(lessonId) => completeLesson(lessonId)}
                  onQuizComplete={(lessonId, correct, total) => submitQuiz(lessonId, correct, total)}
                  onNavigate={(mod, lesson) => { setSelection({ mod, lesson }); setView("lesson"); }}
                  onToast={showToast}
                />
              ) : (
                <DashboardHome
                  data={data}
                  progress={progress}
                  completionPct={completionPct}
                  onGoToPlan={() => setView("plan")}
                  onGoToVocab={() => setView("vocab")}
                  onOpenLesson={openLesson}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <Toast message={toast} />
    </div>
  );
}
