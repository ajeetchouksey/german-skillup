import { useEffect, useRef, useState } from "react";
import { Mic, Pause, Play, RefreshCw, Timer } from "lucide-react";
import { Button, GlassCard, SectionHeader } from "@/components/ui";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";

// ─── Speaking prompts drawn from common A1 Goethe Sprechen tasks ─────────────
// keywords: a few words a reasonable answer to this prompt would use — checked
// against the transcript as a coarse relevance signal, not exhaustive coverage.
const PROMPTS = [
  { topic: "Persönliche Vorstellung", prompt: "Stellen Sie sich vor: Name, Alter, Wohnort, Beruf, Hobbys, Sprachen.", tip: "Use 6–7 short sentences. Spell your surname.", keywords: ["heiße", "komme", "wohne", "Jahre"] },
  { topic: "Familie", prompt: "Erzählen Sie über Ihre Familie: Wie viele Personen? Namen? Was machen sie?", tip: "Use 'Ich habe … Meine Mutter heißt … Sie arbeitet als …'", keywords: ["Familie", "Mutter", "Vater", "Geschwister"] },
  { topic: "Wohnen", prompt: "Beschreiben Sie Ihre Wohnung: Wie viele Zimmer? Wo? Wie ist sie?", tip: "Use haben + accusative: 'Ich habe ein Schlafzimmer, eine Küche …'", keywords: ["Wohnung", "Zimmer", "Küche"] },
  { topic: "Tagesablauf", prompt: "Erzählen Sie über einen normalen Tag: Wann stehen Sie auf? Was machen Sie?", tip: "Use separable verbs with prefix at end. Add time adverbs: zuerst, dann, danach.", keywords: ["stehe", "auf", "dann", "danach"] },
  { topic: "Essen und Trinken", prompt: "Was essen und trinken Sie gern? Was essen Sie zum Frühstück?", tip: "Use gern/nicht gern + möchten + accusative article.", keywords: ["esse", "trinke", "Frühstück"] },
  { topic: "Einkaufen", prompt: "Sie sind im Geschäft. Fragen Sie nach Farbe, Größe und Preis eines Artikels.", tip: "Ich suche … Haben Sie … in Blau? Was kostet …?", keywords: ["suche", "kostet", "Größe"] },
  { topic: "Gesundheit", prompt: "Sie fühlen sich nicht gut. Beschreiben Sie Ihre Symptome. Was tut weh?", tip: "Mir tut … weh. Ich habe Fieber/Husten. Ich bin krank.", keywords: ["weh", "Fieber", "krank"] },
  { topic: "Freizeit", prompt: "Was machen Sie in Ihrer Freizeit? Haben Sie ein Hobby?", tip: "Ich … gern. Ich spiele … Ich gehe … Ich treffe …", keywords: ["gern", "Hobby", "spiele"] },
  { topic: "Reisen", prompt: "Wohin reisen Sie gern? Wie fahren Sie? Wo schlafen Sie?", tip: "Ich fahre mit dem Zug/Auto/Flugzeug. Ich übernachte in …", keywords: ["fahre", "Zug", "übernachte"] },
  { topic: "Arbeit", prompt: "Was ist Ihr Beruf? Wo arbeiten Sie? Wann fängt Ihre Arbeit an?", tip: "Ich bin … von Beruf. Ich arbeite bei … Die Arbeit fängt um … an.", keywords: ["Beruf", "arbeite", "Arbeit"] },
];

const CHECKLIST = [
  "Spoke without long pauses",
  "Used complete sentences (not only single words)",
  "Verb placed correctly (position 2 in main clause)",
  "Named at least 4 details / pieces of information",
  "Used correct article / adjective agreement",
  "Spoke clearly and at a steady pace",
];

function pad(n: number) { return String(n).padStart(2, "0"); }

export function SpeakingCoach() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(120); // 2 minutes
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [checks, setChecks] = useState<boolean[]>(Array(CHECKLIST.length).fill(false));
  const [transcript, setTranscript] = useState("");
  const [micStarted, setMicStarted] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);

  const { isSupported, listenFreeform, stop: stopMic } = useSpeechRecognition();
  const current = PROMPTS[promptIdx];

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) { setRunning(false); setFinished(true); return 0; }
          return s - 1;
        });
      }, 1000);
    } else {
      window.clearInterval(intervalRef.current);
    }
    return () => window.clearInterval(intervalRef.current);
  }, [running, secondsLeft]);

  const startOrResume = () => {
    if (!micStarted && isSupported) {
      setMicStarted(true);
      listenFreeform(setTranscript);
    }
    setRunning((r) => !r);
  };

  const reset = () => {
    setRunning(false);
    setSecondsLeft(120);
    setFinished(false);
    setChecks(Array(CHECKLIST.length).fill(false));
    setTranscript("");
    setMicStarted(false);
    stopMic();
  };

  const nextPrompt = () => {
    setPromptIdx((i) => (i + 1) % PROMPTS.length);
    reset();
  };

  const toggle = (i: number) => setChecks((c) => c.map((v, idx) => (idx === i ? !v : v)));

  const score = checks.filter(Boolean).length;

  const elapsedSeconds = 120 - secondsLeft;
  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  const wpm = elapsedSeconds > 0 ? Math.round((wordCount / elapsedSeconds) * 60) : 0;
  const matchedKeywords = current.keywords.filter((k) => transcript.toLowerCase().includes(k.toLowerCase()));

  const timerColor =
    secondsLeft > 60 ? "text-emerald-400" : secondsLeft > 30 ? "text-amber-400" : "text-red-400";

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Speaking Coach"
        icon={Mic}
        subtitle="Draw a random Sprechen prompt, start the 2-minute timer, and speak your answer aloud. Then use the self-assessment checklist."
        badge="Sprechen"
        badgeVariant="violet"
        as="h2"
        iconColor="text-violet-400"
      />

      {/* Prompt card */}
      <GlassCard accent="violet" className="p-5">
        <p className="text-[10px] uppercase tracking-widest text-muted mb-1">{current.topic}</p>
        <p className="text-base font-semibold text-white mb-3">{current.prompt}</p>
        <div className="rounded-md bg-slate-800/60 px-3 py-2 text-xs text-slate-400 italic">
          💡 {current.tip}
        </div>
      </GlassCard>

      {/* Timer */}
      <GlassCard className="p-5 flex flex-col items-center gap-4">
        <div className={`font-mono text-5xl font-bold ${timerColor} tabular-nums`}>
          {pad(Math.floor(secondsLeft / 60))}:{pad(secondsLeft % 60)}
        </div>
        <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${(secondsLeft / 120) * 100}%`,
              background: secondsLeft > 60 ? "#2fbf71" : secondsLeft > 30 ? "#d4a017" : "#c62828",
            }}
          />
        </div>
        <div className="flex gap-2">
          {!finished && (
            <Button
              variant="outline"
              size="sm"
              icon={running ? Pause : Play}
              onClick={startOrResume}
            >
              {running ? "Pause" : secondsLeft === 120 ? "Start" : "Resume"}
            </Button>
          )}
          <Button variant="ghost" size="sm" icon={RefreshCw} onClick={reset}>Reset</Button>
          <Button variant="ghost" size="sm" icon={Timer} onClick={nextPrompt}>New prompt</Button>
        </div>
        {finished && (
          <p className="text-sm text-amber-300 font-medium">Time's up! Now complete the self-assessment below.</p>
        )}
        {!isSupported && (
          <p className="text-xs text-muted">
            Your browser doesn't support microphone-based signal — the timer and self-assessment below still work.
          </p>
        )}
      </GlassCard>

      {/* Automated signal — a proxy, not a replacement for self-assessment below */}
      {isSupported && micStarted && (
        <GlassCard className="p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Automated signal</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-border bg-bg-alt p-3 text-center">
              <div className="text-xl font-bold text-white">{wordCount > 0 ? wpm : "—"}</div>
              <div className="text-[11px] text-slate-500">words / min</div>
            </div>
            <div className="rounded-md border border-border bg-bg-alt p-3 text-center">
              <div className="text-xl font-bold text-white">{matchedKeywords.length}/{current.keywords.length}</div>
              <div className="text-[11px] text-slate-500">expected words used</div>
            </div>
          </div>
          {transcript && (
            <p className="mt-3 text-xs text-slate-500">
              Heard so far: <span className="italic text-slate-400">"{transcript}"</span>
            </p>
          )}
        </GlassCard>
      )}

      {/* Self-assessment */}
      <GlassCard className="p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Self-assessment</p>
        <div className="space-y-2">
          {CHECKLIST.map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <div
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                  checks[i]
                    ? "border-emerald-500 bg-emerald-500/20"
                    : "border-slate-600 group-hover:border-slate-500"
                }`}
                onClick={() => toggle(i)}
              >
                {checks[i] && <span className="text-[9px] text-emerald-400">✓</span>}
              </div>
              <span className={`text-sm ${checks[i] ? "text-emerald-300" : "text-slate-400"}`}>{item}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-sm">
            Score: <b className={score >= 5 ? "text-emerald-400" : score >= 3 ? "text-amber-400" : "text-red-400"}>{score}/{CHECKLIST.length}</b>
          </span>
          <Button variant="ghost" size="xs" icon={RefreshCw} onClick={() => setChecks(Array(CHECKLIST.length).fill(false))}>
            Clear
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
