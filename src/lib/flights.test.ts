import { describe, expect, it } from "vitest";
import { FARE_DISCLAIMER, illustrateTotal, quoteStaticSample } from "../data/flights";

const request = {
  depart: "2027-03-01",
  returnDate: "2027-03-10",
  adults: 1,
  cabin: "economy" as const,
};

describe("static flight sample", () => {
  it("uses the 14 Nov 2026 PVR sample for YVR, YYC and YYZ", () => {
    const yvr = quoteStaticSample({ ...request, origin: "YVR", destination: "PVR" });
    expect(yvr.available).toBe(true);
    expect(yvr.nonstop).toEqual({ low: 368, high: 559 });
    expect(yvr.connecting).toEqual({ low: 752, high: 1088 });
    expect(yvr.span).toEqual({ low: 368, high: 1088 });
    expect(yvr.currency).toBe("unconfirmed-dollar");

    const yyc = quoteStaticSample({ ...request, origin: "YYC", destination: "PVR" });
    expect(yyc.nonstop?.low).toBe(494.63);
    expect(yyc.span?.high).toBe(892.41);

    const yyz = quoteStaticSample({ ...request, origin: "YYZ", destination: "PVR" });
    expect(yyz.nonstop).toEqual({ low: 650.83, high: 650.83 });
    expect(yyz.span?.high).toBe(1238.83);
  });

  it("does not invent fares for origins or airports without a sample", () => {
    for (const origin of ["YEG", "YUL", "YOW", "YWG"] as const) {
      const quote = quoteStaticSample({ ...request, origin, destination: "PVR" });
      expect(quote.available).toBe(false);
      expect(quote.reason).toBe("no-sample-for-origin");
      expect(quote.span).toBeNull();
    }
    const gdl = quoteStaticSample({ ...request, origin: "YVR", destination: "GDL" });
    expect(gdl.reason).toBe("no-sample-for-airport");
    expect(gdl.span).toBeNull();
  });

  it("does not add the sample to a package unless the currency caveat is explicit", () => {
    const flight = quoteStaticSample({ ...request, origin: "YVR", destination: "PVR" });
    const total = illustrateTotal(flight, { low: 19_500, high: 22_000 });
    expect(total.shown).toBe(true);
    expect(total.currencyUnconfirmed).toBe(true);
    expect(total.low).toBe(19_868);
    expect(total.high).toBe(23_088);
    expect(illustrateTotal(flight, null).shown).toBe(false);
  });

  it("keeps the airline disclaimer phrase", () => {
    expect(FARE_DISCLAIMER).toBe("Estimado · sujeto a confirmación con la aerolínea");
  });
});
