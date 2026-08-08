// Valeurs par défaut et constantes partagées.

export const CARD_TAG = "echo-weather-card";

export const DEFAULT_ICON_BASE_URL =
  "https://cdn.jsdelivr.net/npm/@meteocons/svg/fill";

// Bitmask WeatherEntityFeature (home-assistant/core: components/weather/const.py)
export const FEATURE_FORECAST_DAILY = 1;
export const FEATURE_FORECAST_HOURLY = 2;
export const FEATURE_FORECAST_TWICE_DAILY = 4;

export const DEFAULT_CONFIG = {
  hourly_count: 6,
  daily_count: 4,
  language: null,
  time_format: null,
  icons: {
    provider: "meteocons",
    style: "fill",
    base_url: null,
    // Les icônes de prévisions (horaires/quotidiennes) sont toujours
    // figées (animation retirée) pour préserver le FPS. L'icône météo
    // actuelle reste animée par défaut ; à mettre à false si l'appareil
    // peine à suivre même une seule icône animée.
    animate_current: true,
  },
  show_current: true,
  show_hourly: true,
  show_daily: true,
  show_feels_like: true,
  show_precipitation_probability: true,
  show_humidity: true,
  show_dew_point: true,
  dew_point_entity: null,
  show_clock: true,
  show_date: true,
  show_last_updated: true,
  show_wind: true,
  show_sun: true,
  sun_entity: null,
  show_moon: true,
  moon_entity: null,
  uv_entity: null,
  air_quality_entity: null,
  title: null,
  background: null,
  // "auto" (par défaut) : fond + couleurs clair le jour, sombre la nuit,
  // d'après le soleil (sun_entity). "light"/"dark" forcent un mode fixe.
  theme_mode: "auto",
  // null (par défaut) : mise en page actuelle/horaire/quotidienne empilée,
  // pensée pour un écran large (Echo Show). "round" : mise en page compacte
  // pour petit écran circulaire (Echo Spot 1ère gen, 480x480) — horloge +
  // météo actuelle + deux tuiles "Aujourd'hui"/"Semaine" qui ouvrent le
  // détail au tap plutôt que d'essayer de tout afficher à la fois.
  layout: null,
  // Facteur d'échelle manuel de toute la carte (CSS zoom). 1 = pas de
  // changement. Filet de rattrapage si les tailles fluides ne
  // correspondent pas à l'attendu sur un appareil donné (WebView non
  // standard, densité d'écran particulière...) — ex: 1.3 pour agrandir
  // 30%, 0.85 pour réduire. À ajuster à l'œil sur l'appareil réel.
  zoom: 1,
};
