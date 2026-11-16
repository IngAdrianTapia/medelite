import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "../i18n";
import { QuoteWizard } from "./QuoteWizard";

function renderWizard(): void {
  sessionStorage.clear();
  render(
    <I18nProvider>
      <MemoryRouter>
        <QuoteWizard />
      </MemoryRouter>
    </I18nProvider>,
  );
}

describe("QuoteWizard", () => {
  it("walks a knee Essential case to the published planning range", () => {
    renderWizard();
    fireEvent.click(screen.getByRole("radio", { name: /Reemplazo de rodilla/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fireEvent.click(screen.getByRole("radio", { name: /Essential/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    fireEvent.change(screen.getByLabelText("Rango de edad"), { target: { value: "55-69" } });
    fireEvent.change(screen.getByLabelText(/Rango de IMC/), { target: { value: "under-30" } });
    fireEvent.click(screen.getByRole("checkbox", { name: "Ninguna de estas" }));
    fireEvent.click(screen.getByRole("radio", { name: "No" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    fireEvent.change(screen.getByLabelText(/Mes preferido/), { target: { value: "2027-03" } });
    fireEvent.click(screen.getByRole("radio", { name: "No" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText("Apellido"), { target: { value: "Tremblay" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ada@example.com" } });
    fireEvent.change(screen.getByLabelText("Teléfono"), { target: { value: "+1 604 555 0100" } });
    fireEvent.change(screen.getByLabelText(/Ciudad y provincia/), { target: { value: "Vancouver, BC" } });
    fireEvent.click(screen.getByRole("checkbox", { name: /18 años/ }));
    fireEvent.click(screen.getByRole("checkbox", { name: /PIPEDA/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(screen.getByText("CAD 19,500 – CAD 22,000")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /info@medeliteofficial.com/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /info@medeliteofficial.com/ }).closest("form")).toBeNull();
  });

  it("refuses to continue without consent", () => {
    renderWizard();
    fireEvent.click(screen.getByRole("radio", { name: /Otra especialidad/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fireEvent.click(screen.getByRole("radio", { name: /Snowbird/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fireEvent.change(screen.getByLabelText("Rango de edad"), { target: { value: "40-54" } });
    fireEvent.change(screen.getByLabelText(/Rango de IMC/), { target: { value: "30-34" } });
    fireEvent.click(screen.getByRole("checkbox", { name: "Ninguna de estas" }));
    fireEvent.click(screen.getByRole("radio", { name: "Sí" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fireEvent.change(screen.getByLabelText(/Mes preferido/), { target: { value: "2027-06" } });
    fireEvent.click(screen.getByRole("radio", { name: "Sí" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Luis" } });
    fireEvent.change(screen.getByLabelText("Apellido"), { target: { value: "Martín" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "luis@example.com" } });
    fireEvent.change(screen.getByLabelText("Teléfono"), { target: { value: "+1 604 555 0199" } });
    fireEvent.change(screen.getByLabelText(/Ciudad y provincia/), { target: { value: "Victoria, BC" } });
    fireEvent.click(screen.getByRole("checkbox", { name: /18 años/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/consentimiento/i);
  });
});
