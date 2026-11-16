# Pendientes

Fecha de este respaldo: 2026-11-15. Un agente nuevo puede retomar solo con este archivo, `RESPALDO_COMPLETO.md` y el código. No hay secretos aquí.

El sitio publicado en `main` (merge `316f2de`) ya incluye menú, galería, fichas de especialidad y `/canada`. Lo de abajo no está hecho. No se inventan médicos, cédulas, precios ni parentescos para cerrarlos.

## 1. HTML estático de las rutas lazy

- Prioridad: alta
- Issue: https://github.com/IngAdrianTapia/medelite/issues/5
- Qué falta: `src/entry-server.tsx` usa `renderToString`. No espera a `React.lazy`. El HTML que GitHub Pages sirve trae el fallback de `Suspense` en `src/App.tsx` (`<p class="text-sm text-muted">…</p>`), no la página. Confirmado en vivo el 2026-11-15: `https://medelite.com.mx/en/canada/` responde 200 y el `<main>` es ese placeholder. Con JavaScript el cliente sí muestra la página.
- Archivos: `src/entry-server.tsx`, `src/App.tsx` (casi todas las páginas salvo `HomePage` y `LegalPage` van con `lazy()`), `scripts/prerender.mjs`.
- Por qué importa: sin JS no se ve Canadá, la galería, Hospital Joya ni las especialidades. Un rastreador que no ejecuta el bundle tampoco.
- Pasos: 1) Cambiar el render del servidor para que espere todas las fronteras de `Suspense` (`renderToPipeableStream` con `onAllReady`, o el prerender estático de React 19). 2) Hacer `async` el `writePage` de `scripts/prerender.mjs`. 3) `npm run build`. 4) Abrir `dist/en/canada/index.html`, `dist/en/galeria/index.html`, `dist/en/hospital-joya/index.html` y `dist/en/especialidades/index.html` y comprobar que el `h1` es el de la página. 5) No subir el presupuesto de `scripts/budget.mjs`.
- Criterio de terminado: esos cuatro HTML traen su `h1` real y no el placeholder. El build queda en verde. Un intento anterior con `renderToPipeableStream` se revirtió antes de probarlo: no está en el repo y no hay que darlo por bueno.
- No hacer: no convertir todas las páginas en imports estáticos del bundle principal si eso pasa de 90 KB gzip en un solo JS o de 280 KB gzip en total.

## 2. Brief de marketing y posicionamiento

- Prioridad: alta, bloqueada hasta que llegue el brief
- Issue: https://github.com/IngAdrianTapia/medelite/issues/6
- Qué falta: el Ingeniero va a mandar el estudio. Prometió posicionamiento de cinco estrellas, ciudades de Canadá (Vancouver, Toronto, Calgary), turismo médico internacional, especialidades y brechas de precio. Orden expresa: no hacer el pase final de copy ni de posicionamiento antes de ese texto.
- Archivos: `src/content/positioning.ts` (`POSITIONING_STATUS`, `BRIEF_SLOTS`, `POSITIONING`, `CANADA_CITIES`, `FIVE_STAR`, `PRICE_GAPS`, `CANADA_CHROME`), `src/content/positioning.test.ts`, `src/i18n/en.ts` (`hero`, `verticals`, `packages.note`), los mismos bloques en `src/i18n/es.ts` y `src/i18n/fr.ts`, `src/pages/HomePage.tsx` (lee `POSITIONING`), `src/pages/CanadaPage.tsx`.
- Estado actual: `FIVE_STAR` y `PRICE_GAPS` son `null`. Toronto y Calgary están `awaiting-brief` con etiqueta vacía y `publishedCities()` no las devuelve. Vancouver sí se publica. El titular de portada ya publicado es «Get treated in weeks, not years.» / «Atenderse en semanas, no en años.» / «Se faire soigner en semaines, pas en années.» No se cambia hasta el brief.
- Por qué importa: es el siguiente encargo del Ingeniero. Adelantarlo inventa una marca que él todavía no entregó.
- Pasos: 1) Esperar el brief. 2) Citarlo en el repo (de dónde salió cada frase nueva). 3) Editar solo los huecos de `BRIEF_SLOTS`. 4) Traducir a es, en y fr. 5) Actualizar `positioning.test.ts`, que hoy falla si `FIVE_STAR` o `PRICE_GAPS` dejan de ser null. 6) Si Toronto o Calgary entran, poner `status: "published"` y la etiqueta en los tres idiomas. 7) No crear precios nuevos.
- Criterio de terminado: cada frase nueva tiene fuente o está copiada del brief, existe en los tres idiomas, la prueba se actualizó a propósito y `/canada` no muestra una ciudad con etiqueta vacía.
- No hacer: no escribir «cinco estrellas», no poner Toronto ni Calgary, no inventar un porcentaje de ahorro distinto del que ya cita `packages.note` (50–70 % como declaración comercial de medeliteofficial.com, no como auditoría).

## 3. Procedimientos por especialidad

- Prioridad: media
- Issue: https://github.com/IngAdrianTapia/medelite/issues/7
- Qué falta: ninguna ficha tiene lista de procedimientos. `src/pages/SpecialtyPage.tsx` lo dice en los tres idiomas y lo marca como TODO del Ingeniero.
- Archivos: `src/pages/SpecialtyPage.tsx`, `src/data/joya.ts` (`PUBLIC_SPECIALTIES`, `DIRECTORY_SPECIALTIES`), `src/i18n/labels.ts` (`SPECIALTY_LABEL`, `DIRECTORY_LABEL`), `scripts/prerender.mjs` (`SPECIALTY_PATHS`).
- Por qué importa: el Ingeniero pidió el catálogo completo (descripción, procedimientos, médicos, fotos, CTA). Hoy hay nombre, sede si existe, médico si el `focus` coincide, una foto solo en algunos casos, y el CTA a `/#cotizar`. Los procedimientos son el hueco.
- Pasos: 1) Para cada id, abrir la página pública de Joya o de MedElite que hable de esa especialidad. 2) Si enumera actos, copiarlos y guardar la URL al lado del dato. 3) Si no los enumera, dejar la nota y poner la fecha de la revisión. 4) No redactar una lista de memoria.
- Criterio de terminado: los 17 de `PUBLIC_SPECIALTIES` y los 33 de `DIRECTORY_SPECIALTIES` tienen o lista con URL o nota fechada de que la fuente no la trae.

## 4. Sedes de las especialidades sin hospital

- Prioridad: media
- Issue: https://github.com/IngAdrianTapia/medelite/issues/8
- Qué falta: `SPECIALTY_SITES` en `src/data/joya.ts` solo enlaza un hospital cuando la ficha de esa sede nombra el servicio. Con arreglo vacío: dermatology, endocrinology, gastroenterology, general-surgery, nephrology, ent, ophthalmology, general-practice, internal-medicine, pulmonology, neurology, nutrition. Las que solo están en el directorio (bariatric, plastic, spine, oncology, y el resto de `DIRECTORY_SPECIALTIES` que no es clave de `SPECIALTY_SITES`) no tienen mapa de sedes.
- Archivos: `src/data/joya.ts`, `src/pages/SpecialtyPage.tsx`, `src/pages/SpecialtiesPage.tsx`, `src/data/hospitals.ts`.
- Por qué importa: asignar una sede que la ficha no nombra presenta como hecho algo que Joya no publicó. El comentario del código lo prohíbe: no se adivina a partir de «más de 30 especialidades».
- Pasos: 1) Releer la ficha de cada sede en hospitaljoya.com. 2) Si nombra la especialidad, añadir el id del hospital. 3) Si no, dejar `[]` y anotar la fecha. 4) Oftalmología ya muestra en el índice, como ruta de coordinación de MedElite y no como asignación de Joya, Cancún y Playa del Carmen (`SpecialtiesPage.tsx`). No convertir eso en `SPECIALTY_SITES` sin una ficha que lo diga.
- Criterio de terminado: cada id vacío quedó o con sedes citadas o con una nota fechada. Cero sedes por intuición.

## 5. Médicos, cédulas y biografías

- Prioridad: media
- Issue: https://github.com/IngAdrianTapia/medelite/issues/9
- Qué falta: el 14 de noviembre de 2026 el directorio de hospitaljoya.com no mostraba médicos. `src/pages/PeoplePage.tsx` lo dice. `src/data/people.ts` solo guarda quien ya aparece en drjoyaofficial.com, en una nota de hospitaljoya.com, o a Erika Cruz Joya porque medeliteofficial.com la nombra fundadora y directora ejecutiva. Faltan, y el changelog los dejó en TODO: biografía larga, cédula y URL exacta de About Us de Erika.
- Archivos: `src/data/people.ts`, `src/data/personRoles.ts`, `src/pages/PeoplePage.tsx`, `src/pages/SpecialtyPage.tsx` (mapa `FOCUS`), `docs/calidad/CHANGELOG.md`.
- Médicos que una ficha sí puede mostrar, porque el `focus` ya está en el dato: bariátrica, anestesiología, nutrición, medicina interna, cirugía general. Las demás fichas dicen que no hay un nombre con ese enfoque.
- Por qué importa: un nombre o una cédula inventados son un dato clínico falso.
- Pasos: 1) Volver a abrir el directorio y anotar la fecha. 2) Si hay nombres nuevos, copiarlos con la URL. 3) Cédula y biografía solo si esa misma página las trae. 4) Si sigue vacío, cambiar la fecha del texto en es/en/fr y no añadir personas.
- Criterio de terminado: la página dice la fecha de la última revisión y cada persona nueva tiene URL. Cero cédulas escritas de memoria.

## 6. «Erika es sobrina del Dr. Joya»

- Prioridad: media
- Issue: https://github.com/IngAdrianTapia/medelite/issues/10
- Qué falta: el Ingeniero lo dio como contexto. El repo no tiene esa frase ni una URL. Lo que sí se imprime está en `src/i18n/es.ts`, `en.ts` y `fr.ts`: fundadora y directora ejecutiva, relación cercana con la red, según medeliteofficial.com. `docs/PLAN_MAESTRO_MEDELITE.md` lo dejó en TODO.
- Archivos: `src/i18n/es.ts`, `src/i18n/en.ts`, `src/i18n/fr.ts` (bloque `about`), `src/data/people.ts`, `src/pages/HomePage.tsx` (sección `#nosotros`), `docs/PLAN_MAESTRO_MEDELITE.md`.
- Por qué importa: publicarlo sin fuente afirma un parentesco que las páginas citadas no dicen.
- Pasos: 1) Buscar la frase en medeliteofficial.com o en una nota que el Ingeniero acepte. 2) Si aparece, copiarla a los tres idiomas y guardar la URL. 3) Si no aparece, dejar el TODO.
- Criterio de terminado: la frase pública está en los tres idiomas con su URL, o sigue sin publicarse.

## 7. Canadá en el menú principal

- Prioridad: baja
- Issue: https://github.com/IngAdrianTapia/medelite/issues/11
- Qué falta: `/canada` está en el pie (`src/components/Footer.tsx`) y no en el menú (`src/components/Header.tsx`). El plan (`docs/PLAN_MAESTRO_MEDELITE.md`) dejó la decisión para después del brief.
- Por qué importa: meterla ahora alarga una barra que el Ingeniero acaba de ordenar. Dejarla fuera esconde la versión Canadá si el brief la quiere de primero.
- Pasos: 1) Esperar el brief o una orden. 2) Si entra, añadir el enlace en el header, comprobar que a 1024 px no se sale, y actualizar el plan. 3) Si no entra, escribirlo en el plan y dejar el pie.
- Criterio de terminado: el menú y `docs/PLAN_MAESTRO_MEDELITE.md` dicen lo mismo que la orden.
