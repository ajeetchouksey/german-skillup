import { useState } from "react";
import { AlertTriangle, BookOpen, CheckCircle2, Info, Mic, MicOff, PenLine, Turtle, Volume2, Wand2 } from "lucide-react";
import type { ReadingPassage } from "@/types";
import { useSpeech } from "@/lib/useSpeech";
import { useSpeechRecognition, type RecognitionResult } from "@/lib/useSpeechRecognition";
import { analyze, type Feedback } from "./agents/WritingChecker";
import { WritingPad } from "./WritingPad";
import { Badge, Button, GlassCard, SectionHeader } from "./ui";

interface ReadAloudPracticeProps {
  passage: ReadingPassage;
}

const RESULT_STYLE = {
  perfect: { label: "🎉 Perfect", color: "text-emerald-400" },
  close: { label: "🟡 Close", color: "text-amber-400" },
  miss: { label: "❌ Try again", color: "text-error" },
} as const;

const FEEDBACK_ICON = {
  ok: CheckCircle2,
  warn: AlertTriangle,
  info: Info,
} as const;

export function ReadAloudPractice({ passage }: ReadAloudPracticeProps) {
  const { speak } = useSpeech();
  const { listening, activeSentenceIndex, error, isSupported, listenContinuous, stop } = useSpeechRecognition();
  const [results, setResults] = useState<Record<number, RecognitionResult>>({});
  const [responseText, setResponseText] = useState("");
  const [feedback, setFeedback] = useState<Feedback[] | null>(null);

  const handleStart = () => {
    setResults({});
    listenContinuous(passage.sentences, (i, r) => {
      setResults((prev) => ({ ...prev, [i]: r }));
    });
  };

  const doneCount = Object.keys(results).length;
  const aggregateScore =
    doneCount === passage.sentences.length && doneCount > 0
      ? Math.round(Object.values(results).reduce((sum, r) => sum + r.score, 0) / doneCount)
      : null;

  return (
    <GlassCard className="p-5">
      <SectionHeader
        title="Read Aloud"
        icon={BookOpen}
        subtitle={passage.title}
        iconColor="text-lilac"
      />

      {!isSupported && (
        <p className="mt-3 text-xs text-muted">
          Your browser doesn't support microphone-based scoring — you can still read the passage below and
          listen to a model reading of each sentence.
        </p>
      )}

      <div className="mt-4 space-y-2">
        {passage.sentences.map((s, i) => {
          const r = results[i];
          const isActive = isSupported && listening && activeSentenceIndex === i;
          const style = r ? RESULT_STYLE[r.result] : null;
          return (
            <div
              key={i}
              className={`rounded-lg border p-3 transition-colors ${
                isActive ? "border-lilac/60 bg-accent/5" : "border-border"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="flex-1 text-sm">{s}</span>
                <button
                  onClick={() => speak(s)}
                  title="Hear it"
                  aria-label={`Hear: ${s}`}
                  className="rounded-md p-1 text-slate-400 hover:text-white"
                >
                  <Volume2 size={14} />
                </button>
                <button
                  onClick={() => speak(s, 0.55)}
                  title="Hear it slower"
                  aria-label={`Hear slower: ${s}`}
                  className="rounded-md p-1 text-slate-400 hover:text-white"
                >
                  <Turtle size={14} />
                </button>
              </div>
              {r && style && (
                <div className="mt-2 text-xs">
                  <span className={`font-semibold ${style.color}`}>{style.label}</span>
                  <span className="ml-1.5 text-slate-500">
                    {r.score}% match · you said: <span className="italic">"{r.heard}"</span>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isSupported && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {!listening ? (
            <Button variant="primary" size="md" icon={Mic} onClick={handleStart}>
              Start reading aloud
            </Button>
          ) : (
            <Button variant="outline" size="md" icon={MicOff} onClick={stop}>
              Stop
            </Button>
          )}
          {aggregateScore !== null && <Badge label={`Passage score: ${aggregateScore}%`} variant="violet" />}
        </div>
      )}

      {error && <p className="mt-2 text-xs text-error">{error}</p>}

      {passage.translationEn && (
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer text-lilac hover:text-lilac/80">Show English translation</summary>
          <p className="mt-2 text-muted">{passage.translationEn}</p>
        </details>
      )}

      {/* Write about what you read */}
      <div className="mt-5 border-t border-border pt-4">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400">
          <PenLine size={13} /> Now write about it
        </p>
        <p className="mb-2 text-xs text-muted">
          Write 2–3 sentences of your own — retell part of the passage, or say whether something similar happens
          in your own day.
        </p>
        <WritingPad
          value={responseText}
          onChange={(t) => { setResponseText(t); setFeedback(null); }}
          placeholder="Schreiben Sie 2–3 Sätze…"
          targetWords={25}
          label="Your response"
        />
        <div className="mt-2 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            icon={Wand2}
            onClick={() => setFeedback(analyze(responseText))}
            disabled={!responseText.trim()}
          >
            Check my writing
          </Button>
        </div>
        {feedback && feedback.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {feedback.map((f, i) => {
              const Icon = FEEDBACK_ICON[f.type];
              return (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <Icon size={12} className={`mt-0.5 shrink-0 ${f.type === "ok" ? "text-emerald-400" : f.type === "warn" ? "text-amber-400" : "text-blue-400"}`} />
                  <span className={f.type === "ok" ? "text-emerald-300" : f.type === "warn" ? "text-amber-300" : "text-slate-300"}>
                    {f.message}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
