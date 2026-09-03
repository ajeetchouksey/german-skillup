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
