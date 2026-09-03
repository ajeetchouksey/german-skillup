# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Deutsch SkillUp** — a free, no-login German-learning app (CEFR A1 → C1 roadmap, exam-aligned to Goethe-Institut primarily with telc/ÖSD cross-referenced), part of the AaryaAI family (sibling to the much larger `ajch_platform`, hosted at `hallo.aaryaai.dev`). React 18 + TypeScript + Vite + Tailwind CSS v4, dark glass-card UI. No backend, no database, no login — all progress lives in the visitor's own browser (`localStorage`), and all lesson content is plain typed TypeScript objects under `src/data/`, not JSON or a CMS.

**Mission**: conversational fluency and real-life confidence — exam-readiness is a byproduct, not the goal. This app complements a learner's classroom course, exam-prep program, or another app; it doesn't replace them. See the project roadmap plan for the full business case.

## Commands

```bash
npm install          # install deps
npm run dev           # dev server -> http://localhost:5173
npx tsc -b --noEmit    # type-check only (matches npm run build's first step)
npm run build           # tsc -b && vite build -> /dist
npm run preview          # serve the production build locally
npm run lint              # eslint .
```

There is no test runner installed in this repo (no vitest/playwright) — `tsc -b --noEmit` and a manual click-through (e.g. via the `run` skill) are the correctness checks available today. `tsc -b --noEmit` covers three project references — `tsconfig.app.json` (the frontend), `tsconfig.node.json` (Vite config), and `tsconfig.worker.json` (`workers/`, the auth Worker) — all three from one command.

`tsc -b --noEmit` is clean — 0 errors. (It wasn't, for most of this project's history: `lessons.a1.ts`'s module `a1-m00` predated the `PracticeTask`/`QuizQuestion` contract and didn't conform to it, and `VocabBuilder.tsx` had one unused import — both fixed. This is exactly why `npm run build`, which runs `tsc -b` before `vite build`, had never once succeeded until that fix landed — don't assume a schema-shaped bug like that is someone else's problem to defer; it blocks every deploy.)

## Architecture

### Content model

Content is authored as plain typed objects (`src/types.ts` is the single source of truth), not fetched from any API:

- `LevelContent` (one per CEFR level) = `Module[]`, each `Module` = `Lesson[]`. Lives in `src/data/lessons.<level>.ts` (e.g. `lessons.a1.ts`, `lessons.a2.ts`), registered in `src/data/levels.ts`'s `LEVELS: Record<CEFRLevel, LevelContent | null>` map. Adding a level requires **only** authoring the data file and flipping its `levels.ts` entry from `null` — no other code changes (the level selector picks it up automatically).
- `MODULE_PRACTICE` (`src/data/modulePractice.ts`) — a **separate, parallel** hand-authored map keyed by `Module.id` string (e.g. `"a1-m00"`), holding sample exam questions + a real-life "mission" per module. **Nothing in the code enforces that every `Module.id` has a matching entry** — this is a silent runtime-only join a content author must maintain by hand.
- `EXAM_BLUEPRINTS` (`src/data/examBlueprint.ts`) — a registry, `Record<CEFRLevel, ExamBlueprint | null>`, mirroring the `levels.ts` pattern; per-level data lives in `src/data/examBlueprint.<level>.ts` (only `examBlueprint.a1.ts` exists so far). Each `ExamBlueprint`'s primary `provider` is Goethe-Institut, with an optional `alsoRecognizedBy` cross-reference to other providers (telc, ÖSD) at the same level — see `german-exam-reference`. Consumed by `ExamOverview`/`ExamSimulator`, both of which take a `level: CEFRLevel` prop and degrade gracefully when a level's blueprint is `null`.
- `Lesson.grammarTable` / `Lesson.grammarDiagram` / `Lesson.illustration` — all optional. Tables render via `GrammarTable.tsx` (plain HTML, no dependency); diagrams via `GrammarDiagram.tsx` (lazy-loaded `mermaid` package, dark-theme-safe palette baked in at render time) — see `lesson-diagram-craft` for when each earns its place. Illustrations are curated infrastructure (`public/images/lessons/`), sourced incrementally as content is authored, not a bulk task.
- `PASSAGES` (`src/data/passages.ts`) — a registry, `Record<CEFRLevel, ReadingPassage[]>` (each level defaults to `[]`, not `null` — a level can have zero or many passages), mirroring `levels.ts`'s pattern. Per-level data lives in `src/data/passages.<level>.ts`. Powers `ReadAloudPractice.tsx`'s sentence-by-sentence read-aloud practice, surfaced as the "Read Aloud" tab in `AgentPanel`.
- `src/lib/studyPlan.ts` is pure derived logic over `LevelContent`/`ProgressState` (study-plan generation, vocab aggregation, module-readiness) — it has no static content of its own and needs no authoring.

All of `lessons.a1.ts` now conforms to the `Lesson`/`PracticeTask`/`QuizQuestion` contract (module `a1-m00`'s two lessons were the last holdouts — nonexistent `PracticeTask` fields `prompt`/`tips`/`wordMin`/`wordMax` instead of the real `title`/`instruction`/`modelAnswer?`/`examPart?`/`timeMinutes?`/`checklist?`, and numeric `quiz[].answer` instead of the required string — fixed to match `lessons.a2.ts`'s already-correct shape). If a future edit to `lessons.a1.ts` reintroduces this pattern, `tsc -b --noEmit` (and `lesson-validator`) will catch it immediately.

### Content authoring — agent-driven

New lesson content (A2 needs more modules; B1/B2/C1 don't exist yet) is authored via a small subagent pipeline, not by hand-editing data files directly:

| Agent | Tools | Writes to |
|---|---|---|
| `curriculum-lead` | `Read, Agent, Grep, Glob, WebFetch` | nothing (research + delegate only) |
| `lesson-writer` | `Read, Write, Edit, Glob, Grep` | `lessons.<level>.ts`, `modulePractice.ts`, `levels.ts` (own level), `examBlueprint.<level>.ts` |
| `lesson-validator` | `Read, Grep, Glob, Bash` (`tsc -b --noEmit` only) | nothing (read-only gate) |

See `.claude/agents/*.md` for full mandates and `.claude/skills/{lesson-schema,lesson-standard,german-exam-reference,lesson-diagram-craft}/SKILL.md` for the schema contract, pedagogy/quality rules, per-level exam reference, and visual-content craft they follow.

### Code review & security — code-driven, not content

A separate pair of agents gates *code* (components, hooks, lib, and eventually the auth Worker), not content — `lesson-validator` doesn't cover this axis:

| Agent | Tools | Scope |
|---|---|---|
| `code-reviewer` | `Read, Grep, Glob, Bash` (`git diff`/`git status`/`tsc -b --noEmit` only) | Correctness, reuse/simplification, efficiency — see `code-standard` |
| `security-guardian` | `Read, Grep, Glob, Bash` (read-only inspection only) | Secrets, XSS surface, dependency risk, and (once built) Worker/OAuth/AI-proxy correctness — see `security-standard` |

Both report `PASS ✓` / `BLOCK ✗` in the same format as `lesson-validator`.

**Registry-first rule**: before authoring anything, re-read `levels.ts` and the target level's own data file — never assume existing coverage from memory.

**Hard boundary**: content agents never touch `package.json`'s version, `src/lib/version.ts`, or `CHANGELOG.md` — that stays the manual release process documented in `README.md`'s "Versioning" section (bump both version fields together, add a CHANGELOG entry, commit, tag).

### Speech & audio practice

`src/lib/useSpeech.ts` (TTS, `speak(text, rate?)` — defaults to 0.82, pass a lower rate like 0.55 for slower playback) and `src/lib/useSpeechRecognition.ts` (STT) are the only speech primitives — everything speaking/listening-related builds on these two, never a new hook. `useSpeechRecognition` exposes three modes: `listen(target)` (one-shot, scores a single short phrase — `PronounceChecker.tsx`), `listenContinuous(sentences, onSentenceResult, onDone?)` (scores a passage sentence-by-sentence in order, reusing the same `checkPronunciation` scoring — `ReadAloudPractice.tsx`), and `listenFreeform(onUpdate)` (accumulates an open-ended transcript with no target to score against — `SpeakingCoach.tsx`'s automated WPM/keyword-coverage signal). All three are 100% browser-native (Web Speech API) — no audio is ever transmitted or stored server-side. Every consumer must check `isSupported` and degrade to a text-only path when it's `false` (Firefox has no `SpeechRecognition` at all; Safari support is partial) — NFR-2/NFR-3 in the project plan.

### Design / brand

`ajch_food_for_thoughts/brand/BRAND.md` (sibling repo) is the canonical AaryaAI brand system — logo geometry, color tokens (`--brand-indigo #5B4BD6`, `--brand-lilac #A99BFF`), typography (Barlow / Barlow Condensed). In this repo, `src/index.css`'s `@theme` block is the single source of truth for design tokens — `tailwind.config.js` intentionally carries no `theme.extend` (Tailwind v4 CSS-first theming; nothing in the JS config is loaded without an `@config` directive, which this repo doesn't use).

### Login (Google, optional — cross-device sync only)

Worker is deployed (`deutsch-skillup-auth`, live at `api.hallo.aaryaai.dev`, its own KV namespace `DEUTSCH_SKILLUP_RATE_LIMITER` and D1 database `deutsch-skillup-progress` — deliberately separate names from ajch_platform's own `RATE_LIMITER`/`aarya-subscribers`, which share this same Cloudflare account). `SESSION_SIGNING_KEY` is set. **Login itself isn't live yet** — `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` secrets aren't set (pending the Google Cloud Console redirect-URI step, which only the account owner can do), and the frontend's `VITE_AUTH_WORKER_URL`/`VITE_GOOGLE_CLIENT_ID` build env vars aren't set either, so `isAuthConfigured()` stays `false` and `LoginWidget` keeps rendering nothing in production until both are done. Architecture:

- `workers/auth.ts` — a dedicated Cloudflare Worker (`workers/schema.sql` for its D1 schema), deliberately isolated from `ajch_platform`'s own `workers/subscribe.ts`/database — but reusing the **same** Google OAuth client (its callback URL gets registered as an additional authorized redirect URI on that existing client, not a second Google Cloud app). Modeled on that Worker's HMAC-SHA256 session-token design, scoped down to Google-only — no GitHub, no mentor/AI proxy, no comments.
- `src/lib/auth.tsx` — `AuthProvider`/`useAuth()`, Google-only. Session persists in `sessionStorage` (not `localStorage` — matches `ajch_platform`'s choice: doesn't survive across browser sessions by design). Since this app has no router, the OAuth redirect lands back at the site root with the token in a URL hash fragment (`#auth_token=...`), handled in `auth.tsx` itself rather than a dedicated callback route.
- `src/lib/progressSync.ts` — `loadCloudProgress`/`saveCloudProgress` (talk to the Worker's `/profile/load`/`/profile/save`) and `mergeProgress` (union of `completedLessons`, max `xp`/`streak`, and — since `ProgressState` carries no per-attempt timestamp — the **better** `quizScores` entry per lesson rather than a true "most recent," which isn't determinable from the data available).
- `src/lib/useProgress.ts`'s `applyProgress(next)` lets `App.tsx` apply the merged result as this device's new local state after a sync.
- `LoginWidget.tsx` renders nothing until `isAuthConfigured()` (both `VITE_AUTH_WORKER_URL` and `VITE_GOOGLE_CLIENT_ID` set) — the app is fully usable without ever signing in (FR-3.3); login only adds cross-device continuity on top of `localStorage`, which stays the source of truth either way (NFR-7).
- `tsconfig.worker.json` (+ `@cloudflare/workers-types` devDependency) type-checks `workers/` as its own project, referenced from root `tsconfig.json` alongside `tsconfig.app.json`/`tsconfig.node.json` — `npx tsc -b --noEmit` covers all three.

### Deploy

GitHub Pages via `.github/workflows/deploy.yml`, custom domain `hallo.aaryaai.dev` (`public/CNAME`), `vite.config.ts` `base: "/"` accordingly. The auth Worker (above) deploys separately via `wrangler deploy` to `api.hallo.aaryaai.dev` — see `wrangler.toml` for the one-time setup (KV namespace, D1 database, secrets) required before that works.
