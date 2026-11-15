import { Link } from "react-router";
import { SOCIAL } from "../data/sources";
import { useI18n } from "../i18n";

export function Footer() {
  const { m, lang } = useI18n();
  return (
    <footer className="border-t border-line bg-white pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <img src="/assets/brand/medelite-emblem-512.png" width={48} height={48} alt="" className="h-12 w-12" />
          <p className="mt-4 font-serif text-2xl">{m.footer.tag}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{m.footer.about}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{m.footer.fine}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{m.footer.photos}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase">{m.footer.contact}</h2>
          <p className="mt-3 text-sm leading-relaxed">
            <a className="underline decoration-line underline-offset-4" href="mailto:info@medeliteofficial.com">
              info@medeliteofficial.com
            </a>
            <br />
            <a className="underline decoration-line underline-offset-4" href="tel:+16044428475">
              +1 (604) 442-8475
            </a>
          </p>
          <p className="mt-3 text-sm text-muted">{m.contact.hoursValue}</p>
          <p className="mt-3 text-sm text-muted">{m.contact.city}</p>
          <p className="mt-3 text-sm">
            <span className="text-muted">{m.footer.official}: </span>
            <a className="underline decoration-line underline-offset-4" href="https://www.medeliteofficial.com/" rel="noopener noreferrer">
              medeliteofficial.com
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase">{m.footer.legal}</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link className="underline decoration-line underline-offset-4" to="/equipo">
                {lang === "en" ? "Published names" : lang === "fr" ? "Noms publiés" : "Nombres publicados"}
              </Link>
            </li>
            <li>
              <Link className="underline decoration-line underline-offset-4" to="/hospitales">
                {lang === "en" ? "For hospitals" : lang === "fr" ? "Pour les hôpitaux" : "Para hospitales"}
              </Link>
            </li>
            <li>
              <Link className="underline decoration-line underline-offset-4" to="/privacy">
                {m.nav.privacy}
              </Link>
            </li>
            <li>
              <Link className="underline decoration-line underline-offset-4" to="/terms">
                {m.nav.terms}
              </Link>
            </li>
          </ul>
          <h2 className="mt-6 text-sm font-semibold tracking-wide uppercase">{m.footer.follow}</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {SOCIAL.map((item) => (
              <li key={item.href}>
                <a className="underline decoration-line underline-offset-4" href={item.href} rel="noopener noreferrer">
                  {item.label}
                  <span className="sr-only"> (external)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs leading-relaxed text-muted md:flex-row md:justify-between">
          <p>{m.footer.copy}</p>
          <p className="max-w-xl">{m.footer.pwa}</p>
        </div>
      </div>
    </footer>
  );
}
