// Valeurs par défaut et constantes partagées.

export const CARD_TAG = "echo-player-card";

// Sous-ensemble des bits de `media_player.supported_features` utiles ici
// (cf. home-assistant/core, MediaPlayerEntityFeature) — sert à n'afficher
// que les contrôles réellement pris en charge par l'intégration derrière
// `media_player_entity` (Sonos, Spotify, Cast... n'exposent pas toutes le
// même sous-ensemble), plutôt que deviner depuis la présence d'un
// attribut. Seuls les bits dont la carte se sert sont repris ici, pas le
// jeu complet de l'enum HA.
export const FEATURE = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  PLAY: 16384,
  SHUFFLE_SET: 32768,
  REPEAT_SET: 262144,
  GROUPING: 524288,
};

export const DEFAULT_CONFIG = {
  // --- Entités (seule media_player_entity a un sens sans elle — la
  // carte affiche alors un état "aucune lecture" plutôt que de planter) ---
  media_player_entity: null,
  satellite_entity: null, // entité View Assist du satellite — lit
  // attributes.mode ("night" => mode nuit, cf. echo-home-card) ; pas de
  // fond dynamique ici (contrairement à echo-home-card), la pochette du
  // morceau en cours en tient déjà lieu.

  // --- Navigation (fiche d'attente uniquement — pas d'attribut HA
  // générique pour une file de lecture, contrairement à source_list/
  // group_members qui sont standard : cf. README) ---
  dashboard: null, // base du chemin de dashboard, ex: "dashboard-view-assist"
  // — tant que non renseigné, la puce "File d'attente" ne s'affiche pas
  queue_view: "player-queue", // ajouté à `dashboard` -> "${dashboard}/${queue_view}"
  navigate_device: null, // id passé en `device` au service view_assist.navigate
  // — sinon satellite_entity

  // --- Regroupement multi-pièces (media_player.join/unjoin) ---
  // Liste explicite des autres media_player proposés au regroupement —
  // HA n'expose aucun moyen générique de découvrir "les enceintes
  // regroupables avec celle-ci", donc pas d'auto-détection possible.
  // Sans cette liste, la puce "Groupe" reste masquée même si
  // l'intégration supporte le regroupement (FEATURE.GROUPING).
  group_entities: [],

  // --- Éléments affichés (masquables même si l'intégration les
  // supporte — show_* ne les fait jamais apparaître si le bit
  // FEATURE correspondant est absent) ---
  show_shuffle: true,
  show_repeat: true,
  show_volume: true,
  show_source: true,
  show_group: true,
  show_queue: true,
  show_clock: true, // petite heure en coin (mise en page large uniquement)

  // --- Localisation ---
  language: null, // ex: "fr" — sinon hérite de hass.locale
  time_format: null, // "12" ou "24" — sinon hérite de hass.locale

  // --- Mise en page ---
  layout: null, // null (large, Echo Show) ou "round" (Echo Spot, écran
  // circulaire) — cf. echo-home-card, même convention

  // --- Apparence ---
  zoom: 1, // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
};
