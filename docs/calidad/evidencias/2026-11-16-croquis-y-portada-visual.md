# 2026-11-16 — croquis inmersivo de sedes y portada visual

Pedido de Adrián (16 nov, textual): «El mapa tiene que ser con nombres de calles eso no se entiende tiene que ser como un croquis más que un mapa con referencias reales y logos de negocios cercas el cómo llegar … algo inmersivo y interactivo y fluido». Después (12:08): «quiero menos texto, más imágenes, más intuitivo, más fácil de recorrer, y más moderno … no quiero una pinche plantilla de IA».

## Qué se implementó

### Croquis de cada sede (`src/components/MapaRed.tsx`)
- MapLibre GL 6.18 con el estilo *liberty* de OpenFreeMap (sin clave, sin anuncios). Calles en su nombre real (`name`, español), en negritas, más grandes y con halo blanco. Edificios en 3D, inclinación de 58° y giro por sede; botón 2D/3D.
- Vuelo animado (`flyTo`) entre las nueve sedes desde una tira de fotos. Respeta «reducir movimiento».
- Referencias reales cercanas: `src/data/sedePois.ts`, generado desde `api.openstreetmap.org/api/0.6/map` (≈700 m alrededor de cada sede, 16 nov 2026). Se omiten hospitales y clínicas. Cada referencia guarda su elemento OSM (`node/…` o `way/…`) y la distancia en línea recta.
- Logos: solo si el elemento OSM tiene `brand:wikidata` y ese elemento de Wikidata tiene logo (P154) en Wikimedia Commons; 35 logos en `public/assets/logos/`. Se descartaron dos que no eran logo de la marca (Q5739148 «Taza de Café», foto; Q1027874, logo del grupo Oniverse para Calzedonia). Sin logo por falta de P154: Hard Rock Hotel Vallarta (Q109275902) y Farmacia Guadalajara (Q5435609). El resto usa un ícono por categoría.
- «Cómo llegar»: Google Maps (`/maps/dir/?api=1&destination=lat,lng`), Apple Maps (`daddr`) y Waze (`ul?ll=…&navigate=yes`).
- «Ruta desde mi ubicación»: pide la ubicación solo al pulsar; ruta en auto del OSRM público de FOSSGIS (`routing.openstreetmap.de`), dibujada con animación, con tiempo y distancia estimados. Si se niega el permiso o falla, se ofrece abrir la app de mapas.
- Coordenadas (`src/data/hospitalCoords.ts`): las nueve vienen de los enlaces oficiales de Google Maps de cada ficha de hospitaljoya.com/hospitales/ (Chapala por su enlace `cid`). La página de Marina repite por error el enlace de Cancún; se usó el propio de Marina. Antes, siete sedes estaban en una aproximación sacada del dibujo de México (p. ej. Marina estaba a ~17 km).
- MapLibre se carga con `import()` solo cuando el mapa está por verse, y no se precarga en el service worker (`globIgnores`).

### Portada (`src/pages/HomePage.tsx`, `src/content/homeVisual.ts`)
- Inicio a pantalla completa con el video institucional real (silenciado, en bucle, 720p en celular, póster inmediato, botón de pausa, sin YouTube). Título y una línea.
- Seis accesos con foto real e ícono: Canadá, Sedes y cómo llegar, Especialidades, Paquetes, Familia y viaje, Seguros.
- Banda de cifras; los dos videos de Hospital Joya lado a lado; croquis; galería y especialidades deslizables con foto completa; paquetes con foto, precio desde y tres puntos; equipo resumido; testimonios y preguntas.
- Texto largo (snowbirds, METC, confianza, tabla de datos, audio y fuentes) dentro del desplegable «Datos, fuentes y avisos». Contacto visible.
- Sin gradientes morados ni tarjetas brillantes; solo velos navy para que el texto se lea sobre foto y video.

## Cómo se probó (local, Node 22)
- `npm run lint`, `npm run typecheck`, `npm test` (56 pruebas, incluida `src/lib/directions.test.ts`: enlaces exactos, distancias y que cada sede tenga referencias reales a menos de 1 km), `npm run build` con presupuesto: JS inicial gzip máx. 87 050 B, total 273 389 B; MapLibre aparte 297 246 B.
- Playwright + Chrome (WebGL por SwiftShader) en 1440×900 y 390×844 (iPhone, 2×) contra `vite preview`: croquis de Marina y Cancún con calles legibles y referencias con logo, ruta simulada desde el centro de Puerto Vallarta (4 min · 4.1 km), portada completa.
- Antes/después en vivo: ver la sección siguiente.

## Resultado en vivo
(se completa tras publicar)

## ISO/IEC 25010 y OWASP (registro, no certificado)
Adecuación funcional: calles, referencias y cómo llegar reales. Usabilidad: menos texto, accesos con foto, gestos de mapa con dos dedos en celular para no atrapar el scroll. Eficiencia: carga diferida del mapa y del worker. Seguridad: sin claves; CSP ampliada solo a OpenFreeMap y al router de FOSSGIS; la ubicación no sale del navegador salvo hacia el router y solo tras el permiso del visitante. Atribución: © OpenStreetMap, OpenFreeMap/OpenMapTiles, logos de Wikimedia Commons, rutas FOSSGIS OSRM.
