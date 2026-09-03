---
name: code-standard
description: Correctness, reuse, simplification, and efficiency standard for german_skill's code (components, hooks, lib). code-reviewer applies this when reviewing a diff or a named set of files. Captures repo-specific gotchas already hit this session, not generic advice.
---

# Code standard

Three lenses, same as the platform's own `code-review` skill: **correctness bugs**, **reuse/simplification**, **efficiency**. The rules below are german_skill-specific traps — real ones, already hit this session — not a restatement of generic React/TS advice.

## Correctness

### Rules of Hooks — early returns after conditional hook calls

Hit **twice** this session (`ExamSimulator.tsx` needing its `if (!blueprint) return ...` moved after its `useEffect`; `App.tsx` needing its `if (!entered) return <Landing/>` moved after its `useMemo`). The pattern: a component adds a new early-return branch (often for a "not available yet" / "not logged in" / "no data" state) and the return gets placed wherever felt natural in the JSX flow — sometimes before a hook call declared later in the same function. **Every hook call (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, custom hooks) must execute unconditionally, every render.** Before approving any component with an early return, trace whether every hook the component calls is declared *before* that return, not after. This is a hard rule — a violation is a `BLOCK`, not a suggestion.

### `localStorage` key collisions

Progress data already lives across three separate keys: `deutsch_skillup_progress_v1` (`src/lib/progress.ts`), `german_plan_done_v1` / `german_plan_start_v1` / `german_vocab_known_v1` (`src/lib/studyPlan.ts`), `deutsch_skillup_entered_v1` (`src/App.tsx`, the landing-page gate). A new feature adding its own `localStorage` key must use a distinct, namespaced key and must not silently overwrite or misread one of the existing ones — check the actual key string, not just the variable name.

### Level-scoped data lookups

Content is looked up by `CEFRLevel` through `Record<CEFRLevel, X | null>` registries (`LEVELS`, `EXAM_BLUEPRINTS`, and `passages.ts` from Phase 2) — a lookup can legitimately be `null` for a level that doesn't have that content yet. Any component consuming one of these registries must handle the `null` case explicitly (a "coming soon" fallback, matching `ExamOverview`/`ExamSimulator`'s existing pattern) rather than assuming the entry exists.

## Reuse / simplification

- Before adding a new UI pattern, check `src/components/ui/` (`GlassCard`, `Badge`, `Button`, `SectionHeader`, `StatGrid`, `VersionTag`, `PulsingDot`) — raw Tailwind badge/card/stat class strings outside `ui/` are a simplification finding, not just style nitpicking, since the design-token discipline (see below) depends on going through these primitives.
- Before adding a new speech/audio hook, check `src/lib/useSpeech.ts` (TTS) and `src/lib/useSpeechRecognition.ts` (STT + `checkPronunciation`/`similarity`/`normalize` scoring) — Phase 2 work extends these, it doesn't duplicate them.
- Before adding a new localStorage-backed persistence hook, check whether `src/lib/progress.ts`'s pattern (pure functions + a thin `useProgress` React wrapper) already fits, rather than inventing a new persistence shape.

## Efficiency

- Any new dependency with real weight (`mermaid` from Phase 1, anything Phase 2+ might add) must be lazy-loaded (dynamic `import()`), not a top-level import that inflates the main bundle — matches `ajch_platform`'s own per-route lazy-loading discipline and this repo's NFR-1 (main-chunk gzip size should not materially regress from its current ~120KB baseline).
- Flag any `useEffect` with a missing or overly-broad dependency array, and any list render without a stable `key`.

## Design-token discipline (a correctness concern here, not just style)

`src/index.css`'s `@theme` block is the single source of truth for color tokens (`--color-accent: #5b4bd6`, `--color-lilac: #a99bff`, etc.) — established this session when the app's branding was aligned to the canonical AaryaAI brand system (`ajch_food_for_thoughts/brand/BRAND.md`). `tailwind.config.js` intentionally carries no `theme.extend` and is dead weight if anything is added there without an `@config` directive. A raw hex color or a generic Tailwind `violet-*`/`indigo-*` utility introduced outside `index.css` is drift from that source of truth — flag it, even though existing pre-brand-alignment code still has some (that's tracked debt, not license to add more).

## Output format

Same as `lesson-validator`: `PASS ✓` (what was checked) or `BLOCK ✗` with exact `file:line` + what's wrong, one bullet per finding. No vague summaries.
