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
        <a href={`tel:${PHONE}`} className="inline-flex min-h-12 items-center rounded-lg border border-line bg-white px-5 text-sm font-semibold text-navy shadow-premium hover:border-navy">
          +1 (604) 442-8475
        </a>
        <Link to="/#cotizar" className="inline-flex min-h-12 items-center rounded-lg bg-gold px-5 text-sm font-semibold text-white shadow-premium hover:bg-navy">
          {m.hero.ctaQuote}
        </Link>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white text-navy shadow-[0_-4px_16px_-8px_rgba(0,43,73,0.25)] md:hidden" aria-label={t.label}>
        <a href={`tel:${PHONE}`} className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
          {t.call}
        </a>
        <a href={`mailto:${EMAIL}`} className="flex min-h-14 flex-col items-center justify-center gap-0.5 border-x border-line text-xs font-semibold">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
          {t.mail}
        </a>
        <Link to="/#cotizar" className="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-gold text-xs font-semibold text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5h6M9 3h6v4H9zM6 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1M8 12h8M8 16h5" /></svg>
          {t.quote}
        </Link>
      </nav>
    </>
  );
}
