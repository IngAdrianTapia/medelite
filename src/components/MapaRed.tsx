import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { GeoJSONSource, Map as MlMap, Marker as MlMarker, StyleSpecification } from "maplibre-gl";
import { HOSPITAL_AIRPORT } from "../data/flights";
import { HOSPITAL_LL } from "../data/hospitalCoords";
import { HOSPITALS, type HospitalId } from "../data/hospitals";
import { SEDE_POIS, type Poi } from "../data/sedePois";
import { appleDirections, distanceM, formatDistance, formatDuration, googleDirections, wazeDirections } from "../lib/directions";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";
import { FacilityPhoto } from "./FacilityPhoto";
import { poiFamily, poiIconSvg, poiLabel } from "./poiIcons";

type Lang = "es" | "en" | "fr";
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
const ROUTER = "https://routing.openstreetmap.de/routed-car/route/v1/driving";
const ORDER: readonly HospitalId[] = ["marina", "riviera", "penita", "guadalajara", "chapala", "sma", "queretaro", "cancun", "playa"];
const BEARING: Record<HospitalId, number> = { marina: -28, riviera: 18, penita: -12, guadalajara: 24, chapala: -16, sma: 30, queretaro: -22, cancun: 14, playa: -18 };

const UI = {
  es: {
    map: "Croquis interactivo de la sede", sites: "Sedes", go: "Cómo llegar", route: "Ruta desde mi ubicación", routing: "Calculando la ruta…",
    denied: "Sin permiso de ubicación. Abra la ruta en Google Maps, Apple Maps o Waze.", failed: "No se pudo trazar la ruta aquí. Ábrala en su app de mapas.",
    byCar: "en auto", estimate: "estimado", near: "Referencias cercanas", page: "Ver la sede", airport: "Aeropuerto", d3: "3D", d2: "2D", from: "a",
    note: "Calles y lugares reales de OpenStreetMap. Logos solo cuando OSM enlaza la marca con Wikidata.", loading: "Cargando el croquis…",
  },
  en: {
    map: "Interactive street map of the hospital", sites: "Hospitals", go: "Directions", route: "Route from my location", routing: "Finding the route…",
    denied: "Location permission was not given. Open directions in Google Maps, Apple Maps or Waze.", failed: "The route could not be drawn here. Open it in your maps app.",
    byCar: "by car", estimate: "estimate", near: "Nearby landmarks", page: "View hospital", airport: "Airport", d3: "3D", d2: "2D", from: "",
    note: "Real streets and places from OpenStreetMap. Logos only where OSM links the brand to Wikidata.", loading: "Loading the map…",
  },
  fr: {
    map: "Plan interactif de l’établissement", sites: "Établissements", go: "Itinéraire", route: "Itinéraire depuis ma position", routing: "Calcul de l’itinéraire…",
    denied: "Position non autorisée. Ouvrez l’itinéraire dans Google Maps, Plans ou Waze.", failed: "Impossible de tracer l’itinéraire ici. Ouvrez-le dans votre application de cartes.",
    byCar: "en voiture", estimate: "estimation", near: "Repères à proximité", page: "Voir l’établissement", airport: "Aéroport", d3: "3D", d2: "2D", from: "à",
    note: "Rues et lieux réels d’OpenStreetMap. Logos seulement si OSM relie la marque à Wikidata.", loading: "Chargement du plan…",
  },
} as const;

type Layer = StyleSpecification["layers"][number] & { layout?: Record<string, unknown>; paint?: Record<string, unknown>; "source-layer"?: string };

/** Street names in their real (Spanish) form, larger and dark so they read like a sketch map. */
function patchStyle(style: StyleSpecification, lang: Lang): StyleSpecification {
  for (const layer of style.layers as Layer[]) {
    if (layer.type !== "symbol" || !layer.layout || !("text-field" in layer.layout)) continue;
    const sl = layer["source-layer"];
    if (sl === "transportation_name" && !layer.id.includes("shield")) {
      layer.layout["text-field"] = ["get", "name"];
      layer.layout["text-font"] = ["Noto Sans Bold"];
      layer.layout["text-size"] = ["interpolate", ["linear"], ["zoom"], 13, 12, 15, 14, 17, 16.5, 19, 18];
      layer.layout["text-max-angle"] = 38;
      layer.paint = { ...layer.paint, "text-color": "#0a2540", "text-halo-color": "#ffffff", "text-halo-width": 2.4, "text-halo-blur": 0 };
      if (layer.id === "highway-name-minor") layer.minzoom = 14;
    } else if (sl === "poi") {
      layer.layout["text-field"] = ["get", "name"];
      layer.layout["text-size"] = 12;
      layer.paint = { ...layer.paint, "text-color": "#46566a", "text-halo-color": "#ffffff", "text-halo-width": 1.6 };
    } else {
      layer.layout["text-field"] = ["coalesce", ["get", `name:${lang}`], ["get", "name"]];
    }
  }
  return style;
}

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function el(tag: string, className: string, text?: string) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

function shortName(name: string) {
  return name.replace("Hospital Joya ", "");
}

type RouteState = { kind: "idle" } | { kind: "busy" } | { kind: "ok"; m: number; s: number } | { kind: "error"; msg: string };

export function MapaRed({ title, headingLevel = 3 }: { title?: string; headingLevel?: 2 | 3 }) {
  const { lang } = useI18n();
  const t = UI[lang];
  const [siteId, setSiteId] = useState<HospitalId>("marina");
  const [ready, setReady] = useState(false);
  const [tilt, setTilt] = useState(true);
  const [route, setRoute] = useState<RouteState>({ kind: "idle" });
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const libRef = useRef<typeof import("maplibre-gl") | null>(null);
  const markers = useRef<MlMarker[]>([]);
  const routeAnim = useRef(0);
  const baseFilters = useRef(new Map<string, unknown>());
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const site = HOSPITALS.find((h) => h.id === siteId) ?? (HOSPITALS[0] as (typeof HOSPITALS)[number]);
  const ll = HOSPITAL_LL[site.id];
  const pois = SEDE_POIS[site.id];

  // Create the map only when it is about to be seen: MapLibre is loaded on demand.
  useEffect(() => {
    const node = box.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    let cancelled = false;
    let map: MlMap | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        void (async () => {
          const [lib, workerUrl, styleJson] = await Promise.all([
            import("maplibre-gl"),
            import("maplibre-gl/dist/maplibre-gl-worker.mjs?url").then((m: { default: string }) => m.default),
            fetch(STYLE_URL).then((r) => r.json() as Promise<StyleSpecification>),
            import("maplibre-gl/dist/maplibre-gl.css"),
          ]);
          if (cancelled || !box.current) return;
          lib.setWorkerUrl(workerUrl);
          libRef.current = lib;
          const first = HOSPITAL_LL.marina;
          const touch = window.matchMedia("(pointer: coarse)").matches;
          map = new lib.Map({
            container: box.current,
            style: patchStyle(styleJson, lang),
            center: [first.lng, first.lat],
            zoom: 13.2,
            pitch: 0,
            bearing: 0,
            maxPitch: 70,
            scrollZoom: false,
            cooperativeGestures: touch,
            attributionControl: { compact: true, customAttribution: "Lugares © OpenStreetMap · Logos: Wikimedia Commons · Rutas: FOSSGIS OSRM" },
          });
          map.addControl(new lib.NavigationControl({ visualizePitch: true }), "top-right");
          map.on("load", () => {
            if (cancelled) return;
            box.current?.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show");
            for (const layer of map?.getStyle().layers ?? []) if ((layer as Layer)["source-layer"] === "poi" && "filter" in layer) baseFilters.current.set(layer.id, layer.filter);
            mapRef.current = map ?? null;
            setReady(true);
          });
        })();
      },
      { rootMargin: "300px" },
    );
    io.observe(node);
    return () => {
      cancelled = true;
      io.disconnect();
      cancelAnimationFrame(routeAnim.current);
      markers.current.forEach((m) => m.remove());
      markers.current = [];
      map?.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, [lang]);

  // Fly to the selected site and draw its real references.
  useEffect(() => {
    const map = mapRef.current;
    const lib = libRef.current;
    if (!ready || !map || !lib) return;
    markers.current.forEach((m) => m.remove());
    markers.current = [];
    clearRoute(map);
    // Our own markers carry the real references; hide the same names in the base map so they do not repeat.
    const names = ["literal", pois.map((p) => p.name)];
    for (const [id, filter] of baseFilters.current) {
      if (map.getLayer(id)) map.setFilter(id, ["all", filter as never, ["!", ["in", ["get", "name"], names as never]]] as never);
    }
    const narrow = window.innerWidth < 640;

    for (const h of HOSPITALS) {
      const p = HOSPITAL_LL[h.id];
      const on = h.id === site.id;
      const node = el("button", on ? "mr-sede is-on" : "mr-sede");
      node.setAttribute("type", "button");
      node.setAttribute("aria-label", h.name);
      if (on) node.append(el("span", "mr-pulse"));
      node.append(el("span", "mr-pin", "H"), el("span", "mr-tag", on ? h.name : shortName(h.name)));
      node.addEventListener("click", () => setSiteId(h.id));
      markers.current.push(new lib.Marker({ element: node, anchor: "bottom" }).setLngLat([p.lng, p.lat]).addTo(map));
    }

    for (const poi of narrow ? pois.slice(0, 10) : pois) {
      const node = el("button", poi.logo ? "mr-poi has-logo" : "mr-poi");
      node.setAttribute("type", "button");
      node.setAttribute("aria-label", `${poi.name}, ${poiLabel(poi.cat, lang)}, ${formatDistance(poi.d, lang)}`);
      if (poi.logo) {
        const badge = el("span", "mr-logo");
        const img = document.createElement("img");
        img.src = `/assets/logos/${poi.logo}.png`;
        img.alt = "";
        img.decoding = "async";
        badge.append(img);
        node.append(badge);
      } else {
        const ico = el("span", "mr-ico");
        ico.style.background = poiFamily(poi.cat).color;
        ico.innerHTML = poiIconSvg(poi.cat, 15);
        node.append(ico);
      }
      node.append(el("span", "mr-name", poi.name));
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        openPoi(poi);
      });
      markers.current.push(new lib.Marker({ element: node, anchor: "left", offset: [-14, 0] }).setLngLat([poi.lng, poi.lat]).addTo(map));
    }

    map.flyTo({ center: [ll.lng, ll.lat], zoom: 16.3, pitch: tilt ? 58 : 0, bearing: BEARING[site.id], duration: reducedMotion() ? 0 : 3400, curve: 1.55, essential: true });
    setRoute({ kind: "idle" });
    // tilt is read at fly time only; toggling it eases on its own.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, site.id, lang]);

  function openPoi(poi: Poi) {
    const map = mapRef.current;
    const lib = libRef.current;
    if (!map || !lib) return;
    const wrap = el("div", "mr-pop");
    wrap.append(el("strong", "", poi.name), el("span", "", `${poiLabel(poi.cat, lang)} · ${t.from} ${formatDistance(poi.d, lang)}`.replace(" ·  ", " · ")));
    new lib.Popup({ offset: 18, closeButton: false, maxWidth: "240px" }).setLngLat([poi.lng, poi.lat]).setDOMContent(wrap).addTo(map);
    map.easeTo({ center: [(poi.lng + ll.lng) / 2, (poi.lat + ll.lat) / 2], zoom: Math.max(map.getZoom(), 16.6), duration: reducedMotion() ? 0 : 900 });
  }

  function clearRoute(map: MlMap) {
    cancelAnimationFrame(routeAnim.current);
    for (const id of ["ruta-line", "ruta-casing"]) if (map.getLayer(id)) map.removeLayer(id);
    if (map.getSource("ruta")) map.removeSource("ruta");
  }

  function toggleTilt() {
    const next = !tilt;
    setTilt(next);
    mapRef.current?.easeTo({ pitch: next ? 58 : 0, bearing: next ? BEARING[site.id] : 0, duration: reducedMotion() ? 0 : 900 });
  }

  function traceRoute() {
    const map = mapRef.current;
    const lib = libRef.current;
    if (!navigator.geolocation) {
      setRoute({ kind: "error", msg: t.denied });
      return;
    }
    setRoute({ kind: "busy" });
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const me = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        try {
          const res = await fetch(`${ROUTER}/${me.lng},${me.lat};${ll.lng},${ll.lat}?overview=full&geometries=geojson`);
          if (!res.ok) throw new Error(String(res.status));
          const data = (await res.json()) as { routes?: { distance: number; duration: number; geometry: { coordinates: [number, number][] } }[] };
          const r = data.routes?.[0];
          if (!r || !map || !lib) throw new Error("no route");
          clearRoute(map);
          const coords = r.geometry.coordinates;
          map.addSource("ruta", { type: "geojson", data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords.slice(0, 2) } } });
          map.addLayer({ id: "ruta-casing", type: "line", source: "ruta", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#ffffff", "line-width": 9 } });
          map.addLayer({ id: "ruta-line", type: "line", source: "ruta", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#00788f", "line-width": 5 } });
          const meDot = el("span", "mr-me");
          markers.current.push(new lib.Marker({ element: meDot }).setLngLat([me.lng, me.lat]).addTo(map));
          const bounds = new lib.LngLatBounds([me.lng, me.lat], [me.lng, me.lat]);
          coords.forEach((c) => bounds.extend(c));
          map.fitBounds(bounds, { padding: 70, pitch: 0, bearing: 0, duration: reducedMotion() ? 0 : 1400 });
          const t0 = performance.now();
          const step = (now: number) => {
            const k = reducedMotion() ? 1 : Math.min(1, (now - t0) / 1600);
            const n = Math.max(2, Math.round(coords.length * k));
            (map.getSource("ruta") as GeoJSONSource | undefined)?.setData({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords.slice(0, n) } });
            if (k < 1) routeAnim.current = requestAnimationFrame(step);
          };
          routeAnim.current = requestAnimationFrame(step);
          setRoute({ kind: "ok", m: r.distance, s: r.duration });
        } catch {
          setRoute({ kind: "error", msg: `${t.failed} (${formatDistance(distanceM(me, ll), lang)})` });
        }
      },
      () => setRoute({ kind: "error", msg: t.denied }),
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 300_000 },
    );
  }

  return (
    <div className="mr-wrap">
      {title ? <Heading className="sr-only">{title}</Heading> : null}
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0" role="group" aria-label={t.sites}>
        {ORDER.map((id) => {
          const h = HOSPITALS.find((row) => row.id === id);
          if (!h) return null;
          const on = id === site.id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => setSiteId(id)}
              className={`group relative h-16 w-36 shrink-0 overflow-hidden rounded-2xl text-left transition-[transform,box-shadow] duration-300 ${on ? "ring-2 ring-teal ring-offset-2 ring-offset-ivory" : "opacity-80 hover:opacity-100"}`}
            >
              <FacilityPhoto name={id} fill alt="" sizes="9rem" />
              <span className="absolute inset-0 bg-navy/55" aria-hidden="true" />
              <span className="absolute inset-x-3 bottom-2 text-[13px] font-semibold leading-tight text-white">{shortName(h.name)}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-[#eef0ea] shadow-premium">
          <div ref={box} className="h-[30rem] w-full sm:h-[36rem] lg:h-[40rem]" role="region" aria-label={`${t.map}: ${site.name}`} data-nozoom />
          {!ready ? <p className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-muted">{t.loading}</p> : null}
          <button type="button" onClick={toggleTilt} className="absolute bottom-4 left-4 grid h-11 min-w-11 place-items-center rounded-full bg-white px-4 text-sm font-semibold text-navy shadow-premium">
            {tilt ? t.d2 : t.d3}
          </button>
        </div>

        <aside aria-live="polite" className="flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white">
          <div className="relative aspect-[16/9] bg-soft" data-gallery="mapa">
            <FacilityPhoto key={site.id} name={site.id} fill alt={PHOTO_OF[site.id]?.[lang] ?? site.name} sizes="22rem" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="font-serif text-2xl leading-tight text-navy">{site.name}</p>
            <p className="mt-1 text-xs text-muted">{site.city} · {t.airport} {HOSPITAL_AIRPORT[site.id]}</p>
            <p className="mt-3 text-[13px] leading-snug text-ink/80">{site.address}</p>

            <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-teal uppercase">{t.go}</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <a className="mr-app" href={googleDirections(ll)} target="_blank" rel="noopener noreferrer">Google Maps</a>
              <a className="mr-app" href={appleDirections(ll, site.name)} target="_blank" rel="noopener noreferrer">Apple Maps</a>
              <a className="mr-app" href={wazeDirections(ll)} target="_blank" rel="noopener noreferrer">Waze</a>
            </div>
            <button type="button" onClick={traceRoute} disabled={!ready || route.kind === "busy"} className="btn btn-primary mt-3 min-h-12 w-full justify-center">
              {route.kind === "busy" ? t.routing : t.route}
            </button>
            {route.kind === "ok" ? (
              <p className="mt-2 text-sm font-medium text-navy">
                {formatDuration(route.s, lang)} · {formatDistance(route.m, lang)} {t.byCar} <span className="text-muted">({t.estimate})</span>
              </p>
            ) : null}
            {route.kind === "error" ? <p className="mt-2 text-sm text-warn">{route.msg}</p> : null}

            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
              {site.phones[0] ? <a className="link-line font-medium text-teal" href={`tel:${site.phones[0].tel}`}>{site.phones[0].label}</a> : null}
              <Link className="link-line font-semibold text-navy" to={`/red/${site.id}`}>{t.page} →</Link>
            </p>
          </div>
        </aside>
      </div>

      <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-teal uppercase">{t.near}</p>
      <ul className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        {pois.map((poi) => (
          <li key={poi.osm} className="shrink-0">
            <button type="button" onClick={() => openPoi(poi)} className="flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pr-4 pl-1.5 text-left transition-colors hover:border-navy">
              {poi.logo ? (
                <span className="grid h-9 w-12 place-items-center rounded-full bg-white"><img src={`/assets/logos/${poi.logo}.png`} alt="" className="max-h-6 max-w-10 object-contain" loading="lazy" /></span>
              ) : (
                <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: poiFamily(poi.cat).color }} dangerouslySetInnerHTML={{ __html: poiIconSvg(poi.cat, 16) }} />
              )}
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-navy">{poi.name}</span>
                <span className="block text-[11px] text-muted">{poiLabel(poi.cat, lang)} · {formatDistance(poi.d, lang)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-muted">{t.note}</p>
    </div>
  );
}
