# Evidencia — hero legible, logo móvil y dock

Fecha de la medición: 2026-11-15. Misma rama y mismo PR que el logo: `cursor/transparent-logo-outline-b5e5`, https://github.com/IngAdrianTapia/medelite/pull/3.

Esto no certifica ISO/IEC 25010, ISO/IEC 25012, ISO/IEC/IEEE 12207 ni ISO/IEC 27001. Registra qué se tomó de la propuesta, qué se rechazó, cómo se probó y qué resultado dio.

## Requisito

Combinar la propuesta adjunta con el diseño actual. De la propuesta se toma:

- Logo más pequeño en el móvil: `h-8` por debajo de `sm` en `Header`.
- `ContactDock` oculto en pantallas chicas (`hidden md:block`), para que no tape el contenido.
- `main .grid > * { min-width: 0 }`, para que un hijo de grilla pueda encogerse.
- Un hero más calmo y legible, en el que el texto no tape la fotografía: titular, lede, llamados y aviso visibles.

Se conserva: las animaciones de Motion (los tres encuadres del hero con Ken Burns, y el recorrido que se desplaza con el scroll), el respeto de `prefers-reduced-motion`, utilidades de Tailwind v4, la paleta navy, el sistema visual propio y los textos es/en/fr ya escritos.

No se adopta el fondo claro del hero ni la retirada de Motion. No se añadieron clases sueltas del tipo `.home-hero` o `.hero-primary`. No hay textos, precios ni datos clínicos nuevos.

## ISO/IEC/IEEE 12207

### Análisis

La propuesta rehacía la portada sobre un fondo `#edf6f6`, quitaba `motion/react` y sustituía el carril del recorrido por una grilla estática. El dueño pidió el objetivo de esa portada (que se lea, y que la foto se vea) sin soltar el diseño navy ni el movimiento. El botón fijo de contacto y el logo a `h-12` en 375 px competían con el contenido. Las grillas del `main` no dejaban encoger a sus hijos.

### Diseño

- La fotografía sigue a pantalla, con `HERO_FRAMES` (`cancun`, `riviera`, `marina`), las clases `hero-frame` y `kenburns`, y sin Ken Burns si `useReducedMotion()` es verdadero. En `lg` ocupa la columna derecha. Por debajo de `lg` va en una franja (`h-44`, `sm:h-80`) y el texto queda debajo, sobre navy sólido, no encima de la foto.
- El titular es la frase ya usada (`line`). Debajo van `m.hero.title`, `m.hero.lede`, el aviso `m.notice`, los dos llamados existentes y la cita Fraser. Mismos textos en es, en y fr.
- Los llamados siguen el botón de oro y el contorno blanco del sistema. No se inventó una paleta verde.
- `JourneyRail` no se tocó: sigue el `motion` con `useScroll` y, con movimiento reducido, la lista horizontal.
- `Header`: `h-8 sm:h-14 md:h-16`.
- `ContactDock`: `hidden md:block`. En el móvil el llamado sigue en el hero.
- Una sola regla en `src/index.css`: `main .grid > * { min-width: 0 }`. El resto del hero son utilidades Tailwind.

### Construcción

| Archivo | Qué cambió |
| --- | --- |
| `src/pages/HomePage.tsx` | Hero en dos zonas. Motion del recorrido y de los encuadres, igual |
| `src/components/Header.tsx` | Altura del logo `h-8` bajo `sm` |
| `src/components/ContactDock.tsx` | `hidden md:block` |
| `src/index.css` | `min-width: 0` en los hijos de grilla del `main` |
| `docs/calidad/CHANGELOG.md`, `README.md`, esta ficha | Registro |

`package.json` y `package-lock.json` no cambian. No hay dependencia ni script nuevo.

### Pruebas

Corrida del 2026-11-15, después del cambio:

| Comando | Salida | Código |
| --- | --- | --- |
| `npm run lint` | ESLint sin avisos | 0 |
| `npm run typecheck` | `tsc --noEmit` sin avisos | 0 |
| `npm test` | `Test Files  5 passed (5)` / `Tests  18 passed (18)` | 0 |
| `npm run build` | Verde. `budget ok: JS gzip max 78340 (react-D5DePsok.js), total 223780, foto max 126016 (operating-room-1280.webp)`. `prerendered pages, service worker precache 151 files` | 0 |

El chunk `motion-*.js` sigue en el build (154.30 kB). El HTML de `/en` contiene el lede y «Get treated in weeks». No contiene la clase `home-hero`.

Contraste calculado (WCAG, texto normal, fondo `#071827` salvo el botón):

| Par | Ratio | AA 4.5:1 |
| --- | --- | --- |
| Blanco `#ffffff` sobre navy | 17.96:1 | sí |
| Blanco al 85 % sobre navy (`#dadce0` resultante) | 13.07:1 | sí |
| `#c4a574` (`gold-line`) sobre navy | 7.68:1 | sí |
| Blanco sobre oro `#7a5a32` | 6.29:1 | sí |
| Navy sobre blanco (el hover del botón) | 17.96:1 | sí |

Lighthouse 12, categoría accessibility, sobre `http://127.0.0.1:4173/en` (previsualización de `dist`): puntuación 0.93. Pasan `heading-order`, `button-name`, `link-name`, `image-alt`, `html-has-lang`, `document-title` y `label`. Falla `color-contrast` en sitios que este cambio no pinta: pasos inactivos del cuestionario (`text-white/45`, 4.47:1 sobre `#071827`) y la palabra decorativa del pie (`aria-hidden`, `#111c24` sobre `#041018`). Falla `target-size` en los puntos del mapa y en enlaces `mailto:` / `tel:` ya existentes. El hero no está en esa lista.

Vistas de la previsualización de producción:

| Vista | Qué se ve |
| --- | --- |
| 1440×1000, `/en` | Columna navy con titular, lede, aviso, dos llamados y la cita. La fachada de Hospital Joya ocupa la otra mitad, sin texto encima. El dock sí aparece, abajo a la derecha |
| 375×812, `/en` | Logo chico en la barra. Foto arriba, texto debajo. Aviso y los dos llamados dentro del primer pantallazo. No hay dock. La cita Fraser asoma al final |
| 1440, `/es` | «Atenderse en semanas, no en años.», «Solicitar cotización», «Cómo funciona» |
| 375, `/fr` | «Se faire soigner en semaines, pas en années.», «Demander une soumission» |

### Entrega

El cambio entra en el PR #3, que también lleva el logo. El deploy de Pages sigue siendo el push a `main` del workflow «Deploy GitHub Pages». El número de esa ejecución se anota al cerrar; no se inventa aquí.

### Mantenimiento

Para deshacer solo esta portada y dejar el logo de 1 px, restaurar estos archivos desde `b443a68` (el commit anterior a este cambio):

```bash
git checkout b443a68 -- src/pages/HomePage.tsx src/components/Header.tsx src/components/ContactDock.tsx src/index.css
```

Eso devuelve el titular sobre la foto, el logo a `h-12` en móvil y el dock siempre visible. No borra el PNG del logo.

## ISO/IEC 25010

| Característica | Comprobación | Resultado |
| --- | --- | --- |
| Adecuación funcional | Titular, lede, aviso y llamados en es/en/fr, foto visible | Visto en 1440 y 375 |
| Eficiencia | Presupuesto del build | JS gzip máximo 78 340, total 223 780, foto 126 016. Dentro de 90 000 / 280 000 / 140 000 |
| Compatibilidad | Mismas rutas y el mismo `motion` | El chunk de Motion sigue en `dist` |
| Usabilidad | Contraste del hero y Lighthouse | Ratios de arriba, todos AA. Lighthouse accessibility 0.93; los fallos no son de este hero |
| Fiabilidad | Build con presupuesto | Verde |
| Seguridad | Ver OWASP | Sin superficie nueva |
| Mantenibilidad | Utilidades Tailwind, una regla de grilla, esta ficha | Lint y tipos en 0 |
| Portabilidad | Sigue siendo estático | Sin servidor nuevo |

## ISO/IEC 25012

No se añadieron datos. El lede, el aviso y la cita Fraser ya estaban en `src/i18n/{es,en,fr}.ts` o en la portada. No se reescribió una cifra. La foto sigue siendo la de `FacilityPhoto` (`cancun`, `riviera`, `marina`).

## ISO/IEC 27001

| Control | Qué se hizo | Resultado |
| --- | --- | --- |
| Control de cambios | Mismo PR #3, rama `cursor/transparent-logo-outline-b5e5` | Sin push directo a `main` como método de trabajo |
| Datos | El diff no trae secretos, `.env` ni expediente | Lockfile intacto |
| Reversión | Checkout de `b443a68` para los cuatro archivos de código | El logo de 1 px queda |

## OWASP ASVS y Top 10

No hay script nuevo, dependencia nueva ni origen externo. La CSP no se editó. Los llamados siguen siendo anclas a `#cotizar` y `#recorrido`. El dock oculto en móvil no quita el llamado: está en el hero.

| Referencia | En este cambio | Resultado |
| --- | --- | --- |
| ASVS V14 | Sin editar CSP ni el lockfile | Igual que en la ficha del logo |
| A03 | No hay HTML inyectado | Textos por i18n |
| A05 | Meta CSP del build | El build sigue exigiendo `script-src 'self'` y `frame-src 'none'` |
| A06 | Auditoría no repetida: no cambió el árbol de paquetes | Sigue el resultado de la ficha del logo |
| A08 | Sin recurso de terceros | Fotos y fuentes ya del propio sitio |

## Resultado

La portada se lee sobre navy y la fotografía queda libre. En 375×812 se ven el logo chico, la foto, el titular, el lede, el aviso y los dos llamados, sin el dock encima. En 1440×1000 el texto y la fachada van lado a lado. Motion, la paleta y los tres idiomas siguen. El fondo claro de la propuesta no se usó. Lint, tipos, 18 pruebas y el build terminaron en 0.
