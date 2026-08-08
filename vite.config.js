import { defineConfig } from "vite";

// Build unique en module ES, Lit bundlé dedans (aucune dépendance runtime
// externe) — fichier final attendu par Lovelace : dist/echo-home-card.js
export default defineConfig({
  build: {
    lib: {
      entry: "src/echo-home-card.js",
      formats: ["es"],
      fileName: () => "echo-home-card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    target: "es2019",
  },
});
