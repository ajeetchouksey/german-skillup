---
name: lesson-standard
description: Quality and hard-rule standard for authoring german_skill lesson content — CEFR-level grammar/vocab progression, quiz-distractor craft, real-life mission craft, and exam-alignment rules. lesson-writer follows this for every module; lesson-validator checks the hard-rule half.
---

# Lesson content standard

The mission is conversational fluency and real-life confidence — exam-readiness is a byproduct of teaching the language well, not the goal itself. Deutsch SkillUp complements a learner's classroom course, prep program, or app of choice; it doesn't replace them. Its job is narrower: turn "I've studied this" into "I can actually use it, out loud, under pressure, and trust myself." Every rule below serves that, not exam-drilling for its own sake.

Two kinds of rules: **hard rules** are schema/invariant checks `lesson-validator` mechanically verifies (via `tsc -b --noEmit` plus direct file reads) — a module isn't done until they pass. **Quality rules** are judgment calls `lesson-writer` applies while drafting; nothing mechanically enforces them.

## Hard rules (what `lesson-validator` checks)

1. Every `Lesson`/`Module`/`PracticeTask`/`QuizQuestion` object conforms exactly to `src/types.ts` — see `lesson-schema` for the contract and the known-bad shape to avoid.
2. Every `quiz[].answer` is a string that exactly equals one of that same question's `options`.
3. Every `Module.id` written has an exactly-matching `MODULE_PRACTICE` entry (same key) in `src/data/modulePractice.ts`, and vice versa — no orphans in either direction.
4. Ids are unique and follow the `{level}-m{NN}` / `{level}-m{NN}-l{NN}` convention (see `lesson-schema`).
5. No new module duplicates the theme (`syllabusTheme`) of an existing module in the same level's file.
6. **Content safety** (non-negotiable, per the project's Content & Community Standards policy): no racist, sexist, homophobic, or otherwise hateful/discriminatory content; no sexual content or harassment; no glorification of violence; cultural references in examples/vocab must be handled respectfully, never stereotyped by nationality, religion, or gender; no offensive vocabulary (including German slurs) presented as neutral "vocab to know."

## Human-learning pedagogy (quality rules — the "how" of every module)

- **Comprehensible input**: introduce new grammar/vocab through context built from vocabulary the learner already has (from earlier modules), not an isolated drill list. A new module's `examples` should read like natural sentences a learner at that level could mostly parse, with the new element as the one unfamiliar piece — not a wall of entirely new vocabulary.
- **Spaced reinforcement**: a module should knowingly reuse a meaningful share of earlier-taught vocab in its own `examples`/`vocab`, not only introduce new words. Before finalizing a module, check 2–3 earlier modules' `vocab[].de` in the same level's file and work a few back in.
- **Communicative-competence framing**: `realLifeTask` must describe something usable outside any exam room — a real interaction (book an appointment, order food, small talk with a neighbor), not a restated grammar drill. Bad: "Practice the accusative case in five sentences." Good: "Order a meal for two at a real or role-played restaurant, specifying what each person wants."
- **Confidence-building tone**: `commonMistakes` and quiz `explanation` text use encouraging, normalizing language — a mistake is framed as a common, expected mix-up at this level, never as a sign the learner is behind. Bad: "Wrong — this is a beginner error." Good: "A common mix-up at this level: sein and haben as auxiliaries. Here's how to tell them apart..."
- **Multimodal coverage**: a module should touch reading + listening + writing + speaking, and a visual aid (grammar table/diagram, or an illustration — see `lesson-diagram-craft`) where the grammar point genuinely benefits from one — don't default to text-only when a case table or word-order diagram would teach the pattern faster.

## Quality rules (judgment — apply while drafting)

### CEFR-level grammar/vocab progression

A module must only introduce grammar and vocabulary appropriate to its level's CEFR "can-do" descriptors:

- **A1**: present tense, basic word order, articles (der/die/das), simple questions, numbers, everyday nouns. No subordinate clauses, no subjunctive, no complex tense combinations.
- **A2**: past tense (Perfekt), modal verbs, comparatives, simple connectors (weil, dass, wenn). May assume A1 vocabulary/grammar is already known — don't re-teach it, build on it.
- **B1**: Präteritum for common verbs, passive voice (basic), subordinate clause word order, expressing opinions/reasons. Assumes A1+A2 mastery.
- **B2**: Konjunktiv II, more complex subordinate clauses, nuanced connectors, abstract topics.
- **C1**: full grammatical range, idiomatic expressions, nuanced register (formal/informal), complex argumentation.

When in doubt about whether a structure belongs at a level, check what the level's real exam (`german-exam-reference`) actually tests — don't introduce grammar the real exam wouldn't require yet.

### Quiz-distractor craft

`QuizQuestion.options` should read like a real learner's plausible mistakes, not random noise:

- Good distractors: a false friend, a wrong case ending, a verb-position error, confusing two similar-sounding words, mixing up sein/haben as auxiliary.
- Bad distractors: an option in the wrong part of speech, an obviously absurd answer, an option unrelated to the sentence's topic.
- `explanation` (when present) should cover *why the answer is right* — not just restate it. Prefer explanations that also name why the most tempting distractor is wrong, since that's what actually teaches the distinction.

### Real-life mission craft (`MissionGuide`)

- `purpose` states an observable real-world outcome ("book a real appointment," "order at a real or role-played café"), never a restated grammar drill ("practice modal verbs").
- `steps` are concrete actions the learner actually performs, not more study.
- `evidence` names something checkable (a recording, a written transcript, a completed form) — not "understanding."
- `successCriteria` are specific and checkable, not vague ("did well").

### Exam alignment

Every `Lesson.examMapping` and `Lesson.examFocus` must name a real section id/name from that level's `EXAM_BLUEPRINTS[level].sections` (e.g. `"Hören Teil 2"`, matching the `sections[].name` + a task-part label) — never an invented exam part. If the level's blueprint doesn't exist yet, that's a blocking prerequisite for `curriculum-lead` to resolve first (see `german-exam-reference`), not something `lesson-writer` should guess around.

### Illustrations (when authored)

An illustration is optional infrastructure, not a per-lesson requirement (see `lesson-schema`'s `illustration` field), and comes from one of two sources:

- **Curated**: a real hand-picked image. CC0/CC-BY licensed only, `credit` populated whenever the license requires attribution.
- **AI-generated** (Phase 4a, `scripts/generate-illustration.mjs`, Cloudflare Workers AI / flux-1-schnell): the prompt you write is always built from the lesson's own vetted theme/vocab/grammar — never from anything outside the brief — which is the actual content-safety control here (the script's own denylist is defense-in-depth on top of that, not the primary gate). `credit` is always `"AI-generated (Cloudflare Workers AI, flux-1-schnell)"`.

Either way, the image must depict its subject respectfully — no stereotyped caricature of a nationality/culture, matching the content-safety hard rule above.
