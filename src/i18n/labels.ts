import type { Lang } from "./types";
import type { PublicSpecialtyId, ServiceId, UpcomingId } from "../data/joya";
import { DIRECTORY_SPECIALTIES } from "../data/joya";

type Trio = Record<Lang, string>;

function row(es: string, en: string, fr: string): Trio {
  return { es, en, fr };
}

export const SERVICE_LABEL: Record<ServiceId, Trio> = {
  er24: row("Urgencias 24/7", "24/7 emergency", "Urgences 24 h/24"),
  icu: row("Cuidados intensivos", "Intensive care", "Soins intensifs"),
  nicu: row("Cuidados neonatales o pediátricos", "Neonatal or pediatric intensive care", "Soins intensifs néonataux ou pédiatriques"),
  hemodynamics: row("Hemodinamia", "Hemodynamics suite", "Hémodynamie"),
  labor: row("Área de labor", "Labour and delivery", "Salle de travail"),
  ortho: row("Traumatología y ortopedia", "Trauma and orthopedics", "Traumatologie et orthopédie"),
  urology: row("Urología", "Urology", "Urologie"),
  checkups: row("Chequeos", "Check-ups", "Bilans de santé"),
  "blood-bank": row("Banco de sangre", "Blood bank", "Banque de sang"),
  imaging: row("Imagenología", "Imaging", "Imagerie"),
  lab: row("Laboratorio", "Laboratory", "Laboratoire"),
  womens: row("Atención de la mujer", "Women’s care", "Soins pour les femmes"),
  pediatrics: row("Pediatría", "Pediatrics", "Pédiatrie"),
  hyperbaric: row("Cámara hiperbárica", "Hyperbaric chamber", "Caisson hyperbare"),
  "ambulance-air": row("Ambulancia aérea", "Air ambulance", "Ambulance aérienne"),
  "ambulance-ground": row("Ambulancia terrestre", "Ground ambulance", "Ambulance terrestre"),
  "home-care": row("Atención en casa después del hospital", "Post-hospital care at home", "Soins à domicile après l’hôpital"),
  "pharmacy-24": row("Farmacia 24 horas", "24-hour pharmacy", "Pharmacie 24 heures"),
  bilingual: row("Personal bilingüe, según la ficha", "Bilingual staff, as the hospital page states", "Personnel bilingue, selon la fiche"),
  ors: row("Quirófanos", "Operating rooms", "Salles d’opération"),
};

export const SPECIALTY_LABEL: Record<PublicSpecialtyId, Trio> = {
  cardiology: row("Cardiología", "Cardiology", "Cardiologie"),
  dermatology: row("Dermatología", "Dermatology", "Dermatologie"),
  endocrinology: row("Endocrinología", "Endocrinology", "Endocrinologie"),
  gastroenterology: row("Gastroenterología", "Gastroenterology", "Gastroentérologie"),
  gynecology: row("Ginecología y obstetricia", "Gynecology and obstetrics", "Gynécologie et obstétrique"),
  "general-surgery": row("Cirugía general", "General surgery", "Chirurgie générale"),
  nephrology: row("Nefrología", "Nephrology", "Néphrologie"),
  orthopedics: row("Ortopedia y traumatología", "Orthopedics and trauma", "Orthopédie et traumatologie"),
  ent: row("Otorrinolaringología", "Ear, nose and throat", "Oto-rhino-laryngologie"),
  ophthalmology: row("Oftalmología", "Ophthalmology", "Ophtalmologie"),
  urology: row("Urología", "Urology", "Urologie"),
  "general-practice": row("Medicina general", "General practice", "Médecine générale"),
  "internal-medicine": row("Medicina interna", "Internal medicine", "Médecine interne"),
  pulmonology: row("Neumología", "Pulmonology", "Pneumologie"),
  neurology: row("Neurología", "Neurology", "Neurologie"),
  nutrition: row("Nutrición", "Nutrition", "Nutrition"),
  pediatrics: row("Pediatría", "Pediatrics", "Pédiatrie"),
};

export const DIRECTORY_LABEL: Record<(typeof DIRECTORY_SPECIALTIES)[number], Trio> = {
  algology: row("Algología", "Algology", "Algologie"),
  anesthesiology: row("Anestesiología", "Anesthesiology", "Anesthésiologie"),
  angiology: row("Angiología y cirugía vascular", "Angiology and vascular surgery", "Angiologie et chirurgie vasculaire"),
  cardiology: SPECIALTY_LABEL.cardiology,
  bariatric: row("Cirugía bariátrica y metabólica", "Bariatric and metabolic surgery", "Chirurgie bariatrique et métabolique"),
  cardiothoracic: row("Cirugía cardiotorácica", "Cardiothoracic surgery", "Chirurgie cardiothoracique"),
  "endoscopic-surgery": row("Cirugía endoscópica", "Endoscopic surgery", "Chirurgie endoscopique"),
  "general-surgery": SPECIALTY_LABEL["general-surgery"],
  maxillofacial: row("Cirugía maxilofacial", "Maxillofacial surgery", "Chirurgie maxillo-faciale"),
  "surgical-oncology": row("Cirugía oncológica", "Surgical oncology", "Chirurgie oncologique"),
  "gyn-oncology": row("Cirugía oncológica ginecológica", "Gynecologic oncology surgery", "Chirurgie oncologique gynécologique"),
  "pediatric-surgery": row("Cirugía pediátrica", "Pediatric surgery", "Chirurgie pédiatrique"),
  plastic: row("Cirugía plástica", "Plastic surgery", "Chirurgie plastique"),
  spine: row("Columna", "Spine", "Colonne"),
  gastroenterology: SPECIALTY_LABEL.gastroenterology,
  geriatrics: row("Geriatría", "Geriatrics", "Gériatrie"),
  gynecology: SPECIALTY_LABEL.gynecology,
  hematology: row("Hematología", "Hematology", "Hématologie"),
  "infectious-disease": row("Infectología", "Infectious disease", "Infectiologie"),
  "critical-care": row("Medicina crítica", "Critical care", "Médecine de soins intensifs"),
  rehab: row("Medicina física y rehabilitación", "Physical medicine and rehabilitation", "Médecine physique et réadaptation"),
  "internal-medicine": SPECIALTY_LABEL["internal-medicine"],
  nephrology: SPECIALTY_LABEL.nephrology,
  neonatology: row("Neonatología", "Neonatology", "Néonatalogie"),
  pulmonology: SPECIALTY_LABEL.pulmonology,
  neurosurgery: row("Neurocirugía", "Neurosurgery", "Neurochirurgie"),
  neurology: SPECIALTY_LABEL.neurology,
  ophthalmology: SPECIALTY_LABEL.ophthalmology,
  oncology: row("Oncología", "Oncology", "Oncologie"),
  ent: SPECIALTY_LABEL.ent,
  pediatrics: SPECIALTY_LABEL.pediatrics,
  orthopedics: SPECIALTY_LABEL.orthopedics,
  urology: SPECIALTY_LABEL.urology,
};

export const UPCOMING_LABEL: Record<UpcomingId, Trio> = {
  tulum: row("Hospital Joya Tulum", "Hospital Joya Tulum", "Hospital Joya Tulum"),
  manzanillo: row("Hospital Joya Manzanillo", "Hospital Joya Manzanillo", "Hospital Joya Manzanillo"),
  merida: row("Hospital Joya Mérida", "Hospital Joya Mérida", "Hospital Joya Mérida"),
  "oncology-banderas": row(
    "Centro Oncológico Joya, Bahía de Banderas",
    "Joya Oncology Centre, Bahía de Banderas",
    "Centre d’oncologie Joya, Bahía de Banderas",
  ),
};

export const PHOTO_OF: Record<string, Trio> = {
  marina: row("Fachada del Hospital Joya Marina Vallarta, con el letrero azul.", "Exterior of Hospital Joya Marina Vallarta, with the blue sign.", "Façade de l’Hospital Joya Marina Vallarta, avec l’enseigne bleue."),
  riviera: row("Fachada del Centro Médico Joya en Riviera Nayarit, entre palmeras.", "Exterior of Centro Médico Joya in Riviera Nayarit, among palm trees.", "Façade du Centro Médico Joya à Riviera Nayarit, entre les palmiers."),
  guadalajara: row("Fachada del Hospital Joya Guadalajara, con el letrero en la esquina.", "Exterior of Hospital Joya Guadalajara, with the sign on the corner.", "Façade de l’Hospital Joya Guadalajara, avec l’enseigne sur l’angle."),
  sma: row("Fachada del Hospital Joya San Miguel de Allende.", "Exterior of Hospital Joya San Miguel de Allende.", "Façade de l’Hospital Joya San Miguel de Allende."),
  queretaro: row("Torres de Momentum Querétaro, donde está el Hospital Joya.", "Momentum Querétaro towers, where Hospital Joya is.", "Tours de Momentum Querétaro, où se trouve l’Hospital Joya."),
  cancun: row("Entrada acristalada del Hospital Joya Cancún.", "Glass entrance of Hospital Joya Cancún.", "Entrée vitrée de l’Hospital Joya Cancún."),
  playa: row("Fachada del Hospital Joya Playa del Carmen, con la celosía azul.", "Exterior of Hospital Joya Playa del Carmen, with the blue screen.", "Façade de l’Hospital Joya Playa del Carmen, avec le claustra bleu."),
  chapala: row("Fachada del Hospital Joya Chapala, en Ajijic, con la sierra detrás.", "Exterior of Hospital Joya Chapala, in Ajijic, with the mountains behind.", "Façade de l’Hospital Joya Chapala, à Ajijic, avec la montagne derrière."),
  penita: row("Fachada del Hospital Joya La Peñita y el letrero de urgencias.", "Exterior of Hospital Joya La Peñita and the emergency sign.", "Façade de l’Hospital Joya La Peñita et le panneau des urgences."),
  "operating-room": row("Quirófano vacío publicado por Grupo Médico Joya. La foto no nombra la sede.", "Empty operating room published by Grupo Médico Joya. The photo does not name the site.", "Salle d’opération vide publiée par Grupo Médico Joya. La photo ne nomme pas l’établissement."),
  "patient-room": row("Habitación vacía en Hospital Joya Playa del Carmen.", "Empty patient room at Hospital Joya Playa del Carmen.", "Chambre vide à l’Hospital Joya Playa del Carmen."),
  "bariatric-or": row("Quirófano vacío publicado en la página de Hospital Joya Marina. No se ve a ningún paciente.", "Empty operating room published on the Hospital Joya Marina page. No patient is visible.", "Salle d’opération vide publiée sur la page de l’Hospital Joya Marina. Aucun patient n’est visible."),
  "bariatric-room": row("Habitación vacía publicada por Grupo Médico Joya. La foto no nombra la sede.", "Empty room published by Grupo Médico Joya. The photo does not name the site.", "Chambre vide publiée par Grupo Médico Joya. La photo ne nomme pas l’établissement."),
  "cancun-ct": row("Tomógrafo en Hospital Joya Cancún. La sala está vacía.", "CT scanner at Hospital Joya Cancún. The room is empty.", "Tomodensitomètre à l’Hospital Joya Cancún. La salle est vide."),
  "marina-diagnostics": row("Sala de resonancia magnética vacía en Hospital Joya Marina Vallarta.", "Empty MRI room at Hospital Joya Marina Vallarta.", "Salle d’IRM vide à l’Hospital Joya Marina Vallarta."),
  "cancun-lobby": row("Vestíbulo del Hospital Joya Cancún, sin personas.", "Lobby of Hospital Joya Cancún, with no people.", "Hall de l’Hospital Joya Cancún, sans personne."),
};
