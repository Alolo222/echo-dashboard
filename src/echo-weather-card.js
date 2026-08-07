import { LitElement, html, css, nothing } from "lit";
import { CARD_TAG, DEFAULT_CONFIG } from "./const.js";
import { conditionToIconSlug, iconUrl } from "./icons.js";
import {
  formatHour,
  formatTime,
  formatWeekday,
  localizeCondition,
  uvCategory,
} from "./format.js";
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
    // Horloge : un simple tick à la minute, pas une boucle d'animation —
    // ne redéclenche un rendu que si l'horloge est effectivement affichée.
    this._clockTimer = setInterval(() => {
      if (this._config?.show_clock) this.requestUpdate();
    }, 30000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    clearInterval(this._clockTimer);
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
          ? this._renderCurrent(stateObj, locale, timeFormat)
          : nothing}
        ${this._config.show_hourly
          ? this._renderHourly(locale, timeFormat)
          : nothing}
        ${this._config.show_daily ? this._renderDaily(locale) : nothing}
        ${this._renderBottomBand(stateObj, locale, timeFormat)}
      </div>
    `;
  }

  _renderCurrent(stateObj, locale, timeFormat) {
    const slug = conditionToIconSlug(stateObj.state, this._isNight());
    const url = iconUrl(slug, this._config.icons);
    const conditionLabel = localizeCondition(this._hass, stateObj.state);
    const temp = stateObj.attributes.temperature;
    const feelsLike = stateObj.attributes.apparent_temperature;
    const humidity = stateObj.attributes.humidity;

    const lastUpdated = stateObj.last_updated
      ? new Date(stateObj.last_updated)
      : null;
    const metaParts = [];
    if (this._config.show_feels_like && feelsLike != null) {
      metaParts.push(`Ressenti ${Math.round(feelsLike)}°`);
    }
    if (this._config.show_last_updated && lastUpdated) {
      metaParts.push(`Maj à ${formatTime(lastUpdated, locale, timeFormat)}`);
    }

    const showSide = this._config.show_clock || (this._config.show_humidity && humidity != null);

    return html`
      <div class="current">
        <img class="current-icon" src=${url} alt=${conditionLabel} />
        <div class="current-info">
          <div class="current-temp">${Math.round(temp)}°</div>
          <div class="current-condition">${conditionLabel}</div>
          ${this._renderIndicators()}
          ${metaParts.length
            ? html`<div class="current-meta">${metaParts.join(" · ")}</div>`
            : nothing}
        </div>
        ${showSide
          ? html`
              <div class="current-side">
                ${this._config.show_clock
                  ? html`<div class="clock">
                      ${formatTime(new Date(), locale, timeFormat)}
                    </div>`
                  : nothing}
                ${this._config.show_humidity && humidity != null
                  ? html`
                      <div class="humidity-badge">
                        <ha-icon
                          class="humidity-icon"
                          icon=${"mdi:water-percent"}
                        ></ha-icon>
                        <span>${Math.round(humidity)}%</span>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  // Indice UV + qualité de l'air, côte à côte sous la condition — deux
  // tuiles explicitement étiquetées plutôt que des chiffres nus. L'UV a une
  // échelle universelle (OMS) donc on peut afficher une catégorie
  // qualitative (Faible/Modéré/...) ; la qualité de l'air dépend de
  // l'entité choisie par l'utilisateur (AQI US, indice ATMO, concentration
  // brute...) donc on se contente de bien la libeller avec son unité,
  // sans inventer une catégorie sur une échelle qu'on ne connaît pas.
  _renderIndicators() {
    const boxes = [];

    const uvObj =
      this._config.uv_entity && this._hass.states[this._config.uv_entity];
    if (uvObj && !["unknown", "unavailable"].includes(uvObj.state)) {
      const category = uvCategory(uvObj.state);
      boxes.push(html`
        <div class="indicator-box indicator-uv">
          <div class="indicator-label">Indice UV</div>
          <div class="indicator-row">
            <span class="indicator-value">${uvObj.state}</span>
            ${category
              ? html`<span class="indicator-category">${category}</span>`
              : nothing}
          </div>
        </div>
      `);
    }

    const aqiObj =
      this._config.air_quality_entity &&
      this._hass.states[this._config.air_quality_entity];
    if (aqiObj && !["unknown", "unavailable"].includes(aqiObj.state)) {
      const unit = aqiObj.attributes.unit_of_measurement || "";
      boxes.push(html`
        <div class="indicator-box indicator-air">
          <div class="indicator-label">Qualité de l'air</div>
          <div class="indicator-row">
            <span class="indicator-value">${aqiObj.state}</span>
            ${unit
              ? html`<span class="indicator-category">${unit}</span>`
              : nothing}
          </div>
        </div>
      `);
    }

    if (!boxes.length) return nothing;
    return html`<div class="indicators-row">${boxes}</div>`;
  }

  // Bandeau bas : vent, lever/coucher de soleil. Chaque tuile n'apparaît
  // que si la donnée existe (attribut natif de l'entité météo pour le
  // vent, `sun.sun` pour lever/coucher) — pas de case à cocher requise
  // pour un usage de base. Libellé texte à côté de l'icône : une icône
  // seule pour lever/coucher est ambiguë (laquelle est laquelle ?).
  _renderBottomBand(stateObj, locale, timeFormat) {
    const tiles = [];

    const windSpeed = stateObj.attributes.wind_speed;
    if (this._config.show_wind && windSpeed != null) {
      const unit = stateObj.attributes.wind_speed_unit || "";
      tiles.push({
        type: "wind",
        icon: "mdi:weather-windy",
        label: "Vent",
        value: `${Math.round(windSpeed)} ${unit}`.trim(),
      });
    }

    const sunObj = this._hass.states[this._config.sun_entity || "sun.sun"];
    if (this._config.show_sun && sunObj) {
      const rising = sunObj.attributes.next_rising
        ? new Date(sunObj.attributes.next_rising)
        : null;
      const setting = sunObj.attributes.next_setting
        ? new Date(sunObj.attributes.next_setting)
        : null;
      if (rising) {
        tiles.push({
          type: "sunrise",
          icon: "mdi:weather-sunset-up",
          label: "Lever",
          value: formatTime(rising, locale, timeFormat),
        });
      }
      if (setting) {
        tiles.push({
          type: "sunset",
          icon: "mdi:weather-sunset-down",
          label: "Coucher",
          value: formatTime(setting, locale, timeFormat),
        });
      }
    }

    if (!tiles.length) return nothing;

    return html`
      <div class="bottom-band">
        ${tiles.map(
          (tile) => html`
            <div class="band-tile band-${tile.type}">
              <ha-icon class="band-icon" icon=${tile.icon}></ha-icon>
              <span class="band-label">${tile.label}</span>
              <span class="band-value">${tile.value}</span>
            </div>
          `
        )}
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
      /* Espacement vertical entre sections, distinct de --_gap (horizontal,
         entre icônes/tuiles) : on tient désormais 4 blocs empilés (actuelle,
         horaire, quotidienne, bandeau bas) dans les mêmes 480px, un peu
         moins d'air entre eux était nécessaire pour que tout rentre. */
      --_row-gap: var(--echo-weather-row-gap, 8px);
      --_icon-size: var(--echo-weather-icon-size, clamp(70px, 9.5cqw, 92px));
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
      --_tile-background: var(--echo-weather-tile-background, rgba(127, 127, 127, 0.13));
      font-family: var(--echo-weather-font-family, inherit);
      color: var(--_text-color);
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
      padding: var(--_row-gap) var(--_gap);
      gap: var(--_row-gap);
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
      padding-bottom: var(--_row-gap);
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
    /* Indice UV / qualité de l'air : petites tuiles étiquetées (label +
       valeur + catégorie ou unité) plutôt que des badges inline nus —
       inspiré des tuiles AIR QUALITY/POLLEN de RadarWise. */
    .indicators-row {
      display: flex;
      gap: 8px;
      margin-top: 4px;
    }
    .indicator-box {
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: 3px 9px;
      border-radius: 12px;
      background: var(--_tile-background);
      border: 1px solid var(--_divider-color);
    }
    .indicator-label {
      font-size: clamp(0.68rem, 1.1cqw, 0.78rem);
      font-weight: 600;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .indicator-row {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .indicator-value {
      font-size: clamp(1rem, 1.8cqw, 1.2rem);
      font-weight: 800;
    }
    .indicator-uv .indicator-value {
      color: var(--echo-weather-uv-color, #ffb74d);
    }
    .indicator-air .indicator-value {
      color: var(--echo-weather-air-color, #81c784);
    }
    .indicator-category {
      font-size: clamp(0.72rem, 1.2cqw, 0.85rem);
      font-weight: 600;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .current-meta {
      color: var(--_secondary-color);
      font-size: clamp(0.85rem, 1.4cqw, 1rem);
      margin-top: 2px;
    }
    .current-info {
      flex: 1 1 auto;
      min-width: 0;
    }

    /* --- Colonne de droite : horloge + humidité, dans l'espace resté
       libre à côté de la météo actuelle. --- */
    .current-side {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      flex-shrink: 0;
      margin-left: auto;
    }
    .clock {
      font-size: clamp(1.05rem, 2cqw, 1.35rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .humidity-badge {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 12px;
      border-radius: 14px;
      background: var(--_tile-background);
      border: 1px solid var(--_divider-color);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
      font-size: clamp(0.95rem, 1.7cqw, 1.15rem);
      font-weight: 700;
      white-space: nowrap;
    }
    .humidity-icon {
      --mdc-icon-size: clamp(18px, 2.6cqw, 22px);
      color: var(--echo-weather-humidity-color, #4fc3f7);
      flex-shrink: 0;
    }

    /* --- Prévisions horaires : contenu principal --- */
    .hourly {
      display: flex;
      justify-content: space-between;
      gap: var(--_gap);
      flex: 1 1 auto;
      padding-bottom: var(--_row-gap);
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
      gap: 3px;
      flex: 1;
      min-width: 0;
      padding: 6px 4px;
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

    /* --- Bandeau bas : vent / lever-coucher / qualité de l'air, une seule
       ligne pleine largeur — pendant compact des tuiles HUMIDITY/WIND/
       SUNRISE/SUNSET de RadarWise. --- */
    .bottom-band {
      display: flex;
      justify-content: center;
      gap: var(--_gap);
      flex: 0 0 auto;
      padding-top: var(--_row-gap);
      border-top: 1px solid var(--_divider-color);
    }
    .band-tile {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      flex: 1;
      min-width: 0;
      padding: 7px 10px;
      border-radius: 12px;
      background: var(--_tile-background);
      border: 1px solid var(--_divider-color);
    }
    .band-icon {
      --mdc-icon-size: clamp(16px, 2.2cqw, 20px);
      flex-shrink: 0;
    }
    .band-wind .band-icon {
      color: var(--echo-weather-wind-color, #90a4ae);
    }
    .band-sunrise .band-icon {
      color: var(--echo-weather-sunrise-color, #ffb74d);
    }
    .band-sunset .band-icon {
      color: var(--echo-weather-sunset-color, #ff8a65);
    }
    .band-label {
      color: var(--_secondary-color);
      font-size: clamp(0.8rem, 1.4cqw, 0.95rem);
      font-weight: 600;
      white-space: nowrap;
    }
    .band-value {
      font-size: clamp(0.85rem, 1.5cqw, 1.05rem);
      font-weight: 700;
      white-space: nowrap;
    }

    /* --- Breakpoint portrait/étroit (posé via ResizeObserver) --- */
    :host(.portrait) .current,
    :host(.portrait) .hourly,
    :host(.portrait) .daily {
      flex-wrap: wrap;
    }
    :host(.portrait) .hourly-item,
    :host(.portrait) .daily-item {
      flex: 1 1 30%;
    }
    :host(.portrait) .current-side {
      flex-direction: row;
      align-items: center;
    }
    :host(.portrait) .bottom-band {
      flex-wrap: wrap;
    }
    :host(.portrait) .band-tile {
      flex: 1 1 40%;
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
