import type { HospitalId } from "./hospitals";

/**
 * Ticket prices are not published. A coordinator quotes the flight.
 * Sample dollar figures collected on 14 Nov 2026 were removed: the UI never
 * showed them, the currency was unconfirmed, and they were not a live fare.
 * Do not put fare numbers back without a sourced, current, currency-confirmed sample.
 */

export const ORIGIN_CODES = ["YVR", "YYC", "YEG", "YYZ", "YUL", "YOW", "YWG"] as const;
export type OriginCode = (typeof ORIGIN_CODES)[number];

export const AIRPORT_CODES = ["PVR", "GDL", "QRO", "BJX", "CUN"] as const;
export type AirportCode = (typeof AIRPORT_CODES)[number];

/** Planning airport for each open Joya hospital. Not a measured transfer time and not a fare. */
export const HOSPITAL_AIRPORT: Record<HospitalId, AirportCode> = {
  marina: "PVR",
  riviera: "PVR",
  penita: "PVR",
  guadalajara: "GDL",
  chapala: "GDL",
  queretaro: "QRO",
  sma: "BJX",
  cancun: "CUN",
  playa: "CUN",
};
