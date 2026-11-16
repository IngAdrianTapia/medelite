# Seguridad

Referencias: ISO/IEC 27001 (control de acceso, respaldos, cifrado, trato de los datos) y, en lo que aplica a un sitio estático, OWASP ASVS y OWASP Top 10. No hay un SGSI certificado en este repositorio.

## Qué hace el sitio con los datos

- No hay cuentas, sesiones de servidor ni base de datos.
- La solicitud de coordinación se abre en el cliente de correo del visitante (`mailto:`). El cuerpo puede contener lo que la persona escribió. Eso sale de su dispositivo solo cuando ella envía el correo.
- `src/lib/lead.ts` y `src/lib/wizard.ts` rechazan un número que parece de tarjeta en el teléfono o en la nota.
- `sessionStorage` (`medelite-quote-v1`) guarda solo procedimiento, paquete, mes, `inMexico`, `flexible` y `companion`. Al volver a abrir la pestaña se descartan nombre, contacto, nota, edad, IMC y condiciones, aunque una versión anterior los hubiera dejado. El botón de borrar elimina la clave.
- `localStorage` guarda únicamente `me-lang`.
- `.gitignore` ignora `.env`, `.env.*` (salvo un `.env.example` si algún día hiciera falta), llaves, `*.pem`, `credentials.json` y `.secrets`. Este sitio no usa secretos de ejecución.

## CSP y encabezados

`vite.config.ts` inyecta una meta `Content-Security-Policy` en el HTML de producción:

- `default-src 'self'`
- `script-src 'self'` (sin inline y sin dominios de terceros)
- `style-src 'self' 'unsafe-inline'` porque Motion escribe estilos en el elemento
- `img-src 'self' data:` y, para el mapa real, `https://server.arcgisonline.com` (teselas de Esri). No hay iframes de mapas. CARTO quedó fuera: hoy exige clave y muestra «API KEY REQUIRED».
- `font-src`, `media-src`, `connect-src`, `worker-src` y `manifest-src` en `'self'`
- `form-action mailto:`
- `frame-src 'none'` (los videos se reproducen con `<video>` en el mismo origen; no hay iframes de terceros)
- `base-uri 'self'`
- `object-src 'none'`
- `upgrade-insecure-requests`

`index.html` también envía `referrer` = `strict-origin-when-cross-origin`.

`frame-ancestors` no va en la meta: los navegadores lo ignoran ahí. GitHub Pages no deja poner encabezados HTTP propios. Por eso no están, como encabezado, HSTS, `X-Content-Type-Options`, `frame-ancestors` ni `Permissions-Policy`. El workflow comprueba que el HTML construido contiene la CSP. `scripts/budget.mjs` comprueba `script-src 'self'`, `frame-src 'none'` y que cada video en `dist/assets/video` queda por debajo de 50 MB.

Los enlaces externos llevan `rel="noopener noreferrer"`.

## Dependencias

Medición del 2026-11-15, después de `npm install` con overrides:

| Comando | Resultado |
| --- | --- |
| `npm audit --omit=dev --audit-level=low` | 0 vulnerabilidades. Es la puerta del workflow para lo que entra al sitio |
| `npm audit --audit-level=moderate` | Pasa. Quedan 4 hallazgos *low*, todos `deepmerge` (GHSA-gcqx-w48m-w2h4) vía `workbox-build` y `vite-plugin-pwa` |

Antes de los overrides el árbol completo tenía 12 hallazgos (2 low, 10 moderate): `minimatch` en `typescript-eslint` y `glob` en Workbox. `package.json` fuerza `minimatch@11.0.8` y `glob@14.0.6`. El build, el service worker y las 17 pruebas siguieron pasando.

`deepmerge@4.3.1` es la última versión publicada y el aviso sigue abierto. El arreglo que propone `npm audit` es bajar `vite-plugin-pwa` a una mayor antigua. No se hizo: rompería el build y la librería no viaja en el JavaScript del navegador. Es una herramienta de generación del service worker.

## Control de acceso, respaldos y cifrado

| Control | En este repositorio | Pendiente del dueño |
| --- | --- | --- |
| Control de acceso | No hay zona autenticada. El código público no incluye expedientes | Quién puede escribir en el repo de GitHub. Hacer el repositorio privado antes de guardar cualquier dato de paciente |
| Respaldos | Historial de git y el artefacto de Pages | No hay base que respaldar. Un futuro backend sí la necesitaría |
| Cifrado | Pages sirve HTTPS. No hay almacén local de pacientes que cifrar | Cifrado en reposo y en tránsito de un expediente, el día que exista un servidor |
| Trato de los datos | Mínimo en el navegador, rechazo de tarjetas, sin secretos en el árbol | Aviso de privacidad del hospital y contratos de encargado, fuera de este sitio |

## OWASP Top 10, aplicado a este sitio

| Riesgo | Situación |
| --- | --- |
| A01 Control de acceso roto | No hay objetos de paciente que pedir por URL |
| A02 Fallos criptográficos | HTTPS del host. Sin cripto propia ni secretos en el repo |
| A03 Inyección | React escapa el texto. No hay `dangerouslySetInnerHTML` ni SQL |
| A04 Diseño inseguro | El correo sale del navegador de la persona. No hay un buzón en el servidor que proteger aquí |
| A05 Configuración | CSP descrita arriba. Headers HTTP de Pages: ver pendiente |
| A06 Componentes vulnerables | Auditoría de arriba. Producción en 0 |
| A07 Identificación y autenticación | No aplica: no hay login |
| A08 Integridad | `package-lock.json`. Scripts solo de `'self'` |
| A09 Registro y alertas | Un sitio estático no tiene bitácora de servidor. Pages no entrega logs de aplicación |
| A10 SSRF | No hay servidor que pida URLs |

ASVS, en el nivel que un sitio estático puede mostrar: V5 validación del cuestionario (`src/lib/wizard.ts`, pruebas en `src/lib/wizard.test.ts`), V8 datos sensibles fuera de `sessionStorage`, V9 comunicaciones por HTTPS, V14 CSP y dependencias. V2, V3 y V4 de autenticación y sesiones de servidor no tienen superficie aquí.
