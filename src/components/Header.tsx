import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n/types";

const LANGS: { id: Lang; label: string; name: string }[] = [
  { id: "es", label: "ES", name: "Español" },
  { id: "en", label: "EN", name: "English" },
  { id: "fr", label: "FR", name: "Français" },
];

export function Header() {
  const { m, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const extra = {
    es: { flights: "Vuelos", route: "Mi ruta", map: "Mapa" },
    en: { flights: "Flights", route: "My route", map: "Map" },
    fr: { flights: "Vols", route: "Ma route", map: "Carte" },
  }[lang];
  const links = [
    ["/ruta", extra.route],
    ["/comparar", lang === "en" ? "Compare" : lang === "fr" ? "Comparer" : "Comparar"],
    ["/red", m.nav.network],
    ["/mapa", extra.map],
    ["/vuelos", extra.flights],
    ["/#cotizar", m.nav.quote],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/92 shadow-glass backdrop-blur-md">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-navy focus:px-5 focus:py-2 focus:text-white"
      >
        {m.skip}
      </a>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <Link to="/#inicio" className="shrink-0" onClick={() => setOpen(false)}>
          <img
            src="/assets/brand/medelite-logo-horizontal.png"
            width={643}
            height={160}
            alt="MedElite International Health"
            className="h-8 w-auto"
          />
        </Link>
        <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label={m.nav.aria}>
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-sm font-medium text-muted hover:text-navy">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="flex rounded-full bg-soft p-1" role="group" aria-label={m.langAria}>
            {LANGS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={lang === item.id}
                aria-label={`${item.label}, ${item.name}`}
                className={`min-h-11 min-w-11 rounded-full px-2 text-xs font-bold tracking-wide ${
                  lang === item.id ? "bg-white text-navy shadow-sm ring-1 ring-navy/10" : "text-muted hover:text-ink"
                }`}
                onClick={() => setLang(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <a
            href="/#cotizar"
            className="hidden min-h-11 items-center rounded-full bg-navy px-4 text-sm font-semibold text-white shadow-premium hover:bg-navy-2 md:inline-flex"
          >
            {m.nav.quote}
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-white text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? m.nav.close : m.nav.menu}</span>
            <span aria-hidden="true" className="flex w-4 flex-col gap-1">
              <span className="h-0.5 bg-current" />
              <span className="h-0.5 bg-current" />
              <span className="h-0.5 bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="menu-movil" className="border-t border-line bg-white px-5 py-4 lg:hidden" aria-label={m.nav.aria}>
          <ul className="grid gap-1">
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-soft" onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
