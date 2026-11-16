import { LEAD_EMAIL } from "../data/packages";
import { oneLine, type MailtoPayload } from "./lead";

/** iOS Safari often ignores form GET to mailto: and drops long URLs. Keep the href short and open it from a tap. */
export const MAILTO_HREF_LIMIT = 1_800;

export function mailtoHref(payload: MailtoPayload): string {
  const params = new URLSearchParams();
  if (payload.subject) params.set("subject", payload.subject);
  if (payload.body) params.set("body", payload.body);
  const query = params.toString();
  return query ? `${payload.action}?${query}` : payload.action;
}

export function shortenMailtoBody(payload: MailtoPayload, limit = MAILTO_HREF_LIMIT): MailtoPayload {
  let body = payload.body;
  let href = mailtoHref({ ...payload, body });
  while (body.length > 0 && href.length > limit) {
    body = body.slice(0, Math.max(0, body.length - 80)).replace(/\s+\S*$/, "").trim();
    if (body && !body.endsWith("…")) body = `${body}…`;
    href = mailtoHref({ ...payload, body });
  }
  return { ...payload, body };
}

/** Opens the device mail composer from a user gesture. Returns false if the browser blocked it. */
export function openMailto(payload: MailtoPayload): boolean {
  const short = shortenMailtoBody(payload);
  const href = mailtoHref(short);
  const link = document.createElement("a");
  link.href = href;
  link.target = "_self";
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  return href.startsWith("mailto:");
}

export function composeMailto(subject: string, body: string): MailtoPayload {
  return shortenMailtoBody({
    action: `mailto:${LEAD_EMAIL}`,
    subject: oneLine(subject, 140),
    body: body.replace(/\r/g, "").trim(),
  });
}
