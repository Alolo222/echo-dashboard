// Formatage localisé via Intl.DateTimeFormat — aucune liste de jours/heures
// codée en dur, tout dépend de la locale demandée.

export function formatHour(date, locale, timeFormat) {
  const formatted = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    hour12: timeFormat === "12",
  }).format(date);
  // Intl insère parfois une fine espace insécable ("14 h") ; on la retire
  // pour un rendu compact adapté à un petit écran ("14h").
  return formatted.replace(/\s/g, "");
}

export function formatTime(date, locale, timeFormat) {
  const formatted = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: timeFormat === "12",
  }).format(date);
  return formatted.replace(/\s/g, "");
}

export function formatWeekday(date, locale) {
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
}

export function formatDate(date, locale) {
  const formatted = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Traduit une condition météo HA (ex: "partlycloudy") via les traductions
 * du frontend Home Assistant, avec repli sur la valeur brute si absente.
 */
export function localizeCondition(hass, condition) {
  const translated = hass.localize(
    `component.weather.entity_component._.state.${condition}`
  );
  return translated || condition;
}

// Catégorie qualitative de l'indice UV — échelle standard (OMS/Météo-France),
// universelle contrairement à la qualité de l'air (dont l'échelle dépend de
// l'intégration/du capteur choisi par l'utilisateur, donc non déductible ici).
export function uvCategory(value) {
  const v = Number(value);
  if (!Number.isFinite(v)) return null;
  if (v < 3) return "Faible";
  if (v < 6) return "Modéré";
  if (v < 8) return "Élevé";
  if (v < 11) return "Très élevé";
  return "Extrême";
}
