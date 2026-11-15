import { copyFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";

/** Motion sets element styles, so style-src allows inline styles.
 * script-src stays 'self': no inline scripts and no third-party script hosts.
 * frame-ancestors is omitted: a meta CSP ignores it. GitHub Pages cannot set it as a header.
 * frame-src 'none' is honored from this meta tag.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "form-action mailto:",
  "frame-src 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      includeAssets: ["assets/brand/favicon-32.png", "assets/brand/apple-touch-icon.png"],
      manifest: {
        name: "MedElite International Health",
        short_name: "MedElite",
        description:
          "MedElite International Health, con sede en Vancouver, lo conecta con hospitales de primer nivel y especialistas reconocidos en México.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#F8F9FA",
        theme_color: "#0A2540",
        lang: "es-MX",
        icons: [
          { src: "/assets/brand/favicon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/assets/brand/medelite-emblem-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/assets/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/assets\//],
        globPatterns: ["**/*.{js,css,html,svg,png,webmanifest,ttf,woff2}"],
      },
    }),
    {
      name: "csp-and-spa-fallback",
      apply: "build",
      transformIndexHtml(html) {
        return html.replace("</head>", `  <meta http-equiv="Content-Security-Policy" content="${CSP}" />\n  </head>`);
      },
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
  build: {
    sourcemap: false,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("motion")) return "motion";
          if (id.includes("react-dom") || id.includes("react-router") || id.includes("/react/")) return "react";
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
