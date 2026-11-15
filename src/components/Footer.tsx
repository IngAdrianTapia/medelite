import { Link } from "react-router";
import { SOCIAL } from "../data/sources";
import { useI18n } from "../i18n";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const { m, lang } = useI18n();
  return (
    <footer className="relative overflow-hidden bg-[#041018] pt-20 pb-28 text-white">
      <p aria-hidden="true" className="pointer-events-none absolute -bottom-8 left-0 font-serif text-[18vw] leading-none text-white/5">
        MedElite
      </p>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandMark className="h-16 md:h-20" alt="" />
          <p className="mt-6 max-w-md font-serif text-4xl leading-tight">{m.footer.tag}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{m.footer.about}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">{m.footer.fine}</p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-white/45">{m.footer.photos}</p>
        </div>
        <div>
          <h2 className="text-xs tracking-[0.2em] text-gold-line uppercase">{m.footer.contact}</h2>
          <p className="mt-4 text-sm">
            <a className="underline decoration-gold-line underline-offset-4" href="mailto:info@medeliteofficial.com">info@medeliteofficial.com</a>
            <br />
            <a className="underline decoration-gold-line underline-offset-4" href="tel:+16044428475">+1 (604) 442-8475</a>
          </p>
          <p className="mt-3 text-sm text-gold-line">{lang === "en" ? "Emergency: call local services, not this office." : lang === "fr" ? "Urgence : appelez le service local, pas ce bureau." : "Urgencia: llame al servicio local, no a esta oficina."}</p>
          <p className="mt-3 text-sm text-white/65">{m.contact.hoursValue}</p>
          <p className="mt-1 text-sm text-white/65">{m.contact.city}</p>
          <p className="mt-4 text-sm text-white/70">{m.footer.official}: <a className="underline" href="https://www.medeliteofficial.com/" rel="noopener noreferrer">medeliteofficial.com</a></p>
        </div>
        <div>
          <h2 className="text-xs tracking-[0.2em] text-gold-line uppercase">{m.footer.legal}</h2>
          <ul className="mt-4 grid gap-2 text-sm text-white/75">
            <li><Link className="underline decoration-white/30 underline-offset-4" to="/equipo">{lang === "en" ? "Published names" : lang === "fr" ? "Noms publiés" : "Nombres publicados"}</Link></li>
            <li><Link className="underline decoration-white/30 underline-offset-4" to="/hospitales">{lang === "en" ? "For hospitals" : lang === "fr" ? "Pour les hôpitaux" : "Para hospitales"}</Link></li>
            <li><Link className="underline decoration-white/30 underline-offset-4" to="/privacy">{m.nav.privacy}</Link></li>
            <li><Link className="underline decoration-white/30 underline-offset-4" to="/terms">{m.nav.terms}</Link></li>
            <li><Link className="underline decoration-white/30 underline-offset-4" to="/comparar">{lang === "en" ? "Compare" : lang === "fr" ? "Comparer" : "Comparar"}</Link></li>
          </ul>
          <h2 className="mt-8 text-xs tracking-[0.2em] text-gold-line uppercase">{m.footer.follow}</h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {SOCIAL.map((item) => (
              <li key={item.href}>
                <a className="underline decoration-white/30 underline-offset-4" href={item.href} rel="noopener noreferrer">{item.label}<span className="sr-only"> (external)</span></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mx-auto mt-12 max-w-6xl px-5 text-xs text-white/45">
        <p>{m.footer.copy}</p>
        <p className="mt-2 max-w-3xl">{m.footer.pwa}</p>
      </div>
    </footer>
  );
}
