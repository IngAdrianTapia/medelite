# Changelog de calidad

## 2026-11-15 — logo de barra y pie

El wordmark de la barra y del pie (`public/assets/brand/medelite-logo-horizontal.png`) pasa a PNG RGBA con fondo transparente y un contorno blanco de 1 px alrededor de la forma (dilatación del alpha ≥ 128, radio euclidiano 1). Se quita el recuadro blanco (`bg-white`) de `BrandMark`. El original se conserva en `public/assets/brand/logo_original/medelite-logo-horizontal.png`. No se tocó el favicon ni se inventaron textos, precios o datos clínicos.

### Medición

- PNG resultante: modo RGBA, 645×162, esquinas con alpha 0. El archivo de `main` pesaba 21 282 bytes; el nuevo pesa 43 899.
- La forma con alpha ≥ 128 conserva el RGBA del original. El contorno es blanco opaco y ningún píxel de color toca transparencia en ortogonal. No quedan píxeles casi blancos fuera de ese contorno.
- Composición comprobada sobre navy `#071827`, sobre el pie `#041018`, sobre blanco y sobre tablero de transparencia. Alturas de la interfaz: 48, 56, 64 y 80 px.
- Ficha: [evidencias/2026-11-15-logo-transparente.md](./evidencias/2026-11-15-logo-transparente.md).


## 2026-11-15 — arquitectura nueva

La portada deja de ser una columna de secciones. Ahora es un hero a pantalla completa con la fachada de Hospital Joya Cancún, una barra de vidrio, una retícula bento, una línea de tiempo ligada al scroll, un carrusel horizontal con un esquema de las nueve sedes, tarjetas grandes de especialidad, comparación de paquetes con Essential elevado, galería editorial y un cuestionario en dos paneles. No se inventaron precios, datos clínicos ni testimonios.

## 2026-11-15 — rediseño visual

La portada pasa a un hero a dos columnas con la fotografía real de Hospital Joya Marina, barra y pie en navy, acento bronce y el llamado «Solicitar cotización» (en: Request a quote, fr: Demander un devis). No se añadieron testimonios, precios ni datos clínicos. Los textos de es/en/fr, la CSP y las pruebas existentes se mantienen.

## 2026-11-15

Alineación del sitio estático a la declaración de Tapia Computación. No se certificó ISO. No se inventaron datos médicos, precios ni textos legales.

### Hecho

- Documentación de esta carpeta: requisitos y diseño, matriz, datos, seguridad y este registro.
- `src/data/flights.ts` ya no publica las tarifas de muestra del 14 de noviembre de 2026. La UI no las mostraba.
- Erika Cruz Joya entra en `src/data/people.ts` con el cargo y la fuente que ya estaban en i18n, y con `public/assets/img/equipo/erika-cruz-joya.jpg`. TODO en el código para biografía, cédula y URL exacta de About Us.
- Accesibilidad: foco no tapado por la barra fija, subrayado visible, placeholder con contraste, menú de teclado, errores del cuestionario asociados al campo, regiones anchas enfocables, `autocomplete`, nombre del audio, `rel` en enlaces externos.
- `sessionStorage` deja de guardar contacto y salud. El aviso de privacidad en es/en/fr lo dice.
- Rendimiento: chunks `react` y `motion`, fotos duplicadas borradas, presupuesto de gzip y de peso de foto en el build.
- CSP: `frame-src 'none'`.
- `.gitignore` cubre `.env*`, llaves y archivos de secretos.
- Dependencias: override de `minimatch@11.0.8` y `glob@14.0.6`.
- CI: el workflow de Pages ahora también corre la auditoría de producción y la de severidad moderada o mayor. El deploy a Pages sigue igual.

### Medición

- `npm run lint`: 0.
- `npm run typecheck`: 0.
- `npm test`: 4 archivos, 17 pruebas, 0 fallos.
- `npm audit --omit=dev`: 0 vulnerabilidades.
- `npm audit`: 4 low (`deepmerge` en Workbox), 0 moderate, 0 high, 0 critical.
- `npm run build`: verde. Presupuesto: JS gzip máximo 78,335 bytes, total 219,284, foto máxima 126,016 bytes.

### Sigue pendiente

- Encabezados HTTP que GitHub Pages no permite fijar (HSTS, `nosniff`, `frame-ancestors`, `Permissions-Policy`).
- Hacer el repositorio privado antes de manejar datos de pacientes, y un backend si algún día hay expediente, pagos o bitácora.
- Parche de `deepmerge` cuando exista una versión que cierre GHSA-gcqx-w48m-w2h4 sin romper `vite-plugin-pwa`.
- Biografía y cédula de Erika, si el dueño las publica en una fuente que se pueda citar.
- Auditoría WCAG con lector de pantalla. No se agregó un job de accesibilidad.
