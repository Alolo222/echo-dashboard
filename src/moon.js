// Phase de lune : mapping état -> icône MDI + libellé français. L'intégration
// HA "Moon" (entité par défaut `sensor.moon_phase`) expose l'un des 8 états
// ci-dessous ; aucune icône à bundler, `ha-icon` du frontend s'en charge.

const MOON_PHASES = {
  new_moon: { icon: "mdi:moon-new", label: "Nouvelle lune" },
  waxing_crescent: {
    icon: "mdi:moon-waxing-crescent",
    label: "Premier croissant",
  },
  first_quarter: { icon: "mdi:moon-first-quarter", label: "Premier quartier" },
  waxing_gibbous: {
    icon: "mdi:moon-waxing-gibbous",
    label: "Lune gibbeuse croissante",
  },
  full_moon: { icon: "mdi:moon-full", label: "Pleine lune" },
  waning_gibbous: {
    icon: "mdi:moon-waning-gibbous",
    label: "Lune gibbeuse décroissante",
  },
  last_quarter: { icon: "mdi:moon-last-quarter", label: "Dernier quartier" },
  waning_crescent: {
    icon: "mdi:moon-waning-crescent",
    label: "Dernier croissant",
  },
};

export function moonPhase(state) {
  return MOON_PHASES[state] || null;
}
