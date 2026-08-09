// Formatage durée/temps de lecture — indépendant de format.js
// d'echo-home-card (qui formate une heure d'horloge localisée), ici on
// formate une position/durée en secondes façon lecteur média (m:ss,
// jamais localisé : "1:27" se lit pareil dans toutes les langues,
// contrairement à une heure du jour).

// "1:27", "12:04", ou "1:02:03" au-delà d'une heure. Arrondi à la
// seconde inférieure (comme la plupart des lecteurs) plutôt qu'au plus
// proche, pour ne jamais afficher la durée totale avant la toute
// dernière seconde réellement écoulée.
export function formatDuration(totalSeconds) {
  if (totalSeconds == null || !Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "–:––";
  }
  const s = Math.floor(totalSeconds);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}

// Petite heure d'horloge en coin (mise en page large, show_clock) —
// reprend le formatage utilisé par echo-home-card (Intl.DateTimeFormat,
// pas de secondes) plutôt que d'en dépendre directement : les deux
// cartes n'ont pas de dépendance croisée, chacune embarque son propre
// utilitaire minimal.
export function formatClockTime(date, locale, timeFormat) {
  const hour12 = timeFormat === "12";
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      hour12,
    }).format(date);
  } catch {
    // Locale invalide/non reconnue par le moteur JS (ex: valeur
    // saisie à la main dans `language`) — repli sur une locale neutre
    // plutôt que de faire planter le rendu.
    return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit", hour12 }).format(
      date
    );
  }
}

// Position de lecture "live" à partir des attributs media_player —
// media_position n'est mis à jour par l'intégration qu'à chaque
// changement d'état (pas en continu), donc on extrapole depuis
// media_position_updated_at pendant la lecture pour que la barre/l'anneau
// avance entre deux mises à jour réelles plutôt que de rester figée
// jusqu'au prochain événement HA.
export function currentPosition(stateObj) {
  const attrs = stateObj?.attributes || {};
  if (attrs.media_position == null) return null;
  let pos = attrs.media_position;
  if (stateObj.state === "playing" && attrs.media_position_updated_at) {
    const updatedAt = new Date(attrs.media_position_updated_at).getTime();
    if (!Number.isNaN(updatedAt)) {
      pos += Math.max(0, (Date.now() - updatedAt) / 1000);
    }
  }
  if (attrs.media_duration != null) {
    pos = Math.min(pos, attrs.media_duration);
  }
  return Math.max(0, pos);
}
