import { Seo } from "../components/Seo";
import { useI18n } from "../i18n";

export function PreparePage() {
  const { lang } = useI18n();
  const t = {
    es: {
      title: "Antes de viajar",
      checklist: ["Pasaporte vigente", "Lista de medicamentos", "Estudios que ya tenga, sin enviarlos por este formulario", "Teléfono de su aseguradora", "Nombre de su médico de cabecera en Canadá"],
      pay: "Este sitio no cobra. El modelo previsto es un anticipo del 30 % y el resto por transferencia, solo si el acuerdo escrito lo dice. No guardamos números de tarjeta.",
      cancel: "No publicamos un calendario de cancelación. Lo que aplica es el contrato escrito, si usted sigue adelante.",
      companion: "Executive contempla acompañante, desayuno y una estancia más holgada. El documento escrito dice qué entra.",
      after: "Al regresar, el diseño del recorrido incluye un resumen para su médico de familia. El expediente clínico se queda en el hospital. MedElite no prescribe desde Vancouver.",
      range: "El rango de rodilla incluye, en Essential y Executive, el hotel y los traslados. No incluye el vuelo que usted compra. Snowbird no incluye hotel ni vuelo. Bariátrica, plástica y oftalmología no tienen banda publicada.",
    },
    en: {
      title: "Before you travel",
      checklist: ["A valid passport", "A list of medicines", "Studies you already have — do not send them through this form", "Your insurer’s phone number", "Your family doctor’s name in Canada"],
      pay: "This site does not take payment. The intended model is a 30% deposit and the balance by transfer, only if the written agreement says so. We do not store card numbers.",
      cancel: "We do not publish a cancellation schedule. What applies is the written contract, if you proceed.",
      companion: "Executive allows for a companion, breakfast and a more comfortable stay. The written document says what is included.",
      after: "After you return, the path is designed to include a summary for your family doctor. The clinical record stays at the hospital. MedElite does not prescribe from Vancouver.",
      range: "The knee range includes, in Essential and Executive, the hotel and transfers. It does not include a flight you buy. Snowbird includes neither hotel nor flight. Bariatric, plastic surgery and ophthalmology have no published band.",
    },
    fr: {
      title: "Avant le voyage",
      checklist: ["Passeport valide", "Liste des médicaments", "Examens que vous avez déjà — ne les envoyez pas par ce formulaire", "Téléphone de votre assureur", "Nom de votre médecin de famille au Canada"],
      pay: "Ce site n’encaisse rien. Le modèle prévu est un acompte de 30 % et le solde par virement, seulement si l’entente écrite le dit. Nous ne conservons pas de numéros de carte.",
      cancel: "Nous ne publions pas un calendrier d’annulation. Ce qui s’applique, c’est le contrat écrit, si vous continuez.",
      companion: "Executive prévoit un accompagnateur, le déjeuner et un séjour plus confortable. Le document écrit dit ce qui est inclus.",
      after: "Au retour, le parcours est conçu pour inclure un résumé pour votre médecin de famille. Le dossier clinique reste à l’hôpital. MedElite ne prescrit pas depuis Vancouver.",
      range: "La fourchette du genou inclut, pour Essential et Executive, l’hôtel et les transferts. Elle n’inclut pas le vol que vous achetez. Snowbird n’inclut ni hôtel ni vol. La chirurgie bariatrique, la chirurgie plastique et l’ophtalmologie n’ont pas de fourchette publiée.",
    },
  }[lang];
  return (
    <main id="contenido" className="page-shell">
      <Seo title={`${t.title} — MedElite`} description={t.pay} path="/preparacion" />
      <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-ink">{t.title}</h1>
      <ul className="mt-8 grid gap-2 text-sm">
        {t.checklist.map((item) => (
          <li key={item} className="rounded-xl border border-line bg-white px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 leading-relaxed">{t.range}</p>
      <p className="mt-3 leading-relaxed">{t.pay}</p>
      <p className="mt-3 leading-relaxed">{t.cancel}</p>
      <p className="mt-3 leading-relaxed">{t.companion}</p>
      <p className="mt-3 leading-relaxed">{t.after}</p>
      <p className="mt-6">
        <a className="underline" href="mailto:info@medeliteofficial.com">
          info@medeliteofficial.com
        </a>
      </p>
    </main>
  );
}
