import { useState } from "react";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n";

export function JoinPage() {
  const { lang } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hospital, setHospital] = useState("");
  const [city, setCity] = useState("");
  const [certs, setCerts] = useState("");
  const t = {
    es: {
      title: "Para hospitales",
      deck: "MedElite invita a otros hospitales de México a la red. Pedimos certificaciones que el hospital pueda documentar. No damos por obtenida ninguna acreditación, incluida la de Grupo Médico Joya.",
      name: "Nombre de contacto",
      email: "Correo",
      hospital: "Hospital",
      city: "Ciudad",
      certs: "Certificaciones que pueden documentar",
      send: "Abrir el correo",
      subject: "Solicitud de hospital para la red MedElite",
    },
    en: {
      title: "For hospitals",
      deck: "MedElite invites other hospitals in Mexico to the network. We ask for certifications the hospital can document. We do not treat any accreditation as already held, including for Grupo Médico Joya.",
      name: "Contact name",
      email: "Email",
      hospital: "Hospital",
      city: "City",
      certs: "Certifications you can document",
      send: "Open the email",
      subject: "Hospital application to the MedElite network",
    },
    fr: {
      title: "Pour les hôpitaux",
      deck: "MedElite invite d’autres hôpitaux du Mexique dans le réseau. Nous demandons des certifications que l’hôpital peut documenter. Nous ne tenons aucune accréditation pour obtenue, y compris pour Grupo Médico Joya.",
      name: "Nom du contact",
      email: "Courriel",
      hospital: "Hôpital",
      city: "Ville",
      certs: "Certifications que vous pouvez documenter",
      send: "Ouvrir le courriel",
      subject: "Demande d’hôpital pour le réseau MedElite",
    },
  }[lang];
  const body = [`Nombre: ${name}`, `Correo: ${email}`, `Hospital: ${hospital}`, `Ciudad: ${city}`, `Certificaciones: ${certs}`].join("\n");
  return (
    <main id="contenido" className="page-shell">
      <Seo title={`${t.title} — MedElite`} description={t.deck} path="/hospitales" />
      <h1 className="font-serif text-[2.6rem] leading-[1.04] text-navy md:text-6xl">{t.title}</h1>
      <p className="mt-4 leading-relaxed text-muted">{t.deck}</p>
      <form className="mt-6 grid gap-3" action="mailto:info@medeliteofficial.com" method="GET">
        <input type="hidden" name="subject" value={t.subject} />
        <input type="hidden" name="body" value={body} />
        <label className="grid gap-1 text-sm">{t.name}<input required autoComplete="name" className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={name} onChange={(event) => setName(event.target.value)} /></label>
        <label className="grid gap-1 text-sm">{t.email}<input required type="email" autoComplete="email" className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label className="grid gap-1 text-sm">{t.hospital}<input required autoComplete="organization" className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={hospital} onChange={(event) => setHospital(event.target.value)} /></label>
        <label className="grid gap-1 text-sm">{t.city}<input required autoComplete="address-level2" className="min-h-12 rounded-2xl border border-line bg-white px-4 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={city} onChange={(event) => setCity(event.target.value)} /></label>
        <label className="grid gap-1 text-sm">{t.certs}<textarea required className="min-h-28 rounded-2xl border border-line bg-white px-4 py-3 text-base shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={certs} onChange={(event) => setCerts(event.target.value)} /></label>
        <button className="inline-flex min-h-12 w-fit items-center rounded-lg bg-navy px-5 text-sm font-semibold text-white shadow-premium hover:bg-navy-2" type="submit">{t.send}</button>
      </form>
    </main>
  );
}
