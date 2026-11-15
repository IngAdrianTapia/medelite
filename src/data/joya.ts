import type { HospitalId } from "./hospitals";
import type { AirportCode } from "./flights";

export const SERVICE_IDS = [
  "er24",
  "icu",
  "nicu",
  "hemodynamics",
  "labor",
  "ortho",
  "urology",
  "checkups",
  "blood-bank",
  "imaging",
  "lab",
  "womens",
  "pediatrics",
  "hyperbaric",
  "ambulance-air",
  "ambulance-ground",
  "home-care",
  "pharmacy-24",
  "bilingual",
  "ors",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export interface HospitalFacts {
  id: HospitalId;
  url: string;
  opened: string | null;
  phones: { label: string; tel: string; role: "main" | "er" | "clinics" }[];
  rooms: string | null;
  airport: AirportCode;
  services: ServiceId[];
  /** Claims Joya publishes that this page does not treat as verified. */
  unverified: ("only-icu" | "sectur" | "ipn" | "only-mri")[];
}

export const HOSPITAL_FACTS: Record<HospitalId, HospitalFacts> = {
  marina: {
    id: "marina",
    url: "https://hospitaljoya.com/hospitales/hospital-joya-marina-vallarta/",
    opened: "2000",
    phones: [{ label: "+52 (322) 226 1010", tel: "+523222261010", role: "main" }],
    rooms: null,
    airport: "PVR",
    services: ["er24", "icu", "nicu", "hemodynamics", "labor", "ortho", "urology", "checkups", "blood-bank"],
    unverified: [],
  },
  riviera: {
    id: "riviera",
    url: "https://hospitaljoya.com/hospitales/hospital-joya-riviera/",
    opened: "2011",
    phones: [{ label: "+52 (322) 226 8181", tel: "+523222268181", role: "main" }],
    rooms: null,
    airport: "PVR",
    services: ["er24", "icu", "womens", "checkups", "ortho", "imaging", "urology", "bilingual"],
    unverified: ["only-icu"],
  },
  guadalajara: {
    id: "guadalajara",
    url: "https://hospitaljoya.com/hospitales/hospital-joya-guadalajara/",
    opened: null,
    phones: [{ label: "+52 (333) 268 0854", tel: "+523332680854", role: "main" }],
    rooms: "18+2",
    airport: "GDL",
    services: ["er24", "icu", "hemodynamics", "urology", "imaging", "checkups", "bilingual", "pediatrics"],
    unverified: [],
  },
  sma: {
    id: "sma",
    url: "https://hospitaljoya.com/hospitales/hospital-joya-san-miguel-de-allende/",
    opened: "2021-03",
    phones: [{ label: "+52 (415) 152 5900", tel: "+524151525900", role: "main" }],
    rooms: "10",
    airport: "BJX",
    services: ["er24", "icu", "imaging", "lab", "ors", "bilingual"],
    unverified: ["ipn", "only-mri"],
  },
  queretaro: {
    id: "queretaro",
    url: "https://hospitaljoya.com/hospitales/hospital-joya-queretaro/",
    opened: "2022",
    phones: [{ label: "+52 (442) 192 7989", tel: "+524421927989", role: "main" }],
    rooms: "7+2",
    airport: "QRO",
    services: ["er24", "icu", "nicu", "checkups", "imaging"],
    unverified: [],
  },
  cancun: {
    id: "cancun",
    url: "https://hospitaljoya.com/hospitales/hospital-joya-cancun/",
    opened: "2022-12",
    phones: [{ label: "+52 (998) 234 0950", tel: "+529982340950", role: "main" }],
    rooms: "24",
    airport: "CUN",
    services: ["er24", "icu", "nicu", "hemodynamics", "labor", "lab", "blood-bank", "imaging", "bilingual"],
    unverified: ["sectur"],
  },
  playa: {
    id: "playa",
    url: "https://hospitaljoya.com/hospitales/hospital-joya-playa-del-carmen/",
    opened: "2023-09",
    phones: [
      { label: "+52 (984) 206 3260", tel: "+529842063260", role: "er" },
      { label: "+52 (984) 443 8829", tel: "+529844438829", role: "clinics" },
      { label: "+52 (984) 320 8353", tel: "+529843208353", role: "clinics" },
    ],
    rooms: null,
    airport: "CUN",
    services: ["er24", "icu", "nicu", "hyperbaric", "womens", "urology", "pediatrics", "ors", "bilingual"],
    unverified: [],
  },
  chapala: {
    id: "chapala",
    url: "https://hospitaljoya.com/hospitales/hospital-joya-chapala/",
    opened: null,
    phones: [{ label: "+52 (376) 765 8200", tel: "+523767658200", role: "main" }],
    rooms: null,
    airport: "GDL",
    services: ["er24", "icu", "bilingual", "ambulance-air", "ambulance-ground", "home-care", "ors", "pharmacy-24"],
    unverified: [],
  },
  penita: {
    id: "penita",
    url: "https://hospitaljoya.com/hospitales/hospital-joya-la-penita/",
    opened: null,
    phones: [{ label: "+52 (327) 107 0508", tel: "+523271070508", role: "main" }],
    rooms: null,
    airport: "PVR",
    services: ["er24", "icu", "nicu", "imaging", "lab", "home-care", "ambulance-air", "ambulance-ground", "bilingual", "pharmacy-24"],
    unverified: ["only-icu"],
  },
};

export const UPCOMING = ["tulum", "manzanillo", "merida", "oncology-banderas"] as const;
export type UpcomingId = (typeof UPCOMING)[number];

export const PUBLIC_SPECIALTIES = [
  "cardiology",
  "dermatology",
  "endocrinology",
  "gastroenterology",
  "gynecology",
  "general-surgery",
  "nephrology",
  "orthopedics",
  "ent",
  "ophthalmology",
  "urology",
  "general-practice",
  "internal-medicine",
  "pulmonology",
  "neurology",
  "nutrition",
  "pediatrics",
] as const;

export type PublicSpecialtyId = (typeof PUBLIC_SPECIALTIES)[number];

/** Hospitals named for that specialty on a Joya hospital page, not guessed from “30 specialties”. */
export const SPECIALTY_SITES: Record<PublicSpecialtyId, readonly HospitalId[]> = {
  cardiology: ["marina", "guadalajara", "cancun"],
  dermatology: [],
  endocrinology: [],
  gastroenterology: [],
  gynecology: ["marina", "riviera", "cancun", "playa"],
  "general-surgery": [],
  nephrology: [],
  orthopedics: ["marina", "riviera"],
  ent: [],
  ophthalmology: [],
  urology: ["marina", "riviera", "guadalajara", "playa"],
  "general-practice": [],
  "internal-medicine": [],
  pulmonology: [],
  neurology: [],
  nutrition: [],
  pediatrics: ["marina", "guadalajara", "queretaro", "cancun", "playa", "penita"],
};

export const DIRECTORY_SPECIALTIES = [
  "algology",
  "anesthesiology",
  "angiology",
  "cardiology",
  "bariatric",
  "cardiothoracic",
  "endoscopic-surgery",
  "general-surgery",
  "maxillofacial",
  "surgical-oncology",
  "gyn-oncology",
  "pediatric-surgery",
  "plastic",
  "spine",
  "gastroenterology",
  "geriatrics",
  "gynecology",
  "hematology",
  "infectious-disease",
  "critical-care",
  "rehab",
  "internal-medicine",
  "nephrology",
  "neonatology",
  "pulmonology",
  "neurosurgery",
  "neurology",
  "ophthalmology",
  "oncology",
  "ent",
  "pediatrics",
  "orthopedics",
  "urology",
] as const;

export const INSURERS = [
  "GNP",
  "AXA",
  "Seguros Monterrey",
  "MetLife",
  "Mapfre",
  "Seguros BUPA",
  "Inbursa Seguros",
  "Seguros BX",
  "Seguros Atlas",
  "Allianz",
  "Can-Assistance",
  "GlobalExcel",
  "Assistel",
  "Trident",
  "GeoBlue",
  "LOGIMEDEX",
  "tugo",
  "FALCK",
  "World Travel Protection",
  "TourMed",
  "Blue Cross Blue Shield",
  "md-abroad",
  "Canada Life",
  "AIG",
  "CHUBB",
] as const;

export const VERIFIED_ON = "2026-11-14";
