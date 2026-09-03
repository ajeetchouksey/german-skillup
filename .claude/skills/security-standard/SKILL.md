---
name: security-standard
description: Security standard for german_skill's code and infrastructure — secrets, XSS surface, and (from Phase 3/4 onward) Worker/OAuth/AI-proxy rules. security-guardian applies this before any change touching dependencies, secrets, user input, or the auth/Worker layer ships.
---

# Security standard

Today (Phase 0–1) this app is 100% static — no backend, no database, no user input beyond localStorage-only progress. That changes over the roadmap (Phase 2 adds user-submitted text/speech transcripts; Phase 3 adds an OAuth/session Worker; Phase 4 adds a server-held AI API key), so this skill covers both what applies *now* and what becomes live as each phase lands — sections are marked accordingly.

## Applies now

### No secrets in the repo

Nothing resembling an API key, client secret, or token literal ever gets committed — check any new file touching config, env handling, or the future `workers/` directory. `.env`/`.env.local` stay gitignored; secrets are Cloudflare Worker secrets (`wrangler secret put`), never `wrangler.toml` plaintext `[vars]` (fine for non-secret flags like a feature toggle, never for a credential).

### No unsanitized HTML injection

React auto-escapes text content by default — that protection is only as good as nobody bypassing it. Flag any `dangerouslySetInnerHTML` usage; if one is ever genuinely needed (e.g. rendering Mermaid's SVG output in Phase 1's `GrammarDiagram`), it must render library-generated markup only, never a string built from user input or lesson content without going through Mermaid's own renderer.

### Dependency sanity

A new npm dependency (starting with Phase 1's `mermaid`) gets a quick check before it's added: actively maintained, no open critical CVEs, no unexplained massive transitive dependency growth for what it does. This is a five-minute sanity check, not a full audit.

## Applies from Phase 2 (user-submitted text)

- Speech-to-text transcripts and written responses are user input the moment they exist, even while they stay client-side/local-only. Anything that later renders one back to the screen goes through the same no-`dangerouslySetInnerHTML` rule above.
- Per the Content & Community Standards policy (see the project plan / `lesson-standard`), no feature may make a learner's submitted text visible to anyone but themselves without a moderation check in front of it — this is a security-adjacent gate `security-guardian` also enforces, not purely `lesson-validator`'s concern, since it's about what leaves the user's own browser, not content quality.

## Applies from Phase 3 (Worker / OAuth / sessions)

Reference pattern: `ajch_platform`'s `workers/subscribe.ts` (`signSessionToken`/`verifySessionToken`, hand-rolled HMAC-SHA256, no library) — german_skill's own Worker follows the same shape, scoped to Google OAuth only.

- **CORS allowlist correctness**: the Worker only accepts requests from `hallo.aaryaai.dev` (+ localhost for dev) — verify any new route respects the allowlist check, never a wildcard `*` origin.
- **Session token verification**: every authenticated route must verify the HMAC signature *and* check `exp` before trusting the payload — a token that merely decodes without signature/expiry verification is not authenticated.
- **Rate limiting**: any new Worker route gets a rate limit (mirrors `ajch_platform`'s `RATE_LIMITER` KV pattern) — unbounded request handling on a Worker with a database behind it is a standing DoS/cost risk.
- **Redirect target discipline**: the OAuth callback's post-login redirect target is this app's own domain, hardcoded server-side (not reflected from a client-supplied parameter) — an open-redirect via a spoofed return URL is exactly the class of bug OAuth callbacks are prone to.

## Applies from Phase 4 (AI proxy)

- The AI API key lives only inside the Worker's own secret store, read server-side — never in a response body, never in a client-visible env var (`VITE_*` prefixed vars ship to the browser bundle; a secret must never use that prefix).
- Provider-side content-safety/moderation filtering is enabled and non-bypassable (see Content & Community Standards policy) — this is a hard gate on the route shipping, checked here as much as it's a content-policy concern.
- Caching/rate-limiting on the AI proxy route is a security *and* cost concern simultaneously — an unbounded proxy to a paid AI API is a direct financial exposure, not just a UX nicety.

## Output format

Same as `lesson-validator`/`code-reviewer`: `PASS ✓` (what was checked) or `BLOCK ✗` with exact `file:line` + what's wrong, one bullet per finding.
