import { Seo } from "../components/Seo";
import { INSURERS } from "../data/joya";
import { useI18n } from "../i18n";

export function InsurancePage() {
  const { lang } = useI18n();
  const t = {
    es: {
      title: "Aseguradoras que Joya publica",
      deck: "Nombres tomados de los archivos de logo en hospitaljoya.com/seguros, el 14 de noviembre de 2026. Son convenios que Joya presenta. MedElite no los auditó y no promete un pago directo.",
      how: "Lleve su póliza, la tarjeta y el teléfono de asistencia. Pregunte a su aseguradora si la cirugía electiva entra. El plan provincial canadiense, en general, no la cubre.",
    },
    en: {
      title: "Insurers Joya publishes",
      deck: "Names taken from the logo files on hospitaljoya.com/seguros on 14 November 2026. These are agreements Joya presents. MedElite has not audited them and does not promise direct billing.",
      how: "Bring the policy, the card and the assistance phone number. Ask your insurer whether elective surgery is covered. A Canadian provincial plan generally does not cover it.",
    },
    fr: {
      title: "Assureurs que Joya publie",
      deck: "Noms tirés des fichiers de logo sur hospitaljoya.com/seguros, le 14 novembre 2026. Ce sont des ententes que Joya présente. MedElite ne les a pas auditées et ne promet pas une facturation directe.",
      how: "Apportez la police, la carte et le téléphone d’assistance. Demandez à votre assureur si la chirurgie élective est couverte. Un régime provincial canadien ne la couvre généralement pas.",
    },
  }[lang];
  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-20 md:py-24">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/seguros" />
      <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-ink">{t.title}</h1>
      <p className="mt-4 leading-relaxed text-muted">{t.deck}</p>
      <ul className="mt-8 columns-1 text-sm sm:columns-2">
        {INSURERS.map((name) => (
          <li key={name} className="mb-2 rounded-xl border border-line bg-white px-3 py-2">
            {name}
          </li>
        ))}
      </ul>
      <p className="mt-8 leading-relaxed">{t.how}</p>
      <p className="mt-6">
        <a className="inline-flex min-h-12 items-center rounded-full bg-navy px-5 text-sm font-semibold text-white shadow-premium hover:bg-navy-2" href="mailto:info@medeliteofficial.com">
          info@medeliteofficial.com
        </a>
      </p>
    </main>
  );
}
