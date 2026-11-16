/** Canonical origin. Matches the absolute URLs in index.html and Seo.tsx. */
export const SITE_ORIGIN = "https://medelite.com.mx";

/** Same codes as <html lang> and the hreflang alternates. */
export const SITEMAP_LANGS = [
  ["es", "es-MX"],
  ["en", "en-CA"],
  ["fr", "fr-CA"],
];

export function localizedPath(route, lang) {
  if (route === "/") return `/${lang}`;
  return `/${lang}${route}`;
}

export function localizedUrl(route, lang) {
  return `${SITE_ORIGIN}${localizedPath(route, lang)}`;
}

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * One <url> per prerendered locale. Unprefixed English copies are the same
 * document as /en and are omitted. /404 is not a route the caller should pass.
 */
export function sitemapXml(routes) {
  const body = routes.map((route) => {
    const links = SITEMAP_LANGS.map(([lang, hreflang]) => {
      const href = xmlEscape(localizedUrl(route, lang));
      return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
    });
    const xDefault = xmlEscape(localizedUrl(route, "en"));
    links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}" />`);
    const urls = SITEMAP_LANGS.map(([lang]) => {
      const loc = xmlEscape(localizedUrl(route, lang));
      return ["  <url>", `    <loc>${loc}</loc>`, ...links, "  </url>"].join("\n");
    });
    return urls.join("\n");
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...body,
    "</urlset>",
    "",
  ].join("\n");
}
