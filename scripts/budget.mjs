import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

/** Gzip budgets. 2026-11-16: Leaflet (mapa real, import dinámico, ~43 KiB gzip)
 * sube el total. El tope por archivo se mantiene. Photo max was 126,016.
 */
const MAX_JS_GZIP = 90_000;
const TOTAL_JS_GZIP = 330_000;
const MAX_PHOTO_BYTES = 140_000;

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const assets = join(dist, "assets");
const jsFiles = readdirSync(assets).filter((name) => name.endsWith(".js"));

let total = 0;
let max = 0;
let maxName = "";
for (const name of jsFiles) {
  const gz = gzipSync(readFileSync(join(assets, name))).length;
  total += gz;
  if (gz > max) {
    max = gz;
    maxName = name;
  }
}

const photos = join(dist, "assets/photos");
let photoMax = 0;
let photoName = "";
for (const name of readdirSync(photos)) {
  const size = statSync(join(photos, name)).size;
  if (size > photoMax) {
    photoMax = size;
    photoName = name;
  }
}

const html = readFileSync(join(dist, "index.html"), "utf8");
const failures = [];
if (max > MAX_JS_GZIP) failures.push(`JS gzip ${max} (${maxName}) supera ${MAX_JS_GZIP}`);
if (total > TOTAL_JS_GZIP) failures.push(`JS gzip total ${total} supera ${TOTAL_JS_GZIP}`);
if (photoMax > MAX_PHOTO_BYTES) failures.push(`foto ${photoMax} (${photoName}) supera ${MAX_PHOTO_BYTES}`);
if (!html.includes("script-src 'self'") || !html.includes("frame-src 'none'")) {
  failures.push("falta la CSP esperada en dist/index.html");
}

const videosDir = join(dist, "assets/video");
const MAX_VIDEO_BYTES = 50_000_000;
for (const name of readdirSync(videosDir).filter((n) => n.endsWith(".mp4") || n.endsWith(".webm"))) {
  const size = statSync(join(videosDir, name)).size;
  if (size > MAX_VIDEO_BYTES) failures.push(`video ${size} (${name}) supera ${MAX_VIDEO_BYTES}`);
}

if (failures.length > 0) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`budget ok: JS gzip max ${max} (${maxName}), total ${total}, foto max ${photoMax} (${photoName})`);
