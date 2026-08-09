// Valeurs par défaut et constantes partagées.

export const CARD_TAG = "echo-home-card";

// Racine du CDN Meteocons, sans le style — icons.js y ajoute icons.style
// (fill/line/flat/monochrome) ou icons.base_url en entier si fourni.
export const DEFAULT_ICON_BASE_URL = "https://cdn.jsdelivr.net/npm/@meteocons/svg";

export const DEFAULT_CONFIG = {
  // --- Entités (aucune n'est requise — la carte fonctionne comme simple
  // horloge sans rien configurer du tout) ---
  satellite_entity: null, // entité View Assist du satellite (attributs
  // `mode` — "night" bascule le mode nuit — et `background`, l'URL de
  // fond dynamique choisie côté View Assist)
  weather_entity: null, // bloc météo compact (icône + température) ; le
  // bloc est simplement absent si non renseignée
  sun_entity: null, // sinon sun.sun — sert uniquement à choisir la bonne
  // variante jour/nuit de l'icône météo (ex: partiellement nuageux)

  // --- Navigation (bloc météo cliquable, via le service view_assist.navigate) ---
  dashboard: null, // base du chemin de dashboard, ex: "dashboard-view-assist"
  // — tant que non renseigné, le bloc météo n'est pas cliquable
  weather_view: "weather", // ajouté à `dashboard` -> "${dashboard}/${weather_view}"
  navigate_device: null, // id passé en `device` au service — sinon satellite_entity

  // --- Éléments affichés ---
  show_clock: true,
  show_date: true,
  show_weather: true,

  // --- Localisation ---
  language: null, // ex: "fr" — sinon hérite de hass.locale
  time_format: null, // "12" ou "24" — sinon hérite de hass.locale

  // --- Icônes (mêmes options que echo-weather-card) ---
  icons: {
    provider: "meteocons",
    style: "fill",
    base_url: null,
  },

  // --- Apparence ---
  background: null, // override CSS `background` complet pour le mode
  // DIGITAL uniquement (couleur unie, dégradé, transparent...) —
  // prioritaire sur l'image dynamique du satellite et sur le voile par
  // défaut. Sans effet en mode analogique (cf. analog_background
  // ci-dessous) : les deux présentations ont leur propre fond, réglable
  // indépendamment, par défaut le digital garde le fond dynamique du
  // satellite (des arrière-plans, comme la vue View Assist d'origine).
  layout: null, // null (paysage, Echo Show) ou "round" (écran circulaire,
  // Echo Spot 1ère gen 2017, 480x480)
  clock_face: "digital", // "digital" ou "analog" — uniquement en mode
  // round (l'Echo Spot d'origine avait une horloge analogique). Sert
  // juste de valeur de départ : le petit bouton affiché en mode round
  // bascule l'affichage et retient le choix (localStorage) au-delà de
  // cette valeur de config.
  analog_style: "aurore", // habillage du cadran analogique — "aurore"
  // (défaut, dégradé turquoise/bleu/violet), "mono", "clair", "neon" ou
  // "ardoise" (cf. src/analog-styles.js). Contrairement à clock_face, ce
  // n'est qu'un réglage YAML : pas de bouton pour en changer à l'écran,
  // pas de mémorisation localStorage — un seul style choisi une fois.
  analog_background: null, // override CSS `background` complet pour le
  // mode ANALOGIQUE uniquement — sinon le dégradé par défaut du style
  // choisi (analog_style). Jamais de fond dynamique du satellite ici
  // (l'écran analogique n'affiche pas de photo, cf. README) ; comme
  // `background`, sans effet la nuit (le mode nuit retombe toujours sur
  // son traitement habituel). --echo-home-analog-background (variable
  // CSS, via card_mod) garde la priorité si les deux sont définis.
  zoom: 1, // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
};
