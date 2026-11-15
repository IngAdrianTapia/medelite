import { Route, Routes } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useI18n } from "./i18n";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function PrivacyRoute() {
  const { m } = useI18n();
  return <LegalPage doc={m.privacy} path="/privacy" />;
}

function TermsRoute() {
  const { m } = useI18n();
  return <LegalPage doc={m.terms} path="/terms" />;
}

export function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyRoute />} />
        <Route path="/privacidad" element={<PrivacyRoute />} />
        <Route path="/terms" element={<TermsRoute />} />
        <Route path="/terminos" element={<TermsRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
