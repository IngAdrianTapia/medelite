import { AsistenciaIA } from "../components/AsistenciaIA";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n";

export function RolePage() {
  const { lang } = useI18n();
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === "#ia") document.getElementById("ia")?.scrollIntoView();
  }, [hash]);
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
  const cta = lang === "fr" ? "Demander une soumission" : lang === "en" ? "Request a quote" : "Solicitar cotización";
  return (
    <main id="contenido" className="bg-navy text-white">
      <Seo title={`${t.title} — MedElite`} description={t.points[0] ?? t.title} path="/que-es" />
      <div className="grid min-h-svh lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-end px-6 pt-32 pb-16 lg:px-14">
          <h1 className="font-serif text-6xl leading-[0.9] md:text-7xl">{t.title}</h1>
          <p className="mt-8">
            <Link className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-sm font-semibold text-white" to="/#cotizar">
              {cta}
            </Link>
          </p>
        </div>
        <ol className="divide-y divide-white/15 border-t border-white/15 lg:border-t-0 lg:border-l">
          {t.points.map((point, index) => (
            <li key={point} className="grid grid-cols-[4rem_1fr] gap-4 px-6 py-8 lg:px-10">
              <span className="font-serif text-3xl text-gold-line">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-lg leading-relaxed">{point}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="px-6 pb-16 lg:px-14">
        <div className="mx-auto max-w-4xl">
          <AsistenciaIA tone="dark" />
        </div>
      </div>
    </main>
  );
}
