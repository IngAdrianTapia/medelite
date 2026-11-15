/** Public facts from hospitaljoya.com and the 14 Nov 2026 research note.
 * Phones for Playa del Carmen, Chapala and La Peñita come from the contact page,
 * not the placeholder numbers in the site footer.
 */

export const HOSPITAL_IDS = [
  "marina",
  "riviera",
  "guadalajara",
  "sma",
  "queretaro",
  "cancun",
  "playa",
  "chapala",
  "penita",
] as const;

export type HospitalId = (typeof HOSPITAL_IDS)[number];

export type Vertical = "orthopedics" | "bariatric" | "plastic" | "general";

export interface Hospital {
  id: HospitalId;
  name: string;
  city: string;
  address: string;
  phones: { label: string; tel: string }[];
  url: string;
  opened: string | null;
  verticals: Vertical[];
}

export const HOSPITALS: readonly Hospital[] = [
  {
    id: "marina",
    name: "Hospital Joya Marina Vallarta",
    city: "Puerto Vallarta, Jalisco",
    address: "Blvd. Francisco Medina Ascencio #2760, Zona Hotelera Norte, C.P. 48333, Puerto Vallarta, Jalisco",
    phones: [{ label: "+52 (322) 226 1010", tel: "+523222261010" }],
    url: "https://hospitaljoya.com/hospitales/hospital-joya-marina-vallarta/",
    opened: "2000",
    verticals: ["orthopedics"],
  },
  {
    id: "riviera",
    name: "Hospital Joya Riviera Nayarit",
    city: "Nuevo Vallarta, Nayarit",
    address: "Paseo de los Cocoteros esquina Paseo de las Garzas, Nuevo Vallarta, Riviera Nayarit",
    phones: [{ label: "+52 (322) 226 8181", tel: "+523222268181" }],
    url: "https://hospitaljoya.com/hospitales/hospital-joya-riviera/",
    opened: "2011",
    verticals: ["orthopedics"],
  },
  {
    id: "guadalajara",
    name: "Hospital Joya Guadalajara",
    city: "Guadalajara, Jalisco",
    address: "Av. Ignacio L. Vallarta 1369, Col. Americana, Guadalajara, Jalisco, C.P. 44160",
    phones: [{ label: "+52 (333) 268 0854", tel: "+523332680854" }],
    url: "https://hospitaljoya.com/hospitales/hospital-joya-guadalajara/",
    opened: null,
    verticals: ["bariatric"],
  },
  {
    id: "sma",
    name: "Hospital Joya San Miguel de Allende",
    city: "San Miguel de Allende, Guanajuato",
    address: "Lib. José Manuel Zavala 12, Zona Centro, San Miguel de Allende, Guanajuato, C.P. 37700",
    phones: [{ label: "+52 (415) 152 5900", tel: "+524151525900" }],
    url: "https://hospitaljoya.com/hospitales/hospital-joya-san-miguel-de-allende/",
    opened: "2021",
    verticals: ["orthopedics"],
  },
  {
    id: "queretaro",
    name: "Hospital Joya Momentum Querétaro",
    city: "Juriquilla, Querétaro",
    address: "P.º de la República Km 13020, 76230 Juriquilla, Querétaro",
    phones: [{ label: "+52 (442) 192 7989", tel: "+524421927989" }],
    url: "https://hospitaljoya.com/hospitales/hospital-joya-queretaro/",
    opened: "2022",
    verticals: ["bariatric"],
  },
  {
    id: "cancun",
    name: "Hospital Joya Cancún",
    city: "Cancún, Quintana Roo",
    address: "Blvd. Kukulcan Km. 13, Zona Hotelera, 77500 Cancún, Quintana Roo",
    phones: [{ label: "+52 (998) 234 0950", tel: "+529982340950" }],
    url: "https://hospitaljoya.com/hospitales/hospital-joya-cancun/",
    opened: "2022",
    verticals: ["plastic"],
  },
  {
    id: "playa",
    name: "Hospital Joya Playa del Carmen",
    city: "Playa del Carmen, Quintana Roo",
    address: "Carretera Federal, P.º Tulum km. 2.5, Campestre, 77717 Playa del Carmen, Quintana Roo",
    phones: [
      { label: "+52 (984) 206 3260", tel: "+529842063260" },
      { label: "+52 (984) 443 8829", tel: "+529844438829" },
    ],
    url: "https://hospitaljoya.com/contacto/",
    opened: null,
    verticals: ["plastic"],
  },
  {
    id: "chapala",
    name: "Hospital Joya Chapala",
    city: "Ajijic, Jalisco",
    address: "Lib. A Chapala 153, 45922 Ajijic, Jalisco",
    phones: [{ label: "+52 (376) 765 8200", tel: "+523767658200" }],
    url: "https://hospitaljoya.com/contacto/",
    opened: null,
    verticals: ["orthopedics"],
  },
  {
    id: "penita",
    name: "Hospital Joya La Peñita",
    city: "La Peñita de Jaltemba, Nayarit",
    address: "Alfredo V. Bonfil 18, Centro, 63720 La Peñita de Jaltemba, Nayarit",
    phones: [{ label: "+52 (327) 107 0508", tel: "+523271070508" }],
    url: "https://hospitaljoya.com/contacto/",
    opened: null,
    verticals: ["general"],
  },
];

export function hospitalById(id: HospitalId): Hospital {
  const found = HOSPITALS.find((hospital) => hospital.id === id);
  if (!found) {
    throw new Error(`Unknown hospital: ${id}`);
  }
  return found;
}
