import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LEAD_EMAIL } from "../data/packages";
import { useI18n } from "../i18n";
import { composeMailto, openMailto } from "../lib/mailto";

const UI = {
  es: {
    title: "Escribir a coordinación",
    name: "Nombre",
    email: "Su correo",
    message: "Mensaje",
    send: "Enviar con su correo",
    close: "Cerrar",
    hint: "El botón abre la aplicación de correo de este iPhone o computadora, con el mensaje listo para info@medeliteofficial.com. Usted pulsa enviar ahí. No incluya expedientes.",
    copied: "Mensaje copiado. Si el correo no se abrió, péguelo en un mensaje a info@medeliteofficial.com.",
    subject: "Mensaje desde medelite.com.mx",
  },
  en: {
    title: "Write to coordination",
    name: "Name",
    email: "Your email",
    message: "Message",
    send: "Send with your email app",
    close: "Close",
    hint: "This opens the mail app on this iPhone or computer, addressed to info@medeliteofficial.com, ready for you to send. Please don’t include medical records.",
    copied: "Message copied. If mail did not open, paste it into a message to info@medeliteofficial.com.",
    subject: "Message from medelite.com.mx",
  },
  fr: {
    title: "Écrire à la coordination",
    name: "Nom",
    email: "Votre courriel",
    message: "Message",
    send: "Envoyer avec votre messagerie",
    close: "Fermer",
    hint: "Le bouton ouvre l’application courriel de cet iPhone ou de cet ordinateur, déjà adressée à info@medeliteofficial.com. C’est vous qui envoyez. N’incluez pas de dossier médical.",
    copied: "Message copié. Si le courriel ne s’est pas ouvert, collez-le dans un message à info@medeliteofficial.com.",
    subject: "Message depuis medelite.com.mx",
  },
} as const;

export function MailCompose({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useI18n();
  const t = UI[lang];
  const titleId = useId();
  const first = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (open) {
      const tmr = window.setTimeout(() => first.current?.focus(), 40);
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(tmr);
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  function send(event: FormEvent) {
    event.preventDefault();
    const lines = [
      name.trim() ? `${t.name}: ${name.trim()}` : "",
      email.trim() ? `${t.email}: ${email.trim()}` : "",
      message.trim(),
    ].filter(Boolean);
    const payload = composeMailto(t.subject, lines.join("\n"));
    const ok = openMailto(payload);
    const text = `${payload.subject}\n\n${payload.body}`;
    void navigator.clipboard?.writeText(text).catch(() => undefined);
    setStatus(ok ? t.copied : t.copied);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="absolute inset-0 bg-navy/50" aria-label={t.close} onClick={onClose} />
      <form className="relative z-10 w-full max-w-md rounded-t-3xl bg-white p-6 shadow-premium sm:rounded-3xl" onSubmit={send}>
        <h2 id={titleId} className="font-serif text-2xl text-navy">{t.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t.hint}</p>
        <label className="mt-5 grid gap-1 text-sm font-medium text-navy">
          {t.name}
          <input ref={first} required autoComplete="name" className="min-h-12 rounded-2xl border border-line bg-ivory px-4 text-base outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="mt-3 grid gap-1 text-sm font-medium text-navy">
          {t.email}
          <input required type="email" autoComplete="email" className="min-h-12 rounded-2xl border border-line bg-ivory px-4 text-base outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="mt-3 grid gap-1 text-sm font-medium text-navy">
          {t.message}
          <textarea required rows={4} maxLength={800} className="rounded-2xl border border-line bg-ivory px-4 py-3 text-base outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/40" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="submit" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-navy px-5 text-sm font-semibold text-white hover:bg-navy-2">{t.send}</button>
          <button type="button" className="inline-flex min-h-12 items-center rounded-lg border border-line px-5 text-sm" onClick={onClose}>{t.close}</button>
        </div>
        {status ? <p className="mt-3 text-sm text-muted">{status}</p> : <p className="mt-3 text-xs text-muted">{LEAD_EMAIL}</p>}
      </form>
    </div>
  );
}
