import { useMemo, useRef, useState } from "react";
import { Header, type AppView } from "@/components/Header";
import { NavSidebar } from "@/components/NavSidebar";
import { DashboardHome } from "@/components/DashboardHome";
import { LessonView } from "@/components/LessonView";
import { StudyPlanView } from "@/components/StudyPlanView";
import { VocabBuilder } from "@/components/VocabBuilder";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { AgentPanel } from "@/components/agents/AgentPanel";
import { LEVELS, AVAILABLE_LEVELS } from "@/data/levels";
import { useProgress } from "@/lib/useProgress";
import { getCompletionPct } from "@/lib/progress";
import type { CEFRLevel, Lesson, Module } from "@/types";

export default function App() {
  const [level, setLevel] = useState<CEFRLevel>(AVAILABLE_LEVELS[0] ?? "A1");
  const [selection, setSelection] = useState<{ mod: Module; lesson: Lesson } | null>(null);
  const [view, setView] = useState<AppView>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const { progress, completeLesson, submitQuiz, reset } = useProgress();
  const toastTimer = useRef<number | undefined>(undefined);

  const data = LEVELS[level];

  const completionPct = useMemo(() => (data ? getCompletionPct(data, progress) : 0), [data, progress]);

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

  const handleReset = () => {
    if (confirm("Reset all your local progress? This cannot be undone.")) {
      reset();
      showToast("Progress reset.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
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
          onLevelChange={(lvl) => { setLevel(lvl); goHome(); }}
          progress={progress}
          completionPct={completionPct}
          activeView={activeView}
          onHome={goHome}
          onPlan={() => setView((v) => v === "plan" ? "home" : "plan")}
          onVocab={() => setView((v) => v === "vocab" ? "home" : "vocab")}
          onAgents={() => setView((v) => v === "agents" ? "home" : "agents")}
          onReset={handleReset}
          data={data}
          activeLessonId={selection?.lesson.id ?? null}
          onSelectLesson={(mod, lesson) => { setSelection({ mod, lesson }); setView("lesson"); }}
        />

        <main className="flex-1 p-5 sm:p-9">
          <div className="mx-auto max-w-[880px]">
            {view === "agents" ? (
              <AgentPanel />
            ) : view === "plan" ? (
              <StudyPlanView data={data} onBack={goHome} />
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
        </main>
      </div>

      <Footer />
      <Toast message={toast} />
    </div>
  );
}
