/** Planning bands for a total knee replacement package, in CAD.
 * Source: the improved MedElite plan (Snowbird / Essential / Executive).
 * They are estimates for that example, not a hospital tariff and not a quote.
 */

export const PACKAGE_IDS = ["snowbird", "essential", "executive"] as const;

export type PackageId = (typeof PACKAGE_IDS)[number];

export interface PackageBand {
  id: PackageId;
  low: number;
  high: number;
}

export const PACKAGE_BANDS: Record<PackageId, PackageBand> = {
  snowbird: { id: "snowbird", low: 15_900, high: 17_500 },
  essential: { id: "essential", low: 19_500, high: 22_000 },
  executive: { id: "executive", low: 24_000, high: 27_500 },
};

/** Planning buffer applied only to the top of a band. It is a page rule, not a clinical fee. */
export const COMPLEXITY_BUFFER = 0.08;

export const PROCEDURE_IDS = [
  "knee",
  "hip",
  "bariatric",
  "plastic",
  "ophthalmology",
  "other",
] as const;

export type ProcedureId = (typeof PROCEDURE_IDS)[number];

export const AGE_BANDS = ["18-39", "40-54", "55-69", "70-plus"] as const;
export type AgeBand = (typeof AGE_BANDS)[number];

export const BMI_BANDS = ["under-30", "30-34", "35-39", "40-plus"] as const;
export type BmiBand = (typeof BMI_BANDS)[number];

export const CONDITIONS = ["diabetes", "heart", "anticoagulant", "none"] as const;
export type Condition = (typeof CONDITIONS)[number];

export const LEAD_EMAIL = "info@medeliteofficial.com";

export function formatCad(amount: number): string {
  const grouped = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `CAD ${grouped}`;
}

export function formatRange(low: number, high: number): string {
  return `${formatCad(low)} – ${formatCad(high)}`;
}
