import { defineConfig } from "vite";

// Build unique en module ES, Lit bundlé dedans (aucune dépendance runtime
// externe) — fichier final attendu par Lovelace : dist/echo-player-card.js
export default defineConfig({
  build: {
    lib: {
      entry: "src/echo-player-card.js",
      formats: ["es"],
      fileName: () => "echo-player-card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    target: "es2019",
  },
});
