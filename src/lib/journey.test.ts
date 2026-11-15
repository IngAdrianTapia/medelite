import { describe, expect, it } from "vitest";
import { buildItinerary, journeySearch, matchLine, readJourneySearch, readiness } from "./journey";

describe("Mi Ruta", () => {
  it("builds a travel bundle and a snowbird bundle", () => {
    const travel = buildItinerary({
      origin: "YVR",
      line: "knee",
      packageId: "essential",
      month: "2027-03",
      hospitalId: "marina",
    }).map((step) => step.id);
    expect(travel).toEqual(["depart", "transfer", "preop", "surgery", "hospital", "hotel", "fit-to-fly", "return", "aftercare"]);
    const local = buildItinerary({
      origin: "YVR",
      line: "knee",
      packageId: "snowbird",
      month: "2027-03",
      hospitalId: "marina",
    }).map((step) => step.id);
    expect(local).not.toContain("depart");
    expect(local).not.toContain("hotel");
    expect(local).toContain("aftercare");
  });

  it("round-trips the share link", () => {
    const input = {
      origin: "YYZ" as const,
      line: "hip" as const,
      packageId: "executive" as const,
      month: "2027-04",
      hospitalId: "marina" as const,
    };
    const back = readJourneySearch(new URLSearchParams(journeySearch(input).split("?")[1]));
    expect(back).toEqual(input);
  });
});

describe("match", () => {
  it("sends bariatric surgery to Riviera and the published bariatric names", () => {
    const match = matchLine("bariatric", "YVR");
    expect(match.hospitalId).toBe("riviera");
    expect(match.people).toContain("armando-joya");
    expect(match.comingSoon).toBe(false);
  });

  it("does not invent a dentist or a fertility specialist", () => {
    expect(matchLine("dental", "YUL").comingSoon).toBe(true);
    expect(matchLine("dental", "YUL").people).toEqual([]);
    expect(matchLine("fertility", "YOW").hospitalId).toBeNull();
  });

  it("names Marina for a knee because the hospital page lists orthopedics, and names no surgeon", () => {
    const match = matchLine("knee", "YVR");
    expect(match.hospitalId).toBe("marina");
    expect(match.people).toEqual([]);
    expect(match.why).toBe("ortho");
  });
});

describe("readiness", () => {
  it("counts documents and never treats BMI as clearance", () => {
    const result = readiness({ line: "bariatric", bmi: "40-plus", passport: true, adult: true, month: true });
    expect(result.readyCount).toBe(3);
    expect(result.items.find((item) => item.id === "bmi")?.state).toBe("review");
    expect(result.items.find((item) => item.id === "surgeon")?.state).toBe("info");
  });
});
