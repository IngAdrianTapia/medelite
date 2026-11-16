# Evidencia — videos HTML5 de Hospital Joya, sin YouTube

Fecha de la medición: 2026-11-16. Rama `mejora/videos-html5`.

Esto no certifica ISO/IEC 25010, ISO/IEC 25012, ISO/IEC/IEEE 12207 ni ISO/IEC 27001. Registra qué se implementó, cómo se probó y qué resultado dio, conforme a la declaración de Tapia Computación.

## Requisito

El dueño no quiere publicidad de YouTube ni el cuadro del reproductor ajeno. Los dos videos institucionales de Hospital Joya que ya estaban en el sitio (antes incrustados con iframe) deben verse como un video de las páginas de MedElite: elegante, con póster y botón propios, en el mismo origen.

## ISO/IEC/IEEE 12207

### Análisis

`VideoEmbed` insertaba un iframe a `youtube-nocookie.com` al pulsar reproducir. Eso traía el cromado de YouTube, anuncios y sugerencias, y obligaba a abrir `frame-src` a terceros. Los videos no son privados y sí permiten la descarga: son piezas institucionales de Hospital Joya Marina, ya usadas en la portada y en `/red/marina`.

### Diseño

- Reproductor HTML5 de primer origen: `<video>` con `preload="none"`, `playsinline`, `controlsList` sin descarga, bordes `rounded-3xl`, fondo navy y sombra ya usada en el sitio.
- Hasta el clic se muestra el póster (WebP 640/1280 y JPG) y un botón de reproducir propio, con el título en serif. No hay logo, enlace ni mención de YouTube.
- Después del clic, controles discretos (reproducir, barra, tiempo, silencio, pantalla completa), en español, inglés y francés. Al terminar, un botón para volver a reproducir. El archivo no se pide hasta que la persona pulsa.
- La CSP vuelve a `frame-src 'none'` y `media-src 'self'`.
- Los archivos viven en `/assets/video/`. El service worker no los precachea.

### Construcción

| Archivo | Qué cambió |
| --- | --- |
| `public/assets/video/joya-institucional.mp4` | H.264 High 1080p 24 fps + AAC, `+faststart`, 25 914 008 bytes (24,71 MiB), 2 min 39 s |
| `public/assets/video/joya-hemodinamia.mp4` | H.264 High 1080p 29.97 fps + AAC, `+faststart`, 29 449 003 bytes (28,08 MiB), 2 min 26 s |
| `public/assets/video/joya-institucional.{jpg,*-640.webp,*-1280.webp}` | Póster del segundo 20 (Centro Médico Joya, sin cintillo) |
| `public/assets/video/joya-hemodinamia.{jpg,*-640.webp,*-1280.webp}` | Póster del segundo 18 (sala de hemodinamia) |
| `src/components/VideoEmbed.tsx` | Reproductor propio; ya no hay iframe ni `id` de YouTube |
| `src/pages/HomePage.tsx`, `src/pages/HospitalPage.tsx` | Pasan `src` local |
| `src/content/home.ts` | `videoDeck` en es, en y fr, sin YouTube |
| `vite.config.ts`, `scripts/budget.mjs` | `frame-src 'none'`; tope de 50 MB por archivo de video |
| `src/index.css` | Barra de progreso `.me-video-seek` |
| `docs/calidad/seguridad.md`, `matriz-cumplimiento.md` | CSP actualizada |

Los originales de YouTube no traían subtítulos oficiales, solo autogenerados en español, con errores de transcripción (por ejemplo, «buenos días son los otros fernando»). No se activaron como pista en el reproductor, para no mostrar un texto incorrecto. Las pistas crudas se conservan fuera del sitio, en el registro de trabajo, no en producción.

No se añadió WebM: el MP4 H.264 cubre los navegadores actuales y mantiene el repositorio más liviano.

### Pruebas

- `tsc --noEmit`, ESLint y Vitest, incluido `VideoEmbed.test.tsx`: el póster y el botón propio aparecen en es, en y fr; no hay iframe ni la palabra YouTube; el `<video>` apunta al MP4 local, con `preload="none"` y `playsinline`; el clic llama a `play()`.
- Presupuesto del build: JS dentro de techo y cada MP4 por debajo de 50 MB. CSP de `dist/index.html` con `frame-src 'none'` y `media-src 'self'`.
- Vista previa local y, después de publicar, certificación en vivo en `https://medelite.com.mx` a 1440 px y 390 px: los dos videos corriendo (no el póster), sin errores de CSP en consola, en los tres idiomas. Hoja de contacto sin recortar.

### Resultado

Los dos videos se ven y se oyen como pieza del sitio, sin el cuadro de YouTube. El origen es el mismo que el resto de MedElite. La ficha de capturas en vivo se anexa al publicar.
