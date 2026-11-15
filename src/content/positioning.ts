import type { Lang } from "../i18n/types";

/**
 * Positioning copy lives here so the marketing brief can replace it in one file.
 * Status stays `awaiting-brief` until that brief arrives.
 * Do not fill five-star, Toronto, Calgary, or price-gap claims before then.
 */
export const POSITIONING_STATUS = "awaiting-brief" as const;

export const BRIEF_SLOTS = [
  { id: "headline", file: "src/content/positioning.ts", key: "POSITIONING.headline" },
  { id: "hero", file: "src/i18n/en.ts", key: "hero" },
  { id: "verticals", file: "src/i18n/en.ts", key: "verticals" },
  { id: "packages-note", file: "src/i18n/en.ts", key: "packages.note" },
  { id: "cities", file: "src/content/positioning.ts", key: "CANADA_CITIES" },
  { id: "five-star", file: "src/content/positioning.ts", key: "FIVE_STAR" },
  { id: "price-gaps", file: "src/content/positioning.ts", key: "PRICE_GAPS" },
] as const;

type Trio = Record<Lang, string>;

function row(es: string, en: string, fr: string): Trio {
  return { es, en, fr };
}

/** Lines already on the home page. Wording is unchanged; they moved here to be editable. */
export const POSITIONING: Record<Lang, { headline: string; fraser: string; mapLabel: string; mapNote: string }> = {
  es: {
    headline: "Atenderse en semanas, no en años.",
    fraser:
      "Fraser Institute, Waiting Your Turn 2025: 48.6 semanas de espera mediana en ortopedia en Canadá. Una fecha aquí se escribe después de que el cirujano en México revisa el caso. No es un plazo garantizado.",
    mapLabel: "Esquema de las nueve sedes Joya",
    mapNote: "Un esquema, no un mapa topográfico. Los puntos son las nueve sedes Joya abiertas.",
  },
  en: {
    headline: "Get treated in weeks, not years.",
    fraser:
      "Fraser Institute, Waiting Your Turn 2025: 48.6 weeks median for orthopedics in Canada. A date here is written after the surgeon in Mexico reviews the case. It is not a guaranteed interval.",
    mapLabel: "Schematic of nine Joya hospitals",
    mapNote: "A schematic, not a survey map. Dots are the nine open Joya hospitals.",
  },
  fr: {
    headline: "Se faire soigner en semaines, pas en années.",
    fraser:
      "Institut Fraser, Waiting Your Turn 2025 : 48,6 semaines médianes en orthopédie au Canada. Une date ici s’écrit après l’examen du chirurgien au Mexique. Ce n’est pas un délai garanti.",
    mapLabel: "Schéma des neuf hôpitaux Joya",
    mapNote: "Un schéma, pas une carte topographique. Les points sont les neuf hôpitaux Joya ouverts.",
  },
};

export interface CitySlot {
  id: "vancouver" | "toronto" | "calgary";
  status: "published" | "awaiting-brief";
  label: Trio;
}

export const CANADA_CITIES: readonly CitySlot[] = [
  { id: "vancouver", status: "published", label: row("Vancouver", "Vancouver", "Vancouver") },
  { id: "toronto", status: "awaiting-brief", label: row("", "", "") },
  { id: "calgary", status: "awaiting-brief", label: row("", "", "") },
];

/** Rendered on the Canada page. Empty labels and awaiting-brief cities stay off the site. */
export function publishedCities(): CitySlot[] {
  return CANADA_CITIES.filter((city) => city.status === "published" && city.label.en.length > 0);
}

/** Filled by the marketing brief. Null means the page must not invent a claim. */
export const FIVE_STAR: Trio | null = null;
export const PRICE_GAPS: Trio | null = null;

export const CANADA_CHROME: Record<Lang, { title: string; cities: string; flights: string; specialties: string; joya: string }> = {
  es: {
    title: "Para pacientes en Canadá",
    cities: "Ciudad que este sitio ya nombra",
    flights: "Vuelos publicados",
    specialties: "Especialidades",
    joya: "Hospital Joya",
  },
  en: {
    title: "For patients in Canada",
    cities: "City this site already names",
    flights: "Published flights",
    specialties: "Specialties",
    joya: "Hospital Joya",
  },
  fr: {
    title: "Pour les patients au Canada",
    cities: "Ville que ce site nomme déjà",
    flights: "Vols publiés",
    specialties: "Spécialités",
    joya: "Hospital Joya",
  },
};
