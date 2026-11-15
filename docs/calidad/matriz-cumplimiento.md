# Matriz de cumplimiento

Medición del 2026-11-15 en este árbol. «Cumple» significa que el control tiene implementación y un resultado observado. No significa certificado.

## ISO/IEC 25010

| Característica | Implementación | Prueba | Resultado |
| --- | --- | --- | --- |
| Adecuación funcional | Rutas de red, sedes, equipo, vuelos, ruta, comparar, seguros, preparación, privacidad y términos. El cuestionario no avanza con campos inválidos. Mi Ruta no asigna dentista ni fertilidad | `npm test`: `wizard.test.ts`, `journey.test.ts`, `QuoteWizard.test.tsx` | 17 pruebas, 0 fallos |
| Eficiencia de desempeño | `manualChunks` separa `react` y `motion`. Fotos con AVIF/WebP y `srcset` al ancho real. Duplicados byte a byte eliminados (la carpeta pasó de 3.6 MB a 2.8 MB, 60 archivos). Presupuesto en `scripts/budget.mjs` | `npm run build` | Log de Vite: `react` 249.43 kB (gzip 79.17 kB), `motion` 146.17 kB (gzip 49.21 kB), `index` 108.28 kB (gzip 31.16 kB), CSS 25.41 kB (gzip 5.93 kB). Presupuesto (zlib): JS gzip máximo 78,335, total 219,284, foto máxima 126,016 (`operating-room-1280.webp`). Límites: 90,000 / 240,000 / 140,000 |
| Compatibilidad | Mismos componentes en es, en y fr. HTML prerenderizado. Sin APIs de un solo navegador fuera de lo que ya usaba el sitio | Build de prerender, 74 archivos en el service worker | Build en verde. El service worker no precachea fotos, audio ni la foto de Erika |
| Usabilidad (WCAG 2.2 AA, los huecos tocados) | Foco visible y `scroll-padding` para que la cabecera fija y la barra inferior no tapen el foco. Subrayado `decoration-current` (el token `decoration-line` #e2e8f0 no se distinguía). Placeholder en `--color-muted` (#475569 sobre blanco, por encima de 4.5:1). Menú móvil siempre con `id`, Escape devuelve el foco, botones de idioma con `lang`. Alerta del cuestionario enfocable y campos con `aria-invalid` / `aria-describedby`. Regiones con scroll enfocables (cifras, comparación, diagrama). `autocomplete` en el formulario de hospitales. Audio con nombre accesible. Dock como `nav` | Revisión de código y build. No se añadió un job de accesibilidad, por instrucción del dueño | Los controles de arriba quedan en el código. Una auditoría WCAG externa, con lectores de pantalla, sigue pendiente |
| Fiabilidad | Prerender, `dist/404.html`, service worker con limpieza de cachés viejas. El sitio sigue si el JS de una ruta perezosa tarda: hay fallback de texto | Build y prueba de hidratación ya existente en `src/main.tsx` | `prerendered pages, service worker precache 74 files` |
| Seguridad | Ver [seguridad.md](./seguridad.md) | `npm audit` y grep de CSP en el workflow | Producción: 0 vulnerabilidades. Árbol completo: 4 low en la herramienta de build, 0 moderate o superiores |
| Mantenibilidad | TypeScript estricto, ESLint, datos con fuente, esta carpeta | `npm run lint`, `npm run typecheck` | Ambos en 0 |
| Portabilidad | Build estático. No exige Node en producción | Artefacto `dist` del workflow de Pages | El job de deploy existente no se reemplazó |

## ISO/IEC 25012

Detalle en [calidad-datos.md](./calidad-datos.md).

| Característica | Implementación | Prueba | Resultado |
| --- | --- | --- | --- |
| Exactitud | Personas y sedes citan la página de origen. Erika solo con texto y foto ya publicados | Lectura de `people.ts` y de i18n | Sin biografía nueva |
| Completitud | Lo que falta de Erika está en un TODO en el código, no rellenado | Inspección de `people.ts` | Cédula, estudios y URL de About Us siguen vacíos a propósito |
| Consistencia | El aviso de privacidad en es/en/fr coincide con `sessionStorage` | Diff de los tres archivos de idioma | Los tres describen el mismo subconjunto |
| Actualidad | Se quitaron tarifas del 14 de noviembre de 2026 que la UI no usaba y cuya moneda no estaba confirmada | `src/lib/flights.test.ts` | El módulo no exporta esas cifras |
| Credibilidad | `src/data/sources.ts` | La portada lista esas URLs | Sin fuentes nuevas inventadas |

## ISO/IEC/IEEE 12207

| Proceso | Evidencia | Resultado |
| --- | --- | --- |
| Análisis | Huecos listados en [requisitos-y-diseno.md](./requisitos-y-diseno.md) | Alcance cerrado a sitio estático y a datos ya presentes |
| Diseño | Misma página y [seguridad.md](./seguridad.md) | Sin backend nuevo |
| Construcción | Commit en `main` | Código y docs juntos |
| Pruebas | Lint, tipos, 17 pruebas, auditoría, build con presupuesto | Todos en verde en la medición de esta fecha |
| Entrega | `.github/workflows/pages.yml`: install, lint, typecheck, test, `npm audit --omit=dev`, `npm audit --audit-level=moderate`, build, comprobación de CNAME y CSP, deploy a Pages solo en push a `main` | El deploy anterior se conserva |
| Mantenimiento | CHANGELOG y presupuesto que falla el build si el JS o una foto se pasan | Queda en el repositorio |

## ISO/IEC 27001

| Control | Implementación | Prueba | Resultado |
| --- | --- | --- | --- |
| Control de acceso | Sin login de pacientes. Secretos fuera de git | Revisión de `.gitignore` y del árbol | No hay `.env` ni llaves. El acceso al repo es de GitHub, no de este código |
| Respaldos | Git y el artefacto de Pages | Historial del remoto | No hay otro almacén |
| Cifrado | HTTPS de Pages. CSP con `upgrade-insecure-requests` | Meta CSP en `dist/index.html` | Presente, con `frame-src 'none'` |
| Trato de los datos | Contacto y salud fuera de `sessionStorage`. Tarjetas rechazadas en el cuestionario | `wizard.test.ts` y revisión del efecto de guardado | El aviso de privacidad coincide |

## OWASP

| Control | Implementación | Prueba | Resultado |
| --- | --- | --- | --- |
| ASVS V5 validación | `stepErrors` en `src/lib/wizard.ts` | `src/lib/wizard.test.ts` y el recorrido del cuestionario | Pruebas en verde |
| ASVS V8 protección de datos | No se persisten nombre, correo, teléfono, nota, edad, IMC ni condiciones | Código de `QuoteWizard.tsx` | Guardado reducido |
| ASVS V14 configuración | CSP, sin source maps (`sourcemap: false`), lockfile | Build y auditoría | Ver cifras de arriba |
| Top 10 | Mapa en [seguridad.md](./seguridad.md) | La misma auditoría y la ausencia de API | A07 y A10 sin superficie. A09 sin bitácora de servidor |
