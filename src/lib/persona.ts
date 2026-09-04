import type { CEFRLevel, UserPersona } from "@/types";

const PERSONA_KEY = "deutsch_skillup_persona_v1";
const LEVEL_KEY = "deutsch_skillup_level_v1";

// null = no decision yet (first-run gate in App.tsx shows the onboarding quiz).
export function loadPersona(): UserPersona | null {
  const raw = localStorage.getItem(PERSONA_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserPersona;
  } catch {
    return null;
  }
}

export function savePersona(persona: UserPersona): void {
  localStorage.setItem(PERSONA_KEY, JSON.stringify(persona));
}

export function resetPersona(): void {
  localStorage.removeItem(PERSONA_KEY);
}

// Recorded when the quiz is skipped — preserves today's exact (unpersonalized) behavior.
export function skippedPersona(startLevel: CEFRLevel): UserPersona {
  return {
    experience: "none",
    goal: "travel",
    timeBudget: "medium",
    examFocused: false,
    startLevel,
    completedAt: null,
    skipped: true,
  };
}

export function levelForExperience(experience: UserPersona["experience"]): CEFRLevel {
  return experience === "conversational" ? "A2" : "A1";
}

// Current CEFR level, persisted independently of persona (a learner's level moves
// on as they progress — it isn't the one-time "starting point" the quiz inferred).
export function loadLevel(): CEFRLevel | null {
  return (localStorage.getItem(LEVEL_KEY) as CEFRLevel | null) || null;
}

export function saveLevel(level: CEFRLevel): void {
  localStorage.setItem(LEVEL_KEY, level);
}
