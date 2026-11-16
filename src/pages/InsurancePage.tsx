import { FacilityPhoto } from "../components/FacilityPhoto";
import { Seo } from "../components/Seo";
import { INSURERS } from "../data/joya";
import { PageCta } from "../components/PageCta";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";

export function InsurancePage() {
  const { lang } = useI18n();
  const t = {
    es: {
      title: "Aseguradoras que Joya publica",
      eyebrow: "Seguros y cobertura",
      deck: "Nombres tomados de los archivos de logo en hospitaljoya.com/seguros, el 14 de noviembre de 2026. Son convenios que Joya presenta. MedElite no los auditó y no promete un pago directo.",
      how: "Lleve su póliza, la tarjeta y el teléfono de asistencia. Pregunte a su aseguradora si la cirugía electiva entra. El plan provincial canadiense, en general, no la cubre.",
      photoCap: "Hospital Joya Riviera Nayarit. Los convenios los publica Joya; MedElite no promete un pago directo.",
    },
    en: {
      title: "Insurers Joya publishes",
      eyebrow: "Insurance and coverage",
      deck: "Names taken from the logo files on hospitaljoya.com/seguros on 14 November 2026. These are agreements Joya presents. MedElite has not audited them and does not promise direct billing.",
      how: "Bring the policy, the card and the assistance phone number. Ask your insurer whether elective surgery is covered. A Canadian provincial plan generally does not cover it.",
      photoCap: "Hospital Joya Riviera Nayarit. The agreements are those Joya publishes; MedElite does not promise direct billing.",
    },
    fr: {
      title: "Assureurs que Joya publie",
      eyebrow: "Assurance et couverture",
      deck: "Noms tirés des fichiers de logo sur hospitaljoya.com/seguros, le 14 novembre 2026. Ce sont des ententes que Joya présente. MedElite ne les a pas auditées et ne promet pas une facturation directe.",
      how: "Apportez la police, la carte et le téléphone d’assistance. Demandez à votre assureur si la chirurgie élective est couverte. Un régime provincial canadien ne la couvre généralement pas.",
      photoCap: "Hospital Joya Riviera Nayarit. Les ententes sont celles que Joya publie ; MedElite ne promet pas une facturation directe.",
    },
  }[lang];
  return (
    <main id="contenido">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/seguros" />
      <header className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{t.title}</h1>
            <p className="mt-6 max-w-[42rem] text-[17px] leading-relaxed text-muted">{t.deck}</p>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-soft" data-gallery="seguros">
            <FacilityPhoto name="riviera" fill alt={PHOTO_OF.riviera?.[lang] ?? t.title} sizes="(min-width: 1024px) 34rem, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-5 pt-16 pb-4 text-sm text-white">{t.photoCap}</figcaption>
          </figure>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <ul className="grid grid-cols-2 overflow-hidden rounded-2xl border-t border-l border-line bg-white sm:grid-cols-3 lg:grid-cols-5">
          {INSURERS.map((name) => (
            <li key={name} className="flex min-h-16 items-center border-r border-b border-line px-4 py-3 text-[15px] font-medium text-navy">
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[42rem] text-[17px] leading-relaxed text-ink">{t.how}</p>
        <p className="mt-4 text-[15px]">
          <a className="link-line text-navy" href="mailto:info@medeliteofficial.com">info@medeliteofficial.com</a>
        </p>
        <div className="mt-16 pb-8">
          <PageCta />
        </div>
      </div>
    </main>
  );
}
