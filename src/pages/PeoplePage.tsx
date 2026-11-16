import { PageCta } from "../components/PageCta";
import { Seo } from "../components/Seo";
import { personRole } from "../data/personRoles";
import { portraitOf } from "../data/photoCredits";
import { PEOPLE } from "../data/people";
import { useI18n } from "../i18n";

export function PeoplePage() {
  const { lang } = useI18n();
  const t = {
    es: {
      title: "Nombres publicados, nada más",
      deck: "El directorio de hospitaljoya.com no mostraba médicos el 14 de noviembre de 2026. Aquí están las personas que sí aparecen en drjoyaofficial.com o en notas de hospitaljoya.com, con la frase tal como está publicada. Erika Cruz Joya se incluye porque medeliteofficial.com la nombra fundadora y directora ejecutiva, y su foto ya está publicada en este sitio. No añadimos apellidos, cédulas ni biografías que esas páginas no traen.",
      according: "Según",
    },
    en: {
      title: "Published names, and nothing else",
      deck: "The hospitaljoya.com directory showed no physicians on 14 November 2026. These are the people who do appear on drjoyaofficial.com or in hospitaljoya.com notes, in the wording those pages use. Erika Cruz Joya is included because medeliteofficial.com names her founder and chief executive, and her photograph is already published on this site. We do not add surnames, licence numbers or biographies those pages do not print.",
      according: "According to",
    },
    fr: {
      title: "Noms publiés, et rien d’autre",
      deck: "Le répertoire de hospitaljoya.com n’affichait aucun médecin le 14 novembre 2026. Voici les personnes qui figurent sur drjoyaofficial.com ou dans des notes de hospitaljoya.com, dans les mots de ces pages. Erika Cruz Joya est incluse parce que medeliteofficial.com la nomme fondatrice et cheffe de la direction, et que sa photo est déjà publiée sur ce site. Nous n’ajoutons pas de noms de famille, de cédulas ni de biographies absents.",
      according: "Selon",
    },
  }[lang];
  const initials = (name: string) =>
    name
      .replace(/^(Dr|Dra|Lic|Ing)\.?\s+/i, "")
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("");
  const eyebrow = { es: "Equipo y directorio", en: "Team and directory", fr: "Équipe et répertoire" }[lang];
  return (
    <main id="contenido" className="page-shell-wide">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/equipo" />
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{t.title}</h1>
      <p className="mt-6 max-w-[46rem] text-[17px] leading-relaxed text-muted">{t.deck}</p>
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-gallery="equipo">
        {PEOPLE.map((person) => {
          const portrait = person.photo ?? (portraitOf(person.id) ? `/assets/photos/people/${person.id}-720.webp` : null);
          return (
            <li key={person.id} className="reveal lift flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
              <div className="relative aspect-[4/5] overflow-hidden bg-soft">
                {portrait ? (
                  <picture>
                    {!person.photo ? <source type="image/avif" srcSet={`/assets/photos/people/${person.id}-720.avif`} /> : null}
                    <img src={portrait} alt={person.name} width={720} height={900} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
                  </picture>
                ) : (
                  <div aria-hidden="true" className="absolute inset-0 grid place-items-center" style={{ background: "radial-gradient(120% 90% at 30% 20%, #1d4f73 0%, #0b2545 70%)" }}>
                    <span className="font-serif text-7xl text-white/90">{initials(person.name)}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-2xl leading-tight text-navy">{person.name}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{personRole(lang, person)}</p>
                {person.credentials.length > 0 ? (
                  <ul className="mt-3 space-y-1 text-sm text-ink">
                    {person.credentials.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-auto pt-5 text-xs text-muted">
                  {t.according}{" "}
                  <a className="link-line text-navy" href={person.sourceUrl} rel="noopener noreferrer">
                    {person.source}
                  </a>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <PageCta />
    </main>
  );
}
