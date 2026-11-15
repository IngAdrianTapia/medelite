import { Link } from "react-router";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { HOSPITALS } from "../data/hospitals";
import { HOSPITAL_AIRPORT } from "../data/flights";
import { HOSPITAL_FACTS, SERVICE_IDS, UPCOMING, VERIFIED_ON } from "../data/joya";
import { PHOTO_OF, SERVICE_LABEL, UPCOMING_LABEL } from "../i18n/labels";
import { useI18n } from "../i18n";

const COMPARE: { id: (typeof SERVICE_IDS)[number]; label: "er24" | "icu" | "nicu" | "hemodynamics" | "bilingual" }[] = [
  { id: "er24", label: "er24" },
  { id: "icu", label: "icu" },
  { id: "nicu", label: "nicu" },
  { id: "hemodynamics", label: "hemodynamics" },
  { id: "bilingual", label: "bilingual" },
];

export function NetworkPage() {
  const { lang } = useI18n();
  const intro = {
    es: {
      kicker: "Red Joya",
      title: "Nueve hospitales abiertos, y lo que viene después",
      deck: "Fichas armadas con lo que hospitaljoya.com publicó el 14 de noviembre de 2026. Donde el propio sitio se contradice, esta página dice cuál dato usamos y por qué.",
      soon: "Próximamente. No están abiertos en la información consultada.",
      compare: "Comparación con lo que cada ficha declara",
      yes: "Sí",
      no: "No publicado",
      rooms: "Habitaciones publicadas",
      airport: "Aeropuerto de planeación",
      verified: `Última lectura de las fichas: ${VERIFIED_ON}.`,
      hours: "La oficina de MedElite en Vancouver atiende de lunes a viernes, de 9:00 a 17:00, hora de Vancouver. Las urgencias 24/7 son del hospital, no de esta oficina.",
      hm: "El 10 de septiembre de 2026, HM Hospitales (España) y Grupo Médico Joya anunciaron un acuerdo marco. Es un acuerdo entre esos dos grupos, no una acreditación de MedElite.",
      notClaim: "No afirmamos JCI, CLACS ni CSG. En algunas fichas de Joya aparece el Distintivo H y un sello de la pandemia; no comprobamos que sigan vigentes, y no los presentamos como propios.",
      marina: "La dirección es la de la ficha de Marina (Blvd. Francisco Medina Ascencio #2760). La página de contacto de Joya repite por error la de Riviera Nayarit.",
      playa: "Teléfonos de la página de contacto (984). La ficha también imprime (998) 206 3260. No usamos el (322) 226 8181 del pie: es el de Riviera.",
      sma: "Teléfono (415) 152 5900, el que se repite en Contacto. La ficha también escribe 152 8900; no lo usamos.",
      cancun: "Joya dice que Cancún fue reconocido por SECTUR. No lo contrastamos con un padrón de SECTUR. Un subtítulo de esa ficha dice «Guadalajara»; es un texto copiado y no lo repetimos.",
      icu: "La ficha dice que es la única unidad de cuidados críticos de la zona. No está contrastado.",
    },
    en: {
      kicker: "Joya network",
      title: "Nine open hospitals, and what is still ahead",
      deck: "Cards built from what hospitaljoya.com published on 14 November 2026. Where that site contradicts itself, this page says which fact we use.",
      soon: "Coming soon. Not listed as open in the pages we read.",
      compare: "Comparison of what each hospital page states",
      yes: "Yes",
      no: "Not stated",
      rooms: "Rooms published",
      airport: "Planning airport",
      verified: `Hospital pages last read: ${VERIFIED_ON}.`,
      hours: "MedElite’s Vancouver office is open Monday to Friday, 9:00 a.m. to 5:00 p.m. Vancouver time. A 24/7 emergency department belongs to the hospital, not to this office.",
      hm: "On 10 September 2026, HM Hospitales (Spain) and Grupo Médico Joya announced a framework agreement. That agreement is between those two groups. It is not a MedElite accreditation.",
      notClaim: "We do not claim JCI, CLACS or CSG. Joya displays a Distintivo H mark and a pandemic seal on some pages. We have not checked that they are current, and we do not present them as ours.",
      marina: "The address is the one on Marina’s own page (Blvd. Francisco Medina Ascencio #2760). Joya’s contact page repeats Riviera Nayarit’s address by mistake.",
      playa: "Phones from the contact page (984). The hospital page also prints (998) 206 3260. We do not use (322) 226 8181 from the footer: that is Riviera’s number.",
      sma: "Phone (415) 152 5900, the number repeated on the contact page. The hospital page also prints 152 8900; we do not use it.",
      cancun: "Joya says Cancún was recognized by SECTUR. We did not check a SECTUR register. A subtitle on that page says “Guadalajara”; it is copied text and we do not repeat it.",
      icu: "The page says this is the only critical-care unit in the area. That was not independently checked.",
    },
    fr: {
      kicker: "Réseau Joya",
      title: "Neuf hôpitaux ouverts, et ce qui vient ensuite",
      deck: "Fiches tirées de ce que hospitaljoya.com publiait le 14 novembre 2026. Quand le site se contredit, cette page dit quel renseignement nous retenons.",
      soon: "À venir. Pas ouverts dans les pages consultées.",
      compare: "Comparaison de ce que chaque fiche déclare",
      yes: "Oui",
      no: "Non publié",
      rooms: "Chambres publiées",
      airport: "Aéroport de planification",
      verified: `Dernière lecture des fiches : ${VERIFIED_ON}.`,
      hours: "Le bureau de MedElite à Vancouver est ouvert du lundi au vendredi, de 9 h à 17 h, heure de Vancouver. Les urgences 24 h/24 sont celles de l’hôpital, pas de ce bureau.",
      hm: "Le 10 septembre 2026, HM Hospitales (Espagne) et Grupo Médico Joya ont annoncé une entente-cadre. Cette entente lie ces deux groupes. Ce n’est pas une accréditation de MedElite.",
      notClaim: "Nous ne revendiquons pas JCI, CLACS ni CSG. Joya affiche un Distintivo H et un sceau de pandémie sur certaines fiches. Nous n’avons pas vérifié qu’ils sont encore en vigueur, et nous ne les présentons pas comme les nôtres.",
      marina: "L’adresse est celle de la fiche de Marina (Blvd. Francisco Medina Ascencio #2760). La page contact de Joya répète par erreur celle de Riviera Nayarit.",
      playa: "Téléphones de la page contact (984). La fiche imprime aussi (998) 206 3260. Nous n’utilisons pas le (322) 226 8181 du pied de page : c’est celui de Riviera.",
      sma: "Téléphone (415) 152 5900, celui qui revient sur la page contact. La fiche écrit aussi 152 8900; nous ne l’utilisons pas.",
      cancun: "Joya dit que Cancún a été reconnu par la SECTUR. Nous ne l’avons pas vérifié dans un registre. Un intertitre de cette fiche dit « Guadalajara »; c’est un texte copié et nous ne le répétons pas.",
      icu: "La fiche dit que c’est la seule unité de soins critiques de la zone. Ce n’est pas vérifié ailleurs.",
    },
  }[lang];

  return (
    <main id="contenido">
      <Seo title={`${intro.title} — MedElite`} description={intro.deck} path="/red" />
      <header className="bg-navy px-5 pt-32 pb-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.22em] text-gold-line uppercase">{intro.kicker}</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[0.92] md:text-7xl">{intro.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{intro.deck}</p>
          <p className="mt-3 max-w-2xl text-sm text-white/60">{intro.hours}</p>
        </div>
      </header>
      <div className="flex snap-x gap-4 overflow-x-auto bg-ivory px-5 py-8" tabIndex={0} aria-label={intro.title}>
        {HOSPITALS.map((hospital) => (
          <article key={hospital.id} className="w-80 shrink-0 snap-start overflow-hidden rounded-[2rem] bg-white shadow-premium">
            <div className="relative h-64">
              <FacilityPhoto name={hospital.id} fill alt={PHOTO_OF[hospital.id]?.[lang] ?? hospital.name} sizes="20rem" />
            </div>
            <div className="p-5">
              <h2 className="font-serif text-2xl">
                <Link className="underline decoration-current underline-offset-4" to={`/red/${hospital.id}`}>
                  {hospital.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted">{hospital.city}</p>
              <p className="mt-3 text-sm">{hospital.address}</p>
              <p className="mt-2 text-sm text-muted">
                {intro.airport}: {HOSPITAL_AIRPORT[hospital.id]}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-16">
      <h2 className="mt-14 font-serif text-3xl">{intro.soon}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {UPCOMING.map((id) => (
          <li key={id} className="rounded-2xl border border-dashed border-line bg-white px-4 py-3 text-sm">
            {UPCOMING_LABEL[id][lang]}
          </li>
        ))}
      </ul>
      <h2 className="mt-14 font-serif text-3xl">{intro.compare}</h2>
      <div tabIndex={0} aria-label={intro.compare} className="mt-4 overflow-x-auto rounded-[2rem] border border-line bg-white shadow-glass">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <caption className="sr-only">{intro.compare}</caption>
          <thead className="border-b border-line">
            <tr>
              <th className="px-3 py-3" scope="col">
                Hospital
              </th>
              {COMPARE.map((column) => (
                <th key={column.id} className="px-3 py-3" scope="col">
                  {SERVICE_LABEL[column.label][lang]}
                </th>
              ))}
              <th className="px-3 py-3" scope="col">
                {intro.rooms}
              </th>
            </tr>
          </thead>
          <tbody>
            {HOSPITALS.map((hospital) => {
              const facts = HOSPITAL_FACTS[hospital.id];
              return (
                <tr key={hospital.id} className="border-b border-line last:border-0">
                  <th className="px-3 py-3 font-medium" scope="row">
                    {hospital.name}
                  </th>
                  {COMPARE.map((column) => (
                    <td key={column.id} className="px-3 py-3">
                      {facts.services.includes(column.id) ? intro.yes : intro.no}
                    </td>
                  ))}
                  <td className="px-3 py-3">{facts.rooms ?? intro.no}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-3 text-sm leading-relaxed text-muted">
        <p>{intro.marina}</p>
        <p>{intro.playa}</p>
        <p>{intro.sma}</p>
        <p>{intro.cancun}</p>
        <p>{intro.icu}</p>
        <p>{intro.hm}</p>
        <p>{intro.notClaim}</p>
        <p>{intro.verified}</p>
        <p>
          <a className="underline" href="https://www.hmhospitales.com/comunicado-prensa/hm-hospitales-y-grupo-medico-joya-sellan-una-alianza-estrategica-para-impulsar-la-continuidad-asistencial-entre-espana-y-mexico/" rel="noopener noreferrer">
            HM Hospitales, 10 {lang === "en" ? "September" : lang === "fr" ? "septembre" : "de septiembre"} 2026
          </a>
        </p>
        <p>
          <Link className="underline" to="/seguros">
            {lang === "en" ? "Insurers Joya publishes" : lang === "fr" ? "Assureurs que Joya publie" : "Aseguradoras que publica Joya"}
          </Link>
        </p>
      </div>
      </div>
    </main>
  );
}
