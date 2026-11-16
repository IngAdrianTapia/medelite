import { Link } from "react-router";
import { HOME_COPY } from "../content/home";
import { useI18n } from "../i18n";

const LEAD = {
  es: "¿Quiere ver números? Pida una estimación; el cirujano en México confirma el plan por escrito.",
  en: "Want to see numbers? Request an estimate; the surgeon in Mexico confirms the plan in writing.",
  fr: "Vous voulez voir des chiffres\u202f? Demandez une estimation\u202f; le chirurgien au Mexique confirme le plan par écrit.",
} as const;

/** One clear call to action closing inner pages: request a quote, with the coordinator as the quiet alternative. */
export function PageCta() {
  const { lang, m } = useI18n();
  const home = HOME_COPY[lang];
  return (
    <aside className="reveal mt-16 rounded-3xl border border-line bg-soft px-6 py-10 md:px-10 md:py-12">
      <p className="max-w-[34rem] font-serif text-2xl leading-snug text-navy md:text-3xl">{LEAD[lang]}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Link to={{ pathname: "/", hash: "#cotizar" }} className="btn btn-primary min-h-12 px-7">
          {m.hero.ctaQuote} <span className="arrow" aria-hidden="true">→</span>
        </Link>
        <Link to={{ pathname: "/", hash: "#orientacion" }} className="link-line whitespace-nowrap pb-1 text-[15px] font-medium text-navy">
          {home.coordinator}
        </Link>
      </div>
    </aside>
  );
}
