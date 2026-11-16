import { useI18n } from "../i18n";

/** A low-friction contact path. It sends nothing by itself and requests no medical data. */
export function SalesContact() {
  const { m } = useI18n();
  return (
    <section id="orientacion" className="border-b border-line bg-white px-5 md:px-8 py-12 md:py-16" aria-labelledby="orientacion-title">
      <div className="mx-auto grid max-w-[1136px] gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{m.sales.kicker}</p>
          <h2 id="orientacion-title" className="mt-3 max-w-2xl font-serif text-2xl leading-tight text-navy md:text-4xl">{m.sales.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{m.sales.body}</p>
        </div>
        <div className="rounded-2xl border border-line bg-ivory p-6 shadow-sm md:p-8">
          <div className="grid gap-3">
            <a href={`mailto:info@medeliteofficial.com?subject=${encodeURIComponent(m.sales.subject)}`} className="inline-flex min-h-12 items-center justify-center rounded-lg bg-navy px-5 text-center text-sm font-semibold text-white hover:bg-navy-2">
              {m.sales.email}
            </a>
            <a href="tel:+16044428475" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-navy px-5 text-center text-sm font-semibold text-navy hover:bg-white">
              {m.sales.call}
            </a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">{m.sales.note}</p>
        </div>
      </div>
    </section>
  );
}
