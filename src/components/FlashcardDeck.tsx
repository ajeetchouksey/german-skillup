import { useState } from "react";
import { Check, Eye, RefreshCw, RotateCcw } from "lucide-react";
import type { VocabItem } from "@/types";
import { Button, GlassCard } from "./ui";
import { SpeakButton } from "./SpeakButton";
import { PronounceChecker } from "./PronounceChecker";

interface FlashcardDeckProps {
  vocab: VocabItem[];
  lessonId?: string;
  onComplete?: () => void;
}

export function FlashcardDeck({ vocab, onComplete }: FlashcardDeckProps) {
  const [deck, setDeck] = useState(() => vocab.map((v, i) => ({ ...v, index: i })));
  const [done, setDone] = useState<Set<number>>(new Set());
  const [flipped, setFlipped] = useState(false);
  const current = deck[0];

  const markKnow = () => {
    if (!current) return;
    const newDone = new Set(done).add(current.index);
    setDone(newDone);
    setFlipped(false);
    const remaining = deck.slice(1);
    setDeck(remaining);
    if (remaining.length === 0) onComplete?.();
  };

  const markReview = () => {
    if (!current) return;
    setFlipped(false);
    // Short delay so the card visually resets before moving to back
    setTimeout(() => setDeck((prev) => [...prev.slice(1), prev[0]]), 150);
  };

  const reset = () => {
    setDeck(vocab.map((v, i) => ({ ...v, index: i })));
    setDone(new Set());
    setFlipped(false);
  };

  const total = vocab.length;
  const mastered = done.size;
  const pct = Math.round((mastered / total) * 100);

  if (!current) {
    return (
      <GlassCard accent="gold" className="p-6 text-center">
        <div className="text-3xl mb-2">🎉</div>
        <p className="font-semibold text-white mb-1">All {total} cards mastered!</p>
        <p className="text-sm text-muted mb-4">Ready to move on to the quiz?</p>
        <Button variant="outline" size="sm" icon={RotateCcw} onClick={reset}>
          Review again
        </Button>
      </GlassCard>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-3 flex items-center justify-between text-xs text-muted">
        <span>{mastered}/{total} mastered</span>
        <span className="text-emerald-400 font-medium">{pct}%</span>
      </div>
      <div className="mb-4 h-1 rounded-full bg-border">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg,#c62828,#d4a017)" }}
        />
      </div>

      {/* Card */}
      <div
        className="flip-card w-full cursor-pointer select-none"
        style={{ height: "180px" }}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        aria-label={flipped ? "Card back — click to flip to front" : "Card front — click to reveal answer"}
      >
        <div className={`flip-card-inner w-full h-full`} style={{ transform: flipped ? "rotateY(180deg)" : "none" }}>
          {/* Front: German word */}
          <div className="flip-card-front w-full h-full">
            <GlassCard accent="violet" className="w-full h-full flex flex-col items-center justify-center p-6">
              <span className="text-[10px] uppercase tracking-widest text-muted mb-3">Deutsch</span>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl font-bold text-white text-center">{current.de}</span>
                <SpeakButton text={current.de} size="sm" />
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <PronounceChecker target={current.de} />
              </div>
              <span className="mt-3 text-xs text-muted flex items-center gap-1">
                <Eye size={10} /> tap card to reveal
              </span>
            </GlassCard>
          </div>

          {/* Back: English + example */}
          <div className="flip-card-back w-full h-full">
            <GlassCard accent="emerald" className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <span className="text-[10px] uppercase tracking-widest text-muted mb-2">English</span>
              <span className="text-xl font-bold text-emerald-300">{current.en}</span>
              {current.example && (
                <p className="mt-3 text-xs text-slate-400 italic max-w-xs">{current.example}</p>
              )}
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Actions — only show after flip */}
      {flipped && (
        <div className="mt-3 flex gap-2 justify-center">
          <Button variant="ghost" size="sm" icon={RefreshCw} onClick={markReview}>
            See again
          </Button>
          <Button variant="outline" size="sm" icon={Check} onClick={markKnow}>
            Know it
          </Button>
        </div>
      )}
      {!flipped && (
        <p className="mt-2 text-center text-xs text-muted">
          {deck.length - 1} more card{deck.length - 1 !== 1 ? "s" : ""} remaining
        </p>
      )}
    </div>
  );
}
