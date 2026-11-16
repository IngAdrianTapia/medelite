import { Link } from "react-router";
import { useI18n } from "../i18n";

/** Real MedElite contact only: the Vancouver office line and inbox published on medeliteofficial.com. */
const PHONE = "+16044428475";
const EMAIL = "info@medeliteofficial.com";

export function ContactDock() {
  const { m, lang } = useI18n();
  const t = {
    es: { label: "Contacto rápido", call: "Llamar", mail: "Correo", quote: "Cotizar" },
    en: { label: "Quick contact", call: "Call", mail: "Email", quote: "Quote" },
    fr: { label: "Contact rapide", call: "Appeler", mail: "Courriel", quote: "Soumission" },
  }[lang];
  return (
    <>
      <div className="fixed right-4 bottom-4 z-40 hidden items-center gap-2 md:flex" role="region" aria-label={t.label}>
        <a href={`tel:${PHONE}`} className="inline-flex min-h-12 items-center rounded-full border border-white/40 bg-navy px-5 text-sm font-semibold text-white shadow-premium hover:bg-navy-2">
          +1 (604) 442-8475
        </a>
        <Link to="/#cotizar" className="inline-flex min-h-12 items-center rounded-full bg-gold px-5 text-sm font-semibold text-white shadow-premium hover:bg-white hover:text-navy">
          {m.hero.ctaQuote}
        </Link>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/15 bg-navy text-white md:hidden" aria-label={t.label}>
        <a href={`tel:${PHONE}`} className="flex min-h-14 flex-col items-center justify-center text-xs font-semibold">
          <span aria-hidden="true" className="text-base">☎</span>
          {t.call}
        </a>
        <a href={`mailto:${EMAIL}`} className="flex min-h-14 flex-col items-center justify-center border-x border-white/15 text-xs font-semibold">
          <span aria-hidden="true" className="text-base">✉</span>
          {t.mail}
        </a>
        <Link to="/#cotizar" className="flex min-h-14 flex-col items-center justify-center bg-gold text-xs font-semibold">
          <span aria-hidden="true" className="text-base">→</span>
          {t.quote}
        </Link>
      </nav>
    </>
  );
}
