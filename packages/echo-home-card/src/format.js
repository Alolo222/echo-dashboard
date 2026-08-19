// Formatage localisé via Intl.DateTimeFormat — aucune liste de jours/heures
// codée en dur, tout dépend de la locale demandée.

export function formatTime(date, locale, timeFormat) {
  const formatted = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: timeFormat === "12",
  }).format(date);
  // Intl insère parfois une fine espace insécable ("14 h 32") ; on la
  // retire pour un rendu compact adapté à un petit écran ("14:32").
  return formatted.replace(/\s/g, "");
}

// Jour abrégé + date courte, ex: "lun. 8 août" — assez compact pour tenir
// sous l'horloge géante sans lui faire concurrence.
export function formatShortDate(date, locale) {
  const formatted = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Traduit une condition météo HA (ex: "partlycloudy") via les traductions
 * du frontend Home Assistant, avec repli sur la valeur brute si absente —
 * utilisé uniquement comme aria-label sur le bloc météo (l'icône seule
 * n'est pas explicite pour un lecteur d'écran).
 */
export function localizeCondition(hass, condition) {
  const translated = hass.localize(
    `component.weather.entity_component._.state.${condition}`
  );
  return translated || condition;
}
