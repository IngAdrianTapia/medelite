import type { HospitalId } from "./hospitals";

/** Traceability for photos used from the 2026-11-14 Joya collection.
 * Each row is a file we encoded. The source URL is the one in INDICE.csv.
 * The Manzanillo render is not here. No photo in this list shows a patient.
 */

export interface PhotoCredit {
  id: string;
  sourceFile: string;
  sourcePageUrl: string;
  imageUrl: string;
  use: string;
}

export const PHOTO_CREDITS: readonly PhotoCredit[] = [
  {
    id: "marina",
    sourceFile: "hospital-joya-marina-vista-aerea-marina-01.jpg",
    sourcePageUrl: "https://hospitaljoya.com/",
    imageUrl: "https://hospitaljoya.com/wp-content/uploads/2026/06/HQ-Joya-MARINA7.jpg.jpg",
    use: "Fachada de Marina en la ficha, la red y el hero.",
  },
  {
    id: "riviera",
    sourceFile: "hospital-joya-riviera-fachada-01.jpg",
    sourcePageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-RIVIERA.pdf",
    imageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-RIVIERA.pdf#page=3",
    use: "Fachada de Riviera Nayarit.",
  },
  {
    id: "guadalajara",
    sourceFile: "hospital-joya-guadalajara-fachada-01.jpg",
    sourcePageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-GDL.pdf",
    imageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-GDL.pdf#page=3",
    use: "Fachada de Guadalajara.",
  },
  {
    id: "sma",
    sourceFile: "hospital-joya-sma-fachada-01.jpg",
    sourcePageUrl: "https://grupomedicojoya.com/wp-content/uploads/HOSPITAL-JOYA-SAN-MIGUEL-Daniel.pdf",
    imageUrl: "https://grupomedicojoya.com/wp-content/uploads/HOSPITAL-JOYA-SAN-MIGUEL-Daniel.pdf#page=3",
    use: "Fachada de San Miguel de Allende.",
  },
  {
    id: "queretaro",
    sourceFile: "hospital-joya-queretaro-fachada-01.jpg",
    sourcePageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-QRO-NVO.pdf",
    imageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-QRO-NVO.pdf#page=3",
    use: "Fachada de Momentum Querétaro.",
  },
  {
    id: "cancun",
    sourceFile: "hospital-joya-cancun-fachada-01.jpg",
    sourcePageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-CANCUN.pdf",
    imageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-CANCUN.pdf#page=3",
    use: "Fachada de Cancún y uno de los encuadres del hero.",
  },
  {
    id: "playa",
    sourceFile: "hospital-joya-playa-fachada-02.jpg",
    sourcePageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-PLAYA.pdf",
    imageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-PLAYA.pdf#page=7",
    use: "Fachada de Playa del Carmen.",
  },
  {
    id: "chapala",
    sourceFile: "hospital-joya-chapala-fachada-chapala-01.jpg",
    sourcePageUrl: "https://hospitaljoya.com/hospitales/hospital-joya-chapala/",
    imageUrl: "https://hospitaljoya.com/wp-content/uploads/2026/08/HJ-Chapala-e1787678889267.png",
    use: "Fachada de Chapala.",
  },
  {
    id: "penita",
    sourceFile: "hospital-joya-penita-fachada-penita-02.jpg",
    sourcePageUrl: "https://hospitaljoya.com/hospitales/hospital-joya-la-penita/",
    imageUrl: "https://hospitaljoya.com/wp-content/uploads/2026/08/Hospital-Joya-La-Penita-Fachada.jpg-1.jpeg",
    use: "Fachada de La Peñita.",
  },
  {
    id: "operating-room",
    sourceFile: "hospital-joya-red-quirofano-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/about-joya-hospital/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2022/01/quirofano.jpg",
    use: "Quirófano vacío en la galería y en especialidades. La sede no está nombrada.",
  },
  {
    id: "patient-room",
    sourceFile: "hospital-joya-playa-recepcion-01.jpg",
    sourcePageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-PLAYA.pdf",
    imageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-PLAYA.pdf#page=10",
    use: "Habitación vacía de Playa del Carmen. El índice la llamaba recepción; la imagen es una habitación.",
  },
  {
    id: "bariatric-or",
    sourceFile: "hospital-joya-marina-fachada-marina-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/about-joya-hospital/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/HOSPITAL-JOYA-MARINA-6-1-1024x683-1.jpg",
    use: "Quirófano vacío publicado con el material de Marina. El índice lo llamaba fachada; la imagen es un quirófano.",
  },
  {
    id: "bariatric-room",
    sourceFile: "hospital-joya-red-habitacion-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/about-joya-hospital/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2022/01/DSC_5708.jpg",
    use: "Habitación vacía. La sede no está nombrada.",
  },
  {
    id: "cancun-ct",
    sourceFile: "hospital-joya-cancun-tomografo-01.jpg",
    sourcePageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-CANCUN.pdf",
    imageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-CANCUN.pdf#page=11",
    use: "Tomógrafo vacío en Cancún.",
  },
  {
    id: "cancun-lobby",
    sourceFile: "hospital-joya-cancun-recepcion-01.jpg",
    sourcePageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-CANCUN.pdf",
    imageUrl: "https://grupomedicojoya.com/wp-content/uploads/HJ-CURRICULUM-CANCUN.pdf#page=5",
    use: "Vestíbulo de Cancún, sin personas.",
  },
  {
    id: "armando-joya",
    sourceFile: "hospital-joya-equipo-retrato-dr-armando-joya-03.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Carrusel-Dr.Joya_.jpg",
    use: "Retrato publicado del Dr. Armando Joya.",
  },
  {
    id: "carlos-armando",
    sourceFile: "hospital-joya-equipo-retrato-carlos-armando-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Carlos-Armando.jpg",
    use: "Retrato publicado del Dr. Carlos Armando.",
  },
  {
    id: "natalie-batilliot",
    sourceFile: "hospital-joya-equipo-retrato-natalie-batilliot-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/natalie-batilliot.jpg",
    use: "Retrato publicado de Natalie Batilliot.",
  },
  {
    id: "atena-vera",
    sourceFile: "hospital-joya-equipo-retrato-atena-vera-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Atena-Vera.jpg",
    use: "Retrato publicado de la Dra. Atena Vera.",
  },
  {
    id: "daniela-martinez",
    sourceFile: "hospital-joya-equipo-retrato-daniela-martinez-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Daniela-Martinez-Gonzalez.jpg",
    use: "Retrato publicado de la Dra. Daniela Martínez.",
  },
  {
    id: "maria-fernanda",
    sourceFile: "hospital-joya-equipo-retrato-maria-fernanda-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Maria-Fernanda.jpg",
    use: "Retrato publicado de la Dra. María Fernanda.",
  },
  {
    id: "aldo-curiel",
    sourceFile: "hospital-joya-equipo-retrato-aldo-curiel-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Dr.-Aldo.jpg",
    use: "Retrato publicado del Dr. Aldo Curiel.",
  },
  {
    id: "enrique-rosales",
    sourceFile: "hospital-joya-equipo-retrato-enrique-rosales-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Dr.-Enrique-Rosales.jpg",
    use: "Retrato publicado del Dr. Enrique Rosales.",
  },
  {
    id: "jose-espinoza",
    sourceFile: "hospital-joya-equipo-retrato-jose-espinoza-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Dr.-Jose-Espinoza.jpg",
    use: "Retrato publicado del Dr. José Espinoza.",
  },
  {
    id: "mariana-esteva",
    sourceFile: "hospital-joya-equipo-retrato-mariana-esteva-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Dr.Mariana.jpg",
    use: "Retrato publicado de la Dra. Mariana Esteva.",
  },
  {
    id: "diana-miramontes",
    sourceFile: "hospital-joya-equipo-retrato-diana-miramontes-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Dr.-Diana.jpg",
    use: "Retrato publicado de la Dra. Diana Miramontes.",
  },
  {
    id: "laura-quintero",
    sourceFile: "hospital-joya-equipo-retrato-laura-quintero-01.jpg",
    sourcePageUrl: "https://drjoyaofficial.com/",
    imageUrl: "https://drjoyaofficial.com/wp-content/uploads/2024/04/Dra.-Laura.jpg",
    use: "Retrato publicado de la Dra. Laura Quintero.",
  },
];

export const HOSPITAL_INTERIORS: Partial<Record<HospitalId, readonly string[]>> = {
  cancun: ["cancun-ct", "cancun-lobby"],
  playa: ["patient-room"],
};

export const FACILITY_GALLERY = ["operating-room", "patient-room", "cancun-ct", "cancun-lobby"] as const;

export function portraitOf(id: string): PhotoCredit | undefined {
  return PHOTO_CREDITS.find((row) => row.id === id && row.sourceFile.includes("retrato"));
}
