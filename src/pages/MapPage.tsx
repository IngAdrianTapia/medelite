import { MapaSedes } from "../components/MapaSedes";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n";

export function MapPage() {
  const { lang } = useI18n();
  const t = {
    es: {
      title: "Mapa de la red",
      deck: "Las nueve sedes abiertas que publica Hospital Joya en hospitaljoya.com/hospitales, en su lugar real dentro de México. Seleccione una para ver su dirección, su teléfono y su ficha.",
      soon: "Tulum, Manzanillo, Mérida y el centro oncológico se anuncian; no están en este mapa porque todavía no son hospitales abiertos.",
    },
    en: {
      title: "Network map",
      deck: "The nine open sites Hospital Joya lists on hospitaljoya.com/hospitales, placed where they really are in Mexico. Select one to see its address, phone and page.",
      soon: "Tulum, Manzanillo, Mérida and the oncology centre are announced. They are not on this map because they are not open hospitals yet.",
    },
    fr: {
      title: "Carte du réseau",
      deck: "Les neuf établissements ouverts que Hospital Joya publie sur hospitaljoya.com/hospitales, placés à leur vrai emplacement au Mexique. Sélectionnez-en un pour voir son adresse, son téléphone et sa fiche.",
      soon: "Tulum, Manzanillo, Mérida et le centre d’oncologie sont annoncés. Ils ne figurent pas sur cette carte, car ce ne sont pas encore des hôpitaux ouverts.",
    },
  }[lang];
  return (
    <main id="contenido" className="page-shell-wide">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/mapa" />
      <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-ink">{t.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{t.deck}</p>
      <div className="mt-8">
        <MapaSedes />
      </div>
      <p className="mt-4 text-sm text-muted">{t.soon}</p>
    </main>
  );
}
