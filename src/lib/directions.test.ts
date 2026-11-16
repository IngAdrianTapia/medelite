import { describe, expect, it } from "vitest";
import { appleDirections, distanceM, formatDistance, googleDirections, wazeDirections } from "./directions";
import { HOSPITAL_LL } from "../data/hospitalCoords";
import { SEDE_POIS } from "../data/sedePois";
import { HOSPITALS } from "../data/hospitals";

const marina = HOSPITAL_LL.marina;

describe("directions", () => {
  it("builds the three app links to the exact coordinate", () => {
    expect(googleDirections(marina)).toBe("https://www.google.com/maps/dir/?api=1&destination=20.6521374,-105.2401758&travelmode=driving");
    expect(appleDirections(marina, "Hospital Joya Marina")).toContain("daddr=20.6521374,-105.2401758");
    expect(wazeDirections(marina)).toBe("https://waze.com/ul?ll=20.6521374,-105.2401758&navigate=yes");
  });

  it("formats distances for people", () => {
    expect(formatDistance(244, "es")).toBe("240 m");
    expect(formatDistance(1534, "es")).toBe("1,5 km".replace(",", "."));
  });

  it("every site has a coordinate and nearby references within 1 km", () => {
    for (const h of HOSPITALS) {
      const ll = HOSPITAL_LL[h.id];
      expect(ll).toBeDefined();
      const pois = SEDE_POIS[h.id];
      expect(pois.length).toBeGreaterThan(4);
      for (const p of pois) {
        expect(Math.abs(distanceM(ll, p) - p.d)).toBeLessThan(5);
        expect(p.d).toBeLessThan(1000);
        expect(p.osm).toMatch(/^(node|way)\/\d+$/);
      }
    }
  });
});
