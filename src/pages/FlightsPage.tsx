import { FlightSimulator } from "../components/FlightSimulator";
import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n";

export function FlightsPage() {
  const { lang } = useI18n();
  const copy = {
    es: {
      title: "¿Cuánto cuesta volar a tu cirugía?",
      deck: "Elija su ciudad en Canadá y la sede Joya. El boleto no tiene un precio publicado aquí.",
    },
    en: {
      title: "What does the flight to your surgery cost?",
      deck: "Choose your city in Canada and the Joya hospital. A ticket price is not published here.",
    },
    fr: {
      title: "Combien coûte le vol vers votre chirurgie ?",
      deck: "Choisissez votre ville au Canada et l’hôpital Joya. Le prix du billet n’est pas publié ici.",
    },
  }[lang];
  return (
    <main id="contenido" className="relative min-h-svh bg-navy">
      <Seo title={`${copy.title} — MedElite`} description={copy.deck} path="/vuelos" />
      <div className="absolute inset-0 opacity-40">
        <FacilityPhoto name="marina" fill protect alt="" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      <div className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-10 px-5 pt-32 pb-20 lg:grid-cols-2">
        <div className="text-white">
          <h1 className="font-serif text-5xl leading-[0.95] md:text-7xl">{copy.title}</h1>
          <p className="mt-6 max-w-md text-lg text-white/75">{copy.deck}</p>
        </div>
        <FlightSimulator />
      </div>
    </main>
  );
}
