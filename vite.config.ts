import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Served on the custom domain hallo.aaryaai.dev (Cloudflare Pages, project
// ajch-hallo), so base is "/" rather than a subpath. public/CNAME is kept
// only for the GitHub Pages rollback path (.github/workflows/deploy.yml).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  resolve: {
    // Mirrors the "@/*" path mapping declared in tsconfig.app.json.
    // Vite/esbuild do NOT read tsconfig "paths" automatically, so this
    // alias must be kept in sync with tsconfig.app.json manually.
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
