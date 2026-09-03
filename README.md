# 🇩🇪 Deutsch SkillUp

A free German learning app, no account required to start — same platform
philosophy and UI language as [ajch_platform](https://github.com/ajeetchouksey/ajch_platform)
/ AaryaAI SkillUp: React + TypeScript + Vite, dark glass-card UI, Cloudflare
Pages hosting, versioned releases with a changelog. Optional Google sign-in (a
dedicated Cloudflare Worker, see `workers/`) adds cross-device progress sync
on top — it's never a wall in front of the content.

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
| State      | Local React state + `localStorage` (source of truth); optional Google login for cross-device sync via a dedicated Worker (`workers/auth.ts`) |
| Hosting    | Cloudflare Pages via GitHub Actions (GitHub Pages kept as a manual rollback) |
| Versioning | Semantic Versioning + `CHANGELOG.md`      |

## Project Structure

```text
german_skill/
├── .github/workflows/deploy-cloudflare-pages.yml   # CI: build + deploy to Cloudflare Pages on push to main
├── .github/workflows/deploy.yml   # GitHub Pages — manual rollback only (workflow_dispatch)
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

Since Cloudflare Pages serves the *built* output (not the dev server), it's worth
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

## Deploy

**Cloudflare Pages** (`.github/workflows/deploy-cloudflare-pages.yml`) is the
production target — project `ajch-hallo`, mirroring `ajch_platform`'s own
Cloudflare Pages hosting and sharing the same Cloudflare account/zone the
auth Worker (`workers/auth.ts`, `api.hallo.aaryaai.dev`) lives in. Auto-deploys
on every push to `main`.

One-time setup:
1. Create a Cloudflare API token (dash.cloudflare.com/profile/api-tokens →
   "Edit Cloudflare Workers" template, or custom-scoped to Account →
   Cloudflare Pages:Edit) and add it as a repo secret: `gh secret set CLOUDFLARE_API_TOKEN`.
2. Attach `hallo.aaryaai.dev` as the project's custom domain — Cloudflare
   dashboard → Workers & Pages → `ajch-hallo` → Custom domains → Add. (Not
   scriptable via `wrangler` — there's no `pages domain` subcommand in the
   version this repo uses.) Since `aaryaai.dev` is already a Cloudflare zone
   on this account, Cloudflare manages the DNS record for you.
3. Set `VITE_AUTH_WORKER_URL`/`VITE_GOOGLE_CLIENT_ID` as repo variables
   (Settings → Secrets and variables → Actions → Variables) once the auth
   Worker's Google secrets are set (see `wrangler.toml`) — optional, login
   stays cleanly disabled without them.

**GitHub Pages** (`.github/workflows/deploy.yml`, `public/CNAME`) is kept as
a manual rollback path only — trigger it from the Actions tab
(`workflow_dispatch`), it no longer auto-deploys on push.

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

- No account required — progress lives in the visitor's own browser
  (`localStorage`) by default. Optional Google sign-in (`workers/auth.ts`, a
  dedicated Cloudflare Worker + D1 database) adds cross-device sync on top;
  signing out or never signing in doesn't lose anything, since local storage
  stays the source of truth either way.
- All lesson content is fully typed (`src/types.ts`) and authored in plain
  TypeScript objects — no JSON parsing, full IDE autocomplete/type-checking
  when adding new modules or lessons.
