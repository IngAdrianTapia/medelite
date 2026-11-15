# Evidencia — logo transparente con contorno de 1 px

Fecha de la medición: 2026-11-15. Rama: `cursor/transparent-logo-outline-b5e5`, tomada de `main` en `10424231712623aa0e7fe3e8ead9ddd94377db6e`.

Esto no certifica ISO/IEC 25010, ISO/IEC 25012, ISO/IEC/IEEE 12207 ni ISO/IEC 27001. Registra qué se implementó en este cambio, cómo se probó y qué resultado dio, en el sentido de la Declaración de Estándares de Calidad de Software de Tapia Computación. El índice de la carpeta sigue en [../README.md](../README.md). La matriz del mismo día no se reescribió: mide el sitio completo; esta ficha es solo el logo.

## Requisito

El wordmark de la barra y del pie se veía dentro de un recuadro blanco (`BrandMark` con `bg-white`, sombra y anillo). El dueño pidió:

- PNG con fondo transparente, sin halo del fondo blanco anterior.
- Contorno blanco de 1 px: dilatación de 1 px de la forma con alpha ≥ 128.
- El logo va directo sobre el navy `#071827` de la barra. El pie usa `#041018`.
- No se toca el favicon ni ningún otro archivo de marca. No se inventan textos, precios ni datos clínicos.

Un candidato previo, en esta misma rama y sin fusionar, usaba 3 px. El dueño lo corrigió a 1 px antes de la entrega. El árbol que se fusiona lleva 1 px.

## ISO/IEC/IEEE 12207

### Análisis

La barra (`src/components/Header.tsx`) pinta `bg-navy` (`#071827` en `src/index.css`) al hacer scroll, y `bg-navy/70` con desenfoque cuando está arriba. El pie (`src/components/Footer.tsx`) usa `bg-[#041018]`. Los dos montan `BrandMark`. El requisito no pide ruta nueva, copia nueva ni dependencia nueva. Quedan fuera el favicon, el emblema PWA y el logo del hospital.

### Diseño

- `BrandMark` deja de envolver la imagen en un chip blanco. Sigue siendo un `img` con el mismo `alt`, `decoding="sync"` y las alturas ya usadas: barra `h-12 sm:h-14 md:h-16` (48, 56 y 64 px); pie `h-16 md:h-20` (64 y 80 px).
- `width` y `height` del `img` pasan a 645×162, que es el tamaño real del PNG, para que el navegador reserve la proporción.
- El PNG nuevo se genera desde `public/assets/brand/logo_original/medelite-logo-horizontal.png`, que es byte a byte el archivo que estaba en `main`.
- Forma: píxeles con alpha ≥ 128. Esos píxeles conservan su RGBA.
- Se tira el resto (polvo y halo por debajo de 128) a alpha 0.
- Contorno: dilatación circular de radio 1 (distancia euclidiana ≤ 1, vecindad ortogonal). Esos píxeles son blanco opaco `(255,255,255,255)`.
- Se añade 1 px de lienzo por lado para que el contorno no se recorte donde la forma tocaba el borde. Por eso el archivo mide 645×162 y no 643×160.
- El original permanece en `logo_original/` para poder contrastar y volver atrás. No entra ningún script de ejecución ni ninguna URL externa.

### Construcción

| Archivo | Qué cambió |
| --- | --- |
| `public/assets/brand/medelite-logo-horizontal.png` | PNG RGBA 645×162, 43 899 bytes, contorno de 1 px |
| `public/assets/brand/logo_original/medelite-logo-horizontal.png` | Copia íntegra del archivo de `main`, 21 282 bytes |
| `src/components/BrandMark.tsx` | Sin `bg-white`, sin sombra y sin anillo. Atributos 645×162 |
| `docs/calidad/CHANGELOG.md` | Entrada de este cambio |
| `docs/calidad/README.md` | Enlace a esta ficha |
| `docs/calidad/evidencias/2026-11-15-logo-transparente.md` | Esta ficha |

`package.json` y `package-lock.json` no cambian. Los seis PNG de marca que no son este wordmark (`favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`, `medelite-emblem-512.png`, `medelite-logo.png`, `hospital-joya-logo.png`) siguen iguales a `main` (`cmp`).

### Pruebas

Salidas de esta corrida, en el árbol de la rama, el 2026-11-15:

| Comando | Salida | Código |
| --- | --- | --- |
| `npm run lint` | ESLint sin avisos | 0 |
| `npm run typecheck` | `tsc --noEmit` sin avisos | 0 |
| `npm test` | `Test Files  5 passed (5)` / `Tests  18 passed (18)` | 0 |
| `npm audit --omit=dev --audit-level=low` | `found 0 vulnerabilities` | 0 |
| `npm audit --audit-level=moderate` | 4 hallazgos *low*, todos `deepmerge` vía `workbox-build` y `vite-plugin-pwa`. El umbral moderate no falla | 0 |
| `npm run build` | Vite en verde. `budget ok: JS gzip max 78340 (react-D5DePsok.js), total 223719, foto max 126016 (operating-room-1280.webp)`. `prerendered pages, service worker precache 151 files` | 0 |

Comprobaciones del workflow de Pages, sobre `dist/`:

- `dist/CNAME` contiene exactamente `medelite.com.mx`.
- Existen `dist/.nojekyll` y `dist/404.html`.
- La meta CSP de `dist/index.html` es la de `vite.config.ts`, sin cambios: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; connect-src 'self'; worker-src 'self'; manifest-src 'self'; form-action mailto:; frame-src 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests`.
- El HTML prerenderizado cita `/assets/brand/medelite-logo-horizontal.png`. No contiene la clase del chip (`px-2.5 py-1.5`). Esa clase tampoco está en el JS de `dist/assets`.
- `dist/assets/brand/medelite-logo-horizontal.png` es byte a byte el PNG de `public/`.

Medición del PNG (Pillow, sobre el archivo guardado y reabierto):

- Modo RGBA, 645×162. Las cuatro esquinas son `(0,0,0,0)`.
- 32 154 píxeles de forma. Su RGBA es idéntico al original en esas coordenadas.
- 5 786 píxeles de contorno, todos `(255,255,255,255)`, cada uno con un vecino ortogonal dentro de la forma.
- Píxeles de color con contacto ortogonal a transparencia: 0.
- Píxeles casi blancos (R, G y B ≥ 230) fuera del contorno opaco: 0. Píxeles semitransparentes casi blancos: 0.
- Quedan 1 380 contactos solo en diagonal entre un píxel de color y transparencia. La dilatación circular de radio 1 no pinta la esquina diagonal (distancia √2). No es un halo blanco: el píxel de color es el de la forma original.
- Los píxeles con 128 ≤ alpha < 255 conservan el color original. El borde suave cian del dibujo sigue dentro del trazo blanco. No se aplanó el emblema.

Composición a tamaño de interfaz, remuestreo Lanczos sobre `#071827`. «Píxeles claros» = píxeles del resultado con R ≥ 180, G ≥ 190, B ≥ 200 y suma ≥ 560 (el trazo blanco, ya mezclado por la escala):

| Altura CSS | Dónde | Tamaño escalado | Píxeles claros |
| --- | --- | --- | --- |
| 48 px | barra, `h-12` | 191×48 | 32 |
| 56 px | barra, `sm:h-14` | 223×56 | 55 |
| 64 px | barra `md:h-16` y pie `h-16` | 255×64 | 82 |
| 80 px | pie `md:h-20` | 319×80 | 182 |

Juicio visual de esas composiciones y del PNG a 1:1: sobre `#071827` y sobre `#041018` se lee un filete blanco fino alrededor del emblema y de las letras; no hay recuadro blanco ni velo gris. Sobre blanco el filete se confunde con el fondo y queda el cian. Sobre tablero de transparencia el exterior del filete es transparente.

Recorrido de la previsualización de producción (`npm run preview` en `http://127.0.0.1:4173/en`):

| Vista | Fondo | Chip blanco | Filete | Halo | Maqueta |
| --- | --- | --- | --- | --- | --- |
| Barra, escritorio, aún translúcida | navy al 70 % sobre la foto | no | sí, fino | no | el logo cabe a la izquierda de la barra |
| Barra, escritorio, ya sólida | `#071827` | no | sí, fino | no | sin recorte |
| Pie | `#041018` | no | sí, fino | no | encima del titular, sin corte |
| Barra a 390 px de ancho | navy de la barra | no | sí, fino | no | no choca con el botón de menú |

### Entrega

La entrega de este repositorio es el merge a `main`. El PR es https://github.com/IngAdrianTapia/medelite/pull/3 (rama `cursor/transparent-logo-outline-b5e5`). GitHub Pages despliega solo en push a `main` (`.github/workflows/pages.yml`, workflow «Deploy GitHub Pages»). Esta ficha cubre la verificación local anterior al merge. El resultado de ese workflow se anota al cerrar la entrega; no se inventa aquí un número de ejecución que todavía no existe.

### Mantenimiento

El original queda en el árbol. El CHANGELOG apunta a esta ficha. Para deshacer el cambio visible, restaurar el componente y el PNG del commit de `main` anterior a esta rama:

```bash
git checkout 10424231712623aa0e7fe3e8ead9ddd94377db6e -- src/components/BrandMark.tsx public/assets/brand/medelite-logo-horizontal.png
```

Eso devuelve el chip blanco y el PNG de 21 282 bytes. La copia en `logo_original/` puede quedarse: es el mismo archivo. Si también se quisiera sacar del sitio, se borra `public/assets/brand/logo_original/` en ese commit de reversión. Alternativa equivalente: `git revert` del merge, que deshace los cinco archivos de esta ficha sin tocar el resto.

## ISO/IEC 25010

| Característica | Comprobación en este cambio | Resultado |
| --- | --- | --- |
| Adecuación funcional | El wordmark identifica la marca en barra y pie, sin chip blanco | PNG y `BrandMark` como arriba. Recorrido visual en la previsualización de `dist` |
| Eficiencia de desempeño | Peso del PNG y presupuesto de JS y fotos | 21 282 → 43 899 bytes (+22 617). Presupuesto: JS gzip máximo 78 340, total 223 719, foto máxima 126 016. Dentro de 90 000 / 280 000 / 140 000 |
| Compatibilidad | El mismo `img` y un PNG RGBA | El build prerenderiza la ruta y copia el archivo a `dist` |
| Usabilidad | Lectura sobre navy y alturas reales de la interfaz | Filete visible a 48, 56, 64 y 80 px. `alt` sin cambio |
| Fiabilidad | El build falla si faltan CNAME, 404 o la CSP | Esas tres comprobaciones pasaron en `dist` |
| Seguridad | Ver la sección OWASP | Sin superficie nueva |
| Mantenibilidad | Changelog, esta ficha, tipos y lint | Lint 0, typecheck 0 |
| Portabilidad | Sigue siendo un archivo estático | No se exige nada nuevo en el servidor |

## ISO/IEC 25012

El wordmark es un dato de marca, no un dato clínico. No se añadieron cifras ni textos.

| Característica | Evidencia | Resultado |
| --- | --- | --- |
| Exactitud | Los 32 154 píxeles con alpha ≥ 128 conservan el RGBA del original | Idénticos |
| Trazabilidad | SHA-256 y ruta del original | Abajo |
| Credibilidad | No hay contenido clínico ni legal nuevo | El cambio es solo el archivo de marca y el componente que lo muestra |

SHA-256 (`sha256sum`):

- Original, `public/assets/brand/logo_original/medelite-logo-horizontal.png`: `b32d9de096cfd6c05669f8c01d4f637501ac5b4d27f7a363380e342945776075`
- Nuevo, `public/assets/brand/medelite-logo-horizontal.png`: `d25ba13d204a25113f48a0aeabb1d69a7c2d82db19ddf3b053ac87677506d9b5`

El original archivado es el blob que `main` servía (`git hash-object` `430daadb484fad8cc31ec73b3d6ebf9119383116` en los dos).

## ISO/IEC 27001

No hay un SGSI certificado en este repositorio. En este cambio:

| Control | Qué se hizo | Resultado |
| --- | --- | --- |
| Control de cambios | Rama `cursor/transparent-logo-outline-b5e5` desde `main`. El merge a `main` es el paso de entrega, por el PR de esta rama | Sin push directo como método de trabajo |
| Respaldos | El PNG anterior queda en `logo_original/` y en el commit `1042423` | SHA-256 de arriba |
| Cifrado y acceso | No hay secreto, `.env` ni dato de paciente en el diff | `package.json` y el lockfile no cambian |
| Reversión | Comandos de la sección de mantenimiento | El chip y el PNG anteriores se restauran desde `1042423` |

## OWASP ASVS y OWASP Top 10

Este cambio no añade scripts, dependencias ni orígenes externos. La imagen sigue en `'self'` (`/assets/brand/medelite-logo-horizontal.png`). La CSP no se editó; el HTML construido lleva la misma cadena citada en las pruebas, con `script-src 'self'` y `frame-src 'none'`.

| Referencia | En este cambio | Resultado |
| --- | --- | --- |
| ASVS V14 configuración | CSP, sin source maps, lockfile intacto | CSP idéntica. `git diff main -- package.json package-lock.json` vacío |
| A03 Inyección | No hay HTML nuevo ni `dangerouslySetInnerHTML` | El `alt` sigue siendo el de siempre |
| A05 Configuración | Meta CSP del build | Presente, comprobada por grep |
| A06 Componentes | Auditoría | Producción: 0. Árbol completo: los mismos 4 *low* de `deepmerge` ya descritos en [../seguridad.md](../seguridad.md). No se añadió un paquete |
| A08 Integridad | El PNG entra por git, no por una URL de terceros | SHA-256 registrado arriba |
| A01, A02, A04, A07, A09, A10 | Sin login, sin API, sin secreto y sin un servidor que pida URLs | Este diff no les crea superficie |

El service worker final precachea 151 archivos del propio `dist`, entre ellos el wordmark y la copia de `logo_original/`. Los dos son del mismo origen. No se añadió un host a `img-src`.

## Resultado

El requisito queda cumplido en el árbol de esta rama: PNG RGBA transparente, contorno blanco de 1 px, sin chip blanco, original conservado, favicons intactos. Lint, tipos, 18 pruebas, las dos auditorías y el build terminaron en 0. El presupuesto de JS y de fotos sigue dentro de los límites. La CSP no cambió.

Juicio visual: sobre navy el filete se ve fino y el fondo del logo es el de la barra, no un rectángulo blanco. No queda halo claro alrededor. Sobre blanco el filete no estorba. A 48 px el trazo es el más fino de la serie y sigue marcando el borde; no se subió a 2 px ni a 3 px para hacerlo más grueso. El recorrido en el navegador, en las cuatro vistas de la tabla, dio el mismo resultado.
