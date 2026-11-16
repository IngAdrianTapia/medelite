import { PageCta } from "../components/PageCta";
import { Link } from "react-router";
import { PhotoCatalog } from "../components/PhotoCatalog";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n";

export function HospitalJoyaPage() {
  const { lang } = useI18n();
  const t = {
    es: {
      kicker: "La red",
      title: "Hospital Joya",
      deck: "Las fotos del hospital están agrupadas por lo que son: fachadas de las nueve sedes, instalaciones, quirófanos, habitaciones y la entrada de urgencias que publicamos. MedElite no opera estos hospitales. Coordina desde Vancouver.",
      sedes: "Ver las nueve sedes",
      gallery: "Abrir la galería con filtros",
    },
    en: {
      kicker: "The network",
      title: "Hospital Joya",
      deck: "Hospital photographs are grouped by what they are: exteriors of the nine sites, facilities, operating rooms, patient rooms, and the emergency entrance we publish. MedElite does not run these hospitals. It coordinates from Vancouver.",
      sedes: "See the nine sites",
      gallery: "Open the filtered gallery",
    },
    fr: {
      kicker: "Le réseau",
      title: "Hospital Joya",
      deck: "Les photos de l’hôpital sont groupées selon ce qu’elles sont : façades des neuf sites, installations, salles d’opération, chambres, et l’entrée des urgences que nous publions. MedElite n’exploite pas ces hôpitaux. Il coordonne depuis Vancouver.",
      sedes: "Voir les neuf sites",
      gallery: "Ouvrir la galerie filtrée",
    },
  }[lang];
  return (
    <main id="contenido" className="page-shell-wide">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/hospital-joya" />
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow">{t.kicker}</p>
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] text-navy md:text-7xl">{t.title}</h1>
        </div>
        <div>
          <p className="max-w-[36rem] text-[17px] leading-relaxed text-muted">{t.deck}</p>
          <p className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-medium">
            <Link className="link-line text-navy" to="/red">{t.sedes} <span aria-hidden="true">→</span></Link>
            <Link className="link-line text-navy" to="/galeria">{t.gallery} <span aria-hidden="true">→</span></Link>
          </p>
        </div>
      </div>
      <PhotoCatalog mode="sections" />
      <PageCta />
    </main>
  );
}
