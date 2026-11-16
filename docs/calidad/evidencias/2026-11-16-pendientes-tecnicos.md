# Pendientes técnicos de publicación

Fecha: 2026-11-16. Node 22.23.4, el mismo mayor que `.github/workflows/pages.yml`. Esto no certifica ISO. Registra qué se implementó, cómo se probó y qué resultó.

No entra el brief de marketing ni los issues #6 a #10. No se fusionó a `main` y no se editó el PR #12.

## Análisis

| Hueco | Criterio |
| --- | --- |
| `sitemap.xml` responde 404 | El build escribe el archivo con cada ruta prerenderizada en es-MX, en-CA y fr-CA, y `robots.txt` lo nombra |
| `favicon.ico` responde 404 | Hay un icono real en la raíz, tomado del PNG de 32 px que ya usa el sitio |
| `/calidad` solo en español y fuera del catálogo | Los tres idiomas y un enlace en el pie |
| Menú «Contacto» (`/#orientacion`) y el llamado móvil (`/#cotizar`) | Unirlos solo si son la misma sección |
| Issue #5, placeholder de `React.lazy` | Comprobar el HTML estático. Si ya no sale, dejar constancia para cerrarlo; no cerrarlo desde el cambio |
| `sma-1280.webp` a 24 bytes del tope de 140 000 | Recomprimir solo si la foto no cambia a la vista |

## Diseño

Sitio estático. Sin dependencia nueva, sin host nuevo y sin cambio de CSP. El sitemap lista las URLs canónicas `https://medelite.com.mx/{es|en|fr}/…`. Las copias en inglés sin prefijo son el mismo documento que `/en` y no entran. `404.html` tampoco. `x-default` apunta al inglés de Canadá, igual que `Seo.tsx`.

## Construcción

- `scripts/routes.mjs` es la lista que ya prerenderizaba el sitio. `scripts/sitemap.mjs` arma el XML. `scripts/prerender.mjs` lo escribe en `dist/sitemap.xml` y falla si el conteo no es tres URLs por ruta, si falta `dist/favicon.ico` o si `robots.txt` no cita el sitemap.
- `public/favicon.ico` incrusta, sin recodificar, `public/assets/brand/favicon-32.png` (ICO con PNG de 32×32). `index.html` lo declara.
- Los textos de `/calidad` pasan a `src/i18n/{es,en,fr}.ts`. El español publicado se conserva. El sello muestra la fecha civil en el idioma activo: antes imprimía solo el texto anterior a la primera coma, que en es-MX es el día de la semana y en en-CA o fr-CA no es una fecha.
- El control de idioma escribía el idioma nuevo y `LocaleSync` lo devolvía al de la URL, así que EN y FR no llegaban a verse. Ahora una elección del control actualiza la ruta; un enlace o Atrás sigue mandando en la URL.
- `sma-1280.webp` se volvió a codificar desde los píxeles que el sitio ya mostraba (1280×1380, VP8, sin EXIF ni ICC) con WebP quality 60 y effort 6. Mismas dimensiones.

## Contacto y cotización

No se unificaron.

| Control | Texto | Destino | Sección |
| --- | --- | --- | --- |
| Menú «Contacto» | `nav.contact` | `/#orientacion`, con prefijo de idioma | Coordinación: correo y teléfono, sin formulario clínico |
| Llamado móvil | `hero.ctaQuote` («Solicitar cotización», «Request a quote», «Demander un devis») | `/#cotizar` | Cuestionario |

Mandar «Contacto» al cuestionario pediría edad, IMC y condiciones a quien solo quiere la oficina. Mandar «Solicitar cotización» a `#orientacion` no abre el cuestionario que el botón nombra. El plan maestro aún dice que Contacto va a `/#cotizar`; el código posterior separó las dos acciones y esta ficha deja esa separación.

## Issue #5

El HTML de `dist/en/canada`, `dist/en/galeria`, `dist/en/hospital-joya` y `dist/en/especialidades` trae el `h1` de la página («For patients in Canada», «Gallery by category», «Hospital Joya», «Two official lists, not one catalogue»). Ningún `index.html` de `dist` contiene `<p class="text-sm text-muted">…</p>`. El prerender ya usa `renderToPipeableStream` con `onAllReady` y después `renderToString`, y el build falla si una ruta vuelve al placeholder. Entre `<!--$-->` y `<!--/$-->` está el marcado ya resuelto: son los comentarios de frontera de Suspense de React, no el fallback ni un script de revelado. El issue puede cerrarse. Este cambio no lo cierra.

## Pruebas y resultado

| Comando | Resultado |
| --- | --- |
| `npx eslint .` | 0 |
| `npm run build` (`tsc --noEmit` incluido) | 0. `prerendered pages, sitemap 198 urls, service worker precache 318 files` |
| `npx vitest run` | 12 archivos, 33 pruebas, 0 fallos |
| `npm audit --omit=dev --audit-level=low` | 0 vulnerabilidades |
| `npm audit --audit-level=moderate` | Pasa. Siguen 4 low de `deepmerge` en la herramienta de build, ya registradas |
| `node scripts/budget.mjs` (dentro del build) | `budget ok: JS gzip max 78340 (react-D5DePsok.js), total 242180, foto max 138318 (riviera-837.webp)` |

Límites del presupuesto: JS gzip ≤ 90 000 por archivo, ≤ 280 000 en total, foto ≤ 140 000. Los tres quedan dentro.

`sma-1280.webp` pasó de 139 976 bytes (24 bytes bajo el tope) a 132 956 (7 044 bytes bajo el tope). Contra los píxeles del archivo anterior: PSNR 40,06 dB, error medio absoluto 1,59 niveles, y 0,01 % de los píxeles se separan más de 20 niveles. El recorte del letrero, el follaje, el cielo, la persiana y el adoquín no cambia de forma; la diferencia ampliada ocho veces cae en textura fina. El tope del presupuesto lo marca ahora `riviera-837.webp`, con 1 682 bytes de margen. No se recomprimió esa foto.

Chrome sin interfaz, contra `vite preview` del `dist` de este build:

- `/es/calidad/` muestra «Estándares de Calidad de Software». EN pasa a `/en/calidad/` («Software Quality Standards»), FR a `/fr/calidad/` («Normes de qualité logicielle») y ES vuelve a `/es/calidad`.
- El pie en francés dice «Qualité» y el enlace permanece en `/fr/calidad`.
- En 390 px el menú tiene Contacto → `/es/#orientacion` y Solicitar cotización → `/#cotizar`.
- `/favicon.ico` responde 200, `image/x-icon`, 2 675 bytes. `/sitemap.xml` responde 200 con 198 `<loc>`. `/robots.txt` cita `Sitemap: https://medelite.com.mx/sitemap.xml`.

El workflow de Pages comprueba favicon, sitemap, las tres URLs de `/calidad` y que esas cuatro rutas del issue #5, más `/calidad` en los tres idiomas, traigan un `h1` y no el placeholder.
