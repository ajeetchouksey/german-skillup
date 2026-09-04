# Changelog

All notable changes to Deutsch SkillUp are documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
versioning follows [Semantic Versioning](https://semver.org/).

## [0.3.0] - 2026-09-04

### Added
- Onboarding persona quiz (experience, goal, daily time budget, exam focus) shown once between Landing and the app,
  always skippable — personalizes the study plan's pacing and activity order with pure client-side logic, no AI
  or server call involved
- AI Practice Lab: optional, on-demand LLM feedback on Cloudflare Workers AI, anonymous by design (no login
  required) — a Writing Checker "Get AI Feedback" button and a Read Aloud pronunciation-pattern coach, both backed
  by a dedicated Worker (`api.hallo.aaryaai.dev`) with content-safety moderation and three layers of rate limiting
  (hourly burst, per-learner daily cap, shared global daily budget)
- AI feedback now highlights the specific wrong/corrected German words inline (red/green), and always replies in
  English so an A1-C1 learner can actually follow the explanation
- A visible "X/15 AI checks left today" quota badge next to both AI feedback buttons, backed by a new read-only
  `GET /ai/quota` endpoint — the limit is now legible before a learner hits it, not just after
- Content-authoring AI illustrations pipeline (Phase 4a)
- Click-through navigation from the Study Plan's day cards and the Dashboard's module-readiness rows straight into
  the relevant lesson — both previously dead-ended at an expand/collapse toggle with no way to actually open the lesson
- CEFR level now persists across reloads instead of resetting to the first available level every visit

### Fixed
- A pre-existing invalid-HTML (button-in-button) console warning on the Study Plan page, cleared as part of making
  its day cards navigable
- `tsconfig.app.json`'s deprecated `baseUrl` (removed ahead of TypeScript 7.0)

## [0.2.1] - 2026-08-03

### Added
- Sample question bank for every Goethe A1 module
- Expandable answer guidance
- Real-Life Mission purpose, steps, evidence and success criteria

## [0.2.0] - 2026-08-03

### Added
- Goethe-Zertifikat A1: Start Deutsch 1 exam blueprint
- 22 detailed lessons aligned to published vocabulary themes and task types
- Dedicated Hören, Lesen, Schreiben and Sprechen strategy labs
- Original exam-style practice, real-life missions, model language and checklists
- Official Goethe training, word-list and results links

### Changed
- Expanded lesson data model with exam mapping, grammar, task timing, checklists and model guidance
- Updated welcome screen with exam structure and pass threshold

## [0.1.0] - 2026-08-03

### Added
- Initial release — "A1 Foundations"
- React + TypeScript + Vite + Tailwind app shell (aligned with ajch_platform stack/UI)
- 8 A1 modules: alphabet, greetings, introductions, numbers, family,
  articles (der/die/das), daily activities, days of the week
- Local, no-login progress tracking (XP, streak, completion %) via `localStorage`
- Level selector scaffolded for future A2 → C1 content (currently A1 only)
- GitHub Actions workflow for automatic GitHub Pages deployment on push to `main`
- Dark, glass-card UI matching Aarya / ajch_platform visual language
  (gold + German-flag-red accents, sticky header, version badge in footer)
