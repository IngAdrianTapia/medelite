import { Link, useParams } from "react-router";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { HOSPITALS } from "../data/hospitals";
import { DIRECTORY_SPECIALTIES, PUBLIC_SPECIALTIES, SPECIALTY_SITES } from "../data/joya";
import type { PublicSpecialtyId } from "../data/joya";
import { PEOPLE, type Person } from "../data/people";
import { portraitOf } from "../data/photoCredits";
import { DIRECTORY_LABEL, PHOTO_OF, SPECIALTY_LABEL } from "../i18n/labels";
import { useI18n } from "../i18n";

const FOCUS: Record<string, Person["focus"] | undefined> = {
  bariatric: "bariatric",
  anesthesiology: "anesthesia",
  nutrition: "nutrition",
  "internal-medicine": "internal",
  "general-surgery": "general-surgery",
};

const ROOM_PHOTO = new Set(["orthopedics", "bariatric", "plastic", "spine", "general-surgery", "neurosurgery"]);

function isSpecialty(value: string | undefined): value is (typeof DIRECTORY_SPECIALTIES)[number] | PublicSpecialtyId {
  if (typeof value !== "string") return false;
  return (DIRECTORY_SPECIALTIES as readonly string[]).includes(value) || (PUBLIC_SPECIALTIES as readonly string[]).includes(value);
}

function labelOf(id: (typeof DIRECTORY_SPECIALTIES)[number] | PublicSpecialtyId, lang: "es" | "en" | "fr") {
  if (id in DIRECTORY_LABEL) return DIRECTORY_LABEL[id as (typeof DIRECTORY_SPECIALTIES)[number]][lang];
  return SPECIALTY_LABEL[id as PublicSpecialtyId][lang];
}

export function SpecialtyPage() {
  const { specialtyId } = useParams();
  const { lang } = useI18n();
  const t = {
    es: {
      back: "Todas las especialidades",
      missing: "Esta dirección no está en las listas publicadas.",
      sites: "Sedes cuya ficha nombra este servicio",
      none: "La página de especialidades no dice en qué hospital se ofrece. TODO(ingeniero): confirmar la sede.",
      procedures: "La ficha pública no trae, en este repositorio, una lista de procedimientos de esta especialidad. TODO(ingeniero).",
      people: "Nombres ya publicados con este enfoque",
      noPeople: "No hay un nombre publicado en este repositorio con este enfoque.",
      photo: "Foto relacionada",
      cta: "Solicitar cotización",
    },
    en: {
      back: "All specialties",
      missing: "This address is not on the published lists.",
      sites: "Sites whose own page names this service",
      none: "The specialties page does not say which hospital offers this. TODO for the owner: confirm the site.",
      procedures: "The public page does not include, in this repository, a procedure list for this specialty. TODO for the owner.",
      people: "Names already published with this focus",
      noPeople: "No published name in this repository has this focus.",
      photo: "Related photograph",
      cta: "Request a quote",
    },
    fr: {
      back: "Toutes les spécialités",
      missing: "Cette adresse n’est pas dans les listes publiées.",
      sites: "Sites dont la fiche nomme ce service",
      none: "La page des spécialités ne dit pas quel hôpital l’offre. TODO pour le propriétaire : confirmer le site.",
      procedures: "La fiche publique ne contient pas, dans ce dépôt, une liste d’actes pour cette spécialité. TODO pour le propriétaire.",
      people: "Noms déjà publiés avec cette orientation",
      noPeople: "Aucun nom publié dans ce dépôt n’a cette orientation.",
      photo: "Photo liée",
      cta: "Demander une soumission",
    },
  }[lang];

  if (!isSpecialty(specialtyId)) {
    return (
      <main id="contenido" className="page-shell">
        <h1 className="font-serif text-4xl">{t.missing}</h1>
        <Link className="mt-4 inline-flex min-h-11 items-center underline" to="/especialidades">{t.back}</Link>
      </main>
    );
  }

  const sites = specialtyId in SPECIALTY_SITES ? SPECIALTY_SITES[specialtyId as PublicSpecialtyId] : [];
  const focus = FOCUS[specialtyId];
  const people = focus ? PEOPLE.filter((person) => person.focus === focus) : [];
  const photo = ROOM_PHOTO.has(specialtyId) ? "operating-room" : sites[0];

  return (
    <main id="contenido" className="page-shell-wide">
      <Seo title={`${labelOf(specialtyId, lang)} — MedElite`} description={t.procedures} path={`/especialidades/${specialtyId}`} />
      <Link className="text-sm text-navy underline" to="/especialidades">{t.back}</Link>
      <h1 className="mt-4 font-serif text-5xl leading-tight text-ink">{labelOf(specialtyId, lang)}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t.procedures}</p>
      <h2 className="mt-10 font-serif text-3xl">{t.sites}</h2>
      {sites.length > 0 ? (
        <ul className="mt-3 grid gap-2 text-sm">
          {sites.map((site) => (
            <li key={site}>
              <Link className="underline" to={`/red/${site}`}>{HOSPITALS.find((item) => item.id === site)?.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">{t.none}</p>
      )}
      <h2 className="mt-10 font-serif text-3xl">{t.people}</h2>
      {people.length > 0 ? (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {people.map((person) => (
            <li key={person.id} className="rounded-2xl border border-line bg-white p-4">
              {portraitOf(person.id) ? (
                <img src={`/assets/photos/people/${person.id}-720.webp`} alt={person.name} width={720} height={900} loading="lazy" decoding="async" className="mb-3 h-24 w-20 rounded-xl object-cover object-top" />
              ) : null}
              <Link className="font-serif text-2xl underline" to="/equipo">{person.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">{t.noPeople}</p>
      )}
      {photo ? (
        <figure className="mt-10 overflow-hidden rounded-[2rem] border border-line bg-white">
          <div className="relative h-72 bg-navy">
            <FacilityPhoto name={photo} fill alt={PHOTO_OF[photo]?.[lang] ?? ""} sizes="(min-width: 1024px) 46rem, 100vw" />
          </div>
          <figcaption className="px-4 py-3 text-sm">{t.photo}. {PHOTO_OF[photo]?.[lang]}</figcaption>
        </figure>
      ) : null}
      <p className="mt-8">
        <Link className="inline-flex min-h-11 items-center rounded-full bg-navy px-5 text-sm font-semibold text-white" to="/#cotizar">{t.cta}</Link>
      </p>
    </main>
  );
}
