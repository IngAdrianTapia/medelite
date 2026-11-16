import { Link, useParams } from "react-router";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { VideoEmbed } from "../components/VideoEmbed";
import { hospitalById, HOSPITAL_IDS, type HospitalId } from "../data/hospitals";
import { HOSPITAL_AIRPORT } from "../data/flights";
import { HOSPITAL_FACTS } from "../data/joya";
import { HOSPITAL_INTERIORS } from "../data/photoCredits";
import { PHOTO_OF, SERVICE_LABEL } from "../i18n/labels";
import { useI18n } from "../i18n";

function isHospital(value: string | undefined): value is HospitalId {
  return typeof value === "string" && (HOSPITAL_IDS as readonly string[]).includes(value);
}

export function HospitalPage() {
  const { hospitalId } = useParams();
  const { lang, m } = useI18n();
  if (!isHospital(hospitalId)) {
    return (
      <main id="contenido" className="page-shell">
        <h1 className="font-serif text-2xl">—</h1>
        <Link to="/red">Red</Link>
      </main>
    );
  }
  const hospital = hospitalById(hospitalId);
  const facts = HOSPITAL_FACTS[hospitalId];
  const copy = {
    es: {
      back: "Todas las sedes",
      services: "Servicios que publica el hospital",
      call: "Llamar al hospital",
      office: "O llamar a MedElite en Vancouver",
      airport: "Aeropuerto de referencia para planear el viaje; no indica el tiempo de traslado.",
      source: "Fuente",
      partner: "MedElite coordina consultas desde Canadá con la red Hospital Joya. La atención médica en esta sede de México depende de que el hospital y el equipo clínico acepten el caso.",
      verify: "Confirme por escrito la disponibilidad del procedimiento, el equipo clínico y el plan antes de viajar.",
      partnerSource: "Ver la lista de hospitales de MedElite",
      diagnostics: "Sala de resonancia publicada en la ficha de Hospital Joya Marina. Imagen: Hospital Joya.",
    },
    en: {
      back: "All hospitals",
      services: "Services listed by the hospital",
      call: "Call the hospital",
      office: "Or call MedElite in Vancouver",
      airport: "Reference airport for travel planning; this is not a transfer time.",
      source: "Source",
      partner: "MedElite coordinates inquiries from Canada with the Hospital Joya network. Care at this location in Mexico depends on the hospital and clinical team accepting your case.",
      verify: "Confirm the procedure’s availability, clinical team and care plan in writing before you travel.",
      partnerSource: "See MedElite’s hospital list",
      diagnostics: "MRI room pictured on Hospital Joya Marina’s page. Image: Hospital Joya.",
    },
    fr: {
      back: "Tous les établissements",
      services: "Services indiqués par l’hôpital",
      call: "Appeler l’hôpital",
      office: "Ou appeler MedElite à Vancouver",
      airport: "Aéroport de référence pour planifier le voyage; il ne s’agit pas d’un temps de trajet.",
      source: "Source",
      partner: "MedElite coordonne les demandes depuis le Canada avec le réseau Hospital Joya. La prise en charge dans cet établissement au Mexique dépend de l’acceptation du dossier par l’hôpital et l’équipe médicale.",
      verify: "Faites confirmer par écrit la disponibilité de l’intervention, l’équipe médicale et le plan de soins avant votre départ.",
      partnerSource: "Voir la liste des établissements de MedElite",
      diagnostics: "Salle d’IRM présentée sur la page de l’Hospital Joya Marina. Image : Hospital Joya.",
    },
  }[lang];

  const gallery = [hospital.id, ...(HOSPITAL_INTERIORS[hospital.id] ?? [])];
  /** Grid spans so the mosaic never leaves a hole: 2 columns on phones, 4 on wider screens, the façade 2×2. */
  const spanOf = (index: number): string => {
    if (index === 0) return "col-span-2 row-span-2";
    const small = gallery.length - 1;
    const i = index - 1;
    const phone = small % 2 === 1 && i === small - 1 ? "col-span-2" : "";
    let wide = "";
    if (small === 1) wide = "md:col-span-2 md:row-span-2";
    else if (small === 2) wide = "md:col-span-2";
    else if (small === 3 && i === 2) wide = "md:col-span-2";
    else if (small > 4) {
      const rest = small - 4;
      const lastRow = rest % 4;
      if (lastRow && i === small - 1) wide = `md:col-span-${5 - lastRow}`;
    }
    return `${phone} ${wide}`.trim();
  };
  const g = { es: { gallery: "Galería de la sede", photos: "fotos", contact: "Contacto y ubicación", maps: "Cómo llegar", video: "Video del hospital" }, en: { gallery: "Hospital gallery", photos: "photos", contact: "Contact and location", maps: "Directions", video: "Hospital video" }, fr: { gallery: "Galerie de l’établissement", photos: "photos", contact: "Coordonnées et emplacement", maps: "Itinéraire", video: "Vidéo de l’hôpital" } }[lang];

  return (
    <main id="contenido">
      <Seo title={`${hospital.name} — MedElite`} description={hospital.address} path={`/red/${hospital.id}`} />
      <header className="relative isolate overflow-hidden bg-navy text-white" data-nozoom>
        <div className="absolute inset-0 -z-10">
          <FacilityPhoto name={hospital.id} fill priority fetchPriority="high" alt={PHOTO_OF[hospital.id]?.[lang] ?? hospital.name} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001726]/90 via-[#001726]/40 to-[#001726]/10" aria-hidden="true" />
        </div>
        <div className="mx-auto flex min-h-[26rem] max-w-[1200px] flex-col justify-end px-5 pt-32 pb-12 md:min-h-[34rem] md:px-8 md:pb-16">
          <Link className="link-line w-max text-sm font-medium text-white/85" to="/red">← {copy.back}</Link>
          <h1 className="mt-5 max-w-3xl font-serif text-[2.6rem] leading-[1.03] text-white md:text-7xl">{hospital.name}</h1>
          <p className="mt-4 text-lg text-white/85">{hospital.city}</p>
        </div>
      </header>

      <section aria-labelledby="galeria-sede" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <h2 id="galeria-sede" className="font-serif text-3xl text-navy md:text-5xl">{g.gallery}</h2>
          <p className="text-sm text-muted tabular-nums">{gallery.length} {g.photos}</p>
        </div>
        <ul data-gallery="sede" className="mt-8 grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4">
          {/* md:col-span-2 md:col-span-3 md:col-span-4 */}
          {gallery.map((name, index) => (
            <li key={name} className={`zoom-img reveal relative overflow-hidden rounded-2xl bg-soft ${spanOf(index)}`} style={{ ["--reveal-delay" as string]: `${index * 60}ms` }}>
              <FacilityPhoto name={name} fill alt={PHOTO_OF[name]?.[lang] ?? hospital.name} sizes={index === 0 ? "(min-width: 768px) 600px, 100vw" : "(min-width: 768px) 300px, 50vw"} />
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">
          {copy.source}: <a className="underline" href={facts.url} rel="noopener noreferrer">hospitaljoya.com</a>
        </p>
      </section>

      {hospital.id === "marina" ? (
        <section aria-label={g.video} className="mx-auto max-w-[1200px] px-5 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto max-w-4xl">
            <VideoEmbed
              src="/assets/video/joya-hemodinamia"
              title="La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta"
              poster="/assets/video/joya-hemodinamia"
              caption={{
                es: "La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta.",
                en: "La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta. The video is in Spanish.",
                fr: "La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta. La vidéo est en espagnol.",
              }}
            />
          </div>
        </section>
      ) : null}

      <section className="border-t border-line bg-ivory">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl text-navy md:text-4xl">{copy.services}</h2>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {facts.services.map((id) => (
                <li key={id} className="flex items-center gap-3 border-b border-line py-3 text-[15px] text-ink">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                  {SERVICE_LABEL[id][lang]}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-line bg-white p-6 text-sm leading-relaxed">
              <p>{copy.partner}</p>
              <p className="mt-3 font-medium">{copy.verify}</p>
              <p className="mt-3"><a className="underline" href="https://www.medeliteofficial.com/destinations-partner-clinics" rel="noopener noreferrer">{copy.partnerSource}</a></p>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-white p-7 shadow-premium lg:sticky lg:top-28">
              <h2 className="eyebrow">{g.contact}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">{hospital.address}</p>
              <ul className="mt-4 grid gap-1 text-[15px]">
                {facts.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a className="link-line font-medium text-teal" href={`tel:${phone.tel}`}>{phone.label}</a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{HOSPITAL_AIRPORT[hospital.id]}. {copy.airport}</p>
              <div className="mt-6 grid gap-3">
                <Link className="btn btn-primary" to={{ pathname: "/", hash: "#cotizar" }}>
                  {m.hero.ctaQuote} <span className="arrow" aria-hidden="true">→</span>
                </Link>
                <a className="btn btn-ghost" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hospital.name}, ${hospital.address}`)}`} target="_blank" rel="noopener noreferrer">{g.maps} ↗</a>
              </div>
              <p className="mt-5 text-sm text-muted">
                {copy.call}: <a className="link-line text-navy" href={`tel:${facts.phones[0]?.tel ?? ""}`}>{facts.phones[0]?.label}</a>
                <br />
                {copy.office}: <a className="link-line text-navy" href="tel:+16044428475">+1 (604) 442-8475</a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
