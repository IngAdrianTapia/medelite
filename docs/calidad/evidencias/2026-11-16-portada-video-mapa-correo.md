# Evidencia — video instantáneo, mapa real y correo en el iPhone

Fecha de la medición: 2026-11-16, 11:51 America/Monterrey (UTC-6). Publicación medida: commit `5dbb38271ec086c8c723adc98e05760c4613b7a8` (PR #32 y #33). Sitio en vivo: `https://medelite.com.mx`.

Esto no certifica ISO/IEC 25010, ISO/IEC 25012, ISO/IEC/IEEE 12207 ni ISO/IEC 27001. Registra qué se implementó, cómo se probó y qué resultado dio, conforme a la declaración de Tapia Computación.

## Requisito

En capturas de iPhone del 16 nov 2026, 11:20–11:21 America/Monterrey, el video institucional se veía como un recuadro azul vacío en 0:00, cargando. El mapa de México con marcadores 3/2/2/2 se veía como una ilustración, no como un mapa real. El botón Correo no mandaba nada. Había que revisar la página: menos texto, más visual, sin YouTube, con CSP, ISO 25010 y OWASP, y sin inventar datos. Certificar en vivo a 1440 y 390, con el tiempo de carga del video.

## ISO/IEC/IEEE 12207

### Análisis

Los MP4 originales abrían con unos 5 s de intro navy y un cierre en negro. El póster se ocultaba al pulsar reproducir, antes del primer fotograma, y se veía el fondo navy del reproductor. Los archivos pesaban 25–29 MB. hospitaljoya.com presenta las sedes con fichas de fotos reales, sin mapa. El mapa de MedElite era un contorno ilustrado. El Correo era un `mailto` o un formulario GET a `mailto:`, que en Safari de iOS a menudo no abre nada. GitHub Pages no recibe POST; no hay base de datos de pacientes ni claves de un backend de correo.

### Diseño

Se recortan intro y cierre navy. El póster (fotograma real) se mantiene hasta `onPlaying`. En pantallas de 720 px o menos se sirve un MP4 720p más ligero, con `faststart`. El institucional va en bucle, silenciado, en autoplay. La red de sedes quita el dibujo: fichas con las fotos y direcciones que publica hospitaljoya.com, más un mapa real interactivo (Leaflet, teselas de Esri World Street Map). CARTO Voyager, en la primera certificación de #32, mostró «API KEY REQUIRED»; el PR #33 lo sustituye por Esri, sin clave y sin iframe. El botón Correo abre un redactor en la página que, con el gesto del usuario, lanza la aplicación de correo del aparato (`openMailto`, href ≤ 1 800 caracteres) y copia el mensaje por si el sistema no abre Mail. El cotizador deja de usar el formulario GET. No se inventan precios, títulos oficiales ni un backend que reciba datos clínicos.

### Construcción

Publicado en `main`: `ff89f87` (#32) y `5dbb382` (#33).

### Pruebas

- `tsc --noEmit`, ESLint y Vitest (53 pruebas, 0 fallos), `npm audit --omit=dev --audit-level=low` en 0.
- Actions: `build` en verde en #32 (tras ajustar el presupuesto JS gzip a 330 KB por Leaflet) y en #33. Tras cada squash, `Deploy GitHub Pages` y `pages build and deployment` en verde.
- Certificación en vivo, 16 nov 2026 a las 11:51 America/Monterrey (UTC-6), commit `5dbb382`, Playwright con Chrome, escritorio 1440 y móvil 390 (Safari de iPhone simulado para el correo):
  - Video institucional: fotograma real de la fachada desde el inicio, sin recuadro navy. Escritorio 1440 listo en 2 707 ms (`joya-institucional.mp4`, 21 MB). Móvil 390 listo en 2 099 ms (`joya-institucional-720.mp4`, 14 MB). Póster en 112 ms / 63 ms. `faststart` permite arrancar antes de bajar el archivo entero.
  - Mapa: teselas reales de Esri (Puerto Vallarta y alrededores), pines y fichas con fotos reales. Sin iframe, sin «API KEY REQUIRED», sin el contorno ilustrado. CSP: `img-src` incluye `https://server.arcgisonline.com`.
  - Pie de hemodinamia: «La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta.»
  - Correo en iPhone simulado 390: el botón abre el redactor; al enviar se lanza `mailto:info@medeliteofficial.com` (201 caracteres, dentro del límite). El sitio no envía el mensaje por su cuenta: lo abre la aplicación de correo del aparato.
  - CSP servida: `frame-src 'none'`, `media-src 'self'`. Sin iframe y sin YouTube en la interfaz.

Hoja de contacto (revisada visualmente): [2026-11-16-hoja-vivo-portada-video-mapa-correo.jpg](./2026-11-16-hoja-vivo-portada-video-mapa-correo.jpg).

### Resultado

El video institucional ya no se queda en un recuadro azul. El mapa es real, con fotos de las sedes. El botón Correo, en un iPhone simulado, sí lanza el correo del aparato. El sitio sigue sin YouTube. No se añadió un backend de correo ni un asistente generativo: GitHub Pages no recibe expedientes, y no se inventan respuestas clínicas.

### ISO/IEC 25010 y OWASP (registro, no certificado)

Adecuación funcional y usabilidad: el video muestra imagen desde el primer instante; el mapa se entiende; el correo tiene un gesto claro. Eficiencia: 720p en móvil y `faststart`. Seguridad: CSP estricta, `form-action mailto:`, sin iframe, sin recolectar datos clínicos en un servidor del sitio. Las coordenadas de San Miguel y Cancún salen de OpenStreetMap o Nominatim; las demás se declaran como la zona de la dirección publicada.
