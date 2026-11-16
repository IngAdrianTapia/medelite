import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PRERENDER_ROUTES } from "./routes.mjs";
import { localizedUrl, sitemapXml } from "./sitemap.mjs";

describe("sitemap", () => {
  const routes = PRERENDER_ROUTES.map(([route]) => route);
  const xml = sitemapXml(routes);

  it("lists every prerendered route in es-MX, en-CA and fr-CA", () => {
    expect(routes).toContain("/calidad");
    expect(routes).not.toContain("/404");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(locs).toHaveLength(routes.length * 3);
    expect(new Set(locs).size).toBe(locs.length);
    for (const route of routes) {
      expect(locs).toContain(localizedUrl(route, "es"));
      expect(locs).toContain(localizedUrl(route, "en"));
      expect(locs).toContain(localizedUrl(route, "fr"));
      expect(xml).toContain(`hreflang="es-MX" href="${localizedUrl(route, "es")}"`);
      expect(xml).toContain(`hreflang="en-CA" href="${localizedUrl(route, "en")}"`);
      expect(xml).toContain(`hreflang="fr-CA" href="${localizedUrl(route, "fr")}"`);
      expect(xml).toContain(`hreflang="x-default" href="${localizedUrl(route, "en")}"`);
    }
    expect(localizedUrl("/", "en")).toBe("https://medelite.com.mx/en");
    expect(localizedUrl("/calidad", "fr")).toBe("https://medelite.com.mx/fr/calidad");
    expect(xml).not.toContain("<loc>https://medelite.com.mx/calidad</loc>");
    expect(xml).not.toContain("/404");
  });

  it("is referenced from robots.txt", () => {
    const robots = readFileSync(join(process.cwd(), "public/robots.txt"), "utf8");
    expect(robots).toContain("Sitemap: https://medelite.com.mx/sitemap.xml");
  });
});
