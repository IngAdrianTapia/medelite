import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Seo } from "../components/Seo";
import { htmlLang, useI18n } from "../i18n";
import type { QualitySection } from "../i18n/types";

/** Reloj en vivo: el "sistema de actualizaciones automáticas" de la página. */
function useClock() {
  // null en el HTML prerenderizado: la hora real se pinta al montar (evita error de hidratación).
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const first = setTimeout(() => setNow(new Date()), 0);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return now;
}

const LIVE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

const SEAL_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "long",
  year: "numeric",
};

function SectionCard({ s, i }: { s: QualitySection; i: number }) {
  const isNavy = i === 0;
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
  const { m, lang } = useI18n();
  const page = m.calidad;
  const now = useClock();
  const locale = htmlLang(lang);
  const live = now ? now.toLocaleString(locale, LIVE_OPTIONS) : "—";
  const sealDate = now ? now.toLocaleDateString(locale, SEAL_OPTIONS) : "—";

  return (
    <main id="contenido" className="page-shell">
      <Seo title={page.seoTitle} description={page.seoDescription} path="/calidad" />

      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-bold tracking-[0.15em] text-navy uppercase">{page.kicker}</p>
        <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight text-ink md:text-6xl">
          {page.title} <span className="text-gold">{page.titleAccent}</span>
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{page.lede}</p>

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
          <span className="text-[11px] font-semibold tracking-[0.18em] text-gold">{page.live}</span>
          <span className="font-mono text-xs tabular-nums text-ink">{live}</span>
        </motion.div>
      </motion.header>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {page.sections.map((s, i) => (
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
          {page.closingBefore}
          <strong className="text-ink">{page.closingStrong}</strong>
          {page.closingAfter}
        </p>
        <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <div className="border-b border-navy/30 pb-1 font-serif text-lg font-semibold text-ink">{page.signName}</div>
            <div className="mt-1 text-xs italic text-muted">{page.signOrg}</div>
          </div>
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-gold-line/60">
              <span className="text-[9px] font-semibold tracking-[0.2em] text-gold">{page.seal}</span>
            </div>
          </div>
          <div>
            <div className="border-b border-navy/30 pb-1 font-mono text-sm text-ink">{sealDate}</div>
            <div className="mt-1 text-xs tracking-[0.18em] text-muted">{page.dateLabel}</div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
