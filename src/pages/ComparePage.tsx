import { FacilityPhoto } from "../components/FacilityPhoto";
import { PageCta } from "../components/PageCta";
import { Seo } from "../components/Seo";
import { PACKAGE_BANDS } from "../data/packages";
import { PHOTO_OF } from "../i18n/labels";
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
      photoCap: "Hospital Joya Querétaro. La fecha de cirugía la confirma el cirujano en México, por escrito.",
      weeks: "semanas",
      ortho: "Ortopedia, mediana nacional",
      bc: "Columbia Británica, del médico familiar al tratamiento",
      source: "Fraser Institute, Waiting Your Turn 2025. Describe el sistema público, no un resultado de MedElite.",
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
      photoCap: "Hospital Joya Querétaro. The surgery date is confirmed in writing by the surgeon in Mexico.",
      weeks: "weeks",
      ortho: "Orthopedics, national median",
      bc: "British Columbia, from family doctor to treatment",
      source: "Fraser Institute, Waiting Your Turn 2025. It describes the public system, not a MedElite result.",
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
      photoCap: "Hospital Joya Querétaro. La date de chirurgie est confirmée par écrit par le chirurgien au Mexique.",
      weeks: "semaines",
      ortho: "Orthopédie, médiane nationale",
      bc: "Colombie-Britannique, du médecin de famille au traitement",
      source: "Institut Fraser, Waiting Your Turn 2025. Cela décrit le système public, pas un résultat de MedElite.",
    },
  }[lang];
  return (
    <main id="contenido">
      <Seo title={`${t.title} — MedElite`} description={t.waitBody} path="/comparar" />
      <header className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className="eyebrow">{t.hook}</p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{t.title}</h1>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-soft" data-gallery="comparar">
            <FacilityPhoto name="queretaro-tower" fill alt={PHOTO_OF["queretaro-tower"]?.[lang] ?? t.title} sizes="(min-width: 1024px) 34rem, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-5 pt-16 pb-4 text-sm text-white">{t.photoCap}</figcaption>
          </figure>
        </div>
      </header>
      <section className="bg-ivory px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1136px] gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-8">
            <p>
              <span className="block font-serif text-6xl leading-none text-navy md:text-7xl">48.6</span>
              <span className="mt-3 block text-sm font-medium text-navy">{t.weeks}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{t.ortho}</span>
            </p>
            <p>
              <span className="block font-serif text-6xl leading-none text-navy md:text-7xl">32.2</span>
              <span className="mt-3 block text-sm font-medium text-navy">{t.weeks}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{t.bc}</span>
            </p>
            <p className="col-span-2 max-w-xl text-sm leading-relaxed text-muted">{t.source}</p>
          </div>
          <div className="grid overflow-hidden rounded-3xl border border-line bg-white">
            <article className="p-8 md:p-10">
              <h2 className="font-serif text-3xl leading-tight text-navy">{t.wait}</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink">{t.waitBody}</p>
            </article>
            <article className="border-t border-line p-8 md:p-10">
              <h2 className="font-serif text-3xl leading-tight text-navy">{t.schedule}</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted">{t.scheduleBody}</p>
            </article>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:pr-72">
        <h2 className="font-serif text-3xl leading-tight md:text-4xl text-navy">{t.cost}</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{t.costBody}</p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-line bg-white p-6"><span className="block text-sm text-muted">{t.knee} Snowbird</span><span className="mt-2 block font-serif text-2xl">CAD {PACKAGE_BANDS.snowbird.low.toLocaleString("en-CA")}</span></li>
          <li className="rounded-2xl border-2 border-teal bg-white p-6"><span className="block text-sm text-muted">{t.knee} Essential</span><span className="mt-2 block font-serif text-2xl">CAD {PACKAGE_BANDS.essential.low.toLocaleString("en-CA")}</span></li>
          <li className="rounded-2xl border border-line bg-white p-6"><span className="block text-sm text-muted">{t.knee} Executive</span><span className="mt-2 block font-serif text-2xl">CAD {PACKAGE_BANDS.executive.low.toLocaleString("en-CA")}</span></li>
        </ul>
      </section>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-8 md:pr-72">
        <PageCta />
      </div>
    </main>
  );
}
