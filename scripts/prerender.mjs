import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { generateSW } from "workbox-build";
import { render } from "../dist-ssr/entry-server.js";

const SPECIALTY_PATHS = [
  "algology", "anesthesiology", "angiology", "cardiology", "bariatric", "cardiothoracic",
  "endoscopic-surgery", "general-surgery", "maxillofacial", "surgical-oncology", "gyn-oncology",
  "pediatric-surgery", "plastic", "spine", "gastroenterology", "geriatrics", "gynecology",
  "hematology", "infectious-disease", "critical-care", "rehab", "internal-medicine", "nephrology",
  "neonatology", "pulmonology", "neurosurgery", "neurology", "ophthalmology", "oncology", "ent",
  "pediatrics", "orthopedics", "urology",
  "dermatology", "endocrinology", "general-practice",
];

const dist = new URL("../dist/", import.meta.url);
const template = readFileSync(new URL("index.html", dist), "utf8");

const HTML_LANG = { es: "es-MX", en: "en-CA", fr: "fr-CA" };

async function writePage(route, filename, lang) {
  const html = await render(route, lang);
  const marker = route === "/404" ? "404" : route;
  const page = template
    .replace(/<html lang="[^"]*">/, `<html lang="${HTML_LANG[lang]}">`)
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-prerender="${marker}" data-lang="${lang}">${html}</div>`,
    );
  const file = join(dist.pathname, filename);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
}

const ROUTES = [
  ["/", "index.html"],
  ["/hospital-joya", "hospital-joya/index.html"],
  ["/galeria", "galeria/index.html"],
  ["/red", "red/index.html"],
  ...["marina", "riviera", "guadalajara", "sma", "queretaro", "cancun", "playa", "chapala", "penita"].map((id) => [`/red/${id}`, `red/${id}/index.html`]),
  ["/especialidades", "especialidades/index.html"],
  ...SPECIALTY_PATHS.map((id) => [`/especialidades/${id}`, `especialidades/${id}/index.html`]),
  ["/bariatrica", "bariatrica/index.html"],
  ["/vuelos", "vuelos/index.html"],
  ["/seguros", "seguros/index.html"],
  ["/que-es", "que-es/index.html"],
  ["/canada", "canada/index.html"],
  ["/preparacion", "preparacion/index.html"],
  ["/ruta", "ruta/index.html"],
  ["/comparar", "comparar/index.html"],
  ["/mapa", "mapa/index.html"],
  ["/equipo", "equipo/index.html"],
  ["/hospitales", "hospitales/index.html"],
  ["/privacy", "privacy/index.html"],
  ["/privacidad", "privacidad/index.html"],
  ["/terms", "terms/index.html"],
  ["/terminos", "terminos/index.html"],
];

for (const [route, filename] of ROUTES) {
  await writePage(route, filename, "en");
  for (const lang of ["es", "en", "fr"]) {
    const prefixed = route === "/" ? `/${lang}` : `/${lang}${route}`;
    const file = route === "/" ? `${lang}/index.html` : `${lang}/${filename}`;
    await writePage(prefixed, file, lang);
  }
}
await writePage("/404", "404.html", "en");

const sw = await generateSW({
  globDirectory: dist.pathname,
  globPatterns: ["**/*.{js,css,html,svg,png,webmanifest,ttf,woff2,txt}"],
  globIgnores: ["**/*.{mp3,map}"],
  swDest: join(dist.pathname, "sw.js"),
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  navigateFallback: "index.html",
  navigateFallbackDenylist: [/^\/assets\//],
});

console.log(`prerendered pages, service worker precache ${sw.count} files`);
