import type { Lang } from "./types";

export function parseLocalePath(pathname: string): { lang: Lang | null; path: string } {
  const match = pathname.match(/^\/(en|fr|es)(?=\/|$)/);
  if (!match) return { lang: null, path: pathname || "/" };
  const rest = pathname.slice(match[0].length);
  const path = rest === "" || rest === "/" ? "/" : rest;
  return { lang: match[1] as Lang, path };
}

export function prefixPath(lang: Lang, path: string): string {
  const bare = path.startsWith("/") ? path : `/${path}`;
  if (bare === "/") return `/${lang}`;
  return `/${lang}${bare}`;
}

export function detectNavigatorLanguage(languages: readonly string[]): Lang {
  for (const raw of languages) {
    const code = raw.toLowerCase();
    if (code.startsWith("fr")) return "fr";
    if (code.startsWith("es")) return "es";
    if (code.startsWith("en")) return "en";
  }
  return "en";
}
