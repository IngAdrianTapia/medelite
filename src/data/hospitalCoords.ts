import type { HospitalId } from "./hospitals";

/** WGS84 of each Hospital Joya site, from the official Google Maps link that each page of
 * hospitaljoya.com/hospitales/ publishes (resolved 16 Nov 2026; Chapala from its `cid` link).
 * Marina uses its own link: the Marina page also repeats the Cancún link by mistake. */
export const HOSPITAL_LL: Record<HospitalId, { lat: number; lng: number; source: string }> = {
  marina: { lat: 20.6521374, lng: -105.2401758, source: "https://maps.app.goo.gl/Mh5PwT3fPJ7DUufQ6" },
  riviera: { lat: 20.6976746, lng: -105.2957404, source: "https://maps.app.goo.gl/gGkPXoDnYujM4pt19" },
  penita: { lat: 21.0398557, lng: -105.2491233, source: "https://maps.app.goo.gl/6U2NYuZ6bqomsffSA" },
  guadalajara: { lat: 20.6743433, lng: -103.3664002, source: "https://maps.app.goo.gl/GQCnZhESzRxZfNGU6" },
  chapala: { lat: 20.3024248, lng: -103.2399123, source: "https://maps.google.com/?cid=8345941207671393243" },
  sma: { lat: 20.9109556, lng: -100.7599181, source: "https://maps.app.goo.gl/3KSjuyME1PBy1EvX8" },
  queretaro: { lat: 20.6838644, lng: -100.4345196, source: "https://maps.app.goo.gl/CoftdrR5L3NuD8ir9" },
  cancun: { lat: 21.1037097, lng: -86.7648757, source: "https://maps.app.goo.gl/1F6Gg2es7dmQfMkDA" },
  playa: { lat: 20.61208, lng: -87.1032659, source: "https://maps.app.goo.gl/fHkz1BKE3Aofzjg28" },
};
