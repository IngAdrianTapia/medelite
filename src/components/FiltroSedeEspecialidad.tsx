import { useState } from "react";
import { Link } from "react-router";
import { HOSPITALS, type HospitalId } from "../data/hospitals";
import { HOSPITAL_FACTS, PUBLIC_SPECIALTIES, SPECIALTY_SITES, type PublicSpecialtyId } from "../data/joya";
import { SERVICE_LABEL, SPECIALTY_LABEL } from "../i18n/labels";
import { useI18n } from "../i18n";

const UI = {
  es: {
    title: "Buscar por especialidad y sede",
    lede: "Solo se cruzan datos que publica cada ficha de hospitaljoya.com. Si una sede no nombra la especialidad, no la mostramos como disponible; MedElite la confirma por escrito para cada caso.",
    specialty: "Especialidad",
    site: "Sede",
    any: "Todas",
    sitesFor: "Sedes cuya ficha nombra esta especialidad",
    noSites: "Ninguna ficha de sede nombra esta especialidad. Se confirma a solicitud.",
    specsAt: "Especialidades que nombra la ficha de esta sede",
    servicesAt: "Servicios que publica la ficha",
    noSpecs: "La ficha de esta sede no nombra ninguna de estas especialidades.",
    yes: "Sí: la ficha de esta sede nombra esta especialidad.",
    no: "La ficha de esta sede no la nombra. Se puede consultar a solicitud.",
    pick: "Elija una especialidad, una sede o ambas.",
    quote: "Solicitar cotización",
    open: "Ver la ficha",
    reset: "Limpiar filtros",
  },
  en: {
    title: "Search by specialty and hospital",
    lede: "We only match what each hospitaljoya.com page publishes. If a hospital does not name the specialty, we do not show it as available; MedElite confirms it in writing for each case.",
    specialty: "Specialty",
    site: "Hospital",
    any: "All",
    sitesFor: "Hospitals whose page names this specialty",
    noSites: "No hospital page names this specialty. Available on request.",
    specsAt: "Specialties named on this hospital’s page",
    servicesAt: "Services listed on the page",
    noSpecs: "This hospital’s page does not name any of these specialties.",
    yes: "Yes: this hospital’s page names this specialty.",
    no: "This hospital’s page does not name it. You can ask on request.",
    pick: "Choose a specialty, a hospital or both.",
    quote: "Request a quote",
    open: "Open the page",
    reset: "Clear filters",
  },
  fr: {
    title: "Rechercher par spécialité et par établissement",
    lede: "Nous croisons seulement ce que publie chaque fiche de hospitaljoya.com. Si un établissement ne nomme pas la spécialité, nous ne l’indiquons pas comme offerte; MedElite la confirme par écrit pour chaque cas.",
    specialty: "Spécialité",
    site: "Établissement",
    any: "Toutes",
    sitesFor: "Établissements dont la fiche nomme cette spécialité",
    noSites: "Aucune fiche d’établissement ne nomme cette spécialité. Offerte sur demande.",
    specsAt: "Spécialités nommées sur la fiche de cet établissement",
    servicesAt: "Services publiés sur la fiche",
    noSpecs: "La fiche de cet établissement ne nomme aucune de ces spécialités.",
    yes: "Oui : la fiche de cet établissement nomme cette spécialité.",
    no: "La fiche de cet établissement ne la nomme pas. Vous pouvez en faire la demande.",
    pick: "Choisissez une spécialité, un établissement ou les deux.",
    quote: "Demander une soumission",
    open: "Voir la fiche",
    reset: "Effacer les filtres",
  },
} as const;

export function FiltroSedeEspecialidad() {
  const { lang } = useI18n();
  const t = UI[lang];
  const [spec, setSpec] = useState<PublicSpecialtyId | "">("");
  const [site, setSite] = useState<HospitalId | "">("");
  const hospital = site ? HOSPITALS.find((h) => h.id === site) : undefined;
  const select = "mt-1 block min-h-12 w-full rounded-xl border border-line bg-white px-3 text-base text-ink";

  let result: React.ReactNode = <p className="text-sm text-muted">{t.pick}</p>;
  if (spec && site) {
    const ok = SPECIALTY_SITES[spec].includes(site);
    result = <p className={`text-base font-semibold ${ok ? "text-teal" : "text-ink"}`}>{ok ? t.yes : t.no}</p>;
  } else if (spec) {
    const sites = SPECIALTY_SITES[spec];
    result = sites.length ? (
      <div>
        <p className="text-xs font-bold tracking-[0.14em] text-navy uppercase">{t.sitesFor}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {sites.map((id) => (
            <li key={id}>
              <Link className="inline-flex min-h-11 items-center rounded-lg border border-navy px-4 text-sm font-semibold text-navy" to={`/red/${id}`}>
                {HOSPITALS.find((h) => h.id === id)?.name.replace("Hospital Joya ", "")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p className="text-sm text-ink">{t.noSites}</p>
    );
  } else if (site) {
    const specs = PUBLIC_SPECIALTIES.filter((id) => SPECIALTY_SITES[id].includes(site));
    result = (
      <div className="grid gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-navy uppercase">{t.specsAt}</p>
          {specs.length ? (
            <ul className="mt-2 flex flex-wrap gap-2">
              {specs.map((id) => (
                <li key={id}>
                  <Link className="inline-flex min-h-11 items-center rounded-lg border border-navy px-4 text-sm font-semibold text-navy" to={`/especialidades/${id}`}>
                    {SPECIALTY_LABEL[id][lang]}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-ink">{t.noSpecs}</p>
          )}
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-navy uppercase">{t.servicesAt}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink">{HOSPITAL_FACTS[site].services.map((s) => SERVICE_LABEL[s][lang]).join(" · ")}</p>
        </div>
      </div>
    );
  }

  return (
    <section aria-labelledby="filtro-title" className="mt-10 rounded-2xl border border-line bg-white p-5 shadow-premium md:p-8">
      <h2 id="filtro-title" className="font-serif text-2xl leading-tight text-ink md:text-3xl">{t.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{t.lede}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          {t.specialty}
          <select className={select} value={spec} onChange={(event) => setSpec(event.target.value as PublicSpecialtyId | "")}>
            <option value="">{t.any}</option>
            {PUBLIC_SPECIALTIES.map((id) => (
              <option key={id} value={id}>{SPECIALTY_LABEL[id][lang]}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          {t.site}
          <select className={select} value={site} onChange={(event) => setSite(event.target.value as HospitalId | "")}>
            <option value="">{t.any}</option>
            {HOSPITALS.map((h) => (
              <option key={h.id} value={h.id}>{h.name.replace("Hospital Joya ", "")} · {h.city}</option>
            ))}
          </select>
        </label>
      </div>
      <div aria-live="polite" className="mt-5 rounded-2xl bg-soft px-5 py-4">{result}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {hospital ? (
          <Link className="inline-flex min-h-11 items-center rounded-lg border border-navy px-5 text-sm font-semibold text-navy" to={`/red/${hospital.id}`}>{t.open}</Link>
        ) : null}
        <Link className="inline-flex min-h-11 items-center rounded-lg bg-navy px-5 text-sm font-semibold text-white" to="/#cotizar">{t.quote}</Link>
        {spec || site ? (
          <button type="button" className="inline-flex min-h-11 items-center rounded-lg px-4 text-sm text-muted underline" onClick={() => { setSpec(""); setSite(""); }}>{t.reset}</button>
        ) : null}
      </div>
    </section>
  );
}
