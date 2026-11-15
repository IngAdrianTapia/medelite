import { Link } from "react-router";
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
      deck: "Esquema, no un mapa topográfico. Los trazos continuos son vuelos directos a PVR que aparecieron en la muestra del 14 de noviembre de 2026 (YVR, YYC, YYZ). Las otras ciudades canadienses de la lista no tienen tarifa directa en esa muestra.",
      soon: "Tulum, Manzanillo, Mérida y el centro oncológico se anuncian; no están en este mapa como hospitales abiertos.",
    },
    en: {
      title: "Network map",
      deck: "A schematic, not a survey map. Solid lines are nonstop flights to PVR that appeared in the 14 November 2026 sample (YVR, YYC, YYZ). The other Canadian cities on our list have no direct fare in that sample.",
      soon: "Tulum, Manzanillo, Mérida and the oncology centre are announced. They are not on this map as open hospitals.",
    },
    fr: {
      title: "Carte du réseau",
      deck: "Un schéma, pas une carte topographique. Les traits pleins sont des vols directs vers PVR présents dans l’échantillon du 14 novembre 2026 (YVR, YYC, YYZ). Les autres villes canadiennes de la liste n’ont pas de tarif direct dans cet échantillon.",
      soon: "Tulum, Manzanillo, Mérida et le centre d’oncologie sont annoncés. Ils ne figurent pas ici comme hôpitaux ouverts.",
    },
  }[lang];
  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-16">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/mapa" />
      <h1 className="font-serif text-5xl tracking-tight">{t.title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">{t.deck}</p>
      <svg viewBox="0 0 360 240" role="img" aria-label={t.title} className="mt-6 w-full rounded-3xl border border-line bg-white">
        <path d="M40 150 C70 120 90 190 130 180 C160 170 170 140 200 155 C240 175 250 120 300 100 C330 90 340 130 320 150 C280 190 200 210 120 200 C70 190 30 180 40 150 Z" fill="#e7eef3" stroke="#002b49" strokeWidth="1.2" />
        {["YVR", "YYC", "YYZ"].map((city, index) => (
          <g key={city}>
            <line x1={28} y1={36 + index * 18} x2={78} y2={168} stroke="#002b49" strokeWidth="1.2" />
            <text x="4" y={40 + index * 18} fontSize="9" fill="#002b49">{city}</text>
          </g>
        ))}
        {PINS.map((pin) => {
          const flip = pin.x > 250;
          return (
            <g key={pin.id}>
              <circle cx={pin.x} cy={pin.y} r="4" fill="#002b49" />
              <text x={flip ? pin.x - 8 : pin.x + 8} y={pin.y + 3} textAnchor={flip ? "end" : "start"} fontSize="9" fill="#162033">{pin.label}</text>
            </g>
          );
        })}
      </svg>
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
