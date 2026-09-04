import type { LevelContent, ProgressState, UserPersona, VocabItem } from "@/types";

export interface DayActivity {
  type: "vocab" | "grammar" | "task" | "quiz" | "mission" | "revision";
  label: string;
  minutes: number;
}

export interface DaySession {
  day: number;
  moduleId: string;
  lessonId: string;
  moduleTitle: string;
  lessonTitle: string;
  moduleIcon: string;
  topic: string;
  activities: DayActivity[];
  estimatedMinutes: number;
  isRevision: boolean;
}

const REVISION_ACTIVITIES: DayActivity[] = [
  { type: "revision", label: "Flashcard drill — previous lessons", minutes: 15 },
  { type: "revision", label: "Vocab typing challenge", minutes: 10 },
  { type: "revision", label: "Review common mistakes", minutes: 5 },
];

function lessonActivities(hasListening: boolean, hasReading: boolean, hasWriting: boolean, hasSpeaking: boolean): DayActivity[] {
  const acts: DayActivity[] = [
    { type: "vocab",    label: "Study vocabulary + flashcard drill", minutes: 12 },
    { type: "grammar",  label: "Grammar patterns review",            minutes: 8  },
  ];
  if (hasListening) acts.push({ type: "task", label: "Hören practice task",     minutes: 10 });
  if (hasReading)   acts.push({ type: "task", label: "Lesen practice task",      minutes: 10 });
  if (hasWriting)   acts.push({ type: "task", label: "Schreiben practice task",  minutes: 12 });
  if (hasSpeaking)  acts.push({ type: "task", label: "Sprechen practice task",   minutes: 8  });
  acts.push({ type: "quiz",    label: "Knowledge check quiz",        minutes: 8  });
  acts.push({ type: "mission", label: "Real-life mission",           minutes: 10 });
  return acts;
}

// ─── Persona-driven personalization ──────────────────────────────────────────
// Both maps are the single source of truth for these labels — reused by
// OnboardingQuiz's recap step and StudyPlanView's legibility strip, so the
// wording a learner picks in the quiz is exactly what they see on their plan.

export const GOAL_LABELS: Record<UserPersona["goal"], string> = {
  travel: "Travel & everyday life",
  work: "Work or study",
  personal: "Relationship or family",
  fun: "Just for fun",
};

export const TIME_BUDGET_LABELS: Record<UserPersona["timeBudget"], string> = {
  short: "10-15 min/day",
  medium: "20-30 min/day",
  long: "30-45 min/day",
};

// Daily minute cap a lesson's activities get split against — the upper bound of
// each TIME_BUDGET_LABELS range, so the plan never asks for more than was promised.
// Tight budgets get a longer, lighter plan instead of a compressed/rushed one.
const DAILY_CAP: Record<UserPersona["timeBudget"], number> = { short: 15, medium: 30, long: 45 };

// Goals centered on using German day-to-day benefit from meeting the real-life
// mission before the quiz, rather than after — exam-focused learners keep the
// original quiz-before-mission order regardless of goal.
function reorderForPersona(acts: DayActivity[], persona: UserPersona | undefined): DayActivity[] {
  if (!persona || persona.examFocused) return acts;
  if (persona.goal !== "travel" && persona.goal !== "personal" && persona.goal !== "fun") return acts;
  const mission = acts.filter((a) => a.type === "mission");
  if (mission.length === 0) return acts;
  const rest = acts.filter((a) => a.type !== "mission");
  const [vocabAndGrammar, remaining] = [rest.slice(0, 2), rest.slice(2)];
  return [...vocabAndGrammar, ...mission, ...remaining];
}

// Greedily fills each day up to `cap` minutes, never splitting a single activity.
function chunkByCap(acts: DayActivity[], cap: number): DayActivity[][] {
  const chunks: DayActivity[][] = [];
  let current: DayActivity[] = [];
  let currentMinutes = 0;
  for (const act of acts) {
    if (current.length > 0 && currentMinutes + act.minutes > cap) {
      chunks.push(current);
      current = [];
      currentMinutes = 0;
    }
    current.push(act);
    currentMinutes += act.minutes;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

// Personalization is additive: omitting `persona` reproduces today's exact
// output (one day per lesson, fixed activity order) for skipped-quiz users.
export function generatePlan(data: LevelContent, persona?: UserPersona): DaySession[] {
  const sessions: DaySession[] = [];
  const cap = persona ? DAILY_CAP[persona.timeBudget] : Infinity;
  let day = 1;
  let lessonCount = 0;

  for (const mod of data.modules) {
    for (const lesson of mod.lessons) {
      const acts = reorderForPersona(
        lessonActivities(!!lesson.listeningTask, !!lesson.readingTask, !!lesson.writingTask, !!lesson.speakingTask),
        persona,
      );
      const chunks = chunkByCap(acts, cap);

      chunks.forEach((chunkActs, idx) => {
        sessions.push({
          day,
          moduleId: mod.id,
          lessonId: lesson.id,
          moduleTitle: mod.title,
          lessonTitle: chunks.length > 1 ? `${lesson.title} · Part ${idx + 1}/${chunks.length}` : lesson.title,
          moduleIcon: mod.icon,
          topic: mod.syllabusTheme,
          activities: chunkActs,
          estimatedMinutes: chunkActs.reduce((s, a) => s + a.minutes, 0),
          isRevision: false,
        });
        day++;
      });
      lessonCount++;

      // Insert revision day after every 4 lessons
      if (lessonCount % 4 === 0) {
        sessions.push({
          day,
          moduleId: "",
          lessonId: "",
          moduleTitle: "Revision",
          lessonTitle: `Consolidate days ${day - 4}–${day - 1}`,
          moduleIcon: "🔁",
          topic: "Spaced repetition review",
          activities: REVISION_ACTIVITIES,
          estimatedMinutes: 30,
          isRevision: true,
        });
        day++;
      }
    }
  }
  return sessions;
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

const PLAN_DONE_KEY = "german_plan_done_v1";
const PLAN_START_KEY = "german_plan_start_v1";

export function loadDoneDays(): Set<number> {
  try {
    const raw = localStorage.getItem(PLAN_DONE_KEY);
    return raw ? new Set<number>(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

export function saveDoneDays(done: Set<number>): void {
  localStorage.setItem(PLAN_DONE_KEY, JSON.stringify([...done]));
}

export function toggleDayDone(day: number, done: Set<number>): Set<number> {
  const next = new Set(done);
  next.has(day) ? next.delete(day) : next.add(day);
  return next;
}

export function loadStartDate(): string {
  return localStorage.getItem(PLAN_START_KEY) ?? new Date().toISOString().slice(0, 10);
}

export function saveStartDate(date: string): void {
  localStorage.setItem(PLAN_START_KEY, date);
}

export function nextIncompleteDay(sessions: DaySession[], done: Set<number>): DaySession | null {
  return sessions.find((s) => !done.has(s.day)) ?? null;
}

// ─── Vocab aggregation ────────────────────────────────────────────────────────

export interface AggregatedVocab extends VocabItem {
  moduleId: string;
  moduleTitle: string;
  moduleIcon: string;
  lessonId: string;
}

export function aggregateVocab(data: LevelContent): AggregatedVocab[] {
  const result: AggregatedVocab[] = [];
  for (const mod of data.modules) {
    for (const lesson of mod.lessons) {
      for (const v of lesson.vocab) {
        result.push({ ...v, moduleId: mod.id, moduleTitle: mod.title, moduleIcon: mod.icon, lessonId: lesson.id });
      }
    }
  }
  return result;
}

const VOCAB_KNOWN_KEY = "german_vocab_known_v1";

export function loadKnownVocab(): Set<string> {
  try {
    const raw = localStorage.getItem(VOCAB_KNOWN_KEY);
    return raw ? new Set<string>(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

export function saveKnownVocab(known: Set<string>): void {
  localStorage.setItem(VOCAB_KNOWN_KEY, JSON.stringify([...known]));
}

export function vocabKey(v: Pick<VocabItem, "de">): string {
  return v.de.toLowerCase().trim();
}

// ─── Readiness per module ─────────────────────────────────────────────────────

export interface ModuleReadiness {
  moduleId: string;
  moduleTitle: string;
  moduleIcon: string;
  pct: number;         // quiz score %
  vocabKnownPct: number;
  lessonsComplete: number;
  totalLessons: number;
}

export function computeReadiness(
  data: LevelContent,
  progress: ProgressState,
  knownVocab: Set<string>,
): ModuleReadiness[] {
  return data.modules.map((mod) => {
    const lessonsComplete = mod.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
    const quizScores = mod.lessons
      .map((l) => progress.quizScores[l.id])
      .filter(Boolean);
    const avgPct = quizScores.length > 0
      ? Math.round(quizScores.reduce((s, q) => s + q.pct, 0) / quizScores.length)
      : 0;
    const totalVocab = mod.lessons.reduce((s, l) => s + l.vocab.length, 0);
    const knownCount = mod.lessons
      .flatMap((l) => l.vocab)
      .filter((v) => knownVocab.has(vocabKey(v))).length;
    return {
      moduleId: mod.id,
      moduleTitle: mod.title,
      moduleIcon: mod.icon,
      pct: avgPct,
      vocabKnownPct: totalVocab > 0 ? Math.round((knownCount / totalVocab) * 100) : 0,
      lessonsComplete,
      totalLessons: mod.lessons.length,
    };
  });
}
