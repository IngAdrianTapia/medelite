import { Link } from "react-router";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { ProcesoPaciente } from "../components/ProcesoPaciente";
import { Seo } from "../components/Seo";
import { PHOTO_OF } from "../i18n/labels";
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
      <header className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className="eyebrow">{m.hero.kicker}</p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{chrome.title}</h1>
            <p className="mt-6 max-w-[36rem] text-[17px] leading-relaxed text-muted md:text-lg">{m.hero.lede}</p>
            <p className="mt-5 max-w-[34rem] border-l-2 border-teal/40 pl-4 text-sm leading-6 text-muted">{m.notice}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link className="btn btn-primary min-h-12 px-7" to={{ pathname: "/", hash: "#cotizar" }}>
                {m.hero.ctaQuote} <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="link-line whitespace-nowrap pb-1 text-[15px] font-medium text-navy" to="/vuelos">{chrome.flights}</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-soft" data-gallery="canada">
            <FacilityPhoto name="marina-street" fill alt={PHOTO_OF["marina-street"]?.[lang] ?? "Hospital Joya Marina Vallarta"} sizes="(min-width: 1024px) 34rem, 100vw" />
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          <h2 className="font-serif text-3xl leading-tight text-navy md:text-4xl">{chrome.cities}</h2>
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {cities.map((city) => (
                <li key={city.id} className="py-5 font-serif text-2xl text-navy">{city.label[lang]}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">{m.hero.route}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.contact.city}</p>
          </div>
        </div>
      </section>
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="reveal mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="eyebrow">{m.journey.kicker}</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-navy md:text-[3.25rem]">{m.journey.title}</h2>
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-muted md:justify-self-end">{m.journey.deck}</p>
          </div>
          <ProcesoPaciente />
          <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            <Link className="link-line text-navy" to="/especialidades">{chrome.specialties}</Link>
            <Link className="link-line text-navy" to="/hospital-joya">{chrome.joya}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
