import { defineConfig } from "vite";

// Build unique en module ES, regroupant les 3 cartes (chacune bundlée avec
// Lit, aucune dépendance runtime externe) — fichier final attendu par
// Lovelace/HACS : dist/echo-dashboard.js (voir hacs.json).
export default defineConfig({
  build: {
    lib: {
      entry: "src/echo-dashboard.js",
      formats: ["es"],
      fileName: () => "echo-dashboard.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    target: "es2019",
  },
});
