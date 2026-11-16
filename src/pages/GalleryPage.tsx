import { PageCta } from "../components/PageCta";
import { PhotoCatalog } from "../components/PhotoCatalog";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n";

export function GalleryPage() {
  const { lang } = useI18n();
  const t = {
    es: {
      kicker: "Hospital Joya",
      title: "Galería por categoría",
      deck: "Cada foto está en la categoría de lo que muestra: fachada, instalación, quirófano, habitación o urgencias. No hay pacientes en estas imágenes.",
    },
    en: {
      kicker: "Hospital Joya",
      title: "Gallery by category",
      deck: "Each photograph sits in the category of what it shows: exterior, facility, operating room, patient room, or emergency. No patient appears in these images.",
    },
    fr: {
      kicker: "Hospital Joya",
      title: "Galerie par catégorie",
      deck: "Chaque photo est dans la catégorie de ce qu’elle montre : façade, installation, salle d’opération, chambre ou urgences. Aucun patient n’apparaît.",
    },
  }[lang];
  return (
    <main id="contenido" className="page-shell-wide">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/galeria" />
      <p className="eyebrow">{t.kicker}</p>
      <h1 className="mt-3 font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{t.title}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t.deck}</p>
      <div className="mt-8">
        <PhotoCatalog mode="tabs" />
      </div>
      <PageCta />
    </main>
  );
}
