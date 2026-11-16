import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): [] { return []; }
  },
);
import { Footer } from "../components/Footer";
import { I18nProvider } from "../i18n";
import type { Lang } from "../i18n/types";
import { CalidadPage } from "./CalidadPage";

function renderQuality(lang: Lang) {
  render(
    <I18nProvider initialLang={lang}>
      <MemoryRouter>
        <CalidadPage />
        <Footer />
      </MemoryRouter>
    </I18nProvider>,
  );
}

describe("CalidadPage", () => {
  it.each([
    ["es", "Estándares de Calidad", "de Software", "Calidad del Producto de Software", "Calidad"],
    ["en", "Software Quality", "Standards", "Software Product Quality", "Quality"],
    ["fr", "Normes de qualité", "logicielle", "Qualité du produit logiciel", "Qualité"],
  ] as const)("renders %s from the catalog and links it in the footer", (lang, title, accent, section, footer) => {
    renderQuality(lang);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(title);
    expect(heading).toHaveTextContent(accent);
    expect(screen.getByRole("heading", { level: 2, name: section })).toBeInTheDocument();
    expect(screen.getByText("ISO/IEC 25010")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: footer });
    expect(link).toHaveAttribute("href", "/calidad");
  });
});
