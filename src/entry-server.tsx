import { StrictMode } from "react";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { UNSAFE_createMemoryHistory, unstable_HistoryRouter as HistoryRouter } from "react-router";
import { AppRoutes } from "./App";
import { I18nProvider } from "./i18n";
import type { Lang } from "./i18n/types";

/** Resolve lazy route modules before producing static HTML without Suspense fallbacks or hydration scripts. */
export function render(url: string, lang: Lang = "en"): Promise<string> {
  (globalThis as { __ME_LANG?: Lang }).__ME_LANG = lang;
  const history = UNSAFE_createMemoryHistory({ initialEntries: [url] });
  const page = (
    <StrictMode>
      <I18nProvider initialLang={lang}>
        <HistoryRouter history={history}>
          <AppRoutes />
        </HistoryRouter>
      </I18nProvider>
    </StrictMode>
  );
  return new Promise((resolve, reject) => {
    let complete = false;
    let renderError: Error | null = null;
    const finish = (error?: Error, html?: string) => {
      if (complete) return;
      complete = true;
      clearTimeout(timeout);
      if (error) reject(error);
      else resolve(html ?? "");
    };
    const { abort } = renderToPipeableStream(page, {
      onAllReady() {
        if (complete) return;
        if (renderError) return finish(renderError);
        try {
          // React.lazy is now resolved. The second render has real markup rather than
          // the streaming protocol's hidden content and inline reveal scripts.
          finish(undefined, renderToString(page));
        } catch (error) {
          finish(error instanceof Error ? error : new Error(String(error)));
        }
      },
      onShellError(error) {
        finish(error instanceof Error ? error : new Error(String(error)));
      },
      onError(error) {
        renderError ??= error instanceof Error ? error : new Error(String(error));
      },
    });
    const timeout = setTimeout(() => {
      abort();
      finish(new Error(`Static rendering timed out: ${url}`));
    }, 15_000);
  });
}
