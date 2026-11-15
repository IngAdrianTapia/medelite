import type { Lang } from "../i18n/types";
import type { Person, PersonId } from "./people";

/** Same facts as Person.role, in the language of the page. No new biography. */
const ROLE: Record<PersonId, Record<Lang, string>> = {
  "armando-joya": {
    es: "Jefe de cirugía bariátrica. La nota de HM Hospitales nombra a Dr. Armando Joya Munguía como director general de Grupo Médico Joya.",
    en: "Chief bariatric surgeon. The HM Hospitales note names Dr. Armando Joya Munguía as CEO of Grupo Médico Joya.",
    fr: "Chef de la chirurgie bariatrique. La note de HM Hospitales nomme le Dr Armando Joya Munguía comme directeur général de Grupo Médico Joya.",
  },
  "carlos-armando": {
    es: "Cirujano bariátrico · Endoscopia · Más",
    en: "Bariatric surgeon · Endoscopy · More",
    fr: "Chirurgien bariatrique · Endoscopie · Autre",
  },
  "natalie-batilliot": {
    es: "Nutrición bariátrica",
    en: "Bariatric nutrition",
    fr: "Nutrition bariatrique",
  },
  "atena-vera": {
    es: "Anestesiología",
    en: "Anesthesiology",
    fr: "Anesthésiologie",
  },
  "daniela-martinez": {
    es: "Anestesiología",
    en: "Anesthesiology",
    fr: "Anesthésiologie",
  },
  "maria-fernanda": {
    es: "Cirujana bariátrica",
    en: "Bariatric surgeon",
    fr: "Chirurgienne bariatrique",
  },
  "aldo-curiel": {
    es: "Medicina interna",
    en: "Internal medicine",
    fr: "Médecine interne",
  },
  "enrique-rosales": {
    es: "Cirujano bariátrico · Endoscopia",
    en: "Bariatric surgeon · Endoscopy",
    fr: "Chirurgien bariatrique · Endoscopie",
  },
  "jose-espinoza": {
    es: "Cirujano bariátrico · Nutrición bariátrica",
    en: "Bariatric surgeon · Bariatric nutrition",
    fr: "Chirurgien bariatrique · Nutrition bariatrique",
  },
  "mariana-esteva": {
    es: "Cirujana general",
    en: "General surgeon",
    fr: "Chirurgienne générale",
  },
  "diana-miramontes": {
    es: "Nutrición",
    en: "Nutrition",
    fr: "Nutrition",
  },
  "laura-quintero": {
    es: "Cirujana general · Endoscopia",
    en: "General surgeon · Endoscopy",
    fr: "Chirurgienne générale · Endoscopie",
  },
  "julio-carbajal": {
    es: "Presidente de Hospitales Joya, nombrado en la nota de HM Hospitales.",
    en: "President of Hospitales Joya, named in the HM Hospitales note.",
    fr: "Président de Hospitales Joya, nommé dans la note de HM Hospitales.",
  },
  "francisco-borrayo": {
    es: "Aparece en el título de una charla informativa sobre el VPH en Hospital Joya. Esa nota no publica especialidad ni cédula.",
    en: "Named in the title of an informational talk on HPV at Hospital Joya. No specialty page or licence number was published with that note.",
    fr: "Nommé dans le titre d’une causerie sur le VPH à l’Hospital Joya. Cette note ne publie ni spécialité ni numéro de permis.",
  },
  "erika-cruz-joya": {
    es: "Fundadora y directora ejecutiva, según medeliteofficial.com. Esa página dice que dirige la visión, las alianzas y la operación, y que tiene una relación cercana con la red de Hospitales Joya. No hay cédula ni biografía en esa nota.",
    en: "Founder and chief executive, as named on medeliteofficial.com. That page says she leads vision, partnerships and operations, and that she has a close connection to the Joya hospital network. No licence number or biography was published with that note.",
    fr: "Fondatrice et cheffe de la direction, selon medeliteofficial.com. Cette page dit qu’elle dirige la vision, les partenariats et l’exploitation, et qu’elle a un lien étroit avec le réseau des hôpitaux Joya. Aucun numéro de permis ni biographie n’accompagne cette note.",
  },
};

export function personRole(lang: Lang, person: Pick<Person, "id" | "role">): string {
  return ROLE[person.id as PersonId]?.[lang] ?? person.role;
}
