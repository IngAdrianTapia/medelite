import { useState } from "react";
import { useI18n } from "../i18n";

/** Excerpts copied from the testimonials page of medeliteofficial.com (read 16 Nov 2026).
 * Original English text, cut with an ellipsis only. Stories with weight-loss or other outcome
 * figures are left out on purpose: individual results are not a promise.
 */
const SOURCE = "https://www.medeliteofficial.com/blank-1-1";

const ITEMS = [
  {
    name: "Michelle Lander",
    place: "Thunder Bay, ON",
    quote:
      "My first experience with Hospital Joya was in 2020 during a medical emergency. Dr. Belloso came directly to my hotel room, took charge of the situation, coordinated with my travel insurance, and ensured that I received immediate medical attention.",
    es: "Mi primera experiencia con Hospital Joya fue en 2020, durante una emergencia médica. La Dra. Belloso llegó directamente a mi habitación de hotel, se hizo cargo de la situación, coordinó con mi seguro de viaje y se aseguró de que recibiera atención médica inmediata.",
    fr: "Ma première expérience avec Hospital Joya remonte à 2020, lors d’une urgence médicale. La Dre Belloso est venue directement à ma chambre d’hôtel, a pris la situation en main, a fait le lien avec mon assurance voyage et s’est assurée que je reçoive des soins immédiats.",
  },
  {
    name: "Catrine Campbell",
    place: "Toronto, ON",
    quote:
      "Through Hospital Joya Nuevo Vallarta, I was evaluated by both a gynecologist and an endocrinologist, received a personalized plan for long-term improvement, and learned the importance of nutritional support, hormone evaluation, supplementation, and lifestyle management.",
    es: "En Hospital Joya Nuevo Vallarta me valoraron especialistas en ginecología y en endocrinología, recibí un plan personalizado de mejora a largo plazo y aprendí la importancia del apoyo nutricional, la evaluación hormonal, la suplementación y los hábitos de vida.",
    fr: "À l’Hospital Joya Nuevo Vallarta, j’ai été évaluée par un gynécologue et un endocrinologue, j’ai reçu un plan personnalisé d’amélioration à long terme et j’ai compris l’importance du soutien nutritionnel, de l’évaluation hormonale, de la supplémentation et des habitudes de vie.",
  },
  {
    name: "Julie Lee",
    place: "Halifax, NS",
    quote:
      "Dr. Belloso has provided exceptional medical care and coordinated our care with the Joya Medical Group, whose specialists combine professionalism, expertise, and compassionate patient-centered care.",
    es: "La Dra. Belloso nos ha dado una atención médica excepcional y ha coordinado nuestra atención con el Grupo Médico Joya, cuyos especialistas combinan profesionalismo, experiencia y una atención humana centrada en el paciente.",
    fr: "La Dre Belloso nous a offert des soins exceptionnels et a coordonné nos soins avec le Grupo Médico Joya, dont les spécialistes allient professionnalisme, expertise et soins humains centrés sur le patient.",
  },
  {
    name: "Juan Jose Garcia",
    place: "Kingston, ON",
    quote:
      "In 2024, I had the opportunity to meet Dr. Belloso, who coordinated my knee arthroscopy surgery at Hospital Joya. I was impressed by the hospital's modern infrastructure, state-of-the-art equipment, and the professionalism, compassion, and human-centered care of the entire team.",
    es: "En 2024 conocí a la Dra. Belloso, quien coordinó mi artroscopia de rodilla en Hospital Joya. Me impresionaron la infraestructura moderna del hospital, su equipo de última generación y el profesionalismo, la compasión y el trato humano de todo el equipo.",
    fr: "En 2024, j’ai rencontré la Dre Belloso, qui a coordonné mon arthroscopie du genou à l’Hospital Joya. J’ai été impressionné par les installations modernes de l’hôpital, son équipement de pointe ainsi que le professionnalisme, la compassion et l’approche humaine de toute l’équipe.",
  },
] as const;

const UI = {
  es: {
    kicker: "Testimonios",
    title: "Lo que publican pacientes de Canadá",
    note: "Extractos de testimonios publicados en medeliteofficial.com, en su inglés original y con traducción de MedElite. Son experiencias individuales: no garantizan un resultado ni sustituyen la valoración médica.",
    source: "Ver los testimonios completos en medeliteofficial.com",
    prev: "Testimonio anterior",
    next: "Testimonio siguiente",
    go: "Ir al testimonio",
    translation: "Traducción",
  },
  en: {
    kicker: "Testimonials",
    title: "What patients from Canada have published",
    note: "Excerpts from testimonials published on medeliteofficial.com, in their original wording. They are individual experiences: they do not guarantee a result or replace a medical assessment.",
    source: "Read the full testimonials on medeliteofficial.com",
    prev: "Previous testimonial",
    next: "Next testimonial",
    go: "Go to testimonial",
    translation: "",
  },
  fr: {
    kicker: "Témoignages",
    title: "Ce que des patients du Canada ont publié",
    note: "Extraits de témoignages publiés sur medeliteofficial.com, en anglais d’origine et traduits par MedElite. Ce sont des expériences individuelles : elles ne garantissent pas un résultat et ne remplacent pas l’évaluation médicale.",
    source: "Lire les témoignages complets sur medeliteofficial.com",
    prev: "Témoignage précédent",
    next: "Témoignage suivant",
    go: "Aller au témoignage",
    translation: "Traduction",
  },
} as const;

export function Testimonios() {
  const { lang } = useI18n();
  const t = UI[lang];
  const [index, setIndex] = useState(0);
  const item = ITEMS[index] ?? ITEMS[0];
  const go = (step: number) => setIndex((index + step + ITEMS.length) % ITEMS.length);
  const translated = lang === "es" ? item.es : lang === "fr" ? item.fr : null;

  return (
    <section aria-labelledby="testimonios-title" aria-roledescription="carousel" className="bg-ivory px-5 md:px-8 py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">{t.kicker}</p>
        <h2 id="testimonios-title" className="mt-3 font-serif text-2xl leading-tight text-ink md:text-4xl">{t.title}</h2>
        <figure aria-live="polite" className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-premium md:p-10">
          <blockquote lang="en" cite={SOURCE} className="font-serif text-xl leading-snug text-navy md:text-2xl">
            “{item.quote}…”
          </blockquote>
          {translated ? (
            <p className="mt-4 border-l-2 border-gold pl-4 text-sm leading-relaxed text-muted">
              <span className="font-semibold">{t.translation}:</span> {translated}
            </p>
          ) : null}
          <figcaption className="mt-5 text-sm font-semibold text-ink">
            {item.name} <span className="font-normal text-muted">· {item.place}</span>
          </figcaption>
        </figure>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" aria-label={t.prev} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-navy text-xl text-navy" onClick={() => go(-1)}>‹</button>
          <div className="flex gap-1">
            {ITEMS.map((row, i) => (
              <button key={row.name} type="button" aria-label={`${t.go} ${i + 1}: ${row.name}`} aria-current={i === index} className="inline-flex min-h-11 min-w-11 items-center justify-center" onClick={() => setIndex(i)}>
                <span className={`block h-2.5 w-2.5 rounded-full ${i === index ? "bg-navy" : "bg-line"}`} />
              </button>
            ))}
          </div>
          <button type="button" aria-label={t.next} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-navy text-xl text-navy" onClick={() => go(1)}>›</button>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-muted">{t.note}</p>
        <p className="mt-2 text-sm">
          <a className="underline" href={SOURCE} rel="noopener noreferrer" target="_blank">{t.source}</a>
        </p>
      </div>
    </section>
  );
}
