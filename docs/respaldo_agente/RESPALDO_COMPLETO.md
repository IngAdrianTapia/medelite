# Respaldo para la cuenta siguiente

Este archivo es el contexto. Léelo junto con `docs/respaldo_agente/PENDIENTES.md` y `docs/PLAN_MAESTRO_MEDELITE.md`. No hay llaves, tokens ni contraseñas. El teléfono y el correo de abajo ya son públicos en el sitio.

Fecha: 2026-11-15. El agente que construyó esto se detuvo por orden del Ingeniero. No sigas diseñando hasta que él lo pida. Los pendientes están en los issues 5 a 11.

## Cómo retomar en una cuenta nueva

1. Clonar `https://github.com/IngAdrianTapia/medelite.git`.
2. El sitio que está en producción es `main`, merge `316f2de118778a8729e67b599d1a15f5017b347e` (PR https://github.com/IngAdrianTapia/medelite/pull/4). Este respaldo está en la rama `cursor/joya-photos-b5e5`, en commits posteriores a ese merge. Para leerlo: `git fetch origin cursor/joya-photos-b5e5` y `git checkout cursor/joya-photos-b5e5`. No mezcles esta rama a `main` solo por el respaldo, salvo que el Ingeniero pida publicar también estos markdown.
3. Node 22, el mismo del workflow. `npm ci`.
4. Comprobar: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. El build hace typecheck, cliente, SSR, prerender y `scripts/budget.mjs`.
5. Verlo: `npm run preview -- --host 127.0.0.1 --port 4173` y abrir `/en/`, `/en/canada`, `/en/galeria`, `/en/hospital-joya`, `/en/especialidades`.
6. Publicar en https://medelite.com.mx solo con un merge a `main`. El workflow `.github/workflows/pages.yml` (`Deploy GitHub Pages`) corre en cada push a `main`: `npm ci`, lint, typecheck, test, `npm audit`, build, comprueba `dist/CNAME` = `medelite.com.mx`, `dist/.nojekyll`, `dist/404.html` y la CSP, sube `dist` y lo despliega GitHub Pages. En un pull request el job de deploy no corre. No hace falta un servidor propio.
7. Después del merge, mirar la corrida de Actions y pedir `https://medelite.com.mx/en/` (debe ser 200; un 301 a `/en/` también es normal). El HTML de las rutas lazy sigue en placeholder hasta el issue 5: para ver la página hace falta JavaScript.
8. Rama nueva de trabajo: `cursor/<nombre>-b5e5`, en minúsculas, desde `main` actualizado. No dejes código a medias en `main`. Si algo no compila, va en la rama y no se mergea.
9. Leer `PENDIENTES.md` y no empezar el posicionamiento (issue 6) hasta que el brief esté en la conversación.

## Qué es el negocio, y qué no se puede afirmar

MedElite International Health es la oficina de coordinación en Vancouver. Conecta pacientes, incluidos los de Canadá, con Grupo Médico Joya. El acto médico ocurre en México, con el cirujano del hospital. MedElite no diagnostica, no prescribe y no opera. El cuestionario de la portada no es una consulta.

Marina Vallarta (Puerto Vallarta) y Riviera Nayarit (Nuevo Vallarta) son las sedes de esa bahía. Hay nueve sedes abiertas. El render de Manzanillo no entra: no es una foto. Las fotos con pacientes no entran.

Erika Cruz Joya figura en medeliteofficial.com como fundadora y directora ejecutiva, con una relación cercana a la red. La foto está en `public/assets/img/equipo/erika-cruz-joya.jpg`. No publicar que es sobrina del Dr. Joya (issue 10).

Contacto ya público: info@medeliteofficial.com y +1 (604) 442-8475, lunes a viernes, 9:00 a 17:00, hora de Vancouver. No hay domicilio de calle publicado.

## Decisiones ya tomadas

- El logo horizontal es PNG transparente, sin caja blanca, con contorno blanco de 1 px. Archivo: `public/assets/brand/medelite-logo-horizontal.png`. Componente: `src/components/BrandMark.tsx`. En el header, alto `h-8` en móvil y `h-14` / `h-16` desde `sm`.
- El hero no pone texto encima de la foto. En escritorio van lado a lado; en móvil, la foto arriba y el texto abajo, sobre navy `#071827`.
- `ContactDock` no se muestra en pantallas chicas (`hidden md:block`) para no tapar el contenido.
- `main .grid > * { min-width: 0 }` evita que la rejilla se salga.
- Las fotos Joya no van sueltas en la portada. Viven en `/hospital-joya` y `/galeria`, por categoría.
- No se amplió ninguna foto por encima de su resolución nativa. Real-ESRGAN no quedó en el pipeline: en esta máquina el binario Vulkan no era viable. El recorte y el WebP/AVIF los hizo `sharp`. Si una foto no alcanza el tamaño de pantalla, se deja de usar; no se estira.
- Inglés de Canadá primero. `html` de la portada es `en-CA`. `x-default` apunta a `/en`. El interruptor del header va EN, ES, FR. Francés es `fr-CA`, español `es-MX`.
- `/canada` reúne textos que ya existían. No es un posicionamiento nuevo. El menú principal no la incluye (issue 11).
- Cada especialidad de las dos listas tiene ruta `/especialidades/:id`. Sin procedimientos inventados (issue 7).
- Presupuesto en `scripts/budget.mjs`: un JS gzip ≤ 90 000 bytes, todos los JS gzip ≤ 280 000, cada foto ≤ 140 000. El build del 2026-11-15 en esta rama imprimió `JS gzip max 78340, total 233079, foto max 139976`.

## Menú y mapa

Menú principal, en `src/components/Header.tsx`:

| Etiqueta | Ruta |
| --- | --- |
| Inicio | `/` |
| Hospital Joya | `/hospital-joya` |
| MedElite | `/que-es` |
| Especialidades | `/especialidades` |
| Médicos | `/equipo` |
| Galería | `/galeria` |
| Contacto | `/#cotizar` |

El idioma antepone `/en`, `/es` o `/fr`. `/` sin prefijo acaba en el idioma activo; el prerender de la raíz es inglés.

Fuera del menú, para no dispersar: `/canada` (pie), `/red` y `/red/:id`, `/bariatrica`, `/vuelos`, `/ruta`, `/mapa`, `/seguros`, `/preparacion`, `/comparar`, `/hospitales`, legales (`/privacy`, `/privacidad`, `/terms`, `/terminos`).

`src/i18n/locale.ts` parte el prefijo. `LocaleSync` en `src/App.tsx` redirige. `src/components/Seo.tsx` escribe canonical y hreflang hacia `https://medelite.com.mx`.

## Especialidades

Nombres y etiquetas: `src/data/joya.ts` y `src/i18n/labels.ts`.

17 de hospitaljoya.com/especialidades (`PUBLIC_SPECIALTIES`): cardiology, dermatology, endocrinology, gastroenterology, gynecology, general-surgery, nephrology, orthopedics, ent, ophthalmology, urology, general-practice, internal-medicine, pulmonology, neurology, nutrition, pediatrics.

33 del filtro del directorio (`DIRECTORY_SPECIALTIES`): algology, anesthesiology, angiology, cardiology, bariatric, cardiothoracic, endoscopic-surgery, general-surgery, maxillofacial, surgical-oncology, gyn-oncology, pediatric-surgery, plastic, spine, gastroenterology, geriatrics, gynecology, hematology, infectious-disease, critical-care, rehab, internal-medicine, nephrology, neonatology, pulmonology, neurosurgery, neurology, ophthalmology, oncology, ent, pediatrics, orthopedics, urology.

Tres de la lista de 17 no están en el directorio y también tienen ficha: dermatology, endocrinology, general-practice. Están al final de `SPECIALTY_PATHS` en `scripts/prerender.mjs`. Si se añade un id, hay que añadirlo ahí o el HTML estático no se genera.

Sedes que sí están enlazadas (`SPECIALTY_SITES`): cardiology marina/guadalajara/cancun; gynecology marina/riviera/cancun/playa; orthopedics marina/riviera; urology marina/riviera/guadalajara/playa; pediatrics marina/guadalajara/queretaro/cancun/playa/penita. El resto de esa tabla está vacío a propósito (issue 8).

Fotos en una ficha: solo si `ROOM_PHOTO` en `SpecialtyPage.tsx` pide quirófano (orthopedics, bariatric, plastic, spine, general-surgery, neurosurgery) o si hay una sede y se usa su fachada. No se usa una habitación genérica de relleno.

## Fotos

Créditos y URL de origen: `src/data/photoCredits.ts`. Categorías de `GALLERY_ITEMS`: fachadas de las nueve sedes, quirófanos vacíos, habitaciones vacías, instalaciones de Cancún (vestíbulo y tomógrafo) y la fachada de La Peñita también bajo urgencias porque el letrero que se ve es el de urgencias. Componente: `src/components/PhotoCatalog.tsx` y `src/components/FacilityPhoto.tsx` (AVIF, WebP, ancho explícito). El zip original no está en el repo; no hace falta para publicar. La trazabilidad que vale es `photoCredits.ts`.

## Fuentes que el sitio ya cita

`src/data/sources.ts`: Fraser Institute Waiting Your Turn 2025, el comunicado de canadienses que salen a tratarse, El Informador (conectividad PVR–Canadá), Directflights YVR–PVR, Snowbyrds, hospitaljoya.com, el comunicado de HM Hospitales del 10 de septiembre de 2026, medeliteofficial.com, y la página de gastos médicos de la CRA. Redes: Instagram `@medelite.ca`, TikTok `@medelite.ca`, y el Facebook cuyo id ya está en ese archivo.

## Estándares

No se certifican. Se trabaja como si hubiera que dejar evidencia.

- ISO/IEC 25010: que se entienda, que quepa de 320 a 1920 px, sin scroll horizontal, sin salto de layout, LCP rápido. Botones de al menos 44 px (`min-h-11 min-w-11`). Contraste AA sobre navy y oro.
- ISO/IEC 25012: cada foto con URL en `photoCredits.ts`. Nada de médicos, cédulas, precios o parentescos sin fuente. Lo que falte se marca TODO del Ingeniero, no se rellena.
- ISO/IEC/IEEE 12207: por cambio, una ficha en `docs/calidad/evidencias/` con análisis, diseño, construcción, pruebas y entrega. Índice en `docs/calidad/README.md` y línea en `docs/calidad/CHANGELOG.md`.
- ISO/IEC 27001 y OWASP ASVS / Top 10: sin secretos en el repo, CSP ya inyectada en el HTML (`default-src 'self'`), el sitio no cobra ni guarda tarjetas, el formulario no es un diagnóstico.
- Stack obligatorio: React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Motion (`motion/react`), React Router 7, Vite. Sistema propio. Paleta navy `#071827`, marfil, oro. Estilo de la portada: ritmo de espacio, jerarquía tipográfica y movimiento contenido, del orden de Linear o Notion, no un collage.
- `prefers-reduced-motion` se respeta. El carril del recorrido en `HomePage.tsx` tiene una lista horizontal si el usuario lo pide.

## Reglas del Ingeniero

- El sitio sigue el negocio: MedElite coordina, Joya atiende. Menú coherente. Fotos por lo que son, no regadas.
- Inglés primero para Canadá. Español y francés se mantienen. No borrar un idioma.
- No inventar médicos, cédulas, precios, plazos garantizados ni el parentesco.
- El pase de posicionamiento (cinco estrellas, Toronto, Calgary, brechas de precio, turismo internacional) espera el brief. Los huecos están en `src/content/positioning.ts`.
- Cada cambio que sí se publique lleva evidencia y, si toca la UI, hay que mirarla en el navegador (escritorio y móvil), no solo el build.
- Parar cuando el uso o una orden lo pidan. Guardar en GitHub. Lo roto no entra a `main`.

## Deploy al pausar

- PR mergeado: https://github.com/IngAdrianTapia/medelite/pull/4
- Commit de merge en `main`: `316f2de118778a8729e67b599d1a15f5017b347e`
- Último commit de producto en la rama, ya contenido en ese merge: `369e9c616ecc2aeffb739dfbea8f98002c4580ee` (página Canadá y huecos de posicionamiento).
- Workflow verde: https://github.com/IngAdrianTapia/medelite/actions/runs/43683635892
- En vivo, 2026-11-15: `https://medelite.com.mx/en/` y `https://medelite.com.mx/en/canada/` responden 200. El HTML de Canadá todavía es el placeholder (issue 5). La página se ve cuando corre el JavaScript.

## Prompts que no hay que volver a interpretar

- Logo: PNG transparente, contorno blanco de 1 px, sin caja blanca, sobre el navy del header y del footer.
- Fotos Joya: solo las autorizadas, sin pacientes y sin el render de Manzanillo. Crédito por archivo. No pixelar ni ampliar de más. Responsive de 320 a 1920.
- Menú: Inicio, Hospital Joya, MedElite, Especialidades, Médicos, Galería, Contacto. Galería con filtros.
- Plan maestro antes de más copy: `docs/PLAN_MAESTRO_MEDELITE.md`.
- Después del estudio de mercado se perfila el posicionamiento. Hasta entonces, no reescribirlo.
- Al pausar: issues de pendientes, este respaldo, y parar.

## Dónde está cada cosa

| Tema | Ruta |
| --- | --- |
| Plan | `docs/PLAN_MAESTRO_MEDELITE.md` |
| Pendientes | `docs/respaldo_agente/PENDIENTES.md` |
| Evidencia | `docs/calidad/evidencias/` |
| Textos | `src/i18n/es.ts`, `en.ts`, `fr.ts`, `labels.ts` |
| Posicionamiento editable | `src/content/positioning.ts` |
| Sedes y especialidades | `src/data/hospitals.ts`, `src/data/joya.ts` |
| Personas | `src/data/people.ts` |
| Fotos | `src/data/photoCredits.ts`, `public/assets/photos/` |
| Rutas | `src/App.tsx`, `scripts/prerender.mjs` |
| Presupuesto | `scripts/budget.mjs` |
| Publicación | `.github/workflows/pages.yml` |
