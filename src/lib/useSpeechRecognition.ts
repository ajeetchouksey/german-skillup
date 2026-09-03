import { useCallback, useEffect, useRef, useState } from "react";

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
  activeSentenceIndex: number | null;
  listen: (target: string) => void;
  listenContinuous: (sentences: string[], onSentenceResult: (index: number, result: RecognitionResult) => void, onDone?: () => void) => void;
  listenFreeform: (onUpdate: (fullTranscript: string) => void) => void;
  stop: () => void;
  clear: () => void;
}

export function useSpeechRecognition(): SpeechRecognitionState {
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);
  const recogRef = useRef<SpeechRecognition | null>(null);

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  // listenContinuous/listenFreeform run indefinitely by design — a consumer
  // that unmounts (e.g. switching Practice Lab tabs) without calling stop()
  // would otherwise leave the mic listening. Stop unconditionally on unmount,
  // regardless of which mode (or none) was active.
  useEffect(() => {
    return () => { recogRef.current?.stop(); };
  }, []);

  // One-shot: score a single short phrase against a target. Used by PronounceChecker.
  const listen = useCallback((target: string) => {
    if (!isSupported) { setError("Speech recognition is not supported in this browser."); return; }
    setResult(null);
    setError(null);
    setActiveSentenceIndex(null);

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

  // Continuous: read a passage sentence-by-sentence. Each finalized utterance
  // is scored against the current sentence in order (reuses checkPronunciation,
  // no new scoring algorithm), then advances to the next sentence.
  const listenContinuous = useCallback((
    sentences: string[],
    onSentenceResult: (index: number, result: RecognitionResult) => void,
    onDone?: () => void,
  ) => {
    if (!isSupported) { setError("Speech recognition is not supported in this browser."); return; }
    if (sentences.length === 0) return;
    setResult(null);
    setError(null);

    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const recog = new SR();
    recog.lang = "de-DE";
    recog.continuous = true;
    recog.interimResults = true;
    recog.maxAlternatives = 1;

    let sentenceIdx = 0;
    setActiveSentenceIndex(0);

    recog.onstart = () => setListening(true);
    recog.onend   = () => setListening(false);
    recog.onerror = (e) => {
      setListening(false);
      if (e.error !== "no-speech") setError(`Mic error: ${e.error}`);
    };
    recog.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (!res.isFinal || sentenceIdx >= sentences.length) continue;
        const heard = res[0].transcript;
        const scored = checkPronunciation(sentences[sentenceIdx], heard);
        onSentenceResult(sentenceIdx, scored);
        sentenceIdx += 1;
        if (sentenceIdx >= sentences.length) {
          setActiveSentenceIndex(null);
          recog.stop();
          onDone?.();
        } else {
          setActiveSentenceIndex(sentenceIdx);
        }
      }
    };

    recogRef.current = recog;
    recog.start();
  }, [isSupported]);

  // Continuous, no fixed target — accumulates finalized transcript chunks and
  // reports the running total. Used for open-ended free-response speaking
  // (no single "correct" answer to score against, unlike listen/listenContinuous).
  const listenFreeform = useCallback((onUpdate: (fullTranscript: string) => void) => {
    if (!isSupported) { setError("Speech recognition is not supported in this browser."); return; }
    setError(null);

    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const recog = new SR();
    recog.lang = "de-DE";
    recog.continuous = true;
    recog.interimResults = true;
    recog.maxAlternatives = 1;

    let transcript = "";

    recog.onstart = () => setListening(true);
    recog.onend   = () => setListening(false);
    recog.onerror = (e) => {
      setListening(false);
      if (e.error !== "no-speech") setError(`Mic error: ${e.error}`);
    };
    recog.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (!res.isFinal) continue;
        transcript = `${transcript} ${res[0].transcript}`.trim();
        onUpdate(transcript);
      }
    };

    recogRef.current = recog;
    recog.start();
  }, [isSupported]);

  const stop  = useCallback(() => { recogRef.current?.stop(); setListening(false); setActiveSentenceIndex(null); }, []);
  const clear = useCallback(() => { setResult(null); setError(null); }, []);

  return { listening, result, error, isSupported, activeSentenceIndex, listen, listenContinuous, listenFreeform, stop, clear };
}
