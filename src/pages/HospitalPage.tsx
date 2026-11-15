import { Link, useParams } from "react-router";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { hospitalById, HOSPITAL_IDS, type HospitalId } from "../data/hospitals";
import { HOSPITAL_AIRPORT } from "../data/flights";
import { HOSPITAL_FACTS } from "../data/joya";
import { HOSPITAL_INTERIORS } from "../data/photoCredits";
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
      <main id="contenido" className="page-shell">
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
      services: "Servicios que publica el hospital",
      call: "Llamar al hospital",
      office: "O llamar a MedElite en Vancouver",
      airport: "Aeropuerto de referencia para planear el viaje; no indica el tiempo de traslado.",
      source: "Fuente",
      partner: "MedElite coordina consultas desde Canadá con la red Hospital Joya. La atención médica en esta sede de México depende de que el hospital y el equipo clínico acepten el caso.",
      verify: "Confirme por escrito la disponibilidad del procedimiento, el equipo clínico y el plan antes de viajar.",
      partnerSource: "Ver la lista de hospitales de MedElite",
      diagnostics: "Sala de resonancia publicada en la ficha de Hospital Joya Marina. Imagen: Hospital Joya.",
    },
    en: {
      back: "All hospitals",
      services: "Services listed by the hospital",
      call: "Call the hospital",
      office: "Or call MedElite in Vancouver",
      airport: "Reference airport for travel planning; this is not a transfer time.",
      source: "Source",
      partner: "MedElite coordinates inquiries from Canada with the Hospital Joya network. Care at this location in Mexico depends on the hospital and clinical team accepting your case.",
      verify: "Confirm the procedure’s availability, clinical team and care plan in writing before you travel.",
      partnerSource: "See MedElite’s hospital list",
      diagnostics: "MRI room pictured on Hospital Joya Marina’s page. Image: Hospital Joya.",
    },
    fr: {
      back: "Tous les établissements",
      services: "Services indiqués par l’hôpital",
      call: "Appeler l’hôpital",
      office: "Ou appeler MedElite à Vancouver",
      airport: "Aéroport de référence pour planifier le voyage; il ne s’agit pas d’un temps de trajet.",
      source: "Source",
      partner: "MedElite coordonne les demandes depuis le Canada avec le réseau Hospital Joya. La prise en charge dans cet établissement au Mexique dépend de l’acceptation du dossier par l’hôpital et l’équipe médicale.",
      verify: "Faites confirmer par écrit la disponibilité de l’intervention, l’équipe médicale et le plan de soins avant votre départ.",
      partnerSource: "Voir la liste des établissements de MedElite",
      diagnostics: "Salle d’IRM présentée sur la page de l’Hospital Joya Marina. Image : Hospital Joya.",
    },
  }[lang];

  return (
    <main id="contenido">
      <Seo title={`${hospital.name} — MedElite`} description={hospital.address} path={`/red/${hospital.id}`} />
      <header className="relative flex min-h-[78vh] items-end bg-navy text-white">
        <FacilityPhoto name={hospital.id} fill protect priority alt={PHOTO_OF[hospital.id]?.[lang] ?? hospital.name} sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-navy/20" />
        <div className="relative z-10 w-full px-6 pt-32 pb-12">
          <Link className="text-sm text-gold-line underline" to="/red">{copy.back}</Link>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.92] md:text-7xl">{hospital.name}</h1>
          <p className="mt-3 text-lg text-white/80">{hospital.city}</p>
        </div>
      </header>
      {(HOSPITAL_INTERIORS[hospital.id] ?? []).length > 0 ? (
        <div className="mx-auto grid max-w-6xl gap-4 px-5 pt-8 sm:grid-cols-2">
          {(HOSPITAL_INTERIORS[hospital.id] ?? []).map((name) => (
            <figure key={name} className="relative h-72 overflow-hidden rounded-[2rem] bg-navy">
              <FacilityPhoto name={name} fill alt={PHOTO_OF[name]?.[lang] ?? hospital.name} sizes="(min-width: 640px) 36rem, 100vw" />
            </figure>
          ))}
        </div>
      ) : null}
      {hospital.id === "marina" ? (
        <figure className="mx-auto max-w-[520px] px-5 pt-8">
          <img src="/assets/photos/marina-diagnostics-480.webp" width={480} height={320} loading="lazy" alt={copy.diagnostics} className="w-full rounded-3xl" />
          <figcaption className="mt-2 text-xs text-muted">
            <a className="underline" href="https://hospitaljoya.com/hospitales/hospital-joya-marina-vallarta/" rel="noopener noreferrer">{copy.diagnostics}</a>
          </figcaption>
        </figure>
      ) : null}
      <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="mb-8 rounded-[1.5rem] border border-line bg-ivory p-6 text-sm leading-relaxed">
        <p>{copy.partner}</p>
        <p className="mt-3 font-medium">{copy.verify}</p>
        <p className="mt-3"><a className="underline" href="https://www.medeliteofficial.com/destinations-partner-clinics" rel="noopener noreferrer">{copy.partnerSource}</a></p>
      </div>
      <p>{hospital.address}</p>
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
      </div>
    </main>
  );
}
