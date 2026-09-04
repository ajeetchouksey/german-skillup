import { useState, useEffect } from "react";
import { BarChart2, BookOpen, CalendarDays, Check, ChevronRight, FlaskConical, Flame, Home, RotateCcw, Sparkles, Star, X } from "lucide-react";
import { AVAILABLE_LEVELS } from "@/data/levels";
import type { CEFRLevel, LevelContent, Lesson, Module, ProgressState } from "@/types";
import type { AppView } from "./Header";

interface NavSidebarProps {
  open: boolean;
  onClose: () => void;
  view: AppView;
  level: CEFRLevel;
  onLevelChange: (l: CEFRLevel) => void;
  progress: ProgressState;
  completionPct: number;
  activeView: AppView;
  onHome: () => void;
  onPlan: () => void;
  onVocab: () => void;
  onAgents: () => void;
  onReset: () => void;
  onEditPreferences: () => void;
  data: LevelContent;
  activeLessonId: string | null;
  onSelectLesson: (mod: Module, lesson: Lesson) => void;
}

function NavItem({
  icon: Icon, label, active, onClick,
}: { icon: React.ElementType; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
        active
          ? "bg-violet-500/10 text-violet-300 font-medium"
          : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
      }`}
    >
      <Icon size={15} className={active ? "text-violet-400" : "text-slate-500"} />
      {label}
    </button>
  );
}

export function NavSidebar({
  open, onClose, view, level, onLevelChange, progress, completionPct,
  activeView, onHome, onPlan, onVocab, onAgents, onReset, onEditPreferences,
  data, activeLessonId, onSelectLesson,
}: NavSidebarProps) {
  const [openModuleId, setOpenModuleId] = useState<string | null>(
    data?.modules.find((m) => m.lessons.some((l) => l.id === activeLessonId))?.id ?? null
  );

  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const visible = isDesktop || open;

  const nav = (fn: () => void) => { fn(); onClose(); };

  return (
    <aside
      className={[
        "flex flex-col border-r border-border bg-bg-alt",
        "transition-transform duration-200 ease-in-out",
        isDesktop
          ? "sticky top-14 h-[calc(100vh-56px)] w-[240px] shrink-0"
          : "fixed top-14 left-0 z-10 h-[calc(100vh-56px)] w-[240px]",
      ].join(" ")}
      style={isDesktop ? undefined : { transform: visible ? "translateX(0)" : "translateX(-100%)" }}
    >
      {/* Close button — mobile only */}
      <button
        onClick={onClose}
        className="absolute right-3 top-3 rounded p-1 text-slate-500 hover:text-white lg:hidden"
        aria-label="Close sidebar"
      >
        <X size={14} />
      </button>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto p-3">
        <p className="px-3 pb-1 pt-2 text-[9px] font-semibold uppercase tracking-widest text-slate-600">
          Platform
        </p>
        <NavItem icon={Home}        label="Dashboard"   active={activeView === "home" || activeView === "lesson"} onClick={() => nav(onHome)} />
        <NavItem icon={CalendarDays} label="Study Plan"  active={activeView === "plan"}   onClick={() => nav(onPlan)} />
        <NavItem icon={BookOpen}    label="Vocabulary"   active={activeView === "vocab"}  onClick={() => nav(onVocab)} />
        <NavItem icon={FlaskConical} label="Practice Lab" active={activeView === "agents"} onClick={() => nav(onAgents)} />

        {/* Lesson module list — only in lesson view */}
        {view === "lesson" && (
          <>
            <p className="mt-4 px-3 pb-1 pt-1 text-[9px] font-semibold uppercase tracking-widest text-slate-600">
              Lessons
            </p>
            {data.modules.map((mod) => {
              const isOpen = openModuleId === mod.id;
              const doneCount = mod.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
              return (
                <div key={mod.id} className="mb-0.5">
                  <button
                    onClick={() => setOpenModuleId(isOpen ? null : mod.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors ${
                      isOpen ? "bg-card text-slate-200" : "text-slate-400 hover:bg-card/60 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-sm">{mod.icon}</span>
                    <span className="flex-1 truncate">{mod.title}</span>
                    {doneCount > 0 && (
                      <span className="shrink-0 font-mono text-[9px] text-emerald-400">
                        {doneCount}/{mod.lessons.length}
                      </span>
                    )}
                    <ChevronRight
                      size={11}
                      className={`shrink-0 text-slate-600 transition-transform ${isOpen ? "rotate-90" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-1 pl-8">
                      {mod.lessons.map((lesson) => {
                        const done = progress.completedLessons.includes(lesson.id);
                        const active = activeLessonId === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => { onSelectLesson(mod, lesson); onClose(); }}
                            className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[11px] transition-colors ${
                              active
                                ? "bg-violet-500/5 font-semibold text-violet-300"
                                : "text-muted hover:bg-card/60 hover:text-slate-200"
                            }`}
                          >
                            {done
                              ? <Check size={9} className="shrink-0 text-emerald-400" />
                              : <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-slate-600" />}
                            <span className="truncate">{lesson.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Bottom: stats + level + reset */}
      <div className="space-y-2.5 border-t border-border p-3">
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] text-muted">
            <span>Progress</span>
            <span className="font-semibold text-violet-400">{completionPct}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPct}%`, background: "linear-gradient(90deg,#7c3aed,#a78bfa)" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1"><Star size={10} className="text-violet-400" />{progress.xp} XP</span>
          <span className="flex items-center gap-1"><Flame size={10} className="text-orange-400" />{progress.streak}d</span>
          <span className="flex items-center gap-1"><BarChart2 size={10} className="text-blue-400" />{completionPct}%</span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={level}
            onChange={(e) => onLevelChange(e.target.value as CEFRLevel)}
            className="flex-1 cursor-pointer rounded border border-border bg-card px-2 py-1 text-xs text-slate-300 outline-none"
            aria-label="Select CEFR level"
          >
            {AVAILABLE_LEVELS.map((lvl) => <option key={lvl} value={lvl}>Level {lvl}</option>)}
          </select>
          <button
            onClick={onReset}
            title="Reset progress"
            className="rounded border border-slate-700/40 p-1.5 text-slate-500 transition-colors hover:border-slate-600 hover:text-slate-300"
          >
            <RotateCcw size={12} />
          </button>
        </div>

        <button
          onClick={onEditPreferences}
          className="flex w-full items-center gap-1.5 text-[10px] text-slate-500 transition-colors hover:text-lilac"
        >
          <Sparkles size={10} />
          Edit your plan preferences
        </button>
      </div>
    </aside>
  );
}
