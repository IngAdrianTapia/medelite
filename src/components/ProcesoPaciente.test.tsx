import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "../i18n";
import { es } from "../i18n/es";
import { en } from "../i18n/en";
import { fr } from "../i18n/fr";
import { ProcesoPaciente } from "./ProcesoPaciente";

const catalogs = [["es", es], ["en", en], ["fr", fr]] as const;

describe("ProcesoPaciente", () => {
  it.each(catalogs)("shows every step as typographic chapters in %s, not as a dotted timeline", (lang, messages) => {
    const { container } = render(
      <I18nProvider initialLang={lang}>
        <ProcesoPaciente />
      </I18nProvider>,
    );
    const list = screen.getByRole("tablist");
    const tabs = within(list).getAllByRole("tab");
    expect(tabs).toHaveLength(messages.journey.steps.length);
    for (const step of messages.journey.steps) {
      expect(within(list).getByRole("tab", { name: new RegExp(step.title) })).toBeInTheDocument();
    }
    expect(container.querySelectorAll("[class*='rounded-full']").length).toBe(0);
  });

  it("opens the selected scene and keeps prev/next within the journey", () => {
    render(
      <I18nProvider initialLang="es">
        <ProcesoPaciente />
      </I18nProvider>,
    );
    const first = es.journey.steps[0];
    const third = es.journey.steps[2];
    const fourth = es.journey.steps[3];
    const last = es.journey.steps.at(-1);
    if (!first || !third || !fourth || !last) throw new Error("missing steps");

    expect(screen.getByRole("heading", { level: 3, name: first.title })).toBeInTheDocument();
    expect(screen.getByText(first.body)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /anterior/i })).toBeDisabled();

    fireEvent.click(screen.getByRole("tab", { name: new RegExp(third.title) }));
    expect(screen.getByRole("heading", { level: 3, name: third.title })).toBeInTheDocument();
    expect(screen.getByText(third.body)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Riviera Nayarit/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    expect(screen.getByRole("heading", { level: 3, name: fourth.title })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: new RegExp(last.title) }));
    expect(screen.getByRole("heading", { level: 3, name: last.title })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /siguiente/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /anterior/i })).toBeEnabled();
  });
});
