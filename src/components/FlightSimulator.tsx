import { useMemo, useState } from "react";
import { Link } from "react-router";
import { HOSPITALS, type HospitalId } from "../data/hospitals";
import {
  FARE_DISCLAIMER,
  FARE_SAMPLE_COLLECTED,
  FARE_SAMPLE_TRIP,
  HOSPITAL_AIRPORT,
  ORIGIN_CODES,
  SEARCH_AIRLINES,
  formatSampleAmount,
  illustrateTotal,
  staticSampleAdapter,
  type OriginCode,
} from "../data/flights";
import { PACKAGE_BANDS, type PackageId, type ProcedureId } from "../data/packages";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n/types";

const UI = {
  es: {
    title: "Estimación de vuelo",
    origin: "Salida en Canadá",
    hospital: "Sede Joya",
    airport: "Aeropuerto de planeación",
    nonstop: "Directo en la muestra",
    connecting: "Con escala en la muestra",
    none: "Esta muestra del 14 de noviembre de 2026 no trae tarifa para esa combinación.",
    currency: "El buscador mostró «$» sin confirmar si es CAD o USD. No lo sumamos a un precio cerrado.",
    sample: "Muestra: 15 al 25 de enero de 2027, 1 adulto, económica, hacia PVR. Recolectada el 14 de noviembre de 2026, 18:20 (UTC−6).",
    yours: "Sus fechas no cambian esta muestra. La aerolínea confirma el precio.",
    package: "Rango de paquete (CAD, ejemplo de rodilla)",
    total: "Suma ilustrada solo si ese «$» fuera dólar canadiense",
    noPackage: "Este procedimiento no tiene banda publicada. El vuelo, si hay muestra, no se convierte en un total.",
    pick: "En esta página el vuelo va solo. En el cuestionario, rodilla o cadera suman el rango del paquete en CAD.",
    transfers: "Essential y Executive ya incluyen, en el ejemplo, el hotel y los traslados. Snowbird no incluye hotel ni vuelo.",
    airlines: "Aerolíneas vistas en esa búsqueda",
    cta: "Hablar con coordinación",
  },
  en: {
    title: "Flight estimate",
    origin: "Departure in Canada",
    hospital: "Joya hospital",
    airport: "Planning airport",
    nonstop: "Nonstop in the sample",
    connecting: "Connecting in the sample",
    none: "The 14 November 2026 sample has no fare for that pair.",
    currency: "The search showed “$” and did not confirm CAD or USD. This is not added into a firm price.",
    sample: "Sample: 15–25 January 2027, 1 adult, economy, to PVR. Collected 14 November 2026, 18:20 (UTC−6).",
    yours: "Your own dates do not change this sample. The airline confirms the price.",
    package: "Package range (CAD, knee example)",
    total: "Illustrated sum only if that “$” were Canadian dollars",
    noPackage: "This procedure has no published band. A fare sample, if any, is not turned into a total.",
    pick: "On this page the flight stands alone. In the questionnaire, knee or hip adds the package range in CAD.",
    transfers: "In the example, Essential and Executive already include the hotel and transfers. Snowbird includes neither hotel nor flight.",
    airlines: "Airlines seen in that search",
    cta: "Talk with coordination",
  },
  fr: {
    title: "Estimation de vol",
    origin: "Départ au Canada",
    hospital: "Hôpital Joya",
    airport: "Aéroport de planification",
    nonstop: "Vol direct dans l’échantillon",
    connecting: "Avec escale dans l’échantillon",
    none: "L’échantillon du 14 novembre 2026 n’a pas de tarif pour cette combinaison.",
    currency: "Le moteur a affiché « $ » sans confirmer CAD ou USD. Ce n’est pas un prix ferme.",
    sample: "Échantillon : 15 au 25 janvier 2027, 1 adulte, économique, vers PVR. Collecté le 14 novembre 2026, 18 h 20 (UTC−6).",
    yours: "Vos dates ne changent pas cet échantillon. La compagnie confirme le prix.",
    package: "Fourchette du forfait (CAD, exemple du genou)",
    total: "Somme illustrée seulement si ce « $ » était en dollars canadiens",
    noPackage: "Cette intervention n’a pas de bande publiée. L’échantillon de vol, s’il existe, ne devient pas un total.",
    pick: "Sur cette page, le vol est seul. Dans le questionnaire, le genou ou la hanche ajoute la fourchette du forfait en CAD.",
    transfers: "Dans l’exemple, Essential et Executive incluent déjà l’hôtel et les transferts. Snowbird n’inclut ni l’hôtel ni le vol.",
    airlines: "Compagnies vues dans cette recherche",
    cta: "Parler à la coordination",
  },
} as const satisfies Record<Lang, Record<string, string>>;

function defaultHospital(procedure: ProcedureId | ""): HospitalId {
  if (procedure === "bariatric") return "riviera";
  if (procedure === "plastic" || procedure === "ophthalmology") return "cancun";
  if (procedure === "hip" || procedure === "knee") return "marina";
  return "marina";
}

export function FlightSimulator({
  procedure = "",
  packageId = "",
}: {
  procedure?: ProcedureId | "";
  packageId?: PackageId | "";
}) {
  const { lang } = useI18n();
  const t = UI[lang];
  const [origin, setOrigin] = useState<OriginCode>("YVR");
  const [hospital, setHospital] = useState<HospitalId>(defaultHospital(procedure));
  const airport = HOSPITAL_AIRPORT[hospital];
  const quote = useMemo(
    () =>
      staticSampleAdapter.quote({
        origin,
        destination: airport,
        depart: FARE_SAMPLE_TRIP.depart,
        returnDate: FARE_SAMPLE_TRIP.return,
        adults: 1,
        cabin: "economy",
      }),
    [airport, origin],
  );
  const band = procedure === "knee" || procedure === "hip" ? (packageId ? PACKAGE_BANDS[packageId] : PACKAGE_BANDS.essential) : null;
  const total = illustrateTotal(quote, band);

  return (
    <section className="rounded-[2rem] border border-line bg-paper shadow-glass p-5" aria-label={t.title}>
      <p className="text-xs font-bold tracking-[0.15em] text-navy uppercase">{FARE_DISCLAIMER}</p>
      <h3 className="mt-2 font-serif text-3xl">{t.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t.sample}</p>
      <p className="mt-1 text-sm text-muted">{t.yours}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          {t.origin}
          <select className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={origin} onChange={(event) => setOrigin(event.target.value as OriginCode)}>
            {ORIGIN_CODES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          {t.hospital}
          <select className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={hospital} onChange={(event) => setHospital(event.target.value as HospitalId)}>
            {HOSPITALS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 text-sm">
        {t.airport}: <strong>{airport}</strong>
      </p>
      {quote.available && quote.span ? (
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-xs text-muted">{t.nonstop}</dt>
            <dd className="mt-1 font-serif text-2xl">
              {quote.nonstop ? `${formatSampleAmount(quote.nonstop.low)} – ${formatSampleAmount(quote.nonstop.high)}` : "—"}
            </dd>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-xs text-muted">{t.connecting}</dt>
            <dd className="mt-1 font-serif text-2xl">
              {quote.connecting ? `${formatSampleAmount(quote.connecting.low)} – ${formatSampleAmount(quote.connecting.high)}` : "—"}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-4 text-sm leading-relaxed">{t.none}</p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-muted">{t.currency}</p>
      <p className="mt-2 text-sm text-muted">
        {t.airlines}: {SEARCH_AIRLINES.join(", ")}. {FARE_SAMPLE_COLLECTED}
      </p>
      {procedure === "" ? (
        <p className="mt-3 text-sm">{t.pick}</p>
      ) : band ? (
        <p className="mt-3 text-sm">
          {t.package}: CAD {band.low.toLocaleString("en-CA")} – {band.high.toLocaleString("en-CA")}
        </p>
      ) : (
        <p className="mt-3 text-sm">{t.noPackage}</p>
      )}
      {total.shown && total.low !== null && total.high !== null ? (
        <p className="mt-2 text-sm font-medium">
          {t.total}: {formatSampleAmount(total.low)} – {formatSampleAmount(total.high)}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-muted">{t.transfers}</p>
      <p className="mt-4 flex flex-wrap gap-3">
        <a className="inline-flex min-h-12 items-center rounded-full bg-navy px-5 text-sm font-semibold text-white shadow-premium hover:bg-navy-2" href="tel:+16044428475">
          +1 (604) 442-8475
        </a>
        <a className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm" href="mailto:info@medeliteofficial.com">
          info@medeliteofficial.com
        </a>
        <Link className="inline-flex min-h-11 items-center text-sm underline" to="/#cotizar">
          {t.cta}
        </Link>
      </p>
    </section>
  );
}
