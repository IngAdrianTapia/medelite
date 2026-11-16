import { PageCta } from "../components/PageCta";
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
      title: "Combien coûte le vol vers votre chirurgie?",
      deck: "Choisissez votre ville au Canada et l’hôpital Joya. Le prix du billet n’est pas publié ici.",
    },
  }[lang];
  return (
    <main id="contenido" className="bg-white">
      <Seo title={`${copy.title} — MedElite`} description={copy.deck} path="/vuelos" />
      <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-5 pt-12 pb-20 md:px-8 lg:grid-cols-2 lg:pt-16">
        <div>
          <h1 className="font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-md text-lg text-muted">{copy.deck}</p>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl bg-soft shadow-premium">
            <FacilityPhoto name="marina" fill alt="" sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
        </div>
        <FlightSimulator />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <PageCta />
      </div>
    </main>
  );
}
