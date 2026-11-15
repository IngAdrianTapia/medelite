import type { HospitalId } from "./hospitals";

/** Sample fares collected 14 Nov 2026, 18:20 (UTC−6), for 15–25 Jan 2027, 1 adult, economy, to PVR.
 * The search showed "$" and did not confirm CAD or USD. These are not live fares.
 */

export const FARE_SAMPLE_COLLECTED = "2026-11-14T18:20:00-06:00";
export const FARE_SAMPLE_TRIP = { depart: "2027-01-15", return: "2027-01-25" } as const;
export const FARE_DISCLAIMER = "Estimado · sujeto a confirmación con la aerolínea";

export const ORIGIN_CODES = ["YVR", "YYC", "YEG", "YYZ", "YUL", "YOW", "YWG"] as const;
export type OriginCode = (typeof ORIGIN_CODES)[number];

export const AIRPORT_CODES = ["PVR", "GDL", "QRO", "BJX", "CUN"] as const;
export type AirportCode = (typeof AIRPORT_CODES)[number];

export interface FareBand {
  low: number;
  high: number;
}

export interface OriginSample {
  nonstop: FareBand | null;
  connecting: FareBand | null;
  airlinesNamed: readonly string[];
}

export const SEARCH_AIRLINES = [
  "Flair",
  "WestJet",
  "Porter",
  "Air Canada",
  "United",
  "American",
  "Delta",
  "Aeroméxico",
] as const;

/** Only routes with a figure in the 14 Nov 2026 sample. Other origins stay null. */
export const PVR_SAMPLES: Record<OriginCode, OriginSample | null> = {
  YVR: {
    nonstop: { low: 368, high: 559 },
    connecting: { low: 752, high: 1088 },
    airlinesNamed: ["Flair", "WestJet"],
  },
  YYC: {
    nonstop: { low: 494.63, high: 627.63 },
    connecting: { low: 659.53, high: 892.41 },
    airlinesNamed: ["WestJet"],
  },
  YEG: null,
  YYZ: {
    nonstop: { low: 650.83, high: 650.83 },
    connecting: { low: 653.61, high: 1238.83 },
    airlinesNamed: ["Porter"],
  },
  YUL: null,
  YOW: null,
  YWG: null,
};

/** Planning airport for each open Joya hospital. Not a measured transfer time. */
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

export interface FlightQuoteRequest {
  origin: OriginCode;
  destination: AirportCode;
  depart: string;
  returnDate: string;
  adults: number;
  cabin: "economy";
}

export interface FlightQuote {
  available: boolean;
  reason: "sample" | "no-sample-for-airport" | "no-sample-for-origin";
  origin: OriginCode;
  destination: AirportCode;
  currency: "unconfirmed-dollar";
  nonstop: FareBand | null;
  connecting: FareBand | null;
  /** Lowest and highest figure in the sample for that origin, across nonstop and connecting. */
  span: FareBand | null;
  airlinesNamed: readonly string[];
  collectedAt: string;
  sampleTrip: { depart: string; return: string };
}

export interface FlightQuoteAdapter {
  readonly id: string;
  quote(request: FlightQuoteRequest): FlightQuote;
}

function spanOf(sample: OriginSample): FareBand {
  const points = [sample.nonstop, sample.connecting].filter((band): band is FareBand => band !== null);
  const lows = points.map((band) => band.low);
  const highs = points.map((band) => band.high);
  return { low: Math.min(...lows), high: Math.max(...highs) };
}

export function quoteStaticSample(request: FlightQuoteRequest): FlightQuote {
  const base = {
    origin: request.origin,
    destination: request.destination,
    currency: "unconfirmed-dollar" as const,
    collectedAt: FARE_SAMPLE_COLLECTED,
    sampleTrip: { depart: FARE_SAMPLE_TRIP.depart, return: FARE_SAMPLE_TRIP.return },
  };
  if (request.destination !== "PVR") {
    return { ...base, available: false, reason: "no-sample-for-airport", nonstop: null, connecting: null, span: null, airlinesNamed: [] };
  }
  const sample = PVR_SAMPLES[request.origin];
  if (!sample) {
    return { ...base, available: false, reason: "no-sample-for-origin", nonstop: null, connecting: null, span: null, airlinesNamed: [] };
  }
  return {
    ...base,
    available: true,
    reason: "sample",
    nonstop: sample.nonstop,
    connecting: sample.connecting,
    span: spanOf(sample),
    airlinesNamed: sample.airlinesNamed,
  };
}

export const staticSampleAdapter: FlightQuoteAdapter = {
  id: "static-sample-2026-11-14",
  quote: quoteStaticSample,
};

export function formatSampleAmount(amount: number): string {
  const fixed = Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
  const [whole, cents] = fixed.split(".");
  const grouped = (whole ?? "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return cents ? `$${grouped}.${cents}` : `$${grouped}`;
}

export interface IllustratedTotal {
  shown: boolean;
  low: number | null;
  high: number | null;
  /** True when a dollar sample was added to a CAD package. The currencies were not confirmed as the same. */
  currencyUnconfirmed: boolean;
}

export function illustrateTotal(flight: FlightQuote, packageBand: { low: number; high: number } | null): IllustratedTotal {
  if (!flight.available || !flight.span || !packageBand) {
    return { shown: false, low: null, high: null, currencyUnconfirmed: false };
  }
  return {
    shown: true,
    low: Math.round((flight.span.low + packageBand.low) * 100) / 100,
    high: Math.round((flight.span.high + packageBand.high) * 100) / 100,
    currencyUnconfirmed: true,
  };
}
