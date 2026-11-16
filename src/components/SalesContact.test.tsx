import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "../i18n";
import { es } from "../i18n/es";
import { en } from "../i18n/en";
import { fr } from "../i18n/fr";
import { SalesContact } from "./SalesContact";

describe("SalesContact", () => {
  it.each([["es", es], ["en", en], ["fr", fr]] as const)("offers an accessible, manual contact route in %s", (lang, messages) => {
    render(<I18nProvider initialLang={lang}><SalesContact /></I18nProvider>);
    const region = screen.getByRole("region", { name: messages.sales.title });
    expect(region).toBeInTheDocument();
    const email = screen.getByRole("link", { name: messages.sales.email });
    expect(email).toHaveAttribute("href", `mailto:info@medeliteofficial.com?subject=${encodeURIComponent(messages.sales.subject)}`);
    email.focus();
    expect(email).toHaveFocus();
    expect(screen.getByRole("link", { name: messages.sales.call })).toHaveAttribute("href", "tel:+16044428475");
    expect(screen.getByText(messages.sales.note, { normalizer: (s) => s })).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
