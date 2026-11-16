# Evidencia — pie del video de hemodinamia

Fecha de la medición: 2026-11-16, 11:20 America/Monterrey (UTC-6). Publicación: commit `6c0d7e9998fa6fc5f939bf6e09af70ddd162a35d` (PR #30). Sitio en vivo: `https://medelite.com.mx`.

Esto no certifica ISO/IEC 25010, ISO/IEC 25012, ISO/IEC/IEEE 12207 ni ISO/IEC 27001. Registra qué se implementó, cómo se probó y qué resultado dio, conforme a la declaración de Tapia Computación.

## Requisito

En la hoja de certificación de los videos HTML5 (commit `fa5cd10a`, PR #29) el pie debajo del video de la sala de hemodinamia, en `/red/marina`, repetía el del video institucional: «Video institucional de Hospital Joya Marina Vallarta», en ES, EN y FR. Había que poner un pie correcto, basado en el título real del original, sin inventar, en los tres idiomas. En móvil 390, el fotograma anterior no mostraba controles: había que comprobar que sí aparecen al reproducir. No se reintroduce YouTube. La CSP permanece en `frame-src 'none'` y `media-src 'self'`.

## Origen del título

El título oficial es «La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta». Ya estaba en el `title` de `VideoEmbed` en `src/pages/HospitalPage.tsx` desde el rediseño editorial (PR #20, commit `7ebeff21`), cuando el video se identificaba como `TnKV07KzkHk`. El PR #28 lo cita con ese identificador. No hay título oficial en inglés ni en francés en el historial del repositorio; por eso EN y FR conservan el título en español y solo añaden que el video está en español, igual que el pie del institucional.

## ISO/IEC/IEEE 12207

### Análisis

`VideoEmbed` tenía un único texto de pie (`UI[lang].source`) para todos los videos, copiado del institucional. Por eso `/red/marina` mostraba el pie equivocado.

### Diseño

`VideoEmbed` recibe un `caption` por idioma. La portada sigue pasando el pie institucional. La ficha de Marina pasa el título oficial en ES, y ese mismo título más la nota de idioma en EN y FR. El enlace a hospitaljoya.com no cambia.

### Construcción

| Archivo | Qué cambió |
| --- | --- |
| `src/components/VideoEmbed.tsx` | El pie deja de ser un texto único; usa `caption[lang]` |
| `src/pages/HospitalPage.tsx` | Pie del video de hemodinamia con el título oficial, en ES, EN y FR |
| `src/pages/HomePage.tsx` | El pie institucional se pasa de forma explícita y no cambia |
| `src/components/VideoEmbed.test.tsx` | Comprueba los dos pies en los tres idiomas, que no se mezclan, y que los controles aparecen al reproducir |
| `docs/calidad/CHANGELOG.md` | Entrada del 2026-11-16 |

No se tocó la CSP ni se añadió ningún iframe, identificador o mención de YouTube.

### Pruebas

- `tsc --noEmit`, ESLint y Vitest (52 pruebas, 0 fallos), incluidas las nuevas de `VideoEmbed.test.tsx`.
- Actions en el PR #30: `build` en verde (37 s). Tras el squash a `main`, `Deploy GitHub Pages` (`build` y `deploy`) y `pages build and deployment` en verde, commit `6c0d7e9`.
- Certificación en vivo, 16 nov 2026 a las 11:20 America/Monterrey (UTC-6), sobre `https://medelite.com.mx`, con el video corriendo y los controles visibles:
  - Portada ES a 1440 y 390: pie institucional correcto.
  - `/es/red/marina` a 1440 y 390: pie «La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta.»
  - `/en/red/marina` y `/fr/red/marina` a 1440: el mismo título, más «The video is in Spanish.» y «La vidéo est en espagnol.»
  - En móvil 390, al reproducir el de hemodinamia se ven pausa, barra, tiempo, silencio y pantalla completa (en la hoja anterior el cromado se había ocultado solo a los 2,6 s).
  - CSP en el HTML servido: `frame-src 'none'` y `media-src 'self'`. Sin iframe y sin la palabra YouTube en la interfaz.

Hoja de contacto (revisada visualmente, recorte completo, pies legibles): [2026-11-16-hoja-vivo-pie-hemodinamia.jpg](./2026-11-16-hoja-vivo-pie-hemodinamia.jpg).

### Resultado

El pie de hemodinamia ya no copia el del institucional. Los controles del reproductor propio se ven al reproducir en escritorio y en móvil 390. El sitio sigue sin YouTube.

