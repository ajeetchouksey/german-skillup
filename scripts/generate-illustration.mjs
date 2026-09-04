#!/usr/bin/env node
// Generates one lesson illustration via Cloudflare Workers AI (flux-1-schnell)
// at content-authoring time and saves it to public/images/lessons/<id>.jpg.
// Not a live route — run manually or by lesson-writer while drafting a module.
// See .claude/skills/lesson-standard/SKILL.md's illustration section and the
// project plan's Phase 4a for the design this implements.
//
// Usage: node scripts/generate-illustration.mjs <lessonId> "<prompt>"
// Requires env vars: CF_ACCOUNT_ID, CF_AI_API_TOKEN (see .env.example —
// CF_AI_API_TOKEN needs only Account.Workers AI:Edit scope, created separately
// from the Pages-deploy CLOUDFLARE_API_TOKEN, which has no AI scope).

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Defense-in-depth only — the real content-safety gate is that lesson-writer
// always builds this prompt from vetted lesson content, never free-form user
// input. See lesson-standard's content-safety hard rule.
const DENYLIST = [
  /\bnude\b/i, /\bnaked\b/i, /\bsex(ual)?\b/i, /\bporn/i,
  /\bkill(ing)?\b/i, /\bgore\b/i, /\bblood\b/i, /\bnazi\b/i, /\bhitler\b/i,
  /\bslur\b/i, /\bterrorist\b/i, /\bsuicide\b/i, /\bself[- ]harm\b/i,
];

function fail(message) {
  console.error(`generate-illustration: ${message}`);
  process.exit(1);
}

const [, , lessonId, prompt] = process.argv;
if (!lessonId || !prompt) {
  fail('usage: node scripts/generate-illustration.mjs <lessonId> "<prompt>"');
}
if (!/^[a-z0-9-]+$/i.test(lessonId)) {
  fail(`lessonId "${lessonId}" must be alphanumeric/hyphens only (used as a filename)`);
}
for (const rule of DENYLIST) {
  if (rule.test(prompt)) fail(`prompt rejected by content-safety denylist (matched ${rule})`);
}

const accountId = process.env.CF_ACCOUNT_ID;
const apiToken = process.env.CF_AI_API_TOKEN;
if (!accountId) fail("CF_ACCOUNT_ID is not set (see .env.example)");
if (!apiToken) fail("CF_AI_API_TOKEN is not set (see .env.example) — create one with Account.Workers AI:Edit scope");

const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`;

let res;
try {
  res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, steps: 6 }),
  });
} catch (err) {
  fail(`network error calling Workers AI: ${err.message}`);
}

if (!res.ok) {
  const body = await res.text().catch(() => "");
  fail(`Workers AI returned ${res.status}: ${body.slice(0, 500)}`);
}

const data = await res.json().catch(() => null);
const base64Image = data?.result?.image;
if (typeof base64Image !== "string" || base64Image.length === 0) {
  fail(`unexpected response shape (no result.image): ${JSON.stringify(data).slice(0, 500)}`);
}

const outDir = path.resolve("public/images/lessons");
const outPath = path.join(outDir, `${lessonId}.jpg`);
await mkdir(outDir, { recursive: true });
await writeFile(outPath, Buffer.from(base64Image, "base64"));

console.log(`Wrote ${path.relative(process.cwd(), outPath)} (${prompt})`);
