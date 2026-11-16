type Lang = "es" | "en" | "fr";

interface AudienceCard {
  to: string;
  icon: string;
  title: string;
  body: string;
  cta: string;
}

interface HomeCopy {
  coordinator: string;
  factsLabel: string;
  facts: { value: string; label: string }[];
  audienceKicker: string;
  audienceTitle: string;
  audienceDeck: string;
  audience: AudienceCard[];
  videoKicker: string;
  videoTitle: string;
  videoDeck: string;
  galleryKicker: string;
  galleryTitle: string;
  galleryPrev: string;
  galleryNext: string;
  galleryAll: string;
}

const ICON = {
  canada: "M12 21v-5M5 11l2-1-1-3 3 1 1-3 2 3 2-3 1 3 3-1-1 3 2 1-3 3 1 2-4-1-1 0-4 1 1-2z",
  mexico: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  family: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 20c0-3 2.2-5 5-5s5 2 5 5M13 20c.2-2.4 1.6-4 3.5-4 2.1 0 3.5 1.8 3.5 4",
  doctor: "M6 3v5a4 4 0 0 0 8 0V3M10 12v3a5 5 0 0 0 10 0v-2M20 11a2 2 0 1 0 0 .01",
};

export const HOME_COPY: Record<Lang, HomeCopy> = {
  es: {
    coordinator: "Hablar con la coordinación internacional",
    factsLabel: "MedElite en cifras",
    facts: [
      { value: "9", label: "sedes de Hospital Joya en México" },
      { value: "Vancouver", label: "oficina de coordinación en Columbia Británica" },
      { value: "ES · EN · FR", label: "atención en tres idiomas" },
      { value: "~5 h", label: "vuelo directo Vancouver – Puerto Vallarta" },
    ],
    audienceKicker: "Empiece aquí",
    audienceTitle: "Un camino distinto para cada persona",
    audienceDeck: "Elija su situación. Cada ruta reúne lo esencial primero y el detalle cuando lo necesite.",
    audience: [
      { to: "/canada", icon: ICON.canada, title: "Paciente en Canadá", body: "Espera, costos, vuelos y lo que cubre su provincia antes de decidir.", cta: "Ver la guía para Canadá" },
      { to: "/red", icon: ICON.mexico, title: "Ya está en México", body: "Snowbirds y residentes: encuentre la sede Joya más cercana con dirección y teléfono.", cta: "Ver las sedes" },
      { to: "/preparacion", icon: ICON.family, title: "Familia y acompañantes", body: "Qué llevar, cuántos días quedarse y cómo acompañar la recuperación.", cta: "Preparar el viaje" },
      { to: "/seguros", icon: ICON.doctor, title: "Seguros y cobertura", body: "Las aseguradoras que publica Hospital Joya, para revisar su cobertura antes de viajar.", cta: "Ver aseguradoras" },
    ],
    videoKicker: "Hospital Joya en video",
    videoTitle: "Conozca la red por dentro",
    videoDeck: "Hospital Joya Marina Vallarta, en este sitio, sin anuncios.",
    galleryKicker: "Galería",
    galleryTitle: "Instalaciones reales, fotografiadas por Hospital Joya",
    galleryPrev: "Fotos anteriores",
    galleryNext: "Fotos siguientes",
    galleryAll: "Ver toda la galería",
  },
  en: {
    coordinator: "Talk to the international coordinator",
    factsLabel: "MedElite at a glance",
    facts: [
      { value: "9", label: "Hospital Joya locations in Mexico" },
      { value: "Vancouver", label: "coordination office in British Columbia" },
      { value: "ES · EN · FR", label: "service in three languages" },
      { value: "~5 h", label: "nonstop flight Vancouver – Puerto Vallarta" },
    ],
    audienceKicker: "Start here",
    audienceTitle: "A clear path for every person",
    audienceDeck: "Choose your situation. Each path puts the essentials first and the detail when you need it.",
    audience: [
      { to: "/canada", icon: ICON.canada, title: "Patient in Canada", body: "Wait times, costs, flights and what your province covers before you decide.", cta: "Read the Canada guide" },
      { to: "/red", icon: ICON.mexico, title: "Already in Mexico", body: "Snowbirds and residents: find the nearest Joya hospital, with its address and phone.", cta: "See the hospitals" },
      { to: "/preparacion", icon: ICON.family, title: "Family and companions", body: "What to pack, how long to stay and how to support the recovery.", cta: "Prepare the trip" },
      { to: "/seguros", icon: ICON.doctor, title: "Insurance and coverage", body: "The insurers Hospital Joya lists, so you can check your coverage before you travel.", cta: "See insurers" },
    ],
    videoKicker: "Hospital Joya on video",
    videoTitle: "See the network from the inside",
    videoDeck: "Hospital Joya Marina Vallarta, on this site, without ads.",
    galleryKicker: "Gallery",
    galleryTitle: "Real facilities, photographed by Hospital Joya",
    galleryPrev: "Previous photos",
    galleryNext: "Next photos",
    galleryAll: "View the full gallery",
  },
  fr: {
    coordinator: "Parler à la coordination internationale",
    factsLabel: "MedElite en bref",
    facts: [
      { value: "9", label: "établissements Hospital Joya au Mexique" },
      { value: "Vancouver", label: "bureau de coordination en Colombie-Britannique" },
      { value: "ES · EN · FR", label: "service en trois langues" },
      { value: "~5 h", label: "vol direct Vancouver – Puerto Vallarta" },
    ],
    audienceKicker: "Commencer ici",
    audienceTitle: "Un parcours clair pour chaque personne",
    audienceDeck: "Choisissez votre situation. Chaque parcours présente l’essentiel d’abord, et le détail au besoin.",
    audience: [
      { to: "/canada", icon: ICON.canada, title: "Patient au Canada", body: "Délais d’attente, coûts, vols et ce que couvre votre province avant de décider.", cta: "Lire le guide pour le Canada" },
      { to: "/red", icon: ICON.mexico, title: "Déjà au Mexique", body: "Snowbirds et résidents : trouvez l’établissement Joya le plus proche, avec adresse et téléphone.", cta: "Voir les établissements" },
      { to: "/preparacion", icon: ICON.family, title: "Famille et accompagnateurs", body: "Quoi apporter, combien de jours rester et comment soutenir le rétablissement.", cta: "Préparer le voyage" },
      { to: "/seguros", icon: ICON.doctor, title: "Assurance et couverture", body: "Les assureurs indiqués par Hospital Joya, pour vérifier votre couverture avant le départ.", cta: "Voir les assureurs" },
    ],
    videoKicker: "Hospital Joya en vidéo",
    videoTitle: "Découvrir le réseau de l’intérieur",
    videoDeck: "Hospital Joya Marina Vallarta, sur ce site, sans publicité.",
    galleryKicker: "Galerie",
    galleryTitle: "De vraies installations, photographiées par Hospital Joya",
    galleryPrev: "Photos précédentes",
    galleryNext: "Photos suivantes",
    galleryAll: "Voir toute la galerie",
  },
};
