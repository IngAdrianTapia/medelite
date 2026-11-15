import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { UNSAFE_createBrowserHistory, unstable_HistoryRouter as HistoryRouter } from "react-router";
import { AppRoutes } from "./App";
import { I18nProvider, readLang } from "./i18n";
import { registerPwa } from "./pwa";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root");

const tree = (
  <StrictMode>
    <I18nProvider>
      <HistoryRouter history={UNSAFE_createBrowserHistory()}>
        <AppRoutes />
      </HistoryRouter>
    </I18nProvider>
  </StrictMode>
);

const marker = root.dataset.prerender ?? "";
const path = window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
const canHydrate = (marker === "404" || marker === path) && (root.dataset.lang ?? "en") === readLang();

if (canHydrate && root.childElementCount > 0) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}

registerPwa();
