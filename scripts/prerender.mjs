import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateSW } from "workbox-build";
import { render } from "../dist-ssr/entry-server.js";
import { PRERENDER_ROUTES } from "./routes.mjs";
import { sitemapXml } from "./sitemap.mjs";

const dist = new URL("../dist/", import.meta.url);
const distDir = fileURLToPath(dist);
const template = readFileSync(new URL("index.html", dist), "utf8");

const HTML_LANG = { es: "es-MX", en: "en-CA", fr: "fr-CA" };

async function writePage(route, filename, lang) {
  const html = await render(route, lang);
  // Fail the build if a lazy route regresses to the Suspense placeholder.
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  if (!/<h1\b[^>]*>[\s\S]*?\S[\s\S]*?<\/h1>/.test(main) || /<p class="text-sm text-muted">…<\/p>/.test(main)) {
    throw new Error(`Static page has no real heading: ${route} (${lang})`);
  }
  const marker = route === "/404" ? "404" : route;
  const page = template
    .replace(/<html lang="[^"]*">/, `<html lang="${HTML_LANG[lang]}">`)
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-prerender="${marker}" data-lang="${lang}">${html}</div>`,
    );
  const file = join(distDir, filename);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
}

const icoPath = join(distDir, "favicon.ico");
if (!existsSync(icoPath) || statSync(icoPath).size < 32) {
  throw new Error("dist/favicon.ico is missing. public/favicon.ico must be a real icon.");
}
const robots = readFileSync(join(distDir, "robots.txt"), "utf8");
if (!robots.includes("Sitemap: https://medelite.com.mx/sitemap.xml")) {
  throw new Error("dist/robots.txt does not reference the sitemap");
}

for (const [route, filename] of PRERENDER_ROUTES) {
  await writePage(route, filename, "en");
  for (const lang of ["es", "en", "fr"]) {
    const prefixed = route === "/" ? `/${lang}` : `/${lang}${route}`;
    const file = route === "/" ? `${lang}/index.html` : `${lang}/${filename}`;
    await writePage(prefixed, file, lang);
  }
}
await writePage("/404", "404.html", "en");

const sitemap = sitemapXml(PRERENDER_ROUTES.map(([route]) => route));
const locs = sitemap.match(/<loc>/g) ?? [];
if (locs.length !== PRERENDER_ROUTES.length * 3) {
  throw new Error(`sitemap has ${locs.length} urls, expected ${PRERENDER_ROUTES.length * 3}`);
}
writeFileSync(join(distDir, "sitemap.xml"), sitemap);

const sw = await generateSW({
  globDirectory: distDir,
  globPatterns: ["**/*.{js,css,html,svg,png,ico,webmanifest,ttf,woff2,txt}"],
  globIgnores: ["**/*.{mp3,map}"],
  swDest: join(distDir, "sw.js"),
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  navigateFallback: "index.html",
  navigateFallbackDenylist: [/^\/assets\//],
});

console.log(`prerendered pages, sitemap ${locs.length} urls, service worker precache ${sw.count} files`);
