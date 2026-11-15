import { useState } from "react";
import { Link } from "react-router";
import { HOSPITAL_AIRPORT } from "../data/flights";
import { HOSPITALS, type HospitalId } from "../data/hospitals";
import { useI18n } from "../i18n";
import { IllustrationLabel } from "./IllustrationLabel";

const PIN: Record<HospitalId, { x: number; y: number }> = {
  penita: { x: 342, y: 332 },
  riviera: { x: 350, y: 348 },
  marina: { x: 358, y: 364 },
  guadalajara: { x: 430, y: 352 },
  chapala: { x: 446, y: 372 },
  sma: { x: 500, y: 340 },
  queretaro: { x: 524, y: 358 },
  cancun: { x: 786, y: 326 },
  playa: { x: 770, y: 348 },
};

const FLIGHTS = [
  { code: "YVR", city: "Vancouver", x: 130, y: 66, d: "M 130 66 Q 200 210 358 364" },
  { code: "YYC", city: "Calgary", x: 275, y: 54, d: "M 275 54 Q 300 200 358 364" },
  { code: "YYZ", city: "Toronto", x: 615, y: 66, d: "M 615 66 Q 500 190 358 364" },
] as const;

export function MapaSedes() {
  const { lang } = useI18n();
  const [selected, setSelected] = useState<HospitalId>("marina");
  const sede = HOSPITALS.find((hospital) => hospital.id === selected) ?? HOSPITALS[0];
  const ui = {
    es: {
      title: "Nueve sedes y vuelos directos hacia Puerto Vallarta",
      note: "No es un mapa topográfico ni una foto de una sede.",
      open: "Sede abierta",
      routes: "Vuelos directos hacia PVR",
      pick: "Elegir sede",
      openPage: "Ver la ficha",
      flights: "Las líneas son vuelos directos a Puerto Vallarta desde Vancouver, Calgary y Toronto. No son rutas hacia cada hospital.",
    },
    en: {
      title: "Nine hospitals and nonstop flights to Puerto Vallarta",
      note: "Not a survey map and not a photo of a hospital.",
      open: "Open hospital",
      routes: "Nonstops to PVR",
      pick: "Choose a hospital",
      openPage: "Open the page",
      flights: "The lines are nonstop flights to Puerto Vallarta from Vancouver, Calgary and Toronto. They are not routes to every hospital.",
    },
    fr: {
      title: "Neuf hôpitaux et vols directs vers Puerto Vallarta",
      note: "Ce n’est pas une carte topographique ni une photo d’un hôpital.",
      open: "Hôpital ouvert",
      routes: "Vols directs vers PVR",
      pick: "Choisir un hôpital",
      openPage: "Voir la fiche",
      flights: "Les traits sont des vols directs vers Puerto Vallarta depuis Vancouver, Calgary et Toronto. Ce ne sont pas des routes vers chaque hôpital.",
    },
  }[lang];

  if (!sede) return null;

  return (
    <div className="rounded-[2rem] border border-line bg-white p-6 shadow-premium md:p-10">
      <IllustrationLabel note={ui.note} />
      <h2 className="mt-4 font-serif text-3xl leading-tight text-ink md:text-4xl">{ui.title}</h2>
      <ul className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
        <li className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-navy" aria-hidden="true" />
          {ui.open}
        </li>
        <li className="inline-flex items-center gap-2">
          <span className="w-6 border-t-2 border-dashed border-navy" aria-hidden="true" />
          {ui.routes}
        </li>
      </ul>
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-line bg-paper" aria-hidden="true">
        <svg viewBox="0 0 880 470" className="h-auto w-full">
          <rect width="880" height="470" fill="#F8F9FA" />
          <path d="M 40 28 Q 440 14 840 28 L 840 100 Q 440 86 40 100 Z" fill="#0A2540" fillOpacity="0.05" />
          <path
            d="M 196 150 L 315 162 L 385 182 L 448 214 L 516 254 L 534 294 L 548 342 L 584 378 L 652 384 L 708 352 L 732 316 L 798 312 L 788 358 L 748 408 L 712 414 L 688 438 L 636 446 L 568 436 L 484 414 L 404 388 L 352 356 L 330 314 L 288 260 L 248 206 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.6"
          />
          <path d="M 164 148 L 194 152 L 228 242 L 246 286 L 234 294 L 208 250 L 178 192 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.6" />
          {FLIGHTS.map((flight) => (
            <g key={flight.code}>
              <path d={flight.d} fill="none" stroke="#0A2540" strokeWidth="2" strokeDasharray="6 6" />
              <g transform={`translate(${flight.x}, ${flight.y})`}>
                <rect x="-58" y="-14" width="116" height="28" rx="14" fill="#0A2540" />
                <text y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="600">
                  {flight.city} · {flight.code}
                </text>
              </g>
            </g>
          ))}
          {HOSPITALS.map((hospital) => {
            const pin = PIN[hospital.id];
            const active = hospital.id === selected;
            return (
              <circle key={hospital.id} cx={pin.x} cy={pin.y} r={active ? 7 : 4.5} fill={active ? "#0A2540" : "#FFFFFF"} stroke="#0A2540" strokeWidth="2" />
            );
          })}
        </svg>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{ui.flights}</p>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={ui.pick}>
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
      <div aria-live="polite" className="mt-4 flex flex-col gap-3 rounded-2xl border border-line bg-soft px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-navy uppercase">{HOSPITAL_AIRPORT[sede.id]}</p>
          <p className="mt-1 font-serif text-2xl text-ink">{sede.name}</p>
          <p className="text-sm text-muted">{sede.city}</p>
        </div>
        <Link className="inline-flex min-h-11 items-center rounded-full bg-navy px-5 text-sm font-semibold text-white" to={`/red/${sede.id}`}>
          {ui.openPage}
        </Link>
      </div>
    </div>
  );
}
