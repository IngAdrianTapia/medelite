/** Visible label required on every drawn illustration. Not a photograph. */
export function IllustrationLabel({ note }: { note: string }) {
  return (
    <p className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-navy">
      <span className="h-2 w-2 shrink-0 rounded-full bg-navy" aria-hidden="true" />
      <span>Ilustración / Illustration</span>
      <span className="font-medium text-muted">{note}</span>
    </p>
  );
}
