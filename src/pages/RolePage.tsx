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
  const cta = lang === "fr" ? "Demander une soumission" : lang === "en" ? "Request a quote" : "Solicitar cotización";
  return (
    <main id="contenido" className="bg-white text-ink">
      <Seo title={`${t.title} — MedElite`} description={t.points[0] ?? t.title} path="/que-es" />
      <header className="border-b border-line bg-ivory">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-12 md:px-8 md:pt-16">
          <h1 className="font-serif text-3xl leading-tight text-navy md:text-5xl">{t.title}</h1>
          <p className="mt-6">
            <Link className="inline-flex min-h-12 items-center rounded-lg bg-gold px-6 text-sm font-semibold text-white hover:bg-navy" to="/#cotizar">
              {cta}
            </Link>
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        <ol className="grid gap-4 md:grid-cols-2">
          {t.points.map((point, index) => (
            <li key={point} className="flex gap-4 rounded-2xl border border-line bg-white p-6 shadow-premium">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-soft text-sm font-bold text-gold">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-[17px] leading-relaxed text-ink">{point}</p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
