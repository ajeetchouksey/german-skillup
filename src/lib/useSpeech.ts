import { useCallback, useEffect, useRef, useState } from "react";

const RATE = 0.82; // slightly slower — better for learners

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Voices load async — force a reload so de-DE voice is available
  useEffect(() => {
    window.speechSynthesis?.getVoices();
    const handler = () => window.speechSynthesis?.getVoices();
    window.speechSynthesis?.addEventListener("voiceschanged", handler);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", handler);
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "de-DE";
    utter.rate = RATE;

    // Prefer a native German voice if available
    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find((v) => v.lang === "de-DE") ?? voices.find((v) => v.lang.startsWith("de"));
    if (deVoice) utter.voice = deVoice;

    utter.onstart  = () => setSpeaking(true);
    utter.onend    = () => setSpeaking(false);
    utter.onerror  = () => setSpeaking(false);

    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking };
}
