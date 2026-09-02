import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Served on the custom domain hallo.aaryaai.dev (see public/CNAME), so base
// is "/" rather than a GitHub Pages project-site subpath.
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
