import { Link } from "react-router";
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
  return (
    <main id="contenido" className="page-shell">
      <Seo title={`${t.title} — MedElite`} description={t.points[0] ?? t.title} path="/que-es" />
      <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-ink">{t.title}</h1>
      <ul className="mt-8 grid gap-3">
        {t.points.map((point) => (
          <li key={point} className="rounded-2xl border border-line bg-white shadow-sm p-4 leading-relaxed">
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link className="underline" to="/#cotizar">
          {lang === "fr" ? "Estimation" : lang === "en" ? "Estimate" : "Estimación"}
        </Link>
      </p>
    </main>
  );
}
