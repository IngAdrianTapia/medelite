import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { parseLocalePath, prefixPath } from "../i18n/locale";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n/types";
import { BrandMark } from "./BrandMark";

const LANGS: { id: Lang; label: string; name: string; html: string }[] = [
  { id: "es", label: "ES", name: "Español", html: "es-MX" },
  { id: "en", label: "EN", name: "English", html: "en-CA" },
  { id: "fr", label: "FR", name: "Français", html: "fr-CA" },
];

const flagFrame = {
  viewBox: "0 0 30 20",
  className: "h-3.5 w-[21px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/15",
  "aria-hidden": true,
} as const;

/** Inline flags (emoji flags do not render on Windows): ES Mexico, EN United States, FR Canada. */
function Flag({ id }: { id: Lang }) {
  if (id === "es") {
    return (
      <svg {...flagFrame} data-flag="mx">
        <rect width="10" height="20" fill="#006847" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#CE1126" />
        <circle cx="15" cy="10" r="2.15" fill="#8C5A2B" />
        <circle cx="15" cy="10" r="0.85" fill="#C4A35A" />
      </svg>
    );
  }
  if (id === "en") {
    const stripe = 20 / 13;
    const cantonH = stripe * 7;
    const stars: { cx: number; cy: number; key: string }[] = [];
    for (let row = 0; row < 9; row++) {
      const count = row % 2 === 0 ? 6 : 5;
      const y = (cantonH / 10) * (row + 1);
      const step = 12 / 6;
      const origin = row % 2 === 0 ? step / 2 : step;
      for (let i = 0; i < count; i++) {
        stars.push({ cx: origin + i * step, cy: y, key: `${row}-${i}` });
      }
    }
    return (
      <svg {...flagFrame} data-flag="us">
        {Array.from({ length: 13 }, (_, i) => (
          <rect key={i} y={i * stripe} width="30" height={stripe + 0.04} fill={i % 2 === 0 ? "#BF0A30" : "#FFFFFF"} />
        ))}
        <rect width="12" height={cantonH} fill="#002868" />
        {stars.map((star) => (
          <circle key={star.key} cx={star.cx} cy={star.cy} r="0.42" fill="#FFFFFF" />
        ))}
      </svg>
    );
  }
  return (
    <svg {...flagFrame} data-flag="ca">
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect width="7.5" height="20" fill="#D52B1E" />
      <rect x="22.5" width="7.5" height="20" fill="#D52B1E" />
      <path
        fill="#D52B1E"
        d="M15 3.1l1.05 2.05 1.35-.55-.35 2.95 1.85-1.85.35 1 1.9-.35-.7 2.05.95.4-2.9 2.35.3 1-2.9-.4.1 3.05h-.9l.1-3.05-2.9.4.3-1-2.9-2.35.95-.4-.7-2.05 1.9.35.35-1 1.85 1.85-.35-2.95 1.35.55z"
      />
    </svg>
  );
}

export function Header() {
  const { m, lang } = useI18n();
  const { pathname, search, hash } = useLocation();
  const switchLang = (next: Lang) => {
    setOpen(false);
    // Full load of the prerendered page in the other language: always lands on the equivalent page.
    const path = parseLocalePath(pathname).path;
    const target = prefixPath(next, path) + (path !== "/" && !path.endsWith("/") ? "/" : path === "/" ? "/" : "");
    window.location.assign(`${target}${search}${hash}`);
  };
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

  const prefix = lang === "en" ? "" : `/${lang}`;
  const links = [
    [`${prefix}/`, m.nav.home],
    [`${prefix}/hospital-joya`, m.nav.joya],
    [`${prefix}/que-es`, m.nav.medelite],
    [`${prefix}/especialidades`, m.nav.specialties],
    [`${prefix}/equipo`, m.nav.doctors],
    [`${prefix}/galeria`, m.nav.gallery],
    [`${prefix}/#orientacion`, m.nav.contact],
  ] as const;

  const langGroup = (
    <div className="notranslate flex shrink-0 rounded-lg border border-line bg-white p-0.5" translate="no" role="group" aria-label={m.langAria}>
      {LANGS.map((item) => (
        <button
          key={item.id}
          type="button"
          lang={item.html}
          aria-pressed={lang === item.id}
          aria-label={`${item.label}, ${item.name}`}
          className={`inline-flex min-h-9 items-center justify-center gap-1 rounded-md px-1.5 text-xs font-bold sm:min-h-10 sm:px-2 ${lang === item.id ? "bg-navy text-white" : "text-navy hover:bg-soft"}`}
          onClick={() => switchLang(item.id)}
        >
          <Flag id={item.id} />
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur ${solid ? "border-line shadow-[0_2px_12px_-6px_rgba(0,43,73,0.18)]" : "border-line/70"}`}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-5 focus:py-2 focus:text-white"
      >
        {m.skip}
      </a>
      <div className="flex h-11 items-center justify-end gap-2 border-b border-line bg-ivory px-3 sm:hidden">
        {langGroup}
      </div>
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-3 px-3 sm:px-5 md:h-20 md:gap-4 md:px-8">
        <Link to="/#inicio" className="shrink-0" onClick={() => setOpen(false)} aria-label="MedElite International Health">
          <img src="/assets/brand/medelite-emblem-512.png" width={512} height={512} alt="" className="block h-11 w-11 min-[340px]:hidden" />
          <span className="hidden min-[340px]:block">
            <BrandMark className="h-10 sm:h-11 md:h-14" />
          </span>
        </Link>
        <nav className="ml-auto hidden min-w-0 flex-1 items-center justify-end gap-x-3.5 min-[1280px]:flex min-[1366px]:gap-x-5" aria-label={m.nav.aria}>
          {links.slice(1).map(([href, label]) => (
            <Link
              key={href}
              to={href}
              aria-current={parseLocalePath(pathname).path === href ? "page" : undefined}
              className="shrink-0 py-2 text-sm font-medium whitespace-nowrap text-navy hover:text-gold aria-[current=page]:text-gold aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2 min-[1280px]:ml-0">
          <div className="hidden items-center sm:flex">
            {langGroup}
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-navy min-[1280px]:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? m.nav.close : m.nav.menu}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav
        id="menu-movil"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-x-0 top-[108px] bottom-0 z-40 overflow-y-auto border-t border-line bg-white px-5 py-6 sm:top-16 md:top-20 min-[1280px]:hidden"
        aria-label={m.nav.aria}
      >
        <ul className="mx-auto grid max-w-xl divide-y divide-line">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link to={href} className="flex min-h-14 items-center justify-between text-lg font-semibold text-navy aria-[current=page]:text-gold" aria-current={parseLocalePath(pathname).path === href ? "page" : undefined} onClick={() => setOpen(false)}>
                {label}
                <span aria-hidden="true" className="text-gold">›</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-6 grid max-w-xl gap-3">
          {/* Quote questionnaire. The Contact item stays on #orientacion (mail and phone, no clinical form). */}
          <Link to="/#cotizar" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gold px-5 text-sm font-semibold text-white" onClick={() => setOpen(false)}>
            {m.hero.ctaQuote}
          </Link>
        </div>
      </nav>
    </header>
  );
}
