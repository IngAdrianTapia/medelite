import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { ContactDock } from "./components/ContactDock";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { RevealObserver, ZoomLayer } from "./components/ZoomLayer";
import { useI18n } from "./i18n";
import { parseLocalePath, prefixPath } from "./i18n/locale";
import { HomePage } from "./pages/HomePage";
import { CalidadPage } from "./pages/CalidadPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const NetworkPage = lazy(() => import("./pages/NetworkPage").then((module) => ({ default: module.NetworkPage })));
const HospitalPage = lazy(() => import("./pages/HospitalPage").then((module) => ({ default: module.HospitalPage })));
const SpecialtiesPage = lazy(() => import("./pages/SpecialtiesPage").then((module) => ({ default: module.SpecialtiesPage })));
const SpecialtyPage = lazy(() => import("./pages/SpecialtyPage").then((module) => ({ default: module.SpecialtyPage })));
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
const GalleryPage = lazy(() => import("./pages/GalleryPage").then((module) => ({ default: module.GalleryPage })));
const HospitalJoyaPage = lazy(() => import("./pages/HospitalJoyaPage").then((module) => ({ default: module.HospitalJoyaPage })));
const CanadaPage = lazy(() => import("./pages/CanadaPage").then((module) => ({ default: module.CanadaPage })));

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
    <main id="contenido" className="page-shell">
      <p className="text-sm text-muted">…</p>
    </main>
  );
}

function LocaleSync() {
  const { lang, setLang } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const seenLang = useRef(lang);
  useLayoutEffect(() => {
    const parsed = parseLocalePath(location.pathname);
    // A language control changes state before the URL. Follow that choice.
    // A new URL (a link, or Back) still updates the language.
    const chosen = seenLang.current !== lang;
    seenLang.current = lang;
    if (!chosen && parsed.lang && parsed.lang !== lang) {
      setLang(parsed.lang);
      return;
    }
    const target = prefixPath(lang, parsed.path);
    if (target !== location.pathname) {
      navigate({ pathname: target, search: location.search, hash: location.hash }, { replace: true });
    }
  }, [lang, location.hash, location.pathname, location.search, navigate, setLang]);
  return null;
}

// Al navegar dentro del sitio: sube al inicio de la página nueva, o baja al ancla (#cotizar, #faq…)
// cuando el enlace la trae. La primera carga respeta el comportamiento normal del navegador.
function ScrollManager() {
  const location = useLocation();
  const first = useRef(true);
  const path = parseLocalePath(location.pathname).path;
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id) {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    const timer = window.setInterval(() => {
      const target = document.getElementById(id);
      tries += 1;
      if (target || tries > 40) {
        window.clearInterval(timer);
        target?.scrollIntoView();
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [path, location.hash]);
  return null;
}

export function AppRoutes() {
  const location = useLocation();
  const stripped = { ...location, pathname: parseLocalePath(location.pathname).path };
  return (
    <>
      <LocaleSync />
      <ScrollManager />
      <Header />
      <div>
        <Suspense fallback={<Pending />}>
          <Routes location={stripped}>
            <Route path="/" element={<HomePage />} />
            <Route path="/hospital-joya" element={<HospitalJoyaPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/red" element={<NetworkPage />} />
            <Route path="/red/:hospitalId" element={<HospitalPage />} />
            <Route path="/especialidades" element={<SpecialtiesPage />} />
            <Route path="/especialidades/:specialtyId" element={<SpecialtyPage />} />
            <Route path="/bariatrica" element={<BariatricPage />} />
            <Route path="/vuelos" element={<FlightsPage />} />
            <Route path="/seguros" element={<InsurancePage />} />
            <Route path="/que-es" element={<RolePage />} />
            <Route path="/canada" element={<CanadaPage />} />
            <Route path="/preparacion" element={<PreparePage />} />
            <Route path="/ruta" element={<RoutePage />} />
            <Route path="/comparar" element={<ComparePage />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/equipo" element={<PeoplePage />} />
            <Route path="/hospitales" element={<JoinPage />} />
            <Route path="/privacy" element={<PrivacyRoute />} />
            <Route path="/privacidad" element={<PrivacyRoute />} />
            <Route path="/calidad" element={<CalidadPage />} />
            <Route path="/terms" element={<TermsRoute />} />
            <Route path="/terminos" element={<TermsRoute />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <ContactDock />
      <ZoomLayer />
      <RevealObserver />
    </>
  );
}
