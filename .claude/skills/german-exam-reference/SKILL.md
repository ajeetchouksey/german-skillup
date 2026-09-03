---
name: german-exam-reference
description: CEFR level to real German-certificate exam mapping (Goethe-Institut, telc, ÖSD), where to source each level's official exam structure/vocabulary, and the ExamBlueprint shape to hand to lesson-writer. Read by curriculum-lead when starting a level whose EXAM_BLUEPRINTS entry doesn't exist yet.
---

# German exam reference

Each CEFR level maps to a *different* real exam, and more than one provider certifies German at most levels — don't assume structure, section names, or pass marks are shared across levels or providers. Before authoring content for a level, confirm its `src/data/examBlueprint.<level>.ts` exists and is registered in `EXAM_BLUEPRINTS` (`src/data/examBlueprint.ts`); if not, research it first using this reference.

## Primary provider: Goethe-Institut (the flagship blueprint per level)

`EXAM_BLUEPRINTS[level]`'s primary `ExamBlueprint` targets Goethe-Institut, since it's the most widely recognized German-certificate provider and the one this content pipeline was originally built around — full section/task/pass-mark data is authored for Goethe per level.

| CEFR level | Goethe exam | Notes |
|---|---|---|
| A1 | Goethe-Zertifikat A1: Start Deutsch 1 | Already in `examBlueprint.a1.ts` — use as the template shape. |
| A2 | Goethe-Zertifikat A2 (also called Start Deutsch 2) | Not yet authored. |
| B1 | Goethe-Zertifikat B1 (Zertifikat Deutsch) | Not yet authored. Can be taken by adults or youth (separate exam variants exist — default to the adult version unless told otherwise). |
| B2 | Goethe-Zertifikat B2 | Not yet authored. |
| C1 | Goethe-Zertifikat C1 | Not yet authored. |

Start from `https://www.goethe.de/en/spr/prf.html` for the official page per level.

## Other recognized providers (`alsoRecognizedBy`, not a full parallel blueprint)

Per the project's multi-provider awareness requirement (FR-1.2): don't author full parallel `ExamBlueprint` content per provider — that multiplies authoring burden for marginal reader value. Instead, populate `ExamBlueprint.alsoRecognizedBy` with a lightweight cross-reference per provider whose exam is roughly equivalent at that level, so a learner using this content for a different provider's exam still knows it's relevant.

| Provider | Coverage | Naming vs. Goethe | Where to check equivalence |
|---|---|---|---|
| **telc** (telc GmbH) | A1–C1, same CEFR scale | `telc Deutsch A1`, `telc Deutsch A2`, `telc Deutsch B1`, etc. — same level names as Goethe, different exam body/format | `https://www.telc.net/en/` |
| **ÖSD** (Österreichisches Sprachdiplom Deutsch, Austria) | A1–C2 | `ÖSD Zertifikat A1`, `ÖSD Zertifikat A2`, etc. | `https://www.osd.at/en/` |

When authoring a level's blueprint, add one `alsoRecognizedBy` entry per provider that publishes an equivalent-level exam, each with a one-sentence `note` and, where available, a `url`. Don't invent equivalence — if a provider doesn't clearly publish a matching level, omit it rather than guessing.

## Where to look (Goethe primary blueprint)

Find that level's official Goethe exam page — it links to the official sample-exam sections (Hören/Lesen/Schreiben/Sprechen or that level's equivalent naming), the official vocabulary/word list PDF where one exists, and the results-page format. `examBlueprint.a1.ts`'s `sources` map is the pattern to follow: a flat `Record<string,string>` keyed by `exam`, `listening`, `reading`, `writing`, `speaking`, `vocabulary`, `results` (use whichever of these the level's real exam actually has — some levels may not publish a standalone vocabulary list, in which case omit that key rather than inventing a URL).

Always cite the exam's real section names, part counts, durations, and pass-mark structure as published — do not estimate or infer them from another level's structure.

## Target shape (`ExamBlueprint`, from `src/types.ts`)

```ts
export interface ExamBlueprint {
  level: CEFRLevel;
  provider: string;                    // e.g. "Goethe-Institut" — the primary blueprint's provider
  sources: Record<string, string>;
  sections: ExamSection[];             // { id, name, duration, parts, description, taskTypes[], strategy[] }
  passMark: { total: number; written: number; oral: number; required: number };
  alsoRecognizedBy?: { provider: string; note: string; url?: string }[];
}
```

Hand this off to `lesson-writer` as part of a module brief when a level's first module is being authored — see `lesson-schema`'s "Adding a new level or module" checklist, step 5.
