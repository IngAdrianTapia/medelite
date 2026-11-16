import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "../i18n";
import { en } from "../i18n/en";
import { es } from "../i18n/es";
import { fr } from "../i18n/fr";
import type { Lang, Messages } from "../i18n/types";
import { Header } from "./Header";

const CATALOGS: Record<Lang, Messages> = { es, en, fr };

function renderHeader(lang: Lang) {
  render(
    <I18nProvider initialLang={lang}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </I18nProvider>,
  );
}

describe("header destinations", () => {
  it.each(["es", "en", "fr"] as const)("keeps Contact and the quote call on different sections in %s", (lang) => {
    const messages = CATALOGS[lang];
    renderHeader(lang);
    fireEvent.click(screen.getByRole("button", { name: messages.nav.menu }));
    const prefix = lang === "en" ? "" : `/${lang}`;
    const contact = screen.getAllByRole("link", { name: messages.nav.contact });
    expect(contact.length).toBeGreaterThan(0);
    for (const link of contact) {
      expect(link).toHaveAttribute("href", `${prefix}/#orientacion`);
    }
    expect(screen.getByRole("link", { name: messages.hero.ctaQuote })).toHaveAttribute("href", "/#cotizar");
  });
});
