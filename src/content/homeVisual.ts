type Lang = "es" | "en" | "fr";

/** Short labels for the visual home page. Long copy lives on the inner pages. */
export const HOME_VISUAL: Record<
  Lang,
  { watch: string; pause: string; play: string; explore: string; tiles: { to: string; label: string; photo: string; icon: string }[]; videos: string; more: string; team: string; site: string }
> = {
  es: {
    watch: "Ver el video",
    pause: "Pausar el video de fondo",
    play: "Reproducir el video de fondo",
    explore: "¿Qué busca?",
    tiles: [
      { to: "/canada", label: "Vengo de Canadá", photo: "marina-street", icon: "plane" },
      { to: "#red", label: "Sedes y cómo llegar", photo: "cancun", icon: "pin" },
      { to: "/especialidades", label: "Especialidades", photo: "operating-room", icon: "pulse" },
      { to: "#paquetes", label: "Paquetes", photo: "patient-room", icon: "bag" },
      { to: "/preparacion", label: "Familia y viaje", photo: "cancun-lobby", icon: "family" },
      { to: "/seguros", label: "Seguros", photo: "riviera-er", icon: "shield" },
    ],
    videos: "Hospital Joya por dentro",
    more: "Datos, fuentes y avisos",
    team: "Conozca al equipo",
    site: "Hospital Joya Marina Vallarta",
  },
  en: {
    watch: "Watch the video",
    pause: "Pause the background video",
    play: "Play the background video",
    explore: "What are you looking for?",
    tiles: [
      { to: "/canada", label: "Coming from Canada", photo: "marina-street", icon: "plane" },
      { to: "#red", label: "Hospitals and directions", photo: "cancun", icon: "pin" },
      { to: "/especialidades", label: "Specialties", photo: "operating-room", icon: "pulse" },
      { to: "#paquetes", label: "Packages", photo: "patient-room", icon: "bag" },
      { to: "/preparacion", label: "Family and travel", photo: "cancun-lobby", icon: "family" },
      { to: "/seguros", label: "Insurance", photo: "riviera-er", icon: "shield" },
    ],
    videos: "Inside Hospital Joya",
    more: "Facts, sources and notices",
    team: "Meet the team",
    site: "Hospital Joya Marina Vallarta",
  },
  fr: {
    watch: "Voir la vidéo",
    pause: "Mettre en pause la vidéo de fond",
    play: "Lire la vidéo de fond",
    explore: "Que cherchez-vous ?",
    tiles: [
      { to: "/canada", label: "Je viens du Canada", photo: "marina-street", icon: "plane" },
      { to: "#red", label: "Établissements et accès", photo: "cancun", icon: "pin" },
      { to: "/especialidades", label: "Spécialités", photo: "operating-room", icon: "pulse" },
      { to: "#paquetes", label: "Forfaits", photo: "patient-room", icon: "bag" },
      { to: "/preparacion", label: "Famille et voyage", photo: "cancun-lobby", icon: "family" },
      { to: "/seguros", label: "Assurances", photo: "riviera-er", icon: "shield" },
    ],
    videos: "Hospital Joya de l’intérieur",
    more: "Données, sources et avis",
    team: "Rencontrer l’équipe",
    site: "Hospital Joya Marina Vallarta",
  },
};

export const TILE_ICON: Record<string, string> = {
  plane: "M2 16l20-6-2-2-7 2-5-6H6l3 7-5 1-2-2H1l1 6z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  pulse: "M3 12h4l2-5 4 10 2-5h6",
  bag: "M6 8h12l-1 12H7L6 8zM9 8V6a3 3 0 0 1 6 0v2",
  family: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 20c0-3 2.2-5 5-5s5 2 5 5M13 20c.2-2.4 1.6-4 3.5-4 2.1 0 3.5 1.8 3.5 4",
  shield: "M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3zM9 12l2 2 4-4",
};
