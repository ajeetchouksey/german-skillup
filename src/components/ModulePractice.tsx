import { BookCheck, ClipboardList } from "lucide-react";
import { MODULE_PRACTICE } from "@/data/modulePractice";
import { Badge, GlassCard } from "./ui";

export function ModulePractice({ moduleId }: { moduleId: string }) {
  const p = MODULE_PRACTICE[moduleId];
  if (!p) return null;

  return (
    <div className="mt-6 space-y-6">
      {/* Real-life mission */}
      <GlassCard accent="emerald" className="p-5">
        <div className="mb-1 flex items-center gap-2">
          <BookCheck size={14} className="text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Learn by doing</span>
        </div>
        <h3 className="mt-0.5 text-lg font-bold">What is a Real-Life Mission?</h3>
        <p className="mt-2 text-muted">{p.mission.concept}</p>

        <div className="mt-4 rounded-lg bg-emerald-500/10 p-4">
          <b className="text-sm text-emerald-300">Purpose for this module</b>
          <p className="mt-1 text-sm">{p.mission.purpose}</p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <b className="text-sm">How to complete it</b>
            <ol className="mt-2 list-decimal pl-5 text-sm text-slate-400">
              {p.mission.steps.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
          </div>
          <div>
            <b className="text-sm">Evidence</b>
            <p className="mt-2 text-sm text-slate-400">{p.mission.evidence}</p>
            <b className="mt-3 block text-sm">Success criteria</b>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-400">
              {p.mission.successCriteria.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>

      {/* Sample questions */}
      <GlassCard accent="violet" className="p-5">
        <div className="mb-1 flex items-center gap-2">
          <ClipboardList size={14} className="text-violet-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Module practice</span>
        </div>
        <h3 className="mt-0.5 text-lg font-bold">Sample questions</h3>
        <p className="mt-1 text-sm text-muted">Try each question before opening the answer guide.</p>

        <div className="mt-4 space-y-3">
          {p.sampleQuestions.map((q, i) => (
            <article key={i} className="rounded-lg border border-border bg-bg-alt p-4">
              <Badge label={q.skill} variant="violet" />
              <p className="mt-3 font-semibold">
                {i + 1}. {q.question}
              </p>
              <details className="mt-3 text-sm text-muted">
                <summary className="cursor-pointer text-violet-400 hover:text-violet-300">Show answer guide</summary>
                <p className="mt-2">{q.answerGuide}</p>
              </details>
            </article>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
