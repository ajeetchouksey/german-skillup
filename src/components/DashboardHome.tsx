import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, BarChart2, BookOpen, CalendarDays, CheckCircle2, ChevronRight, Flame, Star, Zap,
} from "lucide-react";
import type { LevelContent, ProgressState } from "@/types";
import { Badge, GlassCard, StatGrid } from "@/components/ui";
import type { StatItem } from "@/components/ui";
import { computeReadiness, generatePlan, loadDoneDays, loadKnownVocab, nextIncompleteDay } from "@/lib/studyPlan";
import { getTotalLessonCount } from "@/lib/progress";

interface DashboardProps {
  data: LevelContent;
  progress: ProgressState;
  completionPct: number;
  onGoToPlan: () => void;
  onGoToVocab: () => void;
  onOpenLesson: (moduleId: string, lessonId: string) => void;
}

function AnimatedBar({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), delay + 80);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="h-1.5 bg-border rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${w}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function DashboardHome({ data, progress, completionPct, onGoToPlan, onGoToVocab, onOpenLesson }: DashboardProps) {
  const plan = useMemo(() => generatePlan(data), [data]);
  const [doneDays] = useState(() => loadDoneDays());
  const [knownVocab] = useState(() => loadKnownVocab());

  const readiness = useMemo(() => computeReadiness(data, progress, knownVocab), [data, progress, knownVocab]);
  const nextDay = useMemo(() => nextIncompleteDay(plan, doneDays), [plan, doneDays]);

  const totalVocab = data.modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.vocab.length, 0), 0);
  const knownCount = knownVocab.size;
  const totalLessons = getTotalLessonCount(data);

  const stats: StatItem[] = [
    { icon: CheckCircle2, value: progress.completedLessons.length, label: "Lessons done", color: "text-emerald-400", accent: "emerald" },
    { icon: Star,         value: progress.xp,                       label: "Total XP",     color: "text-violet-400",  accent: "violet"  },
    { icon: Flame, value: `${progress.streak}d`, label: "Streak", color: "text-orange-400", accent: "amber" },
    { icon: Zap,          value: `${knownCount}/${totalVocab}`,     label: "Vocab known",  color: "text-blue-400",   accent: "blue"    },
  ];

  return (
    <div className="space-y-6">
      {/* Eyebrow */}
      <div>
        <p className="page-eyebrow">🇩🇪 Deutsch SkillUp · Goethe A1</p>
        <h1 className="heading-gradient text-3xl font-bold mt-1">Your Learning Dashboard</h1>
        <p className="text-sm text-muted mt-1">
          {completionPct}% complete · {totalLessons - progress.completedLessons.length} lessons remaining
        </p>
      </div>

      {/* Stats row */}
      <StatGrid stats={stats} cols={4} />

      {/* Today's Task + Overall progress */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Today's Task */}
        <GlassCard accent="violet" className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays size={14} className="text-violet-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Today's Task</span>
          </div>
          {nextDay ? (
            <>
              <p className="text-xs text-muted mb-1">Day {nextDay.day} · {nextDay.estimatedMinutes} min</p>
              <p className="font-semibold text-white mb-0.5">{nextDay.moduleIcon} {nextDay.lessonTitle}</p>
              <p className="text-xs text-muted mb-4">{nextDay.topic}</p>
              <div className="space-y-1 mb-4">
                {nextDay.activities.slice(0, 3).map((a) => (
                  <p key={a.label} className="text-xs text-slate-400">· {a.label} ({a.minutes} min)</p>
                ))}
                {nextDay.activities.length > 3 && (
                  <p className="text-xs text-slate-600">+ {nextDay.activities.length - 3} more activities</p>
                )}
              </div>
              <div className="flex gap-2">
                {!nextDay.isRevision && (
                  <button
                    onClick={() => onOpenLesson(nextDay.moduleId, nextDay.lessonId)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Open lesson <ArrowRight size={13} />
                  </button>
                )}
                <button
                  onClick={onGoToPlan}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Full plan <ArrowRight size={13} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">🎉</div>
              <p className="font-semibold text-white">All {plan.length} days complete!</p>
              <p className="text-sm text-muted mt-1">Outstanding work — you're exam ready.</p>
            </div>
          )}
        </GlassCard>

        {/* Overall progress */}
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 size={14} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Overall progress</span>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted mb-2">
              <span>Course completion</span>
              <span className="text-violet-300 font-semibold">{completionPct}%</span>
            </div>
            <AnimatedBar pct={completionPct} color="#7c3aed" />
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted mb-2">
              <span>Vocabulary known</span>
              <span className="text-blue-400 font-semibold">{Math.round((knownCount / totalVocab) * 100)}%</span>
            </div>
            <AnimatedBar pct={Math.round((knownCount / totalVocab) * 100)} color="#2f6fed" delay={120} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted mb-2">
              <span>Study plan days</span>
              <span className="text-emerald-400 font-semibold">{doneDays.size}/{plan.length}</span>
            </div>
            <AnimatedBar pct={Math.round((doneDays.size / plan.length) * 100)} color="#2fbf71" delay={240} />
          </div>
          <button
            onClick={onGoToVocab}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            <BookOpen size={12} /> Browse vocabulary <ArrowRight size={12} />
          </button>
        </GlassCard>
      </div>

      {/* Module readiness */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart2 size={14} className="text-violet-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Module readiness</span>
          </div>
          <Badge label={`${data.modules.length} modules`} variant="slate" />
        </div>
        <div className="space-y-3">
          {readiness.map((r, i) => {
            const mod = data.modules.find((m) => m.id === r.moduleId);
            const target = mod?.lessons.find((l) => !progress.completedLessons.includes(l.id)) ?? mod?.lessons[0];
            return (
              <button
                key={r.moduleId}
                onClick={() => target && onOpenLesson(r.moduleId, target.id)}
                disabled={!target}
                className="block w-full text-left group disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-300 group-hover:text-white flex items-center gap-1.5 transition-colors">
                    <span>{r.moduleIcon}</span>
                    <span className="truncate max-w-[160px]">{r.moduleTitle}</span>
                    <ChevronRight size={11} className="text-slate-600 group-hover:text-violet-400 shrink-0 transition-colors" />
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-muted">{r.lessonsComplete}/{r.totalLessons}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold ${
                        r.pct >= 70 ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                        : r.pct > 0  ? "bg-violet-950 text-violet-400 border-violet-800"
                        :              "bg-slate-800 text-slate-500 border-slate-700"
                      }`}
                    >
                      {r.pct >= 70 ? "Strong" : r.pct > 0 ? "In progress" : "New"}
                    </span>
                  </div>
                </div>
                <AnimatedBar
                  pct={r.lessonsComplete > 0 ? Math.max(r.pct, 5) : 0}
                  color={r.pct >= 70 ? "#2fbf71" : r.pct > 0 ? "#7c3aed" : "#1e2d42"}
                  delay={i * 60}
                />
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
