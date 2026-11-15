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
    headline: "De Canadá a México, con un plan de atención claro.",
    fraser:
      "MedElite coordina el recorrido. El hospital y el equipo clínico en México valoran el caso y confirman por escrito la sede, el procedimiento y el plan antes de cualquier viaje.",
    mapLabel: "Fotografías y fichas de las nueve sedes de Grupo Médico Joya",
    mapNote: "Conozca las nueve sedes en fotografías. Seleccione una para ver su ficha; la disponibilidad de atención se confirma para cada caso.",
  },
  en: {
    headline: "From Canada to Mexico, with a clear plan for care.",
    fraser:
      "MedElite coordinates the journey. The hospital and clinical team in Mexico review your case and confirm the location, procedure and plan in writing before you travel.",
    mapLabel: "Photos and pages for nine Grupo Médico Joya hospitals",
    mapNote: "Explore nine hospitals in photos. Select one to view its page; availability of care is confirmed for each case.",
  },
  fr: {
    headline: "Du Canada au Mexique, avec un parcours de soins clair.",
    fraser:
      "MedElite coordonne le parcours. L’hôpital et l’équipe médicale au Mexique évaluent votre dossier et confirment par écrit l’établissement, l’intervention et le plan avant votre départ.",
    mapLabel: "Photos et fiches des neuf hôpitaux de Grupo Médico Joya",
    mapNote: "Découvrez les neuf établissements en photos. Sélectionnez-en un pour consulter sa fiche; les soins disponibles sont confirmés pour chaque cas.",
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
