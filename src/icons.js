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

// Les SVG Meteocons embarquent leur animation en SMIL (<animateTransform>,
// <animate>...) : ça tourne en continu même chargé en <img>, ce qui
// additionne vite le coût GPU/CPU quand beaucoup d'icônes sont affichées en
// même temps (prévisions horaires + quotidiennes) — visible en FPS qui
// chutent sur du matériel modeste (Echo Show 5). Seule l'icône météo
// actuelle a vraiment besoin de bouger ; celles des prévisions gagnent à
// être figées. On ne peut pas mettre en pause une animation SMIL depuis
// l'extérieur d'un <img> (son contenu est opaque), donc on récupère le SVG,
// on retire ses éléments d'animation, et on ressert le résultat comme image
// statique (URL de Blob) — mise en cache par URL source, un seul fetch par
// icône unique quel que soit le nombre d'occurrences à l'écran.
const _staticIconCache = new Map(); // url -> string (prêt) | Promise<string> (en cours)

async function _stripAnimations(url) {
  const response = await fetch(url);
  const text = await response.text();
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  doc
    .querySelectorAll("animate, animateTransform, animateMotion, animateColor, set")
    .forEach((el) => el.remove());
  const serialized = new XMLSerializer().serializeToString(doc.documentElement);
  return URL.createObjectURL(new Blob([serialized], { type: "image/svg+xml" }));
}

/**
 * Version figée (sans animation) d'une icône, mise en cache par URL.
 * Retourne la version en cache si prête, sinon déclenche sa préparation en
 * arrière-plan et appelle `onReady` une fois disponible (pour déclencher un
 * re-render) — entre-temps l'appelant peut continuer à utiliser l'URL
 * animée d'origine comme repli, le temps d'un fetch.
 */
export function getStaticIconUrl(url, onReady) {
  const cached = _staticIconCache.get(url);
  if (typeof cached === "string") return cached;
  if (!cached) {
    const promise = _stripAnimations(url)
      // Échec (hors-ligne, base_url sans CORS...) : on retombe sur l'icône
      // animée d'origine plutôt que de casser l'affichage.
      .catch(() => url)
      .then((staticUrl) => {
        _staticIconCache.set(url, staticUrl);
        return staticUrl;
      });
    _staticIconCache.set(url, promise);
  }
  Promise.resolve(_staticIconCache.get(url)).then(() => onReady?.());
  return null;
}
