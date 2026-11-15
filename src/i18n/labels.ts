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
  hemodynamics: row("Hemodinamia", "Haemodynamics suite", "Hémodynamie"),
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
  marina: row("Fachada del Hospital Joya Marina Vallarta.", "Exterior of Hospital Joya Marina Vallarta.", "Façade de l’Hospital Joya Marina Vallarta."),
  riviera: row("Fachada del Hospital Joya Riviera Nayarit.", "Exterior of Hospital Joya Riviera Nayarit.", "Façade de l’Hospital Joya Riviera Nayarit."),
  guadalajara: row("Fachada del Hospital Joya Guadalajara.", "Exterior of Hospital Joya Guadalajara.", "Façade de l’Hospital Joya Guadalajara."),
  sma: row("Fachada del Hospital Joya San Miguel de Allende.", "Exterior of Hospital Joya San Miguel de Allende.", "Façade de l’Hospital Joya San Miguel de Allende."),
  queretaro: row("Fachada del Hospital Joya Momentum Querétaro.", "Exterior of Hospital Joya Momentum Querétaro.", "Façade de l’Hospital Joya Momentum Querétaro."),
  cancun: row("Fachada del Hospital Joya Cancún.", "Exterior of Hospital Joya Cancún.", "Façade de l’Hospital Joya Cancún."),
  playa: row("Fachada del Hospital Joya Playa del Carmen.", "Exterior of Hospital Joya Playa del Carmen.", "Façade de l’Hospital Joya Playa del Carmen."),
  chapala: row("Fachada del Hospital Joya Chapala, en Ajijic.", "Exterior of Hospital Joya Chapala, in Ajijic.", "Façade de l’Hospital Joya Chapala, à Ajijic."),
  penita: row("Fachada del Hospital Joya La Peñita.", "Exterior of Hospital Joya La Peñita.", "Façade de l’Hospital Joya La Peñita."),
  "operating-room": row("Quirófano publicado por Grupo Médico Joya. La foto no identifica la sede.", "Operating room published by Grupo Médico Joya. The photo does not name the site.", "Salle d’opération publiée par Grupo Médico Joya. La photo ne nomme pas l’établissement."),
  "patient-room": row("Habitación publicada por Grupo Médico Joya. La foto no identifica la sede.", "Patient room published by Grupo Médico Joya. The photo does not name the site.", "Chambre publiée par Grupo Médico Joya. La photo ne nomme pas l’établissement."),
  "bariatric-or": row("Quirófano publicado en drjoyaofficial.com.", "Operating room published on drjoyaofficial.com.", "Salle d’opération publiée sur drjoyaofficial.com."),
  "bariatric-room": row("Área de recuperación publicada en drjoyaofficial.com.", "Recovery area published on drjoyaofficial.com.", "Aire de récupération publiée sur drjoyaofficial.com."),
};
