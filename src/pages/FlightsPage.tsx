import { FlightSimulator } from "../components/FlightSimulator";
import { Seo } from "../components/Seo";
import { FARE_DISCLAIMER } from "../data/flights";
import { useI18n } from "../i18n";

export function FlightsPage() {
  const { lang } = useI18n();
  const title = { es: "Vuelos de muestra hacia Puerto Vallarta", en: "Sample flights to Puerto Vallarta", fr: "Vols d’échantillon vers Puerto Vallarta" }[lang];
  const deck = {
    es: "No hay conexión con una aerolínea. El cálculo usa la muestra del 14 de noviembre de 2026 y, si el procedimiento tiene banda, el rango de paquete en dólares canadienses.",
    en: "There is no connection to an airline. The figure uses the 14 November 2026 sample and, when the procedure has a band, the package range in Canadian dollars.",
    fr: "Il n’y a pas de connexion à une compagnie. Le chiffre utilise l’échantillon du 14 novembre 2026 et, si l’intervention a une bande, la fourchette du forfait en dollars canadiens.",
  }[lang];
  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-16">
      <Seo title={`${title} — MedElite`} description={deck} path="/vuelos" />
      <h1 className="font-serif text-5xl tracking-tight">{title}</h1>
      <p className="mt-4 text-muted">{deck}</p>
      <p className="mt-2 text-sm font-medium">{FARE_DISCLAIMER}</p>
      <div className="mt-8">
        <FlightSimulator />
      </div>
    </main>
  );
}
