import { useState } from "react";
import { Link } from "react-router";
import { HOSPITAL_AIRPORT } from "../data/flights";
import { HOSPITALS, type HospitalId } from "../data/hospitals";
import { HOSPITAL_PIN, MEXICO_PATH } from "../data/mexicoMap";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";
import { FacilityPhoto } from "./FacilityPhoto";

const VB = { x: 0, y: 20, w: 960, h: 590 };

type Lang = "es" | "en" | "fr";
const ZONES: readonly { id: string; sites: readonly HospitalId[]; name: Record<Lang, string>; region: Record<Lang, string> }[] = [
  { id: "pacifico", sites: ["marina", "riviera", "penita"], name: { es: "Vallarta y Riviera Nayarit", en: "Vallarta and Riviera Nayarit", fr: "Vallarta et Riviera Nayarit" }, region: { es: "Pacífico", en: "Pacific coast", fr: "Côte du Pacifique" } },
  { id: "occidente", sites: ["guadalajara", "chapala"], name: { es: "Guadalajara y Chapala", en: "Guadalajara and Chapala", fr: "Guadalajara et Chapala" }, region: { es: "Jalisco", en: "Jalisco", fr: "Jalisco" } },
  { id: "bajio", sites: ["sma", "queretaro"], name: { es: "San Miguel de Allende y Querétaro", en: "San Miguel de Allende and Querétaro", fr: "San Miguel de Allende et Querétaro" }, region: { es: "Bajío", en: "Bajío", fr: "Bajío" } },
  { id: "caribe", sites: ["cancun", "playa"], name: { es: "Cancún y Playa del Carmen", en: "Cancún and Playa del Carmen", fr: "Cancún et Playa del Carmen" }, region: { es: "Caribe mexicano", en: "Mexican Caribbean", fr: "Caraïbes mexicaines" } },
];

/** Real centre of each zone’s pins, and where its marker sits (off the coast or the cluster) so markers never overlap on a phone. */
function centre(sites: readonly HospitalId[]) {
  const pts = sites.map((s) => HOSPITAL_PIN[s]);
  return { x: pts.reduce((a, p) => a + p.x, 0) / pts.length, y: pts.reduce((a, p) => a + p.y, 0) / pts.length };
}
const MARKER: Record<string, { x: number; y: number }> = {
  pacifico: { x: 300, y: 372 },
  occidente: { x: 452, y: 486 },
  bajio: { x: 556, y: 330 },
  caribe: { x: 905, y: 318 },
};

const UI = {
  es: { map: "Mapa de México con las sedes de Hospital Joya", zones: "Zonas", count: "{n} sedes", page: "Ver la sede", maps: "Cómo llegar", airport: "Aeropuerto", note: "Contorno: Natural Earth (dominio público). Los marcadores agrupan las sedes por zona; las direcciones son las que publica hospitaljoya.com." },
  en: { map: "Map of Mexico with Hospital Joya’s locations", zones: "Areas", count: "{n} hospitals", page: "View hospital", maps: "Directions", airport: "Airport", note: "Outline: Natural Earth (public domain). Markers group hospitals by area; addresses are those published on hospitaljoya.com." },
  fr: { map: "Carte du Mexique avec les établissements Hospital Joya", zones: "Secteurs", count: "{n} hôpitaux", page: "Voir l’établissement", maps: "Itinéraire", airport: "Aéroport", note: "Contour : Natural Earth (domaine public). Les repères regroupent les établissements par secteur; les adresses sont celles publiées sur hospitaljoya.com." },
} as const;

function mapsUrl(name: string, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}

export function MapaRed({ title, headingLevel = 3 }: { title?: string; headingLevel?: 2 | 3 }) {
  const { lang } = useI18n();
  const t = UI[lang];
  const [zoneId, setZoneId] = useState("pacifico");
  const [hover, setHover] = useState<string | null>(null);
  const zone = ZONES.find((z) => z.id === zoneId) ?? ZONES[0];
  const Heading = headingLevel === 2 ? "h2" : "h3";
  if (!zone) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
      <div className="min-w-0">
        {title ? <Heading className="sr-only">{title}</Heading> : null}
        <div className="relative overflow-hidden rounded-3xl border border-line p-3 sm:p-6" style={{ background: "linear-gradient(180deg, #eef4f7 0%, #f7f4ee 100%)" }}>
          <div className="relative" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
            <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" role="img" aria-label={t.map}>
              <path d={MEXICO_PATH} fill="#fbf8f2" stroke="#6d8494" strokeWidth="1.35" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {HOSPITALS.map((h) => {
                const pin = HOSPITAL_PIN[h.id];
                const on = (zone.sites as readonly string[]).includes(h.id);
                return <circle key={h.id} cx={pin.x} cy={pin.y} r={on ? 3.4 : 2.3} fill={on ? "#00788f" : "#7b8f9c"} />;
              })}
              {ZONES.map((z) => {
                const c = centre(z.sites);
                const mk = MARKER[z.id] ?? c;
                return <line key={z.id} x1={c.x} y1={c.y} x2={mk.x} y2={mk.y} stroke={z.id === zone.id ? "#00788f" : "#9db0bf"} strokeWidth="1" vectorEffect="non-scaling-stroke" />;
              })}
            </svg>
            {ZONES.map((z) => {
              const c = MARKER[z.id] ?? centre(z.sites);
              const left = ((c.x - VB.x) / VB.w) * 100;
              const top = ((c.y - VB.y) / VB.h) * 100;
              const active = z.id === zone.id;
              const tip = hover === z.id;
              return (
                <div key={z.id} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-label={`${z.name[lang]} — ${t.count.replace("{n}", String(z.sites.length))}`}
                    onClick={() => setZoneId(z.id)}
                    onMouseEnter={() => setHover(z.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(z.id)}
                    onBlur={() => setHover(null)}
                    className="group relative -translate-x-1/2 -translate-y-1/2"
                  >
                    <span className={`relative grid h-11 w-11 place-items-center rounded-full border-2 text-sm font-semibold tabular-nums shadow-premium transition-all duration-300 sm:h-12 sm:w-12 ${active ? "scale-110 border-white bg-teal text-white" : "border-white bg-navy text-white group-hover:bg-teal"}`}>
                      {z.sites.length}
                    </span>
                  </button>
                  <span role="tooltip" className={`pointer-events-none absolute bottom-full left-1/2 mb-7 hidden w-max max-w-[14rem] -translate-x-1/2 rounded-xl bg-navy px-3 py-2 text-xs leading-snug text-white shadow-premium transition-opacity duration-200 sm:block ${tip ? "opacity-100" : "opacity-0"}`}>
                    <span className="block font-semibold">{z.name[lang]}</span>
                    <span className="text-white/70">{z.region[lang]} · {t.count.replace("{n}", String(z.sites.length))}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label={t.zones}>
          {ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              aria-pressed={z.id === zone.id}
              onClick={() => setZoneId(z.id)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${z.id === zone.id ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-navy"}`}
            >
              <span className={`grid h-6 w-6 place-items-center rounded-full text-xs tabular-nums ${z.id === zone.id ? "bg-white text-navy" : "bg-soft text-navy"}`}>{z.sites.length}</span>
              {z.region[lang]}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">{t.note}</p>
      </div>

      <div aria-live="polite" className="min-w-0">
        <p className="eyebrow">{zone.region[lang]}</p>
        <p className="mt-2 font-serif text-3xl leading-tight text-navy">{zone.name[lang]}</p>
        <ul key={zone.id} className="mt-5 grid gap-3">
          {zone.sites.map((id, i) => {
            const h = HOSPITALS.find((row) => row.id === id);
            if (!h) return null;
            return (
              <li key={id} className="lift animate-[fadeUp_.5s_cubic-bezier(.16,1,.3,1)_both] overflow-hidden rounded-2xl border border-line bg-white" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)]">
                  <div className="relative bg-soft" data-gallery="mapa">
                    <FacilityPhoto name={id} fill alt={PHOTO_OF[id]?.[lang] ?? h.name} sizes="8rem" />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold leading-tight text-navy">{h.name.replace("Hospital Joya ", "")}</p>
                    <p className="text-xs text-muted">{h.city} · {t.airport} {HOSPITAL_AIRPORT[id]}</p>
                    <p className="mt-2 text-[13px] leading-snug text-ink/80">{h.address}</p>
                    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
                      {h.phones[0] ? <a className="link-line font-medium text-teal" href={`tel:${h.phones[0].tel}`}>{h.phones[0].label}</a> : null}
                      <a className="link-line text-navy" href={mapsUrl(h.name, h.address)} target="_blank" rel="noopener noreferrer">{t.maps} ↗</a>
                      <Link className="link-line font-semibold text-navy" to={`/red/${id}`}>{t.page} →</Link>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
