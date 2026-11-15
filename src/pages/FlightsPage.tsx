import { FlightSimulator } from "../components/FlightSimulator";
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
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-20 md:py-24">
      <Seo title={`${copy.title} — MedElite`} description={copy.deck} path="/vuelos" />
      <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-ink">{copy.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{copy.deck}</p>
      <div className="mt-8">
        <FlightSimulator />
      </div>
    </main>
  );
}
