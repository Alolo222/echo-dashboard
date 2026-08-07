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

export function formatWeekday(date, locale) {
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
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
