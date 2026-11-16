import type { PoiCat } from "../data/sedePois";

type Lang = "es" | "en" | "fr";
type Family = { color: string; path: string };

const F = {
  food: { color: "#d9480f", path: "M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10M16 3c-1.7 0-3 2-3 5v4h3M16 3v18" },
  cafe: { color: "#8a5a2b", path: "M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3v3M12 3v3" },
  bar: { color: "#c2255c", path: "M5 4h14l-7 8-7-8zM12 12v8M8 20h8" },
  shop: { color: "#5f3dc4", path: "M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2" },
  car: { color: "#495057", path: "M5 15l1.5-5h11L19 15M4 15h16v3H4zM7 18v2M17 18v2" },
  bank: { color: "#2b8a3e", path: "M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" },
  fuel: { color: "#c92a2a", path: "M5 20V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15M4 20h11M5 10h9M14 8l3 3v6a1.5 1.5 0 0 0 3 0V9l-3-3" },
  hotel: { color: "#1864ab", path: "M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11.5h.01" },
  pharmacy: { color: "#087f5b", path: "M12 5v14M5 12h14" },
  school: { color: "#e67700", path: "M2 9l10-5 10 5-10 5L2 9zM6 11v5c2 2 10 2 12 0v-5" },
  transit: { color: "#364fc7", path: "M6 4h12a2 2 0 0 1 2 2v10H4V6a2 2 0 0 1 2-2zM4 11h16M7 19v-3M17 19v-3" },
  worship: { color: "#5c5f66", path: "M12 2v4M10 4h4M6 21V11l6-4 6 4v10M10 21v-4a2 2 0 0 1 4 0v4" },
  leisure: { color: "#0b7285", path: "M3 17c2 0 2-1.5 4.5-1.5S9.5 17 12 17s2-1.5 4.5-1.5S19 17 21 17M12 3l5 9H7l5-9z" },
  civic: { color: "#343a40", path: "M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" },
} satisfies Record<string, Family>;

const CAT: Record<PoiCat, { f: keyof typeof F; es: string; en: string; fr: string }> = {
  attraction: { f: "leisure", es: "Punto de interés", en: "Landmark", fr: "Point d’intérêt" },
  bakery: { f: "cafe", es: "Panadería", en: "Bakery", fr: "Boulangerie" },
  bank: { f: "bank", es: "Banco", en: "Bank", fr: "Banque" },
  bar: { f: "bar", es: "Bar", en: "Bar", fr: "Bar" },
  bus_station: { f: "transit", es: "Central de autobuses", en: "Bus station", fr: "Gare routière" },
  cafe: { f: "cafe", es: "Café", en: "Café", fr: "Café" },
  car: { f: "car", es: "Agencia de autos", en: "Car dealer", fr: "Concessionnaire" },
  car_rental: { f: "car", es: "Renta de autos", en: "Car rental", fr: "Location de voitures" },
  clothes: { f: "shop", es: "Ropa", en: "Clothing", fr: "Vêtements" },
  college: { f: "school", es: "Escuela", en: "School", fr: "École" },
  convenience: { f: "shop", es: "Tienda", en: "Convenience store", fr: "Dépanneur" },
  department_store: { f: "shop", es: "Tienda departamental", en: "Department store", fr: "Grand magasin" },
  fast_food: { f: "food", es: "Comida rápida", en: "Fast food", fr: "Restauration rapide" },
  fuel: { f: "fuel", es: "Gasolinera", en: "Gas station", fr: "Station-service" },
  furniture: { f: "shop", es: "Mueblería", en: "Furniture", fr: "Meubles" },
  hardware: { f: "shop", es: "Ferretería", en: "Hardware", fr: "Quincaillerie" },
  hotel: { f: "hotel", es: "Hotel", en: "Hotel", fr: "Hôtel" },
  marina: { f: "leisure", es: "Marina", en: "Marina", fr: "Marina" },
  motel: { f: "hotel", es: "Motel", en: "Motel", fr: "Motel" },
  optician: { f: "shop", es: "Óptica", en: "Optician", fr: "Opticien" },
  park: { f: "leisure", es: "Parque", en: "Park", fr: "Parc" },
  pharmacy: { f: "pharmacy", es: "Farmacia", en: "Pharmacy", fr: "Pharmacie" },
  place_of_worship: { f: "worship", es: "Templo", en: "Church", fr: "Église" },
  police: { f: "civic", es: "Policía", en: "Police", fr: "Police" },
  post_office: { f: "civic", es: "Paquetería", en: "Shipping", fr: "Expédition" },
  restaurant: { f: "food", es: "Restaurante", en: "Restaurant", fr: "Restaurant" },
  school: { f: "school", es: "Escuela", en: "School", fr: "École" },
  sports_centre: { f: "leisure", es: "Club deportivo", en: "Sports club", fr: "Club sportif" },
  supermarket: { f: "shop", es: "Supermercado", en: "Supermarket", fr: "Supermarché" },
  water_park: { f: "leisure", es: "Parque acuático", en: "Water park", fr: "Parc aquatique" },
  wholesale: { f: "shop", es: "Club de precios", en: "Warehouse club", fr: "Club-entrepôt" },
};

export function poiLabel(cat: PoiCat, lang: Lang) {
  return CAT[cat][lang];
}

export function poiFamily(cat: PoiCat): Family {
  return F[CAT[cat].f];
}

export function poiIconSvg(cat: PoiCat, size = 16) {
  const f = poiFamily(cat);
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="#fff" stroke-width="${f === F.pharmacy ? 3.2 : 1.9}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${f.path}"/></svg>`;
}
