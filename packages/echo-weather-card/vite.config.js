import { defineConfig } from "vite";

// Build unique en module ES, Lit bundlé dedans (aucune dépendance runtime
// externe) — fichier final attendu par Lovelace : dist/echo-weather-card.js
export default defineConfig({
  build: {
    lib: {
      entry: "src/echo-weather-card.js",
      formats: ["es"],
      fileName: () => "echo-weather-card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    target: "es2019",
  },
});
