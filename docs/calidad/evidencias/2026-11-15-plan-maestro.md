# Evidencia — plan maestro y menú

Fecha: 2026-11-15. El plan está en `docs/PLAN_MAESTRO_MEDELITE.md`. Esto no certifica ISO.

## 12207

Análisis: el negocio publicado es una oficina de coordinación en Vancouver y la red Joya en México. La frase «sobrina del Dr. Joya» no está en el repositorio; queda como TODO del ingeniero y no se imprime.

Diseño: menú Inicio, Hospital Joya, MedElite, Especialidades, Médicos, Galería, Contacto. Las fotos salen de la portada suelta y entran en `/hospital-joya` y `/galeria` por categoría. Cada nombre de `DIRECTORY_SPECIALTIES` y las tres de la lista de 17 que no están en el directorio tienen ficha en `/especialidades/:id`.

Construcción: `PhotoCatalog`, `GalleryPage`, `HospitalJoyaPage`, `SpecialtyPage`, el plan y esta ficha.

Pruebas: `npm run lint`, `npm run typecheck` y `npm test` (5 archivos, 18 pruebas) en 0. `npm run build` en verde. Presupuesto `JS gzip max 78340, total 231784, foto max 139976`. Prerender: 308 archivos.

## 25010 usabilidad

El menú nombra las partes del negocio. La galería filtra por fachadas, instalaciones, quirófanos, habitaciones y urgencias, con pie de foto. Una especialidad sin sede publicada lo dice, y no recibe una foto de otra cosa. Los botones de idioma, menú y filtro miden al menos 44 px (`min-h-11`).

## 25012 y seguridad

No se añadieron precios, cédulas ni procedimientos. Los médicos de una ficha salen solo si `people.ts` ya les asigna ese enfoque. Las fotos siguen citadas en `src/data/photoCredits.ts`. No hay script ni dependencia nueva. La CSP no se tocó.
