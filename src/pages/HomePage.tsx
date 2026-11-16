import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { MapaRed } from "../components/MapaRed";
import { Testimonios } from "../components/Testimonios";
import { QuoteWizard } from "../components/QuoteWizard";
import { ProcesoPaciente } from "../components/ProcesoPaciente";
import { VideoEmbed } from "../components/VideoEmbed";
import { SalesContact } from "../components/SalesContact";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { PEOPLE } from "../data/people";
import { PACKAGE_BANDS, PACKAGE_IDS, formatCad, formatRange } from "../data/packages";
import { CRA_MEDICAL_EXPENSES, HM_RELEASE, SOURCES } from "../data/sources";
import { POSITIONING } from "../content/positioning";
import { PHOTO_OF } from "../i18n/labels";
import { HOME_COPY } from "../content/home";
import { useI18n } from "../i18n";

const GALLERY_STRIP = ["riviera-er", "operating-room", "queretaro-tower", "cancun-room", "chapala-mri", "guadalajara", "riviera-or", "playa", "sma-or", "cancun-lobby", "penita", "riviera-ct", "sma", "queretaro-room", "chapala", "playa-nursery", "cancun"] as const;

export function HomePage() {
  const { hash } = useLocation();
  const { m, lang } = useI18n();
  const copy = POSITIONING[lang];
  const home = HOME_COPY[lang];
  const galleryRef = useRef<HTMLUListElement>(null);
  const scrollGallery = (dir: number) => {
    const el = galleryRef.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };
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

      <section id="inicio" className="relative bg-white">
        <div className="grid lg:min-h-[min(88vh,54rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]">
          <div className="relative order-first aspect-[4/3] overflow-hidden bg-soft sm:aspect-[16/9] lg:order-last lg:aspect-auto" data-gallery="hero">
            <FacilityPhoto
              name="marina"
              fill
              priority
              fetchPriority="high"
              alt={PHOTO_OF.marina?.[lang] ?? "Hospital Joya Marina Vallarta"}
              sizes="(min-width: 1024px) 53vw, 100vw"
              className="object-[45%_center]"
            />
            <p className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/92 px-4 py-2 text-xs font-medium text-navy shadow-premium backdrop-blur lg:bottom-8 lg:left-8">
              Hospital Joya Marina Vallarta · Puerto Vallarta
            </p>
          </div>
          <div className="flex items-center px-5 pt-10 pb-14 md:px-8 lg:py-20 lg:pr-14" style={{ paddingLeft: "max(1.25rem, calc((100vw - 1136px) / 2))" }}>
            <div className="max-w-[36rem]">
              <p className="eyebrow">{m.hero.kicker}</p>
              <h1 className="mt-6 font-serif text-[2.7rem] leading-[1.02] text-navy sm:text-6xl xl:text-[5rem]">{copy.headline}</h1>
              <p className="mt-7 max-w-[32rem] text-[17px] leading-relaxed text-muted md:text-lg">
                <span className="font-semibold text-navy">{m.hero.title}.</span> {m.notice}
              </p>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <a href="#cotizar" className="btn btn-primary min-h-14 px-8 text-base">
                  {m.hero.ctaQuote} <span className="arrow" aria-hidden="true">→</span>
                </a>
                <a href="#orientacion" className="link-line pb-1 text-[15px] font-medium text-navy">
                  {home.coordinator}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={home.factsLabel} className="border-b border-line bg-white">
        <dl className="mx-auto grid max-w-[1200px] grid-cols-2 px-5 md:grid-cols-4 md:px-8">
          {home.facts.map((fact, index) => (
            <div key={fact.label} className={`py-7 md:py-9 ${index % 2 ? "pl-5" : "pr-5"} md:px-6 ${index > 0 ? "md:border-l md:border-line" : "md:pl-0"} ${index > 1 ? "border-t border-line md:border-t-0" : ""}`}>
              <dt className="sr-only">{fact.label}</dt>
              <dd className="font-serif text-3xl text-navy md:text-4xl">{fact.value}</dd>
              <dd className="mt-1 text-sm leading-snug text-muted">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="para-quien" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="reveal grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="eyebrow">{home.audienceKicker}</p>
              <h2 id="para-quien" className="mt-4 font-serif text-4xl leading-[1.08] text-navy md:text-[3.25rem]">{home.audienceTitle}</h2>
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-muted md:justify-self-end">{home.audienceDeck}</p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.audience.map((card, index) => (
              <li key={card.to} className="reveal" style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}>
                <Link to={card.to} className="lift group flex h-full flex-col rounded-3xl border border-line bg-white p-7 hover:border-teal/50">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-soft text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={card.icon} /></svg>
                  </span>
                  <span className="mt-8 block font-serif text-2xl leading-tight text-navy">{card.title}</span>
                  <span className="mt-3 block flex-1 text-[15px] leading-relaxed text-muted">{card.body}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal">
                    {card.cta} <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="vallarta-title" className="bg-ivory py-20 md:py-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-7" data-gallery="marina">
            <figure className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl bg-soft shadow-premium">
              <FacilityPhoto name="marina-street" fill alt={PHOTO_OF["marina-street"]?.[lang] ?? "Hospital Joya Marina Vallarta"} sizes="(min-width: 1024px) 700px, 100vw" />
            </figure>
            <figure className="reveal absolute -right-2 -bottom-10 hidden w-[42%] overflow-hidden rounded-2xl border-[6px] border-ivory bg-soft shadow-premium sm:block lg:-right-10" style={{ ["--reveal-delay" as string]: "160ms" }}>
              <div className="relative aspect-[3/2]">
                <FacilityPhoto name="marina-diagnostics" fill alt={PHOTO_OF["marina-diagnostics"]?.[lang] ?? ""} sizes="300px" />
              </div>
            </figure>
          </div>
          <div className="reveal lg:col-span-5 lg:pl-10">
            <p className="eyebrow">{vallarta.kicker}</p>
            <h2 id="vallarta-title" className="mt-4 font-serif text-4xl leading-[1.08] text-navy md:text-[3.1rem]">{vallarta.title}</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">{vallarta.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link to="/red/marina" className="btn btn-primary">{vallarta.hospital} <span className="arrow" aria-hidden="true">→</span></Link>
              <Link to="/red" className="link-line pb-0.5 text-[15px] font-medium text-navy">{vallarta.network}</Link>
            </div>
            <p className="mt-8 text-xs text-muted"><a className="underline" href="https://hospitaljoya.com/hospitales/hospital-joya-marina-vallarta/" rel="noopener noreferrer">{vallarta.source}</a></p>
          </div>
        </div>
      </section>

      <section id="rol" className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="reveal grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">{m.role.kicker}</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-navy md:text-[3.25rem]">{m.role.title}</h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[17px] leading-relaxed text-muted md:text-lg">{m.role.body}</p>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {m.role.points.map((point) => (
                  <li key={point} className="flex gap-4 py-4 text-[15px] leading-relaxed text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
            {m.hero.metrics.map((metric, index) => (
              <div key={metric.label} className="reveal bg-white p-5 sm:p-7 md:p-8" style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}>
                <dt className="sr-only">{metric.label}</dt>
                <dd className="font-serif text-[2rem] leading-none text-navy sm:text-[2.6rem]">{metric.value}</dd>
                <dd className="mt-3 text-[13px] leading-relaxed text-muted sm:mt-4 sm:text-sm">{metric.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="recorrido" className="bg-ivory py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="reveal mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="eyebrow">{m.journey.kicker}</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-navy md:text-[3.25rem]">{m.journey.title}</h2>
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-muted md:justify-self-end">{m.journey.deck}</p>
          </div>
          <ProcesoPaciente />
        </div>
      </section>

      <section aria-labelledby="video-title" className="bg-white py-20 md:py-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-14">
          <div className="reveal lg:col-span-4">
            <p className="eyebrow">{home.videoKicker}</p>
            <h2 id="video-title" className="mt-4 font-serif text-4xl leading-[1.08] text-navy md:text-[3.1rem]">{home.videoTitle}</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">{home.videoDeck}</p>
          </div>
          <div className="reveal lg:col-span-8">
            <VideoEmbed id="snmjJQDhDJI" title="Hospital Joya. Video institucional" poster="/assets/video/joya-institucional" />
          </div>
        </div>
      </section>

      <section id="red" className="bg-ivory py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="reveal mb-12 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="eyebrow">{m.network.kicker}</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-navy md:text-[3.25rem]">{m.network.title}</h2>
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-muted md:justify-self-end">{m.network.deck}</p>
          </div>
          <MapaRed title={m.network.title} />
        </div>
        <div className="mx-auto mt-10 max-w-[1200px] space-y-2 px-5 text-sm leading-relaxed text-muted md:px-8">
          <p>{m.network.source}</p>
          <p>{m.network.open}</p>
          <p>
            {m.network.future}{" "}
            <a className="underline" href={HM_RELEASE} rel="noopener noreferrer">{m.network.hm}</a>
          </p>
        </div>
      </section>

      <section aria-labelledby="galeria-title" className="overflow-hidden bg-white py-20 md:py-32">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-5 md:px-8">
          <div className="reveal max-w-xl">
            <p className="eyebrow">{home.galleryKicker}</p>
            <h2 id="galeria-title" className="mt-4 font-serif text-4xl leading-[1.08] text-navy md:text-[3.25rem]">{home.galleryTitle}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" aria-label={home.galleryPrev} className="grid h-12 w-12 place-items-center rounded-full border border-line text-navy transition-colors hover:border-navy" onClick={() => scrollGallery(-1)}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" aria-label={home.galleryNext} className="grid h-12 w-12 place-items-center rounded-full border border-line text-navy transition-colors hover:border-navy" onClick={() => scrollGallery(1)}>
              <span aria-hidden="true">→</span>
            </button>
            <Link to="/galeria" className="btn btn-ghost ml-2 hidden sm:inline-flex">{home.galleryAll}</Link>
          </div>
        </div>
        <ul ref={galleryRef} data-gallery="inicio" className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto scroll-smooth pb-2 md:gap-6" style={{ paddingInline: "max(1.25rem, calc((100vw - 1136px) / 2))" }} aria-label={home.galleryTitle}>
          {GALLERY_STRIP.map((id, index) => (
            <li key={id} className={`zoom-img relative shrink-0 snap-start overflow-hidden rounded-3xl bg-soft ${index % 3 === 0 ? "aspect-[4/5] w-[78vw] sm:w-[22rem]" : "aspect-[4/5] w-[70vw] sm:w-[19rem]"}`}>
              <FacilityPhoto name={id} fill alt={PHOTO_OF[id]?.[lang] ?? ""} sizes="(min-width: 640px) 22rem, 78vw" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 text-[13px] leading-snug text-white">{PHOTO_OF[id]?.[lang]}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 px-5 sm:hidden">
          <Link to="/galeria" className="btn btn-ghost w-full">{home.galleryAll}</Link>
        </div>
      </section>

      <section id="especialidades" className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <p className="eyebrow">{m.verticals.kicker}</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] text-navy md:text-[3.25rem]">{m.verticals.title}</h2>
          <p className="mt-4 max-w-2xl text-muted">{m.verticals.deck}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-[1200px] gap-6 px-5 md:grid-cols-3 md:px-8">
          {m.verticals.items.map((item, index) => {
            const photo = (["marina", "riviera", "operating-room", "cancun-ct"] as const)[index] ?? "operating-room";
            const wide = index === 0;
            return (
              <article key={item.title} className={`lift zoom-img reveal flex flex-col overflow-hidden rounded-3xl border border-line bg-white ${wide ? "md:col-span-3 md:grid md:grid-cols-2" : ""}`}>
                <div className={`relative aspect-[16/10] bg-soft ${wide ? "md:aspect-auto md:min-h-[22rem]" : ""}`}>
                  <FacilityPhoto name={photo} fill alt={PHOTO_OF[photo]?.[lang] ?? item.title} sizes={wide ? "(min-width: 768px) 600px, 100vw" : "(min-width: 768px) 600px, 100vw"} />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-xs font-semibold tracking-wide text-gold uppercase">{item.request ? m.verticals.request : m.verticals.focus}</p>
                  <h3 className="mt-3 font-serif text-[1.75rem] leading-tight text-navy">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.body}</p>
                  <p className="mt-auto pt-4 text-sm font-medium text-navy">{item.sites}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="paquetes" className="bg-ivory py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <p className="eyebrow">{m.packages.kicker}</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-navy md:text-[3.25rem]">{m.packages.title}</h2>
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

      <section id="nosotros" className="bg-white py-20 md:py-32">
        <div className="mx-auto grid max-w-[1200px] px-5 md:px-8 items-center gap-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-12">
        <figure className="mx-auto w-full max-w-[16rem] overflow-hidden rounded-2xl bg-white shadow-premium md:max-w-[20rem]">
          <img src="/assets/img/equipo/erika-cruz-joya.jpg" width={640} height={800} alt={m.about.erikaAlt} className="block h-auto w-full" />
        </figure>
        <div className="flex min-w-0 flex-col justify-center">
          <p className="eyebrow">{m.about.kicker}</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight">{m.about.title}</h2>
          <p className="mt-4 text-muted">{m.about.lead}</p>
          <h3 className="mt-8 font-serif text-2xl">Erika Cruz Joya</h3>
          <p className="text-sm text-navy">{m.about.erikaRole}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{m.about.erika}</p>
          <div className="mt-8 border-t border-line pt-6">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-soft font-serif text-2xl text-navy" aria-hidden="true">AB</span>
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

      <section id="faq" className="bg-ivory px-5 md:px-8 py-20 md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">{m.faq.kicker}</p>
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

      <SalesContact />

      <section id="cotizar" className="border-t border-line bg-soft/60 py-20 md:py-32">
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
