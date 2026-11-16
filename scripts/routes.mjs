/** Paths written by the prerender, excluding the 404 shell. */
export const SPECIALTY_PATHS = [
  "algology", "anesthesiology", "angiology", "cardiology", "bariatric", "cardiothoracic",
  "endoscopic-surgery", "general-surgery", "maxillofacial", "surgical-oncology", "gyn-oncology",
  "pediatric-surgery", "plastic", "spine", "gastroenterology", "geriatrics", "gynecology",
  "hematology", "infectious-disease", "critical-care", "rehab", "internal-medicine", "nephrology",
  "neonatology", "pulmonology", "neurosurgery", "neurology", "ophthalmology", "oncology", "ent",
  "pediatrics", "orthopedics", "urology",
  "dermatology", "endocrinology", "general-practice", "nutrition",
];

const HOSPITAL_IDS = ["marina", "riviera", "guadalajara", "sma", "queretaro", "cancun", "playa", "chapala", "penita"];

/** [route, dist path relative to dist/]. English is also written without a prefix. */
export const PRERENDER_ROUTES = [
  ["/", "index.html"],
  ["/hospital-joya", "hospital-joya/index.html"],
  ["/galeria", "galeria/index.html"],
  ["/red", "red/index.html"],
  ...HOSPITAL_IDS.map((id) => [`/red/${id}`, `red/${id}/index.html`]),
  ["/especialidades", "especialidades/index.html"],
  ...SPECIALTY_PATHS.map((id) => [`/especialidades/${id}`, `especialidades/${id}/index.html`]),
  ["/bariatrica", "bariatrica/index.html"],
  ["/vuelos", "vuelos/index.html"],
  ["/seguros", "seguros/index.html"],
  ["/que-es", "que-es/index.html"],
  ["/canada", "canada/index.html"],
  ["/preparacion", "preparacion/index.html"],
  ["/ruta", "ruta/index.html"],
  ["/comparar", "comparar/index.html"],
  ["/mapa", "mapa/index.html"],
  ["/calidad", "calidad/index.html"],
  ["/equipo", "equipo/index.html"],
  ["/hospitales", "hospitales/index.html"],
  ["/privacy", "privacy/index.html"],
  ["/privacidad", "privacidad/index.html"],
  ["/terms", "terms/index.html"],
  ["/terminos", "terminos/index.html"],
];
