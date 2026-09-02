import { useEffect } from "react";
import { Mic, MicOff, X } from "lucide-react";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";

const FEEDBACK = {
  perfect: { emoji: "🎉", label: "Perfekt!", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-300" },
  close:   { emoji: "🟡", label: "Close!",   color: "text-amber-700",  bg: "bg-amber-50  border-amber-300"  },
  miss:    { emoji: "❌", label: "Try again", color: "text-red-600",    bg: "bg-red-50    border-red-300"    },
} as const;

interface PronounceCheckerProps {
  target: string;       // German word/phrase to check against
  autoHide?: boolean;   // clear result after 5s (default true)
}

export function PronounceChecker({ target, autoHide = true }: PronounceCheckerProps) {
  const { listening, result, error, isSupported, listen, stop, clear } = useSpeechRecognition();

  // Auto-clear result after 5s
  useEffect(() => {
    if (!result || !autoHide) return;
    const t = setTimeout(clear, 5000);
    return () => clearTimeout(t);
  }, [result, autoHide, clear]);

  if (!isSupported) return null;

  const fb = result ? FEEDBACK[result.result] : null;

  return (
    <div className="inline-flex flex-col gap-1">
      {/* Mic button */}
      <button
        onClick={() => listening ? stop() : listen(target)}
        title={listening ? "Stop listening" : `Say it: "${target}"`}
        aria-label={listening ? "Stop recording" : `Check pronunciation of: ${target}`}
        className={`inline-flex items-center justify-center w-7 h-7 rounded-full border transition-all shrink-0 ${
          listening
            ? "border-red-400/60 bg-red-400/10 text-red-400 animate-pulse"
            : "border-slate-700/50 bg-bg-alt text-slate-500 hover:border-red-400/40 hover:text-red-400 hover:bg-red-400/8"
        }`}
      >
        {listening ? <MicOff size={13} /> : <Mic size={13} />}
      </button>

      {/* Listening indicator */}
      {listening && (
        <div className="flex items-center gap-1 text-[10px] text-red-400 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          Listening…
        </div>
      )}

      {/* Result card */}
      {result && fb && (
        <div className={`relative rounded-lg border p-2 text-xs ${fb.bg} min-w-[160px] max-w-[260px]`}>
          <button onClick={clear} className="absolute top-1 right-1 text-slate-400 hover:text-slate-600">
            <X size={10} />
          </button>
          <div className={`font-bold mb-0.5 ${fb.color}`}>{fb.emoji} {fb.label}</div>
          <div className="text-slate-600">
            You said: <span className="italic">"{result.heard}"</span>
          </div>
          <div className="text-slate-500 mt-0.5">
            Target: <span className="font-medium text-slate-700">{target}</span>
          </div>
          {/* Score bar */}
          <div className="mt-1.5 h-1 rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                result.result === "perfect" ? "bg-emerald-500" :
                result.result === "close"   ? "bg-amber-400"  : "bg-red-400"
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>
          <div className={`text-right text-[9px] mt-0.5 ${fb.color}`}>{result.score}% match</div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-[10px] text-red-400 max-w-[200px]">{error}</p>
      )}
    </div>
  );
}
