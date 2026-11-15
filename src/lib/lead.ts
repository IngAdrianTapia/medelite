import { LEAD_EMAIL } from "../data/packages";

const CARD_RUN = /(?:\d[ -]*?){13,19}/;

export function looksLikeCardNumber(value: string): boolean {
  const match = CARD_RUN.exec(value);
  if (!match) return false;
  const digits = match[0].replace(/\D/g, "");
  return digits.length >= 13 && digits.length <= 19;
}

export function oneLine(value: string, max: number): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, max);
}

export function digitCount(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

export interface MailtoPayload {
  action: string;
  subject: string;
  body: string;
}

const BODY_LIMIT = 1_700;

/** Builds a mailto payload. The site never posts this to an API. */
export function buildMailto(subject: string, body: string): MailtoPayload {
  const cleanSubject = oneLine(subject, 140);
  let cleanBody = body.replace(/\r/g, "").trim();
  if (cleanBody.length > BODY_LIMIT) {
    cleanBody = `${cleanBody.slice(0, BODY_LIMIT - 1)}…`;
  }
  return {
    action: `mailto:${LEAD_EMAIL}`,
    subject: cleanSubject,
    body: cleanBody,
  };
}

export function leadBody(lines: readonly string[]): string {
  return lines.map((line) => oneLine(line, 400)).filter((line) => line.length > 0).join("\n");
}
