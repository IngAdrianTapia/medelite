/** Deep links that open turn-by-turn directions to a coordinate in the visitor's own app. */
export type LatLng = { lat: number; lng: number };

export function googleDirections(to: LatLng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${to.lat},${to.lng}&travelmode=driving`;
}

export function appleDirections(to: LatLng, name: string) {
  return `https://maps.apple.com/?daddr=${to.lat},${to.lng}&q=${encodeURIComponent(name)}&dirflg=d`;
}

export function wazeDirections(to: LatLng) {
  return `https://waze.com/ul?ll=${to.lat},${to.lng}&navigate=yes`;
}

/** Great-circle distance in metres. */
export function distanceM(a: LatLng, b: LatLng) {
  const R = 6_371_000;
  const p1 = (a.lat * Math.PI) / 180;
  const p2 = (b.lat * Math.PI) / 180;
  const dp = p2 - p1;
  const dl = ((b.lng - a.lng) * Math.PI) / 180;
  const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatDistance(m: number, lang: "es" | "en" | "fr") {
  const loc = lang === "es" ? "es-MX" : lang === "fr" ? "fr-CA" : "en-CA";
  if (m < 1000) return `${Math.round(m / 10) * 10} m`;
  return `${new Intl.NumberFormat(loc, { maximumFractionDigits: m < 10_000 ? 1 : 0 }).format(m / 1000)} km`;
}

export function formatDuration(s: number, lang: "es" | "en" | "fr") {
  const min = Math.max(1, Math.round(s / 60));
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const r = min % 60;
  return lang === "en" ? `${h} h ${r} min` : `${h} h ${r} min`;
}
