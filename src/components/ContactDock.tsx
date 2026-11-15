import { Link } from "react-router";
import { useI18n } from "../i18n";

export function ContactDock() {
  const { lang } = useI18n();
  const estimate = { es: "Estimación", en: "Estimate", fr: "Estimation" }[lang];
  const emergency = {
    es: "Urgencia: llame al servicio local, no a esta oficina.",
    en: "Emergency: call local services, not this office.",
    fr: "Urgence : appelez le service local, pas ce bureau.",
  }[lang];
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 shadow-glass backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-3 py-2">
        <a className="inline-flex min-h-11 items-center rounded-full bg-navy px-4 text-sm font-semibold text-white" href="tel:+16044428475">
          +1 (604) 442-8475
        </a>
        <a className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm" href="mailto:info@medeliteofficial.com">
          info@medeliteofficial.com
        </a>
        <Link className="inline-flex min-h-11 items-center px-3 text-sm underline" to="/#cotizar">
          {estimate}
        </Link>
        <p className="text-xs text-warn">{emergency}</p>
      </div>
    </div>
  );
}
