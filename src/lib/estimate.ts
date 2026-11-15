import {
  COMPLEXITY_BUFFER,
  PACKAGE_BANDS,
  type BmiBand,
  type Condition,
  type PackageId,
  type ProcedureId,
} from "../data/packages";

export interface EstimateInput {
  procedure: ProcedureId;
  packageId: PackageId;
  bmiBand: BmiBand;
  conditions: readonly Condition[];
  inMexico: boolean;
}

export type EstimateFlag =
  | "complexity"
  | "hip-same-band"
  | "snowbird-not-in-mexico"
  | "on-request";

export interface Estimate {
  kind: "range" | "on-request";
  low: number | null;
  high: number | null;
  currency: "CAD";
  /** The only published planning band is the total knee replacement example. */
  basis: "knee-plan" | "none";
  flags: EstimateFlag[];
}

const BANDED: ReadonlySet<ProcedureId> = new Set(["knee", "hip"]);

function isComplex(input: EstimateInput): boolean {
  if (input.bmiBand === "40-plus") return true;
  return input.conditions.some((condition) => condition !== "none");
}

/** Administrative estimate. Not a quote and not a clinical assessment. */
export function estimateQuote(input: EstimateInput): Estimate {
  if (!BANDED.has(input.procedure)) {
    return {
      kind: "on-request",
      low: null,
      high: null,
      currency: "CAD",
      basis: "none",
      flags: ["on-request"],
    };
  }

  const band = PACKAGE_BANDS[input.packageId];
  const flags: EstimateFlag[] = [];
  let high = band.high;

  if (isComplex(input)) {
    high = Math.round(band.high * (1 + COMPLEXITY_BUFFER));
    flags.push("complexity");
  }
  if (input.procedure === "hip") flags.push("hip-same-band");
  if (input.packageId === "snowbird" && !input.inMexico) {
    flags.push("snowbird-not-in-mexico");
  }

  return {
    kind: "range",
    low: band.low,
    high,
    currency: "CAD",
    basis: "knee-plan",
    flags,
  };
}
