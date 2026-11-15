# Calidad de los datos (`src/data`)

Norma de referencia: ISO/IEC 25012. Los datos viven en el repositorio. No hay un almacén de pacientes.

## Exactitud

Cada ficha de persona en `src/data/people.ts` trae la fuente y la URL. Las cédulas solo aparecen cuando la fuente ya las publicaba (Dr. Armando Joya). El resto queda con `credentials: []`.

Erika Cruz Joya se agregó con lo que ya estaba en el repositorio:

- Nombre y cargo de fundadora y directora ejecutiva, tomados de los textos de `src/i18n/es.ts`, `en.ts` y `fr.ts`, que citan la página About Us de medeliteofficial.com.
- Foto ya existente: `public/assets/img/equipo/erika-cruz-joya.jpg` (640×800).
- URL de fuente ya existente en `src/data/sources.ts`: `https://www.medeliteofficial.com/`.

TODO(owner), marcado en `src/data/people.ts`: no están en el repositorio, y no se inventan, la biografía, la cédula, los estudios, los premios, un conteo de pacientes ni la URL exacta de la página About Us. Solo está la raíz del sitio oficial.

La Dra. Ana Carolina Belloso sigue solo en los textos de la portada (`about.anaName` y párrafos vecinos). No hay retrato en `public/` y este cambio no la pasó a `people.ts`.

## Integridad y completitud

`src/data/flights.ts` ya no contiene las tarifas de muestra del 14 de noviembre de 2026 (YVR 368–559 y 752–1088, YYC 494.63–627.63 y 659.53–892.41, YYZ 650.83 y 653.61–1238.83, moneda sin confirmar). La interfaz de `/vuelos` y de Mi Ruta no las mostraba: pedía cotizar con el coordinador. Se eliminaron para que un build no pudiera volver a publicarlas por accidente. La prueba `src/lib/flights.test.ts` fija que esas cifras y los exportes `PVR_SAMPLES`, `quoteStaticSample`, `illustrateTotal` y `formatSampleAmount` no existen.

Siguen los códigos de origen (YVR, YYC, YEG, YYZ, YUL, YOW, YWG) y el aeropuerto de planeación de cada sede (`HOSPITAL_AIRPORT`). Eso no es una tarifa ni un tiempo de traslado medido.

Los rangos de paquete en `src/data/packages.ts` no se modificaron. Siguen siendo el rango de planeación de rodilla que el archivo ya declaraba, en CAD, sujeto a valoración.

## Consistencia y actualidad

El aviso de privacidad, en los tres idiomas, describe ahora lo que el cuestionario guarda de verdad: procedimiento, paquete, mes, si la persona ya está en México y si viaja con acompañante. No guarda nombre, correo, teléfono, ciudad, notas, edad, IMC ni condiciones.

Las fechas de lectura que ya traían las fichas (14 de noviembre de 2026 para el directorio y las sedes) no se reescribieron. No se consultó de nuevo hospitaljoya.com en este cambio.

## Credibilidad

`src/data/sources.ts` lista las fuentes con su URL (Fraser Institute, hospitaljoya.com, HM Hospitales, CRA, medeliteofficial.com, Directflights, El Informador, Snowbyrds). El sitio no presenta esas citas como una auditoría clínica propia.
