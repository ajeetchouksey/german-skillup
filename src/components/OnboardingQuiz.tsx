import { useState } from "react";
import type { ElementType } from "react";
import {
  ArrowLeft, ArrowRight, Award, Briefcase, Check, GraduationCap,
  Heart, MapPin, PartyPopper, Sparkles, Wand2,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type { UserPersona } from "@/types";
import { levelForExperience } from "@/lib/persona";
import { GOAL_LABELS, TIME_BUDGET_LABELS } from "@/lib/studyPlan";

interface OnboardingQuizProps {
  onComplete: (persona: UserPersona) => void;
  onSkip: () => void;
}

type Experience = UserPersona["experience"];
type Goal = UserPersona["goal"];
type TimeBudget = UserPersona["timeBudget"];

interface Answers {
  experience: Experience | null;
  goal: Goal | null;
  timeBudget: TimeBudget | null;
  examFocused: boolean | null;
}

const TOTAL_STEPS = 4;

const EXPERIENCE_OPTIONS: { value: Experience; icon: ElementType; label: string; hint: string }[] = [
  { value: "none", icon: Sparkles, label: "Never learned German", hint: "Starting from zero — everyone starts here." },
  { value: "some", icon: GraduationCap, label: "A little before", hint: "School, an app, or a trip — you've seen some of it." },
  { value: "conversational", icon: Award, label: "I can hold a basic conversation", hint: "You'll start a step ahead, at A2." },
];

const GOAL_OPTIONS: { value: Goal; icon: ElementType }[] = [
  { value: "travel", icon: MapPin },
  { value: "work", icon: Briefcase },
  { value: "personal", icon: Heart },
  { value: "fun", icon: PartyPopper },
];

const TIME_OPTIONS: { value: TimeBudget; hint: string }[] = [
  { value: "short", hint: "Short, steady sessions" },
  { value: "medium", hint: "A solid daily habit" },
  { value: "long", hint: "Fast progress" },
];

function OptionButton({
  icon: Icon, label, hint, selected, onClick,
}: { icon?: ElementType; label: string; hint?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass-card flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-lilac/60 shadow-[0_0_24px_-8px_rgba(169,155,255,0.35)]"
          : "border-slate-700/40 hover:border-slate-600"
      }`}
    >
      {Icon && <Icon size={18} className={`shrink-0 ${selected ? "text-lilac" : "text-slate-500"}`} />}
      <span className="min-w-0 flex-1">
        <span className={`block text-sm font-semibold ${selected ? "text-white" : "text-slate-200"}`}>{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-muted">{hint}</span>}
      </span>
      {selected && <Check size={16} className="shrink-0 text-lilac" />}
    </button>
  );
}

export function OnboardingQuiz({ onComplete, onSkip }: OnboardingQuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({ experience: null, goal: null, timeBudget: null, examFocused: null });

  const isQuestionStep = step <= TOTAL_STEPS;
  const canContinue =
    step === 1 ? answers.experience !== null :
    step === 2 ? answers.goal !== null :
    step === 3 ? answers.timeBudget !== null :
    step === 4 ? answers.examFocused !== null :
    true;

  const buildPersona = (): UserPersona => ({
    experience: answers.experience!,
    goal: answers.goal!,
    timeBudget: answers.timeBudget!,
    examFocused: !!answers.examFocused,
    startLevel: levelForExperience(answers.experience!),
    completedAt: new Date().toISOString(),
    skipped: false,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-[560px]">
        <div className="mb-5 flex justify-center">
          <img src="/logo-horizontal-dark.svg" alt="AaryaAI" style={{ height: 26, width: "auto" }} />
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {isQuestionStep ? (
            <>
              <p className="section-label mb-1">Step {step} of {TOTAL_STEPS}</p>
              <div className="mb-5 h-[2px] w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%`, background: "linear-gradient(90deg,#5b4bd6,#a99bff,#c9c0ff)" }}
                />
              </div>
            </>
          ) : (
            <p className="page-eyebrow">AaryaAI · Your plan is ready</p>
          )}

          {step === 1 && (
            <>
              <h1 className="heading-gradient text-xl font-bold sm:text-2xl">Have you learned German before?</h1>
              <div className="mt-5 space-y-2.5">
                {EXPERIENCE_OPTIONS.map((o) => (
                  <OptionButton
                    key={o.value}
                    icon={o.icon}
                    label={o.label}
                    hint={o.hint}
                    selected={answers.experience === o.value}
                    onClick={() => setAnswers((a) => ({ ...a, experience: o.value }))}
                  />
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="heading-gradient text-xl font-bold sm:text-2xl">What's this mainly for?</h1>
              <div className="mt-5 space-y-2.5">
                {GOAL_OPTIONS.map((o) => (
                  <OptionButton
                    key={o.value}
                    icon={o.icon}
                    label={GOAL_LABELS[o.value]}
                    selected={answers.goal === o.value}
                    onClick={() => setAnswers((a) => ({ ...a, goal: o.value }))}
                  />
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="heading-gradient text-xl font-bold sm:text-2xl">How much time can you give most days?</h1>
              <div className="mt-5 space-y-2.5">
                {TIME_OPTIONS.map((o) => (
                  <OptionButton
                    key={o.value}
                    label={TIME_BUDGET_LABELS[o.value]}
                    hint={o.hint}
                    selected={answers.timeBudget === o.value}
                    onClick={() => setAnswers((a) => ({ ...a, timeBudget: o.value }))}
                  />
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className="heading-gradient text-xl font-bold sm:text-2xl">Working toward a specific exam?</h1>
              <div className="mt-5 space-y-2.5">
                <OptionButton
                  icon={Sparkles}
                  label="No, just fluency"
                  selected={answers.examFocused === false}
                  onClick={() => setAnswers((a) => ({ ...a, examFocused: false }))}
                />
                <OptionButton
                  icon={Award}
                  label="Yes, Goethe / telc / ÖSD soon"
                  selected={answers.examFocused === true}
                  onClick={() => setAnswers((a) => ({ ...a, examFocused: true }))}
                />
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h1 className="heading-gradient text-xl font-bold sm:text-2xl">Here's your starting point.</h1>
              <p className="mt-2 text-sm text-muted">You can change any of this later from the sidebar.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge label={`Starting at ${levelForExperience(answers.experience!)}`} variant="violet" />
                <Badge label={GOAL_LABELS[answers.goal!]} variant="blue" />
                <Badge label={TIME_BUDGET_LABELS[answers.timeBudget!]} variant="emerald" />
                {answers.examFocused && <Badge label="Exam-focused" variant="amber" />}
              </div>
            </>
          )}

          <div className="mt-7 flex items-center justify-between gap-3">
            {step > 1 && isQuestionStep ? (
              <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => setStep((s) => s - 1)}>Back</Button>
            ) : <span />}
            {isQuestionStep ? (
              <Button variant="primary" size="md" iconRight={ArrowRight} disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
                Continue
              </Button>
            ) : (
              <Button variant="primary" size="md" icon={Wand2} iconRight={ArrowRight} onClick={() => onComplete(buildPersona())}>
                Build my plan
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-muted transition-colors hover:text-slate-300 hover:underline underline-offset-2"
          >
            Skip — I'll explore on my own
          </button>
        </div>
      </div>
    </div>
  );
}
