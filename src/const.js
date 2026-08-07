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
  },
  show_current: true,
  show_hourly: true,
  show_daily: true,
  show_feels_like: true,
  show_precipitation_probability: true,
  show_humidity: true,
  show_dew_point: true,
  show_clock: true,
  show_date: true,
  show_last_updated: true,
  show_wind: true,
  show_sun: true,
  sun_entity: null,
  uv_entity: null,
  air_quality_entity: null,
  title: null,
  background: "transparent",
};
