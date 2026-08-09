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
  //
  // background (mode DIGITAL) et analog_background (mode ANALOGIQUE)
  // acceptent chacun un objet {type, ...} — deux réglages indépendants,
  // chaque présentation garde son propre fond (cf. src/background.js
  // pour l'implémentation). Types disponibles :
  //   - "satellite" (défaut en digital) : fond dynamique de
  //     satellite_entity.attributes.background, comme la vue View
  //     Assist d'origine.
  //   - "style" (défaut en analogique) : dégradé par défaut du style
  //     choisi (analog_style) — pas de sens en digital, ignoré là.
  //   - "css" : { type: "css", value: "..." } — n'importe quelle valeur
  //     CSS `background` (couleur unie, dégradé, transparent...). Une
  //     chaîne brute (ex: background: "#1a1a1a") reste acceptée comme
  //     raccourci équivalent.
  //   - "url" : { type: "url", url: "https://..." } (une image) ou
  //     { type: "url", urls: [...] } (plusieurs, tournent en diaporama)
  //     — indépendant de satellite_entity. fit ("cover"/"contain"/
  //     "fill", défaut "cover") et interval (secondes entre deux
  //     images, défaut 300) optionnels.
  //   - "media_folder" : { type: "media_folder", path: "media-source://..." }
  //     — dossier local HA (Media Source), parcouru automatiquement ;
  //     mêmes fit/interval que "url".
  // Jamais de fond dynamique/photo (satellite/url/media_folder) en mode
  // round pour analog_background : l'écran à part sur fond uni
  // reproduit volontairement l'Echo Spot d'origine (cf. README) —
  // retombe sur "style" si configuré quand même.
  background: null,
  analog_background: null,
  analog_background_photo: false, // ANCIEN réglage (1.3.0), toujours
  // supporté : équivaut à analog_background: { type: "satellite" },
  // mais seulement si analog_background lui-même n'est pas défini (la
  // forme objet, plus précise, prime toujours si les deux sont présents).
  layout: null, // null (paysage, Echo Show) ou "round" (écran circulaire,
  // Echo Spot 1ère gen 2017, 480x480)
  clock_face: "digital", // "digital" ou "analog" — disponible dans les
  // deux mises en page (round : cadran plein écran ; large : cadran à
  // droite, météo/date à gauche). Sert juste de valeur de départ : le
  // petit bouton affiché à l'écran bascule l'affichage et retient le
  // choix (localStorage) au-delà de cette valeur de config.
  analog_style: "aurore", // habillage du cadran analogique — "aurore"
  // (défaut, dégradé turquoise/bleu/violet), "mono", "clair", "neon" ou
  // "ardoise" (cf. src/analog-styles.js). Contrairement à clock_face, ce
  // n'est qu'un réglage YAML : pas de bouton pour en changer à l'écran,
  // pas de mémorisation localStorage — un seul style choisi une fois.
  // Ignoré si analog_background a un type dynamique (satellite/url/
  // media_folder) : retombe sur "aurore", blanc, lisible sur n'importe
  // quelle photo (les couleurs d'un style donné ne le sont pas forcément).
  zoom: 1, // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
};
