import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n/types";

const LANGS: { id: Lang; label: string; name: string; html: string }[] = [
  { id: "es", label: "ES", name: "Español", html: "es-MX" },
  { id: "en", label: "EN", name: "English", html: "en-CA" },
  { id: "fr", label: "FR", name: "Français", html: "fr-CA" },
];

const ctaClass =
  "min-h-11 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-white shadow-premium transition hover:bg-white hover:text-navy";

export function Header() {
  const { m, lang, setLang } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const first = menuRef.current?.querySelector("a");
    if (first instanceof HTMLElement) first.focus();
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
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/92 text-white shadow-premium backdrop-blur-xl">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold-line focus:px-5 focus:py-2 focus:text-navy"
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
            className="h-8 w-auto md:h-9"
          />
        </Link>
        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label={m.nav.aria}>
          {links.map(([href, label]) => (
            <Link
              key={href}
              to={href}
              aria-current={pathname === href ? "page" : undefined}
              className="text-sm font-medium text-white/75 hover:text-white aria-[current=page]:text-gold-line"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <div className="flex rounded-full bg-white/10 p-1" role="group" aria-label={m.langAria}>
            {LANGS.map((item) => (
              <button
                key={item.id}
                type="button"
                lang={item.html}
                aria-pressed={lang === item.id}
                aria-label={`${item.label}, ${item.name}`}
                className={`min-h-11 min-w-11 rounded-full px-2 text-xs font-bold tracking-wide ${
                  lang === item.id ? "bg-white text-navy" : "text-white/70 hover:text-white"
                }`}
                onClick={() => setLang(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Link to="/#cotizar" className={`hidden md:inline-flex ${ctaClass}`}>
            {m.hero.ctaQuote}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
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
      <nav
        id="menu-movil"
        ref={menuRef}
        hidden={!open}
        className="border-t border-white/10 bg-navy px-5 py-4 lg:hidden"
        aria-label={m.nav.aria}
      >
        <ul className="grid gap-1">
          <li>
            <Link to="/#cotizar" className={`inline-flex w-full ${ctaClass}`} onClick={() => setOpen(false)}>
              {m.hero.ctaQuote}
            </Link>
          </li>
          {links.map(([href, label]) => (
            <li key={href}>
              <Link
                to={href}
                aria-current={pathname === href ? "page" : undefined}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-white/85 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
