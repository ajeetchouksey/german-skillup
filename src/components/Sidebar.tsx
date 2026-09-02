import { useState } from "react";
import { Check, ChevronRight } from 'lucide-react';
import type { LevelContent, Lesson, Module, ProgressState } from "@/types";
import { GlassCard } from "./ui";

interface SidebarProps {
  data: LevelContent;
  progress: ProgressState;
  activeLessonId: string | null;
  onSelectLesson: (mod: Module, lesson: Lesson) => void;
  completionPct: number;
}

export function Sidebar({ data, progress, activeLessonId, onSelectLesson, completionPct }: SidebarProps) {
  const [openModuleId, setOpenModuleId] = useState<string | null>(
    data.modules.find((m) => m.lessons.some((l) => l.id === activeLessonId))?.id ?? null
  );

  return (
    <aside className="sticky top-[57px] h-[calc(100vh-57px)] w-full overflow-y-auto border-b border-border bg-bg-alt p-3.5 sm:w-[280px] sm:border-b-0 sm:border-r">
      <GlassCard accent="gold" className="mb-4 p-3.5">
        <div className="mb-2 flex justify-between text-xs text-muted">
          <span>Overall Progress</span>
          <span className="font-semibold text-violet-300">{completionPct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${completionPct}%`, background: 'linear-gradient(90deg,#7c3aed,#a78bfa)' }}
          />
        </div>
      </GlassCard>

      {data.modules.map((mod) => {
        const isOpen = openModuleId === mod.id;
        const doneCount = mod.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;

        return (
          <div key={mod.id} className="mb-1">
            <button
              onClick={() => setOpenModuleId(isOpen ? null : mod.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                isOpen ? 'border border-border bg-card' : 'hover:bg-card/60'
              }`}
            >
              <span>{mod.icon}</span>
              <span className="flex-1 leading-snug">{mod.title}</span>
              {doneCount > 0 && (
                <span className="text-[9px] text-emerald-400 font-mono">{doneCount}/{mod.lessons.length}</span>
              )}
              <ChevronRight
                size={13}
                className={`shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
              />
            </button>

            {isOpen && (
              <div className="pl-7 pt-0.5">
                {mod.lessons.map((lesson) => {
                  const done = progress.completedLessons.includes(lesson.id);
                  const active = activeLessonId === lesson.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(mod, lesson)}
                      className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[0.82rem] transition-colors ${
                        active
                          ? 'font-semibold text-violet-300 bg-violet-500/5'
                          : 'text-muted hover:bg-card hover:text-slate-100'
                      }`}
                    >
                      {done ? (
                        <Check size={10} className="shrink-0 text-emerald-400" />
                      ) : (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-slate-600" />
                      )}
                      <span>{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
