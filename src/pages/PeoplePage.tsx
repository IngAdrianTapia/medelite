import { Seo } from "../components/Seo";
import { PEOPLE } from "../data/people";
import { useI18n } from "../i18n";

export function PeoplePage() {
  const { lang } = useI18n();
  const t = {
    es: {
      title: "Nombres publicados, nada más",
      deck: "El directorio de hospitaljoya.com no mostraba médicos el 14 de noviembre de 2026. Aquí están las personas que sí aparecen en drjoyaofficial.com o en notas de hospitaljoya.com, con la frase tal como está publicada. Erika Cruz Joya se incluye porque medeliteofficial.com la nombra fundadora y directora ejecutiva, y su foto ya está en este repositorio. No añadimos apellidos, cédulas ni biografías que esas páginas no traen.",
      according: "Según",
    },
    en: {
      title: "Published names, and nothing else",
      deck: "The hospitaljoya.com directory showed no physicians on 14 November 2026. These are the people who do appear on drjoyaofficial.com or in hospitaljoya.com notes, in the wording those pages use. Erika Cruz Joya is included because medeliteofficial.com names her founder and chief executive, and her photograph is already in this repository. We do not add surnames, licence numbers or biographies those pages do not print.",
      according: "According to",
    },
    fr: {
      title: "Noms publiés, et rien d’autre",
      deck: "Le répertoire de hospitaljoya.com n’affichait aucun médecin le 14 novembre 2026. Voici les personnes qui figurent sur drjoyaofficial.com ou dans des notes de hospitaljoya.com, dans les mots de ces pages. Erika Cruz Joya est incluse parce que medeliteofficial.com la nomme fondatrice et cheffe de la direction, et que sa photo est déjà dans ce dépôt. Nous n’ajoutons pas de noms de famille, de cédulas ni de biographies absents.",
      according: "Selon",
    },
  }[lang];
  return (
    <main id="contenido" className="page-shell">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/equipo" />
      <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-ink">{t.title}</h1>
      <p className="mt-4 leading-relaxed text-muted">{t.deck}</p>
      <ul className="mt-8 grid gap-4">
        {PEOPLE.map((person) => (
          <li key={person.id} className="rounded-[2rem] border border-line bg-white shadow-glass p-5">
            {person.photo ? (
              <img
                src={person.photo}
                alt=""
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
                className="mb-4 h-40 w-32 rounded-2xl object-cover object-top"
              />
            ) : null}
            <h2 className="font-serif text-2xl">{person.name}</h2>
            <p className="mt-2 text-sm leading-relaxed">{person.role}</p>
            {person.credentials.length > 0 ? (
              <ul className="mt-2 text-sm">
                {person.credentials.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
            <p className="mt-2 text-sm">
              {t.according}{" "}
              <a className="underline" href={person.sourceUrl} rel="noopener noreferrer">
                {person.source}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
