import type { AgeBand, BmiBand, Condition, PackageId, ProcedureId } from "../data/packages";
import { digitCount, looksLikeCardNumber } from "./lead";

export const STEP_IDS = ["procedure", "package", "health", "dates", "contact", "result"] as const;
export type StepId = (typeof STEP_IDS)[number];

export interface WizardState {
  procedure: ProcedureId | "";
  packageId: PackageId | "";
  ageBand: AgeBand | "";
  bmiBand: BmiBand | "";
  conditions: Condition[];
  inMexico: boolean | null;
  month: string;
  flexible: boolean;
  companion: boolean | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  note: string;
  consent: boolean;
  adult: boolean;
}

export const EMPTY_WIZARD: WizardState = {
  procedure: "",
  packageId: "",
  ageBand: "",
  bmiBand: "",
  conditions: [],
  inMexico: null,
  month: "",
  flexible: false,
  companion: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  note: "",
  consent: false,
  adult: false,
};

export type FieldError =
  | "required"
  | "email"
  | "phone"
  | "consent"
  | "adult"
  | "card"
  | "month"
  | "past"
  | "conditions"
  | "conflict";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME = /^[\p{L}][\p{L}\s.'’-]{0,59}$/u;

export function validateMonth(value: string, today: Date): "required" | "month" | "past" | null {
  if (!value.trim()) return "required";
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return "month";
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!year || !month || month < 1 || month > 12) return "month";
  const cursor = today.getFullYear() * 12 + today.getMonth();
  const chosen = year * 12 + (month - 1);
  if (chosen < cursor) return "past";
  if (chosen > cursor + 24) return "month";
  return null;
}

export function stepErrors(step: StepId, state: WizardState, today: Date): FieldError[] {
  const errors: FieldError[] = [];
  if (step === "procedure" && !state.procedure) errors.push("required");
  if (step === "package" && !state.packageId) errors.push("required");

  if (step === "health") {
    if (!state.ageBand || !state.bmiBand || state.inMexico === null) errors.push("required");
    if (state.conditions.length === 0) errors.push("conditions");
    if (state.conditions.includes("none") && state.conditions.length > 1) errors.push("conflict");
  }

  if (step === "dates") {
    const monthError = validateMonth(state.month, today);
    if (monthError) errors.push(monthError);
    if (state.companion === null) errors.push("required");
  }

  if (step === "contact") {
    if (!NAME.test(state.firstName.trim()) || !NAME.test(state.lastName.trim())) errors.push("required");
    if (!EMAIL.test(state.email.trim())) errors.push("email");
    if (digitCount(state.phone) < 10) errors.push("phone");
    if (state.city.trim().length < 2 || state.city.trim().length > 80) errors.push("required");
    if (!state.adult) errors.push("adult");
    if (!state.consent) errors.push("consent");
    if (looksLikeCardNumber(state.note) || looksLikeCardNumber(state.phone)) errors.push("card");
  }

  return [...new Set(errors)];
}

export function nextStep(step: StepId): StepId | null {
  const index = STEP_IDS.indexOf(step);
  const following = STEP_IDS[index + 1];
  return following ?? null;
}

export function previousStep(step: StepId): StepId | null {
  const index = STEP_IDS.indexOf(step);
  if (index <= 0) return null;
  return STEP_IDS[index - 1] ?? null;
}
