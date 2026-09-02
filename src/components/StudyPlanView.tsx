import { useState, useMemo, useCallback } from "react";
import {
  CalendarDays, CheckCircle2, Circle, ChevronDown, ChevronRight,
  Clock, BookOpen, Brain, RotateCcw, Zap,
} from "lucide-react";
import { Badge, GlassCard } from "@/components/ui";
import type { LevelContent } from "@/types";
import {
  generatePlan,
  loadDoneDays,
  saveDoneDays,
  toggleDayDone,
  nextIncompleteDay,
  type DaySession,
  type DayActivity,
} from "@/lib/studyPlan";

function ActivityIcon({ type }: { type: DayActivity["type"] }) {
  const cls = "shrink-0";
  if (type === "vocab")    return <BookOpen    size={12} className={`text-blue-400 ${cls}`} />;
  if (type === "grammar")  return <Brain        size={12} className={`text-violet-400 ${cls}`} />;
  if (type === "quiz")     return <Zap          size={12} className={`text-violet-400 ${cls}`} />;
  if (type === "mission")  return <CheckCircle2 size={12} className={`text-emerald-400 ${cls}`} />;
  if (type === "revision") return <RotateCcw    size={12} className={`text-rose-400 ${cls}`} />;
  return <Circle size={12} className={`text-slate-500 ${cls}`} />;
}

function SessionCard({
  session,
  done,
  onToggle,
  defaultOpen,
}: {
  session: DaySession;
  done: boolean;
  onToggle: (day: number) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <div className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${done ? "opacity-50" : ""}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-[rgba(255,255,255,0.03)] transition-colors"
        aria-expanded={open}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(session.day); }}
          className="shrink-0 text-slate-500 hover:text-white transition-colors"
          aria-label={done ? "Mark incomplete" : "Mark complete"}
        >
          {done
            ? <CheckCircle2 size={18} className="text-emerald-400" />
            : <Circle size={18} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Day {session.day}</span>
            {session.isRevision ? (
              <Badge label="Revision" variant="red" />
            ) : (
              <span className="text-sm font-semibold text-white truncate">
                {session.moduleIcon} {session.lessonTitle}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Clock size={10} />{session.estimatedMinutes} min</span>
            <span className="truncate max-w-[160px]">{session.topic}</span>
          </div>
        </div>

        {/* Mini progress bar */}
        <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden shrink-0">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: done ? "100%" : "0%",
              backgroundColor: done ? "#2fbf71" : "#d4a017",
            }}
          />
        </div>
        {open
          ? <ChevronDown size={15} className="text-slate-500 shrink-0" />
          : <ChevronRight size={15} className="text-slate-500 shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-border/60 divide-y divide-border/30">
          {session.activities.map((a, idx) => (
            <div key={idx} className="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
              <ActivityIcon type={a.type} />
              <span className="text-xs flex-1">{a.label}</span>
              <span className="text-[10px] text-slate-600">{a.minutes} min</span>
            </div>
          ))}
          {!session.isRevision && (
            <div className="px-4 py-3">
              <button
                onClick={() => onToggle(session.day)}
                className={`text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  done ? "text-slate-500 hover:text-slate-300" : "text-emerald-400 hover:text-emerald-300"
                }`}
              >
                <CheckCircle2 size={12} />
                {done ? "Unmark as complete" : "Mark day as complete"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function StudyPlanView({ data, onBack }: { data: LevelContent; onBack: () => void }) {
  const plan = useMemo(() => generatePlan(data), [data]);
  const [doneDays, setDoneDays] = useState(() => loadDoneDays());
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");

  const handleToggle = useCallback((day: number) => {
    setDoneDays((prev) => {
      const next = toggleDayDone(day, prev);
      saveDoneDays(next);
      return next;
    });
  }, []);

  const nextDay = useMemo(() => nextIncompleteDay(plan, doneDays), [plan, doneDays]);

  const filtered = useMemo(() => {
    if (filter === "pending") return plan.filter((s) => !doneDays.has(s.day));
    if (filter === "done")    return plan.filter((s) => doneDays.has(s.day));
    return plan;
  }, [plan, doneDays, filter]);

  const pct = Math.round((doneDays.size / plan.length) * 100);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-300 transition-colors mb-2">
          ← Back to dashboard
        </button>
        <div className="flex items-center gap-3 flex-wrap">
          <CalendarDays size={20} className="text-violet-400" />
          <h1 className="heading-gradient text-2xl font-bold">30-Day Study Plan</h1>
          <Badge label="Goethe A1" variant="violet" />
        </div>
        <p className="text-sm text-muted mt-1">
          {plan.length} days · {doneDays.size} completed · {pct}% done
        </p>
      </div>

      {/* Progress bar */}
      <GlassCard className="p-4">
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>Plan completion</span>
          <span className="text-violet-300 font-semibold">{pct}%</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: "#7c3aed" }}
          />
        </div>
        {nextDay && (
          <p className="text-xs text-slate-500 mt-2">
            Next up: <span className="text-slate-300">Day {nextDay.day} — {nextDay.lessonTitle}</span>
          </p>
        )}
      </GlassCard>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "pending", "done"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium capitalize ${
              filter === f
                ? "bg-violet-400/10 border-violet-400/40 text-violet-300"
                : "border-border text-slate-500 hover:text-slate-300 hover:border-slate-600"
            }`}
          >
            {f} {f === "all" ? `(${plan.length})` : f === "pending" ? `(${plan.length - doneDays.size})` : `(${doneDays.size})`}
          </button>
        ))}
      </div>

      {/* Day sessions */}
      <div className="space-y-3">
        {filtered.map((session) => (
          <SessionCard
            key={session.day}
            session={session}
            done={doneDays.has(session.day)}
            onToggle={handleToggle}
            defaultOpen={nextDay?.day === session.day}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            {filter === "pending" ? "All days complete — great work! 🎉" : "No completed days yet."}
          </div>
        )}
      </div>
    </div>
  );
}
