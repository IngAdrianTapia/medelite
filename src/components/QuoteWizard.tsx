import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router";
import { AGE_BANDS, BMI_BANDS, CONDITIONS, PACKAGE_BANDS, PACKAGE_IDS, PROCEDURE_IDS, formatCad, formatRange, type AgeBand, type BmiBand, type Condition, type PackageId, type ProcedureId } from "../data/packages";
import { useI18n } from "../i18n";
import { estimateQuote, type Estimate } from "../lib/estimate";
import { buildMailto, leadBody } from "../lib/lead";
import { EMPTY_WIZARD, STEP_IDS, nextStep, previousStep, stepErrors, type FieldError, type StepId, type WizardState } from "../lib/wizard";

const STORAGE_KEY = "medelite-quote-v1";

function isProcedure(value: unknown): value is ProcedureId {
  return typeof value === "string" && (PROCEDURE_IDS as readonly string[]).includes(value);
}
function isPackage(value: unknown): value is PackageId {
  return typeof value === "string" && (PACKAGE_IDS as readonly string[]).includes(value);
}
function isAge(value: unknown): value is AgeBand {
  return typeof value === "string" && (AGE_BANDS as readonly string[]).includes(value);
}
function isBmi(value: unknown): value is BmiBand {
  return typeof value === "string" && (BMI_BANDS as readonly string[]).includes(value);
}
function isCondition(value: unknown): value is Condition {
  return typeof value === "string" && (CONDITIONS as readonly string[]).includes(value);
}

function loadState(): WizardState {
  if (typeof sessionStorage === "undefined") return EMPTY_WIZARD;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_WIZARD;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return EMPTY_WIZARD;
    const data = parsed as Record<string, unknown>;
    const conditions = Array.isArray(data.conditions) ? data.conditions.filter(isCondition) : [];
    return {
      ...EMPTY_WIZARD,
      procedure: isProcedure(data.procedure) ? data.procedure : "",
      packageId: isPackage(data.packageId) ? data.packageId : "",
      ageBand: isAge(data.ageBand) ? data.ageBand : "",
      bmiBand: isBmi(data.bmiBand) ? data.bmiBand : "",
      conditions,
      inMexico: typeof data.inMexico === "boolean" ? data.inMexico : null,
      month: typeof data.month === "string" ? data.month : "",
      flexible: data.flexible === true,
      companion: typeof data.companion === "boolean" ? data.companion : null,
      firstName: typeof data.firstName === "string" ? data.firstName : "",
      lastName: typeof data.lastName === "string" ? data.lastName : "",
      email: typeof data.email === "string" ? data.email : "",
      phone: typeof data.phone === "string" ? data.phone : "",
      city: typeof data.city === "string" ? data.city : "",
      note: typeof data.note === "string" ? data.note : "",
      consent: data.consent === true,
      adult: data.adult === true,
    };
  } catch {
    return EMPTY_WIZARD;
  }
}

function toggleCondition(current: readonly Condition[], id: Condition): Condition[] {
  if (id === "none") return current.includes("none") ? [] : ["none"];
  const rest = current.filter((item) => item !== "none" && item !== id);
  return current.includes(id) ? rest : [...rest, id];
}

function monthBounds(today: Date): { min: string; max: string } {
  const min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const end = new Date(today.getFullYear(), today.getMonth() + 24, 1);
  const max = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}`;
  return { min, max };
}

export function QuoteWizard() {
  const { m } = useI18n();
  const [state, setState] = useState<WizardState>(loadState);
  const [step, setStep] = useState<StepId>("procedure");
  const [errors, setErrors] = useState<FieldError[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const baseId = useId();
  const today = new Date();
  const bounds = monthBounds(today);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const stepIndex = STEP_IDS.indexOf(step);
  const progress = m.wizard.progress.replace("{current}", String(stepIndex + 1)).replace("{total}", String(STEP_IDS.length));

  function patch(partial: Partial<WizardState>): void {
    setState((current) => ({ ...current, ...partial }));
    setErrors([]);
  }

  function goNext(): void {
    const found = stepErrors(step, state, today);
    if (found.length > 0) {
      setErrors(found);
      return;
    }
    const following = nextStep(step);
    if (following) setStep(following);
  }

  function goBack(): void {
    const prior = previousStep(step);
    if (prior) {
      setErrors([]);
      setStep(prior);
    }
  }

  function clearAll(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    setState(EMPTY_WIZARD);
    setErrors([]);
    setStep("procedure");
  }

  const estimate: Estimate | null =
    state.procedure && state.packageId && state.bmiBand && state.inMexico !== null
      ? estimateQuote({
          procedure: state.procedure,
          packageId: state.packageId,
          bmiBand: state.bmiBand,
          conditions: state.conditions,
          inMexico: state.inMexico,
        })
      : null;

  const mailto =
    step === "result" && state.procedure && state.packageId
      ? buildMailto(m.wizard.subject, leadBody(leadLines(state, estimate, m)))
      : null;

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-[0_1px_0_rgba(22,32,51,0.04)] md:p-8">
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{m.wizard.kicker}</p>
      <h2 className="mt-3 font-serif text-4xl tracking-tight">{m.wizard.title}</h2>
      <p className="mt-3 max-w-3xl text-muted">{m.wizard.deck}</p>
      <p className="mt-4 rounded-2xl bg-soft px-4 py-3 text-sm leading-relaxed text-ink">{m.wizard.admin}</p>
      <p className="mt-3 text-sm leading-relaxed text-warn">{m.wizard.emergency}</p>

      <ol className="mt-6 flex flex-wrap gap-2" aria-label={progress}>
        {STEP_IDS.map((id, index) => (
          <li key={id}>
            <span
              className={`inline-flex min-h-9 items-center rounded-full px-3 text-xs ${index === stepIndex ? "bg-navy text-white" : "bg-paper text-muted"}`}
              aria-current={index === stepIndex ? "step" : undefined}
            >
              {m.wizard.steps[index]}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-muted">{progress}</p>

      <h3 ref={headingRef} tabIndex={-1} className="mt-6 text-xl font-semibold">
        {m.wizard.steps[stepIndex]}
      </h3>

      {errors.length > 0 ? (
        <div role="alert" className="mt-4 rounded-2xl bg-warn-soft px-4 py-3 text-sm text-warn">
          <ul className="grid gap-1">
            {errors.map((code) => (
              <li key={code}>{m.wizard.errors[code]}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6">
        {step === "procedure" ? (
          <fieldset>
            <legend className="text-sm font-medium">{m.wizard.procedureLegend}</legend>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {PROCEDURE_IDS.map((id) => (
                <label key={id} className={`cursor-pointer rounded-2xl border p-4 ${state.procedure === id ? "border-navy bg-soft" : "border-line"}`}>
                  <input
                    className="mr-2"
                    type="radio"
                    name={`${baseId}-procedure`}
                    value={id}
                    checked={state.procedure === id}
                    onChange={() => patch({ procedure: id })}
                  />
                  <span className="font-medium">{m.wizard.procedures[id].label}</span>
                  <span className="mt-1 block pl-6 text-sm text-muted">{m.wizard.procedures[id].hint}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === "package" ? (
          <fieldset>
            <legend className="text-sm font-medium">{m.wizard.packageLegend}</legend>
            <div className="mt-3 grid gap-3">
              {PACKAGE_IDS.map((id) => (
                <label key={id} className={`cursor-pointer rounded-2xl border p-4 ${state.packageId === id ? "border-navy bg-soft" : "border-line"}`}>
                  <input
                    className="mr-2"
                    type="radio"
                    name={`${baseId}-package`}
                    value={id}
                    checked={state.packageId === id}
                    onChange={() => patch({ packageId: id })}
                  />
                  <span className="font-medium">{m.packages.items[id].name}</span>
                  <span className="ml-2 text-sm text-navy">
                    {m.wizard.fromLabel} {formatCad(PACKAGE_BANDS[id].low)}
                  </span>
                  <span className="mt-1 block pl-6 text-sm text-muted">{m.packages.items[id].who}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === "health" ? (
          <fieldset>
            <legend className="text-sm font-medium">{m.wizard.healthLegend}</legend>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                {m.wizard.age}
                <select
                  className="min-h-11 rounded-xl border border-line bg-white px-3"
                  value={state.ageBand}
                  onChange={(event) => patch({ ageBand: isAge(event.target.value) ? event.target.value : "" })}
                >
                  <option value="">{m.wizard.age}</option>
                  {AGE_BANDS.map((id, index) => (
                    <option key={id} value={id}>
                      {m.wizard.ages[index]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                {m.wizard.bmi}
                <select
                  className="min-h-11 rounded-xl border border-line bg-white px-3"
                  value={state.bmiBand}
                  onChange={(event) => patch({ bmiBand: isBmi(event.target.value) ? event.target.value : "" })}
                >
                  <option value="">{m.wizard.bmi}</option>
                  {BMI_BANDS.map((id, index) => (
                    <option key={id} value={id}>
                      {m.wizard.bmis[index]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="mt-4 text-sm" id={`${baseId}-conditions`}>
              {m.wizard.conditions}
            </p>
            <div className="mt-2 grid gap-2" role="group" aria-labelledby={`${baseId}-conditions`}>
              {CONDITIONS.map((id, index) => (
                <label key={id} className="flex min-h-11 items-center gap-3 rounded-xl border border-line px-3 text-sm">
                  <input
                    type="checkbox"
                    checked={state.conditions.includes(id)}
                    onChange={() => patch({ conditions: toggleCondition(state.conditions, id) })}
                  />
                  {m.wizard.conditionOpts[index]}
                </label>
              ))}
            </div>
            <fieldset className="mt-4">
              <legend className="text-sm">{m.wizard.inMexico}</legend>
              <div className="mt-2 flex gap-3">
                {[true, false].map((value) => (
                  <label key={String(value)} className="flex min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm">
                    <input
                      type="radio"
                      name={`${baseId}-mexico`}
                      checked={state.inMexico === value}
                      onChange={() => patch({ inMexico: value })}
                    />
                    {value ? m.wizard.yes : m.wizard.no}
                  </label>
                ))}
              </div>
            </fieldset>
          </fieldset>
        ) : null}

        {step === "dates" ? (
          <fieldset>
            <legend className="text-sm font-medium">{m.wizard.datesLegend}</legend>
            <label className="mt-4 grid max-w-xs gap-2 text-sm" htmlFor={`${baseId}-month`}>
              {m.wizard.month}
            </label>
            <input
              id={`${baseId}-month`}
              className="mt-2 min-h-11 max-w-xs rounded-xl border border-line px-3"
              type="month"
              value={state.month}
              min={bounds.min}
              max={bounds.max}
              aria-describedby={`${baseId}-month-hint`}
              onChange={(event) => patch({ month: event.target.value })}
            />
            <p id={`${baseId}-month-hint`} className="mt-2 text-sm text-muted">
              {m.wizard.monthHint}
            </p>
            <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
              <input type="checkbox" checked={state.flexible} onChange={(event) => patch({ flexible: event.target.checked })} />
              {m.wizard.flexible}
            </label>
            <fieldset className="mt-4">
              <legend className="text-sm">{m.wizard.companion}</legend>
              <div className="mt-2 flex gap-3">
                {[true, false].map((value) => (
                  <label key={String(value)} className="flex min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm">
                    <input
                      type="radio"
                      name={`${baseId}-companion`}
                      checked={state.companion === value}
                      onChange={() => patch({ companion: value })}
                    />
                    {value ? m.wizard.yes : m.wizard.no}
                  </label>
                ))}
              </div>
            </fieldset>
          </fieldset>
        ) : null}

        {step === "contact" ? (
          <fieldset>
            <legend className="text-sm font-medium">{m.wizard.contactLegend}</legend>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                {m.wizard.first}
                <input className="min-h-11 rounded-xl border border-line px-3" autoComplete="given-name" maxLength={60} value={state.firstName} onChange={(event) => patch({ firstName: event.target.value })} />
              </label>
              <label className="grid gap-2 text-sm">
                {m.wizard.last}
                <input className="min-h-11 rounded-xl border border-line px-3" autoComplete="family-name" maxLength={60} value={state.lastName} onChange={(event) => patch({ lastName: event.target.value })} />
              </label>
              <label className="grid gap-2 text-sm">
                {m.wizard.email}
                <input className="min-h-11 rounded-xl border border-line px-3" type="email" autoComplete="email" maxLength={120} value={state.email} onChange={(event) => patch({ email: event.target.value })} />
              </label>
              <label className="grid gap-2 text-sm">
                {m.wizard.phone}
                <input className="min-h-11 rounded-xl border border-line px-3" type="tel" autoComplete="tel" maxLength={30} value={state.phone} onChange={(event) => patch({ phone: event.target.value })} />
              </label>
              <label className="grid gap-2 text-sm md:col-span-2">
                {m.wizard.city}
                <input className="min-h-11 rounded-xl border border-line px-3" autoComplete="address-level2" maxLength={80} placeholder={m.wizard.cityPh} value={state.city} onChange={(event) => patch({ city: event.target.value })} />
              </label>
              <label className="grid gap-2 text-sm md:col-span-2">
                {m.wizard.note}
                <textarea className="min-h-28 rounded-xl border border-line px-3 py-2" maxLength={800} placeholder={m.wizard.notePh} value={state.note} onChange={(event) => patch({ note: event.target.value })} />
              </label>
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed">
              <input className="mt-1" type="checkbox" checked={state.adult} onChange={(event) => patch({ adult: event.target.checked })} />
              <span>{m.wizard.adult}</span>
            </label>
            <label className="mt-3 flex items-start gap-3 text-sm leading-relaxed">
              <input className="mt-1" type="checkbox" checked={state.consent} onChange={(event) => patch({ consent: event.target.checked })} />
              <span>
                {m.wizard.consent}{" "}
                <Link className="underline" to="/privacy">
                  {m.nav.privacy}
                </Link>
              </span>
            </label>
          </fieldset>
        ) : null}

        {step === "result" && estimate ? (
          <div aria-live="polite">
            <p className="text-sm text-muted">{m.wizard.resultTitle}</p>
            {estimate.kind === "range" && estimate.low !== null && estimate.high !== null ? (
              <>
                <p className="mt-2 font-serif text-4xl tracking-tight">{formatRange(estimate.low, estimate.high)}</p>
                <p className="mt-2 text-sm text-navy">
                  {m.wizard.fromLabel} {formatCad(estimate.low)}
                </p>
                <p className="mt-4 text-sm leading-relaxed">{estimate.flags.includes("hip-same-band") ? m.wizard.hipBasis : m.wizard.kneeBasis}</p>
              </>
            ) : (
              <p className="mt-3 text-base leading-relaxed">{m.wizard.onRequest}</p>
            )}
            {estimate.flags.includes("complexity") ? <p className="mt-3 text-sm leading-relaxed">{m.wizard.complexity}</p> : null}
            {estimate.flags.includes("snowbird-not-in-mexico") ? <p className="mt-3 text-sm leading-relaxed">{m.wizard.snowFlag}</p> : null}
            <p className="mt-4 text-sm leading-relaxed text-muted">{m.wizard.notQuote}</p>
            {mailto ? (
              <form className="mt-6" action={mailto.action} method="GET">
                <input type="hidden" name="subject" value={mailto.subject} />
                <input type="hidden" name="body" value={mailto.body} />
                <button type="submit" className="inline-flex min-h-11 items-center rounded-full bg-navy px-5 text-sm font-medium text-white">
                  {m.wizard.send}
                </button>
                <p className="mt-3 text-sm text-muted">{m.wizard.sent}</p>
              </form>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {step !== "procedure" ? (
          <button type="button" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm" onClick={goBack}>
            {m.wizard.back}
          </button>
        ) : null}
        {step !== "result" ? (
          <button type="button" className="inline-flex min-h-11 items-center rounded-full bg-navy px-5 text-sm font-medium text-white" onClick={goNext}>
            {m.wizard.next}
          </button>
        ) : null}
        <button type="button" className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-muted underline" onClick={clearAll}>
          {m.wizard.clear}
        </button>
      </div>
    </div>
  );
}

function leadLines(
  state: WizardState,
  estimate: Estimate | null,
  m: ReturnType<typeof useI18n>["m"],
): string[] {
  const procedure = state.procedure ? m.wizard.procedures[state.procedure].label : "";
  const pack = state.packageId ? m.packages.items[state.packageId].name : "";
  const age = state.ageBand ? m.wizard.ages[AGE_BANDS.indexOf(state.ageBand)] : "";
  const bmi = state.bmiBand ? m.wizard.bmis[BMI_BANDS.indexOf(state.bmiBand)] : "";
  const conditions = state.conditions.map((id) => m.wizard.conditionOpts[CONDITIONS.indexOf(id)]).join(", ");
  const range =
    estimate?.kind === "range" && estimate.low !== null && estimate.high !== null
      ? formatRange(estimate.low, estimate.high)
      : m.wizard.onRequest;
  return [
    m.wizard.leadIntro,
    `${m.wizard.procedureLegend} ${procedure}`,
    `${m.wizard.packageLegend} ${pack}`,
    `${m.wizard.age}: ${age ?? ""}`,
    `${m.wizard.bmi}: ${bmi ?? ""}`,
    `${m.wizard.conditions} ${conditions}`,
    `${m.wizard.inMexico} ${state.inMexico ? m.wizard.yes : m.wizard.no}`,
    `${m.wizard.month}: ${state.month}`,
    `${m.wizard.flexible}: ${state.flexible ? m.wizard.yes : m.wizard.no}`,
    `${m.wizard.companion} ${state.companion ? m.wizard.yes : m.wizard.no}`,
    `${m.wizard.first}: ${state.firstName} ${state.lastName}`,
    `${m.wizard.email}: ${state.email}`,
    `${m.wizard.phone}: ${state.phone}`,
    `${m.wizard.city}: ${state.city}`,
    state.note ? `${m.wizard.note}: ${state.note}` : "",
    `${m.wizard.resultTitle}: ${range}`,
    m.wizard.leadConsent,
    m.wizard.leadDisclaimer,
  ];
}
