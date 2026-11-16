import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { AppRoutes } from "./App";
import { I18nProvider } from "./i18n";

vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): [] { return []; }
  },
);

// The language buttons do a full page load to the equivalent prerendered page
// (window.location.assign), which jsdom cannot follow. Check each localized URL instead.
describe("/calidad in each language", () => {
  it.each([
    ["es", "/es/calidad", "Estándares de Calidad"],
    ["en", "/en/calidad", "Software Quality Standards"],
    ["fr", "/fr/calidad", "Normes de qualité logicielle"],
  ] as const)("renders %s", (lang, path, heading) => {
    render(
      <I18nProvider initialLang={lang}>
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      </I18nProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(heading);
  });
});
