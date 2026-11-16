import { Link } from "react-router";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n";

export function NotFoundPage() {
  const { m } = useI18n();
  return (
    <main id="contenido" className="page-shell">
      <Seo title={m.notFound.title} description={m.notFound.body} path="/" />
      <h1 className="font-serif text-3xl">{m.notFound.title}</h1>
      <p className="mt-4 text-muted">{m.notFound.body}</p>
      <Link className="mt-6 inline-flex min-h-11 items-center underline" to="/">
        {m.notFound.home}
      </Link>
    </main>
  );
}
