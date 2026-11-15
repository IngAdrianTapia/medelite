import { describe, expect, it } from "vitest";
import { PACKAGE_BANDS } from "../data/packages";
import { estimateQuote } from "./estimate";
import { buildMailto, leadBody, looksLikeCardNumber } from "./lead";
import { EMPTY_WIZARD, stepErrors, validateMonth, type WizardState } from "./wizard";

const TODAY = new Date(2026, 10, 14);

function ready(overrides: Partial<WizardState> = {}): WizardState {
  return {
    ...EMPTY_WIZARD,
    procedure: "knee",
    packageId: "essential",
    ageBand: "55-69",
    bmiBand: "30-34",
    conditions: ["none"],
    inMexico: false,
    month: "2027-02",
    flexible: true,
    companion: false,
    firstName: "Ada",
    lastName: "Tremblay",
    email: "ada@example.com",
    phone: "+1 (604) 555-0100",
    city: "Vancouver, BC",
    note: "",
    consent: true,
    adult: true,
    ...overrides,
  };
}

describe("estimateQuote", () => {
  it("uses the published knee bands for each package", () => {
    for (const packageId of ["snowbird", "essential", "executive"] as const) {
      const estimate = estimateQuote({
        procedure: "knee",
        packageId,
        bmiBand: "under-30",
        conditions: ["none"],
        inMexico: true,
      });
      expect(estimate.kind).toBe("range");
      expect(estimate.low).toBe(PACKAGE_BANDS[packageId].low);
      expect(estimate.high).toBe(PACKAGE_BANDS[packageId].high);
      expect(estimate.basis).toBe("knee-plan");
      expect(estimate.flags).toEqual([]);
    }
  });

  it("shows hip in the same knee band and labels it", () => {
    const estimate = estimateQuote({
      procedure: "hip",
      packageId: "essential",
      bmiBand: "under-30",
      conditions: ["none"],
      inMexico: false,
    });
    expect(estimate.low).toBe(19_500);
    expect(estimate.high).toBe(22_000);
    expect(estimate.flags).toContain("hip-same-band");
  });

  it("widens only the top of the band by 8% when a condition or BMI of 40+ is reported", () => {
    const estimate = estimateQuote({
      procedure: "knee",
      packageId: "essential",
      bmiBand: "40-plus",
      conditions: ["diabetes"],
      inMexico: false,
    });
    expect(estimate.low).toBe(19_500);
    expect(estimate.high).toBe(Math.round(22_000 * 1.08));
    expect(estimate.flags).toContain("complexity");
  });

  it("does not invent a price for bariatric, plastic, ophthalmology or other care", () => {
    for (const procedure of ["bariatric", "plastic", "ophthalmology", "other"] as const) {
      const estimate = estimateQuote({
        procedure,
        packageId: "executive",
        bmiBand: "under-30",
        conditions: ["none"],
        inMexico: true,
      });
      expect(estimate).toMatchObject({
        kind: "on-request",
        low: null,
        high: null,
        basis: "none",
      });
    }
  });

  it("flags a Snowbird request from someone who is not already in Mexico", () => {
    const estimate = estimateQuote({
      procedure: "knee",
      packageId: "snowbird",
      bmiBand: "under-30",
      conditions: ["none"],
      inMexico: false,
    });
    expect(estimate.flags).toContain("snowbird-not-in-mexico");
  });
});

describe("wizard steps", () => {
  it("requires each step before the next", () => {
    expect(stepErrors("procedure", EMPTY_WIZARD, TODAY)).toContain("required");
    expect(stepErrors("health", ready({ conditions: [] }), TODAY)).toContain("conditions");
    expect(stepErrors("health", ready({ conditions: ["none", "heart"] }), TODAY)).toContain("conflict");
    expect(stepErrors("dates", ready({ month: "2020-01" }), TODAY)).toContain("past");
    expect(validateMonth("2026-11", TODAY)).toBeNull();
    expect(stepErrors("contact", ready({ consent: false }), TODAY)).toContain("consent");
    expect(stepErrors("contact", ready({ adult: false }), TODAY)).toContain("adult");
    expect(stepErrors("contact", ready({ email: "not-an-email" }), TODAY)).toContain("email");
    expect(stepErrors("contact", ready(), TODAY)).toEqual([]);
  });

  it("rejects card numbers in the note", () => {
    expect(looksLikeCardNumber("my card is 4111 1111 1111 1111")).toBe(true);
    expect(stepErrors("contact", ready({ note: "4111111111111111" }), TODAY)).toContain("card");
  });
});

describe("mailto lead", () => {
  it("addresses only the published inbox and carries the consent line", () => {
    const payload = buildMailto(
      "MedElite estimate — coordination request",
      leadBody([
        "Consent: PIPEDA, PIPA (BC) and LFPDPPP accepted.",
        "Procedure: knee",
        "Estimate: CAD 19,500 – CAD 22,000",
      ]),
    );
    expect(payload.action).toBe("mailto:info@medeliteofficial.com");
    expect(payload.body).toContain("PIPEDA");
    expect(payload.body).toContain("LFPDPPP");
    expect(payload.body.toLowerCase()).not.toContain("api_key");
    expect(payload.body).not.toContain("Bearer ");
    expect(JSON.stringify(payload)).not.toMatch(/sk_live|secret/i);
  });
});
