# Changelog de calidad

## 2026-11-16 — video instantáneo, mapa real y correo en el iPhone

Los videos recortan la intro y el cierre en navy/negro, arrancan con un fotograma real y un póster que no se quita hasta que hay imagen, y en móvil 720 px usan un archivo 720p más ligero, con `faststart`. El institucional puede ir en bucle silenciado. Se quita el contorno ilustrado de México: la red se ve con fotos reales, como en hospitaljoya.com, y un mapa real con teselas de Esri (CARTO exige clave y no se puede usar en el sitio). El botón Correo, en el iPhone, abre un redactor que lanza el correo del aparato (el `mailto` por formulario GET no abría nada). Sigue sin YouTube; `frame-src 'none'` y `media-src 'self'`. El mapa añade solo `https://server.arcgisonline.com` a `img-src`. El presupuesto de JS gzip total pasa a 330 KB por Leaflet, que se carga solo en el mapa.


## 2026-11-16 — pie del video de hemodinamia

El pie debajo del video de la sala de hemodinamia, en `/red/marina` (ES, EN y FR), deja de repetir el texto del video institucional. Usa el título oficial del original: «La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta». En EN y FR se conserva ese título (no se tradujo) y se indica que el video está en español. El institucional no cambia. Sigue sin YouTube; la CSP permanece en `frame-src 'none'` y `media-src 'self'`. Ficha y hoja en vivo: [evidencias/2026-11-16-pie-hemodinamia.md](./evidencias/2026-11-16-pie-hemodinamia.md).

## 2026-11-16 — videos HTML5, sin YouTube

Los dos videos institucionales de Hospital Joya se alojan en el sitio y se reproducen con un `<video>` propio (póster, botón y controles discretos). La CSP vuelve a `frame-src 'none'`. Ficha: [evidencias/2026-11-16-videos-html5.md](./evidencias/2026-11-16-videos-html5.md).

## 2026-11-16 — pendientes técnicos de publicación

Sitemap, favicon, `/calidad` en es-MX, en-CA y fr-CA, y holgura en `sma-1280.webp`. No se tocó marketing, posicionamiento, médicos ni especialidades. El issue #5 ya no se reproduce; no se cerró desde aquí. Ficha: [evidencias/2026-11-16-pendientes-tecnicos.md](./evidencias/2026-11-16-pendientes-tecnicos.md).

## 2026-11-15 — versión Canadá, sin el brief

`/canada` reúne el recorrido con los textos ya publicados. El titular de portada y las ciudades editables están en `src/content/positioning.ts`. Toronto, Calgary, cinco estrellas y brechas de precio no se imprimen: esperan el brief. El idioma por defecto sigue siendo inglés de Canadá, y EN queda primero en el interruptor.

## 2026-11-15 — plan maestro

El menú pasa a Inicio, Hospital Joya, MedElite, Especialidades, Médicos, Galería y Contacto. Las fotos Joya salen de la portada y quedan en `/hospital-joya` y `/galeria`, por categoría. Cada especialidad de las listas ya guardadas tiene ficha, sin procedimientos inventados. Plan: `docs/PLAN_MAESTRO_MEDELITE.md`. Ficha: [evidencias/2026-11-15-plan-maestro.md](./evidencias/2026-11-15-plan-maestro.md).

## 2026-11-15 — fotos Joya

Las nueve sedes usan fachadas reales de la colección autorizada. Se añadieron quirófano, habitación, tomógrafo y vestíbulo, y retratos publicados del equipo. No entra el render de Manzanillo ni fotos con pacientes. Cada archivo usado tiene URL de origen en `src/data/photoCredits.ts`. Ficha: [evidencias/2026-11-15-fotos-joya.md](./evidencias/2026-11-15-fotos-joya.md).

## 2026-11-15 — acabado de la portada

La foto del hero pasa a un panel con esquinas redondas, debajo de la barra. En 375 px el primer pantallazo termina en los llamados, sin cortar la cita Fraser. El fundido de los tres encuadres es más largo, Ken Burns es más corto, y con `prefers-reduced-motion` el primer encuadre permanece visible. El lede y el aviso suben a blanco al 90 % (14.61:1). Capturas antes y después en [evidencias/2026-11-15-hero-legible.md](./evidencias/2026-11-15-hero-legible.md).

## 2026-11-15 — hero legible y barra en móvil

La portada deja de poner el titular encima de la fotografía. En escritorio el texto queda en una columna navy y la foto, con los tres encuadres y el movimiento Ken Burns, ocupa la otra. En 375 px la foto va arriba y el texto debajo. El logo de la barra pasa a `h-8` por debajo de `sm`. El botón fijo de contacto se oculta hasta `md` para no tapar el contenido. `main .grid > *` admite `min-width: 0`. Se mantienen Motion, `prefers-reduced-motion`, la paleta navy y los textos es/en/fr. No se adoptó el fondo claro ni las clases sueltas de la propuesta. Ficha: [evidencias/2026-11-15-hero-legible.md](./evidencias/2026-11-15-hero-legible.md).

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
