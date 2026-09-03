import type { CEFRLevel, ReadingPassage } from "@/types";
import { passagesA1 } from "./passages.a1";

// Registry mapping CEFR level -> reading passages for read-aloud practice.
// Mirrors src/data/levels.ts's pattern. Add "passages.a2.ts" (etc.) and
// register it here as content is authored — no other code changes required.
export const PASSAGES: Record<CEFRLevel, ReadingPassage[]> = {
  A1: passagesA1,
  A2: [],
  B1: [],
  B2: [],
  C1: [],
};
