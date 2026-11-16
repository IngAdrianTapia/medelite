import { Link } from "react-router";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { FiltroSedeEspecialidad } from "../components/FiltroSedeEspecialidad";
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
      cta: "Solicitar cotización",
      route: "Ruta de coordinación de MedElite, no una asignación publicada por Joya:",
    },
    en: {
      kicker: "Specialties",
      title: "Two official lists, not one catalogue",
      deck: "hospitaljoya.com/especialidades publishes 17 specialties. The physician-directory filter publishes 33 categories. They do not match, and on 14 November 2026 the directory showed no physician names. We do not guess a hospital: a site is linked only when its own page names the service.",
      none: "The specialties page does not say which hospital offers this.",
      more: "Several pages say “more than 30 specialties” without listing them: Guadalajara, Cancún, Playa del Carmen, Chapala and La Peñita.",
      directory: "Directory categories (no physicians published)",
      cta: "Request a quote",
      route: "MedElite coordination route, not an assignment published by Joya:",
    },
    fr: {
      kicker: "Spécialités",
      title: "Deux listes officielles, pas un seul catalogue",
      deck: "hospitaljoya.com/especialidades publie 17 spécialités. Le filtre du répertoire médical en publie 33. Elles ne concordent pas, et le 14 novembre 2026 le répertoire n’affichait aucun nom de médecin. Nous ne devinons pas l’établissement : un site n’est lié que si sa fiche nomme le service.",
      none: "La page des spécialités ne dit pas dans quel hôpital c’est offert.",
      more: "Plusieurs fiches disent « plus de 30 spécialités » sans les énumérer : Guadalajara, Cancún, Playa del Carmen, Chapala et La Peñita.",
      directory: "Catégories du répertoire (aucun médecin publié)",
      cta: "Demander une soumission",
      route: "Itinéraire de coordination MedElite, pas une attribution publiée par Joya :",
    },
  }[lang];

  return (
    <main id="contenido">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/especialidades" />
      <header className="border-b border-line bg-ivory px-5 pt-12 pb-12 md:px-8 md:pt-16">
        <div className="mx-auto grid max-w-[1136px] gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h1 className="font-serif text-3xl leading-tight md:text-5xl">{t.title}</h1>
          <p className="text-lg text-muted">{t.deck}</p>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-10">
      <p className="max-w-3xl text-sm text-muted">{t.more}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {LINE_IDS.map((id) => (
          <li key={id} className="rounded-full border border-line bg-white px-3 py-2 text-sm">
            {{
              es: {
                knee: "Ortopedia · rodilla",
                hip: "Ortopedia · cadera",
                bariatric: "Bariátrica",
                plastic: "Plástica",
                dental: "Dental",
                ophthalmology: "Oftalmología",
                cardiology: "Cardiología",
                fertility: "Fertilidad",
                checkup: "Chequeo",
              },
              en: {
                knee: "Orthopedics · knee",
                hip: "Orthopedics · hip",
                bariatric: "Bariatric",
                plastic: "Plastic surgery",
                dental: "Dental",
                ophthalmology: "Ophthalmology",
                cardiology: "Cardiology",
                fertility: "Fertility",
                checkup: "Check-up",
              },
              fr: {
                knee: "Orthopédie · genou",
                hip: "Orthopédie · hanche",
                bariatric: "Bariatrique",
                plastic: "Chirurgie plastique",
                dental: "Dentaire",
                ophthalmology: "Ophtalmologie",
                cardiology: "Cardiologie",
                fertility: "Fertilité",
                checkup: "Bilan",
              },
            }[lang][id]}
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
      <FiltroSedeEspecialidad />
      <div className="mt-10 grid gap-6">
        {PUBLIC_SPECIALTIES.map((id, index) => {
          const photo = PHOTO_FOR[id];
          const sites = SPECIALTY_SITES[id];
          return (
            <article key={id} id={id} className={`grid overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-premium ${photo ? "md:grid-cols-2" : ""} ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              {photo ? (
                <div className="relative min-h-72">
                  <FacilityPhoto name={photo} fill alt={PHOTO_OF[photo]?.[lang] ?? SPECIALTY_LABEL[id][lang]} sizes="(min-width: 768px) 46rem, 100vw" />
                </div>
              ) : null}
              <div className="flex flex-col justify-end p-8">
                <h2 className="font-serif text-2xl"><Link className="underline" to={`/especialidades/${id}`}>{SPECIALTY_LABEL[id][lang]}</Link></h2>
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
                  <Link className="inline-flex min-h-11 items-center rounded-lg bg-gold px-4 text-sm font-semibold text-white hover:bg-navy" to="/#cotizar">
                    {t.cta}
                  </Link>
                </p>
              </div>
            </article>
          );
        })}
      </div>
      <h2 className="mt-14 font-serif text-2xl">{t.directory}</h2>
      <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2">
        {DIRECTORY_SPECIALTIES.map((id) => (
          <li key={id} className="mb-2">
            <Link className="inline-flex min-h-11 items-center underline" to={`/especialidades/${id}`}>{DIRECTORY_LABEL[id][lang]}</Link>
          </li>
        ))}
      </ul>
      </div>
    </main>
  );
}
