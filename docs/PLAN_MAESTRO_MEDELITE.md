# Plan maestro — MedElite

Fecha: 2026-11-15. Esto no certifica ISO. Ordena el sitio como negocio y dice qué se conserva, qué se reescribe y qué falta.

## Contexto de negocio

MedElite International Health es la oficina de coordinación en Vancouver. Conecta pacientes, incluidos los de Canadá, con la red de Hospital Joya. El acto médico ocurre en México, con el cirujano del hospital. Hoy el socio que el sitio nombra es Grupo Médico Joya, con nueve sedes. Marina Vallarta (Puerto Vallarta) y Riviera Nayarit (Nuevo Vallarta) son las sedes de esa bahía.

Lo que sí está publicado, y el sitio puede decir:

- Erika Cruz Joya figura en medeliteofficial.com como fundadora y directora ejecutiva, con una relación cercana a la red Joya. Fuente ya citada en i18n. Foto en el repositorio.
- El recorrido publicado es administrativo: cuestionario, videollamada informativa, viaje, estancia, informe al médico de familia. MedElite no diagnostica, no prescribe y no opera.
- Contacto publicado: info@medeliteofficial.com y +1 (604) 442-8475, lunes a viernes, 9:00 a 17:00, hora de Vancouver.

TODO(ingeniero): el enunciado «Erika es sobrina del Dr. Joya» no está en los textos de este repositorio. No se imprime hasta que haya una frase pública que se pueda citar.

## Mapa del sitio

| Menú | Ruta | Qué contiene |
| --- | --- | --- |
| Inicio | `/` | Historia de coordinación, recorrido, sedes, paquetes de rodilla ya publicados, contacto |
| Hospital Joya | `/hospital-joya` | Fotos agrupadas: fachadas, instalaciones, quirófanos, habitaciones, urgencias |
| MedElite | `/que-es` | Qué es la oficina de Vancouver |
| Especialidades | `/especialidades` y `/especialidades/:id` | Las 17 de la página Joya y las 33 categorías del directorio, cada una con ficha |
| Médicos | `/equipo` | Solo nombres ya publicados, con retrato si la colección lo trae |
| Galería | `/galeria` | Las mismas fotos, con filtro por categoría |
| Contacto | `/#cotizar` | Cuestionario. El sitio no cobra |

Siguen existiendo, fuera del menú principal para no dispersar: `/red` y `/red/:id` (la ficha de cada sede), `/bariatrica`, `/vuelos`, `/ruta`, `/mapa`, `/seguros`, `/preparacion`, `/comparar`, legales.

## Inventario

| Pieza | Decisión |
| --- | --- |
| Hero, recorrido, paquetes de rodilla, aviso de que no es cotización | Conservar. Ya citan Fraser, CRA y medeliteofficial.com |
| Franja suelta de quirófano, habitación, tomógrafo y vestíbulo en la portada | Quitar. Esas fotos viven en Hospital Joya y en la galería |
| Menú anterior (Qué es, Red, Ruta, Vuelos, Mapa) | Reescribir al menú de arriba |
| Foto de especialidad sin sede nombrada (antes caía en una habitación genérica) | Quitar. Solo hay foto si la ficha nombra una sede o si es quirófano de una cirugía ya descrita |
| Render de Manzanillo y fotos con pacientes | No entran |
| Precios nuevos, cédulas nuevas, biografías | No se inventan. TODO donde falten |

## Especialidades y fuente

La lista de 17 sale de `PUBLIC_SPECIALTIES` (hospitaljoya.com/especialidades). La de 33 sale de `DIRECTORY_SPECIALTIES` (filtro del directorio). `SPECIALTY_SITES` solo enlaza un hospital cuando la ficha de esa sede nombra el servicio. Donde el arreglo está vacío, la ficha dice que la página de especialidades no asigna sede.

No hay, en este repositorio, una lista de procedimientos por especialidad. Cada ficha lo marca como TODO(ingeniero). Los médicos relacionados salen solo de `people.ts` cuando el `focus` ya publicado coincide: bariátrica, anestesiología, nutrición, medicina interna, cirugía general.

## Fotos

Categorías en `GALLERY_ITEMS`: fachadas de las nueve sedes, quirófanos vacíos, habitaciones vacías, instalaciones de Cancún (vestíbulo y tomógrafo) y la fachada de La Peñita también bajo urgencias porque el letrero de urgencias es lo que la foto muestra. Créditos y URL en `src/data/photoCredits.ts`.
