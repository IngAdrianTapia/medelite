import { Link } from "react-router";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { FiltroSedeEspecialidad } from "../components/FiltroSedeEspecialidad";
import { PageCta } from "../components/PageCta";
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
      open: "Ver la especialidad",
      route: "Ruta de coordinación de MedElite, no una asignación publicada por Joya:",
    },
    en: {
      kicker: "Specialties",
      title: "Two official lists, not one catalogue",
      deck: "hospitaljoya.com/especialidades publishes 17 specialties. The physician-directory filter publishes 33 categories. They do not match, and on 14 November 2026 the directory showed no physician names. We do not guess a hospital: a site is linked only when its own page names the service.",
      none: "The specialties page does not say which hospital offers this.",
      more: "Several pages say “more than 30 specialties” without listing them: Guadalajara, Cancún, Playa del Carmen, Chapala and La Peñita.",
      directory: "Directory categories (no physicians published)",
      open: "View specialty",
      route: "MedElite coordination route, not an assignment published by Joya:",
    },
    fr: {
      kicker: "Spécialités",
      title: "Deux listes officielles, pas un seul catalogue",
      deck: "hospitaljoya.com/especialidades publie 17 spécialités. Le filtre du répertoire médical en publie 33. Elles ne concordent pas, et le 14 novembre 2026 le répertoire n’affichait aucun nom de médecin. Nous ne devinons pas l’établissement : un site n’est lié que si sa fiche nomme le service.",
      none: "La page des spécialités ne dit pas dans quel hôpital c’est offert.",
      more: "Plusieurs fiches disent « plus de 30 spécialités » sans les énumérer : Guadalajara, Cancún, Playa del Carmen, Chapala et La Peñita.",
      directory: "Catégories du répertoire (aucun médecin publié)",
      open: "Voir la spécialité",
      route: "Itinéraire de coordination MedElite, pas une attribution publiée par Joya :",
    },
  }[lang];
  const featured = PUBLIC_SPECIALTIES.filter((id) => PHOTO_FOR[id]);
  const others = PUBLIC_SPECIALTIES.filter((id) => !PHOTO_FOR[id]);
  const sitesOf = (id: (typeof PUBLIC_SPECIALTIES)[number]) => {
    const sites = SPECIALTY_SITES[id];
    if (sites.length === 0) return <p className="mt-3 text-sm leading-relaxed text-muted">{t.none}</p>;
    return (
      <ul className="mt-3 space-y-1 text-sm">
        {sites.map((site) => (
          <li key={site}>
            <Link className="link-line text-navy" to={`/red/${site}`}>
              {HOSPITALS.find((item) => item.id === site)?.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <main id="contenido">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/especialidades" />
      <header className="border-b border-line bg-white px-5 pt-14 pb-14 md:px-8 md:pt-20">
        <div className="mx-auto grid max-w-[1136px] gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow">{t.kicker}</p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{t.title}</h1>
          </div>
          <p className="text-[17px] leading-relaxed text-muted">{t.deck}</p>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-10">
      <p className="max-w-3xl text-sm text-muted">{t.more}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {LINE_IDS.map((id) => (
          <li key={id} className="rounded-full border border-line bg-white px-4 py-2 text-[13px] text-navy">
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
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((id) => {
          const photo = PHOTO_FOR[id] as string;
          return (
            <article key={id} id={id} className="reveal lift flex flex-col overflow-hidden rounded-3xl border border-line bg-white text-ink">
              <div className="relative aspect-[16/10] overflow-hidden bg-soft">
                <FacilityPhoto name={photo} fill alt={PHOTO_OF[photo]?.[lang] ?? SPECIALTY_LABEL[id][lang]} sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-[1.7rem] leading-tight text-navy">{SPECIALTY_LABEL[id][lang]}</h2>
                {sitesOf(id)}
                <p className="mt-auto pt-6">
                  <Link className="link-line text-[15px] font-medium text-teal" to={`/especialidades/${id}`}>
                    {t.open} <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </div>
            </article>
          );
        })}
      </div>
      <ul className="mt-14 divide-y divide-line border-y border-line">
        {others.map((id) => (
          <li key={id} id={id} className="reveal grid gap-3 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_auto] md:items-baseline md:gap-10">
            <h2 className="font-serif text-[1.7rem] leading-tight text-navy">{SPECIALTY_LABEL[id][lang]}</h2>
            <div className="-mt-3 md:mt-0 [&>*:first-child]:mt-0">
              {sitesOf(id)}
              {id === "ophthalmology" ? <p className="mt-2 text-sm text-muted">{t.route} Cancún, Playa del Carmen.</p> : null}
            </div>
            <Link className="link-line w-fit whitespace-nowrap text-[15px] font-medium text-teal" to={`/especialidades/${id}`}>
              {t.open} <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-24 font-serif text-3xl leading-tight md:text-4xl text-navy">{t.directory}</h2>
      <ul className="mt-6 columns-1 gap-x-10 border-t border-line pt-4 text-[15px] sm:columns-2 lg:columns-3">
        {DIRECTORY_SPECIALTIES.map((id) => (
          <li key={id} className="mb-2">
            <Link className="inline-flex min-h-11 items-center text-navy hover:text-teal" to={`/especialidades/${id}`}>{DIRECTORY_LABEL[id][lang]}</Link>
          </li>
        ))}
      </ul>
      <PageCta />
      </div>
    </main>
  );
}
