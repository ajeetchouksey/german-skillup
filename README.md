# 🇩🇪 Deutsch SkillUp

A free, no-login German learning app — same platform philosophy and UI language
as [ajch_platform](https://github.com/ajeetchouksey/ajch_platform) / AaryaAI
SkillUp: React + TypeScript + Vite, dark glass-card UI, GitHub Pages hosting,
versioned releases with a changelog.

> **Roadmap:** A1 → A2 → B1 → B2 → C1. Currently ships with **A1** content.

## Test Locally (quick start)

```bash
cd german_skill
npm install
npm run dev
```

Open the printed `http://localhost:5173/` URL in your browser. Press `Ctrl+C`
to stop the server. See "Run Locally" below for full details and prerequisites.

## Stack (matches ajch_platform conventions)

| Layer      | Choice                                   |
|------------|-------------------------------------------|
| Framework  | React 18 + TypeScript                     |
| Build tool | Vite                                      |
| Styling    | Tailwind CSS (dark theme, glass-card panels) |
| State      | Local React state + `localStorage` (no backend, no login) |
| Hosting    | GitHub Pages via GitHub Actions           |
| Versioning | Semantic Versioning + `CHANGELOG.md`      |

## Project Structure

```text
german_skill/
├── .github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages on push to main
├── src/
│   ├── types.ts                     # Shared TS types (Lesson, Module, ProgressState, etc.)
│   ├── data/
│   │   ├── levels.ts                 # Registry mapping CEFR level → content module
│   │   └── lessons.a1.ts             # A1 lesson content (vocab, examples, quizzes)
│   ├── lib/
│   │   ├── progress.ts                # Pure localStorage progress engine (typed)
│   │   ├── useProgress.ts             # React hook wrapping progress.ts
│   │   └── version.ts                  # Single source of truth for app version/codename
│   ├── components/
│   │   ├── Header.tsx, Sidebar.tsx, Welcome.tsx, LessonView.tsx, Quiz.tsx, Footer.tsx, Toast.tsx
│   ├── App.tsx                       # Root component / state wiring
│   ├── main.tsx                       # React entry point
│   └── index.css                       # Tailwind + design tokens (glass-card, pill, btn)
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── CHANGELOG.md
└── package.json
```

## Run Locally

### Prerequisites (one-time check)

```bash
node --version   # v18.x or v20.x recommended
npm --version    # v9.x or v10.x+
```

If Node isn't installed, get the LTS installer from https://nodejs.org
(takes ~2 minutes).

### Steps

```bash
cd german_skill        # make sure this folder directly contains package.json
npm install              # installs React, Vite, Tailwind, TypeScript, etc.
npm run dev                # starts the dev server with hot reload
```

You'll see output like:

```text
  VITE v5.4.8  ready in 320 ms
  ➜  Local:   http://localhost:5173/
```

Open that URL in your browser. Any edit to files in `src/` (e.g. tweaking
`lessons.a1.ts`) hot-reloads instantly — no restart needed.

### Build & preview the production bundle

Since GitHub Pages serves the *built* output (not the dev server), it's worth
testing this too before deploying:

```bash
npm run build      # type-checks (tsc -b) then builds to /dist
npm run preview    # serves the production build locally
```

### Common local issues

- **`npm error ENOENT ... Could not read package.json`** — you're one folder
  too deep or too shallow. Run `dir package.json` (Windows) or
  `ls package.json` (macOS/Linux) — if it errors, `cd` to the correct folder
  (the one that directly contains `package.json`, `src/`, `index.html`).
  This usually happens when a zip's top-level folder gets nested inside an
  identically-named folder during extraction.
- **`npm install` hangs or fails with network errors** — likely a corporate
  proxy/firewall blocking the npm registry. Check `npm config get proxy` and
  `npm config get https-proxy`, or try `npm install --verbose` to see where
  it's stuck.

## Deploy to GitHub Pages

This repo ships with `.github/workflows/deploy.yml`, mirroring the CI-driven
release pattern used in `ajch_platform`.

1. Create the repo (e.g. `german-skillup`) and push this folder as its root:
   ```bash
   cd german_skill
   git init
   git add .
   git commit -m "chore: initial commit — Deutsch SkillUp v0.1.0"
   git branch -M main
   git remote add origin https://github.com/ajeetchouksey/german-skillup.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Source → GitHub Actions** (not "Deploy
   from branch" — the included workflow handles the build + deploy).
3. Push to `main` and the workflow builds and deploys automatically.
4. Brand domain: **`hallo.aaryaai.dev`** — "hallo" (the one German word
   everyone already recognizes), matching the `aaryaai.dev` subdomain
   convention used across the AaryaAI family (e.g. `ajch_platform`'s
   `aaryaai.dev`).
   - `public/CNAME` already contains `hallo.aaryaai.dev`, so GitHub Pages
     serves the custom domain automatically once the DNS `CNAME` record for
     `hallo` points at `<user>.github.io`.
   - `vite.config.ts` sets `base: "/"` accordingly (custom-domain root, not
     a `/german-skillup/` project-site subpath).
   - Until DNS/CNAME is live, the fallback project-site URL is
     `https://ajeetchouksey.github.io/german-skillup/` — but note `base`
     would need to switch back to `"/german-skillup/"` for that path to work.

## Versioning

Version is tracked in two places that must stay in sync:

- `package.json` → `"version"`
- `src/lib/version.ts` → `APP_VERSION`, `APP_CODENAME`, `RELEASE_DATE` (shown live in the app footer)

On every release:
1. Bump both version fields above.
2. Add a new entry to the top of `CHANGELOG.md` (Keep a Changelog format).
3. Commit as `chore(release): bump version to X.Y.Z, populate CHANGELOG` —
   same convention as `ajch_platform`.
4. Tag the commit: `git tag vX.Y.Z && git push --tags`.

## Adding More Content / Levels (A2, B1, B2, C1)

1. Create `src/data/lessons.a2.ts` (copy `lessons.a1.ts` as a template — same
   `LevelContent` shape: modules → lessons → vocab / examples / quiz).
2. Register it in `src/data/levels.ts`:
   ```ts
   import { lessonsA2 } from "./lessons.a2";
   export const LEVELS: Record<CEFRLevel, LevelContent | null> = {
     A1: lessonsA1,
     A2: lessonsA2, // was null
     ...
   };
   ```
3. The level selector in the header picks it up automatically — no other
   code changes needed. Progress tracking is already namespaced by lesson
   `id` prefix (`a1-`, `a2-`, ...), so completion never collides across levels.

## Roadmap

- **v0.1.0 (current):** A1 content, TypeScript app shell matching ajch_platform
  UI/stack, local progress tracking, GitHub Pages CI — ✅ done
- **v0.2.0:** Audio pronunciation (Web Speech API — free, no backend),
  flashcard / spaced-repetition mode
- **v0.3.0:** A2 content, printable PDF cheat sheets
- **v1.0.0:** AI tutor chat (Azure AI Foundry / GitHub Models) for conversation
  practice; B1–C1 content; Goethe/TELC exam prep tracks

## Notes

- No user accounts, no server, no database — progress lives in the visitor's
  own browser (`localStorage`). Private, but device-specific until an
  optional login/sync is added in a later phase.
- All lesson content is fully typed (`src/types.ts`) and authored in plain
  TypeScript objects — no JSON parsing, full IDE autocomplete/type-checking
  when adding new modules or lessons.
