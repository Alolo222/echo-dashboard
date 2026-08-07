import { LitElement, html, css, nothing } from "lit";
import { CARD_TAG, DEFAULT_CONFIG } from "./const.js";
import { conditionToIconSlug, iconUrl } from "./icons.js";
import { formatHour, formatWeekday, localizeCondition } from "./format.js";
import { subscribeForecasts } from "./forecast.js";

class EchoWeatherCard extends LitElement {
  static properties = {
    _config: { state: true },
    _hourly: { state: true },
    _daily: { state: true },
  };

  setConfig(config) {
    if (!config?.entity) {
      throw new Error("echo-weather-card: 'entity' est requis");
    }
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
      icons: { ...DEFAULT_CONFIG.icons, ...(config.icons || {}) },
    };
  }

  static getStubConfig(hass) {
    const weatherEntity = Object.keys(hass.states).find((id) =>
      id.startsWith("weather.")
    );
    return { entity: weatherEntity || "weather.home" };
  }

  getCardSize() {
    return 4;
  }

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width || 0;
      this.classList.toggle("portrait", width > 0 && width < 480);
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._unsubscribeForecasts?.();
    this._unsubscribeForecasts = undefined;
    this._subscribedEntity = undefined;
  }

  set hass(hass) {
    const previousStateObj = this._hass?.states[this._config?.entity];
    this._hass = hass;
    if (!this._config) return;

    const stateObj = hass.states[this._config.entity];
    if (stateObj && this._subscribedEntity !== this._config.entity) {
      this._subscribeToForecasts();
    }
    if (previousStateObj !== stateObj) {
      this.requestUpdate();
    }
  }

  get hass() {
    return this._hass;
  }

  _subscribeToForecasts() {
    this._unsubscribeForecasts?.();
    this._subscribedEntity = this._config.entity;
    this._hourly = undefined;
    this._daily = undefined;
    this._unsubscribeForecasts = subscribeForecasts(
      this._hass,
      this._config.entity,
      (type, forecast) => {
        if (type === "hourly") this._hourly = forecast;
        if (type === "daily") this._daily = forecast;
      }
    );
  }

  _isNight(date) {
    if (!date) {
      return this._hass.states["sun.sun"]?.state === "below_horizon";
    }
    // Pas de lever/coucher précis par prévision : heuristique horaire simple.
    const hour = date.getHours();
    return hour < 7 || hour >= 21;
  }

  render() {
    if (!this._config || !this._hass) return nothing;

    const stateObj = this._hass.states[this._config.entity];
    if (!stateObj) {
      return html`<div class="error">
        Entité ${this._config.entity} introuvable
      </div>`;
    }

    const locale =
      this._config.language || this._hass.locale?.language || "en";
    const timeFormat =
      this._config.time_format || this._hass.locale?.time_format || "24";

    return html`
      <div class="card" style="background:${this._config.background}">
        ${this._config.title
          ? html`<div class="title">${this._config.title}</div>`
          : nothing}
        ${this._config.show_current
          ? this._renderCurrent(stateObj)
          : nothing}
        ${this._config.show_hourly
          ? this._renderHourly(locale, timeFormat)
          : nothing}
        ${this._config.show_daily ? this._renderDaily(locale) : nothing}
      </div>
    `;
  }

  _renderCurrent(stateObj) {
    const slug = conditionToIconSlug(stateObj.state, this._isNight());
    const url = iconUrl(slug, this._config.icons);
    const conditionLabel = localizeCondition(this._hass, stateObj.state);
    const temp = stateObj.attributes.temperature;
    const feelsLike = stateObj.attributes.apparent_temperature;

    return html`
      <div class="current">
        <img class="current-icon" src=${url} alt=${conditionLabel} />
        <div class="current-info">
          <div class="current-temp">${Math.round(temp)}°</div>
          <div class="current-condition">${conditionLabel}</div>
          ${this._config.show_feels_like && feelsLike != null
            ? html`<div class="current-feels-like">
                Ressenti ${Math.round(feelsLike)}°
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  _renderHourly(locale, timeFormat) {
    const now = Date.now();
    const items = (this._hourly || [])
      .filter((f) => new Date(f.datetime).getTime() >= now)
      .slice(0, this._config.hourly_count);

    if (!items.length) return nothing;

    return html`
      <div class="hourly">
        ${items.map((forecast) => {
          const date = new Date(forecast.datetime);
          const slug = conditionToIconSlug(
            forecast.condition,
            this._isNight(date)
          );
          const url = iconUrl(slug, this._config.icons);
          const label = localizeCondition(this._hass, forecast.condition);
          const pop = forecast.precipitation_probability;

          return html`
            <div class="hourly-item">
              <div class="hourly-time">
                ${formatHour(date, locale, timeFormat)}
              </div>
              <img class="hourly-icon" src=${url} alt=${label} />
              <div class="hourly-temp">
                ${Math.round(forecast.temperature)}°
              </div>
              ${this._config.show_precipitation_probability && pop > 0
                ? html`<div class="hourly-pop">${pop}%</div>`
                : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  _renderDaily(locale) {
    const items = (this._daily || []).slice(0, this._config.daily_count);
    if (!items.length) return nothing;

    return html`
      <div class="daily">
        ${items.map((forecast) => {
          const date = new Date(forecast.datetime);
          const slug = conditionToIconSlug(forecast.condition, false);
          const url = iconUrl(slug, this._config.icons);
          const label = localizeCondition(this._hass, forecast.condition);

          return html`
            <div class="daily-item">
              <div class="daily-day">${formatWeekday(date, locale)}</div>
              <img class="daily-icon" src=${url} alt=${label} />
              <div class="daily-temps">
                <span class="daily-max"
                  >${Math.round(forecast.temperature)}°</span
                >
                <span class="daily-min"
                  >${Math.round(forecast.templow)}°</span
                >
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  static styles = css`
    /* container-type permet des tailles fluides (clamp + cqw) qui suivent
       la taille réelle du composant plutôt que le viewport — utile dans un
       conteneur View Assist dont la taille n'est pas celle de l'écran. */
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
      container-type: inline-size;
      --_gap: var(--echo-weather-gap, 14px);
      --_icon-size: var(--echo-weather-icon-size, clamp(76px, 11cqw, 108px));
      --_current-temp-size: var(
        --echo-weather-current-temp-size,
        clamp(2.75rem, 7cqw, 4.25rem)
      );
      --_hourly-temp-size: var(
        --echo-weather-hourly-temp-size,
        clamp(1.15rem, 2.4cqw, 1.5rem)
      );
      --_daily-temp-size: var(
        --echo-weather-daily-temp-size,
        clamp(1.05rem, 2.1cqw, 1.3rem)
      );
      --_text-color: var(
        --echo-weather-text-color,
        var(--primary-text-color, #fff)
      );
      --_secondary-color: var(
        --echo-weather-secondary-color,
        var(--secondary-text-color, #b0b0b0)
      );
      --_divider-color: var(--echo-weather-divider-color, rgba(127, 127, 127, 0.2));
      --_tile-background: var(--echo-weather-tile-background, rgba(127, 127, 127, 0.09));
      font-family: var(--echo-weather-font-family, inherit);
      color: var(--_text-color);
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
      padding: var(--_gap);
      gap: var(--_gap);
    }

    .error {
      color: var(--error-color, #f44);
      padding: var(--_gap);
    }

    .title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--_secondary-color);
    }

    /* --- Météo actuelle : ~1/3 supérieur --- */
    .current {
      display: flex;
      align-items: center;
      gap: var(--_gap);
      flex: 1 1 33%;
      padding-bottom: var(--_gap);
      border-bottom: 1px solid var(--_divider-color);
    }
    .current-icon {
      width: var(--_icon-size);
      height: var(--_icon-size);
      flex-shrink: 0;
    }
    .current-temp {
      font-size: var(--_current-temp-size);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.01em;
    }
    .current-condition {
      color: var(--_secondary-color);
      font-size: clamp(1rem, 1.8cqw, 1.25rem);
      font-weight: 500;
      margin-top: 2px;
    }
    .current-feels-like {
      color: var(--_secondary-color);
      font-size: clamp(0.85rem, 1.4cqw, 1rem);
      margin-top: 2px;
    }

    /* --- Prévisions horaires : contenu principal --- */
    .hourly {
      display: flex;
      justify-content: space-between;
      gap: var(--_gap);
      flex: 1 1 auto;
      padding-bottom: var(--_gap);
      border-bottom: 1px solid var(--_divider-color);
    }
    .hourly-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }
    .hourly-time {
      color: var(--_secondary-color);
      font-size: clamp(0.9rem, 1.6cqw, 1.05rem);
      font-weight: 600;
    }
    .hourly-icon {
      width: calc(var(--_icon-size) * 0.56);
      height: calc(var(--_icon-size) * 0.56);
    }
    .hourly-temp {
      font-size: var(--_hourly-temp-size);
      font-weight: 700;
    }
    .hourly-pop {
      color: var(--_secondary-color);
      font-size: clamp(0.75rem, 1.3cqw, 0.9rem);
      font-weight: 600;
    }

    /* --- Prévisions journalières : bande compacte en bas, regroupée en
       tuiles légères pour lire max/min d'un coup d'œil --- */
    .daily {
      display: flex;
      justify-content: space-between;
      gap: var(--_gap);
      flex: 0 0 auto;
    }
    .daily-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex: 1;
      min-width: 0;
      padding: 8px 4px;
      border-radius: 14px;
      background: var(--_tile-background);
    }
    .daily-day {
      color: var(--_secondary-color);
      font-size: clamp(0.9rem, 1.6cqw, 1.05rem);
      font-weight: 600;
      text-transform: capitalize;
    }
    .daily-icon {
      width: calc(var(--_icon-size) * 0.46);
      height: calc(var(--_icon-size) * 0.46);
    }
    .daily-temps {
      font-size: var(--_daily-temp-size);
    }
    .daily-max {
      font-weight: 700;
    }
    .daily-min {
      color: var(--_secondary-color);
      margin-left: 5px;
    }

    /* --- Breakpoint portrait/étroit (posé via ResizeObserver) --- */
    :host(.portrait) .hourly,
    :host(.portrait) .daily {
      flex-wrap: wrap;
    }
    :host(.portrait) .hourly-item,
    :host(.portrait) .daily-item {
      flex: 1 1 30%;
    }
  `;
}

customElements.define(CARD_TAG, EchoWeatherCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: "Echo Weather Card",
  description:
    "Carte météo compacte pour smart displays (Echo Show 5, View Assist).",
});
