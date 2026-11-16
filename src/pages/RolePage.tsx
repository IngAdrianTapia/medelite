import { FacilityPhoto } from "../components/FacilityPhoto";
import { PageCta } from "../components/PageCta";
import { Seo } from "../components/Seo";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";

export function RolePage() {
  const { lang } = useI18n();
  const t = {
    es: {
      title: "Qué es MedElite y qué no es",
      points: [
        "Es la oficina de coordinación en Vancouver. No es un hospital y no opera.",
        "No es un servicio de urgencias ni una ambulancia. Si es una urgencia, llame al número local.",
        "Una videollamada con un médico en México es informativa. No es ejercicio de la medicina en Canadá.",
        "El equipo de Vancouver recoge el cuestionario. No hace triaje clínico.",
        "Joya atiende. MedElite coordina el viaje y el expediente administrativo.",
      ],
      heroCap: "Hospital Joya Marina Vallarta, una de las sedes de destino. MedElite coordina desde Vancouver y no opera.",
      orCap: "Quirófano publicado por Grupo Médico Joya. La cirugía la hace el hospital; MedElite no opera.",
    },
    en: {
      title: "What MedElite is, and what it is not",
      points: [
        "It is the coordination office in Vancouver. It is not a hospital and it does not operate.",
        "It is not an emergency service or an ambulance. If this is an emergency, call the local number.",
        "A video call with a physician in Mexico is informational. It is not the practice of medicine in Canada.",
        "The Vancouver team collects the questionnaire. It does not perform clinical triage.",
        "Joya provides the care. MedElite coordinates the trip and the administrative file.",
      ],
      heroCap: "Hospital Joya Marina Vallarta, one of the destination hospitals. MedElite coordinates from Vancouver and does not operate.",
      orCap: "An operating room published by Grupo Médico Joya. The hospital performs the surgery; MedElite does not operate.",
    },
    fr: {
      title: "Ce qu’est MedElite et ce qu’il n’est pas",
      points: [
        "C’est le bureau de coordination à Vancouver. Ce n’est pas un hôpital et il n’opère pas.",
        "Ce n’est pas un service d’urgence ni une ambulance. En cas d’urgence, appelez le numéro local.",
        "Un appel vidéo avec un médecin au Mexique est informatif. Ce n’est pas l’exercice de la médecine au Canada.",
        "L’équipe de Vancouver recueille le questionnaire. Elle ne fait pas de triage clinique.",
        "Joya soigne. MedElite coordonne le voyage et le dossier administratif.",
      ],
      heroCap: "L’Hospital Joya Marina Vallarta, l’un des établissements de destination. MedElite coordonne depuis Vancouver et n’opère pas.",
      orCap: "Salle d’opération publiée par Grupo Médico Joya. L’hôpital réalise la chirurgie ; MedElite n’opère pas.",
    },
  }[lang];
  const eyebrow = { es: "Nuestro papel", en: "Our role", fr: "Notre rôle" }[lang];
  return (
    <main id="contenido">
      <Seo title={`${t.title} — MedElite`} description={t.points[0] ?? t.title} path="/que-es" />
      <header className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{t.title}</h1>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-soft" data-gallery="que-es">
            <FacilityPhoto name="marina" fill alt={PHOTO_OF.marina?.[lang] ?? t.title} sizes="(min-width: 1024px) 34rem, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-5 pt-16 pb-4 text-sm text-white">{t.heroCap}</figcaption>
          </figure>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:pr-72 md:py-24">
        <ol className="divide-y divide-line border-y border-line">
          {t.points.map((point, index) => (
            <li key={point} className="reveal grid gap-3 py-8 md:grid-cols-[8rem_1fr] md:gap-10 md:py-10">
              <span aria-hidden="true" className="font-serif text-5xl leading-none text-teal/70">{String(index + 1).padStart(2, "0")}</span>
              <p className="max-w-[44rem] font-serif text-2xl leading-snug text-navy md:text-[1.9rem]">{point}</p>
            </li>
          ))}
        </ol>
        <figure className="relative mt-16 aspect-[16/9] overflow-hidden rounded-3xl bg-soft" data-gallery="que-es">
          <FacilityPhoto name="operating-room" fill alt={PHOTO_OF["operating-room"]?.[lang] ?? t.orCap} sizes="(min-width: 1024px) 75rem, 100vw" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-5 pt-16 pb-4 text-sm text-white">{t.orCap}</figcaption>
        </figure>
        <div className="mt-16 pb-8">
          <PageCta />
        </div>
      </div>
    </main>
  );
}
