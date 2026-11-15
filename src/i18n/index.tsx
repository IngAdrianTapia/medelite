/* Context module: the hook is exported next to the provider. */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { es } from "./es";
import type { Lang, Messages } from "./types";

async function loadMessages(lang: Lang): Promise<Messages> {
  if (lang === "en") return (await import("./en")).en;
  if (lang === "fr") return (await import("./fr")).fr;
  return es;
}

function readLang(): Lang {
  if (typeof window === "undefined") return "es";
  const query = new URLSearchParams(window.location.search).get("lang");
  if (query === "en" || query === "fr" || query === "es") return query;
  try {
    const stored = window.localStorage.getItem("me-lang");
    if (stored === "en" || stored === "fr" || stored === "es") return stored;
  } catch {
    /* private mode */
  }
  return "es";
}

interface I18nValue {
  lang: Lang;
  m: Messages;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);
  const [messages, setMessages] = useState<Messages>(es);

  useEffect(() => {
    let cancelled = false;
    void loadMessages(lang).then((next) => {
      if (!cancelled) setMessages(next);
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem("me-lang", next);
    } catch {
      /* ignore quota or private mode */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
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
