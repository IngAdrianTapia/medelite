import { useI18n } from "../i18n";

/** Announcement only: the AI service is not live. No features, diagnosis or data handling are claimed. */
export function AsistenciaIA({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang } = useI18n();
  const t = {
    es: {
      status: "Próximamente · En implementación",
      title: "Atención asistida por inteligencia artificial",
      body: "Se está implementando atención asistida por inteligencia artificial para apoyar a los pacientes. Todavía no está en servicio; lo anunciaremos aquí cuando se active. Hoy cada solicitud la atiende una persona del equipo, y la valoración y las decisiones médicas son de los médicos.",
    },
    en: {
      status: "Coming soon · Being implemented",
      title: "AI-assisted care",
      body: "AI-assisted care is being implemented to support patients. It is not in service yet; we will announce it here when it goes live. Today every request is handled by a person on the team, and medical assessment and decisions belong to the doctors.",
    },
    fr: {
      status: "Bientôt · En cours de mise en place",
      title: "Soins assistés par intelligence artificielle",
      body: "Des soins assistés par intelligence artificielle sont en cours de mise en place pour accompagner les patients. Ce service n’est pas encore actif; nous l’annoncerons ici dès son lancement. Aujourd’hui, chaque demande est traitée par une personne de l’équipe, et l’évaluation et les décisions médicales relèvent des médecins.",
    },
  }[lang];
  const dark = tone === "dark";
  return (
    <aside
      id="ia"
      aria-label={t.title}
      className={`rounded-[1.5rem] border-l-2 border-gold-line px-6 py-6 md:px-8 ${dark ? "bg-white/5 text-white" : "bg-white text-ink shadow-premium"}`}
    >
      <p className={`text-xs font-semibold tracking-[0.18em] uppercase ${dark ? "text-gold-line" : "text-gold"}`}>{t.status}</p>
      <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{t.title}</h2>
      <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{t.body}</p>
    </aside>
  );
}
