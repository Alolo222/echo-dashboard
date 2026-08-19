// Déclinaisons visuelles du cadran analogique (mode round uniquement),
// choisies via la config `analog_style`. Même structure de base à chaque
// fois (graduations éventuelles, chiffres éventuels, aiguilles
// heure/minute/seconde, seconde qui tourne en continu) — seuls les
// couleurs, épaisseurs, présences et parfois la forme des aiguilles
// changent d'un style à l'autre. Le mode nuit ignore ces couleurs et
// repasse tout en rouge très atténué (cf. règles `:host(.night)
// .analog-clock .hand` etc. dans static styles, echo-home-card.js) — la
// sobriété nocturne prime toujours sur le style choisi, SAUF pour les
// styles qui définissent leur propre `night` (cf. plus bas et
// _resolveNightStyle dans echo-home-card.js).
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
    // "Aurore Boréale" : une teinte différente par aiguille (façon bandes
    // d'aurore) plutôt qu'une seule couleur, aucune graduation (le ciel
    // n'a pas de repères) — un vrai style de nuit à part entière, pas un
    // recolorage de la version de jour (cf. schéma "concept" dans
    // _resolveNightStyle, echo-home-card.js).
    night: {
      background: "radial-gradient(120% 100% at 50% 15%, #0d2b28 0%, #071a2e 45%, #030712 100%)",
      glow: true,
      ticks: null,
      numerals: null,
      hour: { len: 23, color: "#2ee6c8", width: 4, cap: "round" },
      minute: { len: 35, color: "#5ee6a0", width: 2.6, cap: "round" },
      second: {
        len: 42,
        tail: 8,
        color: "#b06bff",
        width: 1,
        cap: "round",
        opacity: 0.9,
        tipDot: { r: 1.3, fill: "#b06bff" },
      },
      center: { r: 2, color: "#2ee6c8", ring: { r: 3.4, width: 1, color: "#b06bff" } },
      comp: { color: "#8ff5e0", opacity: 0.75 },
    },
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
    // Fond légèrement éclairci (#3a4750 -> #4a5a66, luminosité 0.06 ->
    // 0.10) — jugé trop sombre à l'usage.
    background: "radial-gradient(140% 100% at 50% 100%, rgba(0, 0, 0, 0.28), transparent 60%), #4a5a66",
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
    // La nuit, bascule sur "carbone" affiché tel quel (pas recoloré) —
    // les deux styles partagent déjà l'esprit géométrique/technique,
    // cf. { swap } dans _resolveNightStyle (echo-home-card.js).
    night: { swap: "carbone" },
  },

  // --- Styles libres ---------------------------------------------------
  // Palette libre, sans thème imposé — contrairement à une première
  // tentative "planétaire" (un par jour sur le nom latin du jour
  // français) jugée trop démonstrative. Sept d'entre eux (aurore/
  // ardoise ci-dessus, et corail/grenat/prisme/atlas/soleil ci-dessous)
  // sont calés un par jour de la semaine via `analog_style: "auto"` (cf.
  // WEEKDAY_ANALOG_STYLES plus bas) ; "carbone" ne sert que de nuit à
  // "ardoise", mais reste sélectionnable seul comme les autres.
  //
  // Trois formes de nuit possibles (cf. _resolveNightStyle,
  // echo-home-card.js) :
  // - `night: { background, color }` — recolorage simple et atténué (une
  //   seule teinte), comme l'ancien traitement uniforme mais propre au
  //   style (ex: "soleil").
  // - `night: { swap: "autreStyle" }` — bascule sur un AUTRE style
  //   affiché tel quel, à pleine intensité (ex: "ardoise" -> "carbone").
  // - `night: { ...palette complète... }` — un concept de nuit à part
  //   entière (fond/graduations/aiguilles propres), pas dérivé du style
  //   de jour (ex: "aurore", "corail", "atlas").
  // Sans `night` du tout (mono/clair/neon ci-dessus) : traitement nuit
  // uniforme d'origine (fond bleu marine fixe, aiguilles rouge très
  // atténué).

  corail: {
    label: "Corail",
    description:
      "Récif profond : dégradé sarcelle vers turquoise, trotteuse corail vif, graduations sur les heures non cardinales.",
    // Bright end assombri (#1fa398 -> #0f5f57) + trotteuse éclaircie
    // (#ff7a59 -> #ffab8f) : contraste mesuré < 1.3:1 avant correction
    // sur la zone la plus claire du dégradé, > 4:1 partout après.
    background: "linear-gradient(160deg, #0d3b3a 0%, #146b64 50%, #0f5f57 100%)",
    // mode "minor" plutôt que "all" : les 4 points cardinaux se
    // superposaient aux chiffres "12/3/6/9" (même rayon) — laissés aux
    // chiffres, comme "aurore".
    ticks: { shape: "dot", mode: "minor", radius: 44, minorR: 0.9, minorOpacity: 0.35, color: "#ffffff" },
    numerals: { mode: "quad", radius: 41, size: 11, weight: 300, opacity: 0.9, color: "#ffffff" },
    hour: { len: 23, color: "#ffffff", width: 4, cap: "round" },
    minute: { len: 35, color: "#ffffff", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#ffab8f",
      width: 1,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.3, fill: "#ffab8f" },
    },
    center: { r: 1.8, color: "#ffffff", ring: { r: 3.2, width: 1, color: "#ffab8f" } },
    comp: { color: "#ffffff", opacity: 0.7 },
    // "Bioluminescence" : 12 points de taille ET luminosité irrégulières
    // (radii/opacities) — des organismes de tailles différentes qui
    // s'allument plus ou moins fort, pas une couronne uniforme.
    night: {
      background: "radial-gradient(120% 100% at 50% 100%, #04211f 0%, #010a09 70%)",
      glow: true,
      ticks: {
        shape: "dot",
        mode: "all",
        radius: 44,
        radii: [1.8, 0.6, 1.2, 2.4, 0.8, 1.6, 0.5, 2.0, 1.0, 1.8, 0.7, 1.4],
        opacities: [0.7, 0.3, 0.5, 0.85, 0.35, 0.6, 0.25, 0.75, 0.4, 0.65, 0.3, 0.55],
        color: "#7dffcf",
      },
      numerals: null,
      hour: { len: 23, color: "#ff9f80", width: 4, cap: "round" },
      minute: { len: 35, color: "#ff9f80", width: 2.6, cap: "round" },
      second: {
        len: 42,
        tail: 8,
        color: "#7dffcf",
        width: 1,
        cap: "round",
        opacity: 0.95,
        tipDot: { r: 1.4, fill: "#7dffcf" },
      },
      center: { r: 1.8, color: "#ff9f80", ring: { r: 3.2, width: 1, color: "#7dffcf" } },
      comp: { color: "#7dffcf", opacity: 0.7 },
    },
  },

  grenat: {
    label: "Grenat",
    description:
      "Ton bijou : bordeaux vif, graduations en petits diamants facettés, aiguilles blush, accent or.",
    // Fond remonté 2 fois (luminosité 0.013/0.029/0.055 -> 0.07/0.10/0.15)
    // — jugé trop sombre à chaque étape précédente. Pas de chiffres :
    // ils se superposaient aux graduations diamant (même rayon) — corail
    // garde les siens, grenat s'en distingue justement par leur absence.
    background: "linear-gradient(150deg, #8a2340 0%, #a52a4a 50%, #c23a63 100%)",
    // Graduations en petits diamants (pierre facettée, cf. shape
    // "diamond" dans _renderTicks) plutôt que des points ronds : corail
    // et grenat se confondaient trop sinon, mêmes graduations/chiffres/
    // aiguilles, juste une teinte différente. Ton très sombre : un ton
    // clair ne se détache plus sur ce fond éclairci.
    ticks: {
      shape: "diamond",
      mode: "all",
      radius: 44,
      minorR: 1.2,
      minorOpacity: 0.5,
      cardinalR: 2.4,
      cardinalOpacity: 0.8,
      color: "#1a0308",
    },
    numerals: null,
    hour: { len: 24, color: "#fbeef0", width: 4, cap: "round" },
    minute: { len: 36, color: "#fbeef0", width: 2.6, cap: "round" },
    second: { len: 42, tail: 8, color: "#e8b84a", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#fbeef0", ring: { r: 3.4, width: 1, color: "#e8b84a" } },
    comp: { color: "#fbeef0", opacity: 0.75 },
    // La nuit, bascule sur "mono" affiché tel quel — sobre, sans
    // ornement, en contraste avec le jour très coloré.
    night: { swap: "mono" },
  },

  prisme: {
    label: "Prisme",
    description:
      "Fond neutre clair, une couleur par aiguille — bleu, violet, rose — sans graduation ni chiffre.",
    // Fond légèrement assombri (#f4f5f7 -> #e8eaee) + les 3 teintes
    // approfondies (bleu/violet/rose) : les 3 étaient sous 4:1 sur le
    // fond d'origine, la rose à 2.93:1 seulement.
    background: "#e8eaee",
    ticks: { shape: "dot", mode: "cardinal", radius: 44, cardinalR: 1.3, cardinalOpacity: 0.4, color: "#8a8f99" },
    numerals: null,
    hour: { len: 24, color: "#2f5bc4", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#7c3aed", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#c2185b", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#20232a" },
    comp: { color: "#20232a", opacity: 0.6, iconFilter: "brightness(0)" },
    // La nuit, bascule sur "neon" affiché tel quel — la ville s'allume.
    night: { swap: "neon" },
  },

  atlas: {
    label: "Atlas",
    description:
      "Horloge ancienne : fond sépia chaud, 12 chiffres romains en serif, aiguilles en lame effilée, trotteuse en lollipop.",
    // Restylé façon horloge ancienne : les 12 chiffres romains (police
    // serif) servent de repère, plus besoin de graduations à part — et
    // "IIII" plutôt que "IV" à 4h, convention d'horlogerie traditionnelle
    // (symétrie visuelle avec "VIII"). Aiguilles en lame effilée (shape
    // "leaf") plutôt qu'un simple trait, pour l'esprit antique. Trotteuse
    // en "lollipop" (petit disque en pointe, tipDot) plutôt qu'un simple
    // trait — trotteuse classique d'horlogerie ancienne.
    background: "linear-gradient(160deg, #e0d0a8 0%, #c8a878 55%, #a68554 100%)",
    shape: "leaf",
    ticks: null,
    numerals: {
      mode: "all",
      radius: 41,
      size: 10.5,
      weight: 500,
      opacity: 0.9,
      color: "#2a1c10",
      fontFamily: "Georgia, 'Times New Roman', serif",
    },
    hour: { len: 24, color: "#2a1c10", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#2a1c10", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 10,
      color: "#5c2a12",
      width: 0.9,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.6, fill: "#5c2a12" },
    },
    center: { r: 2.2, color: "#2a1c10" },
    comp: { color: "#2a1c10", opacity: 0.65, iconFilter: "brightness(0)" },
    // "Chandelle" : lame effilée adoucie (galbe réduit, cf. shape
    // "leaf"). Graduations à opacité irrégulière, comme une flamme qui
    // n'éclaire jamais le tour du cadran de façon égale.
    night: {
      background: "radial-gradient(60% 60% at 50% 55%, #3a1508 0%, #1a0a06 45%, #0a0403 100%)",
      glow: true,
      shape: "leaf",
      ticks: {
        shape: "dot",
        mode: "all",
        radius: 44,
        minorR: 1.2,
        cardinalR: 1.2,
        opacities: [0.75, 0.15, 0.5, 0.9, 0.25, 0.6, 0.4, 0.15, 0.8, 0.3, 0.55, 0.2],
        color: "#e0a84a",
      },
      numerals: null,
      hour: { len: 24, color: "#f0b860", width: 4, cap: "round" },
      minute: { len: 36, color: "#f0b860", width: 2.6, cap: "round" },
      second: { len: 42, tail: 8, color: "#ff3d6e", width: 1, cap: "round", opacity: 0.9 },
      center: { r: 2, color: "#f0b860", ring: { r: 3.4, width: 1, color: "#ff3d6e" } },
      comp: { color: "#f0b860", opacity: 0.7 },
    },
  },

  carbone: {
    label: "Carbone",
    description:
      "Noir profond, aiguilles rectangulaires façon chronographe, accent cyan électrique — surtout utilisé comme nuit d'ardoise.",
    background: "radial-gradient(120% 100% at 50% 0%, #1a2028 0%, #0a0d12 70%)",
    shape: "rect",
    ticks: { shape: "dot", mode: "all", radius: 44, minorR: 1, minorOpacity: 0.3, cardinalR: 1.6, cardinalOpacity: 0.6, color: "#b8c4d4" },
    numerals: null,
    hour: { w: 5, len: 25, color: "#b8c4d4" },
    minute: { w: 3, len: 37, color: "#b8c4d4" },
    second: { w: 1.2, len: 43, tail: 8, color: "#2dd4ff" },
    center: { size: 4, color: "#2dd4ff" },
    comp: { color: "#b8c4d4", opacity: 0.6 },
  },

  soleil: {
    label: "Soleil",
    description:
      "Rayonnant et chaud : dégradé orange/jaune façon lever de soleil, rayons alternés longs/courts façon icône soleil, halo activé.",
    background: "linear-gradient(160deg, #ffb545 0%, #ff8a3d 55%, #ff5e3a 100%)",
    glow: true,
    // Rayons alternés longs/courts (façon icône soleil) plutôt qu'une
    // couronne régulière de même longueur : les 4 cardinaux s'étirent
    // presque jusqu'au centre et sont plus opaques, les 8 autres restent
    // courts et discrets.
    ticks: {
      shape: "line",
      mode: "all",
      y2: 9,
      width: 1.2,
      color: "#fff6e0",
      y1s: [2, 7, 7, 2, 7, 7, 2, 7, 7, 2, 7, 7],
      opacities: [0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6],
    },
    numerals: null,
    hour: { len: 23, color: "#fff6e0", width: 4.5, cap: "round" },
    minute: { len: 35, color: "#fff6e0", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#c81d1d", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2.2, color: "#fff6e0" },
    comp: { color: "#fff6e0", opacity: 0.85 },
    // Le soleil est couché la nuit : bascule sur un indigo profond plutôt
    // que de garder le fond orange/jaune. Braises ambrées éclaircies
    // (#8a5a2e -> #ffb84d, 3.27:1 -> 11.16:1 mesuré) pour rester dans le
    // même registre "vibrant" que les autres nuits plutôt que rester en
    // retrait.
    night: { background: "#0a0e1e", color: "#ffb84d" },
  },
};

// Résolution de `analog_style: "auto"` — un style par jour de la
// semaine, indexé comme Date.getDay() (0 = dimanche ... 6 = samedi).
// Recalculé à chaque rendu (cf. render()), pas mémorisé : change tout
// seul à minuit.
export const WEEKDAY_ANALOG_STYLES = [
  "soleil", // dimanche
  "aurore", // lundi
  "ardoise", // mardi
  "corail", // mercredi
  "grenat", // jeudi
  "prisme", // vendredi
  "atlas", // samedi
];
