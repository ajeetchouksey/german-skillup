import { useCallback, useRef, useState } from "react";

export type RecognitionResult = {
  heard: string;
  result: "perfect" | "close" | "miss";
  score: number; // 0–100
};

// Strip articles + punctuation, lowercase — for comparison
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/^(der|die|das|ein|eine|einen|einem|einer|kein|keine)\s/i, "")
    .replace(/[.,!?;:()"']/g, "")
    .trim();
}

// Word-overlap similarity ratio 0–1
function similarity(a: string, b: string): number {
  const wa = normalize(a).split(/\s+/);
  const wb = normalize(b).split(/\s+/);
  const set = new Set([...wa, ...wb]);
  const shared = [...set].filter((w) => wa.includes(w) && wb.includes(w)).length;
  return shared / Math.max(wa.length, wb.length);
}

export function checkPronunciation(target: string, heard: string): RecognitionResult {
  const t = normalize(target);
  const h = normalize(heard);
  const score = Math.round(similarity(t, h) * 100);

  let result: RecognitionResult["result"];
  if (t === h || score >= 90) result = "perfect";
  else if (score >= 50 || h.includes(t) || t.includes(h)) result = "close";
  else result = "miss";

  return { heard, result, score };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export interface SpeechRecognitionState {
  listening: boolean;
  result: RecognitionResult | null;
  error: string | null;
  isSupported: boolean;
  listen: (target: string) => void;
  stop: () => void;
  clear: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export function useSpeechRecognition(): SpeechRecognitionState {
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recogRef = useRef<SpeechRecognition | null>(null);

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const listen = useCallback((target: string) => {
    if (!isSupported) { setError("Speech recognition is not supported in this browser."); return; }
    setResult(null);
    setError(null);

    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const recog = new SR();
    recog.lang = "de-DE";
    recog.interimResults = false;
    recog.maxAlternatives = 5;

    recog.onstart  = () => setListening(true);
    recog.onend    = () => setListening(false);
    recog.onerror  = (e) => {
      setListening(false);
      if (e.error !== "no-speech") setError(`Mic error: ${e.error}`);
    };
    recog.onresult = (e) => {
      // Pick the best alternative (highest confidence)
      let best = e.results[0][0].transcript;
      let bestConf = e.results[0][0].confidence;
      for (let i = 1; i < e.results[0].length; i++) {
        if (e.results[0][i].confidence > bestConf) {
          best = e.results[0][i].transcript;
          bestConf = e.results[0][i].confidence;
        }
      }
      setResult(checkPronunciation(target, best));
      setListening(false);
    };

    recogRef.current = recog;
    recog.start();
  }, [isSupported]);

  const stop  = useCallback(() => { recogRef.current?.stop(); setListening(false); }, []);
  const clear = useCallback(() => { setResult(null); setError(null); }, []);

  return { listening, result, error, isSupported, listen, stop, clear };
}
