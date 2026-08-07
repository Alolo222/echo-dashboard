// Mapping condition météo Home Assistant -> slug Meteocons, et résolution
// de l'URL de l'icône. Isolé ici pour rester facile à modifier/étendre
// (autre provider, autre style, base_url locale...).

import { DEFAULT_ICON_BASE_URL } from "./const.js";

const CONDITION_TO_ICON = {
  "clear-night": "clear-night",
  cloudy: "cloudy",
  exceptional: "not-available",
  fog: "fog",
  hail: "hail",
  lightning: "thunderstorms",
  "lightning-rainy": "thunderstorms-rain",
  pouring: "extreme-rain",
  rainy: "rain",
  snowy: "snow",
  "snowy-rainy": "sleet",
  sunny: "clear-day",
  windy: "wind",
  "windy-variant": "wind",
};

/**
 * Résout le slug Meteocons pour une condition HA donnée.
 * `partlycloudy` (et par sécurité `sunny`/`clear-night`) sont sensibles au
 * jour/nuit, d'où le paramètre isNight.
 */
export function conditionToIconSlug(condition, isNight) {
  if (condition === "partlycloudy") {
    return isNight ? "partly-cloudy-night" : "partly-cloudy-day";
  }
  if (condition === "sunny" && isNight) {
    return "clear-night";
  }
  return CONDITION_TO_ICON[condition] || "not-available";
}

/**
 * Construit l'URL de l'icône. Centralise la logique CDN vs base_url locale
 * (ex: /local/meteocons) pour préparer un mode offline.
 */
export function iconUrl(slug, iconsConfig) {
  const base = iconsConfig?.base_url || DEFAULT_ICON_BASE_URL;
  return `${base.replace(/\/$/, "")}/${slug}.svg`;
}
