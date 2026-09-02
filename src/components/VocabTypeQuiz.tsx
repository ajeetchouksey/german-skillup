import { useState, useRef } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import type { VocabItem } from "@/types";
import { Button, GlassCard } from "./ui";

interface VocabTypeQuizProps {
  vocab: VocabItem[];
}

// Strip article prefixes so "der Tisch" matches input "Tisch"
function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/^(der|die|das|ein|eine|einen)\s+/i, "")
    .replace(/[,;()\[\]]/g, "")
    .trim();
}

type Status = "idle" | "correct" | "wrong";

export function VocabTypeQuiz({ vocab }: VocabTypeQuizProps) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = vocab[index];

  const check = () => {
    if (!input.trim() || status !== "idle") return;
    const correct = normalize(current.de) === normalize(input);
    setStatus(correct ? "correct" : "wrong");
    setScore((s) => ({ ...s, [correct ? "correct" : "wrong"]: s[correct ? "correct" : "wrong"] + 1 }));
  };

  const next = () => {
    if (index + 1 >= vocab.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setInput("");
    setStatus("idle");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const reset = () => {
    setIndex(0);
    setInput("");
    setStatus("idle");
    setScore({ correct: 0, wrong: 0 });
    setFinished(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  if (finished) {
    const pct = Math.round((score.correct / vocab.length) * 100);
    return (
      <GlassCard accent={pct >= 80 ? "emerald" : "gold"} className="p-5 text-center">
        <p className="text-lg font-bold text-white mb-1">
          {pct >= 80 ? "🎉 Great work!" : "📚 Keep practising!"}
        </p>
        <p className="text-sm text-muted mb-3">
          <b className="text-emerald-400">{score.correct}</b> correct &nbsp;·&nbsp;
          <b className="text-red-400">{score.wrong}</b> to review &nbsp;·&nbsp;
          <b className="text-white">{pct}%</b>
        </p>
        <Button variant="outline" size="sm" icon={RotateCcw} onClick={reset}>
          Try again
        </Button>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          {index + 1} / {vocab.length}
        </span>
        <span>
          <span className="text-emerald-400">✓ {score.correct}</span>
          {score.wrong > 0 && <span className="ml-2 text-red-400">✗ {score.wrong}</span>}
        </span>
      </div>

      <GlassCard className="p-5">
        <p className="text-xs text-muted mb-2 uppercase tracking-widest">Type the German word</p>
        <p className="text-lg font-semibold text-white mb-4">{current.en}</p>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (status === "idle") check();
                else next();
              }
            }}
            disabled={status !== "idle"}
            placeholder="Deutsch…"
            className="flex-1 rounded-lg border border-border bg-bg-alt px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-yellow-500/40 disabled:opacity-60 transition-colors"
          />
          {status === "idle" ? (
            <Button variant="outline" size="sm" onClick={check} disabled={!input.trim()}>
              Check
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={next}>
              Next →
            </Button>
          )}
        </div>

        {/* Feedback */}
        {status === "correct" && (
          <div className="mt-3 flex items-center gap-2 rounded-md bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 text-sm text-emerald-300">
            <Check size={13} /> Correct!
            {current.example && <span className="ml-1 text-slate-400 italic">{current.example}</span>}
          </div>
        )}
        {status === "wrong" && (
          <div className="mt-3 flex items-start gap-2 rounded-md bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm">
            <X size={13} className="text-red-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-red-300">Correct: </span>
              <span className="font-bold text-white">{current.de}</span>
              {current.example && <p className="mt-0.5 text-xs text-slate-400 italic">{current.example}</p>}
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
