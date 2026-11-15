import { describe, expect, it } from "vitest";
import { es } from "./es";
import { en } from "./en";
import { fr } from "./fr";
import { DIRECTORY_LABEL, PHOTO_OF, SERVICE_LABEL, SPECIALTY_LABEL } from "./labels";

/** Spanish function words. Identical strings that contain these are unfinished translations, not names. */
const SPANISH_HINT = /\b(el|la|los|las|del|para|con|una|por|está|son|que|usted|página|cotización)\b/i;

function walk(value: unknown, path: string, out: Map<string, string>): void {
  if (typeof value === "string") {
    out.set(path, value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}.${index}`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      walk(child, path ? `${path}.${key}` : key, out);
    }
  }
}

function flat(value: unknown): Map<string, string> {
  const out = new Map<string, string>();
  walk(value, "", out);
  return out;
}

function walkTrios(value: unknown, path: string, problems: string[]): void {
  if (!value || typeof value !== "object") return;
  const row = value as { es?: unknown; en?: unknown; fr?: unknown };
  if (typeof row.es === "string" && typeof row.en === "string" && typeof row.fr === "string") {
    if (row.es.length > 12 && SPANISH_HINT.test(row.es)) {
      if (row.en === row.es) problems.push(`EN ${path}`);
      if (row.fr === row.es) problems.push(`FR ${path}`);
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    walkTrios(child, path ? `${path}.${key}` : key, problems);
  }
}

describe("i18n coverage", () => {
  it("gives English and French every Spanish key, and does not leave a Spanish sentence untranslated", () => {
    const esMap = flat(es);
    const enMap = flat(en);
    const frMap = flat(fr);
    for (const key of esMap.keys()) {
      expect(enMap.has(key), `missing EN ${key}`).toBe(true);
      expect(frMap.has(key), `missing FR ${key}`).toBe(true);
      const spanish = esMap.get(key) ?? "";
      if (spanish.length > 24 && SPANISH_HINT.test(spanish)) {
        expect(enMap.get(key), `EN still Spanish at ${key}`).not.toBe(spanish);
        expect(frMap.get(key), `FR still Spanish at ${key}`).not.toBe(spanish);
      }
    }
    const problems: string[] = [];
    for (const table of [SERVICE_LABEL, SPECIALTY_LABEL, DIRECTORY_LABEL, PHOTO_OF]) {
      walkTrios(table, "", problems);
    }
    expect(problems).toEqual([]);
  });
});
