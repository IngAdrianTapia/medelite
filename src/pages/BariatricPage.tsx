import { Link } from "react-router";
import { DiagramaManga } from "../components/DiagramaManga";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";

const PROCEDURES = [
  {
    id: "bypass",
    url: "https://drjoyaofficial.com/gastric-bypass-surgery/",
    es: "Bypass gástrico. El sitio describe un estómago de 15 a 30 ml, unos 60 minutos y 1 noche de hospital.",
    en: "Gastric bypass. The site describes a 15–30 ml stomach, about 60 minutes, and 1 hospital night.",
    fr: "Dérivation gastrique (bypass). Le site décrit un estomac de 15 à 30 ml, environ 60 minutes et 1 nuit d’hôpital.",
  },
  {
    id: "sleeve",
    url: "https://drjoyaofficial.com/gastric-sleeve-surgery/",
    es: "Manga gástrica. El sitio describe un tubo de 80 a 120 ml, unos 45 minutos y 1 noche; más abajo habla de unos 2 días. Dejamos las dos frases.",
    en: "Gastric sleeve. The site describes an 80–120 ml sleeve, about 45 minutes and 1 night; later it says about 2 days. Both sentences are left as published.",
    fr: "Gastrectomie en manchon (sleeve). Le site décrit un tube de 80 à 120 ml, environ 45 minutes et 1 nuit; plus loin, environ 2 jours. Les deux phrases restent.",
  },
  {
    id: "band",
    url: "https://drjoyaofficial.com/gastric-banding-surgery/",
    es: "Banda gástrica ajustable. Unos 30 minutos y 1 noche, según esa página. La describe como reversible.",
    en: "Adjustable gastric band. About 30 minutes and 1 night, according to that page. Described there as reversible.",
    fr: "Anneau gastrique ajustable. Environ 30 minutes et 1 nuit, selon cette page. Décrit comme réversible.",
  },
  {
    id: "balloon",
    url: "https://drjoyaofficial.com/intragastric-balloon-procedure/",
    es: "Balón intragástrico. Colocación de unos 20 minutos; el sitio dice alta en unas dos horas, retiro a los 6 meses, IMC mínimo 27. No es cirugía.",
    en: "Intragastric balloon. Placement of about 20 minutes; the site says discharge within about two hours, removal at 6 months, minimum BMI 27. Not surgery.",
    fr: "Ballon intragastrique. Pose d’environ 20 minutes; le site parle d’un congé en deux heures, retrait à 6 mois, IMC minimum 27. Ce n’est pas une chirurgie.",
  },
  {
    id: "sils",
    url: "https://drjoyaofficial.com/gastric-sleeve-surgery-sils/",
    es: "Manga por una sola incisión. El sitio la limita a IMC menor de 40.",
    en: "Single-incision sleeve. The site limits it to a BMI under 40.",
    fr: "Gastrectomie en manchon par une seule incision. Le site la limite à un IMC inférieur à 40.",
  },
  {
    id: "revision",
    url: "https://drjoyaofficial.com/revision-bariatric-surgery/",
    es: "Cirugía de revisión. El sitio no publica una lista cerrada de operaciones ni un precio.",
    en: "Revision surgery. The site does not publish a closed list of operations or a price.",
    fr: "Chirurgie de révision. Le site ne publie ni une liste fermée d’opérations ni un prix.",
  },
] as const;

export function BariatricPage() {
  const { lang } = useI18n();
  const t = {
    es: {
      kicker: "Según drjoyaofficial.com",
      title: "Centro de obesidad y Hospital Joya Riviera Nayarit",
      deck: "Lo que sigue está tomado de drjoyaofficial.com, consultado el 14 de noviembre de 2026. No es una cotización de MedElite y no hay precios en ese sitio. El dominio drjoya.com está en venta; no es la clínica.",
      where: "El sitio dice que las cirugías se hacen en el Hospital Joya Riviera Nayarit y da como consultorio Paseo de los Cocoteros 55, Nuevo Vallarta. También describe 8 suites de adulto, 1 pediátrica y 2 máster para pacientes bariátricos.",
      who: "El sitio presenta a Dr. Armando Joya como cirujano del centro. En la nota de la alianza con HM Hospitales, Grupo Médico Joya lo nombra director general. No publicamos al resto del equipo: los apellidos completos no están en esas páginas.",
      numbers: "El sitio escribe tres números: cédula 2312941, especialista AE-009602 y recertificación 97200. No los contrastamos con un registro público en esta página. No repetimos «el mejor cirujano» ni las cifras de 20 años, 25 años u 8.000 cirugías, porque el propio sitio no coincide consigo.",
      include: "Lo que la página del hospital dice que incluyen los paquetes",
      includes: [
        "Traslado aeropuerto–hotel",
        "Laboratorio y electrocardiograma preoperatorios",
        "Consulta de medicina interna, psicología y nutrición",
        "Cirujano, ayudante, anestesiólogo y enfermería",
        "1 o 2 noches de hospital, según el procedimiento",
      ],
      missing: "El sitio no dice cuántas noches de hotel entran en el paquete, ni la moneda, ni los vuelos. Menciona el Paradise Village como hotel donde ayudan a reservar, a unos 9 minutos a pie. Hasta que lo confirmen por escrito, el hotel no cuenta como incluido.",
      price: "No hay precio publicado. MedElite tampoco inventa una banda para bariátrica.",
      cta: "Solicitar cotización",
    },
    en: {
      kicker: "According to drjoyaofficial.com",
      title: "Obesity centre and Hospital Joya Riviera Nayarit",
      deck: "What follows is taken from drjoyaofficial.com, read on 14 November 2026. It is not a MedElite quote, and that site publishes no prices. The domain drjoya.com is for sale; it is not the clinic.",
      where: "The site says surgeries are done at Hospital Joya Riviera Nayarit and gives the office as Paseo de los Cocoteros 55, Nuevo Vallarta. It also describes 8 adult suites, 1 pediatric suite and 2 master suites for bariatric patients.",
      who: "The site presents Dr. Armando Joya as the centre’s surgeon. In the HM Hospitales alliance note, Grupo Médico Joya names him chief executive. We do not publish the rest of the team: full surnames are not on those pages.",
      numbers: "The site prints three numbers: licence 2312941, specialist AE-009602 and recertification 97200. We did not check them against a public register on this page. We do not repeat “the best surgeon” or the 20-year, 25-year or 8,000-surgery figures, because the site does not agree with itself.",
      include: "What the hospital page says packages include",
      includes: [
        "Airport–hotel transfer",
        "Pre-operative labs and electrocardiogram",
        "Internal medicine, psychology and nutrition visits",
        "Surgeon, assistant, anesthesiologist and nursing",
        "1 or 2 hospital nights, depending on the procedure",
      ],
      missing: "The site does not say how many hotel nights are in the package, or the currency, or the flights. It names Paradise Village as a hotel they help book, about a 9-minute walk. Until that is confirmed in writing, the hotel is not treated as included.",
      price: "No price is published. MedElite does not invent a bariatric band either.",
      cta: "Request a quote",
    },
    fr: {
      kicker: "Selon drjoyaofficial.com",
      title: "Centre de l’obésité et Hospital Joya Riviera Nayarit",
      deck: "Ce qui suit vient de drjoyaofficial.com, consulté le 14 novembre 2026. Ce n’est pas une soumission de MedElite, et ce site ne publie pas de prix. Le domaine drjoya.com est à vendre; ce n’est pas la clinique.",
      where: "Le site dit que les chirurgies se font à l’Hospital Joya Riviera Nayarit et donne le bureau au Paseo de los Cocoteros 55, Nuevo Vallarta. Il décrit aussi 8 suites d’adulte, 1 pédiatrique et 2 suites principales pour les patients bariatriques.",
      who: "Le site présente le Dr Armando Joya comme chirurgien du centre. Dans la note sur l’alliance avec HM Hospitales, Grupo Médico Joya le nomme directeur général. Nous ne publions pas le reste de l’équipe : les noms de famille complets n’y sont pas.",
      numbers: "Le site inscrit trois numéros : cédula 2312941, spécialiste AE-009602 et recertification 97200. Nous ne les avons pas vérifiés dans un registre public sur cette page. Nous ne répétons pas « le meilleur chirurgien » ni les chiffres de 20 ans, 25 ans ou 8 000 chirurgies, parce que le site ne s’accorde pas avec lui-même.",
      include: "Ce que la page de l’hôpital dit que les forfaits incluent",
      includes: [
        "Transfert aéroport–hôtel",
        "Laboratoire et électrocardiogramme préopératoires",
        "Consultation de médecine interne, psychologie et nutrition",
        "Chirurgien, assistant, anesthésiste et soins infirmiers",
        "1 ou 2 nuits d’hôpital, selon l’intervention",
      ],
      missing: "Le site ne dit pas combien de nuits d’hôtel entrent dans le forfait, ni la devise, ni les vols. Il nomme le Paradise Village comme hôtel qu’ils aident à réserver, à environ 9 minutes à pied. Tant que ce n’est pas confirmé par écrit, l’hôtel n’est pas traité comme inclus.",
      price: "Aucun prix n’est publié. MedElite n’invente pas non plus de fourchette bariatrique.",
      cta: "Demander une soumission",
    },
  }[lang];

  return (
    <main id="contenido" className="page-shell">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/bariatrica" />
      <p className="text-xs font-bold tracking-[0.15em] text-navy uppercase">{t.kicker}</p>
      <h1 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-ink">{t.title}</h1>
      <p className="mt-4 leading-relaxed text-muted">{t.deck}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FacilityPhoto name="riviera" alt={PHOTO_OF.riviera?.[lang] ?? ""} sizes="(min-width: 640px) 22rem, 100vw" className="h-56 w-full rounded-3xl object-cover" />
        <FacilityPhoto name="bariatric-or" alt={PHOTO_OF["bariatric-or"]?.[lang] ?? ""} sizes="(min-width: 640px) 22rem, 100vw" className="h-56 w-full rounded-3xl object-cover" />
      </div>
      <p className="mt-6 leading-relaxed">{t.where}</p>
      <p className="mt-3 leading-relaxed">{t.who}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{t.numbers}</p>
      <h2 className="mt-10 font-serif text-2xl">{t.include}</h2>
      <ul className="mt-3 grid gap-2 text-sm">
        {t.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <figure className="mt-6">
        <FacilityPhoto name="bariatric-room" alt={PHOTO_OF["bariatric-room"]?.[lang] ?? ""} sizes="(min-width: 640px) 46rem, 100vw" className="h-64 w-full rounded-3xl object-cover" />
      </figure>
      <div className="mt-10">
        <DiagramaManga />
      </div>
      <h2 className="mt-10 font-serif text-2xl">Procedimientos</h2>
      <ul className="mt-4 grid gap-4">
        {PROCEDURES.map((item) => (
          <li key={item.id} className="rounded-2xl border border-line p-4 text-sm leading-relaxed">
            <p>{item[lang]}</p>
            <a className="mt-2 inline-block underline" href={item.url} rel="noopener noreferrer">
              drjoyaofficial.com
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 leading-relaxed">{t.missing}</p>
      <p className="mt-3 font-medium">{t.price}</p>
      <p className="mt-6 flex flex-wrap gap-3">
        <a className="inline-flex min-h-12 items-center rounded-lg bg-navy px-5 text-sm font-semibold text-white shadow-premium hover:bg-navy-2" href="tel:+16044428475">
          +1 (604) 442-8475
        </a>
        <Link className="inline-flex min-h-12 items-center rounded-lg bg-gold px-5 text-sm font-semibold text-white hover:bg-navy" to="/#cotizar">
          {t.cta}
        </Link>
      </p>
    </main>
  );
}
