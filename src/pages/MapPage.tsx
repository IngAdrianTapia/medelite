import { Link } from "react-router";
import { MapaSedes } from "../components/MapaSedes";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n";

const PINS = [
  { id: "marina", x: 78, y: 168, label: "Marina" },
  { id: "riviera", x: 96, y: 184, label: "Riviera" },
  { id: "penita", x: 62, y: 142, label: "La Peñita" },
  { id: "chapala", x: 118, y: 206, label: "Chapala" },
  { id: "guadalajara", x: 150, y: 168, label: "Guadalajara" },
  { id: "sma", x: 176, y: 142, label: "San Miguel" },
  { id: "queretaro", x: 210, y: 176, label: "Querétaro" },
  { id: "cancun", x: 300, y: 88, label: "Cancún" },
  { id: "playa", x: 292, y: 112, label: "Playa" },
];

export function MapPage() {
  const { lang } = useI18n();
  const t = {
    es: {
      title: "Mapa de la red",
      deck: "Esquema, no un mapa topográfico. Los trazos continuos son vuelos directos a Puerto Vallarta desde Vancouver, Calgary y Toronto. Las otras ciudades de la lista hacen escala.",
      soon: "Tulum, Manzanillo, Mérida y el centro oncológico se anuncian; no están en este mapa como hospitales abiertos.",
    },
    en: {
      title: "Network map",
      deck: "A schematic, not a survey map. Solid lines are nonstop flights to Puerto Vallarta from Vancouver, Calgary and Toronto. The other cities on the list connect with a stop.",
      soon: "Tulum, Manzanillo, Mérida and the oncology centre are announced. They are not on this map as open hospitals.",
    },
    fr: {
      title: "Carte du réseau",
      deck: "Un schéma, pas une carte topographique. Les traits pleins sont des vols directs vers Puerto Vallarta depuis Vancouver, Calgary et Toronto. Les autres villes de la liste font escale.",
      soon: "Tulum, Manzanillo, Mérida et le centre d’oncologie sont annoncés. Ils ne figurent pas ici comme hôpitaux ouverts.",
    },
  }[lang];
  return (
    <main id="contenido" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/mapa" />
      <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-ink">{t.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{t.deck}</p>
      <div className="mt-8">
        <MapaSedes />
      </div>
      <ul className="mt-4 grid gap-1 text-sm">
        {PINS.map((pin) => (
          <li key={pin.id}>
            <Link className="underline" to={`/red/${pin.id}`}>{pin.label}</Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">{t.soon}</p>
    </main>
  );
}
