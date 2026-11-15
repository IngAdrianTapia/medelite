export interface SourceLink {
  href: string;
  label: string;
}

export const CRA_MEDICAL_EXPENSES =
  "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/lines-33099-33199-eligible-medical-expenses-you-claim-on-your-tax-return.html";

export const HM_RELEASE =
  "https://www.hmhospitales.com/comunicado-prensa/hm-hospitales-y-grupo-medico-joya-sellan-una-alianza-estrategica-para-impulsar-la-continuidad-asistencial-entre-espana-y-mexico/";

export const SOURCES: readonly SourceLink[] = [
  {
    href: "https://www.fraserinstitute.org/sites/default/files/2025-12/waiting-your-turn-2025-17913.pdf",
    label: "Fraser Institute — Waiting Your Turn 2025 (PDF)",
  },
  {
    href: "https://www.newswire.ca/news-releases/more-than-105-000-canadians-estimated-to-have-left-canada-for-medical-treatment-last-year-859555648.html",
    label: "Fraser Institute / CNW — Leaving Canada for Medical Care, 2025",
  },
  {
    href: "https://www.informador.mx/jalisco/Crece-conectividad-aerea-entre-Puerto-Vallarta-y-Canada-20250627-0158.html",
    label: "El Informador — conectividad PVR–Canadá y canadienses a Jalisco, 2024",
  },
  {
    href: "https://www.directflights.com/YVR-PVR",
    label: "Directflights.com — vuelos sin escala YVR–PVR",
  },
  {
    href: "https://snowbyrds.ca/destinations/puerto-vallarta",
    label: "Snowbyrds — estimación de snowbirds en Puerto Vallarta",
  },
  {
    href: "https://hospitaljoya.com/",
    label: "Grupo Médico Joya — hospitaljoya.com",
  },
  {
    href: HM_RELEASE,
    label: "HM Hospitales — comunicado del 10 de septiembre de 2026",
  },
  {
    href: "https://www.medeliteofficial.com/",
    label: "MedElite International Health — medeliteofficial.com",
  },
  {
    href: CRA_MEDICAL_EXPENSES,
    label: "Canada Revenue Agency — eligible medical expenses",
  },
];

export const SOCIAL = [
  { href: "https://www.instagram.com/medelite.ca", label: "Instagram · @medelite.ca" },
  { href: "https://www.tiktok.com/@medelite.ca", label: "TikTok · @medelite.ca" },
  { href: "https://www.facebook.com/profile.php?id=61588890526828", label: "Facebook" },
] as const;
