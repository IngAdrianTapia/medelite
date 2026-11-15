import { describe, expect, it } from "vitest";
import * as flights from "../data/flights";
import { HOSPITAL_AIRPORT, ORIGIN_CODES } from "../data/flights";

describe("flight data", () => {
  it("keeps the planning airports the UI uses and does not publish sample fares", () => {
    expect(ORIGIN_CODES).toEqual(["YVR", "YYC", "YEG", "YYZ", "YUL", "YOW", "YWG"]);
    expect(HOSPITAL_AIRPORT.marina).toBe("PVR");
    expect(HOSPITAL_AIRPORT.riviera).toBe("PVR");
    expect(HOSPITAL_AIRPORT.guadalajara).toBe("GDL");
    expect(HOSPITAL_AIRPORT.sma).toBe("BJX");
    expect(HOSPITAL_AIRPORT.queretaro).toBe("QRO");
    expect(HOSPITAL_AIRPORT.cancun).toBe("CUN");
    expect(HOSPITAL_AIRPORT.playa).toBe("CUN");

    expect(flights).not.toHaveProperty("PVR_SAMPLES");
    expect(flights).not.toHaveProperty("quoteStaticSample");
    expect(flights).not.toHaveProperty("illustrateTotal");
    expect(flights).not.toHaveProperty("formatSampleAmount");
    expect(JSON.stringify(flights)).not.toMatch(/\b368\b|\b494\.63\b|\b650\.83\b|\b1088\b|\b1238\.83\b/);
  });
});
