import { fireEvent, render, screen } from "@testing-library/react";
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

describe("locale switch", () => {
  it("follows the language control on /calidad instead of restoring the URL language", () => {
    render(
      <I18nProvider initialLang="es">
        <MemoryRouter initialEntries={["/es/calidad"]}>
          <AppRoutes />
        </MemoryRouter>
      </I18nProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Estándares de Calidad");
    fireEvent.click(screen.getByRole("button", { name: "EN, English" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Software Quality Standards");
    fireEvent.click(screen.getByRole("button", { name: "FR, Français" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Normes de qualité logicielle");
  });
});
