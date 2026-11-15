import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Seo } from "../components/Seo";
import { PEOPLE } from "../data/people";
import { HOSPITALS, type HospitalId } from "../data/hospitals";
import { FARE_DISCLAIMER, ORIGIN_CODES, formatSampleAmount, type OriginCode } from "../data/flights";
import { PACKAGE_IDS, type PackageId } from "../data/packages";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n/types";
import {
  LINE_IDS,
  buildItinerary,
  journeyQuote,
  journeySearch,
  matchLine,
  readJourneySearch,
  readiness,
  type BmiBand,
  type LineId,
} from "../lib/journey";

const COPY = {
  es: {
    kicker: "Mi Ruta MedElite",
    title: "Su viaje, día por día",
    deck: "Un plan generado con reglas, no con una promesa clínica. El cirujano en México decide si el viaje se hace.",
    origin: "Ciudad de salida",
    line: "Línea",
    pkg: "Paquete",
    month: "Mes",
    hospital: "Sede",
    steps: {
      depart: "Vuelo de salida desde Canadá. La tarifa de muestra, si existe, no es un boleto.",
      transfer: "Traslado aeropuerto–hotel. Entra en Essential y Executive.",
      preop: "Estudios y valoración preoperatoria en el hospital.",
      surgery: "Cirugía. El acto médico ocurre en México.",
      hospital: "Noches de hospital del ejemplo (dos, en el reemplazo de rodilla).",
      hotel: "Hotel de recuperación del ejemplo: 7 noches en Essential, 8 en Executive.",
      "fit-to-fly": "Valoración de aptitud para volar antes del regreso.",
      return: "Vuelo de regreso. Usted confirma el boleto con la aerolínea.",
      aftercare: "Seguimiento por video ya en Canadá, con un resumen para su médico de familia.",
    },
    match: "Match",
    why: {
      ortho: "Marina y Riviera nombran traumatología y ortopedia. No hay un cirujano de ortopedia con nombre publicado en las fuentes leídas. Marina es el hospital de 2000 con terapia intensiva.",
      bariatric: "drjoyaofficial.com dice que las cirugías se hacen en Hospital Joya Riviera Nayarit. Los nombres son los de esa página.",
      cardio: "Marina, Guadalajara y Cancún describen hemodinamia. No hay un cardiólogo con nombre en esas fichas. Se propone Marina.",
      checkup: "Riviera, Marina, Guadalajara y Querétaro publican chequeos. No hay un médico de chequeo con nombre.",
      "published-no-name": "Joya publica la especialidad, pero no el hospital ni un médico con nombre. No asignamos uno.",
      "coming-soon": "Dental y fertilidad no están en la página de especialidades ni en el directorio. Quedan como red de socios, próximamente.",
    },
    according: "Según",
    cost: "Estimación del paquete en CAD",
    flight: "Muestra de vuelo",
    total: "Suma ilustrada solo si el «$» del vuelo fuera CAD",
    share: "Enlace para compartir",
    print: "Imprimir o guardar PDF",
    ready: "Lista de preparación",
    score: "Listo en el expediente",
    of: "de",
    items: {
      adult: "Mayor de 18 años",
      passport: "Pasaporte vigente a la mano",
      month: "Mes de viaje elegido",
      bmi: "IMC frente a lo que drjoyaofficial.com escribe para bariátrica (40+, o 35+ con otra condición, balón desde 27). Esto no autoriza la cirugía.",
      surgeon: "El cirujano decide. Esta lista no es una autorización.",
    },
    bmi: "Rango de IMC",
    passport: "Tengo el pasaporte a la mano",
    adult: "Tengo 18 años o más",
  },
  en: {
    kicker: "My MedElite route",
    title: "Your trip, day by day",
    deck: "A plan built from rules, not a clinical promise. The surgeon in Mexico decides whether the trip happens.",
    origin: "Departure city",
    line: "Line",
    pkg: "Package",
    month: "Month",
    hospital: "Hospital",
    steps: {
      depart: "Outbound flight from Canada. A sample fare, if one exists, is not a ticket.",
      transfer: "Airport–hotel transfer. Included in Essential and Executive.",
      preop: "Pre-operative tests and review at the hospital.",
      surgery: "Surgery. The medical act takes place in Mexico.",
      hospital: "Hospital nights in the knee example (two).",
      hotel: "Recovery hotel in the example: 7 nights on Essential, 8 on Executive.",
      "fit-to-fly": "Fit-to-fly assessment before the flight home.",
      return: "Return flight. You confirm the ticket with the airline.",
      aftercare: "Video follow-up back in Canada, with a summary for your family doctor.",
    },
    match: "Match",
    why: {
      ortho: "Marina and Riviera name trauma and orthopedics. No orthopedic surgeon is named in the sources we read. Marina is the hospital opened in 2000 with intensive care.",
      bariatric: "drjoyaofficial.com says the operations are at Hospital Joya Riviera Nayarit. The names are the ones on that site.",
      cardio: "Marina, Guadalajara and Cancún describe a haemodynamics room. No cardiologist is named on those pages. Marina is suggested.",
      checkup: "Riviera, Marina, Guadalajara and Querétaro publish check-ups. No check-up physician is named.",
      "published-no-name": "Joya publishes the specialty, but not the hospital or a named physician. We do not assign one.",
      "coming-soon": "Dental and fertility are not on the specialties page or the directory. They stay as network partners, coming soon.",
    },
    according: "According to",
    cost: "Package estimate in CAD",
    flight: "Flight sample",
    total: "Illustrated sum only if the flight “$” were CAD",
    share: "Link to share",
    print: "Print or save PDF",
    ready: "Readiness checklist",
    score: "Ready in the file",
    of: "of",
    items: {
      adult: "Age 18 or older",
      passport: "Valid passport in hand",
      month: "Travel month chosen",
      bmi: "BMI against what drjoyaofficial.com writes for bariatric care (40+, or 35+ with another condition, balloon from 27). This does not clear you for surgery.",
      surgeon: "The surgeon decides. This list is not an authorization.",
    },
    bmi: "BMI band",
    passport: "I have my passport in hand",
    adult: "I am 18 or older",
  },
  fr: {
    kicker: "Ma route MedElite",
    title: "Votre voyage, jour par jour",
    deck: "Un plan bâti par des règles, pas une promesse clinique. Le chirurgien au Mexique décide si le voyage a lieu.",
    origin: "Ville de départ",
    line: "Ligne",
    pkg: "Forfait",
    month: "Mois",
    hospital: "Hôpital",
    steps: {
      depart: "Vol aller depuis le Canada. Un tarif d’échantillon, s’il existe, n’est pas un billet.",
      transfer: "Transfert aéroport–hôtel. Inclus dans Essential et Executive.",
      preop: "Examens et évaluation préopératoires à l’hôpital.",
      surgery: "Chirurgie. L’acte médical a lieu au Mexique.",
      hospital: "Nuits d’hôpital de l’exemple du genou (deux).",
      hotel: "Hôtel de récupération de l’exemple : 7 nuits en Essential, 8 en Executive.",
      "fit-to-fly": "Évaluation d’aptitude au vol avant le retour.",
      return: "Vol de retour. Vous confirmez le billet avec la compagnie.",
      aftercare: "Suivi par vidéo de retour au Canada, avec un résumé pour votre médecin de famille.",
    },
    match: "Correspondance",
    why: {
      ortho: "Marina et Riviera nomment la traumatologie et l’orthopédie. Aucun chirurgien orthopédiste n’est nommé dans les sources lues. Marina est l’hôpital ouvert en 2000 avec des soins intensifs.",
      bariatric: "drjoyaofficial.com dit que les chirurgies se font à l’Hospital Joya Riviera Nayarit. Les noms sont ceux de ce site.",
      cardio: "Marina, Guadalajara et Cancún décrivent une salle d’hémodynamie. Aucun cardiologue n’est nommé. Marina est proposée.",
      checkup: "Riviera, Marina, Guadalajara et Querétaro publient des bilans. Aucun médecin de bilan n’est nommé.",
      "published-no-name": "Joya publie la spécialité, mais ni l’hôpital ni un médecin nommé. Nous n’en assignons pas.",
      "coming-soon": "Le dentaire et la fertilité ne sont ni sur la page des spécialités ni dans le répertoire. Ils restent « partenaires du réseau, à venir ».",
    },
    according: "Selon",
    cost: "Estimation du forfait en CAD",
    flight: "Échantillon de vol",
    total: "Somme illustrée seulement si le « $ » du vol était en CAD",
    share: "Lien à partager",
    print: "Imprimer ou enregistrer en PDF",
    ready: "Liste de préparation",
    score: "Prêt dans le dossier",
    of: "sur",
    items: {
      adult: "18 ans ou plus",
      passport: "Passeport valide en main",
      month: "Mois de voyage choisi",
      bmi: "IMC face à ce que drjoyaofficial.com écrit pour la bariatrique (40+, ou 35+ avec une autre condition, ballon dès 27). Cela n’autorise pas la chirurgie.",
      surgeon: "Le chirurgien décide. Cette liste n’est pas une autorisation.",
    },
    bmi: "Tranche d’IMC",
    passport: "J’ai mon passeport en main",
    adult: "J’ai 18 ans ou plus",
  },
} as const satisfies Record<Lang, {
  kicker: string;
  title: string;
  deck: string;
  steps: Record<string, string>;
  why: Record<string, string>;
  items: Record<string, string>;
  [key: string]: string | Record<string, string>;
}>;

const LINES: Record<LineId, Record<Lang, string>> = {
  knee: { es: "Rodilla", en: "Knee", fr: "Genou" },
  hip: { es: "Cadera", en: "Hip", fr: "Hanche" },
  bariatric: { es: "Bariátrica", en: "Bariatric", fr: "Bariatrique" },
  plastic: { es: "Plástica", en: "Plastic surgery", fr: "Chirurgie plastique" },
  dental: { es: "Dental", en: "Dental", fr: "Dentaire" },
  ophthalmology: { es: "Oftalmología", en: "Ophthalmology", fr: "Ophtalmologie" },
  cardiology: { es: "Cardiología", en: "Cardiology", fr: "Cardiologie" },
  fertility: { es: "Fertilidad", en: "Fertility", fr: "Fertilité" },
  checkup: { es: "Chequeo ejecutivo", en: "Executive check-up", fr: "Bilan exécutif" },
};

export function RoutePage() {
  const { lang } = useI18n();
  const t = COPY[lang];
  const [params, setParams] = useSearchParams();
  const initial = readJourneySearch(params);
  const [origin, setOrigin] = useState<OriginCode>(initial?.origin ?? "YVR");
  const [line, setLine] = useState<LineId>(initial?.line ?? "knee");
  const [packageId, setPackageId] = useState<PackageId>(initial?.packageId ?? "essential");
  const [month, setMonth] = useState(initial?.month ?? "2027-03");
  const [hospitalId, setHospitalId] = useState<HospitalId>(initial?.hospitalId ?? "marina");
  const [bmi, setBmi] = useState<BmiBand | "">("");
  const [passport, setPassport] = useState(false);
  const [adult, setAdult] = useState(false);

  const input = useMemo(
    () => ({ origin, line, packageId, month, hospitalId }),
    [hospitalId, line, month, origin, packageId],
  );
  const steps = buildItinerary(input);
  const match = matchLine(line, origin);
  const quote = journeyQuote(input);
  const file = readiness({ line, bmi, passport, adult, month: month.length > 0 });
  const sharePath = journeySearch(input);

  function publish(next: Partial<typeof input>) {
    const merged = { ...input, ...next };
    setParams(new URLSearchParams(journeySearch(merged).slice(6)));
  }

  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-20 md:py-24 print:max-w-none">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/ruta" />
      <p className="text-xs font-bold tracking-[0.15em] text-navy uppercase">{t.kicker}</p>
      <h1 className="mt-3 font-serif text-5xl leading-[1.1] tracking-tight text-ink">{t.title}</h1>
      <p className="mt-4 text-muted">{t.deck}</p>
      <form className="mt-6 grid gap-3 sm:grid-cols-2 print:hidden" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-1 text-sm">
          {t.origin}
          <select className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={origin} onChange={(event) => { const value = event.target.value as OriginCode; setOrigin(value); publish({ origin: value }); }}>
            {ORIGIN_CODES.map((code) => <option key={code}>{code}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          {t.line}
          <select className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={line} onChange={(event) => { const value = event.target.value as LineId; setLine(value); publish({ line: value }); }}>
            {LINE_IDS.map((id) => <option key={id} value={id}>{LINES[id][lang]}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          {t.pkg}
          <select className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={packageId} onChange={(event) => { const value = event.target.value as PackageId; setPackageId(value); publish({ packageId: value }); }}>
            {PACKAGE_IDS.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          {t.month}
          <input className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" type="month" value={month} onChange={(event) => { setMonth(event.target.value); publish({ month: event.target.value }); }} />
        </label>
        <label className="grid gap-1 text-sm sm:col-span-2">
          {t.hospital}
          <select className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={hospitalId} onChange={(event) => { const value = event.target.value as HospitalId; setHospitalId(value); publish({ hospitalId: value }); }}>
            {HOSPITALS.map((hospital) => <option key={hospital.id} value={hospital.id}>{hospital.name}</option>)}
          </select>
        </label>
      </form>

      <ol id="itinerario" className="mt-8 border-l border-navy">
        {steps.map((step, index) => (
          <li key={step.id} className="ml-4 border-b border-line py-4">
            <p className="text-xs font-semibold text-navy">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-1">{t.steps[step.id]}</p>
          </li>
        ))}
      </ol>

      <section id="match" className="mt-10 rounded-[2rem] border border-line bg-white shadow-glass p-5">
        <h2 className="font-serif text-3xl">{t.match}</h2>
        <p className="mt-3 leading-relaxed">{t.why[match.why]}</p>
        {match.hospitalId ? <p className="mt-3 font-medium">{HOSPITALS.find((hospital) => hospital.id === match.hospitalId)?.name}</p> : null}
        <ul className="mt-3 grid gap-2 text-sm">
          {match.people.map((id) => {
            const person = PEOPLE.find((item) => item.id === id);
            if (!person) return null;
            return (
              <li key={id}>
                {person.name} — {person.role} ({t.according} {person.source})
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6 rounded-3xl bg-paper p-5">
        <p className="text-xs font-semibold uppercase">{FARE_DISCLAIMER}</p>
        {quote.band ? <p className="mt-2">{t.cost}: CAD {quote.band.low.toLocaleString("en-CA")} – {quote.band.high.toLocaleString("en-CA")}</p> : null}
        {quote.flight.span ? <p className="mt-2">{t.flight}: {formatSampleAmount(quote.flight.span.low)} – {formatSampleAmount(quote.flight.span.high)}</p> : null}
        {quote.total.shown && quote.total.low !== null && quote.total.high !== null ? (
          <p className="mt-2">{t.total}: {formatSampleAmount(quote.total.low)} – {formatSampleAmount(quote.total.high)}</p>
        ) : null}
      </section>

      <section id="preparacion" className="mt-8">
        <h2 className="font-serif text-3xl">{t.ready}</h2>
        <p className="mt-2 text-sm">{t.score}: {file.readyCount} {t.of} {file.total}</p>
        <label className="mt-3 flex min-h-11 items-center gap-3 text-sm">
          <input type="checkbox" checked={adult} onChange={(event) => setAdult(event.target.checked)} />
          {t.adult}
        </label>
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input type="checkbox" checked={passport} onChange={(event) => setPassport(event.target.checked)} />
          {t.passport}
        </label>
        {line === "bariatric" ? (
          <label className="mt-2 grid gap-1 text-sm">
            {t.bmi}
            <select className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={bmi} onChange={(event) => setBmi(event.target.value as BmiBand | "")}>
              <option value="">—</option>
              <option value="under-30">{"< 30"}</option>
              <option value="30-34">30–34</option>
              <option value="35-39">35–39</option>
              <option value="40-plus">40+</option>
            </select>
          </label>
        ) : null}
        <ul className="mt-3 grid gap-2 text-sm">
          {file.items.map((item) => (
            <li key={item.id}>{t.items[item.id]}</li>
          ))}
        </ul>
      </section>

      <div className="mt-8 grid gap-3 print:hidden">
        <label className="grid gap-1 text-sm">
          {t.share}
          <input className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" readOnly value={sharePath} />
        </label>
        <button type="button" className="inline-flex min-h-12 w-fit items-center rounded-full bg-navy px-5 text-sm font-semibold text-white shadow-premium hover:bg-navy-2" onClick={() => window.print()}>
          {t.print}
        </button>
      </div>
    </main>
  );
}
