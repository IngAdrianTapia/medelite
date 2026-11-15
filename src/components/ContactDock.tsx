import { Link } from "react-router";
import { useI18n } from "../i18n";

export function ContactDock() {
  const { m, lang } = useI18n();
  const emergency = {
    es: "Urgencia: llame al servicio local, no a esta oficina.",
    en: "Emergency: call local services, not this office.",
    fr: "Urgence : appelez le service local, pas ce bureau.",
  }[lang];
  const label = { es: "Contacto rápido", en: "Quick contact", fr: "Contact rapide" }[lang];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy/95 text-white backdrop-blur-md" aria-label={label}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2.5">
        <Link className="inline-flex min-h-11 items-center rounded-full bg-gold px-5 text-sm font-semibold text-white hover:bg-white hover:text-navy" to="/#cotizar">
          {m.hero.ctaQuote}
        </Link>
        <a className="inline-flex min-h-11 items-center text-sm text-white underline decoration-gold-line underline-offset-4" href="tel:+16044428475">
          +1 (604) 442-8475
        </a>
        <a className="hidden min-h-11 items-center text-sm text-white/80 underline decoration-white/30 underline-offset-4 sm:inline-flex" href="mailto:info@medeliteofficial.com">
          info@medeliteofficial.com
        </a>
        <p className="text-xs leading-relaxed text-gold-line">{emergency}</p>
      </div>
    </nav>
  );
}
