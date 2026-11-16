import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("favicon.ico", () => {
  it("embeds the existing 32px PNG at the site root", () => {
    const png = readFileSync(join(process.cwd(), "public/assets/brand/favicon-32.png"));
    const ico = readFileSync(join(process.cwd(), "public/favicon.ico"));
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(png.readUInt32BE(16)).toBe(32);
    expect(png.readUInt32BE(20)).toBe(32);
    expect(ico.readUInt16LE(0)).toBe(0);
    expect(ico.readUInt16LE(2)).toBe(1);
    expect(ico.readUInt16LE(4)).toBe(1);
    expect(ico[6]).toBe(32);
    expect(ico[7]).toBe(32);
    expect(ico.readUInt32LE(14)).toBe(png.length);
    expect(ico.readUInt32LE(18)).toBe(22);
    expect(Buffer.compare(ico.subarray(22), png)).toBe(0);
  });
});
