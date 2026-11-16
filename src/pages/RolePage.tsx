import { PageCta } from "../components/PageCta";
import { Seo } from "../components/Seo";
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
    },
  }[lang];
  const eyebrow = { es: "Nuestro papel", en: "Our role", fr: "Notre rôle" }[lang];
  return (
    <main id="contenido" className="page-shell-wide">
      <Seo title={`${t.title} — MedElite`} description={t.points[0] ?? t.title} path="/que-es" />
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 max-w-[48rem] font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{t.title}</h1>
      <ol className="mt-14 divide-y divide-line border-y border-line">
        {t.points.map((point, index) => (
          <li key={point} className="reveal grid gap-3 py-8 md:grid-cols-[8rem_1fr] md:gap-10 md:py-10">
            <span aria-hidden="true" className="font-serif text-5xl leading-none text-teal/70">{String(index + 1).padStart(2, "0")}</span>
            <p className="max-w-[44rem] font-serif text-2xl leading-snug text-navy md:text-[1.9rem]">{point}</p>
          </li>
        ))}
      </ol>
      <PageCta />
    </main>
  );
}
