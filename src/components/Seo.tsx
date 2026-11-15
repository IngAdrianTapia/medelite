import { useEffect } from "react";
import { htmlLang, useI18n } from "../i18n";

function upsertMeta(attr: "name" | "property", key: string, content: string): void {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setHref(selector: string, href: string): void {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute("href", href);
}

export function Seo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const { lang } = useI18n();

  useEffect(() => {
    const suffix = path === "/" ? "" : path;
    const url = `https://medelite.com.mx/${lang}${suffix}`;
    document.title = title;
    document.documentElement.lang = htmlLang(lang);
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    setHref('link[rel="canonical"]', url);
    const langs = [
      ["es-MX", "es"],
      ["en-CA", "en"],
      ["fr-CA", "fr"],
    ] as const;
    for (const [code, id] of langs) {
      setHref(`link[rel="alternate"][hreflang="${code}"]`, `https://medelite.com.mx/${id}${suffix}`);
    }
    setHref('link[rel="alternate"][hreflang="x-default"]', `https://medelite.com.mx/en${suffix}`);
  }, [description, lang, path, title]);

  return null;
}
