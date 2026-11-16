import { useState } from "react";
import { Link } from "react-router";
import { HOSPITALS, type HospitalId } from "../data/hospitals";
import { HOSPITAL_AIRPORT, ORIGIN_CODES, type OriginCode } from "../data/flights";
import type { PackageId, ProcedureId } from "../data/packages";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n/types";

const CITIES: Record<Lang, Record<OriginCode, string>> = {
  es: {
    YVR: "Vancouver",
    YYC: "Calgary",
    YEG: "Edmonton",
    YYZ: "Toronto",
    YUL: "Montreal",
    YOW: "Ottawa",
    YWG: "Winnipeg",
  },
  en: {
    YVR: "Vancouver",
    YYC: "Calgary",
    YEG: "Edmonton",
    YYZ: "Toronto",
    YUL: "Montreal",
    YOW: "Ottawa",
    YWG: "Winnipeg",
  },
  fr: {
    YVR: "Vancouver",
    YYC: "Calgary",
    YEG: "Edmonton",
    YYZ: "Toronto",
    YUL: "Montréal",
    YOW: "Ottawa",
    YWG: "Winnipeg",
  },
};

const UI = {
  es: {
    origin: "1. Ciudad en Canadá",
    hospital: "2. Sede Joya",
    result: "3. Vuelo de ida y vuelta",
    arrival: "Aeropuerto de llegada",
    quote: "Te cotizamos tu vuelo exacto.",
    cta: "Solicitar cotización",
    note: "La aerolínea confirma el precio. Este sitio no vende boletos.",
  },
  en: {
    origin: "1. City in Canada",
    hospital: "2. Joya hospital",
    result: "3. Round trip",
    arrival: "Arrival airport",
    quote: "We'll quote your exact flight.",
    cta: "Request a quote",
    note: "The airline confirms the price. This site does not sell tickets.",
  },
  fr: {
    origin: "1. Ville au Canada",
    hospital: "2. Hôpital Joya",
    result: "3. Aller-retour",
    arrival: "Aéroport d’arrivée",
    quote: "Nous préparons une soumission pour votre vol.",
    cta: "Demander une soumission",
    note: "La compagnie confirme le prix. Ce site ne vend pas de billets.",
  },
} as const satisfies Record<Lang, Record<string, string>>;

function defaultHospital(procedure: ProcedureId | ""): HospitalId {
  if (procedure === "bariatric") return "riviera";
  if (procedure === "plastic" || procedure === "ophthalmology") return "cancun";
  if (procedure === "hip" || procedure === "knee") return "marina";
  return "marina";
}

const field =
  "min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40";

export function FlightSimulator({
  procedure = "",
}: {
  procedure?: ProcedureId | "";
  packageId?: PackageId | "";
}) {
  const { lang } = useI18n();
  const t = UI[lang];
  const cities = CITIES[lang];
  const [origin, setOrigin] = useState<OriginCode>("YVR");
  const [hospital, setHospital] = useState<HospitalId>(defaultHospital(procedure));
  const airport = HOSPITAL_AIRPORT[hospital];

  return (
    <section className="rounded-[2rem] border border-line bg-white p-6 shadow-glass md:p-8" aria-label={t.result}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          {t.origin}
          <select className={field} value={origin} onChange={(event) => setOrigin(event.target.value as OriginCode)}>
            {ORIGIN_CODES.map((code) => (
              <option key={code} value={code}>
                {cities[code]} ({code})
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          {t.hospital}
          <select className={field} value={hospital} onChange={(event) => setHospital(event.target.value as HospitalId)}>
            {HOSPITALS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-6 rounded-[2rem] bg-paper p-6">
        <p className="text-xs font-bold tracking-[0.15em] text-navy uppercase">{t.result}</p>
        <p className="mt-2 text-sm text-muted">
          {cities[origin]} → {airport}. {t.arrival}: {airport}.
        </p>
        <p className="mt-3 font-serif text-3xl text-ink">{t.quote}</p>
        <p className="mt-4">
          <Link className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-sm font-semibold text-white shadow-premium hover:bg-navy" to="/#cotizar">
            {t.cta}
          </Link>
        </p>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{t.note}</p>
    </section>
  );
}
