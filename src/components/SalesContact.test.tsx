import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "../i18n";
import { es } from "../i18n/es";
import { en } from "../i18n/en";
import { fr } from "../i18n/fr";
import { SalesContact } from "./SalesContact";

describe("SalesContact", () => {
  it.each([["es", es], ["en", en], ["fr", fr]] as const)("offers an accessible, manual contact route in %s", (lang, messages) => {
    render(<I18nProvider initialLang={lang}><SalesContact /></I18nProvider>);
    expect(screen.getByRole("region", { name: messages.sales.title })).toBeInTheDocument();
    const email = screen.getByRole("button", { name: messages.sales.email });
    email.focus();
    expect(email).toHaveFocus();
    expect(screen.getByRole("link", { name: messages.sales.call })).toHaveAttribute("href", "tel:+16044428475");
    expect(screen.getByText(messages.sales.note, { normalizer: (s) => s })).toBeInTheDocument();
    fireEvent.click(email);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBeGreaterThanOrEqual(2);
  });
});
