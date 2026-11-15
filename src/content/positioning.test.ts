import { describe, expect, it } from "vitest";
import { CANADA_CITIES, FIVE_STAR, POSITIONING_STATUS, PRICE_GAPS, publishedCities } from "./positioning";

describe("positioning slots", () => {
  it("waits for the marketing brief before new claims", () => {
    expect(POSITIONING_STATUS).toBe("awaiting-brief");
    expect(FIVE_STAR).toBeNull();
    expect(PRICE_GAPS).toBeNull();
  });

  it("publishes only cities that already have a name", () => {
    expect(publishedCities().map((city) => city.id)).toEqual(["vancouver"]);
    for (const city of CANADA_CITIES) {
      if (city.status === "awaiting-brief") expect(city.label.en).toBe("");
    }
  });
});
