import { Seo } from "../components/Seo";
import { PACKAGE_BANDS } from "../data/packages";
import { useI18n } from "../i18n";

export function ComparePage() {
  const { lang } = useI18n();
  const t = {
    es: {
      hook: "Atenderse en semanas, no en años.",
      title: "Canadá y México, con la fuente al lado",
      wait: "Espera publicada en Canadá",
      waitBody: "Fraser Institute, Waiting Your Turn 2025: 48.6 semanas de espera mediana nacional en ortopedia, y 32.2 semanas en Columbia Británica del médico familiar al tratamiento. Eso describe el sistema público. No es un resultado de MedElite.",
      schedule: "Fecha con MedElite",
      scheduleBody: "No publicamos un número de semanas garantizado. La fecha queda en el plan escrito después de que el cirujano en México revisa el caso. «En semanas, no en años» contrasta con la espera de Fraser; no es una cita prometida.",
      cost: "Costo",
      costBody: "El único rango de MedElite publicado aquí es el reemplazo de rodilla, en dólares canadienses, sujeto a valoración. No es una tarifa de Joya: Joya no publica precios. El plan provincial, en general, no paga la cirugía electiva en el extranjero.",
      knee: "Rodilla, desde",
    },
    en: {
      hook: "Get treated in weeks, not years.",
      title: "Canada and Mexico, with the source beside the claim",
      wait: "Published wait in Canada",
      waitBody: "Fraser Institute, Waiting Your Turn 2025: a 48.6-week national median wait in orthopedics, and 32.2 weeks in British Columbia from family doctor to treatment. That describes the public system. It is not a MedElite result.",
      schedule: "A date with MedElite",
      scheduleBody: "We do not publish a guaranteed number of weeks. The date is set in the written plan after the surgeon in Mexico reviews the case. “In weeks, not years” contrasts with the Fraser wait. It is not a promised appointment.",
      cost: "Cost",
      costBody: "The only MedElite range published here is the total knee replacement, in Canadian dollars, subject to review. It is not a Joya tariff: Joya does not publish prices. A provincial plan generally does not pay for elective surgery abroad.",
      knee: "Knee, starting from",
    },
    fr: {
      hook: "Se faire soigner en semaines, pas en années.",
      title: "Le Canada et le Mexique, avec la source à côté",
      wait: "Attente publiée au Canada",
      waitBody: "Institut Fraser, Waiting Your Turn 2025 : 48,6 semaines d’attente médiane nationale en orthopédie, et 32,2 semaines en Colombie-Britannique du médecin de famille au traitement. Cela décrit le système public. Ce n’est pas un résultat de MedElite.",
      schedule: "Une date avec MedElite",
      scheduleBody: "Nous ne publions pas un nombre de semaines garanti. La date est fixée dans le plan écrit après l’examen du chirurgien au Mexique. « En semaines, pas en années » contraste avec l’attente de Fraser. Ce n’est pas un rendez-vous promis.",
      cost: "Coût",
      costBody: "La seule fourchette MedElite publiée ici est le remplacement du genou, en dollars canadiens, sous réserve d’évaluation. Ce n’est pas un tarif de Joya : Joya ne publie pas de prix. Un régime provincial ne paie généralement pas la chirurgie élective à l’étranger.",
      knee: "Genou, à partir de",
    },
  }[lang];
  return (
    <main id="contenido">
      <Seo title={`${t.title} — MedElite`} description={t.waitBody} path="/comparar" />
      <header className="border-b border-line bg-ivory px-5 pt-12 pb-12 md:px-8 md:pt-16">
        <p className="mx-auto max-w-[1136px] font-serif text-xl text-gold">{t.hook}</p>
        <h1 className="mx-auto mt-4 max-w-[1136px] font-serif text-3xl leading-tight md:text-5xl">{t.title}</h1>
      </header>
      <div className="grid lg:grid-cols-2">
        <article className="bg-ivory px-6 py-16 lg:px-12">
          <h2 className="font-serif text-2xl">{t.wait}</h2>
          <p className="mt-4 text-lg leading-relaxed">{t.waitBody}</p>
        </article>
        <article className="border-y border-line bg-ivory px-5 py-16 md:px-8 lg:px-12">
          <h2 className="font-serif text-2xl">{t.schedule}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t.scheduleBody}</p>
        </article>
      </div>
      <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-16">
        <h2 className="font-serif text-2xl">{t.cost}</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{t.costBody}</p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-line bg-white p-6"><span className="block text-sm text-muted">{t.knee} Snowbird</span><span className="mt-2 block font-serif text-2xl">CAD {PACKAGE_BANDS.snowbird.low.toLocaleString("en-CA")}</span></li>
          <li className="rounded-2xl border-2 border-gold bg-white p-6"><span className="block text-sm text-muted">{t.knee} Essential</span><span className="mt-2 block font-serif text-2xl">CAD {PACKAGE_BANDS.essential.low.toLocaleString("en-CA")}</span></li>
          <li className="rounded-2xl border border-line bg-white p-6"><span className="block text-sm text-muted">{t.knee} Executive</span><span className="mt-2 block font-serif text-2xl">CAD {PACKAGE_BANDS.executive.low.toLocaleString("en-CA")}</span></li>
        </ul>
      </section>
    </main>
  );
}
