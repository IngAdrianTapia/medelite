import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { UNSAFE_createMemoryHistory, unstable_HistoryRouter as HistoryRouter } from "react-router";
import { AppRoutes } from "./App";
import { I18nProvider } from "./i18n";

export function render(url: string): string {
  const history = UNSAFE_createMemoryHistory({ initialEntries: [url] });
  return renderToString(
    <StrictMode>
      <I18nProvider>
        <HistoryRouter history={history}>
          <AppRoutes />
        </HistoryRouter>
      </I18nProvider>
    </StrictMode>,
  );
}
