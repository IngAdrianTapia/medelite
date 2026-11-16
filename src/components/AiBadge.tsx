import { Link } from "react-router";
import { useI18n } from "../i18n";

const LABEL = { es: "Asistida por IA", en: "AI-assisted", fr: "Assisté par IA" } as const;
const SHORT = { es: "IA", en: "AI", fr: "IA" } as const;
const NOTE = {
  es: "Atención asistida por inteligencia artificial: próximamente, en implementación",
  en: "AI-assisted care: coming soon, being implemented",
  fr: "Soins assistés par intelligence artificielle : bientôt, en cours de mise en place",
} as const;

/** Generic spark mark, drawn in the brand line style. Not a product logo. */
function AiIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3.5c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
      <path d="M18 14.5c.3 1.7 1.1 2.5 2.8 2.8-1.7.3-2.5 1.1-2.8 2.8-.3-1.7-1.1-2.5-2.8-2.8 1.7-.3 2.5-1.1 2.8-2.8Z" />
    </svg>
  );
}

export function AiBadge({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const { lang } = useI18n();
  return (
    <Link
      to="/que-es#ia"
      title={NOTE[lang]}
      aria-label={`${LABEL[lang]}. ${NOTE[lang]}`}
      className={`inline-flex min-h-9 items-center sm:min-h-10 gap-1.5 whitespace-nowrap rounded-lg border border-gold/35 bg-soft px-2.5 text-xs font-semibold tracking-wide text-navy hover:border-gold sm:px-3 ${className}`}
    >
      <AiIcon className="h-4 w-4 shrink-0 text-gold" />
      {compact ? (
        <>
          <span className="sm:hidden">{SHORT[lang]}</span>
          <span className="hidden sm:inline">{LABEL[lang]}</span>
        </>
      ) : (
        <span>{LABEL[lang]}</span>
      )}
    </Link>
  );
}
