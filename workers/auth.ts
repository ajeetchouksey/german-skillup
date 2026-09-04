// Dedicated Cloudflare Worker for german_skill's Google login — deliberately
// isolated from ajch_platform's workers/subscribe.ts (separate Worker, separate
// D1 database), but reuses the SAME Google OAuth client (its callback URL is
// registered as an additional authorized redirect URI on that client) and
// mirrors that Worker's session-token design (HMAC-SHA256, JWT-shaped,
// verified on every /profile/* call) — see security-standard's Phase 3 section
// for the rules this file must keep satisfying.
//
// Scope, on purpose: Google login only (no GitHub — this app's audience is
// non-technical, per CLAUDE.md), plus an optional writing-feedback route
// (Phase 4b, below). No comments, no GitHub Gist sync — none of that exists
// in this app.

export interface Env {
  DB: D1Database;
  RATE_LIMITER: KVNamespace;
  AI: Ai;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  SESSION_SIGNING_KEY?: string;
}

const PROD_ORIGIN = "https://hallo.aaryaai.dev";
const LOCALHOST_RE = /^http:\/\/localhost:\d+$/;

function isAllowedOrigin(origin: string): boolean {
  return origin === PROD_ORIGIN || LOCALHOST_RE.test(origin);
}

// ── base64url + HMAC session token (mirrors ajch_platform's workers/subscribe.ts) ──

function b64url(s: string): string {
  return btoa(s).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64urlBytes(buf: Uint8Array): string {
  return btoa(String.fromCharCode(...buf)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64urlDecodeToString(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  return atob(padded);
}

function b64urlDecodeToBytes(s: string): Uint8Array {
  return Uint8Array.from(b64urlDecodeToString(s), (c) => c.charCodeAt(0));
}

interface SessionPayload {
  provider: "google";
  id: string;
  name: string | null;
  email?: string;
  avatar_url: string;
  exp: number; // unix seconds
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signSessionToken(payload: SessionPayload, secret: string): Promise<string> {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  const signingInput = `${header}.${body}`;
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signingInput));
  return `${signingInput}.${b64urlBytes(new Uint8Array(sig))}`;
}

/** Verifies signature + expiry. Returns the embedded profile, or null if invalid/expired/malformed. */
async function verifySessionToken(token: string, secret: string): Promise<SessionPayload | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  try {
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC", key, b64urlDecodeToBytes(sig) as BufferSource,
      new TextEncoder().encode(`${header}.${body}`),
    );
    if (!valid) return null;
    const payload = JSON.parse(b64urlDecodeToString(body)) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return null;
    if (payload.provider !== "google") return null;
    return payload;
  } catch {
    return null;
  }
}

async function authenticateProfileRequest(request: Request, env: Env): Promise<SessionPayload | null> {
  if (!env.SESSION_SIGNING_KEY) return null;
  const match = /^Bearer (.+)$/.exec(request.headers.get("Authorization") ?? "");
  if (!match) return null;
  return verifySessionToken(match[1], env.SESSION_SIGNING_KEY);
}

// ── CORS / JSON helpers ──────────────────────────────────────────────────────

function corsHeadersFor(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function json(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeadersFor(origin), "Content-Type": "application/json" },
  });
}

// ── Rate limiting (windowed counters in KV) ──────────────────────────────────

async function checkWindowedRateLimit(
  env: Env,
  key: string,
  windowMs: number,
  max: number,
  ttlSeconds: number,
): Promise<boolean> {
  const bucket = Math.floor(Date.now() / windowMs);
  const kvKey = `${key}:${bucket}`;
  const current = parseInt((await env.RATE_LIMITER.get(kvKey)) ?? "0", 10);
  if (current >= max) return false;
  await env.RATE_LIMITER.put(kvKey, String(current + 1), { expirationTtl: ttlSeconds });
  return true;
}

/** Read-only count for the same windowed-bucket scheme above — never increments,
 * so /ai/quota can report usage without itself consuming a slot. */
async function peekWindowedCount(env: Env, key: string, windowMs: number): Promise<number> {
  const bucket = Math.floor(Date.now() / windowMs);
  const current = await env.RATE_LIMITER.get(`${key}:${bucket}`);
  return parseInt(current ?? "0", 10);
}

// ── Google OAuth callback ─────────────────────────────────────────────────────

const OAUTH_STATE_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SESSION_TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

async function handleOAuthGoogleCallback(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code") ?? "";
  const state = url.searchParams.get("state") ?? "";

  if (!code || code.length > 512 || !state || !OAUTH_STATE_RE.test(state)) {
    return Response.redirect(`${PROD_ORIGIN}/#auth_error=invalid_request&state=${encodeURIComponent(state)}`, 302);
  }
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.SESSION_SIGNING_KEY) {
    return Response.redirect(`${PROD_ORIGIN}/#auth_error=server_misconfigured&state=${encodeURIComponent(state)}`, 302);
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${url.origin}/oauth/google/callback`,
      }),
    });
    const tokenData = (await tokenRes.json()) as Record<string, unknown>;
    if (typeof tokenData.access_token !== "string") {
      return Response.redirect(`${PROD_ORIGIN}/#auth_error=access_denied&state=${encodeURIComponent(state)}`, 302);
    }

    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (!userRes.ok) {
      return Response.redirect(`${PROD_ORIGIN}/#auth_error=profile_fetch_failed&state=${encodeURIComponent(state)}`, 302);
    }
    const profile = (await userRes.json()) as { sub: string; name?: string; email?: string; picture?: string };

    const sessionToken = await signSessionToken({
      provider: "google",
      id: profile.sub,
      name: profile.name ?? null,
      email: profile.email,
      avatar_url: profile.picture ?? "",
      exp: Math.floor(Date.now() / 1000) + SESSION_TOKEN_TTL_SECONDS,
    }, env.SESSION_SIGNING_KEY);

    return Response.redirect(`${PROD_ORIGIN}/#auth_token=${encodeURIComponent(sessionToken)}&state=${encodeURIComponent(state)}`, 302);
  } catch {
    return Response.redirect(`${PROD_ORIGIN}/#auth_error=server_error&state=${encodeURIComponent(state)}`, 302);
  }
}

// ── /profile/load, /profile/save — D1-backed cross-device progress sync ──────

async function handleProfileLoad(request: Request, env: Env, origin: string): Promise<Response> {
  const identity = await authenticateProfileRequest(request, env);
  if (!identity) return json({ error: "unauthorized" }, 401, origin);

  try {
    const row = await env.DB.prepare(
      "SELECT progress FROM user_progress WHERE provider = ?1 AND provider_id = ?2",
    ).bind(identity.provider, identity.id).first<{ progress: string }>();
    return json({ progress: row ? JSON.parse(row.progress) : null }, 200, origin);
  } catch (err) {
    console.error("profile-load-failed:", (err as Error).message);
    return json({ error: "Service temporarily unavailable" }, 503, origin);
  }
}

const MAX_PROFILE_PAYLOAD_BYTES = 100 * 1024;

async function handleProfileSave(request: Request, env: Env, origin: string): Promise<Response> {
  const identity = await authenticateProfileRequest(request, env);
  if (!identity) return json({ error: "unauthorized" }, 401, origin);

  if (!(await checkWindowedRateLimit(env, `pr:${identity.id}`, 60_000, 10, 120))) {
    return json({ error: "rate_limited" }, 429, origin);
  }

  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return json({ error: "Invalid body" }, 400, origin);
  }
  if (bodyText.length > MAX_PROFILE_PAYLOAD_BYTES) {
    return json({ error: "Payload too large" }, 413, origin);
  }
  try {
    JSON.parse(bodyText);
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO user_progress (provider, provider_id, progress, updated_at) VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(provider, provider_id) DO UPDATE SET progress = excluded.progress, updated_at = excluded.updated_at`,
    ).bind(identity.provider, identity.id, bodyText, new Date().toISOString()).run();
    return json({ status: "ok" }, 200, origin);
  } catch (err) {
    console.error("profile-save-failed:", (err as Error).message);
    return json({ error: "Service temporarily unavailable" }, 503, origin);
  }
}

// ── /writing/check, /writing/report, /reading/check, /reading/report ─────────
// (Phase 4b) — optional LLM feedback on a learner's writing or read-aloud
// transcript. Anonymous by design (no login required, mirrors FR-3.3 — the
// app stays fully usable without signing in). Runs on Cloudflare Workers AI
// (open models — llama-3.1-8b-instruct-fast for the coaching reply,
// llama-guard-3-8b as the content-safety classifier below) via a plain [ai]
// binding — NOT a paid provider: no API key to manage, and usage draws from
// the account's free daily neuron allowance (this is an open-source project,
// and both routes are anonymous/user-triggered, so they must never be able
// to run up a bill on their own). There's deliberately no response caching —
// free-text/transcript submissions have near-zero repeat-hit rate, so caching
// would add complexity for no real savings.
//
// Rate limiting is three independent layers, checked in this order:
// 1. An hourly per-IP burst cap (protects against one client hammering).
// 2. A daily cap keyed by *identity when logged in, IP when anonymous* (see
//    identityOrCapKey) — the closest available proxy to "per user" without
//    requiring login, and immune to a logged-in user resetting it by
//    switching networks.
// 3. A shared daily budget across BOTH features combined (see
//    GLOBAL_DAILY_AI_BUDGET) — now that there are two AI-calling routes
//    sharing one account-wide free neuron pool (also shared with whatever
//    ajch_platform draws on this same Cloudflare account), no single feature
//    should be able to silently consume the whole thing.
//
// Observability, not a hard cutoff beyond the budget above: every call logs
// a one-line JSON record (status + rough char counts) that `wrangler
// tail`/Workers Logs surfaces in real time, and Cloudflare's own dashboard
// already tracks Workers AI neuron consumption per model.

// Per-user daily cap for each of /writing/check and /reading/check (separate
// pools — see identityOrCapKey) — also the number /ai/quota reports against.
const DAILY_FEEDBACK_LIMIT = 15;

const MAX_WRITING_TEXT_LENGTH = 2000;
const WRITING_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
const MODERATION_MODEL = "@cf/meta/llama-guard-3-8b";
const WRITING_DECLINE_MESSAGE =
  "This doesn't look like a German-writing sample I can help with — please share a piece of your own German writing and I'll give feedback on it.";
const WRITING_SYSTEM_PROMPT = `You are a friendly, encouraging German-writing coach for A1-C1 learners on Deutsch SkillUp.
Given a short piece of the learner's German writing:
- Write your entire reply in English — the learner is learning German, not fluent in it yet, so an all-German
  explanation defeats the point. Quote the German words/phrases you're correcting, but explain them in English.
- Point out the 2-4 most important real errors (grammar, case, word order, verb conjugation) — not every tiny nitpick.
- Explain each briefly and give the corrected form. Wrap ONLY the specific German words being compared — never a
  whole sentence or your English explanation — like this: the wrong form in [wrong]...[/wrong], the corrected form in
  [right]...[/right]. Example: "[wrong]ich will[/wrong] sounds blunt here; use [right]ich möchte[/right] instead."
- Use warm, normalizing language (e.g. "a common mix-up at this level"), never a tone implying failure.
- Keep the whole reply under 150 words.
- If the text is not an attempt at German-writing practice (e.g. it's abusive, off-topic, or in a different task entirely), politely decline and ask for a German writing sample instead — do not engage with the off-topic content.`;

// Shared across writing + reading — see the block comment above.
const GLOBAL_DAILY_AI_BUDGET = 120; // "feature calls" (moderation + coaching pair), not raw AI.run() invocations

function clientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? "unknown";
}

/** "Per user" key for the daily cap: the logged-in identity when a valid
 * session token is present (stable across networks/devices for that person),
 * IP otherwise. Login is never required to use these routes (FR-3.3) — this
 * is purely an opportunistic upgrade when a token happens to be attached. */
async function identityOrCapKey(request: Request, env: Env): Promise<string> {
  const identity = await authenticateProfileRequest(request, env);
  return identity ? `${identity.provider}:${identity.id}` : clientIp(request);
}

async function checkGlobalAiBudget(env: Env): Promise<boolean> {
  return checkWindowedRateLimit(env, "ai-budget-global", 24 * 60 * 60_000, GLOBAL_DAILY_AI_BUDGET, 86_400);
}

/** Provider-side content-safety gate (NFR-10's Phase 4 hard gate): a real
 * classifier model, not just a prompt instruction — the writing-coach model
 * below is open-weight and easier to jailbreak than a provider like Anthropic
 * with its own built-in safety training, so this call is the actual control,
 * not defense-in-depth. Llama Guard's own output convention is a first line
 * of "safe"/"unsafe" (fails open to "safe" on any error — a false negative
 * here just means the request proceeds to the still-present system-prompt
 * instruction, never a hard failure of the feature). */
async function isSafeInput(userText: string, env: Env): Promise<boolean> {
  try {
    const result = (await env.AI.run(MODERATION_MODEL, {
      messages: [{ role: "user", content: userText }],
    })) as AiTextGenerationOutput;
    const verdict = result.response?.trim().toLowerCase() ?? "";
    return !verdict.startsWith("unsafe");
  } catch {
    return true;
  }
}

async function callWorkersAi(
  model: string,
  systemPrompt: string,
  userText: string,
  env: Env,
  eventName: string,
): Promise<string | null> {
  try {
    const result = (await env.AI.run(model, {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userText },
      ],
      max_tokens: 400,
    })) as AiTextGenerationOutput;
    const feedback = result.response;
    console.log(JSON.stringify({
      event: eventName,
      status: feedback ? "ok" : "empty",
      model,
      inputChars: userText.length,
      outputChars: feedback?.length ?? 0,
    }));
    return feedback && feedback.trim() ? feedback : null;
  } catch (err) {
    console.error(JSON.stringify({ event: eventName, status: "error", message: (err as Error).message }));
    return null;
  }
}

async function handleWritingCheck(request: Request, env: Env, origin: string): Promise<Response> {
  if (!(await checkWindowedRateLimit(env, `wc:${clientIp(request)}`, 60 * 60_000, 8, 3600))) {
    return json({ error: "rate_limited" }, 429, origin);
  }
  if (!(await checkWindowedRateLimit(env, `wcd:${await identityOrCapKey(request, env)}`, 24 * 60 * 60_000, DAILY_FEEDBACK_LIMIT, 86_400))) {
    return json({ error: "daily_limit_reached" }, 429, origin);
  }
  if (!(await checkGlobalAiBudget(env))) {
    return json({ error: "daily_budget_reached" }, 429, origin);
  }

  let body: { text?: unknown };
  try {
    body = (await request.json()) as { text?: unknown };
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin);
  }
  if (typeof body.text !== "string" || !body.text.trim()) {
    return json({ error: "Missing text" }, 400, origin);
  }
  if (body.text.length > MAX_WRITING_TEXT_LENGTH) {
    return json({ error: "Text too long" }, 413, origin);
  }

  if (!(await isSafeInput(body.text, env))) {
    return json({ feedback: WRITING_DECLINE_MESSAGE }, 200, origin);
  }

  const feedback = await callWorkersAi(WRITING_MODEL, WRITING_SYSTEM_PROMPT, body.text, env, "writing-check");
  if (feedback === null) {
    return json({ error: "Service temporarily unavailable" }, 503, origin);
  }
  return json({ feedback }, 200, origin);
}

// NOTE: text/feedback here are client-supplied and not verified against an
// actual prior /writing/check call — a caller could in principle POST an
// arbitrary pair. Low severity (rate-limited, no injection vector, this is a
// human-review queue not an automated action), but don't treat rows in
// flagged_writing_feedback as verified provenance without keeping that in mind.
async function handleWritingReport(request: Request, env: Env, origin: string): Promise<Response> {
  if (!(await checkWindowedRateLimit(env, `wr:${clientIp(request)}`, 60 * 60_000, 8, 3600))) {
    return json({ error: "rate_limited" }, 429, origin);
  }

  let body: { text?: unknown; feedback?: unknown };
  try {
    body = (await request.json()) as { text?: unknown; feedback?: unknown };
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin);
  }
  if (typeof body.text !== "string" || typeof body.feedback !== "string") {
    return json({ error: "Missing text or feedback" }, 400, origin);
  }
  if (body.text.length > MAX_WRITING_TEXT_LENGTH || body.feedback.length > MAX_WRITING_TEXT_LENGTH) {
    return json({ error: "Payload too large" }, 413, origin);
  }

  try {
    await env.DB.prepare(
      "INSERT INTO flagged_writing_feedback (text, feedback, created_at) VALUES (?1, ?2, ?3)",
    ).bind(body.text, body.feedback, new Date().toISOString()).run();
    return json({ status: "ok" }, 200, origin);
  } catch (err) {
    console.error("writing-report-failed:", (err as Error).message);
    return json({ error: "Service temporarily unavailable" }, 503, origin);
  }
}

// ── /ai/quota — read-only peek at today's remaining writing/reading checks ───
// No AI call, no rate limit of its own (cheap KV reads) — lets the UI show
// "X of 15 left today" before the learner even taps "Get AI Feedback".
async function handleAiQuota(request: Request, env: Env, origin: string): Promise<Response> {
  const key = await identityOrCapKey(request, env);
  const dayMs = 24 * 60 * 60_000;
  const [writingUsed, readingUsed] = await Promise.all([
    peekWindowedCount(env, `wcd:${key}`, dayMs),
    peekWindowedCount(env, `rcd:${key}`, dayMs),
  ]);
  const quotaFor = (used: number) => ({
    used,
    limit: DAILY_FEEDBACK_LIMIT,
    remaining: Math.max(0, DAILY_FEEDBACK_LIMIT - used),
  });
  return json({ writing: quotaFor(writingUsed), reading: quotaFor(readingUsed) }, 200, origin);
}

// ── /reading/check, /reading/report — optional LLM read-aloud feedback ───────
// Same shape as /writing/check above, but the input is the transcript the
// browser's own Web Speech API already produced locally during read-aloud
// practice (ReadAloudPractice.tsx) — never raw audio (NFR-4: audio is never
// transmitted or stored server-side, only its already-local text transcript).

const MAX_READING_ITEMS = 30;
const MAX_READING_ITEM_LENGTH = 300; // per target/heard string
const READING_DECLINE_MESSAGE =
  "This doesn't look like a German read-aloud transcript I can help with — try the read-aloud practice again and ask for feedback on that.";
const READING_MODEL = WRITING_MODEL;
const READING_SYSTEM_PROMPT = `You are a friendly, encouraging German pronunciation coach for A1-C1 learners on Deutsch SkillUp.
You'll get a list of sentence pairs: the target German sentence the learner was asked to read aloud, and what speech
recognition heard them say.
- Write your entire reply in English — the learner is learning German, not fluent in it yet, so an all-German
  explanation defeats the point. Quote the German words/sounds you're pointing out, but explain them in English.
- Look for patterns across the pairs (not just one sentence) — recurring sound/word confusions, likely mispronounced
  words, or words consistently dropped or substituted. Speech recognition is imperfect, so don't over-read single
  small mismatches; focus on real recurring patterns.
- Point out the 2-4 most useful patterns, explain briefly, and give a tip for each. Wrap ONLY the specific German
  words being compared — never a whole sentence or your English explanation — like this: what the learner said in
  [wrong]...[/wrong], the correct target word in [right]...[/right]. Example: "You said [wrong]ist[/wrong] instead of
  [right]ißt[/right] — a common ei/i mix-up."
- Use warm, normalizing language (e.g. "a common mix-up at this level"), never a tone implying failure.
- Keep the whole reply under 150 words.
- If this doesn't look like a real German read-aloud transcript (e.g. it's abusive, empty, or unrelated content),
  politely decline and ask them to try the read-aloud practice again — do not engage with off-topic content.`;

interface ReadingItem { target: string; heard: string }

function formatReadingTranscript(items: ReadingItem[]): string {
  return items.map((it, i) => `${i + 1}. Target: "${it.target}" | Heard: "${it.heard}"`).join("\n");
}

function parseReadingItems(value: unknown): ReadingItem[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_READING_ITEMS) return null;
  const items: ReadingItem[] = [];
  for (const raw of value) {
    if (
      typeof raw !== "object" || raw === null ||
      typeof (raw as { target?: unknown }).target !== "string" ||
      typeof (raw as { heard?: unknown }).heard !== "string"
    ) return null;
    const target = (raw as { target: string }).target;
    const heard = (raw as { heard: string }).heard;
    if (target.length > MAX_READING_ITEM_LENGTH || heard.length > MAX_READING_ITEM_LENGTH) return null;
    items.push({ target, heard });
  }
  return items;
}

async function handleReadingCheck(request: Request, env: Env, origin: string): Promise<Response> {
  if (!(await checkWindowedRateLimit(env, `rc:${clientIp(request)}`, 60 * 60_000, 8, 3600))) {
    return json({ error: "rate_limited" }, 429, origin);
  }
  if (!(await checkWindowedRateLimit(env, `rcd:${await identityOrCapKey(request, env)}`, 24 * 60 * 60_000, DAILY_FEEDBACK_LIMIT, 86_400))) {
    return json({ error: "daily_limit_reached" }, 429, origin);
  }
  if (!(await checkGlobalAiBudget(env))) {
    return json({ error: "daily_budget_reached" }, 429, origin);
  }

  let body: { items?: unknown };
  try {
    body = (await request.json()) as { items?: unknown };
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin);
  }
  const items = parseReadingItems(body.items);
  if (!items) {
    return json({ error: "Missing or invalid items" }, 400, origin);
  }

  // Moderate the full formatted transcript (target + heard together) — this
  // is a public POST endpoint with no server-side way to verify "target"
  // actually came from real ReadingPassage data rather than an arbitrary
  // caller, so both sides go through the classifier, always, unconditionally
  // (an all-empty "heard" payload must not skip this check).
  const transcript = formatReadingTranscript(items);
  if (!(await isSafeInput(transcript, env))) {
    return json({ feedback: READING_DECLINE_MESSAGE }, 200, origin);
  }

  const feedback = await callWorkersAi(READING_MODEL, READING_SYSTEM_PROMPT, transcript, env, "reading-check");
  if (feedback === null) {
    return json({ error: "Service temporarily unavailable" }, 503, origin);
  }
  return json({ feedback }, 200, origin);
}

// Same unverified-provenance caveat as handleWritingReport above.
async function handleReadingReport(request: Request, env: Env, origin: string): Promise<Response> {
  if (!(await checkWindowedRateLimit(env, `rr:${clientIp(request)}`, 60 * 60_000, 8, 3600))) {
    return json({ error: "rate_limited" }, 429, origin);
  }

  let body: { items?: unknown; feedback?: unknown };
  try {
    body = (await request.json()) as { items?: unknown; feedback?: unknown };
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin);
  }
  const items = parseReadingItems(body.items);
  if (!items || typeof body.feedback !== "string") {
    return json({ error: "Missing or invalid items/feedback" }, 400, origin);
  }
  if (body.feedback.length > MAX_WRITING_TEXT_LENGTH) {
    return json({ error: "Payload too large" }, 413, origin);
  }

  try {
    await env.DB.prepare(
      "INSERT INTO flagged_reading_feedback (transcript, feedback, created_at) VALUES (?1, ?2, ?3)",
    ).bind(formatReadingTranscript(items), body.feedback, new Date().toISOString()).run();
    return json({ status: "ok" }, 200, origin);
  } catch (err) {
    console.error("reading-report-failed:", (err as Error).message);
    return json({ error: "Service temporarily unavailable" }, 503, origin);
  }
}

// ── Router ─────────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const origin = request.headers.get("Origin") ?? "";

    // OAuth callback is a top-level browser redirect (no Origin header to check —
    // the browser navigated here directly from Google, not via fetch/XHR).
    if (pathname === "/oauth/google/callback" && request.method === "GET") {
      return handleOAuthGoogleCallback(request, env);
    }

    if (request.method === "OPTIONS") {
      if (!isAllowedOrigin(origin)) return new Response(null, { status: 403 });
      return new Response(null, { headers: corsHeadersFor(origin) });
    }

    if (!isAllowedOrigin(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    if (pathname === "/ai/quota" && request.method === "GET") return handleAiQuota(request, env, origin);
    if (pathname === "/profile/load" && request.method === "GET") return handleProfileLoad(request, env, origin);
    if (pathname === "/profile/save" && request.method === "POST") return handleProfileSave(request, env, origin);
    if (pathname === "/writing/check" && request.method === "POST") return handleWritingCheck(request, env, origin);
    if (pathname === "/writing/report" && request.method === "POST") return handleWritingReport(request, env, origin);
    if (pathname === "/reading/check" && request.method === "POST") return handleReadingCheck(request, env, origin);
    if (pathname === "/reading/report" && request.method === "POST") return handleReadingReport(request, env, origin);

    return json({ error: "not_found" }, 404, origin);
  },
};
