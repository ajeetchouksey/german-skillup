import type { CEFRLevel, LevelContent } from "@/types";
import { lessonsA1 } from "./lessons.a1";
import { lessonsA2 } from "./lessons.a2";

// Registry of available levels. Add "a2", "b1"... here as content is authored —
// no other code changes are required to add a new level to the app.
export const LEVELS: Record<CEFRLevel, LevelContent | null> = {
  A1: lessonsA1,
  A2: lessonsA2,
  B1: null,
  B2: null,
  C1: null,
};

export const AVAILABLE_LEVELS: CEFRLevel[] = (Object.keys(LEVELS) as CEFRLevel[]).filter(
  (lvl) => LEVELS[lvl] !== null
);

export const ALL_LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1"];
