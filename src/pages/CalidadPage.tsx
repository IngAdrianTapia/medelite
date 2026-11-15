import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Seo } from "../components/Seo";

/** Reloj en vivo: el "sistema de actualizaciones automáticas" de la página. */
function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const fecha = (d: Date) =>
  d.toLocaleString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

const SECTIONS = [
  {
    code: "ISO/IEC 25010",
    title: "Calidad del Producto de Software",
    deck: "Ocho características del producto que se verifican en cada entrega.",
    tone: "navy",
    items: [
      { n: "Adecuación funcional", d: "Cubre las funciones declaradas y las hace correctamente." },
      { n: "Eficiencia de desempeño", d: "Tiempo de respuesta, rendimiento y uso de recursos." },
      { n: "Compatibilidad", d: "Coexistencia e interoperabilidad con otros sistemas." },
      { n: "Usabilidad", d: "Apreensibilidad, operabilidad y accesibilidad." },
      { n: "Fiabilidad", d: "Madurez, disponibilidad, tolerancia a fallos." },
      { n: "Seguridad", d: "Confidencialidad, integridad, autenticidad." },
      { n: "Mantenibilidad", d: "Modularidad, analizabilidad, testabilidad." },
      { n: "Portabilidad", d: "Adaptabilidad, instalabilidad, reemplazabilidad." },
    ],
  },
  {
    code: "ISO/IEC 25012",
    title: "Calidad de los Datos",
    deck: "Los datos que publicamos son exactos, completos, consistentes, creíbles y vigentes.",
    tone: "light",
    items: [
      { n: "Exactitud", d: "El dato es correcto respecto de la realidad." },
      { n: "Completitud", d: "No falta información necesaria del registro." },
      { n: "Consistencia", d: "El mismo dato no se contradice entre vistas." },
      { n: "Credibilidad", d: "Proviene de una fuente verificable." },
      { n: "Actualidad", d: "Conserva vigencia en el momento de uso." },
      { n: "Accesibilidad", d: "Se consulta cuando se necesita." },
      { n: "Trazabilidad", d: "Cada dato tiene su origen registrado." },
      { n: "Conformidad", d: "Cumple las normas y la política de datos." },
      { n: "Disponibilidad", d: "Disponible cuando el servicio lo requiere." },
    ],
  },
  {
    code: "ISO/IEC/IEEE 12207",
    title: "Ciclo de Vida del Software",
    deck: "Cada etapa deja evidencia: qué se implementó, cómo se probó y el resultado.",
    tone: "light",
    items: [
      { n: "Análisis", d: "Requisitos, alcance y criterios de aceptación." },
      { n: "Diseño", d: "Arquitectura, interfaces y datos." },
      { n: "Construcción", d: "Implementación con estándares de código." },
      { n: "Pruebas", d: "Unitarias, integración, sistema y aceptación." },
      { n: "Entrega", d: "Despliegue verificado y documentado." },
      { n: "Mantenimiento", d: "Evolución, corrección y soporte." },
    ],
  },
  {
    code: "ISO/IEC 27001",
    title: "Seguridad de la Información",
    deck: "Controles técnicos y de proceso para proteger la información.",
    tone: "light",
    items: [
      { n: "Control de accesos", d: "Permisos mínimos y por rol." },
      { n: "Respaldos", d: "Copias verificadas y restaurables." },
      { n: "Cifrado", d: "Datos en tránsito y en reposo." },
      { n: "Manejo seguro", d: "Clasificación y tratamiento de datos." },
      { n: "Monitoreo", d: "Registro y revisión de eventos." },
      { n: "Incidentes", d: "Respuesta y recuperación definidas." },
    ],
  },
  {
    code: "OWASP ASVS",
    title: "Verificación de Seguridad en Aplicaciones",
    deck: "Estándar de verificación aplicado a cada aplicación.",
    tone: "light",
    items: [
      { n: "Autenticación", d: "Identidad y sesión seguras." },
      { n: "Sesiones", d: "Expiración y protección de tokens." },
      { n: "Validación", d: "Entrada y salida controladas." },
      { n: "Criptografía", d: "Algoritmos y gestión de claves." },
      { n: "Control de acceso", d: "Autorización por recurso." },
      { n: "Lógica de negocio", d: "Flujos sin bypass." },
    ],
  },
  {
    code: "OWASP Top 10",
    title: "Vulnerabilidades Más Comunes",
    deck: "Prevención de las diez vulnerabilidades más comunes en aplicaciones.",
    tone: "light",
    items: [
      { n: "Inyección", d: "Consultas parametrizadas y validación." },
      { n: "Control de acceso roto", d: "Autorización verificada." },
      { n: "Fallas criptográficas", d: "Cifrado y claves correctas." },
      { n: "Configuración insegura", d: "Cabeceras y defaults seguros." },
      { n: "Componentes vulnerables", d: "Dependencias auditadas." },
      { n: "Fallos de identificación", d: "Autenticación robusta." },
    ],
  },
] as const;

function SectionCard({ s, i }: { s: (typeof SECTIONS)[number]; i: number }) {
  const isNavy = s.tone === "navy";
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}
      className={
        isNavy
          ? "mt-6 rounded-[2rem] bg-navy p-7 text-white md:p-10 lg:col-span-2"
          : "rounded-[2rem] border border-line bg-white p-7 md:p-10"
      }
    >
      <div
        className={
          isNavy
            ? "font-mono text-[11px] font-semibold tracking-[0.22em] text-gold-line"
            : "font-mono text-[11px] font-semibold tracking-[0.22em] text-gold"
        }
      >
        {s.code}
      </div>
      <h2 className={isNavy ? "mt-2 font-serif text-4xl leading-tight md:text-5xl" : "mt-2 font-serif text-3xl leading-tight text-ink"}>
        {s.title}
      </h2>
      <p className={isNavy ? "mt-3 max-w-2xl text-sm leading-relaxed text-white/75" : "mt-3 max-w-2xl text-sm leading-relaxed text-muted"}>
        {s.deck}
      </p>
      <div className={(isNavy ? "mt-6" : "mt-5") + " grid gap-3 sm:grid-cols-2 lg:grid-cols-3"}>
        {s.items.map((c, j) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: j * 0.035 }}
            className={
              isNavy
                ? "rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                : "rounded-2xl border border-line bg-ivory p-4"
            }
          >
            <div className={isNavy ? "text-sm font-semibold" : "text-sm font-semibold text-ink"}>{c.n}</div>
            <div className={isNavy ? "mt-1 text-[11px] leading-snug text-white/65" : "mt-1 text-[11px] leading-snug text-muted"}>
              {c.d}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export function CalidadPage() {
  const now = useClock();
  const live = fecha(now);

  return (
    <main id="contenido" className="page-shell">
      <Seo
        title="Estándares de Calidad — MedElite"
        description="Cada desarrollo se construye conforme a ISO/IEC 25010, ISO/IEC 25012, ISO/IEC/IEEE 12207, ISO/IEC 27001, OWASP ASVS y OWASP Top 10."
        path="/calidad"
      />

      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-bold tracking-[0.15em] text-navy uppercase">Calidad</p>
        <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight text-ink md:text-6xl">
          Estándares de Calidad <span className="text-gold">de Software</span>
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Se hace constar que todo el software que desarrollamos se construye conforme a los siguientes estándares
          internacionales, garantizando calidad, seguridad y confiabilidad para nuestros clientes.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-6 inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-teal"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[11px] font-semibold tracking-[0.18em] text-gold">EN VIVO</span>
          <span className="font-mono text-xs tabular-nums text-ink">{live}</span>
        </motion.div>
      </motion.header>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {SECTIONS.map((s, i) => (
          <SectionCard key={s.code} s={s} i={i} />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 rounded-[2rem] border border-line bg-white p-7 md:p-10"
      >
        <p className="text-sm leading-relaxed text-muted">
          Cada desarrollo se documenta con evidencia —qué se implementó, cómo se probó y el resultado obtenido— conforme
          a la norma. Además, nuestros desarrollos siguen una{" "}
          <strong className="text-ink">ruta de certificación Microsoft en proceso</strong>.
        </p>
        <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <div className="border-b border-navy/30 pb-1 font-serif text-lg font-semibold text-ink">Ing. Adrián Peña Tapia</div>
            <div className="mt-1 text-xs italic text-muted">MedElite · Tapia Computación</div>
          </div>
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-gold-line/60">
              <span className="text-[9px] font-semibold tracking-[0.2em] text-gold">SELLO</span>
            </div>
          </div>
          <div>
            <div className="border-b border-navy/30 pb-1 font-mono text-sm text-ink">{live.split(",")[0]}</div>
            <div className="mt-1 text-xs tracking-[0.18em] text-muted">FECHA</div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
