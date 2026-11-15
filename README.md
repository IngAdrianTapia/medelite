# MedElite International Health

Sitio de coordinación de MedElite (`medelite.com.mx`). La oficina está en Vancouver y presenta la red de Hospitales Joya en México. El sitio está en español, inglés y francés.

Es un sitio estático: React 19, TypeScript, Vite, Tailwind 4 y Motion. Los datos están en `src/data`. No hay base de datos ni expedientes de pacientes. La solicitud de coordinación se abre en el correo de quien visita la página.

La evidencia de calidad (ISO/IEC 25010, ISO/IEC 25012, ISO/IEC/IEEE 12207, ISO/IEC 27001, OWASP ASVS y OWASP Top 10) está en [docs/calidad](docs/calidad/README.md). Esa carpeta no es un certificado.

## Desarrollo

```bash
npm ci
npm run dev
npm test
npm run build
```

`npm run build` comprueba tipos, genera el sitio, prerenderiza las rutas y aplica el presupuesto de peso. El despliegue a GitHub Pages lo hace `.github/workflows/pages.yml` al empujar a `main`.

No se commitean `.env`, llaves ni datos de pacientes. Los precios de boleto de avión no se publican en este repositorio.
