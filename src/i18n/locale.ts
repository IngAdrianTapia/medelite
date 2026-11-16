import type { Lang } from "./types";

/** Language of a first visit with no path, query or saved choice. */
export const DEFAULT_LANG: Lang = "en";

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
