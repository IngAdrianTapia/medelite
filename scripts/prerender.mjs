import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { generateSW } from "workbox-build";
import { render } from "../dist-ssr/entry-server.js";

const dist = new URL("../dist/", import.meta.url);
const template = readFileSync(new URL("index.html", dist), "utf8");

function writePage(route, filename) {
  const html = render(route);
  const marker = route === "/404" ? "404" : route;
  const page = template.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerender="${marker}">${html}</div>`,
  );
  const file = join(dist.pathname, filename);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
}

writePage("/", "index.html");
writePage("/red", "red/index.html");
for (const id of ["marina", "riviera", "guadalajara", "sma", "queretaro", "cancun", "playa", "chapala", "penita"]) {
  writePage(`/red/${id}`, `red/${id}/index.html`);
}
writePage("/especialidades", "especialidades/index.html");
writePage("/bariatrica", "bariatrica/index.html");
writePage("/vuelos", "vuelos/index.html");
writePage("/seguros", "seguros/index.html");
writePage("/que-es", "que-es/index.html");
writePage("/preparacion", "preparacion/index.html");
writePage("/privacy", "privacy/index.html");
writePage("/privacidad", "privacidad/index.html");
writePage("/terms", "terms/index.html");
writePage("/terminos", "terminos/index.html");
writePage("/404", "404.html");

const sw = await generateSW({
  globDirectory: dist.pathname,
  globPatterns: ["**/*.{js,css,html,svg,png,webmanifest,ttf,txt}"],
  globIgnores: ["**/*.{mp3,map}"],
  swDest: join(dist.pathname, "sw.js"),
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  navigateFallback: "index.html",
  navigateFallbackDenylist: [/^\/assets\//],
});

console.log(`prerendered pages, service worker precache ${sw.count} files`);
