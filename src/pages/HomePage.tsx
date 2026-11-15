import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link, useLocation } from "react-router";
import { MexicoMap } from "../components/MexicoMap";
import { QuoteWizard } from "../components/QuoteWizard";
import { RecorridoPaciente } from "../components/RecorridoPaciente";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { HOSPITALS } from "../data/hospitals";
import { PEOPLE } from "../data/people";
import { PACKAGE_BANDS, PACKAGE_IDS, formatCad, formatRange } from "../data/packages";
import { CRA_MEDICAL_EXPENSES, HM_RELEASE, SOURCES } from "../data/sources";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";

const HERO_FRAMES = ["cancun", "riviera", "marina"] as const;

function JourneyRail({ steps }: { steps: { title: string; body: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);
  const cards = steps.map((step, index) => (
    <li key={step.title} className="w-[82vw] shrink-0 rounded-[2rem] bg-ivory p-7 text-ink shadow-premium md:w-[24rem]">
      <p className="font-serif text-6xl text-gold">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-4 font-serif text-3xl leading-tight">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
    </li>
  ));
  if (reduce) {
    return (
      <ol className="flex snap-x gap-4 overflow-x-auto px-5 pb-6" tabIndex={0}>
        {cards}
      </ol>
    );
  }
  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.ol style={{ x }} className="flex gap-5 pl-6 md:pl-[8vw]">
          {cards}
        </motion.ol>
      </div>
    </div>
  );
}

export function HomePage() {
  const { hash } = useLocation();
  const { m, lang } = useI18n();
  const reduce = useReducedMotion();
  const line =
    lang === "en" ? "Get treated in weeks, not years." : lang === "fr" ? "Se faire soigner en semaines, pas en années." : "Atenderse en semanas, no en años.";
  const fraser =
    lang === "en"
      ? "Fraser Institute, Waiting Your Turn 2025: 48.6 weeks median for orthopedics in Canada. A date here is written after the surgeon in Mexico reviews the case. It is not a guaranteed interval."
      : lang === "fr"
        ? "Institut Fraser, Waiting Your Turn 2025 : 48,6 semaines médianes en orthopédie au Canada. Une date ici s’écrit après l’examen du chirurgien au Mexique. Ce n’est pas un délai garanti."
        : "Fraser Institute, Waiting Your Turn 2025: 48.6 semanas de espera mediana en ortopedia en Canadá. Una fecha aquí se escribe después de que el cirujano en México revisa el caso. No es un plazo garantizado.";
  const mapLabel = lang === "en" ? "Schematic of nine Joya hospitals" : lang === "fr" ? "Schéma des neuf hôpitaux Joya" : "Esquema de las nueve sedes Joya";
  const mapNote =
    lang === "en"
      ? "A schematic, not a survey map. Dots are the nine open Joya hospitals."
      : lang === "fr"
        ? "Un schéma, pas une carte topographique. Les points sont les neuf hôpitaux Joya ouverts."
        : "Un esquema, no un mapa topográfico. Los puntos son las nueve sedes Joya abiertas.";

  useEffect(() => {
    if (!/^#[a-z0-9-]+$/i.test(hash)) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView();
  }, [hash]);

  return (
    <main id="contenido">
      <Seo title={m.meta.title} description={m.meta.description} path="/" />

      <section id="inicio" className="relative h-svh min-h-[680px] overflow-hidden bg-navy text-white">
        {HERO_FRAMES.map((name, index) => (
          <div key={name} className="hero-frame absolute inset-0">
            <div className={reduce ? "absolute inset-0" : "kenburns absolute inset-0"}>
              <FacilityPhoto
                name={name}
                fill
                priority={index === 0}
                alt={index === 0 ? (PHOTO_OF[name]?.[lang] ?? name) : ""}
                sizes="100vw"
                className="object-center"
              />
            </div>
          </div>
        ))}
        <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-36 md:px-14 md:pb-20">
          <p className="max-w-xl text-sm text-gold-line">{m.notice}</p>
          <p className="mt-4 text-xs tracking-[0.28em] text-white/70 uppercase">{m.hero.kicker}</p>
          <h1 className="mt-3 max-w-5xl font-serif text-6xl leading-[0.88] tracking-tight sm:text-7xl md:text-8xl">{line}</h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">{m.hero.title}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">{fraser}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cotizar" className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-sm font-semibold text-white hover:bg-white hover:text-navy">
              {m.hero.ctaQuote}
            </a>
            <a href="#recorrido" className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 text-sm text-white hover:bg-white hover:text-navy">
              {m.hero.ctaHow}
            </a>
          </div>
        </div>
      </section>

      <section id="rol" className="bg-ivory px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-6">
          <article className="flex flex-col justify-between rounded-[2rem] bg-navy p-8 text-white md:col-span-4 md:row-span-2 md:p-12">
            <p className="text-xs tracking-[0.22em] text-gold-line uppercase">{m.role.kicker}</p>
            <div>
              <h2 className="mt-6 font-serif text-5xl leading-[0.95] md:text-6xl">{m.role.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">{m.role.body}</p>
            </div>
          </article>
          {m.hero.metrics.slice(0, 2).map((metric) => (
            <article key={metric.label} className="rounded-[2rem] border border-line bg-white p-6 md:col-span-2">
              <p className="font-serif text-4xl text-navy">{metric.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{metric.label}</p>
            </article>
          ))}
          {m.role.points.map((point) => (
            <article key={point} className="rounded-[2rem] border border-line bg-white p-6 text-sm leading-relaxed md:col-span-2">
              {point}
            </article>
          ))}
          {m.hero.metrics.slice(2).map((metric) => (
            <article key={metric.label} className="rounded-[2rem] bg-navy p-6 text-white md:col-span-3">
              <p className="font-serif text-4xl text-gold-line">{metric.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="recorrido" className="bg-[#071018] py-16 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs tracking-[0.22em] text-gold-line uppercase">{m.journey.kicker}</p>
          <h2 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] md:text-6xl">{m.journey.title}</h2>
          <p className="mt-4 max-w-2xl text-white/70">{m.journey.deck}</p>
        </div>
        <div className="mt-10">
          <JourneyRail steps={m.journey.steps} />
        </div>
        <div className="mx-auto mt-6 max-w-6xl px-5">
          <RecorridoPaciente />
        </div>
      </section>

      <section id="red" className="bg-ivory py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs tracking-[0.22em] text-gold uppercase">{m.network.kicker}</p>
            <h2 className="mt-3 font-serif text-5xl leading-[0.95] md:text-6xl">{m.network.title}</h2>
            <p className="mt-4 text-muted">{m.network.deck}</p>
            <p className="mt-3 text-sm text-muted">{mapNote}</p>
          </div>
          <MexicoMap label={mapLabel} />
        </div>
        <div className="mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-2" tabIndex={0} aria-label={m.network.title}>
          {HOSPITALS.map((hospital) => (
            <Link key={hospital.id} to={`/red/${hospital.id}`} className="w-72 shrink-0 snap-start">
              <figure className="relative h-[26rem] overflow-hidden rounded-[2rem] bg-navy">
                <FacilityPhoto name={hospital.id} fill alt={PHOTO_OF[hospital.id]?.[lang] ?? hospital.name} sizes="18rem" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy to-transparent p-5 text-white">
                  <span className="block font-serif text-2xl">{hospital.name.replace("Hospital Joya ", "")}</span>
                  <span className="mt-1 block text-sm text-white/80">{hospital.city}</span>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-6xl space-y-3 px-5 text-sm leading-relaxed text-muted">
          <p>{m.network.source}</p>
          <p>{m.network.open}</p>
          <p>
            {m.network.future}{" "}
            <a className="underline" href={HM_RELEASE} rel="noopener noreferrer">{m.network.hm}</a>
          </p>
        </div>
      </section>

      <section id="especialidades" className="bg-navy py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs tracking-[0.22em] text-gold-line uppercase">{m.verticals.kicker}</p>
          <h2 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] md:text-6xl">{m.verticals.title}</h2>
          <p className="mt-4 max-w-2xl text-white/70">{m.verticals.deck}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-4 px-5 lg:grid-cols-2">
          {m.verticals.items.map((item, index) => {
            const photo = (["marina", "guadalajara", "cancun", "operating-room"] as const)[index] ?? "operating-room";
            const wide = index === 0;
            return (
              <article key={item.title} className={`relative min-h-[28rem] overflow-hidden rounded-[2rem] ${wide ? "lg:col-span-2 lg:min-h-[36rem]" : ""}`}>
                <FacilityPhoto name={photo} fill alt={PHOTO_OF[photo]?.[lang] ?? item.title} sizes={wide ? "100vw" : "(min-width: 1024px) 40rem, 100vw"} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs tracking-[0.18em] text-gold-line uppercase">{item.request ? m.verticals.request : m.verticals.focus}</p>
                  <h3 className="mt-2 font-serif text-4xl">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">{item.body}</p>
                  <p className="mt-3 text-sm">{item.sites}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="paquetes" className="bg-[#f6f1e8] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">{m.packages.kicker}</p>
          <h2 className="mt-3 font-serif text-5xl leading-[0.95] md:text-6xl">{m.packages.title}</h2>
          <p className="mt-4 max-w-3xl text-muted">{m.packages.deck}</p>
          <p className="mt-3 max-w-3xl text-sm text-warn">{m.packages.example}</p>
          <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
            {PACKAGE_IDS.map((id) => {
              const copy = m.packages.items[id];
              const band = PACKAGE_BANDS[id];
              const lifted = id === "essential";
              return (
                <article key={id} className={`flex flex-col rounded-[2rem] bg-white p-7 shadow-premium ${lifted ? "border-2 border-gold lg:-translate-y-4" : "border border-line"}`}>
                  <h3 className="font-serif text-4xl">{copy.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{copy.who}</p>
                  <p className="mt-6 text-xs tracking-[0.16em] text-gold uppercase">{m.packages.from}</p>
                  <p className="font-serif text-5xl text-navy">{formatCad(band.low)}</p>
                  <p className="mt-1 text-sm text-muted">{m.packages.range}: {formatRange(band.low, band.high)}</p>
                  <ul className="mt-6 grid flex-1 gap-3 text-sm leading-relaxed">
                    {copy.points.map((point) => (
                      <li key={point} className="border-t border-line pt-3">{point}</li>
                    ))}
                  </ul>
                  <a href="#cotizar" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-navy px-5 text-sm font-semibold text-white hover:bg-gold">
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

      <section id="nosotros" className="grid bg-white lg:grid-cols-12">
        <figure className="relative min-h-[70vh] lg:col-span-7">
          <img src="/assets/img/equipo/erika-cruz-joya.jpg" width={640} height={800} alt={m.about.erikaAlt} className="h-full w-full object-cover object-top" />
        </figure>
        <div className="flex flex-col justify-end bg-ivory px-6 py-16 lg:col-span-5 lg:px-12">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">{m.about.kicker}</p>
          <h2 className="mt-3 font-serif text-5xl leading-[0.95]">{m.about.title}</h2>
          <p className="mt-4 text-muted">{m.about.lead}</p>
          <h3 className="mt-8 font-serif text-3xl">Erika Cruz Joya</h3>
          <p className="text-sm text-navy">{m.about.erikaRole}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{m.about.erika}</p>
          <div className="mt-8 border-t border-line pt-6">
            <p className="font-serif text-5xl text-navy">AB</p>
            <h3 className="mt-2 font-serif text-2xl">{m.about.anaName}</h3>
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
      </section>
      <div className="bg-ivory px-6 pb-10 text-sm leading-relaxed text-muted lg:px-12">
        {m.about.story.map((paragraph) => (
          <p key={paragraph} className="mx-auto mt-3 max-w-3xl">{paragraph}</p>
        ))}
      </div>

      <section id="faq" className="bg-navy px-5 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs tracking-[0.22em] text-gold-line uppercase">{m.faq.kicker}</p>
          <h2 className="mt-3 font-serif text-5xl">{m.faq.title}</h2>
          <p className="mt-4 text-white/70">{m.faq.deck}</p>
          <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
            {m.faq.items.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none py-2 font-serif text-2xl [&::-webkit-details-marker]:hidden">{item.q}</summary>
                <p className="pb-3 text-sm leading-relaxed text-white/75">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <article>
            <h2 className="font-serif text-4xl">{m.snow.title}</h2>
            {m.snow.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">{paragraph}</p>
            ))}
          </article>
          <article>
            <h2 className="font-serif text-4xl">{m.metc.title}</h2>
            {m.metc.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">{paragraph}</p>
            ))}
            <p className="mt-4 text-sm text-warn">{m.metc.disclaimer}</p>
            <p className="mt-3"><a className="underline" href={CRA_MEDICAL_EXPENSES} rel="noopener noreferrer">{m.metc.link}</a></p>
          </article>
          <article className="lg:col-span-2">
            <h2 className="font-serif text-4xl">{m.trust.title}</h2>
            <p className="mt-3 max-w-3xl text-muted">{m.trust.deck}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {m.trust.items.map((item) => (
                <div key={item.title} className="border-t border-navy pt-4">
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm">{m.trust.standards}</p>
          </article>
          <article className="lg:col-span-2">
            <h2 className="font-serif text-4xl">{m.facts.title}</h2>
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
          <article>
            <h2 className="font-serif text-3xl">{m.audio.heading}</h2>
            <p className="mt-2 text-sm text-muted">{m.audio.body}</p>
            <audio className="mt-4 w-full" controls preload="none" aria-label={m.audio.heading} src={`/assets/audio/intro-${lang}.mp3`} />
            <details className="mt-3">
              <summary className="cursor-pointer text-sm">{m.audio.transcript}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.audio.text}</p>
            </details>
          </article>
          <article id="contacto">
            <h2 className="font-serif text-3xl">{m.contact.title}</h2>
            <p className="mt-3 text-sm text-muted">{m.contact.deck}</p>
            <p className="mt-4 text-sm"><a className="underline" href="mailto:info@medeliteofficial.com">info@medeliteofficial.com</a></p>
            <p className="text-sm"><a className="underline" href="tel:+16044428475">+1 (604) 442-8475</a></p>
            <p className="mt-2 text-sm text-muted">{m.contact.hoursValue}</p>
            <p className="text-sm text-muted">{m.contact.city}</p>
            <p className="mt-3"><Link className="text-sm underline" to="/privacy">{m.nav.privacy}</Link></p>
          </article>
          <article className="lg:col-span-2">
            <h2 className="font-serif text-3xl">{m.sourcesTitle}</h2>
            <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
              {SOURCES.map((source) => (
                <li key={source.href}><a className="underline" href={source.href} rel="noopener noreferrer">{source.label}</a></li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="cotizar" className="relative overflow-hidden bg-navy py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <FacilityPhoto name="cancun" fill alt="" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5">
          <p className="text-center font-serif text-5xl text-white md:text-7xl">{m.hero.ctaQuote}</p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/75">{m.hero.lede}</p>
          <div className="mt-10">
            <QuoteWizard />
          </div>
        </div>
      </section>
    </main>
  );
}
