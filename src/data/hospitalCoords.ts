import type { HospitalId } from "./hospitals";

/** WGS84 of each published Hospital Joya address, for the real map.
 * - sma: OpenStreetMap, Hospital Joya on Libramiento José Manuel Zavala (read 16 Nov 2026).
 * - cancun: Nominatim, Blvd. Kukulcan, Zona Hotelera, 77500 (read 16 Nov 2026).
 * - others: inverted from the documented city/colonia pins already used in mexicoMap.ts
 *   (equirectangular, lon −118.2…−84.2, lat 14.0…33.2, same research note of 14–16 Nov 2026).
 */
export const HOSPITAL_LL: Record<HospitalId, { lat: number; lng: number; source: "osm" | "nominatim" | "map-pin" }> = {
  sma: { lat: 20.9109653, lng: -100.7597388, source: "osm" },
  cancun: { lat: 21.0986589, lng: -86.7679706, source: "nominatim" },
  marina: { lat: 20.67132, lng: -105.076, source: "map-pin" },
  riviera: { lat: 20.71087, lng: -105.1338, source: "map-pin" },
  penita: { lat: 21.03036, lng: -105.0828, source: "map-pin" },
  guadalajara: { lat: 20.68653, lng: -103.2842, source: "map-pin" },
  chapala: { lat: 20.33357, lng: -103.1754, source: "map-pin" },
  queretaro: { lat: 20.72304, lng: -100.4792, source: "map-pin" },
  playa: { lat: 20.65914, lng: -87.651, source: "map-pin" },
};
