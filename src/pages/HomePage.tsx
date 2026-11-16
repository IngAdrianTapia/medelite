import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { MapaSedes } from "../components/MapaSedes";
import { Testimonios } from "../components/Testimonios";
import { MexicoMap } from "../components/MexicoMap";
import { QuoteWizard } from "../components/QuoteWizard";
import { RecorridoPaciente } from "../components/RecorridoPaciente";
import { SalesContact } from "../components/SalesContact";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { PEOPLE } from "../data/people";
import { PACKAGE_BANDS, PACKAGE_IDS, formatCad, formatRange } from "../data/packages";
import { CRA_MEDICAL_EXPENSES, HM_RELEASE, SOURCES } from "../data/sources";
import { POSITIONING } from "../content/positioning";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";



export function HomePage() {
  const { hash } = useLocation();
  const { m, lang } = useI18n();
  const copy = POSITIONING[lang];
  const vallarta = {
    es: {
      kicker: "Punto de partida · Puerto Vallarta",
      title: "Joya Marina Vallarta, primero. La red Joya, según su caso.",
      body: "MedElite coordina desde Canadá. Hospital Joya Marina presta atención médica en Puerto Vallarta y publica traumatología y ortopedia entre sus servicios. La sede, el equipo clínico y el procedimiento se confirman para cada paciente antes de viajar.",
      hospital: "Conocer Hospital Joya Marina",
      network: "Ver las demás sedes Joya",
      source: "Ficha oficial del hospital",
    },
    en: {
      kicker: "Starting point · Puerto Vallarta",
      title: "Joya Marina Vallarta first. The Joya network as your case requires.",
      body: "MedElite coordinates from Canada. Hospital Joya Marina provides medical care in Puerto Vallarta and lists trauma and orthopedics among its services. The hospital, clinical team and procedure are confirmed for each patient before travel.",
      hospital: "Explore Hospital Joya Marina",
      network: "See the other Joya hospitals",
      source: "Official hospital page",
    },
    fr: {
      kicker: "Point de départ · Puerto Vallarta",
      title: "Joya Marina Vallarta d’abord. Le réseau Joya selon votre situation.",
      body: "MedElite coordonne depuis le Canada. Hospital Joya Marina prodigue les soins médicaux à Puerto Vallarta et indique la traumatologie et l’orthopédie parmi ses services. L’établissement, l’équipe médicale et l’intervention sont confirmés pour chaque patient avant le voyage.",
      hospital: "Découvrir Hospital Joya Marina",
      network: "Voir les autres établissements Joya",
      source: "Fiche officielle de l’hôpital",
    },
  }[lang];

  useEffect(() => {
    if (!/^#[a-z0-9-]+$/i.test(hash)) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView();
  }, [hash]);

  return (
    <main id="contenido">
      <Seo title={m.meta.title} description={m.meta.description} path="/" />

      <section id="inicio" className="border-b border-line bg-gradient-to-b from-soft/60 to-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-6 px-5 pt-5 pb-10 md:gap-8 md:px-8 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-20">
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-wide text-gold uppercase">{m.hero.kicker}</p>
            <h1 className="mt-4 font-serif text-[2.1rem] leading-[1.1] text-navy sm:text-5xl lg:text-[3.4rem]">{copy.headline}</h1>
            <p className="mt-5 text-lg leading-snug font-semibold text-navy md:text-xl">{m.hero.title}</p>
            <p className="mt-3 text-base leading-7 text-muted md:text-[17px]">{m.hero.lede}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#orientacion" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gold px-6 text-[15px] font-semibold text-white shadow-sm hover:bg-navy">
                {m.sales.cta}
              </a>
              <a href="#recorrido" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-navy/25 bg-white px-6 text-[15px] font-semibold text-navy hover:border-navy">
                {m.hero.ctaHow}
              </a>
            </div>
            <p className="mt-6 border-l-2 border-gold pl-4 text-sm leading-6 text-muted">{m.notice}</p>
          </div>
          <div className="relative order-first aspect-[16/9] w-full overflow-hidden rounded-2xl bg-soft shadow-premium sm:aspect-[4/3] lg:order-none lg:aspect-[5/4]">
            <FacilityPhoto
              name="marina"
              fill
              priority
              fetchPriority="high"
              alt={PHOTO_OF.marina?.[lang] ?? "Hospital Joya Marina Vallarta"}
              sizes="(min-width: 1200px) 640px, (min-width: 1024px) 52vw, 100vw"
              className="object-center"
            />
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] px-5 pb-10 md:px-8">
          <p className="max-w-3xl text-sm leading-6 text-muted">{copy.fraser}</p>
        </div>
      </section>

      <SalesContact />

      <section aria-labelledby="vallarta-title" className="bg-white px-5 md:px-8 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1136px] overflow-hidden rounded-2xl bg-ivory lg:grid-cols-2">
          <figure className="relative min-h-[18rem] bg-soft lg:min-h-[30rem]">
            <FacilityPhoto name="marina" fill alt={PHOTO_OF.marina?.[lang] ?? "Hospital Joya Marina Vallarta"} sizes="(min-width: 1024px) 50vw, 100vw" />
          </figure>
          <div className="flex flex-col justify-center p-7 md:p-12">
            <p className="text-sm font-semibold tracking-wide text-gold uppercase">{vallarta.kicker}</p>
            <h2 id="vallarta-title" className="mt-4 font-serif text-2xl leading-tight text-navy md:text-4xl">{vallarta.title}</h2>
            <p className="mt-5 leading-relaxed text-muted">{vallarta.body}</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm">
              <Link to="/red/marina" className="inline-flex min-h-12 items-center rounded-lg bg-navy px-5 font-semibold text-white hover:bg-navy-2">{vallarta.hospital}</Link>
              <Link to="/red" className="inline-flex min-h-12 items-center rounded-lg border border-navy px-5 text-navy hover:bg-white">{vallarta.network}</Link>
            </div>
            <p className="mt-6 text-xs text-muted"><a className="underline" href="https://hospitaljoya.com/hospitales/hospital-joya-marina-vallarta/" rel="noopener noreferrer">{vallarta.source}</a></p>
          </div>
        </div>
      </section>

      <section id="rol" className="bg-ivory py-16 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-4 px-5 md:grid-cols-6 md:px-8">
          <article className="flex flex-col justify-between rounded-2xl border border-line bg-white p-8 shadow-premium md:col-span-4 md:row-span-2 md:p-12">
            <p className="text-sm font-semibold tracking-wide text-gold uppercase">{m.role.kicker}</p>
            <div>
              <h2 className="mt-6 font-serif text-3xl leading-tight md:text-[2.75rem]">{m.role.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{m.role.body}</p>
            </div>
          </article>
          {m.hero.metrics.slice(0, 2).map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-line bg-white p-6 md:col-span-2">
              <p className="font-serif text-2xl text-navy">{metric.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{metric.label}</p>
            </article>
          ))}
          {m.role.points.map((point) => (
            <article key={point} className="rounded-2xl border border-line bg-white p-6 text-sm leading-relaxed md:col-span-2">
              {point}
            </article>
          ))}
          {m.hero.metrics.slice(2).map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-line bg-white p-6 md:col-span-3">
              <p className="font-serif text-2xl text-gold">{metric.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="recorrido" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <p className="text-sm font-semibold tracking-wide text-gold uppercase">{m.journey.kicker}</p>
          <div className="mt-4">
            <RecorridoPaciente />
          </div>
        </div>
      </section>

      <section id="red" className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-gold uppercase">{m.network.kicker}</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-[2.75rem]">{m.network.title}</h2>
            <p className="mt-4 text-muted">{m.network.deck}</p>
            <p className="mt-3 text-sm text-muted">{copy.mapNote}</p>
          </div>
          <div className="mb-8">
            <MapaSedes headingLevel={3} />
          </div>
          <MexicoMap label={copy.mapLabel} />
        </div>
        <div className="mx-auto mt-8 max-w-[1200px] space-y-3 px-5 md:px-8 text-sm leading-relaxed text-muted">
          <p>{m.network.source}</p>
          <p>{m.network.open}</p>
          <p>
            {m.network.future}{" "}
            <a className="underline" href={HM_RELEASE} rel="noopener noreferrer">{m.network.hm}</a>
          </p>
        </div>
      </section>

      <section id="especialidades" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <p className="text-sm font-semibold tracking-wide text-gold uppercase">{m.verticals.kicker}</p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight md:text-[2.75rem]">{m.verticals.title}</h2>
          <p className="mt-4 max-w-2xl text-muted">{m.verticals.deck}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1200px] gap-6 px-5 md:grid-cols-2 md:px-8">
          {m.verticals.items.map((item, index) => {
            const photo = (["marina", "riviera", "operating-room", "cancun-ct"] as const)[index] ?? "operating-room";
            const wide = index === 0;
            return (
              <article key={item.title} className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-premium ${wide ? "md:col-span-2 md:grid md:grid-cols-2" : ""}`}>
                <div className={`relative aspect-[16/10] bg-soft ${wide ? "md:aspect-auto md:min-h-[22rem]" : ""}`}>
                  <FacilityPhoto name={photo} fill alt={PHOTO_OF[photo]?.[lang] ?? item.title} sizes={wide ? "(min-width: 768px) 600px, 100vw" : "(min-width: 768px) 600px, 100vw"} />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-xs font-semibold tracking-wide text-gold uppercase">{item.request ? m.verticals.request : m.verticals.focus}</p>
                  <h3 className="mt-2 font-serif text-2xl text-navy">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.body}</p>
                  <p className="mt-auto pt-4 text-sm font-medium text-navy">{item.sites}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="paquetes" className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <p className="text-sm font-semibold tracking-wide text-gold uppercase">{m.packages.kicker}</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-[2.75rem]">{m.packages.title}</h2>
          <p className="mt-4 max-w-3xl text-muted">{m.packages.deck}</p>
          <p className="mt-3 max-w-3xl text-sm text-warn">{m.packages.example}</p>
          <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
            {PACKAGE_IDS.map((id) => {
              const copy = m.packages.items[id];
              const band = PACKAGE_BANDS[id];
              const lifted = id === "essential";
              return (
                <article key={id} className={`flex flex-col rounded-2xl bg-white p-7 shadow-premium ${lifted ? "border-2 border-gold lg:-translate-y-4" : "border border-line"}`}>
                  <h3 className="font-serif text-2xl">{copy.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{copy.who}</p>
                  <p className="mt-6 text-xs tracking-[0.16em] text-gold uppercase">{m.packages.from}</p>
                  <p className="font-serif text-3xl text-navy">{formatCad(band.low)}</p>
                  <p className="mt-1 text-sm text-muted">{m.packages.range}: {formatRange(band.low, band.high)}</p>
                  <ul className="mt-6 grid flex-1 gap-3 text-sm leading-relaxed">
                    {copy.points.map((point) => (
                      <li key={point} className="border-t border-line pt-3">{point}</li>
                    ))}
                  </ul>
                  <a href="#cotizar" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-navy px-5 text-sm font-semibold text-white hover:bg-gold">
                    {m.hero.ctaQuote}
                  </a>
                </article>
              );
            })}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">{m.packages.note}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed">{m.packages.payment}</p>
        </div>
      </section>

      <section id="nosotros" className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-[1200px] px-5 md:px-8 items-center gap-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-12">
        <figure className="mx-auto w-full max-w-[16rem] overflow-hidden rounded-2xl bg-white shadow-premium md:max-w-[20rem]">
          <img src="/assets/img/equipo/erika-cruz-joya.jpg" width={640} height={800} alt={m.about.erikaAlt} className="block h-auto w-full" />
        </figure>
        <div className="flex min-w-0 flex-col justify-center">
          <p className="text-sm font-semibold tracking-wide text-gold uppercase">{m.about.kicker}</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight">{m.about.title}</h2>
          <p className="mt-4 text-muted">{m.about.lead}</p>
          <h3 className="mt-8 font-serif text-2xl">Erika Cruz Joya</h3>
          <p className="text-sm text-navy">{m.about.erikaRole}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{m.about.erika}</p>
          <div className="mt-8 border-t border-line pt-6">
            <p className="font-serif text-3xl text-navy">AB</p>
            <h3 className="mt-2 font-serif text-xl">{m.about.anaName}</h3>
            <p className="text-sm text-navy">{m.about.anaRole}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.about.ana}</p>
          </div>
          <ul className="mt-8 flex gap-3 overflow-x-auto pb-2 text-sm" tabIndex={0}>
            {PEOPLE.map((person) => (
              <li key={person.id} className="shrink-0 rounded-full border border-line px-3 py-2">
                <Link to="/equipo">{person.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </section>
      <div className="bg-white px-5 pb-16 text-sm leading-relaxed text-muted md:px-8">
        {m.about.story.map((paragraph) => (
          <p key={paragraph} className="mx-auto mt-3 max-w-3xl">{paragraph}</p>
        ))}
      </div>

      <Testimonios />

      <section id="faq" className="bg-ivory px-5 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-gold uppercase">{m.faq.kicker}</p>
          <h2 className="mt-3 font-serif text-3xl">{m.faq.title}</h2>
          <p className="mt-4 text-muted">{m.faq.deck}</p>
          <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {m.faq.items.map((item) => (
              <details key={item.q} className="group px-5 py-2 md:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-[17px] font-semibold text-navy [&::-webkit-details-marker]:hidden">{item.q}<span aria-hidden="true" className="text-xl text-gold transition-transform group-open:rotate-45">+</span></summary>
                <p className="pb-4 text-[15px] leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 md:px-8 lg:grid-cols-2">
          <article>
            <h2 className="font-serif text-2xl">{m.snow.title}</h2>
            {m.snow.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">{paragraph}</p>
            ))}
          </article>
          <article>
            <h2 className="font-serif text-2xl">{m.metc.title}</h2>
            {m.metc.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">{paragraph}</p>
            ))}
            <p className="mt-4 text-sm text-warn">{m.metc.disclaimer}</p>
            <p className="mt-3"><a className="underline" href={CRA_MEDICAL_EXPENSES} rel="noopener noreferrer">{m.metc.link}</a></p>
          </article>
          <article className="lg:col-span-2">
            <h2 className="font-serif text-2xl">{m.trust.title}</h2>
            <p className="mt-3 max-w-3xl text-muted">{m.trust.deck}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {m.trust.items.map((item) => (
                <div key={item.title} className="border-t border-navy pt-4">
                  <h3 className="font-serif text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm">{m.trust.standards}</p>
          </article>
          <article className="lg:col-span-2">
            <h2 className="font-serif text-2xl">{m.facts.title}</h2>
            <p className="mt-3 text-muted">{m.facts.deck}</p>
            <div tabIndex={0} aria-label={m.facts.caption} className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <caption className="sr-only">{m.facts.caption}</caption>
                <thead>
                  <tr>{m.facts.columns.map((column) => <th key={column} scope="col" className="border-b border-line py-3 pr-4">{column}</th>)}</tr>
                </thead>
                <tbody>
                  {m.facts.rows.map((row) => (
                    <tr key={row.ind} className="border-b border-line align-top">
                      <th scope="row" className="py-3 pr-4 font-medium">{row.ind}</th>
                      <td className="py-3 pr-4 text-muted">{row.fig}</td>
                      <td className="py-3">{row.src}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
          <article lang={lang === "es" ? "es-MX" : lang === "fr" ? "fr-CA" : "en-CA"}>
            <h2 className="font-serif text-2xl">{m.audio.heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{m.audio.text}</p>
          </article>
          <article id="contacto">
            <h2 className="font-serif text-2xl">{m.contact.title}</h2>
            <p className="mt-3 text-sm text-muted">{m.contact.deck}</p>
            <p className="mt-4 text-sm"><a className="underline" href="mailto:info@medeliteofficial.com">info@medeliteofficial.com</a></p>
            <p className="text-sm"><a className="underline" href="tel:+16044428475">+1 (604) 442-8475</a></p>
            <p className="mt-2 text-sm text-muted">{m.contact.hoursValue}</p>
            <p className="text-sm text-muted">{m.contact.city}</p>
            <p className="mt-3"><Link className="text-sm underline" to="/privacy">{m.nav.privacy}</Link></p>
          </article>
          <article className="lg:col-span-2">
            <h2 className="font-serif text-2xl">{m.sourcesTitle}</h2>
            <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
              {SOURCES.map((source) => (
                <li key={source.href}><a className="underline" href={source.href} rel="noopener noreferrer">{source.label}</a></li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="cotizar" className="border-t border-line bg-soft/60 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="text-center font-serif text-3xl text-navy md:text-4xl">{m.hero.ctaQuote}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">{m.hero.lede}</p>
          <div className="mx-auto mt-10 max-w-5xl">
            <QuoteWizard />
          </div>
        </div>
      </section>
    </main>
  );
}
