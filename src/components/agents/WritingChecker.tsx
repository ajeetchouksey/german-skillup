import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Flag, Info, Loader2, RotateCcw, Sparkles, Wand2 } from "lucide-react";
import { Badge, Button, GlassCard, SectionHeader } from "@/components/ui";
import { AiFeedbackText } from "@/components/AiFeedbackText";
import { WritingPad } from "@/components/WritingPad";
import { useAuth } from "@/lib/auth";
import { aiErrorMessage, getAiQuota, type FeatureQuota } from "@/lib/aiFeedback";
import { checkWritingWithAI, reportWritingFeedback, type WritingCheckResult } from "@/lib/writingCheck";

export interface Feedback {
  type: "ok" | "warn" | "info";
  message: string;
}

// ─── Rule-based A1 German writing checker ────────────────────────────────────

const WRONG_MODAL = [
  { pattern: /\bich will\b/gi, fix: "ich möchte", note: "'ich will' sounds blunt; use 'ich möchte' in polite A1 contexts" },
  { pattern: /\bdu bist\s+\d+\b/gi, fix: "du bist … Jahre alt", note: "Age needs 'Jahre alt': 'Ich bin 25 Jahre alt.'" },
  { pattern: /\bich bin gehen\b/gi, fix: "ich gehe", note: "Don't combine 'bin' with an infinitive here — just conjugate: 'ich gehe', not 'ich bin gehen'." },
  { pattern: /\bviele[nm]?\s+dank\b/gi, fix: "vielen Dank", note: "The fixed phrase is 'vielen Dank' (accusative), not 'viele Dank'." },
];

const SEPARABLE_VERBS = [
  "aufstehen", "aufwachen", "einkaufen", "anrufen", "anfangen", "aufhören", "fernsehen",
  "mitkommen", "ausgehen", "zurückkommen", "vorbereiten", "teilnehmen", "abholen",
];

export function analyze(text: string): Feedback[] {
  const feedback: Feedback[] = [];
  if (!text.trim()) return feedback;

  const words = text.trim().split(/\s+/);
  const sentences = text.trim().split(/[.!?]+/).filter(Boolean);
  const wordCount = words.length;

  // Word count
  if (wordCount < 20)
    feedback.push({ type: "warn", message: `Only ${wordCount} words — Schreiben Teil 2 requires ~30 words.` });
  else if (wordCount >= 30 && wordCount <= 45)
    feedback.push({ type: "ok", message: `Good length: ${wordCount} words (target 30–40 ✓)` });
  else if (wordCount > 45)
    feedback.push({ type: "info", message: `${wordCount} words — slightly over the 40-word recommendation. Try to be concise.` });
  else
    feedback.push({ type: "info", message: `${wordCount} words — close to target. Aim for 30–40.` });

  // Sentence count
  if (sentences.length < 3)
    feedback.push({ type: "warn", message: `Only ${sentences.length} sentence(s). Use at least 3–5 complete sentences.` });
  else
    feedback.push({ type: "ok", message: `${sentences.length} sentences — good variety ✓` });

  // Capitalized nouns (German capitalizes ALL nouns)
  const midWordCapitals = text.match(/\s[A-ZÄÖÜ][a-zäöüß]+/g) ?? [];
  if (midWordCapitals.length === 0 && wordCount > 5)
    feedback.push({ type: "warn", message: "No capitalized nouns found. In German, ALL nouns must be capitalized." });
  else if (midWordCapitals.length > 0)
    feedback.push({ type: "ok", message: `Nouns capitalized: ${[...new Set(midWordCapitals.map((w) => w.trim()))].slice(0, 5).join(", ")} ✓` });

  // Common modal errors
  for (const rule of WRONG_MODAL) {
    if (rule.pattern.test(text)) {
      feedback.push({ type: "warn", message: rule.note });
    }
  }

  // Separable verbs: check if prefix appears sentence-finally
  const lowerText = text.toLowerCase();
  for (const verb of SEPARABLE_VERBS) {
    if (lowerText.includes(verb)) {
      feedback.push({ type: "info", message: `Detected '${verb}' — remember: prefix goes to sentence end. E.g. 'Ich stehe um 7 Uhr auf.'` });
    }
  }

  // Verb-second: if sentence starts with a time/adverb, check verb follows next
  const v2Pattern = /^(Morgen|Heute|Dann|Danach|Zuerst|Um \d+|Jetzt|Leider|Leider)\s+[A-ZÄÖÜ]?\w+\s+\w+/m;
  if (v2Pattern.test(text)) {
    const adverbStart = sentences.find((s) =>
      /^(Morgen|Heute|Dann|Danach|Zuerst|Jetzt|Leider)\s/i.test(s.trim())
    );
    if (adverbStart) {
      feedback.push({ type: "info", message: "Sentence starts with adverb/time — make sure the verb is in position 2: 'Heute gehe ich …'" });
    }
  }

  // Greeting / closing check for messages
  const hasGreeting = /\b(Hallo|Liebe[rs]?|Sehr geehrte[rs]?)\b/i.test(text);
  const hasClose = /\b(Viele Grüße|Mit freundlichen|Tschüss|Bis bald|LG|Auf Wiedersehen)\b/i.test(text);
  if (!hasGreeting && !hasClose && wordCount > 20)
    feedback.push({ type: "info", message: "For a message/email, add a greeting (Hallo Jana,) and sign-off (Viele Grüße)." });
  else if (hasGreeting && hasClose)
    feedback.push({ type: "ok", message: "Greeting and sign-off present ✓" });

  return feedback;
}

export function WritingChecker() {
  const { token } = useAuth();
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<Feedback[] | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<Extract<WritingCheckResult, { ok: false }>["reason"] | undefined>();
  const [reported, setReported] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [quota, setQuota] = useState<FeatureQuota | null>(null);

  useEffect(() => {
    getAiQuota(token).then((q) => setQuota(q?.writing ?? null));
  }, [token]);

  const run = () => setFeedback(analyze(text));
  const clear = () => {
    setText("");
    setFeedback(null);
    setAiFeedback(null);
    setAiError(undefined);
    setReported(false);
  };

  const getAiFeedback = async () => {
    setAiLoading(true);
    setAiError(undefined);
    setAiFeedback(null);
    setReported(false);
    const result = await checkWritingWithAI(text, token);
    setAiLoading(false);
    if (result.ok) {
      setAiFeedback(result.feedback);
      setQuota((q) => (q ? { ...q, used: q.used + 1, remaining: Math.max(0, q.remaining - 1) } : q));
    } else {
      setAiError(result.reason);
      if (result.reason === "daily_limit_reached") setQuota((q) => (q ? { ...q, used: q.limit, remaining: 0 } : q));
    }
  };

  const report = async () => {
    if (!aiFeedback || reporting) return;
    setReporting(true);
    const ok = await reportWritingFeedback(text, aiFeedback, token);
    setReporting(false);
    if (ok) setReported(true);
  };

  const iconFor = (type: Feedback["type"]) =>
    type === "ok" ? <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
    : type === "warn" ? <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
    : <Info size={13} className="text-blue-400 shrink-0 mt-0.5" />;

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Writing Checker"
        icon={Wand2}
        subtitle="Paste or write your German text. The checker flags common A1 mistakes — word count, noun capitalisation, verb position, modal register."
        badge="A1"
        badgeVariant="gold"
        as="h2"
      />

      <GlassCard className="p-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setFeedback(null);
            setAiFeedback(null);
            setAiError(undefined);
            setReported(false);
          }}
          placeholder="Schreiben Sie hier Ihren deutschen Text…"
          rows={7}
          className="w-full resize-y rounded-lg border border-border bg-bg-alt px-3.5 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-yellow-500/40 transition-colors"
        />
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-xs text-muted">{text.trim().split(/\s+/).filter(Boolean).length} words</span>
          <div className="flex items-center gap-2">
            {quota && (
              <Badge
                label={`${quota.remaining}/${quota.limit} AI checks left today`}
                variant={quota.remaining === 0 ? "red" : "slate"}
              />
            )}
            <Button variant="ghost" size="sm" icon={RotateCcw} onClick={clear} disabled={!text}>Clear</Button>
            <Button variant="outline" size="sm" icon={Wand2} onClick={run} disabled={!text.trim()}>Analyse</Button>
            <Button
              variant="outline"
              size="sm"
              icon={aiLoading ? Loader2 : Sparkles}
              onClick={getAiFeedback}
              disabled={!text.trim() || aiLoading || quota?.remaining === 0}
            >
              {aiLoading ? "Thinking…" : "Get AI Feedback"}
            </Button>
          </div>
        </div>
      </GlassCard>

      {feedback && (
        <GlassCard className="p-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Feedback</p>
          {feedback.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              {iconFor(f.type)}
              <span className={f.type === "ok" ? "text-emerald-300" : f.type === "warn" ? "text-amber-300" : "text-slate-300"}>
                {f.message}
              </span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-border flex gap-2">
            <Badge
              label={`${feedback.filter((f) => f.type === "ok").length} OK`}
              variant="green"
            />
            <Badge
              label={`${feedback.filter((f) => f.type === "warn").length} warnings`}
              variant="amber"
            />
          </div>
        </GlassCard>
      )}

      {aiError && (
        <GlassCard className="p-4">
          <div className="flex items-start gap-2 text-sm text-amber-300">
            <AlertTriangle size={13} className="shrink-0 mt-0.5" />
            <span>{aiErrorMessage(aiError)}</span>
          </div>
        </GlassCard>
      )}

      {aiFeedback && (
        <GlassCard accent="violet" className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-lilac shrink-0" />
            <p className="text-xs font-bold uppercase tracking-widest text-lilac">AI Feedback</p>
          </div>
          <AiFeedbackText text={aiFeedback} />
          <div className="pt-2 border-t border-border">
            {reported ? (
              <span className="text-xs text-muted">Thanks — this has been flagged for review.</span>
            ) : (
              <button
                onClick={report}
                disabled={reporting}
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-amber-300 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                <Flag size={12} />
                {reporting ? "Reporting…" : "Report this feedback"}
              </button>
            )}
          </div>
        </GlassCard>
      )}

      <GlassCard accent="gold" className="p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">Practice pad</p>
        <WritingPad
          placeholder="Write a fresh Schreiben Teil 2 message here (30–40 words)…"
          targetWords={30}
          label="Practice message"
        />
      </GlassCard>
    </div>
  );
}
