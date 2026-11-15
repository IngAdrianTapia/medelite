import { Link } from "react-router";
import { SOCIAL } from "../data/sources";
import { useI18n } from "../i18n";

export function Footer() {
  const { m, lang } = useI18n();
  return (
    <footer className="border-t border-gold-line/40 bg-navy pb-28 pt-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4">
          <img src="/assets/brand/medelite-logo-horizontal.png" width={643} height={160} alt="" className="h-10 w-auto" />
          <p className="mt-6 font-serif text-4xl leading-tight text-white">{m.footer.tag}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">{m.footer.about}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">{m.footer.fine}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{m.footer.photos}</p>
          <p className="mt-8">
            <Link to="/#cotizar" className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-sm font-semibold text-white hover:bg-white hover:text-navy">
              {m.hero.ctaQuote}
            </Link>
          </p>
        </div>
        <div className="md:col-span-4 lg:col-span-3 lg:col-start-6">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gold-line uppercase">{m.footer.contact}</h2>
          <p className="mt-5 text-sm leading-relaxed">
            <a className="font-medium text-white underline decoration-gold-line underline-offset-4" href="mailto:info@medeliteofficial.com">
              info@medeliteofficial.com
            </a>
            <br />
            <a className="font-medium text-white underline decoration-gold-line underline-offset-4" href="tel:+16044428475">
              +1 (604) 442-8475
            </a>
          </p>
          <p className="mt-4 text-sm text-white/70">{m.contact.hoursValue}</p>
          <p className="mt-2 text-sm text-white/70">{m.contact.city}</p>
          <p className="mt-4 text-sm">
            <span className="text-white/60">{m.footer.official}: </span>
            <a className="font-medium text-white underline decoration-gold-line underline-offset-4" href="https://www.medeliteofficial.com/" rel="noopener noreferrer">
              medeliteofficial.com
            </a>
          </p>
        </div>
        <div className="md:col-span-3 lg:col-span-3 lg:col-start-10">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gold-line uppercase">{m.footer.legal}</h2>
          <ul className="mt-5 grid gap-3 text-sm">
            <li>
              <Link className="text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white" to="/equipo">
                {lang === "en" ? "Published names" : lang === "fr" ? "Noms publiés" : "Nombres publicados"}
              </Link>
            </li>
            <li>
              <Link className="text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white" to="/hospitales">
                {lang === "en" ? "For hospitals" : lang === "fr" ? "Pour les hôpitaux" : "Para hospitales"}
              </Link>
            </li>
            <li>
              <Link className="text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white" to="/privacy">
                {m.nav.privacy}
              </Link>
            </li>
            <li>
              <Link className="text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white" to="/terms">
                {m.nav.terms}
              </Link>
            </li>
          </ul>
          <h2 className="mt-8 text-xs font-semibold tracking-[0.2em] text-gold-line uppercase">{m.footer.follow}</h2>
          <ul className="mt-4 flex flex-wrap gap-4 text-sm">
            {SOCIAL.map((item) => (
              <li key={item.href}>
                <a className="text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white" href={item.href} rel="noopener noreferrer">
                  {item.label}
                  <span className="sr-only"> (external)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-6xl border-t border-white/10 px-5 pt-6">
        <div className="flex flex-col gap-3 text-xs leading-relaxed text-white/55 md:flex-row md:items-center md:justify-between">
          <p>{m.footer.copy}</p>
          <p className="max-w-xl md:text-right">{m.footer.pwa}</p>
        </div>
      </div>
    </footer>
  );
}
