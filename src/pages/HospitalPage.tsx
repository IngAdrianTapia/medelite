import { Link, useParams } from "react-router";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { hospitalById, HOSPITAL_IDS, type HospitalId } from "../data/hospitals";
import { HOSPITAL_AIRPORT } from "../data/flights";
import { HOSPITAL_FACTS } from "../data/joya";
import { PHOTO_OF, SERVICE_LABEL } from "../i18n/labels";
import { useI18n } from "../i18n";

function isHospital(value: string | undefined): value is HospitalId {
  return typeof value === "string" && (HOSPITAL_IDS as readonly string[]).includes(value);
}

export function HospitalPage() {
  const { hospitalId } = useParams();
  const { lang } = useI18n();
  if (!isHospital(hospitalId)) {
    return (
      <main id="contenido" className="mx-auto max-w-3xl px-5 py-20 md:py-24">
        <h1 className="font-serif text-4xl">—</h1>
        <Link to="/red">Red</Link>
      </main>
    );
  }
  const hospital = hospitalById(hospitalId);
  const facts = HOSPITAL_FACTS[hospitalId];
  const copy = {
    es: {
      back: "Todas las sedes",
      services: "Lo que la ficha enumera",
      call: "Llamar a la sede",
      office: "O llame a coordinación en Vancouver",
      airport: "Aeropuerto que usamos para planear el viaje. No es un tiempo de traslado medido.",
      source: "Fuente",
    },
    en: {
      back: "All hospitals",
      services: "What the hospital page lists",
      call: "Call this hospital",
      office: "Or call coordination in Vancouver",
      airport: "Airport we use to plan the trip. Not a measured transfer time.",
      source: "Source",
    },
    fr: {
      back: "Tous les établissements",
      services: "Ce que la fiche énumère",
      call: "Appeler cet hôpital",
      office: "Ou appeler la coordination à Vancouver",
      airport: "Aéroport utilisé pour planifier le voyage. Ce n’est pas un temps de transfert mesuré.",
      source: "Source",
    },
  }[lang];

  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-20 md:py-24">
      <Seo title={`${hospital.name} — MedElite`} description={hospital.address} path={`/red/${hospital.id}`} />
      <p>
        <Link className="text-sm underline" to="/red">
          {copy.back}
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.1] tracking-tight text-ink">{hospital.name}</h1>
      <p className="mt-2 text-muted">{hospital.city}</p>
      <figure className="mt-6 overflow-hidden rounded-3xl border border-line">
        <FacilityPhoto name={hospital.id} alt={PHOTO_OF[hospital.id]?.[lang] ?? hospital.name} className="h-auto w-full object-cover" sizes="(min-width: 768px) 48rem, 100vw" priority />
      </figure>
      <p className="mt-6">{hospital.address}</p>
      <ul className="mt-3 grid gap-2 text-sm">
        {facts.phones.map((phone) => (
          <li key={phone.tel}>
            <a className="underline" href={`tel:${phone.tel}`}>
              {phone.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">
        {HOSPITAL_AIRPORT[hospital.id]}. {copy.airport}
      </p>
      <h2 className="mt-8 font-serif text-3xl">{copy.services}</h2>
      <ul className="mt-3 grid gap-2 text-sm">
        {facts.services.map((id) => (
          <li key={id}>{SERVICE_LABEL[id][lang]}</li>
        ))}
      </ul>
      <p className="mt-6 flex flex-wrap gap-3">
        <a className="inline-flex min-h-12 items-center rounded-full bg-navy px-5 text-sm font-semibold text-white shadow-premium hover:bg-navy-2" href={`tel:${facts.phones[0]?.tel ?? ""}`}>
          {copy.call}
        </a>
        <a className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm" href="tel:+16044428475">
          {copy.office} · +1 (604) 442-8475
        </a>
      </p>
      <p className="mt-4 text-sm">
        {copy.source}:{" "}
        <a className="underline" href={facts.url} rel="noopener noreferrer">
          hospitaljoya.com
        </a>
      </p>
    </main>
  );
}
