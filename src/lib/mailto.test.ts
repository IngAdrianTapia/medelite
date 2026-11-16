import { describe, expect, it } from "vitest";
import { mailtoHref, shortenMailtoBody } from "./mailto";

describe("mailto href", () => {
  it("keeps an iPhone-safe length when the body is long", () => {
    const payload = shortenMailtoBody({
      action: "mailto:info@medeliteofficial.com",
      subject: "Solicitud de cotización",
      body: `${"Nombre: Ada Tremblay\n".repeat(80)}Notas: ${"x".repeat(2000)}`,
    });
    expect(mailtoHref(payload).length).toBeLessThanOrEqual(1800);
    expect(mailtoHref(payload).startsWith("mailto:info@medeliteofficial.com")).toBe(true);
    expect(payload.body.endsWith("…")).toBe(true);
  });
});
