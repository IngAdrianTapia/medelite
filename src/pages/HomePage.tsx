import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { QuoteWizard } from "../components/QuoteWizard";
import { RecorridoPaciente } from "../components/RecorridoPaciente";
import { Deck, Kicker, Section, Title } from "../components/Section";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { HOSPITALS } from "../data/hospitals";
import { PACKAGE_BANDS, PACKAGE_IDS, formatCad, formatRange } from "../data/packages";
import { CRA_MEDICAL_EXPENSES, HM_RELEASE, SOURCES } from "../data/sources";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";

export function HomePage() {
  const { hash } = useLocation();
  const { m, lang } = useI18n();

  useEffect(() => {
    if (!/^#[a-z0-9-]+$/i.test(hash)) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView();
  }, [hash]);

  return (
    <main id="contenido">
      <Seo title={m.meta.title} description={m.meta.description} path="/" />
      <p className="bg-warn-soft px-5 py-3 text-center text-sm font-medium leading-relaxed text-warn">{m.notice}</p>

      <section id="inicio" className="scroll-mt-24 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <Kicker>{m.hero.kicker}</Kicker>
            <p className="mt-4 max-w-3xl font-serif text-5xl leading-[1.08] tracking-tight text-ink md:text-6xl">
              {lang === "en" ? "Get treated in weeks, not years." : lang === "fr" ? "Se faire soigner en semaines, pas en années." : "Atenderse en semanas, no en años."}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {lang === "en"
                ? "Fraser Institute, Waiting Your Turn 2025: 48.6 weeks median for orthopedics in Canada. A date here is written after the surgeon in Mexico reviews the case. It is not a guaranteed interval."
                : lang === "fr"
                  ? "Institut Fraser, Waiting Your Turn 2025 : 48,6 semaines médianes en orthopédie au Canada. Une date ici s’écrit après l’examen du chirurgien au Mexique. Ce n’est pas un délai garanti."
                  : "Fraser Institute, Waiting Your Turn 2025: 48.6 semanas de espera mediana en ortopedia en Canadá. Una fecha aquí se escribe después de que el cirujano en México revisa el caso. No es un plazo garantizado."}
            </p>
            <h1 className="mt-6 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-navy">{m.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{m.hero.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cotizar" className="inline-flex min-h-12 items-center rounded-full bg-navy px-6 text-sm font-semibold text-white shadow-premium hover:bg-navy-2">
                {m.hero.ctaQuote}
              </a>
              <a href="#recorrido" className="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-6 text-sm font-medium shadow-sm hover:bg-soft">
                {m.hero.ctaHow}
              </a>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {m.hero.metrics.map((metric) => (
                <div key={metric.label} className="rounded-[2rem] border border-line bg-white p-5 shadow-glass">
                  <dt className="font-serif text-3xl">{metric.value}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{metric.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-premium">
            <FacilityPhoto
              name="marina"
              priority
              alt={lang === "en" ? "Exterior of Hospital Joya Marina Vallarta." : lang === "fr" ? "Façade de l’Hospital Joya Marina Vallarta." : "Fachada del Hospital Joya Marina Vallarta."}
              className="h-auto w-full object-cover"
              sizes="(min-width: 768px) 32rem, 100vw"
            />
            <figcaption className="px-4 py-3 text-sm text-muted">{m.footer.photos}</figcaption>
          </figure>
        </div>
      </section>

      <Section id="rol" tone="white">
        <Kicker>{m.role.kicker}</Kicker>
        <Title>{m.role.title}</Title>
        <Deck>{m.role.body}</Deck>
        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {m.role.points.map((point) => (
            <li key={point} className="rounded-[2rem] border border-line bg-white p-6 text-sm leading-relaxed shadow-glass">
              {point}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="especialidades">
        <Kicker>{m.verticals.kicker}</Kicker>
        <Title>{m.verticals.title}</Title>
        <Deck>{m.verticals.deck}</Deck>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {m.verticals.items.map((item, index) => {
            const photo = (["marina", "guadalajara", "cancun", "operating-room"] as const)[index] ?? "operating-room";
            return (
            <article key={item.title} className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-glass">
              <FacilityPhoto name={photo} alt={PHOTO_OF[photo]?.[lang] ?? item.title} className="h-44 w-full object-cover" sizes="(min-width: 768px) 28rem, 100vw" />
              <div className="p-6">
              <p className="text-xs font-semibold tracking-wide text-navy uppercase">{item.request ? m.verticals.request : m.verticals.focus}</p>
              <h3 className="mt-2 font-serif text-3xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              <p className="mt-4 text-sm">{item.sites}</p>
              </div>
            </article>
            );
          })}
        </div>
      </Section>

      <Section id="paquetes" tone="white">
        <Kicker>{m.packages.kicker}</Kicker>
        <Title>{m.packages.title}</Title>
        <Deck>{m.packages.deck}</Deck>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-warn">{m.packages.example}</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PACKAGE_IDS.map((id) => {
            const copy = m.packages.items[id];
            const band = PACKAGE_BANDS[id];
            return (
              <article key={id} className="flex flex-col rounded-[2rem] border border-line bg-white p-6 shadow-glass">
                <h3 className="font-serif text-3xl">{copy.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{copy.who}</p>
                <p className="mt-5 text-xs font-semibold tracking-wide text-navy uppercase">{m.packages.from}</p>
                <p className="font-serif text-4xl">{formatCad(band.low)}</p>
                <p className="mt-1 text-sm text-muted">
                  {m.packages.range}: {formatRange(band.low, band.high)}
                </p>
                <ul className="mt-5 grid flex-1 gap-2 text-sm leading-relaxed">
                  {copy.points.map((point) => (
                    <li key={point} className="border-t border-line pt-2">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{m.packages.note}</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed">{m.packages.payment}</p>
      </Section>

      <Section id="cotizar">
        <QuoteWizard />
      </Section>

      <Section id="recorrido" tone="white">
        <Kicker>{m.journey.kicker}</Kicker>
        <Title>{m.journey.title}</Title>
        <Deck>{m.journey.deck}</Deck>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {m.journey.steps.map((step, index) => (
            <li key={step.title} className="rounded-[2rem] border border-line bg-white p-6 shadow-glass">
              <p className="text-xs font-semibold text-navy">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-serif text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <RecorridoPaciente />
        </div>
      </Section>

      <Section id="snowbirds">
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Kicker>{m.snow.kicker}</Kicker>
            <Title>{m.snow.title}</Title>
            {m.snow.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-2xl leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <figure className="rounded-[2rem] border border-line bg-white shadow-glass p-4">
            <img src="/assets/img/navegadora.svg" width={1200} height={1500} alt={m.snow.alt} className="mx-auto h-auto max-h-80 w-auto" />
            <figcaption className="mt-3 text-sm text-muted">{m.snow.cap}</figcaption>
          </figure>
        </div>
      </Section>

      <Section id="metc" tone="white">
        <Kicker>{m.metc.kicker}</Kicker>
        <Title>{m.metc.title}</Title>
        {m.metc.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 max-w-3xl leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
        <p className="mt-4 max-w-3xl rounded-2xl bg-warn-soft px-4 py-3 text-sm leading-relaxed text-warn">{m.metc.disclaimer}</p>
        <p className="mt-4">
          <a className="text-sm underline" href={CRA_MEDICAL_EXPENSES} rel="noopener noreferrer">
            {m.metc.link}
          </a>
        </p>
      </Section>

      <Section id="confianza">
        <Kicker>{m.trust.kicker}</Kicker>
        <Title>{m.trust.title}</Title>
        <Deck>{m.trust.deck}</Deck>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {m.trust.items.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-line bg-white shadow-glass p-6">
              <h3 className="font-serif text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed">{m.trust.standards}</p>
      </Section>

      <Section id="red" tone="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>{m.network.kicker}</Kicker>
            <Title>{m.network.title}</Title>
            <Deck>{m.network.deck}</Deck>
          </div>
          <img src="/assets/brand/hospital-joya-logo.png" width={461} height={207} alt={m.network.logoAlt} className="h-16 w-auto" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {HOSPITALS.map((hospital) => {
            const vertical = hospital.verticals[0] ?? "general";
            return (
              <article key={hospital.id} className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-glass">
                <FacilityPhoto name={hospital.id} alt={PHOTO_OF[hospital.id]?.[lang] ?? hospital.name} className="h-48 w-full object-cover" sizes="(min-width: 768px) 28rem, 100vw" />
                <div className="p-6">
                <p className="text-xs font-semibold tracking-wide text-navy uppercase">{m.network.focus[vertical]}</p>
                <h3 className="mt-2 font-serif text-2xl">{hospital.name}</h3>
                <p className="mt-1 text-sm text-muted">{hospital.city}</p>
                <p className="mt-3 text-sm leading-relaxed">{m.network.blurbs[hospital.id]}</p>
                <p className="mt-3 text-sm text-muted">{hospital.address}</p>
                {hospital.opened ? <p className="mt-2 text-sm">{m.network.opened.replace("{year}", hospital.opened)}</p> : null}
                <ul className="mt-3 text-sm">
                  {hospital.phones.map((phone) => (
                    <li key={phone.tel}>
                      <span className="text-muted">{m.network.phones}: </span>
                      <a className="underline" href={`tel:${phone.tel}`}>
                        {phone.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3">
                  <a className="text-sm underline" href={hospital.url} rel="noopener noreferrer">
                    {m.network.view}
                    <span className="sr-only"> — {hospital.name}</span>
                  </a>
                </p>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted">{m.network.source}</p>
        <p className="mt-3 text-sm leading-relaxed">{m.network.open}</p>
        <p className="mt-3 text-sm leading-relaxed">
          {m.network.future}{" "}
          <a className="underline" href={HM_RELEASE} rel="noopener noreferrer">
            {m.network.hm}
          </a>
        </p>
      </Section>

      <Section id="cifras">
        <Kicker>{m.facts.kicker}</Kicker>
        <Title>{m.facts.title}</Title>
        <Deck>{m.facts.deck}</Deck>
        <div tabIndex={0} aria-label={m.facts.caption} className="mt-8 overflow-x-auto rounded-[2rem] border border-line bg-white shadow-glass">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="sr-only">{m.facts.caption}</caption>
            <thead className="border-b border-line text-xs tracking-wide uppercase">
              <tr>
                {m.facts.columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-3 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.facts.rows.map((row) => (
                <tr key={row.ind} className="border-b border-line align-top last:border-0">
                  <th scope="row" className="px-4 py-3 font-medium">
                    {row.ind}
                  </th>
                  <td className="px-4 py-3 text-muted">{row.fig}</td>
                  <td className="px-4 py-3">{row.src}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="nosotros" tone="white">
        <Kicker>{m.about.kicker}</Kicker>
        <Title>{m.about.title}</Title>
        <Deck>{m.about.lead}</Deck>
        <h3 className="mt-10 font-serif text-3xl">{m.about.storyTitle}</h3>
        {m.about.story.map((paragraph) => (
          <p key={paragraph} className="mt-3 max-w-3xl leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
        <h3 className="mt-10 font-serif text-3xl">{m.about.teamTitle}</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-[2rem] border border-line bg-white p-5 shadow-glass">
            <img
              src="/assets/img/equipo/erika-cruz-joya.jpg"
              width={640}
              height={800}
              alt={m.about.erikaAlt}
              loading="lazy"
              decoding="async"
              className="h-56 w-full rounded-2xl object-cover object-top"
            />
            <h4 className="mt-4 text-lg font-semibold">Erika Cruz Joya</h4>
            <p className="text-sm text-navy">{m.about.erikaRole}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.about.erika}</p>
          </article>
          <article className="rounded-[2rem] border border-line bg-white p-5 shadow-glass">
            <div className="flex h-56 items-end rounded-2xl bg-soft p-5">
              <p className="font-serif text-5xl text-navy">AB</p>
            </div>
            <h4 className="mt-4 text-lg font-semibold">{m.about.anaName}</h4>
            <p className="text-sm text-navy">{m.about.anaRole}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.about.ana}</p>
          </article>
        </div>
      </Section>

      <Section id="faq">
        <Kicker>{m.faq.kicker}</Kicker>
        <Title>{m.faq.title}</Title>
        <Deck>{m.faq.deck}</Deck>
        <div className="mt-8 grid max-w-3xl gap-3">
          {m.faq.items.map((item) => (
            <details key={item.q} className="rounded-2xl border border-line bg-white shadow-sm px-5 py-3">
              <summary className="cursor-pointer py-2 font-medium">{item.q}</summary>
              <p className="pb-3 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="audio" tone="white">
        <Kicker>{m.audio.kicker}</Kicker>
        <Title>{m.audio.title}</Title>
        <Deck>{m.audio.deck}</Deck>
        <article className="mt-6 max-w-xl rounded-[2rem] border border-line bg-white p-5 shadow-glass">
          <h3 className="font-serif text-2xl">{m.audio.heading}</h3>
          <p className="mt-2 text-sm text-muted">{m.audio.body}</p>
          <audio className="mt-4 w-full" controls preload="none" aria-label={m.audio.heading} src={`/assets/audio/intro-${lang}.mp3`} />
          <details className="mt-3">
            <summary className="cursor-pointer text-sm">{m.audio.transcript}</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.audio.text}</p>
          </details>
        </article>
      </Section>

      <Section id="contacto">
        <Kicker>{m.contact.kicker}</Kicker>
        <Title>{m.contact.title}</Title>
        <Deck>{m.contact.deck}</Deck>
        <dl className="mt-8 grid max-w-xl gap-4 text-sm">
          <div>
            <dt className="text-muted">{m.contact.email}</dt>
            <dd>
              <a className="underline" href="mailto:info@medeliteofficial.com">
                info@medeliteofficial.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">{m.contact.phone}</dt>
            <dd>
              <a className="underline" href="tel:+16044428475">
                +1 (604) 442-8475
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">{m.contact.hours}</dt>
            <dd>{m.contact.hoursValue}</dd>
          </div>
          <div>
            <dt className="text-muted">{m.contact.city}</dt>
          </div>
        </dl>
        <p className="mt-6">
          <Link className="text-sm underline" to="/privacy">
            {m.nav.privacy}
          </Link>
        </p>
      </Section>

      <Section id="fuentes" tone="white">
        <h2 className="font-serif text-3xl">{m.sourcesTitle}</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          {SOURCES.map((source) => (
            <li key={source.href}>
              <a className="underline" href={source.href} rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
