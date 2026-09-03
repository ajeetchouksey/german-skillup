import type { CEFRLevel, ExamBlueprint } from "@/types";
import { examBlueprintA1 } from "./examBlueprint.a1";

// Registry mapping CEFR level -> exam blueprint. Add "examBlueprint.a2.ts"
// (etc.) and register it here as content is authored — mirrors the
// src/data/levels.ts pattern. No other code changes are required; consumers
// index this map by the level currently in view.
export const EXAM_BLUEPRINTS: Record<CEFRLevel, ExamBlueprint | null> = {
 A1: examBlueprintA1,
 A2: null,
 B1: null,
 B2: null,
 C1: null,
};
