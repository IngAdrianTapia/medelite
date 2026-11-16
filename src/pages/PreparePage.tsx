import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { PageCta } from "../components/PageCta";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";

export function PreparePage() {
  const { lang } = useI18n();
  const t = {
    es: {
      title: "Antes de viajar",
      eyebrow: "Preparación",
      listTitle: "Lista para el viaje",
      knowTitle: "Lo que conviene saber",
      labels: ["Rango", "Pago", "Cancelación", "Acompañante", "Al regresar"],
      checklist: ["Pasaporte vigente", "Lista de medicamentos", "Estudios que ya tenga, sin enviarlos por este formulario", "Teléfono de su aseguradora", "Nombre de su médico de cabecera en Canadá"],
      pay: "Este sitio no cobra. El modelo previsto es un anticipo del 30 % y el resto por transferencia, solo si el acuerdo escrito lo dice. No guardamos números de tarjeta.",
      cancel: "No publicamos un calendario de cancelación. Lo que aplica es el contrato escrito, si usted sigue adelante.",
      companion: "Executive contempla acompañante, desayuno y una estancia más holgada. El documento escrito dice qué entra.",
      after: "Al regresar, el diseño del recorrido incluye un resumen para su médico de familia. El expediente clínico se queda en el hospital. MedElite no prescribe desde Vancouver.",
      range: "El rango de rodilla incluye, en Essential y Executive, el hotel y los traslados. No incluye el vuelo que usted compra. Snowbird no incluye hotel ni vuelo. Bariátrica, plástica y oftalmología no tienen banda publicada.",
      heroCap: "Acceso a Hospital Joya Marina Vallarta. La lista de la izquierda es lo que conviene llevar; no se envía por este sitio.",
      roomCap: "Habitación en una sede Joya. El expediente clínico se queda en el hospital.",
    },
    en: {
      title: "Before you travel",
      eyebrow: "Preparation",
      listTitle: "Travel checklist",
      knowTitle: "Good to know",
      labels: ["Range", "Payment", "Cancellation", "Companion", "After you return"],
      checklist: ["A valid passport", "A list of medicines", "Studies you already have — do not send them through this form", "Your insurer’s phone number", "Your family doctor’s name in Canada"],
      pay: "This site does not take payment. The intended model is a 30% deposit and the balance by transfer, only if the written agreement says so. We do not store card numbers.",
      cancel: "We do not publish a cancellation schedule. What applies is the written contract, if you proceed.",
      companion: "Executive allows for a companion, breakfast and a more comfortable stay. The written document says what is included.",
      after: "After you return, the path is designed to include a summary for your family doctor. The clinical record stays at the hospital. MedElite does not prescribe from Vancouver.",
      range: "The knee range includes, in Essential and Executive, the hotel and transfers. It does not include a flight you buy. Snowbird includes neither hotel nor flight. Bariatric, plastic surgery and ophthalmology have no published band.",
      heroCap: "Entrance to Hospital Joya Marina Vallarta. The list is what you should bring; it is not submitted through this site.",
      roomCap: "A room at a Joya hospital. The clinical record stays at the hospital.",
    },
    fr: {
      title: "Avant le voyage",
      eyebrow: "Préparation",
      listTitle: "Liste pour le voyage",
      knowTitle: "À savoir",
      labels: ["Fourchette", "Paiement", "Annulation", "Accompagnateur", "Au retour"],
      checklist: ["Passeport valide", "Liste des médicaments", "Examens que vous avez déjà — ne les envoyez pas par ce formulaire", "Téléphone de votre assureur", "Nom de votre médecin de famille au Canada"],
      pay: "Ce site n’encaisse rien. Le modèle prévu est un acompte de 30 % et le solde par virement, seulement si l’entente écrite le dit. Nous ne conservons pas de numéros de carte.",
      cancel: "Nous ne publions pas un calendrier d’annulation. Ce qui s’applique, c’est le contrat écrit, si vous continuez.",
      companion: "Executive prévoit un accompagnateur, le déjeuner et un séjour plus confortable. Le document écrit dit ce qui est inclus.",
      after: "Au retour, le parcours est conçu pour inclure un résumé pour votre médecin de famille. Le dossier clinique reste à l’hôpital. MedElite ne prescrit pas depuis Vancouver.",
      range: "La fourchette du genou inclut, pour Essential et Executive, l’hôtel et les transferts. Elle n’inclut pas le vol que vous achetez. Snowbird n’inclut ni hôtel ni vol. La chirurgie bariatrique, la chirurgie plastique et l’ophtalmologie n’ont pas de fourchette publiée.",
      heroCap: "Accès à l’Hospital Joya Marina Vallarta. La liste indique ce qu’il convient d’apporter ; elle n’est pas envoyée par ce site.",
      roomCap: "Chambre dans un établissement Joya. Le dossier clinique reste à l’hôpital.",
    },
  }[lang];
  return (
    <main id="contenido">
      <Seo title={`${t.title} — MedElite`} description={t.pay} path="/preparacion" />
      <header className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{t.title}</h1>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-soft" data-gallery="preparacion">
            <FacilityPhoto name="marina-street" fill alt={PHOTO_OF["marina-street"]?.[lang] ?? t.title} sizes="(min-width: 1024px) 34rem, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-5 pt-16 pb-4 text-sm text-white">{t.heroCap}</figcaption>
          </figure>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14">
          <section aria-labelledby="lista">
            <h2 id="lista" className="font-serif text-2xl text-navy md:text-3xl">{t.listTitle}</h2>
            <ol className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
              {t.checklist.map((item, i) => (
                <li key={item} className="flex items-start gap-4 px-5 py-4 text-[15px] text-ink">
                  <span aria-hidden="true" className="mt-0.5 font-serif text-lg leading-none text-teal">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
          <figure className="relative min-h-[18rem] overflow-hidden rounded-3xl bg-soft md:min-h-full" data-gallery="preparacion">
            <FacilityPhoto name="patient-room" fill alt={PHOTO_OF["patient-room"]?.[lang] ?? t.roomCap} sizes="(min-width: 1024px) 34rem, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-5 pt-16 pb-4 text-sm text-white">{t.roomCap}</figcaption>
          </figure>
        </div>
        <section aria-labelledby="saber" className="mt-16 md:mt-24">
          <h2 id="saber" className="font-serif text-2xl text-navy md:text-3xl">{t.knowTitle}</h2>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {[t.range, t.pay, t.cancel, t.companion, t.after].map((text, i) => (
              <div key={t.labels[i]} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">{t.labels[i]}</dt>
                <dd className="text-[15px] leading-relaxed text-muted">{text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[15px]">
            <a className="link-line text-navy" href="mailto:info@medeliteofficial.com">info@medeliteofficial.com</a>
          </p>
        </section>
        <div className="mt-16 pb-8">
          <PageCta />
        </div>
      </div>
    </main>
  );
}
