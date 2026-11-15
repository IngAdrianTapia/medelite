import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ContactDock } from "./components/ContactDock";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useI18n } from "./i18n";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const NetworkPage = lazy(() => import("./pages/NetworkPage").then((module) => ({ default: module.NetworkPage })));
const HospitalPage = lazy(() => import("./pages/HospitalPage").then((module) => ({ default: module.HospitalPage })));
const SpecialtiesPage = lazy(() => import("./pages/SpecialtiesPage").then((module) => ({ default: module.SpecialtiesPage })));
const BariatricPage = lazy(() => import("./pages/BariatricPage").then((module) => ({ default: module.BariatricPage })));
const FlightsPage = lazy(() => import("./pages/FlightsPage").then((module) => ({ default: module.FlightsPage })));
const InsurancePage = lazy(() => import("./pages/InsurancePage").then((module) => ({ default: module.InsurancePage })));
const RolePage = lazy(() => import("./pages/RolePage").then((module) => ({ default: module.RolePage })));
const PreparePage = lazy(() => import("./pages/PreparePage").then((module) => ({ default: module.PreparePage })));
const RoutePage = lazy(() => import("./pages/RoutePage").then((module) => ({ default: module.RoutePage })));
const ComparePage = lazy(() => import("./pages/ComparePage").then((module) => ({ default: module.ComparePage })));
const MapPage = lazy(() => import("./pages/MapPage").then((module) => ({ default: module.MapPage })));
const PeoplePage = lazy(() => import("./pages/PeoplePage").then((module) => ({ default: module.PeoplePage })));
const JoinPage = lazy(() => import("./pages/JoinPage").then((module) => ({ default: module.JoinPage })));

function PrivacyRoute() {
  const { m } = useI18n();
  return <LegalPage doc={m.privacy} path="/privacy" />;
}

function TermsRoute() {
  const { m } = useI18n();
  return <LegalPage doc={m.terms} path="/terms" />;
}

function Pending() {
  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-20 md:py-24">
      <p className="text-sm text-muted">…</p>
    </main>
  );
}

export function AppRoutes() {
  return (
    <>
      <Header />
      <div className="pb-24">
        <Suspense fallback={<Pending />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/red" element={<NetworkPage />} />
            <Route path="/red/:hospitalId" element={<HospitalPage />} />
            <Route path="/especialidades" element={<SpecialtiesPage />} />
            <Route path="/bariatrica" element={<BariatricPage />} />
            <Route path="/vuelos" element={<FlightsPage />} />
            <Route path="/seguros" element={<InsurancePage />} />
            <Route path="/que-es" element={<RolePage />} />
            <Route path="/preparacion" element={<PreparePage />} />
            <Route path="/ruta" element={<RoutePage />} />
            <Route path="/comparar" element={<ComparePage />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/equipo" element={<PeoplePage />} />
            <Route path="/hospitales" element={<JoinPage />} />
            <Route path="/privacy" element={<PrivacyRoute />} />
            <Route path="/privacidad" element={<PrivacyRoute />} />
            <Route path="/terms" element={<TermsRoute />} />
            <Route path="/terminos" element={<TermsRoute />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <ContactDock />
    </>
  );
}
