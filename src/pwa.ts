export function registerPwa(): void {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;
  // Cuando el service worker nuevo toma el control (tras un deploy), recargamos
  // una sola vez para que la página sirva el HTML/JS nuevos y no quede cache vieja.
  // En la primera visita no hay controlador previo: no recargamos (evita que la
  // página se reinicie unos segundos después de abrirla y se pierda lo que el usuario hacía).
  const hadController = Boolean(navigator.serviceWorker.controller);
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing || !hadController) return;
    refreshing = true;
    window.location.reload();
  });
  void import("virtual:pwa-register").then(({ registerSW }) => {
    registerSW({ immediate: true });
  });
}
