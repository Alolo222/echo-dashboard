// Déclinaisons visuelles du cadran analogique (mode round uniquement),
// choisies via la config `analog_style`. Même structure de base à chaque
// fois (graduations éventuelles, chiffres éventuels, aiguilles
// heure/minute/seconde, seconde qui tourne en continu) — seuls les
// couleurs, épaisseurs, présences et parfois la forme des aiguilles
// changent d'un style à l'autre. Le mode nuit ignore ces couleurs et
// repasse tout en rouge très atténué (cf. règles `:host(.night)
// .analog-clock .hand` etc. dans static styles, echo-home-card.js) — la
// sobriété nocturne prime toujours sur le style choisi.
//
// "aurore" est le style d'origine (introduit en 1.1.0-1.1.4) et reste la
// valeur par défaut : ne change pas le rendu des configs existantes qui
// ne précisent pas `analog_style`.

export const DEFAULT_ANALOG_STYLE = "aurore";

export const ANALOG_STYLES = {
  aurore: {
    label: "Dégradé Aurore",
    description:
      "Le style d'origine : dégradé turquoise → bleu → violet, chiffres à 12/3/6/9, fines graduations sur les autres heures.",
    background: "linear-gradient(160deg, #1aa19b 0%, #2f6fb3 45%, #4a3d82 100%)",
    ticks: {
      shape: "line",
      mode: "minor", // graduations sur les heures non cardinales seulement
      y1: 5,
      y2: 9,
      width: 1,
      color: "#ffffff",
      opacity: 0.75,
    },
    numerals: { mode: "quad", radius: 41, size: 11, weight: 300, opacity: 0.9, color: "#ffffff" },
    hour: { len: 23, color: "#ffffff", width: 4, cap: "round" },
    minute: { len: 35, color: "#ffffff", width: 2.6, cap: "round" },
    second: { len: 42, tail: 8, color: "#ffffff", width: 1, cap: "round", opacity: 0.85 },
    center: { r: 2, color: "#ffffff" },
    comp: { color: "#ffffff", opacity: 0.85 },
  },

  mono: {
    label: "Mono Contraste",
    description:
      "Fond quasi noir, aiguilles blanches, seconde corail — l'esprit d'une montre de sport minimaliste.",
    background: "#0e0f12",
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      minorR: 0.9,
      minorOpacity: 0.35,
      cardinalR: 1.6,
      cardinalOpacity: 0.6,
      color: "#f5f6f7",
    },
    numerals: null,
    hour: { len: 24, color: "#f5f6f7", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#f5f6f7", width: 2.8, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#ff5a4e",
      width: 1,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.4, fill: "#ff5a4e" },
    },
    center: { r: 1.8, color: "#f5f6f7", ring: { r: 3.4, width: 1, color: "#ff5a4e" } },
    comp: { color: "#f5f6f7", opacity: 0.6 },
  },

  clair: {
    label: "Clair Épuré",
    description:
      "Fond clair, aiguilles encre plates, quatre points cardinaux — sobre, presque scandinave.",
    background: "#efeee4",
    ticks: {
      shape: "dot",
      mode: "cardinal",
      radius: 44,
      cardinalR: 1.4,
      cardinalOpacity: 0.55,
      color: "#22262b",
    },
    numerals: null,
    hour: { len: 28, color: "#22262b", width: 4.5, cap: "butt" },
    minute: { len: 36, color: "#22262b", width: 2.4, cap: "butt" },
    second: { len: 42, tail: 0, color: "#3f6b4e", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2.2, color: "#22262b" },
    // Les icônes Meteocons (style "fill", cf. icons.js) sont surtout
    // blanches/claires — illisibles sur ce fond clair par défaut,
    // repéré en testant les 5 styles (invisible à côté des aiguilles
    // sombres). iconFilter les repasse en silhouette encre, cohérent
    // avec le reste du style (aucune autre couleur que l'encre ici).
    comp: { color: "#22262b", opacity: 0.6, iconFilter: "brightness(0)" },
  },

  neon: {
    label: "Néon Sombre",
    description:
      "Bleu nuit profond, cyan lumineux avec halo, seconde magenta — plus gadget, plus spectaculaire.",
    background: "radial-gradient(120% 120% at 50% 28%, #141a2e 0%, #0b0e1a 70%)",
    glow: true,
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      minorR: 0.9,
      minorOpacity: 0.35,
      cardinalR: 1.5,
      cardinalOpacity: 0.7,
      color: "#5eead4",
    },
    numerals: null,
    hour: { len: 24, color: "#5eead4", width: 4, cap: "round" },
    minute: { len: 36, color: "#5eead4", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#ff6ec9",
      width: 1,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.3, fill: "#ff6ec9" },
    },
    center: { r: 1.8, color: "#5eead4", ring: { r: 3.2, width: 1, color: "#ff6ec9" } },
    comp: { color: "#5eead4", opacity: 0.65 },
  },

  ardoise: {
    label: "Ardoise Géométrique",
    description:
      "Fond ardoise mat, aiguilles rectangulaires, seule l'heure 12 est marquée — plus architectural.",
    background: "radial-gradient(140% 100% at 50% 100%, rgba(0, 0, 0, 0.28), transparent 60%), #3a4750",
    shape: "rect", // seul style à aiguilles géométriques plutôt que des traits
    ticks: {
      shape: "dot",
      mode: "all",
      skip: [0], // position de midi laissée au chiffre "12"
      radius: 44,
      minorR: 1,
      minorOpacity: 0.22,
      cardinalR: 1,
      cardinalOpacity: 0.22,
      color: "#edeef0",
    },
    numerals: { mode: "single", radius: 40, size: 9, weight: 300, opacity: 0.75, color: "#edeef0" },
    hour: { w: 5, len: 26, color: "#edeef0" },
    minute: { w: 3, len: 38, color: "rgba(237, 238, 240, .92)" },
    second: { w: 1.2, len: 44, tail: 8, color: "#b7e778" },
    center: { size: 4, color: "#b7e778" },
    comp: { color: "#edeef0", opacity: 0.6 },
  },

  // --- Styles "planétaires" ------------------------------------------------
  // Un par jour de la semaine, sur le nom latin dont vient le jour français
  // (lundi = Lune, mardi = Mars, ...) — sélectionnables individuellement via
  // `analog_style`, ou tous les 7 automatiquement via `analog_style: "auto"`
  // (cf. WEEKDAY_ANALOG_STYLES plus bas, et sa résolution dans render()).
  //
  // Chacun définit en plus un bloc `night` optionnel : { background, color }.
  // Contrairement aux 5 styles ci-dessus (sans `night`, qui gardent le
  // traitement nuit uniforme d'origine — fond bleu marine fixe, aiguilles
  // rouge très atténué, cf. règles :host(.night) dans static styles), ces
  // styles gardent une identité propre même la nuit : fond et couleur
  // d'aiguilles/graduations/chiffres propres au jour, mais toujours sombres
  // et atténués (même --_night-opacity qu'avant, cf. _applyNightPalette) —
  // l'économie de lumière reste respectée, seule la teinte change.

  lune: {
    label: "Lune (lundi)",
    description:
      "Argenté et nocturne même de jour : bleu-gris profond, aiguilles blanc cassé, un croissant à la place du \"12\".",
    background: "linear-gradient(145deg, #1c2333 0%, #2e3a55 55%, #46567c 100%)",
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      minorR: 0.9,
      minorOpacity: 0.35,
      cardinalR: 1.5,
      cardinalOpacity: 0.7,
      color: "#dbe4f5",
    },
    numerals: {
      mode: "single",
      labels: ["☾"],
      radius: 40,
      size: 13,
      weight: 300,
      opacity: 0.85,
      color: "#dbe4f5",
    },
    hour: { len: 24, color: "#f4f7ff", width: 4, cap: "round" },
    minute: { len: 36, color: "#f4f7ff", width: 2.6, cap: "round" },
    second: { len: 42, tail: 8, color: "#a9c2f2", width: 1, cap: "round", opacity: 0.85, tipDot: { r: 1.3, fill: "#a9c2f2" } },
    center: { r: 1.8, color: "#f4f7ff", ring: { r: 3.2, width: 1, color: "#a9c2f2" } },
    comp: { color: "#dbe4f5", opacity: 0.65 },
    night: { background: "#050914", color: "#5b7bb0" },
  },

  mars: {
    label: "Mars (mardi)",
    description:
      "Martial et rouille : dégradé brique profond, aiguilles rectangulaires épaisses, accent rouge-orangé vif.",
    background: "linear-gradient(160deg, #7a1f1f 0%, #4a1010 60%, #2a0a0a 100%)",
    shape: "rect",
    ticks: {
      shape: "dot",
      mode: "cardinal",
      skip: [0], // position de midi laissée au chiffre "12" (numerals ci-dessous)
      radius: 44,
      cardinalR: 1.6,
      cardinalOpacity: 0.6,
      color: "#e8b8a0",
    },
    numerals: { mode: "single", radius: 40, size: 10, weight: 600, opacity: 0.8, color: "#e8b8a0" },
    hour: { w: 5, len: 26, color: "#f2c9b0" },
    minute: { w: 3, len: 38, color: "#f2c9b0" },
    second: { w: 1.2, len: 44, tail: 8, color: "#ff5533" },
    center: { size: 4, color: "#ff5533" },
    comp: { color: "#f2c9b0", opacity: 0.65 },
    night: { background: "#0d0402", color: "#a13f2e" },
  },

  mercure: {
    label: "Mercure (mercredi)",
    description:
      "Vif-argent et véloce : dégradé métallique clair, aiguilles très fines sans chiffres, accent bleu rapide.",
    background: "linear-gradient(135deg, #eef1f4 0%, #c3c9d1 45%, #8f96a3 100%)",
    ticks: { shape: "line", mode: "all", y1: 6, y2: 9, width: 0.8, color: "#2c2f36", opacity: 0.5 },
    numerals: null,
    hour: { len: 22, color: "#20232a", width: 3.6, cap: "round" },
    minute: { len: 35, color: "#20232a", width: 2.2, cap: "round" },
    second: { len: 43, tail: 6, color: "#3b6fd6", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 1.8, color: "#20232a" },
    // Fond clair (comme "clair") : icônes Meteocons repassées en silhouette
    // encre, sinon illisibles en blanc sur ce fond.
    comp: { color: "#20232a", opacity: 0.55, iconFilter: "brightness(0)" },
    night: { background: "#0a0b0d", color: "#5c6b85" },
  },

  jupiter: {
    label: "Jupiter (jeudi)",
    description:
      "Royal et doré : fond violet profond, chiffres et graduations or aux cardinaux, seconde blanche.",
    background: "linear-gradient(150deg, #2e1a47 0%, #472569 50%, #6b3a94 100%)",
    ticks: {
      shape: "dot",
      mode: "minor", // cardinaux laissés aux chiffres "12/3/6/9" ci-dessous, comme "aurore"
      radius: 44,
      minorR: 1,
      minorOpacity: 0.3,
      color: "#f2c65c",
    },
    numerals: { mode: "quad", radius: 41, size: 11, weight: 500, opacity: 0.9, color: "#f2c65c" },
    hour: { len: 24, color: "#f2c65c", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#f5d98a", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#ffffff", width: 1, cap: "round", opacity: 0.85 },
    center: { r: 2, color: "#f2c65c", ring: { r: 3.6, width: 1, color: "#f5d98a" } },
    comp: { color: "#f2c65c", opacity: 0.75 },
    night: { background: "#0e081a", color: "#8a6a2e" },
  },

  venus: {
    label: "Vénus (vendredi)",
    description:
      "Élégant et rose doré : fond champagne clair, aiguilles fines encre, seconde corail, aucune graduation.",
    background: "linear-gradient(160deg, #f6d9d0 0%, #f0c3c9 50%, #e5a9c2 100%)",
    ticks: { shape: "dot", mode: "cardinal", radius: 44, cardinalR: 1.3, cardinalOpacity: 0.5, color: "#7a4a52" },
    numerals: null,
    hour: { len: 27, color: "#7a4a52", width: 4, cap: "butt" },
    minute: { len: 36, color: "#7a4a52", width: 2.3, cap: "butt" },
    second: { len: 42, tail: 0, color: "#e0637d", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#7a4a52" },
    comp: { color: "#7a4a52", opacity: 0.6, iconFilter: "brightness(0)" },
    night: { background: "#160a10", color: "#8a5566" },
  },

  saturne: {
    label: "Saturne (samedi)",
    description:
      "Lourd et cerclé : fond bronze/plomb mat, un fin anneau elliptique autour du cadran façon anneaux de Saturne.",
    background: "radial-gradient(140% 100% at 50% 100%, rgba(0, 0, 0, 0.3), transparent 60%), #4a3f30",
    shape: "rect",
    // Anneau décoratif propre à ce style — rendu derrière graduations et
    // aiguilles (cf. _renderOuterRing, appelé avant _renderTicks dans
    // _renderAnalogClock) pour ne jamais gêner leur lisibilité.
    outerRing: { rx: 47, ry: 30, rotate: -18, color: "#c9a86a", width: 1.2, opacity: 0.5 },
    ticks: {
      shape: "dot",
      mode: "all",
      skip: [0], // position de midi laissée au chiffre "12"
      radius: 44,
      minorR: 1,
      minorOpacity: 0.22,
      cardinalR: 1,
      cardinalOpacity: 0.3,
      color: "#e7dcc4",
    },
    numerals: { mode: "single", radius: 40, size: 9, weight: 300, opacity: 0.7, color: "#e7dcc4" },
    hour: { w: 5, len: 24, color: "#e7dcc4" },
    minute: { w: 3, len: 36, color: "#d8caa0" },
    second: { w: 1.2, len: 42, tail: 8, color: "#c9a86a" },
    center: { size: 4, color: "#c9a86a" },
    comp: { color: "#e7dcc4", opacity: 0.6 },
    night: { background: "#0a0805", color: "#6b5a3a" },
  },

  soleil: {
    label: "Soleil (dimanche)",
    description:
      "Rayonnant et chaud : dégradé orange/jaune façon lever de soleil, graduations fines sur les 12 heures façon rayons, halo activé.",
    background: "linear-gradient(160deg, #ffb545 0%, #ff8a3d 55%, #ff5e3a 100%)",
    glow: true,
    ticks: { shape: "line", mode: "all", y1: 4, y2: 9, width: 1.2, color: "#fff6e0", opacity: 0.85 },
    numerals: null,
    hour: { len: 23, color: "#fff6e0", width: 4.5, cap: "round" },
    minute: { len: 35, color: "#fff6e0", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#c81d1d", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2.2, color: "#fff6e0" },
    comp: { color: "#fff6e0", opacity: 0.85 },
    // Le soleil est couché la nuit : bascule sur un indigo profond plutôt
    // que de garder le fond orange/jaune, aiguilles en braises ambrées.
    night: { background: "#0a0e1e", color: "#8a5a2e" },
  },
};

// Résolution de `analog_style: "auto"` — un style planétaire par jour,
// indexé comme Date.getDay() (0 = dimanche ... 6 = samedi). Recalculé à
// chaque rendu (cf. render()), pas mémorisé : change tout seul à minuit.
export const WEEKDAY_ANALOG_STYLES = [
  "soleil", // dimanche
  "lune", // lundi
  "mars", // mardi
  "mercure", // mercredi
  "jupiter", // jeudi
  "venus", // vendredi
  "saturne", // samedi
];
