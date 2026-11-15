export function registerPwa(): void {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;
  // Cuando el service worker nuevo toma el control (tras un deploy), recargamos
  // una sola vez para que la página sirva el HTML/JS nuevos y no quede cache vieja.
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
  void import("virtual:pwa-register").then(({ registerSW }) => {
    registerSW({ immediate: true });
  });
}
