import { Link } from "react-router";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { HOSPITALS } from "../data/hospitals";
import { DIRECTORY_SPECIALTIES, PUBLIC_SPECIALTIES, SPECIALTY_SITES } from "../data/joya";
import { LINE_IDS, LINE_STATUS } from "../lib/journey";
import { DIRECTORY_LABEL, PHOTO_OF, SPECIALTY_LABEL } from "../i18n/labels";
import { useI18n } from "../i18n";

const PHOTO_FOR: Partial<Record<(typeof PUBLIC_SPECIALTIES)[number], string>> = {
  cardiology: "marina",
  gynecology: "riviera",
  orthopedics: "operating-room",
  ophthalmology: "cancun",
  urology: "guadalajara",
  pediatrics: "penita",
  "general-surgery": "operating-room",
};

export function SpecialtiesPage() {
  const { lang } = useI18n();
  const t = {
    es: {
      kicker: "Especialidades",
      title: "Dos listas oficiales, no una sola",
      deck: "hospitaljoya.com/especialidades publica 17 especialidades. El filtro del directorio médico publica 33 categorías. No coinciden, y el 14 de noviembre de 2026 el directorio no mostraba nombres de médicos. Aquí no inventamos en qué sede está cada una: solo enlazamos la sede cuando su ficha nombra ese servicio.",
      none: "La página de especialidades no dice en qué hospital se ofrece.",
      more: "Varias fichas dicen «más de 30 especialidades» sin enumerarlas: Guadalajara, Cancún, Playa del Carmen, Chapala y La Peñita.",
      directory: "Categorías del directorio (sin médicos publicados)",
      cta: "Pedir una estimación",
      route: "Ruta de coordinación de MedElite, no una asignación publicada por Joya:",
    },
    en: {
      kicker: "Specialties",
      title: "Two official lists, not one catalogue",
      deck: "hospitaljoya.com/especialidades publishes 17 specialties. The physician-directory filter publishes 33 categories. They do not match, and on 14 November 2026 the directory showed no physician names. We do not guess a hospital: a site is linked only when its own page names the service.",
      none: "The specialties page does not say which hospital offers this.",
      more: "Several pages say “more than 30 specialties” without listing them: Guadalajara, Cancún, Playa del Carmen, Chapala and La Peñita.",
      directory: "Directory categories (no physicians published)",
      cta: "Request an estimate",
      route: "MedElite coordination route, not an assignment published by Joya:",
    },
    fr: {
      kicker: "Spécialités",
      title: "Deux listes officielles, pas un seul catalogue",
      deck: "hospitaljoya.com/especialidades publie 17 spécialités. Le filtre du répertoire médical en publie 33. Elles ne concordent pas, et le 14 novembre 2026 le répertoire n’affichait aucun nom de médecin. Nous ne devinons pas l’établissement : un site n’est lié que si sa fiche nomme le service.",
      none: "La page des spécialités ne dit pas dans quel hôpital c’est offert.",
      more: "Plusieurs fiches disent « plus de 30 spécialités » sans les énumérer : Guadalajara, Cancún, Playa del Carmen, Chapala et La Peñita.",
      directory: "Catégories du répertoire (aucun médecin publié)",
      cta: "Demander une estimation",
      route: "Itinéraire de coordination MedElite, pas une attribution publiée par Joya :",
    },
  }[lang];

  return (
    <main id="contenido" className="mx-auto max-w-6xl px-5 py-16">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/especialidades" />
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{t.kicker}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl tracking-tight">{t.title}</h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted">{t.deck}</p>
      <p className="mt-3 max-w-3xl text-sm text-muted">{t.more}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {LINE_IDS.map((id) => (
          <li key={id} className="rounded-full border border-line bg-white px-3 py-2 text-sm">
            {{
              knee: "Ortopedia · rodilla",
              hip: "Ortopedia · cadera",
              bariatric: "Bariátrica",
              plastic: "Plástica",
              dental: "Dental",
              ophthalmology: "Oftalmología",
              cardiology: "Cardiología",
              fertility: "Fertilidad",
              checkup: "Chequeo",
            }[id]}
            {LINE_STATUS[id] === "coming-soon"
              ? lang === "en"
                ? " · via network partners, coming soon"
                : lang === "fr"
                  ? " · via des partenaires, à venir"
                  : " · vía socios de la red, próximamente"
              : lang === "en"
                ? " · published by Joya"
                : lang === "fr"
                  ? " · publié par Joya"
                  : " · publicado por Joya"}
          </li>
        ))}
      </ul>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {PUBLIC_SPECIALTIES.map((id) => {
          const photo = PHOTO_FOR[id] ?? "patient-room";
          const sites = SPECIALTY_SITES[id];
          return (
            <article key={id} id={id} className="overflow-hidden rounded-3xl border border-line bg-white">
              <FacilityPhoto name={photo} alt={PHOTO_OF[photo]?.[lang] ?? SPECIALTY_LABEL[id][lang]} className="h-48 w-full object-cover" sizes="(min-width: 768px) 28rem, 100vw" />
              <div className="p-5">
                <h2 className="font-serif text-3xl">{SPECIALTY_LABEL[id][lang]}</h2>
                {sites.length > 0 ? (
                  <ul className="mt-3 text-sm">
                    {sites.map((site) => {
                      const hospital = HOSPITALS.find((item) => item.id === site);
                      return (
                        <li key={site}>
                          <Link className="underline" to={`/red/${site}`}>
                            {hospital?.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-muted">{t.none}</p>
                )}
                {id === "ophthalmology" ? <p className="mt-3 text-sm text-muted">{t.route} Cancún, Playa del Carmen.</p> : null}
                <p className="mt-4">
                  <Link className="text-sm underline" to="/#cotizar">
                    {t.cta}
                  </Link>
                </p>
              </div>
            </article>
          );
        })}
      </div>
      <h2 className="mt-14 font-serif text-3xl">{t.directory}</h2>
      <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2">
        {DIRECTORY_SPECIALTIES.map((id) => (
          <li key={id} className="mb-1">
            {DIRECTORY_LABEL[id][lang]}
          </li>
        ))}
      </ul>
    </main>
  );
}
