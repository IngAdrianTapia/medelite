import type { HospitalId } from "../data/hospitals";
import type { PackageId, ProcedureId } from "../data/packages";

export type Lang = "es" | "en" | "fr";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Messages {
  meta: { title: string; description: string };
  skip: string;
  nav: {
    aria: string;
    menu: string;
    close: string;
    specialties: string;
    packages: string;
    quote: string;
    journey: string;
    snowbirds: string;
    trust: string;
    network: string;
    faq: string;
    contact: string;
    privacy: string;
    terms: string;
  };
  langAria: string;
  notice: string;
  hero: {
    kicker: string;
    title: string;
    lede: string;
    ctaQuote: string;
    ctaHow: string;
    illAlt: string;
    illCap: string;
    route: string;
    metrics: { value: string; label: string }[];
  };
  role: { kicker: string; title: string; body: string; points: string[] };
  verticals: {
    kicker: string;
    title: string;
    deck: string;
    focus: string;
    request: string;
    items: { title: string; body: string; sites: string; request: boolean }[];
  };
  packages: {
    kicker: string;
    title: string;
    deck: string;
    from: string;
    range: string;
    example: string;
    note: string;
    payment: string;
    items: Record<PackageId, { name: string; who: string; points: string[] }>;
  };
  wizard: {
    kicker: string;
    title: string;
    deck: string;
    admin: string;
    emergency: string;
    steps: string[];
    progress: string;
    back: string;
    next: string;
    clear: string;
    procedureLegend: string;
    procedures: Record<ProcedureId, { label: string; hint: string }>;
    packageLegend: string;
    healthLegend: string;
    age: string;
    ages: [string, string, string, string];
    bmi: string;
    bmis: [string, string, string, string];
    conditions: string;
    conditionOpts: [string, string, string, string];
    inMexico: string;
    yes: string;
    no: string;
    datesLegend: string;
    month: string;
    monthHint: string;
    flexible: string;
    companion: string;
    contactLegend: string;
    first: string;
    last: string;
    email: string;
    phone: string;
    city: string;
    cityPh: string;
    note: string;
    notePh: string;
    adult: string;
    consent: string;
    errors: Record<
      | "required"
      | "email"
      | "phone"
      | "consent"
      | "adult"
      | "card"
      | "month"
      | "past"
      | "conditions"
      | "conflict",
      string
    >;
    resultTitle: string;
    fromLabel: string;
    onRequest: string;
    kneeBasis: string;
    hipBasis: string;
    complexity: string;
    snowFlag: string;
    notQuote: string;
    send: string;
    sent: string;
    subject: string;
    leadIntro: string;
    leadConsent: string;
    leadDisclaimer: string;
  };
  journey: {
    kicker: string;
    title: string;
    deck: string;
    steps: { title: string; body: string }[];
  };
  snow: {
    kicker: string;
    title: string;
    paragraphs: string[];
    alt: string;
    cap: string;
  };
  metc: {
    kicker: string;
    title: string;
    paragraphs: string[];
    disclaimer: string;
    link: string;
  };
  trust: {
    kicker: string;
    title: string;
    deck: string;
    items: { title: string; body: string }[];
    standards: string;
  };
  network: {
    kicker: string;
    title: string;
    deck: string;
    open: string;
    future: string;
    hm: string;
    view: string;
    opened: string;
    logoAlt: string;
    source: string;
    phones: string;
    focus: Record<"orthopedics" | "bariatric" | "plastic" | "general", string>;
    blurbs: Record<HospitalId, string>;
  };
  facts: {
    kicker: string;
    title: string;
    deck: string;
    caption: string;
    columns: [string, string, string];
    rows: { ind: string; fig: string; src: string }[];
  };
  about: {
    kicker: string;
    title: string;
    lead: string;
    storyTitle: string;
    story: string[];
    teamTitle: string;
    erikaRole: string;
    erika: string;
    erikaAlt: string;
    anaName: string;
    anaRole: string;
    ana: string;
  };
  faq: { kicker: string; title: string; deck: string; items: FaqItem[] };
  audio: {
    kicker: string;
    title: string;
    deck: string;
    heading: string;
    body: string;
    transcript: string;
    text: string;
  };
  contact: {
    kicker: string;
    title: string;
    deck: string;
    email: string;
    phone: string;
    hours: string;
    hoursValue: string;
    response: string;
    city: string;
  };
  footer: {
    tag: string;
    about: string;
    fine: string;
    follow: string;
    contact: string;
    legal: string;
    copy: string;
    pwa: string;
    official: string;
    photos: string;
  };
  sourcesTitle: string;
  privacy: { kicker: string; title: string; updated: string; sections: LegalSection[] };
  terms: { kicker: string; title: string; updated: string; sections: LegalSection[] };
  notFound: { title: string; body: string; home: string };
}
