import { Link } from "react-router";
import { SOCIAL } from "../data/sources";
import { useI18n } from "../i18n";
import { AiBadge } from "./AiBadge";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const { m, lang } = useI18n();
  return (
    <footer className="relative border-t border-line bg-ivory pt-16 pb-28 text-ink md:pb-16">
      <div className="relative mx-auto grid max-w-[1200px] gap-12 px-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandMark className="h-16 md:h-20" alt="" />
          <p className="mt-5"><AiBadge /></p>
          <p className="mt-6 max-w-md font-serif text-xl leading-snug text-navy">{m.footer.tag}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{m.footer.about}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{m.footer.fine}</p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-muted">{m.footer.photos}</p>
        </div>
        <div>
          <h2 className="text-xs tracking-[0.2em] text-gold uppercase font-semibold">{m.footer.contact}</h2>
          <p className="mt-4 text-sm">
            <a className="underline decoration-gold/50 underline-offset-4" href="mailto:info@medeliteofficial.com">info@medeliteofficial.com</a>
            <br />
            <a className="underline decoration-gold/50 underline-offset-4" href="tel:+16044428475">+1 (604) 442-8475</a>
          </p>
          <p className="mt-3 text-sm font-medium text-warn">{lang === "en" ? "Emergency: call local services, not this office." : lang === "fr" ? "Urgence : appelez le service local, pas ce bureau." : "Urgencia: llame al servicio local, no a esta oficina."}</p>
          <p className="mt-3 text-sm text-muted">{m.contact.hoursValue}</p>
          <p className="mt-1 text-sm text-muted">{m.contact.city}</p>
          <p className="mt-4 text-sm text-muted">{m.footer.official}: <a className="underline" href="https://www.medeliteofficial.com/" rel="noopener noreferrer">medeliteofficial.com</a></p>
        </div>
        <div>
          <h2 className="text-xs tracking-[0.2em] text-gold uppercase font-semibold">{m.footer.legal}</h2>
          <ul className="mt-4 grid gap-2 text-sm text-ink">
            <li><Link className="underline decoration-gold/40 underline-offset-4" to="/canada">{lang === "en" ? "Canada" : lang === "fr" ? "Canada" : "Canadá"}</Link></li>
            <li><Link className="underline decoration-gold/40 underline-offset-4" to="/hospital-joya">Hospital Joya</Link></li>
            <li><Link className="underline decoration-gold/40 underline-offset-4" to="/galeria">{lang === "en" ? "Gallery" : lang === "fr" ? "Galerie" : "Galería"}</Link></li>
            <li><Link className="underline decoration-gold/40 underline-offset-4" to="/equipo">{lang === "en" ? "Published names" : lang === "fr" ? "Noms publiés" : "Nombres publicados"}</Link></li>
            <li><Link className="underline decoration-gold/40 underline-offset-4" to="/hospitales">{lang === "en" ? "For hospitals" : lang === "fr" ? "Pour les hôpitaux" : "Para hospitales"}</Link></li>
            <li><Link className="underline decoration-gold/40 underline-offset-4" to="/privacy">{m.nav.privacy}</Link></li>
            <li><Link className="underline decoration-gold/40 underline-offset-4" to="/terms">{m.nav.terms}</Link></li>
            <li><Link className="underline decoration-gold/40 underline-offset-4" to="/calidad">{m.calidad.kicker}</Link></li>
            <li><Link className="underline decoration-gold/40 underline-offset-4" to="/comparar">{lang === "en" ? "Compare" : lang === "fr" ? "Comparer" : "Comparar"}</Link></li>
          </ul>
          <h2 className="mt-8 text-xs tracking-[0.2em] text-gold uppercase font-semibold">{m.footer.follow}</h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {SOCIAL.map((item) => (
              <li key={item.href}>
                <a className="underline decoration-gold/40 underline-offset-4" href={item.href} rel="noopener noreferrer">{item.label}<span className="sr-only"> (external)</span></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mx-auto mt-12 max-w-[1200px] border-t border-line px-5 pt-6 text-xs text-muted md:px-8">
        <p>{m.footer.copy}</p>
        <p className="mt-2 max-w-3xl">{m.footer.pwa}</p>
      </div>
    </footer>
  );
}
