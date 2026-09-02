import type { LevelContent, Module, ProgressState } from "@/types";
import { getTotalLessonCount } from "@/lib/progress";
import { BookOpen } from "lucide-react";
import { ExamOverview } from "./ExamOverview";
import { GlassCard, SectionHeader } from "./ui";

interface WelcomeProps {
  data: LevelContent;
  progress: ProgressState;
  onOpenModule: (mod: Module) => void;
}

export function Welcome({ data, progress, onOpenModule }: WelcomeProps) {
  const total = getTotalLessonCount(data);

  return (
    <>
      <ExamOverview />

      <GlassCard className="p-6 sm:p-8">
        <SectionHeader
          title="Goethe A1 Learning Path"
          icon={BookOpen}
          subtitle="A structured path through the published A1 vocabulary themes and the four Goethe exam skills. Each lesson combines grammar, vocabulary, original exam-style practice and a real-life mission."
          badge="A1"
          badgeVariant="gold"
        />

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {data.modules.map((mod) => {
            const done = mod.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
            const pct = Math.round((done / mod.lessons.length) * 100);

            return (
              <GlassCard
                key={mod.id}
                accent="gold"
                onClick={() => onOpenModule(mod)}
                className="cursor-pointer p-[18px] transition-transform hover:-translate-y-1"
              >
                <div className="text-2xl">{mod.icon}</div>
                <h3 className="mb-0.5 mt-2.5 font-semibold">{mod.title}</h3>
                <div className="text-xs text-amber-400">{mod.syllabusTheme}</div>
                <div className="mt-1 text-xs text-muted">
                  {mod.lessons.length} lesson{mod.lessons.length > 1 ? "s" : ""}
                </div>
                {done > 0 && (
                  <div className="mt-2.5">
                    <div className="mb-1 flex justify-between text-[10px] text-muted">
                      <span>Progress</span>
                      <span className="text-emerald-400">{pct}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-border">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: "linear-gradient(90deg,#c62828,#d4a017)" }}
                      />
                    </div>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        <p className="mt-5 text-sm text-muted">
          Total lessons: <b className="text-slate-300">{total}</b> &middot; Completed:{" "}
          <b className="text-emerald-400">{progress.completedLessons.length}</b>
        </p>
      </GlassCard>
    </>
  );
}
