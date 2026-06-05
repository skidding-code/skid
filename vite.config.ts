import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base so the built app works when opened from a file://-style
  // path inside the Tauri / Capacitor native wrappers as well as from the web.
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons/*.png"],
      manifest: {
        name: "Playground — Learn to Code",
        short_name: "Playground",
        description:
          "A hands-on, Swift Playgrounds-style way to learn Python and the web (HTML, CSS, JavaScript) right in your browser.",
        theme_color: "#5b5bd6",
        background_color: "#0f1020",
        display: "standalone",
        orientation: "any",
        start_url: "./",
        scope: "./",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache the app shell, but NOT the heavy Pyodide runtime — those
        // (~12 MB) are cached on first use via runtimeCaching so the initial
        // install stays light.
        globPatterns: ["**/*.{js,css,html,svg,png,woff2,json}"],
        globIgnores: ["pyodide/**"],
        navigateFallbackDenylist: [/^\/pyodide\//],
        runtimeCaching: [
          {
            // Same-origin Pyodide runtime (wasm, stdlib, lock, js): cache-first
            // so Python keeps working fully offline after the first run.
            urlPattern: /\/pyodide\//,
            handler: "CacheFirst",
            options: {
              cacheName: "pyodide-runtime",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true,
            },
          },
        ],
      },
    }),
  ],
  build: {
    target: "es2021",
    sourcemap: false,
  },
});
