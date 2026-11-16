import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { HOSPITAL_AIRPORT } from "../data/flights";
import { HOSPITAL_LL } from "../data/hospitalCoords";
import { HOSPITALS, type HospitalId } from "../data/hospitals";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";
import { FacilityPhoto } from "./FacilityPhoto";

type Lang = "es" | "en" | "fr";
const ZONES: readonly { id: string; sites: readonly HospitalId[]; name: Record<Lang, string>; region: Record<Lang, string> }[] = [
  { id: "pacifico", sites: ["marina", "riviera", "penita"], name: { es: "Vallarta y Riviera Nayarit", en: "Vallarta and Riviera Nayarit", fr: "Vallarta et Riviera Nayarit" }, region: { es: "Pacífico", en: "Pacific coast", fr: "Côte du Pacifique" } },
  { id: "occidente", sites: ["guadalajara", "chapala"], name: { es: "Guadalajara y Chapala", en: "Guadalajara and Chapala", fr: "Guadalajara et Chapala" }, region: { es: "Jalisco", en: "Jalisco", fr: "Jalisco" } },
  { id: "bajio", sites: ["sma", "queretaro"], name: { es: "San Miguel de Allende y Querétaro", en: "San Miguel de Allende and Querétaro", fr: "San Miguel de Allende et Querétaro" }, region: { es: "Bajío", en: "Bajío", fr: "Bajío" } },
  { id: "caribe", sites: ["cancun", "playa"], name: { es: "Cancún y Playa del Carmen", en: "Cancún and Playa del Carmen", fr: "Cancún et Playa del Carmen" }, region: { es: "Caribe mexicano", en: "Mexican Caribbean", fr: "Caraïbes mexicaines" } },
];

const UI = {
  es: { map: "Mapa de las sedes de Hospital Joya", zones: "Zonas", count: "{n} sedes", page: "Ver la sede", maps: "Cómo llegar", airport: "Aeropuerto", note: "Mapa real: teselas de Esri. Las fichas usan las fotos y direcciones que publica hospitaljoya.com. San Miguel y Cancún están en la coordenada publicada en OpenStreetMap o Nominatim; las demás, en la zona de la dirección publicada." },
  en: { map: "Map of Hospital Joya locations", zones: "Areas", count: "{n} hospitals", page: "View hospital", maps: "Directions", airport: "Airport", note: "Real map: Esri street tiles. Cards use the photos and addresses published on hospitaljoya.com. San Miguel and Cancún use the OpenStreetMap or Nominatim coordinate; the others use the area of the published address." },
  fr: { map: "Carte des établissements Hospital Joya", zones: "Secteurs", count: "{n} hôpitaux", page: "Voir l’établissement", maps: "Itinéraire", airport: "Aéroport", note: "Carte réelle : tuiles Esri. Les fiches reprennent les photos et adresses publiées sur hospitaljoya.com. San Miguel et Cancún utilisent la coordonnée OpenStreetMap ou Nominatim ; les autres, la zone de l’adresse publiée." },
} as const;

function mapsUrl(name: string, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}

export function MapaRed({ title, headingLevel = 3 }: { title?: string; headingLevel?: 2 | 3 }) {
  const { lang } = useI18n();
  const t = UI[lang];
  const [zoneId, setZoneId] = useState("pacifico");
  const mapNode = useRef<HTMLDivElement>(null);
  const found = ZONES.find((z) => z.id === zoneId) ?? ZONES[0];
  if (!found) throw new Error("Medelite: no hay zonas de sedes");
  const zone = found;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  useEffect(() => {
    const el = mapNode.current;
    if (!el) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    void (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !mapNode.current) return;
      map = L.map(mapNode.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution: 'Teselas © <a href="https://www.esri.com/">Esri</a>',
        maxZoom: 16,
      }).addTo(map);
      const markers: import("leaflet").Marker[] = [];
      for (const h of HOSPITALS) {
        const ll = HOSPITAL_LL[h.id];
        const on = (zone.sites as readonly string[]).includes(h.id);
        const icon = L.divIcon({
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          html: `<span style="display:grid;place-items:center;width:28px;height:28px;border-radius:999px;border:2px solid #fff;background:${on ? "#00788f" : "#071827"};color:#fff;font:600 11px/1 system-ui,sans-serif;box-shadow:0 6px 16px rgba(7,24,39,.28)">${h.name.replace("Hospital Joya ", "").slice(0, 1)}</span>`,
        });
        const marker = L.marker([ll.lat, ll.lng], { icon, title: h.name, zIndexOffset: on ? 200 : 0 });
        marker.bindPopup(`<strong>${h.name}</strong><br>${h.city}`);
        marker.addTo(map);
        markers.push(marker);
      }
      const focus = zone.sites.map((id) => L.latLng(HOSPITAL_LL[id].lat, HOSPITAL_LL[id].lng));
      if (focus.length) map.fitBounds(L.latLngBounds(focus).pad(0.55), { maxZoom: 9, animate: false });
    })();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [lang, zoneId, zone]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
      <div className="min-w-0">
        {title ? <Heading className="sr-only">{title}</Heading> : null}
        <div className="overflow-hidden rounded-3xl border border-line shadow-premium">
          <div ref={mapNode} className="h-[22rem] w-full sm:h-[28rem]" role="img" aria-label={t.map} data-nozoom />
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
