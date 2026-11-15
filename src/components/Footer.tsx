import { Link } from "react-router";
import { SOCIAL } from "../data/sources";
import { useI18n } from "../i18n";

export function Footer() {
  const { m, lang } = useI18n();
  return (
    <footer className="border-t border-line bg-white pb-24 pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4">
          <img src="/assets/brand/medelite-emblem-512.png" width={48} height={48} alt="" className="h-12 w-12" />
          <p className="mt-5 font-serif text-3xl leading-tight text-ink">{m.footer.tag}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{m.footer.about}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{m.footer.fine}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{m.footer.photos}</p>
        </div>
        <div className="md:col-span-4 lg:col-span-3 lg:col-start-6">
          <h2 className="text-xs font-bold tracking-[0.15em] text-navy uppercase">{m.footer.contact}</h2>
          <p className="mt-4 text-sm leading-relaxed">
            <a className="font-medium underline decoration-line underline-offset-4 hover:text-navy" href="mailto:info@medeliteofficial.com">
              info@medeliteofficial.com
            </a>
            <br />
            <a className="font-medium underline decoration-line underline-offset-4 hover:text-navy" href="tel:+16044428475">
              +1 (604) 442-8475
            </a>
          </p>
          <p className="mt-4 text-sm text-muted">{m.contact.hoursValue}</p>
          <p className="mt-2 text-sm text-muted">{m.contact.city}</p>
          <p className="mt-4 text-sm">
            <span className="text-muted">{m.footer.official}: </span>
            <a className="font-medium underline decoration-line underline-offset-4 hover:text-navy" href="https://www.medeliteofficial.com/" rel="noopener noreferrer">
              medeliteofficial.com
            </a>
          </p>
        </div>
        <div className="md:col-span-3 lg:col-span-3 lg:col-start-10">
          <h2 className="text-xs font-bold tracking-[0.15em] text-navy uppercase">{m.footer.legal}</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li>
              <Link className="text-muted underline decoration-line underline-offset-4 hover:text-navy" to="/equipo">
                {lang === "en" ? "Published names" : lang === "fr" ? "Noms publiés" : "Nombres publicados"}
              </Link>
            </li>
            <li>
              <Link className="text-muted underline decoration-line underline-offset-4 hover:text-navy" to="/hospitales">
                {lang === "en" ? "For hospitals" : lang === "fr" ? "Pour les hôpitaux" : "Para hospitales"}
              </Link>
            </li>
            <li>
              <Link className="text-muted underline decoration-line underline-offset-4 hover:text-navy" to="/privacy">
                {m.nav.privacy}
              </Link>
            </li>
            <li>
              <Link className="text-muted underline decoration-line underline-offset-4 hover:text-navy" to="/terms">
                {m.nav.terms}
              </Link>
            </li>
          </ul>
          <h2 className="mt-8 text-xs font-bold tracking-[0.15em] text-navy uppercase">{m.footer.follow}</h2>
          <ul className="mt-4 flex flex-wrap gap-4 text-sm">
            {SOCIAL.map((item) => (
              <li key={item.href}>
                <a className="text-muted underline decoration-line underline-offset-4 hover:text-navy" href={item.href} rel="noopener noreferrer">
                  {item.label}
                  <span className="sr-only"> (external)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-line px-5 pt-6">
        <div className="flex flex-col gap-3 text-xs leading-relaxed text-muted md:flex-row md:items-center md:justify-between">
          <p>{m.footer.copy}</p>
          <p className="max-w-xl md:text-right">{m.footer.pwa}</p>
        </div>
      </div>
    </footer>
  );
}
