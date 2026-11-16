import { useEffect, useRef, useState } from "react";
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
import { PACKAGE_BANDS, PACKAGE_IDS, formatCad } from "../data/packages";
import { CRA_MEDICAL_EXPENSES, SOURCES } from "../data/sources";
import { POSITIONING } from "../content/positioning";
import { PHOTO_OF } from "../i18n/labels";
import { HOME_COPY } from "../content/home";
import { HOME_VISUAL, TILE_ICON } from "../content/homeVisual";
import { useI18n } from "../i18n";

const GALLERY_STRIP = ["riviera-er", "operating-room", "queretaro-tower", "cancun-room", "chapala-mri", "guadalajara", "riviera-or", "playa", "sma-or", "cancun-lobby", "penita", "riviera-ct", "sma", "queretaro-room", "chapala", "playa-nursery", "cancun"] as const;
const SPECIALTY_PHOTOS = ["marina", "riviera", "operating-room", "cancun-ct"] as const;

function Icon({ d, className = "h-6 w-6" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** Full-bleed, muted, looping institutional video. The poster paints at once; the lighter file goes to phones. */
function HeroVideo({ pauseLabel, playLabel }: { pauseLabel: string; playLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.src = window.innerWidth < 900 ? "/assets/video/joya-institucional-720.mp4" : "/assets/video/joya-institucional.mp4";
    el.muted = true;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) el.pause();
    else void el.play().catch(onPause);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);
  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }
  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/assets/video/joya-institucional-1280.webp"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        data-hero-video
      />
      <button type="button" onClick={toggle} aria-label={playing ? pauseLabel : playLabel} className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/35 text-white backdrop-blur hover:bg-black/55 md:top-auto md:right-8 md:bottom-8">
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M7 5h3v14H7zM14 5h3v14h-3z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
        )}
      </button>
    </>
  );
}

export function HomePage() {
  const { hash } = useLocation();
  const { m, lang } = useI18n();
  const copy = POSITIONING[lang];
  const home = HOME_COPY[lang];
  const v = HOME_VISUAL[lang];
  const galleryRef = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const syncGalleryEdge = () => {
    const el = galleryRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 8;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  };
  const scrollGallery = (dir: number) => {
    const el = galleryRef.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 900), behavior: "smooth" });
  };

  useEffect(() => {
    if (!/^#[a-z0-9-]+$/i.test(hash)) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView();
  }, [hash]);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const sync = () => syncGalleryEdge();
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  const pad = { paddingInline: "max(1.25rem, calc((100vw - 1136px) / 2))", scrollPaddingInline: "max(1.25rem, calc((100vw - 1136px) / 2))" };

  return (
    <main id="contenido">
      <Seo title={m.meta.title} description={m.meta.description} path="/" />

      <section id="inicio" className="relative isolate flex min-h-[calc(100svh-8rem)] items-start overflow-hidden md:items-center bg-navy text-white md:min-h-[min(92vh,58rem)]" data-gallery="hero">
        <HeroVideo pauseLabel={v.pause} playLabel={v.play} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,22,38,.88)_0%,rgba(0,22,38,.55)_55%,rgba(0,22,38,.05)_100%)] md:bg-[linear-gradient(90deg,rgba(0,22,38,.86)_0%,rgba(0,22,38,.5)_45%,rgba(0,22,38,0)_80%)]" aria-hidden="true" />
        <div className="relative z-10 w-full pt-12 pb-16 md:py-24" style={{ paddingInline: "max(1.25rem, calc((100vw - 1136px) / 2))" }}>
          <p className="hero-in text-[12px] font-semibold tracking-[0.22em] text-white/80 uppercase" style={{ animationDelay: "80ms" }}>Vancouver · México</p>
          <h1 className="hero-in mt-4 max-w-[15ch] font-serif text-[2.6rem] leading-[1.02] sm:text-6xl xl:text-[5.4rem]" style={{ animationDelay: "180ms" }}>{copy.headline}</h1>
          <p className="hero-in mt-5 max-w-[34rem] text-[17px] leading-snug text-white/85 md:text-lg" style={{ animationDelay: "300ms" }}>{m.hero.title}.</p>
          <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "420ms" }}>
            <a href="#cotizar" className="btn btn-primary min-h-14 px-8 text-base">
              {m.hero.ctaQuote} <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#video" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/40 px-6 text-[15px] font-semibold text-white backdrop-blur hover:bg-white hover:text-navy">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
              {v.watch}
            </a>
          </div>
          <Link to="/red/marina" className="hero-in mt-10 inline-block text-[13px] text-white/70 underline-offset-4 hover:underline" style={{ animationDelay: "540ms" }}>{v.site} · Puerto Vallarta</Link>
        </div>
        <span className="scroll-cue hidden md:block" aria-hidden="true" />
      </section>

      <section aria-labelledby="explorar" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 id="explorar" className="font-serif text-3xl text-navy md:text-4xl">{v.explore}</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {v.tiles.map((tile) => {
              const inner = (
                <>
                  <FacilityPhoto name={tile.photo} fill alt="" sizes="(min-width: 1024px) 12rem, 50vw" />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,22,38,.05),rgba(0,22,38,.78))] transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />
                  <span className="absolute top-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-white text-teal">
                    <Icon d={TILE_ICON[tile.icon] ?? ""} className="h-5 w-5" />
                  </span>
                  <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-[15px] leading-tight font-semibold text-white">
                    {tile.label}
                    <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </>
              );
              const cls = "zoom-img group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-soft";
              return <li key={tile.to}>{tile.to.startsWith("#") ? <a href={tile.to} className={cls}>{inner}</a> : <Link to={tile.to} className={cls}>{inner}</Link>}</li>;
            })}
          </ul>
        </div>
      </section>

      <section aria-label={home.factsLabel} className="bg-navy text-white">
        <dl className="mx-auto grid max-w-[1200px] grid-cols-2 px-5 md:grid-cols-4 md:px-8">
          {home.facts.map((fact, index) => (
            <div key={fact.label} className={`py-8 md:py-10 ${index % 2 ? "pl-5" : "pr-5"} md:px-6 ${index > 0 ? "md:border-l md:border-white/15" : "md:pl-0"} ${index > 1 ? "border-t border-white/15 md:border-t-0" : ""}`}>
              <dt className="sr-only">{fact.label}</dt>
              <dd className="font-serif text-3xl md:text-[2.6rem]">{fact.value}</dd>
              <dd className="mt-1 text-[13px] leading-snug text-white/70">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="video" aria-labelledby="video-title" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 id="video-title" className="font-serif text-3xl text-navy md:text-5xl">{v.videos}</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <VideoEmbed
              src="/assets/video/joya-institucional"
              title="Hospital Joya. Video institucional"
              poster="/assets/video/joya-institucional"
              caption={{
                es: "Video institucional de Hospital Joya Marina Vallarta.",
                en: "Institutional video from Hospital Joya Marina Vallarta. The video is in Spanish.",
                fr: "Vidéo institutionnelle de l’Hospital Joya Marina Vallarta. La vidéo est en espagnol.",
              }}
            />
            <VideoEmbed
              src="/assets/video/joya-hemodinamia"
              title="La importancia de la Sala de Hemodinamia"
              poster="/assets/video/joya-hemodinamia"
              caption={{
                es: "La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta.",
                en: "Why the cardiac catheterization lab matters. Hospital Joya Marina Vallarta. The video is in Spanish.",
                fr: "L’importance de la salle d’hémodynamique. Hospital Joya Marina Vallarta. La vidéo est en espagnol.",
              }}
            />
          </div>
        </div>
      </section>

      <section id="red" className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="mb-6 font-serif text-3xl text-navy md:text-5xl">{m.network.title}</h2>
          <MapaRed />
        </div>
      </section>

      <section aria-labelledby="galeria-title" className="overflow-hidden bg-navy py-16 text-white md:py-24">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-5 md:px-8">
          <h2 id="galeria-title" className="max-w-2xl font-serif text-3xl md:text-5xl">{home.galleryTitle}</h2>
          <div className="flex items-center gap-3">
            <button type="button" aria-label={home.galleryPrev} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 transition-opacity hover:bg-white hover:text-navy disabled:opacity-30" disabled={edge.start} onClick={() => scrollGallery(-1)}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" aria-label={home.galleryNext} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 transition-opacity hover:bg-white hover:text-navy disabled:opacity-30" disabled={edge.end} onClick={() => scrollGallery(1)}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <ul ref={galleryRef} onScroll={syncGalleryEdge} data-gallery="inicio" className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 md:gap-5" style={pad} aria-label={home.galleryTitle}>
          {GALLERY_STRIP.map((id, index) => (
            <li key={id} className={`zoom-img relative shrink-0 snap-start overflow-hidden rounded-2xl bg-navy-2 ${index % 3 === 0 ? "h-[28rem] w-[82vw] sm:h-[34rem] sm:w-[30rem]" : "h-[28rem] w-[70vw] sm:h-[34rem] sm:w-[22rem]"}`}>
              <FacilityPhoto name={id} fill alt={PHOTO_OF[id]?.[lang] ?? ""} sizes="(min-width: 640px) 30rem, 82vw" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(0,22,38,.75))] p-4 pt-14 text-[13px] leading-snug text-white">{PHOTO_OF[id]?.[lang]}</span>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-6 max-w-[1200px] px-5 md:px-8">
          <Link to="/galeria" className="link-line text-[15px] font-semibold text-white">{home.galleryAll} →</Link>
        </div>
      </section>

      <section id="especialidades" className="bg-white py-16 md:py-24">
        <div className="mx-auto flex max-w-[1200px] items-end justify-between gap-6 px-5 md:px-8">
          <h2 className="max-w-3xl font-serif text-3xl text-navy md:text-5xl">{m.verticals.title}</h2>
          <Link to="/especialidades" className="link-line hidden shrink-0 text-[15px] font-semibold text-navy sm:inline">{m.nav.specialties ?? "Especialidades"} →</Link>
        </div>
        <ul className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:gap-5" style={pad}>
          {m.verticals.items.map((item, index) => {
            const photo = SPECIALTY_PHOTOS[index] ?? "operating-room";
            return (
              <li key={item.title} className="zoom-img relative h-[24rem] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-soft sm:w-[24rem]">
                <FacilityPhoto name={photo} fill alt={PHOTO_OF[photo]?.[lang] ?? item.title} sizes="(min-width: 640px) 24rem, 78vw" />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,22,38,0)_40%,rgba(0,22,38,.85))]" aria-hidden="true" />
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-white/75 uppercase">{item.request ? m.verticals.request : m.verticals.focus}</p>
                  <h3 className="mt-2 font-serif text-[1.7rem] leading-tight">{item.title}</h3>
                  <p className="mt-2 text-[13px] text-white/80">{item.sites}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="recorrido" className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="mb-10 font-serif text-3xl text-navy md:text-5xl">{m.journey.title}</h2>
          <ProcesoPaciente />
        </div>
      </section>

      <section id="paquetes" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="font-serif text-3xl text-navy md:text-5xl">{m.packages.title}</h2>
          <p className="mt-3 max-w-3xl text-sm text-warn">{m.packages.example}</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {PACKAGE_IDS.map((id, index) => {
              const pk = m.packages.items[id];
              const band = PACKAGE_BANDS[id];
              const photo = (["patient-room", "riviera-or", "cancun-lobby"] as const)[index] ?? "patient-room";
              return (
                <article key={id} className="lift zoom-img flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative aspect-[16/9] bg-soft">
                    <FacilityPhoto name={photo} fill alt="" sizes="(min-width: 1024px) 24rem, 100vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-2xl text-navy">{pk.name}</h3>
                    <p className="mt-4 text-xs tracking-[0.16em] text-teal uppercase">{m.packages.from}</p>
                    <p className="font-serif text-3xl text-navy">{formatCad(band.low)}</p>
                    <ul className="mt-4 grid flex-1 gap-2 text-sm leading-snug text-ink/85">
                      {pk.points.slice(0, 3).map((point) => (
                        <li key={point} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />{point}</li>
                      ))}
                    </ul>
                    <a href="#cotizar" className="btn btn-primary mt-6 min-h-12 justify-center">{m.hero.ctaQuote}</a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="nosotros" className="bg-ivory py-16 md:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-12 md:px-8">
        <figure className="mx-auto w-full max-w-[16rem] overflow-hidden rounded-2xl bg-white shadow-premium md:max-w-[20rem]">
          <img src="/assets/img/equipo/erika-cruz-joya.jpg" width={640} height={800} alt={m.about.erikaAlt} className="block h-auto w-full" />
        </figure>
          <div className="min-w-0">
            <h2 className="font-serif text-3xl text-navy md:text-5xl">{m.about.title}</h2>
            <p className="mt-6 font-serif text-2xl text-navy">Erika Cruz Joya</p>
            <p className="text-sm text-muted">{m.about.erikaRole}</p>
            <p className="mt-4 font-serif text-xl text-navy">{m.about.anaName}</p>
            <p className="text-sm text-muted">{m.about.anaRole}</p>
            <ul className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1 text-sm">
              {PEOPLE.map((person) => (
                <li key={person.id} className="shrink-0 rounded-full border border-line bg-white px-3 py-2">
                  <Link to="/equipo">{person.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="/equipo" className="btn btn-ghost mt-6">{v.team} →</Link>
          </div>
        </div>
      </section>

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

      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <details className="group rounded-2xl border border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-navy [&::-webkit-details-marker]:hidden">
              {v.more}
              <span aria-hidden="true" className="text-xl text-teal transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="grid gap-10 px-5 pb-6 lg:grid-cols-2">
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
          <article className="lg:col-span-2">
            <h2 className="font-serif text-2xl">{m.sourcesTitle}</h2>
            <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
              {SOURCES.map((source) => (
                <li key={source.href}><a className="underline" href={source.href} rel="noopener noreferrer">{source.label}</a></li>
              ))}
            </ul>
          </article>
        </div>
          </details>
        </div>
      </section>

      <section className="bg-white pb-14">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <article id="contacto" className="grid gap-2 rounded-2xl bg-ivory p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <h2 className="font-serif text-3xl text-navy">{m.contact.title}</h2>
            <div className="text-[15px] md:text-right">
            <p className="mt-4 text-sm"><a className="underline" href="mailto:info@medeliteofficial.com">info@medeliteofficial.com</a></p>
            <p className="text-sm"><a className="underline" href="tel:+16044428475">+1 (604) 442-8475</a></p>
            <p className="mt-2 text-sm text-muted">{m.contact.hoursValue}</p>
            <p className="text-sm text-muted">{m.contact.city}</p>
            <p className="mt-3"><Link className="text-sm underline" to="/privacy">{m.nav.privacy}</Link></p>
            </div>
          </article>
        </div>
      </section>

      <SalesContact />

      <section id="cotizar" className="border-t border-line bg-soft/60 py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="text-center font-serif text-4xl leading-[1.08] text-navy md:text-[3.25rem]">{m.hero.ctaQuote}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">{m.hero.lede}</p>
          <div className="mx-auto mt-10 max-w-5xl">
            <QuoteWizard />
          </div>
        </div>
      </section>
    </main>
  );
}
