import { Link } from "react-router";
import { Seo } from "../components/Seo";
import { CANADA_CHROME, publishedCities } from "../content/positioning";
import { useI18n } from "../i18n";

/** English-first Canada shell. Copy comes from existing messages. New claims wait in positioning.ts. */
export function CanadaPage() {
  const { m, lang } = useI18n();
  const chrome = CANADA_CHROME[lang];
  const cities = publishedCities();

  return (
    <main id="contenido">
      <Seo title={`${chrome.title} — MedElite`} description={m.hero.lede} path="/canada" />
      <header className="border-b border-line bg-ivory px-5 pt-12 pb-12 md:px-8 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{m.hero.kicker}</p>
          <h1 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">{chrome.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{m.hero.lede}</p>
          <p className="mt-4 max-w-xl border-l-2 border-gold-line pl-4 text-sm leading-6 text-muted">{m.notice}</p>
          <p className="mt-8">
            <Link className="inline-flex min-h-12 items-center rounded-lg bg-gold px-6 text-sm font-semibold text-white" to="/#cotizar">
              {m.hero.ctaQuote}
            </Link>
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-3xl px-5 md:px-8 py-16">
        <h2 className="font-serif text-2xl text-ink">{chrome.cities}</h2>
        <ul className="mt-4 grid gap-2">
          {cities.map((city) => (
            <li key={city.id} className="rounded-2xl border border-line bg-white px-4 py-3 text-lg">{city.label[lang]}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted">{m.hero.route}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{m.contact.city}</p>
        <p className="mt-6">
          <Link className="inline-flex min-h-11 items-center underline" to="/vuelos">{chrome.flights}</Link>
        </p>
      </section>
      <section className="bg-ivory px-5 md:px-8 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">{m.journey.kicker}</p>
          <h2 className="mt-3 font-serif text-2xl text-ink">{m.journey.title}</h2>
          <p className="mt-4 text-muted">{m.journey.deck}</p>
          <ol className="mt-8 grid gap-4">
            {m.journey.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-line bg-white p-6">
                <p className="font-serif text-2xl text-gold">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-serif text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex flex-wrap gap-4">
            <Link className="inline-flex min-h-11 items-center underline" to="/especialidades">{chrome.specialties}</Link>
            <Link className="inline-flex min-h-11 items-center underline" to="/hospital-joya">{chrome.joya}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
