import { useI18n } from "../i18n";

/** Announcement only: the AI service is not live. No features, diagnosis or data handling are claimed. */
export function AsistenciaIA({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang } = useI18n();
  const t = {
    es: {
      status: "Próximamente · En implementación",
      title: "Atención asistida por inteligencia artificial propia de Grupo Joya",
      tagline: "Empresa asistida por IA empresarial propia.",
      body: "Grupo Médico Joya y MedElite están implementando una inteligencia artificial empresarial propia para apoyar la atención a pacientes. Todavía no está en servicio; lo anunciaremos aquí cuando se active. Hoy cada solicitud la atiende una persona del equipo, y la valoración y las decisiones médicas son de los médicos.",
    },
    en: {
      status: "Coming soon · Being implemented",
      title: "Care assisted by Grupo Joya’s own artificial intelligence",
      tagline: "A company assisted by its own enterprise AI.",
      body: "Grupo Médico Joya and MedElite are implementing their own enterprise artificial intelligence to support patient care. It is not in service yet; we will announce it here when it goes live. Today every request is handled by a person on the team, and medical assessment and decisions belong to the doctors.",
    },
    fr: {
      status: "Bientôt · En cours de mise en place",
      title: "Un accompagnement assisté par l’intelligence artificielle propre à Grupo Joya",
      tagline: "Une entreprise assistée par sa propre IA d’entreprise.",
      body: "Grupo Médico Joya et MedElite mettent en place leur propre intelligence artificielle d’entreprise pour soutenir l’accompagnement des patients. Elle n’est pas encore en service ; nous l’annoncerons ici dès son lancement. Aujourd’hui, chaque demande est traitée par une personne de l’équipe, et l’évaluation et les décisions médicales relèvent des médecins.",
    },
  }[lang];
  const dark = tone === "dark";
  return (
    <aside
      aria-label={t.title}
      className={`rounded-[1.5rem] border-l-2 border-gold-line px-6 py-6 md:px-8 ${dark ? "bg-white/5 text-white" : "bg-white text-ink shadow-premium"}`}
    >
      <p className={`text-xs font-semibold tracking-[0.18em] uppercase ${dark ? "text-gold-line" : "text-gold"}`}>{t.status}</p>
      <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{t.title}</h2>
      <p className={`mt-3 font-serif text-xl italic ${dark ? "text-white/85" : "text-navy"}`}>{t.tagline}</p>
      <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{t.body}</p>
    </aside>
  );
}
