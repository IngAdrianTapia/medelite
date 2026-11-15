import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

/** Gzip budgets measured on 2026-11-15 after splitting react and motion.
 * JS max was 78,151 and the JS total was 218,870. Photo max was 126,016.
 */
const MAX_JS_GZIP = 90_000;
const TOTAL_JS_GZIP = 240_000;
const MAX_PHOTO_BYTES = 140_000;

const dist = new URL("../dist/", import.meta.url).pathname;
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

if (failures.length > 0) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`budget ok: JS gzip max ${max} (${maxName}), total ${total}, foto max ${photoMax} (${photoName})`);
