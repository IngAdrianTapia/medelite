import { Link } from "react-router";
import { useI18n } from "../i18n";

export function ContactDock() {
  const { m, lang } = useI18n();
  const label = { es: "Contacto rápido", en: "Quick contact", fr: "Contact rapide" }[lang];
  return (
    <div className="fixed right-4 bottom-4 z-40" role="region" aria-label={label}>
      <Link
        to="/#cotizar"
        className="inline-flex min-h-12 items-center rounded-full bg-gold px-5 text-sm font-semibold text-white shadow-premium hover:bg-white hover:text-navy"
      >
        {m.hero.ctaQuote}
      </Link>
    </div>
  );
}
