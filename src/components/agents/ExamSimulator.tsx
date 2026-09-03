import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, Play, SkipForward } from "lucide-react";
import { Badge, Button, GlassCard, SectionHeader } from "@/components/ui";
import { EXAM_BLUEPRINTS } from "@/data/examBlueprint";
import type { CEFRLevel } from "@/types";

interface Section {
  id: string;
  name: string;
  minutes: number;
  maxScore: number;
  instructions: string;
  strategies: string[];
}

// A1-specific simulator content (timer minutes, max scores, instructions).
// Not yet derived from EXAM_BLUEPRINTS — a future level's blueprint alone
// won't make this simulator interactive for that level until this is
// authored per-level too (tracked as a known gap, not part of the
// examBlueprint registry refactor).
const SECTIONS: Section[] = [
  {
    id: "hoeren",
    name: "Hören",
    minutes: 20,
    maxScore: 45,
    instructions: "Three parts: match short statements to speakers (5 items), answer True/False for a conversation (5 items), fill in a form from a phone message (5 items). Play each recording twice.",
    strategies: ["Read ALL options before the recording plays", "On first listen: mark likely answers; on second listen: confirm", "For Teil 3 (form): prepare to write numbers, dates, names — listen carefully"],
  },
  {
    id: "lesen",
    name: "Lesen",
    minutes: 25,
    maxScore: 45,
    instructions: "Three parts: match 6 short texts to notices (Teil 1), answer True/False for two short texts (Teil 2), match 5 short descriptions to ads/notices (Teil 3).",
    strategies: ["Read the question/description first, then scan for keywords", "Eliminate answers that are clearly wrong before choosing", "Watch for distractor texts that mention the topic but don't match"],
  },
  {
    id: "schreiben",
    name: "Schreiben",
    minutes: 20,
    maxScore: 45,
    instructions: "Two parts: fill in a form with personal data (Teil 1 — 5 fields), write a 30-word message to a friend or colleague (Teil 2).",
    strategies: ["Teil 1: copy data exactly — don't invent information", "Teil 2: use a greeting and sign-off, aim for exactly 30–40 words", "Check capitalization and verb position in Teil 2"],
  },
  {
    id: "sprechen",
    name: "Sprechen",
    minutes: 15,
    maxScore: 45,
    instructions: "Three parts: introduce yourself (Teil 1), ask and answer about everyday topics using prompt cards (Teil 2), request information for a common activity (Teil 3).",
    strategies: ["Teil 1: prepare 6–7 identity points — practise until automatic", "Teil 2: ask AND answer — the examiner expects you to do both", "Teil 3: use polite register (Könnten Sie …? Wie viel kostet …?)"],
  },
];

type Phase = "ready" | "active" | "scoring" | "done";

function pad(n: number) { return String(n).padStart(2, "0"); }

interface ExamSimulatorProps {
  level: CEFRLevel;
}

export function ExamSimulator({ level }: ExamSimulatorProps) {
  const blueprint = EXAM_BLUEPRINTS[level];

  const [sectionIdx, setSectionIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [scoreInput, setScoreInput] = useState("");
  const intervalRef = useRef<number | undefined>(undefined);

  const section = SECTIONS[sectionIdx];
  const isLast = sectionIdx === SECTIONS.length - 1;

  useEffect(() => {
    if (phase === "active" && secondsLeft > 0) {
      intervalRef.current = window.setInterval(() =>
        setSecondsLeft((s) => { if (s <= 1) { setPhase("scoring"); return 0; } return s - 1; }), 1000
      );
    } else {
      window.clearInterval(intervalRef.current);
    }
    return () => window.clearInterval(intervalRef.current);
  }, [phase, secondsLeft]);

  if (!blueprint) {
    return (
      <div className="space-y-5">
        <SectionHeader title="Exam Simulator" icon={Clock} as="h2" iconColor="text-blue-400" />
        <GlassCard accent="slate" className="p-6 text-center text-sm text-muted">
          Mock exam simulator for {level} is coming soon.
        </GlassCard>
      </div>
    );
  }

  const startSection = () => {
    setSecondsLeft(section.minutes * 60);
    setPhase("active");
  };

  const endSection = () => {
    window.clearInterval(intervalRef.current);
    setPhase("scoring");
  };

  const submitScore = () => {
    const val = parseInt(scoreInput, 10);
    if (isNaN(val) || val < 0 || val > section.maxScore) return;
    setScores((prev) => ({ ...prev, [section.id]: val }));
    setScoreInput("");
    if (isLast) { setPhase("done"); return; }
    setSectionIdx((i) => i + 1);
    setPhase("ready");
  };

  const totalMax = SECTIONS.reduce((s, sec) => s + sec.maxScore, 0);
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const passed = totalScore >= blueprint.passMark.required;

  const timerColor = secondsLeft > section.minutes * 30 ? "text-emerald-400"
    : secondsLeft > section.minutes * 12 ? "text-amber-400" : "text-red-400";

  if (phase === "done") {
    return (
      <div className="space-y-5">
        <SectionHeader title="Exam Simulator" icon={CheckCircle2} as="h2" iconColor="text-emerald-400" />
        <GlassCard accent={passed ? "emerald" : "red"} className="p-6 text-center">
          <div className="text-4xl mb-3">{passed ? "🎉" : "📚"}</div>
          <p className="text-xl font-bold text-white mb-1">{passed ? "Bestanden!" : "Weiter üben!"}</p>
          <p className="text-sm text-muted mb-4">
            Total: <b className={passed ? "text-emerald-400" : "text-red-400"}>{totalScore}/{totalMax}</b>
            {" "}· Pass mark: {blueprint.passMark.required}/{blueprint.passMark.total}
          </p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {SECTIONS.map((sec) => (
              <div key={sec.id} className="rounded-md bg-bg-alt border border-border p-3 text-center">
                <p className="text-xs text-muted">{sec.name}</p>
                <p className="font-bold text-white">{scores[sec.id] ?? "—"}/{sec.maxScore}</p>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setSectionIdx(0); setPhase("ready"); setScores({}); setScoreInput(""); }}
          >
            Start again
          </Button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Exam Simulator"
        icon={Clock}
        subtitle="Simulate the full Goethe A1 exam under time pressure. Work through all four sections and log your score."
        badge={`${sectionIdx + 1}/4`}
        badgeVariant="slate"
        as="h2"
        iconColor="text-blue-400"
      />

      {/* Section progress */}
      <div className="flex gap-1.5">
        {SECTIONS.map((sec, i) => (
          <div
            key={sec.id}
            className={`flex-1 rounded py-1.5 text-center text-[10px] font-semibold transition-colors ${
              i < sectionIdx ? "bg-emerald-500/20 text-emerald-400"
              : i === sectionIdx ? "bg-yellow-500/20 text-amber-300"
              : "bg-slate-800 text-slate-600"
            }`}
          >
            {sec.name}
          </div>
        ))}
      </div>

      {/* Section detail */}
      <GlassCard accent={phase === "active" ? "blue" : "gold"} className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-white">{section.name}</h3>
          <Badge label={`${section.minutes} min · max ${section.maxScore} pts`} variant="slate" />
        </div>
        <p className="text-sm text-slate-300 mb-4">{section.instructions}</p>
        <div className="space-y-1 mb-4">
          {section.strategies.map((s) => (
            <p key={s} className="text-xs text-slate-400">· {s}</p>
          ))}
        </div>

        {phase === "ready" && (
          <Button variant="outline" size="sm" icon={Play} onClick={startSection}>
            Start {section.name} — {section.minutes} min
          </Button>
        )}

        {phase === "active" && (
          <div className="flex items-center gap-4">
            <span className={`font-mono text-3xl font-bold tabular-nums ${timerColor}`}>
              {pad(Math.floor(secondsLeft / 60))}:{pad(secondsLeft % 60)}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${(secondsLeft / (section.minutes * 60)) * 100}%`,
                  background: timerColor === "text-emerald-400" ? "#2fbf71" : timerColor === "text-amber-400" ? "#d4a017" : "#c62828",
                }}
              />
            </div>
            <Button variant="ghost" size="sm" icon={SkipForward} onClick={endSection}>
              Done early
            </Button>
          </div>
        )}

        {phase === "scoring" && (
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-300 shrink-0">
              Score for {section.name} (0–{section.maxScore}):
            </label>
            <input
              type="number"
              min={0}
              max={section.maxScore}
              value={scoreInput}
              onChange={(e) => setScoreInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitScore()}
              className="w-20 rounded-lg border border-border bg-bg-alt px-3 py-1.5 text-sm text-white outline-none focus:border-yellow-500/40"
              autoFocus
            />
            <Button variant="outline" size="sm" onClick={submitScore} disabled={!scoreInput}>
              {isLast ? "Finish" : "Next section →"}
            </Button>
          </div>
        )}
      </GlassCard>

      {/* Running scores */}
      {Object.keys(scores).length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {SECTIONS.filter((s) => s.id in scores).map((s) => (
            <div key={s.id} className="text-xs rounded border border-border bg-card px-3 py-1.5">
              <span className="text-muted">{s.name}: </span>
              <span className="font-bold text-white">{scores[s.id]}/{s.maxScore}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
