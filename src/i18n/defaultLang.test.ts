import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readLang } from "./index";

function visit(path: string, languages: string[]) {
  window.history.replaceState(null, "", path);
  vi.spyOn(navigator, "languages", "get").mockReturnValue(languages);
  vi.spyOn(navigator, "language", "get").mockReturnValue(languages[0] ?? "");
}

beforeEach(() => window.localStorage.clear());

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.setItem("me-lang", "es");
  window.history.replaceState(null, "", "/");
});

describe("first-visit language", () => {
  it.each([["es-MX"], ["es"], ["fr-CA"], ["en-US"], ["de-DE"]])("opens in English with a %s browser", (code) => {
    visit("/", [code]);
    expect(readLang()).toBe("en");
  });

  it("remembers a saved choice over the English default", () => {
    visit("/", ["en-CA"]);
    window.localStorage.setItem("me-lang", "fr");
    expect(readLang()).toBe("fr");
  });

  it("a language in the path still wins", () => {
    visit("/es/red", ["en-CA"]);
    expect(readLang()).toBe("es");
  });
});
