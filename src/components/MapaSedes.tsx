import { useState, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { HOSPITAL_AIRPORT } from "../data/flights";
import { HOSPITALS, type HospitalId } from "../data/hospitals";
import { BELIZE_PATH, GUATEMALA_PATH, HOSPITAL_PIN, MAP_H, MAP_W, MEXICO_PATH, USA_PATH } from "../data/mexicoMap";
import { useI18n } from "../i18n";

/** Label position for each hospital. Pins sit on the real location; labels fan out so close sites stay readable. */
const LABEL: Record<HospitalId, { x: number; y: number; anchor: "start" | "middle" | "end"; short: string }> = {
  penita: { x: 360, y: 352, anchor: "end", short: "La Peñita" },
  riviera: { x: 350, y: 392, anchor: "end", short: "Riviera Nayarit" },
  marina: { x: 350, y: 436, anchor: "end", short: "Marina Vallarta" },
  chapala: { x: 430, y: 478, anchor: "middle", short: "Chapala · Ajijic" },
  guadalajara: { x: 405, y: 336, anchor: "middle", short: "Guadalajara" },
  sma: { x: 610, y: 340, anchor: "middle", short: "San Miguel de Allende" },
  queretaro: { x: 570, y: 452, anchor: "start", short: "Querétaro · Juriquilla" },
  cancun: { x: 905, y: 330, anchor: "middle", short: "Cancún" },
  playa: { x: 880, y: 470, anchor: "middle", short: "Playa del Carmen" },
};

/** Phone view: four zones with big tap targets. Bubbles sit beside the real pins, joined by a line. */
const ZONES = [
  { id: "pacifico", n: 1, sites: ["marina", "riviera", "penita"], bubble: { x: 345, y: 482 }, name: { es: "Vallarta y Riviera Nayarit", en: "Vallarta and Riviera Nayarit", fr: "Vallarta et Riviera Nayarit" } },
  { id: "occidente", n: 2, sites: ["guadalajara", "chapala"], bubble: { x: 452, y: 505 }, name: { es: "Guadalajara y Chapala", en: "Guadalajara and Chapala", fr: "Guadalajara et Chapala" } },
  { id: "bajio", n: 3, sites: ["sma", "queretaro"], bubble: { x: 540, y: 318 }, name: { es: "San Miguel de Allende y Querétaro", en: "San Miguel de Allende and Querétaro", fr: "San Miguel de Allende et Querétaro" } },
  { id: "caribe", n: 4, sites: ["cancun", "playa"], bubble: { x: 895, y: 318 }, name: { es: "Cancún y Playa del Carmen", en: "Cancún and Playa del Carmen", fr: "Cancún et Playa del Carmen" } },
] as const satisfies readonly { id: string; n: number; sites: readonly HospitalId[]; bubble: { x: number; y: number }; name: Record<"es" | "en" | "fr", string> }[];

function centroid(sites: readonly HospitalId[]): { x: number; y: number } {
  const pts = sites.map((id) => HOSPITAL_PIN[id]);
  return { x: pts.reduce((a, p) => a + p.x, 0) / pts.length, y: pts.reduce((a, p) => a + p.y, 0) / pts.length };
}

const CHAR = 7.4;
const PAD = 14;

function mapsUrl(name: string, address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}

export function MapaSedes({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const { lang } = useI18n();
  const [selected, setSelected] = useState<HospitalId>("marina");
  const sede = HOSPITALS.find((hospital) => hospital.id === selected) ?? HOSPITALS[0];
  const ui = {
    es: {
      title: "Las nueve sedes de Hospital Joya en México",
      lede: "Toque un punto o un nombre para ver la dirección, el teléfono y la ficha de esa sede.",
      zones: "Zonas con sedes",
      inZone: "Sedes en esta zona",
      count: "{n} sedes",
      map: "Mapa de México con las nueve sedes de Hospital Joya",
      pick: "Elegir sede",
      openPage: "Ver la ficha",
      directions: "Abrir en Google Maps",
      source: "Dirección publicada en hospitaljoya.com",
      airport: "Aeropuerto de llegada",
      note: "Contorno de México: Natural Earth (dominio público). Cada punto marca la zona de la dirección que publica Hospital Joya en hospitaljoya.com/hospitales; la ubicación exacta está en Google Maps.",
    },
    en: {
      title: "Hospital Joya’s nine sites in Mexico",
      lede: "Tap a dot or a name to see that hospital’s address, phone and page.",
      zones: "Areas with hospitals",
      inZone: "Hospitals in this area",
      count: "{n} hospitals",
      map: "Map of Mexico with Hospital Joya’s nine sites",
      pick: "Choose a hospital",
      openPage: "Open the page",
      directions: "Open in Google Maps",
      source: "Address published on hospitaljoya.com",
      airport: "Arrival airport",
      note: "Outline of Mexico: Natural Earth (public domain). Each dot marks the area of the address Hospital Joya publishes on hospitaljoya.com/hospitales; the exact location is in Google Maps.",
    },
    fr: {
      title: "Les neuf établissements Hospital Joya au Mexique",
      lede: "Touchez un point ou un nom pour voir l’adresse, le téléphone et la fiche de l’hôpital.",
      zones: "Zones avec des hôpitaux",
      inZone: "Hôpitaux de cette zone",
      count: "{n} hôpitaux",
      map: "Carte du Mexique avec les neuf établissements Hospital Joya",
      pick: "Choisir un hôpital",
      openPage: "Voir la fiche",
      directions: "Ouvrir dans Google Maps",
      source: "Adresse publiée sur hospitaljoya.com",
      airport: "Aéroport d’arrivée",
      note: "Contour du Mexique : Natural Earth (domaine public). Chaque point indique le secteur de l’adresse publiée par Hospital Joya sur hospitaljoya.com/hospitales; l’emplacement exact est dans Google Maps.",
    },
  }[lang];

  if (!sede) return null;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const zone = ZONES.find((z) => (z.sites as readonly HospitalId[]).includes(sede.id)) ?? ZONES[0];
  const pickZone = (id: (typeof ZONES)[number]["id"]) => {
    const target = ZONES.find((z) => z.id === id);
    if (target && target.id !== zone.id) setSelected(target.sites[0]);
  };

  const onKey = (id: HospitalId) => (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelected(id);
    }
  };

  return (
    <div className="rounded-[2rem] border border-line bg-white p-4 shadow-premium sm:p-6 md:p-10">
      <Heading className="font-serif text-3xl leading-tight text-ink md:text-4xl">{ui.title}</Heading>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{ui.lede}</p>
      <div className="mt-6 hidden overflow-hidden rounded-[1.5rem] border border-line bg-[#EEF3F8] lg:block">
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-auto w-full" role="group" aria-label={ui.map}>
          <path d={USA_PATH} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" aria-hidden="true" />
          <path d={GUATEMALA_PATH + BELIZE_PATH} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" aria-hidden="true" />
          <path d={MEXICO_PATH} fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.2" strokeLinejoin="round" aria-hidden="true" />
          {HOSPITALS.map((hospital) => {
            const pin = HOSPITAL_PIN[hospital.id];
            const label = LABEL[hospital.id];
            const active = hospital.id === selected;
            const width = label.short.length * CHAR + PAD * 2;
            const left = label.anchor === "start" ? label.x : label.anchor === "end" ? label.x - width : label.x - width / 2;
            const edgeX = Math.min(Math.max(pin.x, left), left + width);
            const edgeY = pin.y < label.y ? label.y - 13 : label.y + 13;
            return (
              <g
                key={hospital.id}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`${hospital.name}, ${hospital.city}`}
                className="cursor-pointer outline-none focus-visible:[&>rect]:stroke-gold"
                onClick={() => setSelected(hospital.id)}
                onKeyDown={onKey(hospital.id)}
              >
                <line x1={pin.x} y1={pin.y} x2={edgeX} y2={edgeY} stroke="#0A2540" strokeOpacity={active ? 0.9 : 0.35} strokeWidth="1.2" />
                <rect x={left} y={label.y - 13} width={width} height={26} rx={13} fill={active ? "#0A2540" : "#FFFFFF"} stroke="#0A2540" strokeWidth={active ? 0 : 1.2} />
                <text x={left + width / 2} y={label.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="600" fill={active ? "#FFFFFF" : "#0A2540"}>
                  {label.short}
                </text>
                <circle cx={pin.x} cy={pin.y} r={14} fill="transparent" />
                <circle cx={pin.x} cy={pin.y} r={active ? 6.5 : 4.5} fill={active ? "#B08D57" : "#0A2540"} stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="-mx-1 mt-5 overflow-hidden rounded-[1.25rem] border border-line bg-[#EEF3F8] lg:hidden">
        <svg viewBox="290 236 690 330" className="h-auto w-full" role="group" aria-label={ui.map}>
          <path d={USA_PATH} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" aria-hidden="true" />
          <path d={GUATEMALA_PATH + BELIZE_PATH} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" aria-hidden="true" />
          <path d={MEXICO_PATH} fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true" />
          {HOSPITALS.map((hospital) => {
            const pin = HOSPITAL_PIN[hospital.id];
            const active = hospital.id === selected;
            return <circle key={hospital.id} cx={pin.x} cy={pin.y} r={active ? 7 : 5} fill={active ? "#B08D57" : "#0A2540"} stroke="#FFFFFF" strokeWidth="2" aria-hidden="true" />;
          })}
          {ZONES.map((z) => {
            const c = centroid(z.sites);
            const active = z.id === zone.id;
            return (
              <g
                key={z.id}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`${z.n}. ${z.name[lang]}`}
                className="cursor-pointer outline-none"
                onClick={() => pickZone(z.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    pickZone(z.id);
                  }
                }}
              >
                <line x1={c.x} y1={c.y} x2={z.bubble.x} y2={z.bubble.y} stroke="#0A2540" strokeWidth="2" strokeOpacity={active ? 0.9 : 0.4} />
                <circle cx={z.bubble.x} cy={z.bubble.y} r={50} fill="transparent" />
                <circle cx={z.bubble.x} cy={z.bubble.y} r={34} fill={active ? "#0A2540" : "#FFFFFF"} stroke="#0A2540" strokeWidth="3" />
                <text x={z.bubble.x} y={z.bubble.y + 12} textAnchor="middle" fontSize="34" fontWeight="700" fill={active ? "#FFFFFF" : "#0A2540"}>
                  {z.n}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">{ui.note}</p>
      <div className="mt-4 grid gap-2 lg:hidden" role="group" aria-label={ui.zones}>
        {ZONES.map((z) => {
          const active = z.id === zone.id;
          return (
            <div key={z.id}>
              <button
                type="button"
                aria-pressed={active}
                aria-expanded={active}
                className={`flex min-h-14 w-full items-center gap-3 rounded-2xl px-4 text-left ${active ? "bg-navy text-white" : "border border-line bg-paper text-ink"}`}
                onClick={() => pickZone(z.id)}
              >
                <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold ${active ? "bg-white text-navy" : "bg-navy text-white"}`}>{z.n}</span>
                <span className="flex-1 text-base font-semibold leading-tight">{z.name[lang]}</span>
                <span className={`text-sm ${active ? "text-white/80" : "text-muted"}`}>{ui.count.replace("{n}", String(z.sites.length))}</span>
              </button>
              {active ? (
                <div className="mt-2 flex flex-wrap gap-2 pl-1" role="group" aria-label={ui.inZone}>
                  {z.sites.map((id) => {
                    const hospital = HOSPITALS.find((h) => h.id === id);
                    if (!hospital) return null;
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={id === selected}
                        className={`min-h-12 rounded-full px-5 text-base font-semibold ${id === selected ? "bg-gold text-white" : "border border-navy bg-white text-navy"}`}
                        onClick={() => setSelected(id)}
                      >
                        {hospital.name.replace("Hospital Joya ", "")}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mt-5 hidden flex-wrap gap-2 lg:flex" role="group" aria-label={ui.pick}>
        {HOSPITALS.map((hospital) => (
          <button
            key={hospital.id}
            type="button"
            aria-pressed={hospital.id === selected}
            className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
              hospital.id === selected ? "bg-navy text-white" : "border border-line bg-paper text-ink"
            }`}
            onClick={() => setSelected(hospital.id)}
          >
            {hospital.name.replace("Hospital Joya ", "")}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-5 grid gap-4 rounded-2xl border border-line bg-soft px-4 py-5 sm:px-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-navy uppercase">
            {ui.airport}: {HOSPITAL_AIRPORT[sede.id]}
          </p>
          <p className="mt-1 font-serif text-2xl text-ink">{sede.name}</p>
          <p className="text-sm text-muted">{sede.city}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{sede.address}</p>
          <p className="mt-1 text-sm">
            {sede.phones.map((phone, index) => (
              <span key={phone.tel}>
                {index > 0 ? " · " : ""}
                <a className="underline" href={`tel:${phone.tel}`}>{phone.label}</a>
              </span>
            ))}
          </p>
          <p className="mt-2 text-xs text-muted">
            <a className="underline" href={sede.url} rel="noopener noreferrer" target="_blank">{ui.source}</a>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a className="inline-flex min-h-11 items-center rounded-full border border-navy px-5 text-sm font-semibold text-navy" href={mapsUrl(sede.name, sede.address)} rel="noopener noreferrer" target="_blank">
            {ui.directions}
          </a>
          <Link className="inline-flex min-h-11 items-center rounded-full bg-navy px-5 text-sm font-semibold text-white" to={`/red/${sede.id}`}>
            {ui.openPage}
          </Link>
        </div>
      </div>
    </div>
  );
}
