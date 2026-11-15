import type { PersonId } from "../data/people";
import { peopleByFocus } from "../data/people";
import { HOSPITAL_IDS, type HospitalId } from "../data/hospitals";
import { PACKAGE_BANDS, type PackageId } from "../data/packages";
import type { OriginCode } from "../data/flights";

export const LINE_IDS = [
  "knee",
  "hip",
  "bariatric",
  "plastic",
  "dental",
  "ophthalmology",
  "cardiology",
  "fertility",
  "checkup",
] as const;

export type LineId = (typeof LINE_IDS)[number];

/** Joya publishes the service. Dental and fertility are not on the specialties page or the directory. */
export const LINE_STATUS: Record<LineId, "published" | "coming-soon"> = {
  knee: "published",
  hip: "published",
  bariatric: "published",
  plastic: "published",
  dental: "coming-soon",
  ophthalmology: "published",
  cardiology: "published",
  fertility: "coming-soon",
  checkup: "published",
};

export interface JourneyInput {
  origin: OriginCode;
  line: LineId;
  packageId: PackageId;
  month: string;
  hospitalId: HospitalId;
}

export interface JourneyStep {
  id: "depart" | "transfer" | "preop" | "surgery" | "hospital" | "hotel" | "fit-to-fly" | "return" | "aftercare";
}

export function buildItinerary(input: JourneyInput): JourneyStep[] {
  const travel = input.packageId !== "snowbird";
  const hotelNights = input.packageId === "essential" ? 7 : input.packageId === "executive" ? 8 : 0;
  const steps: JourneyStep[] = [];
  if (travel) steps.push({ id: "depart" });
  if (travel) steps.push({ id: "transfer" });
  steps.push({ id: "preop" }, { id: "surgery" }, { id: "hospital" });
  if (hotelNights > 0) steps.push({ id: "hotel" });
  steps.push({ id: "fit-to-fly" });
  if (travel) steps.push({ id: "return" });
  steps.push({ id: "aftercare" });
  return steps;
}

export interface MatchResult {
  hospitalId: HospitalId | null;
  people: PersonId[];
  comingSoon: boolean;
  why: "ortho" | "bariatric" | "cardio" | "checkup" | "published-no-name" | "coming-soon";
}

export function matchLine(line: LineId, origin: OriginCode): MatchResult {
  if (LINE_STATUS[line] === "coming-soon") {
    return { hospitalId: null, people: [], comingSoon: true, why: "coming-soon" };
  }
  if (line === "bariatric") {
    return {
      hospitalId: "riviera",
      people: peopleByFocus("bariatric").map((person) => person.id),
      comingSoon: false,
      why: "bariatric",
    };
  }
  if (line === "knee" || line === "hip") {
    const hospitalId: HospitalId = origin === "YVR" || origin === "YYC" || origin === "YYZ" ? "marina" : "marina";
    return { hospitalId, people: [], comingSoon: false, why: "ortho" };
  }
  if (line === "cardiology") {
    return { hospitalId: "marina", people: [], comingSoon: false, why: "cardio" };
  }
  if (line === "checkup") {
    return { hospitalId: "riviera", people: [], comingSoon: false, why: "checkup" };
  }
  return { hospitalId: null, people: [], comingSoon: false, why: "published-no-name" };
}

export type BmiBand = "under-30" | "30-34" | "35-39" | "40-plus";

export interface ReadinessInput {
  line: LineId;
  bmi: BmiBand | "";
  passport: boolean;
  adult: boolean;
  month: boolean;
}

export interface ReadinessItem {
  id: "adult" | "passport" | "month" | "bmi" | "surgeon";
  state: "ready" | "missing" | "review" | "info";
}

export function readiness(input: ReadinessInput): { items: ReadinessItem[]; readyCount: number; total: number } {
  const items: ReadinessItem[] = [
    { id: "adult", state: input.adult ? "ready" : "missing" },
    { id: "passport", state: input.passport ? "ready" : "missing" },
    { id: "month", state: input.month ? "ready" : "missing" },
  ];
  if (input.line === "bariatric") {
    if (!input.bmi) items.push({ id: "bmi", state: "missing" });
    else if (input.bmi === "40-plus" || input.bmi === "35-39") items.push({ id: "bmi", state: "review" });
    else if (input.bmi === "30-34") items.push({ id: "bmi", state: "review" });
    else items.push({ id: "bmi", state: "review" });
  }
  items.push({ id: "surgeon", state: "info" });
  const scored = items.filter((item) => item.id !== "surgeon" && item.id !== "bmi");
  return {
    items,
    readyCount: scored.filter((item) => item.state === "ready").length,
    total: scored.length,
  };
}

export function journeyQuote(input: JourneyInput) {
  const band = input.line === "knee" || input.line === "hip" ? PACKAGE_BANDS[input.packageId] : null;
  return { band };
}

export function journeySearch(input: JourneyInput): string {
  const params = new URLSearchParams({
    o: input.origin,
    line: input.line,
    pkg: input.packageId,
    month: input.month,
    h: input.hospitalId,
  });
  return `/ruta?${params.toString()}`;
}

export function readJourneySearch(params: URLSearchParams): JourneyInput | null {
  const origin = params.get("o");
  const line = params.get("line");
  const pkg = params.get("pkg");
  const month = params.get("month");
  const hospital = params.get("h");
  const origins = ["YVR", "YYC", "YEG", "YYZ", "YUL", "YOW", "YWG"];
  const packages = ["snowbird", "essential", "executive"];
  if (!origin || !origins.includes(origin)) return null;
  if (!line || !(LINE_IDS as readonly string[]).includes(line)) return null;
  if (!pkg || !packages.includes(pkg)) return null;
  if (!month || !/^\d{4}-\d{2}$/.test(month)) return null;
  if (!hospital || !(HOSPITAL_IDS as readonly string[]).includes(hospital)) return null;
  return {
    origin: origin as OriginCode,
    line: line as LineId,
    packageId: pkg as PackageId,
    month,
    hospitalId: hospital as HospitalId,
  };
}
