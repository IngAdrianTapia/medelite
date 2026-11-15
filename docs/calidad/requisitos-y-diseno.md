# Requisitos y diseño

Fecha de esta revisión: 2026-11-15.

## Producto

MedElite International Health es un sitio estático de turismo médico. La oficina de coordinación está en Vancouver y presenta la red de Hospitales Joya en México a pacientes que, en su mayoría, salen de Canadá. El dominio de publicación es `medelite.com.mx`.

El sitio coordina. No diagnostica, no opera y no cobra en línea. El rango de rodilla que ya estaba en `src/data/packages.ts` sigue siendo un rango de planeación en dólares canadienses, no una tarifa de hospital ni una cotización. No se añadieron precios, diagnósticos ni textos legales nuevos.

## Requisitos que este repositorio sí cubre

1. Informar en español, inglés y francés, con las mismas rutas.
2. Mostrar la red, las sedes, los nombres publicados y las fuentes.
3. Dejar armar una solicitud de coordinación que se abre en el correo del visitante (`mailto:info@medeliteofficial.com`). No hay API ni base de datos.
4. No publicar un precio de boleto de avión.
5. No inventar médicos, cédulas, biografías ni acreditaciones.
6. Servirse como sitio estático en GitHub Pages, con prerender de las rutas y una política de seguridad de contenido.
7. Poder comprobarse en CI: lint, tipos, pruebas existentes, auditoría de dependencias y build con presupuesto de peso.

## Requisitos que este repositorio no cubre

- Expediente clínico, citas, pagos, identidad del paciente o mensajes guardados en un servidor.
- Cotización en vivo de vuelos.
- Certificación ISO entregada por un organismo. Esta carpeta es evidencia interna de construcción.

## Diseño

| Pieza | Decisión |
| --- | --- |
| Interfaz | React 19, TypeScript, Vite, Tailwind 4, Motion |
| Datos | Módulos en `src/data`, sin backend |
| Idiomas | `src/i18n/es.ts`, `en.ts`, `fr.ts`. El idioma elegido va a `localStorage` (`me-lang`) y no incluye salud |
| Rutas | React Router. `scripts/prerender.mjs` escribe HTML por ruta y `dist/404.html` |
| Publicación | `.github/workflows/pages.yml` construye y, en `main`, despliega a GitHub Pages |
| Contacto | El cuestionario arma un `mailto`. El navegador no envía el formulario a un servidor de MedElite |
| Vuelos | `src/data/flights.ts` solo conserva el aeropuerto de planeación de cada sede. El precio lo cotiza un coordinador |
| Seguridad de contenido | Meta CSP inyectada en el build (`vite.config.ts`). Sin scripts de terceros |

## Ciclo (ISO/IEC/IEEE 12207) de este cambio

| Etapa | Evidencia |
| --- | --- |
| Análisis | Huecos reales: figuras de tarifas de muestra sin uso en la UI, Erika fuera de `people.ts`, datos de contacto y salud en `sessionStorage`, contraste del subrayado, foco y regiones con scroll, fotos duplicadas, CSP sin `frame-src`, `.gitignore` corto, auditoría con hallazgos en herramientas de build |
| Diseño | Quitar tarifas, no persistir datos sensibles, reforzar foco y nombres accesibles, partir el bundle, borrar duplicados byte a byte, overrides de `minimatch` y `glob`, documentar lo que Pages no puede firmar como encabezado HTTP |
| Construcción | Diff de este commit en `main` |
| Pruebas | `npm run lint`, `npm run typecheck`, `npm test` (4 archivos, 17 pruebas), `npm audit`, `npm run build` (incluye `scripts/budget.mjs`) |
| Entrega | Push a `main`. El workflow de Pages despliega `dist` |
| Mantenimiento | Esta carpeta y el presupuesto de peso quedan en el build para el siguiente cambio |
