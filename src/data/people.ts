/** Names exactly as published. No surnames added. Sources named on each record. */

export type PersonId =
  | "armando-joya"
  | "carlos-armando"
  | "natalie-batilliot"
  | "atena-vera"
  | "daniela-martinez"
  | "maria-fernanda"
  | "aldo-curiel"
  | "enrique-rosales"
  | "jose-espinoza"
  | "mariana-esteva"
  | "diana-miramontes"
  | "laura-quintero"
  | "julio-carbajal"
  | "francisco-borrayo"
  | "erika-cruz-joya";

export interface Person {
  id: PersonId;
  name: string;
  role: string;
  source: "drjoyaofficial.com" | "hospitaljoya.com" | "medeliteofficial.com";
  sourceUrl: string;
  focus: "bariatric" | "anesthesia" | "nutrition" | "internal" | "general-surgery" | "leadership" | "talk";
  credentials: string[];
  /** Path already in this repo. Omitted when no portrait was published here. */
  photo?: string;
}

const DRJOYA = "https://drjoyaofficial.com/";
const BIO = "https://drjoyaofficial.com/dr-armando-joya/";
const HM = "https://hospitaljoya.com/cuidate/grupo-medico-joya-firma-alianza-historica-con-hm-hospitales-de-espana/";
const HPV = "https://hospitaljoya.com/cuidate/rompiendo-mitos-sobre-el-vph-dr-francisco-borrayo-ofrece-charla-informativa-en-hospital-joya/";
const MEDE = "https://www.medeliteofficial.com/";

export const PEOPLE: readonly Person[] = [
  {
    id: "armando-joya",
    name: "Dr. Armando Joya",
    role: "Chief Bariatric Surgeon / Jefe Cirugía Bariatrica. The HM Hospitales note names Dr. Armando Joya Munguía as CEO of Grupo Médico Joya.",
    source: "drjoyaofficial.com",
    sourceUrl: BIO,
    focus: "bariatric",
    credentials: [
      "Cédula Médico Cirujano y Partero No. 2312941",
      "Cédula de especialista No. AE-009602",
      "Recertificación del Consejo Mexicano de Cirugía General No. 97200",
    ],
  },
  {
    id: "carlos-armando",
    name: "Dr. Carlos Armando",
    role: "Bariatric Surgeon · Endoscopy · More",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "bariatric",
    credentials: [],
  },
  {
    id: "natalie-batilliot",
    name: "Lic. Natalie Batilliot",
    role: "Bariatric Nutrition",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "nutrition",
    credentials: [],
  },
  {
    id: "atena-vera",
    name: "Dra. Atena Vera",
    role: "Anesthesiology",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "anesthesia",
    credentials: [],
  },
  {
    id: "daniela-martinez",
    name: "Dra. Daniela Martinez",
    role: "Anesthesiology",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "anesthesia",
    credentials: [],
  },
  {
    id: "maria-fernanda",
    name: "Dra. Maria Fernanda",
    role: "Bariatric Surgeon",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "bariatric",
    credentials: [],
  },
  {
    id: "aldo-curiel",
    name: "Dr. Aldo Curiel",
    role: "Internal Medicine",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "internal",
    credentials: [],
  },
  {
    id: "enrique-rosales",
    name: "Dr. Enrique Rosales",
    role: "Bariatric Surgeon · Endoscopy",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "bariatric",
    credentials: [],
  },
  {
    id: "jose-espinoza",
    name: "Dr. José Espinoza",
    role: "Bariatric Surgeon · Bariatric Nutrition",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "bariatric",
    credentials: [],
  },
  {
    id: "mariana-esteva",
    name: "Dra. Mariana Esteva",
    role: "General Surgeon",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "general-surgery",
    credentials: [],
  },
  {
    id: "diana-miramontes",
    name: "Dra. Diana Miramontes",
    role: "Nutrition",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "nutrition",
    credentials: [],
  },
  {
    id: "laura-quintero",
    name: "Dra. Laura Quintero",
    role: "General Surgeon · Endoscopy",
    source: "drjoyaofficial.com",
    sourceUrl: DRJOYA,
    focus: "general-surgery",
    credentials: [],
  },
  {
    id: "julio-carbajal",
    name: "Julio Carbajal",
    role: "Presidente de Hospitales Joya, named in the HM Hospitales note.",
    source: "hospitaljoya.com",
    sourceUrl: HM,
    focus: "leadership",
    credentials: [],
  },
  {
    id: "francisco-borrayo",
    name: "Dr. Francisco Borrayo",
    role: "Named in the title of an informational talk on HPV at Hospital Joya. No specialty page or cédula was published with that note.",
    source: "hospitaljoya.com",
    sourceUrl: HPV,
    focus: "talk",
    credentials: [],
  },
  {
    id: "erika-cruz-joya",
    name: "Erika Cruz Joya",
    // TODO(owner): biography, cédula, studies, awards, patient counts and the exact About Us URL are not in this repository. Do not invent them. The only portrait on file is public/assets/img/equipo/erika-cruz-joya.jpg. The only source URL stored here is the site root below.
    role: "Founder and chief executive, as named on medeliteofficial.com. That page says she leads vision, partnerships and operations, and that she has a close connection to the Joya hospital network. No licence number or biography was published with that note.",
    source: "medeliteofficial.com",
    sourceUrl: MEDE,
    focus: "leadership",
    credentials: [],
    photo: "/assets/img/equipo/erika-cruz-joya.jpg",
  },
];

export function peopleByFocus(focus: Person["focus"]): Person[] {
  return PEOPLE.filter((person) => person.focus === focus);
}
