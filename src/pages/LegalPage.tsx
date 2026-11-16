import type { Messages } from "../i18n/types";
import { Seo } from "../components/Seo";

export function LegalPage({
  doc,
  path,
}: {
  doc: Messages["privacy"];
  path: "/privacy" | "/terms";
}) {
  return (
    <main id="contenido" className="page-shell">
      <Seo title={`${doc.title} — MedElite`} description={doc.updated} path={path} />
      <p className="text-xs font-bold tracking-[0.15em] text-navy uppercase">{doc.kicker}</p>
      <h1 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-ink">{doc.title}</h1>
      <p className="mt-3 text-sm text-muted">{doc.updated}</p>
      <div className="mt-10 grid gap-8">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-2xl">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
