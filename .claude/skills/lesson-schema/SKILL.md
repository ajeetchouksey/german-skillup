---
name: lesson-schema
description: Canonical reference for german_skill's lesson content data model — the exact src/types.ts contract, the two content file shapes (lessons.<level>.ts and modulePractice.ts), the id convention, and the checklist for adding a new level or module. Read this before writing any Lesson/Module/MODULE_PRACTICE object.
---

# Lesson content schema

`src/types.ts` is the single source of truth. Do not invent fields — see the "Known-bad example" below for the exact wrong shape `lessons.a1.ts`'s module `a1-m00` used to have (now fixed) and must never be reintroduced. `src/data/lessons.a2.ts` (and the rest of `lessons.a1.ts`) are the correct model.

## The contract

```ts
export interface VocabItem { de: string; en: string; example?: string; }

export interface QuizQuestion { q: string; options: string[]; answer: string; explanation?: string; }
// answer is a STRING that exactly equals one of the strings in options.
// Never a number / option index.

export interface PracticeTask {
  title: string;        // required
  instruction: string;  // required
  modelAnswer?: string;
  examPart?: string;    // e.g. "Schreiben Teil 2"
  timeMinutes?: number;
  checklist?: string[];
}
// PracticeTask has exactly these six fields. It does NOT have `prompt`,
// `tips`, `wordMin`, or `wordMax` — those don't exist on the type.

export interface GrammarTable { caption: string; headers: string[]; rows: string[][]; }
export interface GrammarDiagram { caption: string; mermaid: string; }
export interface LessonIllustration { src: string; alt: string; credit?: string; }

export interface Lesson {
  id: string; title: string; examMapping: string[]; objectives: string[]; grammar: string[];
  vocab: VocabItem[]; examples: string[]; usefulPhrases: string[];
  readingTask?: PracticeTask; listeningTask?: PracticeTask; writingTask?: PracticeTask; speakingTask?: PracticeTask;
  realLifeTask: string; examFocus: string[]; commonMistakes: string[]; quiz: QuizQuestion[];
  grammarTable?: GrammarTable; grammarDiagram?: GrammarDiagram; illustration?: LessonIllustration;
}

export interface Module { id: string; title: string; icon: string; syllabusTheme: string; lessons: Lesson[]; }
export interface LevelContent { level: CEFRLevel; language: string; modules: Module[]; }
export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1";
```

`grammarTable`, `grammarDiagram`, and `illustration` are all optional — add one only when it genuinely helps (see `lesson-diagram-craft` for when a table vs. a diagram earns its place; illustrations are curated infrastructure, sourced incrementally, not a per-lesson requirement — see `lesson-standard`'s licensing note).

## Known-bad example — do not copy this shape

From `lessons.a1.ts`'s legacy modules (this is what `lesson-validator`'s `tsc` check exists to catch):

```ts
// WRONG — prompt/tips/wordMin/wordMax don't exist on PracticeTask
"writingTask": { "prompt": "...", "wordMin": 20, "wordMax": 30 }
"speakingTask": { "prompt": "...", "tips": ["..."] }

// WRONG — answer must be a string, not an index
"quiz": [{ "q": "...", "options": ["a","b","c"], "answer": 1 }]
```

```ts
// RIGHT — matches lessons.a2.ts
"writingTask": { "title": "...", "instruction": "...", "modelAnswer": "...", "examPart": "Schreiben Teil 2", "timeMinutes": 12 }
"quiz": [{ "q": "...", "options": ["sein", "haben", "werden"], "answer": "sein", "explanation": "..." }]
```

## Clean minimal `Lesson` example

```ts
{
  id: "a2-m07-l01",
  title: "Making a doctor's appointment",
  examMapping: ["Sprechen Teil 2", "Hören Teil 3"],
  objectives: ["Book a medical appointment by phone", "Describe basic symptoms"],
  grammar: ["Modal verb müssen", "Time expressions with um / am"],
  vocab: [{ de: "der Termin", en: "appointment", example: "Ich brauche einen Termin." }],
  examples: ["Ich möchte einen Termin bei Dr. Schmidt.", "Haben Sie am Montag Zeit?"],
  usefulPhrases: ["Wann haben Sie Zeit?", "Ich fühle mich nicht gut."],
  listeningTask: { title: "Book an appointment", instruction: "Listen to the call and note the date/time offered.", examPart: "Hören Teil 3", timeMinutes: 5 },
  writingTask: { title: "Cancel an appointment", instruction: "Write a short message cancelling your appointment.", modelAnswer: "Ich kann den Termin am Montag leider nicht wahrnehmen...", examPart: "Schreiben Teil 2", timeMinutes: 10 },
  realLifeTask: "Call a real or simulated clinic and book an appointment in German.",
  examFocus: ["Hören Teil 3", "Sprechen Teil 2"],
  commonMistakes: ["Using haben instead of müssen for obligation", "Wrong verb position in yes/no questions"],
  quiz: [{ q: "___ Sie am Montag Zeit?", options: ["Haben", "Sein", "Werden"], answer: "Haben", explanation: "Haben Sie...? is the standard polite question form for availability." }],
}
```

## Clean minimal `MODULE_PRACTICE` entry example

```ts
"a2-m07": {
  title: "Health and Appointments",
  sampleQuestions: [
    { skill: "Sprechen Teil 2", question: "Rufen Sie beim Arzt an und vereinbaren Sie einen Termin.", answerGuide: "Guten Tag, ich möchte einen Termin vereinbaren. Ich habe Kopfschmerzen seit zwei Tagen." },
  ],
  mission: {
    concept: "Real-world practice: navigate a healthcare interaction in German.",
    purpose: "Be able to book and manage a medical appointment without switching to English.",
    steps: ["Call a clinic (real or role-played) and book an appointment", "Describe one symptom clearly"],
    evidence: "Recording or written transcript of the call.",
    successCriteria: ["Appointment date/time confirmed in German", "Symptom described using correct vocabulary"],
  },
},
```

`SampleQuestion { skill: string; question: string; answerGuide: string; }` and `MissionGuide { concept: string; purpose: string; steps: string[]; evidence: string; successCriteria: string[]; }` — see `src/data/modulePractice.ts` for the live type definitions.

## Optional visual fields

```ts
grammarTable: { caption: "Definite article by case (singular)", headers: ["Case", "der (m)", "die (f)", "das (n)"], rows: [["Nominativ", "der", "die", "das"], ["Akkusativ", "den", "die", "das"]] },
grammarDiagram: { caption: "Verb-second word order", mermaid: 'flowchart LR\n  A["Position 1"] --> B["Verb"] --> C["Subject"]' },
illustration: { src: "/images/lessons/family-dinner.jpg", alt: "A family sharing a meal at the dinner table", credit: "Photo by ... (CC-BY)" },
```

See `lesson-diagram-craft` for when a table vs. a diagram earns its place, and how to write each well.

## Reading passages (`ReadingPassage`)

```ts
export interface ReadingPassage { id: string; level: CEFRLevel; title: string; sentences: string[]; translationEn?: string; }
```

`sentences` is an array, not one text blob — the read-aloud practice UI scores pronunciation per sentence, in order. Lives in `src/data/passages.<level>.ts`, registered in `PASSAGES` (`src/data/passages.ts`) — same registry pattern as `levels.ts`/`EXAM_BLUEPRINTS`, except each entry defaults to `[]` (a level can have zero or many passages), never `null`. A passage should reuse vocabulary/grammar already taught in that level's `lessons.<level>.ts` — check it first, same as any other content. Example:

```ts
{
  id: "a1-passage-01",
  level: "A1",
  title: "Ein Tag in meinem Leben",
  sentences: ["Ich heiße Anna und ich komme aus Berlin.", "Ich stehe um sieben Uhr auf.", "..."],
  translationEn: "My name is Anna and I come from Berlin. I get up at seven o'clock. ...",
}
```

## Id convention

- Module id: `{level}-m{NN}` (zero-padded 2 digits), e.g. `a2-m07`.
- Lesson id: `{level}-m{NN}-l{NN}`, e.g. `a2-m07-l01`. **Use this scheme for every new module** — do not use A1's legacy flat scheme (`a1-01`, `a1-22`, no module segment), which only exists because those modules predate the convention.
- `MODULE_PRACTICE` keys are the **module id**, not a lesson id.

## Adding a new level or module — checklist

1. Re-read `src/data/levels.ts` and the target level's `lessons.<level>.ts` (if it exists) — check what modules/themes already exist, avoid duplicating one.
2. Author the `Module` (with its `Lesson[]`) matching the contract above, in `src/data/lessons.<level>.ts`. If the file doesn't exist yet, create it exporting a `LevelContent` (see `lessons.a2.ts` as the template — it's the smallest correct example).
3. Author the matching `MODULE_PRACTICE[moduleId]` entry in `src/data/modulePractice.ts` in the same pass — never leave a module without one.
4. If this is the level's first module: import the new `LevelContent` in `src/data/levels.ts` and flip that level's entry from `null`.
5. If this is the level's first module and `src/data/examBlueprint.<level>.ts` doesn't exist yet: see `german-exam-reference` skill for what to research, then create it and register it in `EXAM_BLUEPRINTS` in `src/data/examBlueprint.ts` (mirrors step 4).
6. Hand off to `lesson-validator` before reporting done.
