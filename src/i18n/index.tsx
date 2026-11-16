/* Context module: the hook is exported next to the provider. */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { DEFAULT_LANG, parseLocalePath } from "./locale";
import type { Lang, Messages } from "./types";

export function messagesFor(lang: Lang): Messages {
  if (lang === "en") return en;
  if (lang === "fr") return fr;
  return es;
}

export function readLang(): Lang {
  if (typeof window === "undefined") {
    const baked = (globalThis as { __ME_LANG?: Lang }).__ME_LANG;
    return baked === "es" || baked === "fr" || baked === "en" ? baked : "en";
  }
  const fromPath = parseLocalePath(window.location.pathname).lang;
  if (fromPath) return fromPath;
  const query = new URLSearchParams(window.location.search).get("lang");
  if (query === "en" || query === "fr" || query === "es") return query;
  try {
    const stored = window.localStorage.getItem("me-lang");
    if (stored === "en" || stored === "fr" || stored === "es") return stored;
  } catch {
    /* private mode */
  }
  // The audience is Canadian: a first visit with no saved choice always opens in English,
  // whatever the browser language (es-MX included). ES and FR stay one click away.
  return DEFAULT_LANG;
}

interface I18nValue {
  lang: Lang;
  m: Messages;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? readLang);
  const messages = useMemo(() => messagesFor(lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang);
    try {
      window.localStorage.setItem("me-lang", lang);
    } catch {
      /* private mode */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const value = useMemo<I18nValue>(() => ({ lang, m: messages, setLang }), [lang, messages, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used within I18nProvider");
  return value;
}

export function htmlLang(lang: Lang): string {
  if (lang === "en") return "en-CA";
  if (lang === "fr") return "fr-CA";
  return "es-MX";
}
