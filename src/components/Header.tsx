import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n/types";
import { BrandMark } from "./BrandMark";

const LANGS: { id: Lang; label: string; name: string; html: string }[] = [
  { id: "es", label: "ES", name: "Español", html: "es-MX" },
  { id: "en", label: "EN", name: "English", html: "en-CA" },
  { id: "fr", label: "FR", name: "Français", html: "fr-CA" },
];

export function Header() {
  const { m, lang, setLang } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
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

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const extra = {
    es: { flights: "Vuelos", route: "Ruta", map: "Mapa", what: "Qué es" },
    en: { flights: "Flights", route: "Route", map: "Map", what: "What we are" },
    fr: { flights: "Vols", route: "Route", map: "Carte", what: "Qui nous sommes" },
  }[lang];
  const links = [
    ["/que-es", extra.what],
    ["/red", m.nav.network],
    ["/especialidades", m.nav.specialties],
    ["/ruta", extra.route],
    ["/vuelos", extra.flights],
    ["/mapa", extra.map],
  ] as const;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <a
        href="#contenido"
        className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold-line focus:px-5 focus:py-2 focus:text-navy"
      >
        {m.skip}
      </a>
      <div className={`pointer-events-auto mx-3 mt-3 flex max-w-6xl flex-wrap items-center gap-3 rounded-3xl border px-3 py-2 text-white shadow-premium md:mx-auto ${solid ? "border-white/15 bg-navy" : "border-white/30 bg-navy/70 backdrop-blur-xl"}`}>
        <Link to="/#inicio" className="shrink-0" onClick={() => setOpen(false)}>
          <BrandMark className="h-12 sm:h-14 md:h-16" />
        </Link>
        <nav className="ml-auto hidden items-center gap-5 lg:flex" aria-label={m.nav.aria}>
          {links.map(([href, label]) => (
            <Link
              key={href}
              to={href}
              aria-current={pathname === href ? "page" : undefined}
              className="text-sm text-white/80 hover:text-white aria-[current=page]:text-gold-line"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <div className="flex rounded-full bg-white/10 p-1" role="group" aria-label={m.langAria}>
            {LANGS.map((item) => (
              <button
                key={item.id}
                type="button"
                lang={item.html}
                aria-pressed={lang === item.id}
                aria-label={`${item.label}, ${item.name}`}
                className={`min-h-10 min-w-10 rounded-full px-2 text-xs font-bold ${lang === item.id ? "bg-white text-navy" : "text-white/75"}`}
                onClick={() => setLang(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Link to="/#cotizar" className="hidden min-h-10 items-center rounded-full bg-gold px-4 text-sm font-semibold text-white hover:bg-white hover:text-navy md:inline-flex">
            {m.hero.ctaQuote}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/30 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? m.nav.close : m.nav.menu}</span>
            <span aria-hidden="true" className="text-lg leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      <nav
        id="menu-movil"
        ref={menuRef}
        hidden={!open}
        className="pointer-events-auto fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col justify-center bg-navy/95 px-8 backdrop-blur-xl lg:hidden"
        aria-label={m.nav.aria}
      >
        <ul className="grid gap-2">
          <li>
            <Link to="/#cotizar" className="inline-flex min-h-12 items-center rounded-full bg-gold px-5 text-sm font-semibold text-white" onClick={() => setOpen(false)}>
              {m.hero.ctaQuote}
            </Link>
          </li>
          {links.map(([href, label]) => (
            <li key={href}>
              <Link to={href} className="block py-2 font-serif text-4xl text-white" aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
