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

  const links = [
    ["/#especialidades", m.nav.specialties],
    ["/#paquetes", m.nav.packages],
    ["/#cotizar", m.nav.quote],
    ["/#recorrido", m.nav.journey],
    ["/#red", m.nav.network],
    ["/#faq", m.nav.faq],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
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
            className="h-9 w-auto"
          />
        </Link>
        <nav className="ml-auto hidden items-center gap-5 lg:flex" aria-label={m.nav.aria}>
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-muted hover:text-ink">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="flex rounded-full border border-line p-0.5" role="group" aria-label={m.langAria}>
            {LANGS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={lang === item.id}
                aria-label={`${item.label}, ${item.name}`}
                className={`min-h-9 min-w-9 rounded-full px-2 text-xs font-semibold ${lang === item.id ? "bg-navy text-white" : "text-muted"}`}
                onClick={() => setLang(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <a
            href="/#cotizar"
            className="hidden min-h-11 items-center rounded-full bg-navy px-4 text-sm font-medium text-white md:inline-flex"
          >
            {m.nav.quote}
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? m.nav.close : m.nav.menu}</span>
            <span aria-hidden="true" className="flex w-4 flex-col gap-1">
              <span className="h-px bg-ink" />
              <span className="h-px bg-ink" />
              <span className="h-px bg-ink" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="menu-movil" className="border-t border-line px-5 py-4 lg:hidden" aria-label={m.nav.aria}>
          <ul className="grid gap-1">
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="block rounded-xl px-3 py-3 text-base hover:bg-paper" onClick={() => setOpen(false)}>
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
