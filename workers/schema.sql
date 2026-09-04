-- D1 schema for german_skill's dedicated auth Worker (workers/auth.ts).
-- Google logins only — no app_id namespacing needed, this database belongs
-- to this app alone (unlike ajch_platform's shared user_profiles table).

CREATE TABLE IF NOT EXISTS user_progress (
  provider    TEXT NOT NULL,           -- always 'google' today; kept for parity/future-proofing
  provider_id TEXT NOT NULL,           -- Google 'sub' claim
  progress    TEXT NOT NULL,           -- JSON-serialized ProgressState (src/types.ts)
  updated_at  TEXT NOT NULL,           -- ISO 8601, set on every save
  PRIMARY KEY (provider, provider_id)
);

-- Phase 4b: durable capture of learner-flagged /writing/check responses.
-- No admin UI reads this yet — manual DB query for review, per the plan's
-- Content & Community Standards report-path requirement.
CREATE TABLE IF NOT EXISTS flagged_writing_feedback (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  text       TEXT NOT NULL,            -- the learner's original submission
  feedback   TEXT NOT NULL,            -- the AI feedback they flagged
  created_at TEXT NOT NULL             -- ISO 8601
);

-- Same purpose as flagged_writing_feedback, for /reading/check's read-aloud
-- transcript feedback.
CREATE TABLE IF NOT EXISTS flagged_reading_feedback (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  transcript TEXT NOT NULL,            -- formatted target/heard sentence pairs
  feedback   TEXT NOT NULL,            -- the AI feedback they flagged
  created_at TEXT NOT NULL             -- ISO 8601
);
