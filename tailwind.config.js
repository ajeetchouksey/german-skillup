/** @type {import('tailwindcss').Config} */
// Tailwind v4: design tokens (colors, radius, shadow) live in the CSS-first
// `@theme` block in src/index.css — that's the single source of truth for
// the AaryaAI brand palette shared with ajch_platform. This file is kept
// only for the content glob; nothing here is loaded (no `@config` directive
// references it), so don't add theme.extend colors here.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
};
