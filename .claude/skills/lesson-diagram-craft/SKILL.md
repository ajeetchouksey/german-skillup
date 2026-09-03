---
name: lesson-diagram-craft
description: When a grammar table or Mermaid diagram earns its place in a lesson vs. when it's clutter, and how to author each for german_skill's GrammarTable/GrammarDiagram components. Read by lesson-writer before populating Lesson.grammarTable or Lesson.grammarDiagram.
---

# Lesson diagram craft

Two visual primitives, not one — pick based on what kind of relationship the grammar point actually has, per `lesson-schema`'s `GrammarTable`/`GrammarDiagram` types:

- **`grammarTable`** — for *tabular* relationships: a grid where rows/columns both carry meaning (case × gender, tense × person, singular vs. plural forms side by side). Rendered as a plain HTML table (`GrammarTable.tsx`) — no library, always renders, zero risk.
- **`grammarDiagram`** — for *structural/flow* relationships: word order, sentence position rules, a decision path ("when to use X vs. Y"). Rendered via Mermaid (`GrammarDiagram.tsx`, lazy-loaded) — a table would flatten the relationship a diagram shows naturally.

## When to use one (or neither)

Not every lesson needs either. Add one only when the grammar point is genuinely hard to grasp from prose alone — a case-ending pattern, a word-order rule, a verb-conjugation set. A lesson that's mostly vocabulary (e.g. "Colours") doesn't need a diagram just to have one; that's clutter, not teaching.

## `grammarTable` — authoring guide

```ts
grammarTable: {
  caption: "Definite article by case (singular)",
  headers: ["Case", "der (m)", "die (f)", "das (n)"],
  rows: [
    ["Nominativ", "der", "die", "das"],
    ["Akkusativ", "den", "die", "das"],
    ["Dativ", "dem", "der", "dem"],
  ],
}
```

- `headers[0]` is conventionally the row-label column (here, the case name); the rest are the values being compared.
- Keep rows to what's pedagogically relevant to the lesson's level — don't dump the full genitive+all-four-cases table into an A1 lesson that only teaches nominative/accusative.
- `caption` states what's being compared, not a generic label like "Grammar table."

## `grammarDiagram` — authoring guide

Mermaid syntax, kept simple — a lesson-embedded diagram is a teaching aid, not a technical architecture diagram. Prefer `flowchart LR` (left-to-right) for word-order/sentence-structure, since German sentences read left to right and that orientation matches the pattern being taught.

```ts
grammarDiagram: {
  caption: "Verb-second (V2) word order in a main clause",
  mermaid: `flowchart LR
    A["Position 1<br/>(any element)"] --> B["Verb<br/>(conjugated)"]
    B --> C["Subject<br/>(if not in position 1)"]
    C --> D["...rest of clause"]`,
}
```

- Keep node labels short (a few words); use `<br/>` for a second line rather than a long single-line label.
- Don't hardcode colors in the chart source — `GrammarDiagram.tsx` already sets a dark-theme-safe palette (mermaid `themeVariables` matching this app's `--color-accent`/`--color-lilac` brand tokens) at render time; a chart with its own inline `style`/`classDef` colors will fight that and risk unreadable contrast.
- Test complexity budget: if a diagram needs more than ~6 nodes to explain one grammar point, the point is probably too big for one diagram — split it or fall back to prose + a `grammarTable`.

## Security note

`GrammarDiagram.tsx` renders Mermaid's own `mermaid.render()` output via `dangerouslySetInnerHTML` — this is safe because it's the *rendered SVG Mermaid produces*, not the raw `mermaid` chart string echoed directly; Mermaid's renderer is the sanitization boundary. Never bypass `GrammarDiagram.tsx` to inject chart-derived markup any other way.
