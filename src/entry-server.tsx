import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { UNSAFE_createMemoryHistory, unstable_HistoryRouter as HistoryRouter } from "react-router";
import { AppRoutes } from "./App";
import { I18nProvider } from "./i18n";
import type { Lang } from "./i18n/types";

export function render(url: string, lang: Lang = "en"): string {
  (globalThis as { __ME_LANG?: Lang }).__ME_LANG = lang;
  const history = UNSAFE_createMemoryHistory({ initialEntries: [url] });
  return renderToString(
    <StrictMode>
      <I18nProvider initialLang={lang}>
        <HistoryRouter history={history}>
          <AppRoutes />
        </HistoryRouter>
      </I18nProvider>
    </StrictMode>,
  );
}
