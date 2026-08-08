import { LitElement, html, css, nothing } from "lit";
import { CARD_TAG, DEFAULT_CONFIG } from "./const.js";
import { conditionToIconSlug, iconUrl, getStaticIconUrl } from "./icons.js";
import {
  formatDate,
  formatHour,
  formatShortDate,
  formatTime,
  formatWeekday,
  localizeCondition,
  uvCategory,
} from "./format.js";
import { subscribeForecasts } from "./forecast.js";
import { saintOfDay } from "./saints.js";
import { moonPhase } from "./moon.js";

class EchoWeatherCard extends LitElement {
  static properties = {
    _config: { state: true },
    _hourly: { state: true },
    _daily: { state: true },
    _detailForecast: { state: true },
    _roundDialog: { state: true },
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

  // Icônes des prévisions (horaires/quotidiennes) : version figée, sans
  // l'animation SMIL embarquée dans les SVG Meteocons — seule l'icône
  // météo actuelle a besoin de bouger, et beaucoup d'icônes animées à
  // l'écran en même temps fait chuter le FPS sur du matériel modeste
  // (Echo Show 5). Tant que la version figée n'est pas prête (premier
  // fetch), on affiche l'animée le temps d'un re-render.
  _staticIcon(url) {
    return getStaticIconUrl(url, () => this.requestUpdate()) || url;
  }

  _isNight(date) {
    if (!date) {
      const sunObj = this._hass.states[this._config.sun_entity || "sun.sun"];
      return sunObj?.state === "below_horizon";
    }
    // Pas de lever/coucher précis par prévision : heuristique horaire simple.
    const hour = date.getHours();
    return hour < 7 || hour >= 21;
  }

  // Mode clair/sombre automatique d'après le soleil (View Assist n'a pas
  // de bascule jour/nuit native pour ses cartes) — theme_mode: "auto" par
  // défaut, "light"/"dark" pour forcer un mode fixe indépendamment de
  // l'heure. Appliqué comme classe hôte pour piloter le fond et les
  // couleurs via CSS (cf. static styles, tokens --_mode-*).
  _isLightMode() {
    if (this._config.theme_mode === "light") return true;
    if (this._config.theme_mode === "dark") return false;
    return !this._isNight();
  }

  render() {
    if (!this._config || !this._hass) return nothing;

    const stateObj = this._hass.states[this._config.entity];
    if (!stateObj) {
      return html`<div class="error">
        Entité ${this._config.entity} introuvable
      </div>`;
    }

    this.classList.toggle("light", this._isLightMode());

    const locale =
      this._config.language || this._hass.locale?.language || "en";
    const timeFormat =
      this._config.time_format || this._hass.locale?.time_format || "24";

    if (this._config.layout === "round") {
      return this._renderRound(stateObj, locale, timeFormat);
    }

    const cardStyle =
      this._config.background != null
        ? `background:${this._config.background}`
        : "";

    return html`
      <div class="card" style=${cardStyle}>
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
      ${this._renderDayDetail(stateObj, locale, false)}
    `;
  }

  // --- Mise en page "round" (petit écran circulaire, ex: Echo Spot 1ère
  // gen 2017, 480x480) : pas la place pour empiler actuelle/horaire/
  // quotidienne/bandeau comme en mode large. À la place, un écran d'accueil
  // dense (horloge + météo actuelle + indicateurs compacts + deux tuiles
  // "Aujourd'hui"/"Semaine" avec aperçu) où chaque élément est aussi une
  // porte d'entrée vers plus de détail au tap (ha-dialog). ---
  _renderRound(stateObj, locale, timeFormat) {
    const slug = conditionToIconSlug(stateObj.state, this._isNight());
    const url = iconUrl(slug, this._config.icons);
    const conditionLabel = localizeCondition(this._hass, stateObj.state);
    const temp = stateObj.attributes.temperature;
    const tempUnit = stateObj.attributes.temperature_unit || "°C";
    const feelsLike = stateObj.attributes.apparent_temperature;
    const humidity = stateObj.attributes.humidity;
    const lastUpdated = stateObj.last_updated
      ? new Date(stateObj.last_updated)
      : null;
    const now = new Date();

    const cardStyle =
      this._config.background != null
        ? `background:${this._config.background}`
        : "";

    const openCurrent = () => {
      this._roundDialog = "current";
    };
    const openHourly = () => {
      this._roundDialog = "hourly";
    };
    const openDaily = () => {
      this._roundDialog = "daily";
    };

    // Aperçus compacts sur les tuiles "Aujourd'hui"/"Semaine" — juste du
    // texte (pas d'icône supplémentaire à charger), pour donner un avant-
    // goût sans obliger à taper pour tout voir.
    const nextHour = (this._hourly || []).find(
      (f) => new Date(f.datetime).getTime() >= Date.now()
    );
    const todayPreview = nextHour
      ? `${formatHour(new Date(nextHour.datetime), locale, timeFormat)} · ${Math.round(nextHour.temperature)}°`
      : null;
    const firstDay = (this._daily || [])[0];
    const weekPreview = firstDay
      ? `↑${Math.round(firstDay.temperature)}° ↓${Math.round(firstDay.templow)}°`
      : null;

    const metaParts = [];
    if (this._config.show_feels_like && feelsLike != null) {
      metaParts.push(`Ressenti ${Math.round(feelsLike)}°`);
    }
    if (this._config.show_humidity && humidity != null) {
      metaParts.push(`Humidité ${Math.round(humidity)}%`);
    }

    // Date en plus gros sous l'horloge, phase de lune + saint du jour en
    // plus petit sur une ligne séparée en dessous — l'icône de lune se
    // colle directement au libellé qu'elle représente plutôt que d'être
    // placée avant la date (confus : elle semblait illustrer la date).
    const saint = this._config.show_date ? saintOfDay(now) : null;
    const moonObj =
      this._config.show_moon &&
      this._hass.states[this._config.moon_entity || "sensor.moon_phase"];
    const phase =
      moonObj && !["unknown", "unavailable"].includes(moonObj.state)
        ? moonPhase(moonObj.state)
        : null;
    const moonLineParts = [];
    if (phase) moonLineParts.push(phase.label);
    if (saint) moonLineParts.push(saint);

    return html`
      <div class="card round" style=${cardStyle}>
        ${this._config.show_clock
          ? html`<div class="round-clock">
              ${formatTime(now, locale, timeFormat)}
            </div>`
          : nothing}
        ${this._config.show_date
          ? html`<div class="round-date">
              ${formatShortDate(now, locale)}
            </div>`
          : nothing}
        ${moonLineParts.length
          ? html`<div class="round-moon-line">
              ${phase
                ? html`<ha-icon
                    class="round-date-icon"
                    icon=${phase.icon}
                  ></ha-icon>`
                : nothing}
              <span>${moonLineParts.join(" · ")}</span>
            </div>`
          : nothing}
        ${this._config.show_current
          ? html`
              <div
                class="round-current"
                role="button"
                tabindex="0"
                @click=${openCurrent}
                @keydown=${(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCurrent();
                  }
                }}
              >
                <img
                  class="round-icon"
                  src=${this._config.icons.animate_current
                    ? url
                    : this._staticIcon(url)}
                  alt=${conditionLabel}
                />
                <div class="round-current-info">
                  <div class="round-temp">${Math.round(temp)}${tempUnit}</div>
                  <div class="round-condition">${conditionLabel}</div>
                  ${metaParts.length
                    ? html`<div class="round-meta">
                        ${metaParts.join(" · ")}
                      </div>`
                    : nothing}
                </div>
              </div>
            `
          : nothing}
        ${this._renderRoundIndicators(stateObj, openCurrent)}
        <div class="round-launchers">
          ${this._config.show_hourly
            ? this._renderRoundLauncher(
                "mdi:clock-outline",
                "Aujourd'hui",
                todayPreview,
                openHourly
              )
            : nothing}
          ${this._config.show_daily
            ? this._renderRoundLauncher(
                "mdi:calendar-week",
                "Semaine",
                weekPreview,
                openDaily
              )
            : nothing}
        </div>
        ${this._config.show_last_updated && lastUpdated
          ? html`<div class="round-updated">
              Maj à ${formatTime(lastUpdated, locale, timeFormat)}
            </div>`
          : nothing}
      </div>
      ${this._renderRoundDialog(stateObj, locale, timeFormat)}
      ${this._renderDayDetail(stateObj, locale, true)}
    `;
  }

  // Ligne compacte d'indicateurs (UV, qualité de l'air, vent, point de
  // rosée) sous la condition — juste icône + valeur, sans libellé, pour
  // tenir sur une seule ligne (ou deux si ça déborde). Humidité exclue :
  // déjà dans la ligne Ressenti/Humidité sous la condition.
  // Tape dessus ouvre le même détail complet que la météo actuelle.
  _renderRoundIndicators(stateObj, onOpen) {
    const chips = [];
    const uvObj =
      this._config.uv_entity && this._hass.states[this._config.uv_entity];
    if (uvObj && !["unknown", "unavailable"].includes(uvObj.state)) {
      chips.push({ icon: "mdi:weather-sunny-alert", value: uvObj.state });
    }
    const airQualityObj =
      this._config.air_quality_entity &&
      this._hass.states[this._config.air_quality_entity];
    if (
      airQualityObj &&
      !["unknown", "unavailable"].includes(airQualityObj.state)
    ) {
      chips.push({ icon: "mdi:air-filter", value: airQualityObj.state });
    }
    // Humidité volontairement absente d'ici : déjà affichée dans la ligne
    // "Ressenti · Humidité" sous la condition (cf. _renderRound), pas
    // besoin de la répéter dans les indicateurs.
    const windSpeed = stateObj.attributes.wind_speed;
    if (this._config.show_wind && windSpeed != null) {
      chips.push({
        icon: "mdi:weather-windy",
        value: `${Math.round(windSpeed)}`,
      });
    }
    const dewPointObj =
      this._config.dew_point_entity &&
      this._hass.states[this._config.dew_point_entity];
    const dewPoint = dewPointObj
      ? Number(dewPointObj.state)
      : stateObj.attributes.dew_point;
    if (
      this._config.show_dew_point &&
      dewPoint != null &&
      Number.isFinite(dewPoint)
    ) {
      chips.push({
        icon: "mdi:thermometer-water",
        value: `${Math.round(dewPoint)}°`,
      });
    }

    if (!chips.length) return nothing;

    return html`
      <div
        class="round-indicators"
        role="button"
        tabindex="0"
        @click=${onOpen}
        @keydown=${(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        ${chips.map(
          (c) => html`<span class="round-chip">
            <ha-icon icon=${c.icon}></ha-icon>${c.value}
          </span>`
        )}
      </div>
    `;
  }

  _renderRoundLauncher(icon, label, preview, onOpen) {
    return html`
      <div
        class="round-launcher"
        role="button"
        tabindex="0"
        @click=${onOpen}
        @keydown=${(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        <div class="round-launcher-top">
          <ha-icon icon=${icon}></ha-icon>
          <span>${label}</span>
          <ha-icon class="round-chevron" icon=${"mdi:chevron-right"}></ha-icon>
        </div>
        ${preview
          ? html`<div class="round-launcher-preview">${preview}</div>`
          : nothing}
      </div>
    `;
  }

  _renderRoundDialog(stateObj, locale, timeFormat) {
    if (this._roundDialog === "current") {
      return this._renderCurrentDetail(stateObj, locale, timeFormat);
    }
    if (this._roundDialog === "hourly") {
      return this._renderHourlyOverview(locale, timeFormat);
    }
    if (this._roundDialog === "daily") {
      return this._renderDailyOverview(locale);
    }
    return nothing;
  }

  // isRound : sur écran circulaire, le bouton fermer est centré en bas
  // plutôt qu'en haut à droite — ce coin-là est le plus susceptible d'être
  // sous le boîtier physique (cf. _renderRound, .round-dialog en CSS).
  _renderDialogHeader(title, close, isRound) {
    return html`
      <div class="detail-header">
        <div class="detail-date">${title}</div>
        ${isRound
          ? nothing
          : html`<ha-icon
              class="detail-close"
              icon=${"mdi:close"}
              role="button"
              tabindex="0"
              @click=${close}
              @keydown=${(e) => {
                if (e.key === "Enter" || e.key === " ") close();
              }}
            ></ha-icon>`}
      </div>
    `;
  }

  _renderRoundBackButton(close) {
    return html`
      <ha-icon
        class="round-back"
        icon=${"mdi:arrow-left"}
        role="button"
        tabindex="0"
        @click=${close}
        @keydown=${(e) => {
          if (e.key === "Enter" || e.key === " ") close();
        }}
      ></ha-icon>
    `;
  }

  // Détail de la météo actuelle (mode round uniquement) : reprend les
  // mêmes données que le mode large (UV, qualité de l'air, humidité, vent,
  // point de rosée, lever/coucher, mise à jour) mais en liste verticale
  // plutôt qu'éclatées entre plusieurs zones — il n'y a pas la place pour
  // les afficher directement sur l'écran rond.
  _renderCurrentDetail(stateObj, locale, timeFormat) {
    const close = () => {
      this._roundDialog = null;
    };
    const tempUnit = stateObj.attributes.temperature_unit || "°C";
    const feelsLike = stateObj.attributes.apparent_temperature;
    const humidity = stateObj.attributes.humidity;
    const windSpeed = stateObj.attributes.wind_speed;
    const windUnit = stateObj.attributes.wind_speed_unit || "";

    const uvObj =
      this._config.uv_entity && this._hass.states[this._config.uv_entity];
    const airQualityObj =
      this._config.air_quality_entity &&
      this._hass.states[this._config.air_quality_entity];
    const dewPointObj =
      this._config.dew_point_entity &&
      this._hass.states[this._config.dew_point_entity];
    const dewPoint = dewPointObj
      ? Number(dewPointObj.state)
      : stateObj.attributes.dew_point;
    const sunObj = this._hass.states[this._config.sun_entity || "sun.sun"];

    const rows = [];
    if (this._config.show_feels_like && feelsLike != null) {
      rows.push({
        icon: "mdi:thermometer",
        label: "Ressenti",
        value: `${Math.round(feelsLike)}${tempUnit}`,
      });
    }
    if (this._config.show_humidity && humidity != null) {
      rows.push({
        icon: "mdi:water-percent",
        label: "Humidité",
        value: `${Math.round(humidity)}%`,
      });
    }
    if (uvObj && !["unknown", "unavailable"].includes(uvObj.state)) {
      const category = uvCategory(uvObj.state);
      rows.push({
        icon: "mdi:weather-sunny-alert",
        label: "Indice UV",
        value: category ? `${uvObj.state} · ${category}` : `${uvObj.state}`,
      });
    }
    if (
      airQualityObj &&
      !["unknown", "unavailable"].includes(airQualityObj.state)
    ) {
      const category =
        airQualityObj.attributes.Libellé || airQualityObj.attributes.libelle;
      const unit = airQualityObj.attributes.unit_of_measurement;
      rows.push({
        icon: "mdi:air-filter",
        label: "Qualité de l'air",
        value: category
          ? `${airQualityObj.state} · ${category}`
          : `${airQualityObj.state}${unit ? ` ${unit}` : ""}`,
      });
    }
    if (this._config.show_wind && windSpeed != null) {
      rows.push({
        icon: "mdi:weather-windy",
        label: "Vent",
        value: `${Math.round(windSpeed)} ${windUnit}`.trim(),
      });
    }
    if (
      this._config.show_dew_point &&
      dewPoint != null &&
      Number.isFinite(dewPoint)
    ) {
      const unit = dewPointObj
        ? dewPointObj.attributes.unit_of_measurement || tempUnit
        : tempUnit;
      rows.push({
        icon: "mdi:thermometer-water",
        label: "Point de rosée",
        value: `${dewPoint.toFixed(1)}${unit}`,
      });
    }
    if (this._config.show_sun && sunObj) {
      if (sunObj.attributes.next_rising) {
        rows.push({
          icon: "mdi:weather-sunset-up",
          label: "Lever",
          value: formatTime(
            new Date(sunObj.attributes.next_rising),
            locale,
            timeFormat
          ),
        });
      }
      if (sunObj.attributes.next_setting) {
        rows.push({
          icon: "mdi:weather-sunset-down",
          label: "Coucher",
          value: formatTime(
            new Date(sunObj.attributes.next_setting),
            locale,
            timeFormat
          ),
        });
      }
    }
    if (this._config.show_last_updated && stateObj.last_updated) {
      rows.push({
        icon: "mdi:update",
        label: "Mise à jour",
        value: formatTime(
          new Date(stateObj.last_updated),
          locale,
          timeFormat
        ),
      });
    }

    return html`
      <ha-dialog class="round-dialog" open hideActions @closed=${close}>
        <div class="round-dialog-wrap">
          <div class="detail detail-list round-detail">
            ${this._renderDialogHeader("Météo actuelle", close, true)}
            ${rows.length
              ? html`<div class="detail-rows">
                  ${rows.map(
                    (r) => html`<div class="detail-row">
                      <ha-icon icon=${r.icon}></ha-icon>
                      <span class="detail-row-label">${r.label}</span>
                      <span class="detail-row-value">${r.value}</span>
                    </div>`
                  )}
                </div>`
              : html`<div class="detail-row-empty">
                  Aucune information supplémentaire configurée.
                </div>`}
          </div>
          ${this._renderRoundBackButton(close)}
        </div>
      </ha-dialog>
    `;
  }

  // Liste des prochaines heures (mode round uniquement) — même donnée que
  // _renderHourly, mais en liste verticale scrollable plutôt qu'en rangée
  // horizontale (pas la largeur nécessaire sur un écran rond).
  _renderHourlyOverview(locale, timeFormat) {
    const close = () => {
      this._roundDialog = null;
    };
    const now = Date.now();
    const items = (this._hourly || [])
      .filter((f) => new Date(f.datetime).getTime() >= now)
      .slice(0, this._config.hourly_count);

    return html`
      <ha-dialog class="round-dialog" open hideActions @closed=${close}>
        <div class="round-dialog-wrap">
          <div class="detail detail-list round-detail">
            ${this._renderDialogHeader("Aujourd'hui", close, true)}
            ${items.length
              ? html`<div class="hourly-list">
                  ${items.map((forecast) => {
                    const date = new Date(forecast.datetime);
                    const slug = conditionToIconSlug(
                      forecast.condition,
                      this._isNight(date)
                    );
                    const url = iconUrl(slug, this._config.icons);
                    const label = localizeCondition(
                      this._hass,
                      forecast.condition
                    );
                    const pop = forecast.precipitation_probability;
                    return html`<div class="hourly-list-item">
                      <span class="hourly-list-time"
                        >${formatHour(date, locale, timeFormat)}</span
                      >
                      <img
                        class="hourly-list-icon"
                        src=${this._staticIcon(url)}
                        alt=${label}
                      />
                      <span class="hourly-list-temp"
                        >${Math.round(forecast.temperature)}°</span
                      >
                      <span class="hourly-list-pop"
                        >${this._config.show_precipitation_probability &&
                        pop > 0
                          ? `${pop}%`
                          : ""}</span
                      >
                    </div>`;
                  })}
                </div>`
              : html`<div class="detail-row-empty">
                  Pas de prévision disponible.
                </div>`}
          </div>
          ${this._renderRoundBackButton(close)}
        </div>
      </ha-dialog>
    `;
  }

  // Liste des prochains jours (mode round uniquement) — chaque jour est
  // lui-même cliquable et renvoie vers _renderDayDetail (même détail que
  // le tap sur une tuile .daily-item en mode large) : on ferme cette liste
  // et on ouvre le détail du jour choisi, plutôt que d'empiler les dialog.
  _renderDailyOverview(locale) {
    const close = () => {
      this._roundDialog = null;
    };
    const items = (this._daily || []).slice(0, this._config.daily_count);

    return html`
      <ha-dialog class="round-dialog" open hideActions @closed=${close}>
        <div class="round-dialog-wrap">
          <div class="detail detail-list round-detail">
            ${this._renderDialogHeader("Cette semaine", close, true)}
            ${items.length
              ? html`<div class="daily-list">
                  ${items.map((forecast) => {
                    const date = new Date(forecast.datetime);
                    const slug = conditionToIconSlug(
                      forecast.condition,
                      false
                    );
                    const url = iconUrl(slug, this._config.icons);
                    const label = localizeCondition(
                      this._hass,
                      forecast.condition
                    );
                    const openDay = () => {
                      this._roundDialog = null;
                      this._detailForecast = forecast;
                    };
                    return html`<div
                      class="daily-list-item"
                      role="button"
                      tabindex="0"
                      @click=${openDay}
                      @keydown=${(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openDay();
                        }
                      }}
                    >
                      <span class="daily-list-day"
                        >${formatWeekday(date, locale)}</span
                      >
                      <img
                        class="daily-list-icon"
                        src=${this._staticIcon(url)}
                        alt=${label}
                      />
                      <span class="daily-list-temps">
                        <span class="daily-max"
                          >${Math.round(forecast.temperature)}°</span
                        >
                        <span class="daily-min"
                          >${Math.round(forecast.templow)}°</span
                        >
                      </span>
                      <ha-icon
                        class="round-chevron"
                        icon=${"mdi:chevron-right"}
                      ></ha-icon>
                    </div>`;
                  })}
                </div>`
              : html`<div class="detail-row-empty">
                  Pas de prévision disponible.
                </div>`}
          </div>
          ${this._renderRoundBackButton(close)}
        </div>
      </ha-dialog>
    `;
  }

  _renderCurrent(stateObj, locale, timeFormat) {
    const slug = conditionToIconSlug(stateObj.state, this._isNight());
    const url = iconUrl(slug, this._config.icons);
    const conditionLabel = localizeCondition(this._hass, stateObj.state);
    const temp = stateObj.attributes.temperature;
    const tempUnit = stateObj.attributes.temperature_unit || "°C";
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

    const uvObj =
      this._config.uv_entity && this._hass.states[this._config.uv_entity];
    const showUv =
      uvObj && !["unknown", "unavailable"].includes(uvObj.state);
    const airQualityObj =
      this._config.air_quality_entity &&
      this._hass.states[this._config.air_quality_entity];
    const showAirQuality =
      airQualityObj &&
      !["unknown", "unavailable"].includes(airQualityObj.state);
    const showIndicators = showUv || showAirQuality;
    const showHumidityLine = this._config.show_humidity && humidity != null;

    const showSide = this._config.show_clock || this._config.show_date;

    const now = new Date();
    const saint = this._config.show_date ? saintOfDay(now) : null;

    const moonObj =
      this._config.show_moon &&
      this._hass.states[this._config.moon_entity || "sensor.moon_phase"];
    const phase =
      moonObj && !["unknown", "unavailable"].includes(moonObj.state)
        ? moonPhase(moonObj.state)
        : null;
    const moonLineParts = [];
    if (phase) moonLineParts.push(phase.label);
    if (saint) moonLineParts.push(saint);

    return html`
      <div class="current">
        <img
          class="current-icon"
          src=${this._config.icons.animate_current ? url : this._staticIcon(url)}
          alt=${conditionLabel}
        />
        <div class="current-info">
          <div class="current-main">
            <div class="current-temp">${Math.round(temp)}${tempUnit}</div>
            <div class="current-condition">${conditionLabel}</div>
            ${metaParts.length
              ? html`<div class="current-meta">
                  ${metaParts.join(" · ")}
                </div>`
              : nothing}
          </div>
          ${showIndicators || showHumidityLine
            ? html`
                <div class="uv-group">
                  ${showIndicators
                    ? html`<div class="indicators-row">
                        ${showUv
                          ? this._renderIndicator("uv", uvObj)
                          : nothing}
                        ${showAirQuality
                          ? this._renderIndicator("air", airQualityObj)
                          : nothing}
                      </div>`
                    : nothing}
                  ${showHumidityLine
                    ? html`<div class="humidity-line">
                        <ha-icon
                          class="humidity-icon"
                          icon=${"mdi:water-percent"}
                        ></ha-icon>
                        <span>${Math.round(humidity)}%</span>
                      </div>`
                    : nothing}
                </div>
              `
            : nothing}
        </div>
        ${showSide
          ? html`
              <div class="current-side">
                <div class="clock-group">
                  ${this._config.show_clock
                    ? html`<div class="clock">
                        ${formatTime(now, locale, timeFormat)}
                      </div>`
                    : nothing}
                  ${this._config.show_date
                    ? html`<div class="date-line">
                        ${formatDate(now, locale)}
                      </div>`
                    : nothing}
                  ${moonLineParts.length
                    ? html`<div class="moon-line">
                        ${phase
                          ? html`<ha-icon
                              class="moon-icon"
                              icon=${phase.icon}
                            ></ha-icon>`
                          : nothing}
                        <span>${moonLineParts.join(" · ")}</span>
                      </div>`
                    : nothing}
                </div>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  // Indice UV et qualité de l'air, côte à côte à droite de la température
  // — tuiles à deux lignes (libellé au-dessus, valeur + catégorie
  // qualitative en dessous). L'UV a une échelle universelle (OMS) donc la
  // catégorie (Faible/Modéré/Élevé/...) est calculée ici (uvCategory).
  // La qualité de l'air n'a pas d'échelle générique fiable (dépend de
  // l'intégration choisie par l'utilisateur) : on affiche un libellé
  // qualitatif seulement si l'entité elle-même en expose un (attribut
  // "Libellé"/"libelle", ex: intégrations atmofrance/recosante), sinon
  // juste la valeur brute + son unité. L'appelant a déjà vérifié que
  // l'entité est utilisable (évite de refaire le lookup ici).
  _renderIndicator(kind, obj) {
    const isUv = kind === "uv";
    const label = isUv ? "Indice UV" : "Qualité de l'air";
    const category = isUv
      ? uvCategory(obj.state)
      : obj.attributes.Libellé || obj.attributes.libelle || null;
    const unit = !isUv ? obj.attributes.unit_of_measurement : null;
    return html`
      <div class="indicator-box indicator-${kind}">
        <div class="indicator-label">${label}</div>
        <div class="indicator-row">
          <span class="indicator-value"
            >${obj.state}${unit ? ` ${unit}` : ""}</span
          >
          ${category
            ? html`<span class="indicator-category">${category}</span>`
            : nothing}
        </div>
      </div>
    `;
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

    // Certaines intégrations météo (Météo-France notamment) n'exposent pas
    // de point de rosée natif sur l'entité weather.* : dew_point_entity
    // permet de brancher un capteur externe (ex: template sensor calculé
    // via la formule de Magnus) à la place.
    const dewPointObj =
      this._config.dew_point_entity &&
      this._hass.states[this._config.dew_point_entity];
    const dewPoint = dewPointObj
      ? Number(dewPointObj.state)
      : stateObj.attributes.dew_point;
    if (
      this._config.show_dew_point &&
      dewPoint != null &&
      Number.isFinite(dewPoint)
    ) {
      const unit = dewPointObj
        ? dewPointObj.attributes.unit_of_measurement ||
          stateObj.attributes.temperature_unit ||
          "°C"
        : stateObj.attributes.temperature_unit || "°C";
      tiles.push({
        type: "dew-point",
        icon: "mdi:thermometer-water",
        label: "Point de rosée",
        // Arrondi à la décimale près (contrairement au reste des tuiles,
        // arrondies à l'entier) : la valeur bouge peu, la décimale aide à
        // voir qu'elle évolue.
        value: `${dewPoint.toFixed(1)}${unit}`,
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
              <img
                class="hourly-icon"
                src=${this._staticIcon(url)}
                alt=${label}
              />
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
            <div
              class="daily-item"
              role="button"
              tabindex="0"
              @click=${() => {
                this._detailForecast = forecast;
              }}
              @keydown=${(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  this._detailForecast = forecast;
                }
              }}
            >
              <div class="daily-day">${formatWeekday(date, locale)}</div>
              <img
                class="daily-icon"
                src=${this._staticIcon(url)}
                alt=${label}
              />
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

  // Détail d'un jour de prévision, ouvert au clic/tap sur une tuile
  // .daily-item — ha-dialog est un composant du frontend HA, toujours
  // disponible dans ce contexte (la carte ne tourne que dans HA). Les
  // champs au-delà de température/condition varient selon l'intégration
  // météo ; chaque ligne n'apparaît que si la donnée existe sur la
  // prévision.
  _renderDayDetail(stateObj, locale, isRound) {
    const forecast = this._detailForecast;
    if (!forecast) return nothing;

    const close = () => {
      this._detailForecast = null;
    };
    const date = new Date(forecast.datetime);
    const slug = conditionToIconSlug(forecast.condition, false);
    const url = iconUrl(slug, this._config.icons);
    const label = localizeCondition(this._hass, forecast.condition);
    const tempUnit = stateObj.attributes.temperature_unit || "°C";
    const windUnit = stateObj.attributes.wind_speed_unit || "";

    const rows = [];
    if (forecast.precipitation_probability != null) {
      rows.push({
        icon: "mdi:water-percent",
        label: "Probabilité de pluie",
        value: `${Math.round(forecast.precipitation_probability)}%`,
      });
    }
    if (forecast.precipitation != null) {
      rows.push({
        icon: "mdi:weather-pouring",
        label: "Cumul de précipitations",
        value: `${forecast.precipitation} mm`,
      });
    }
    if (forecast.wind_speed != null) {
      rows.push({
        icon: "mdi:weather-windy",
        label: "Vent",
        value: `${Math.round(forecast.wind_speed)} ${windUnit}`.trim(),
      });
    }
    if (forecast.humidity != null) {
      rows.push({
        icon: "mdi:water-percent",
        label: "Humidité",
        value: `${Math.round(forecast.humidity)}%`,
      });
    }
    if (forecast.uv_index != null) {
      rows.push({
        icon: "mdi:weather-sunny-alert",
        label: "Indice UV",
        value: `${forecast.uv_index}`,
      });
    }

    const body = html`
      <div class="detail ${isRound ? "detail-list round-detail" : ""}">
        ${this._renderDialogHeader(formatDate(date, locale), close, isRound)}
        <img class="detail-icon" src=${url} alt=${label} />
        <div class="detail-condition">${label}</div>
        <div class="detail-temps">
          <span class="detail-max"
            >${Math.round(forecast.temperature)}${tempUnit}</span
          >
          <span class="detail-min"
            >${Math.round(forecast.templow)}${tempUnit}</span
          >
        </div>
        ${rows.length
          ? html`<div class="detail-rows">
              ${rows.map(
                (r) => html`<div class="detail-row">
                  <ha-icon icon=${r.icon}></ha-icon>
                  <span class="detail-row-label">${r.label}</span>
                  <span class="detail-row-value">${r.value}</span>
                </div>`
              )}
            </div>`
          : nothing}
      </div>
    `;

    return html`
      <ha-dialog
        class=${isRound ? "round-dialog" : ""}
        open
        hideActions
        @closed=${close}
      >
        ${isRound
          ? html`<div class="round-dialog-wrap">
              ${body} ${this._renderRoundBackButton(close)}
            </div>`
          : body}
      </ha-dialog>
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
      --_row-gap: var(--echo-weather-row-gap, 2px);
      /* Icônes horaires uniquement désormais (actuelle et quotidien ont
         chacune leur propre variable ci-dessous) — actuelle et quotidien
         ont plus de marge verticale que les prévisions horaires, donc
         rien ne les oblige à partager la même taille. */
      --_icon-size: var(--echo-weather-icon-size, clamp(64px, 8.5cqw, 84px));
      --_current-icon-size: var(
        --echo-weather-current-icon-size,
        clamp(100px, 15cqw, 155px)
      );
      --_current-temp-size: var(
        --echo-weather-current-temp-size,
        clamp(3rem, 7.6cqw, 4.6rem)
      );
      --_hourly-temp-size: var(
        --echo-weather-hourly-temp-size,
        clamp(1.15rem, 2.4cqw, 1.5rem)
      );
      --_daily-icon-size: var(
        --echo-weather-daily-icon-size,
        clamp(38px, 5.2cqw, 49px)
      );
      --_daily-temp-size: var(
        --echo-weather-daily-temp-size,
        clamp(1.3rem, 2.6cqw, 1.6rem)
      );
      /* Jeu de couleurs sombre (par défaut) — repris/écrasé par
         :host(.light) ci-dessous quand le mode clair est actif (soleil
         levé, ou theme_mode forcé). Inspiré de RadarWise : dégradé doux
         plutôt qu'un fond plat, tuiles avec un léger relief (liseré haut
         + ombre portée) plutôt qu'un simple aplat. */
      --_mode-bg: radial-gradient(
        130% 140% at 18% -10%,
        #1c2c40 0%,
        #101a26 45%,
        #05080c 100%
      );
      /* Couleur pleine (pas un dégradé) pour les endroits qui ont besoin
         d'une vraie <color> CSS, ex: --mdc-theme-surface de ha-dialog —
         lui passer --_mode-bg (un radial-gradient) y est invalide, la
         déclaration est ignorée et le composant retombe sur son propre
         thème par défaut (d'où un fond noir en mode clair, repéré via
         test sur appareil réel). */
      --_mode-surface: #101a26;
      --_mode-text: #ffffff;
      --_mode-secondary: #a9b4bf;
      --_mode-divider: rgba(255, 255, 255, 0.14);
      --_mode-tile-bg: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.12),
        rgba(255, 255, 255, 0.04)
      );
      --_mode-tile-border: rgba(255, 255, 255, 0.14);
      --_mode-tile-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18),
        0 3px 10px rgba(0, 0, 0, 0.35);
      --_text-color: var(--echo-weather-text-color, var(--_mode-text));
      --_secondary-color: var(
        --echo-weather-secondary-color,
        var(--_mode-secondary)
      );
      --_divider-color: var(--echo-weather-divider-color, var(--_mode-divider));
      --_tile-background: var(--echo-weather-tile-background, var(--_mode-tile-bg));
      --_tile-border: var(--echo-weather-tile-border, var(--_mode-tile-border));
      --_tile-shadow: var(--echo-weather-tile-shadow, var(--_mode-tile-shadow));
      /* --primary-font-family est la variable de thème HA standard (ce que
         change un thème/View Assist quand on choisit une police) : on la
         lit en repli avant d'abandonner à inherit, sinon un changement de
         police fait via le thème plutôt que via notre propre variable
         n'atteint jamais la carte. */
      font-family: var(
        --echo-weather-font-family,
        var(--primary-font-family, inherit)
      );
      color: var(--_text-color);
    }

    /* Mode clair : appliqué par render() (classe hôte) d'après le soleil,
       ou forcé via theme_mode. Écrase juste les tokens --_mode-*, tout le
       reste de la feuille de style s'adapte automatiquement à travers eux. */
    :host(.light) {
      --_mode-bg: radial-gradient(
        130% 140% at 18% -10%,
        #eef7fc 0%,
        #d7e9f4 45%,
        #bcdaeb 100%
      );
      --_mode-surface: #eef7fc;
      --_mode-text: #16232e;
      --_mode-secondary: #57697a;
      --_mode-divider: rgba(22, 35, 46, 0.14);
      --_mode-tile-bg: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.5)
      );
      --_mode-tile-border: rgba(22, 35, 46, 0.12);
      --_mode-tile-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7),
        0 3px 10px rgba(22, 35, 46, 0.1);
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
      padding: var(--_row-gap) var(--_gap);
      gap: var(--_row-gap);
      background: var(--_mode-bg);
      /* 0 par défaut : la carte est pensée pour occuper tout l'écran d'un
         smart display (Echo Show, tablette...) plutôt qu'être une tuile
         parmi d'autres dans un dashboard — des coins arrondis par défaut
         créeraient un cadre visible contre les bords physiques de l'écran.
         Reste réglable via --echo-weather-radius pour un usage en tuile. */
      border-radius: var(--echo-weather-radius, 0px);
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
      /* flex-start plutôt que center : .current grandit via flex-grow
         pour occuper l'espace vertical disponible, et un centrage aurait
         réparti cet espace en trop au-dessus ET en dessous de l'icône —
         créant un bandeau vide visible en haut de la carte. Ancré en
         haut, l'espace en trop finit en bas (près de la bordure), sans
         rien au-dessus. */
      align-items: flex-start;
      gap: var(--_gap);
      flex: 1 1 33%;
      padding-bottom: var(--_row-gap);
      border-bottom: 1px solid var(--_divider-color);
    }
    .current-icon {
      width: var(--_current-icon-size);
      height: var(--_current-icon-size);
      flex-shrink: 0;
      /* Seule icône encore animée (SMIL) : on la promeut sur sa propre
         couche de composition GPU plutôt que de la laisser peinte dans le
         même calque que le reste de la carte. Sans ça, chaque frame de
         l'animation peut forcer le moteur à repeindre toute la zone
         environnante (pas juste l'icône) — ce qui expliquerait qu'elle
         tourne bien seule sur une page vide mais rame une fois intégrée à
         une mise en page chargée. */
      will-change: transform;
    }
    .current-temp {
      font-size: var(--_current-temp-size);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.01em;
    }
    .current-main {
      display: flex;
      flex-direction: column;
      min-width: 0;
      /* Pas de flex-grow : ne prend que sa largeur naturelle (le texte
         temp/condition/météo), sinon la boîte s'étire et pousse le
         groupe UV/humidité loin à droite au lieu de rester juste à
         côté de la température. */
      flex: 0 1 auto;
    }
    .current-condition {
      color: var(--_secondary-color);
      font-size: clamp(1.15rem, 2.1cqw, 1.45rem);
      font-weight: 500;
      margin-top: 6px;
    }
    /* Indice UV : tuile à deux lignes (libellé au-dessus, valeur +
       catégorie en dessous) — la version d'origine, jugée plus lisible
       qu'une puce sur une seule ligne. */
    .indicator-box {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 6px 14px;
      border-radius: 14px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
    }
    .indicator-label {
      font-size: clamp(0.82rem, 1.3cqw, 0.95rem);
      font-weight: 600;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .indicator-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .indicator-value {
      font-size: clamp(1.35rem, 2.5cqw, 1.65rem);
      font-weight: 800;
    }
    .indicator-uv .indicator-value {
      color: var(--echo-weather-uv-color, #ffb74d);
    }
    .indicator-air .indicator-value {
      color: var(--echo-weather-air-quality-color, #66bb6a);
    }
    .indicators-row {
      display: flex;
      gap: 10px;
    }
    .indicator-category {
      font-size: clamp(0.88rem, 1.4cqw, 1.05rem);
      font-weight: 600;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    /* Colonne UV + humidité, à côté du bloc temp/condition/météo plutôt
       qu'empilée dedans : elle s'étire (stretch) sur toute la hauteur du
       bloc actuel, tuile UV en haut et humidité poussée en bas (proche de
       la bordure séparant du bloc horaire) via justify-content. L'humidité
       reste sans fond ni bordure (pas un badge) : juste une icône goutte
       et la valeur, aussi grande que l'espace disponible le permet. */
    .uv-group {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .humidity-line {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: clamp(1.8rem, 3.9cqw, 2.6rem);
      font-weight: 800;
      white-space: nowrap;
    }
    .humidity-icon {
      --mdc-icon-size: clamp(32px, 4.8cqw, 43px);
      color: var(--echo-weather-humidity-color, #4fc3f7);
      flex-shrink: 0;
    }
    .current-meta {
      color: var(--_secondary-color);
      font-size: clamp(0.95rem, 1.6cqw, 1.15rem);
      margin-top: 4px;
    }
    .current-info {
      display: flex;
      align-items: stretch;
      gap: 28px;
      flex: 1 1 auto;
      min-width: 0;
    }

    /* --- Colonne de droite : horloge + date + phase de lune/saint, aussi
       grandes que possible dans l'espace laissé libre à côté de la météo
       actuelle. --- */
    .current-side {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-shrink: 0;
      margin-left: auto;
    }
    /* Horloge + date + lune/saint collées ensemble (petit gap) plutôt
       qu'espacées comme le reste de la colonne — elles se lisent comme
       une seule unité. */
    .clock-group {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }
    .clock {
      font-size: clamp(2.4rem, 5.2cqw, 3.4rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    .date-line {
      color: var(--_secondary-color);
      font-size: clamp(1.25rem, 2.5cqw, 1.7rem);
      font-weight: 600;
      text-align: right;
      margin-top: 2px;
    }
    .moon-line {
      display: flex;
      align-items: center;
      gap: 7px;
      color: var(--_secondary-color);
      font-size: clamp(0.88rem, 1.5cqw, 1.08rem);
      font-weight: 500;
      text-align: right;
      margin-top: 2px;
    }
    .moon-icon {
      --mdc-icon-size: clamp(17px, 2.4cqw, 21px);
      color: var(--echo-weather-moon-color, #b0bec5);
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
      gap: 5px;
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
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
      /* Cliquable/tap-able : ouvre le détail du jour (_renderDayDetail). */
      cursor: pointer;
    }
    .daily-item:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
    }
    .daily-day {
      color: var(--_secondary-color);
      font-size: clamp(0.95rem, 1.7cqw, 1.15rem);
      font-weight: 600;
      text-transform: capitalize;
    }
    .daily-icon {
      width: var(--_daily-icon-size);
      height: var(--_daily-icon-size);
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
      padding: 5px 10px;
      border-radius: 12px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
    }
    .band-icon {
      --mdc-icon-size: clamp(16px, 2.2cqw, 20px);
      flex-shrink: 0;
    }
    .band-wind .band-icon {
      color: var(--echo-weather-wind-color, #90a4ae);
    }
    .band-dew-point .band-icon {
      color: var(--echo-weather-dew-point-color, #4fc3f7);
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

    /* Les icônes Meteocons "fill" ont des traits clairs pensés pour un
       fond sombre : en mode clair elles deviennent quasi invisibles sans
       aide. drop-shadow() (contrairement à box-shadow) suit la silhouette
       réelle de l'icône (alpha), donc ça ajoute un halo sombre autour des
       traits clairs sans plaque/cercle disgracieux derrière. Un halo
       statique (dégradé radial) a été testé sur l'icône actuelle pour
       éviter tout recalcul par frame, mais n'a ni amélioré le FPS ni le
       rendu (cercle visible, moins fidèle à la silhouette) : le vrai coût
       semble ailleurs (cf. will-change sur .current-icon), donc retour au
       drop-shadow partout, cohérent visuellement sur les trois tailles. */
    :host(.light) .current-icon,
    :host(.light) .hourly-icon,
    :host(.light) .daily-icon {
      filter: drop-shadow(0 0 2px rgba(10, 20, 30, 0.45))
        drop-shadow(0 0 5px rgba(10, 20, 30, 0.25));
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

    /* --- Détail d'un jour de prévision (ha-dialog) --- */
    ha-dialog {
      --mdc-dialog-min-width: min(90vw, 380px);
      --mdc-dialog-max-width: min(90vw, 380px);
      --mdc-theme-surface: var(--_mode-surface);
      --mdc-dialog-content-ink-color: var(--_text-color);
      --mdc-dialog-heading-ink-color: var(--_text-color);
      color: var(--_text-color);
      font-family: inherit;
    }
    /* .detail peint son propre fond plutôt que de compter uniquement sur
       --mdc-theme-surface ci-dessus : cette variable MDC recevait jusque
       là --_mode-bg (un dégradé), une <color> CSS invalide pour la
       déclaration qui la consomme — la règle était donc ignorée et le
       dialogue retombait sur son thème interne par défaut (fond noir,
       peu importe le mode clair/sombre de la carte). Peindre notre
       propre fond ici garantit le bon rendu même si --mdc-theme-surface
       n'est pas respectée par une version donnée de ha-dialog. */
    .detail {
      display: flex;
      flex-direction: column;
      background: var(--_mode-surface);
      border-radius: 16px;
      align-items: center;
      gap: 4px;
      min-width: 240px;
      padding: 4px 4px 8px;
    }
    .detail-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .detail-date {
      font-size: 1.2rem;
      font-weight: 700;
      text-transform: capitalize;
    }
    .detail-close {
      --mdc-icon-size: 22px;
      color: var(--_secondary-color);
      cursor: pointer;
      flex-shrink: 0;
    }
    .detail-icon {
      width: 96px;
      height: 96px;
      margin-top: 6px;
    }
    .detail-condition {
      color: var(--_secondary-color);
      font-size: 1.05rem;
      font-weight: 500;
    }
    .detail-temps {
      font-size: 1.9rem;
      font-weight: 800;
      margin-top: 4px;
    }
    .detail-min {
      color: var(--_secondary-color);
      font-weight: 600;
      margin-left: 10px;
    }
    .detail-rows {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      margin-top: 14px;
    }
    .detail-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 10px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
    }
    .detail-row ha-icon {
      --mdc-icon-size: 18px;
      color: var(--_secondary-color);
      flex-shrink: 0;
    }
    .detail-row-label {
      flex: 1;
      color: var(--_secondary-color);
      font-size: 0.9rem;
    }
    .detail-row-value {
      font-weight: 700;
      font-size: 0.95rem;
    }
    .detail-row-empty {
      color: var(--_secondary-color);
      font-size: 0.9rem;
      margin-top: 12px;
      text-align: center;
    }
    .detail-list {
      max-height: 70vh;
      overflow-y: auto;
    }
    .hourly-list,
    .daily-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      margin-top: 10px;
    }
    .hourly-list-item,
    .daily-list-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
    }
    .daily-list-item {
      cursor: pointer;
    }
    .hourly-list-time,
    .daily-list-day {
      width: 44px;
      flex-shrink: 0;
      color: var(--_secondary-color);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: capitalize;
    }
    .hourly-list-icon,
    .daily-list-icon {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }
    .hourly-list-temp,
    .daily-list-temps {
      flex: 1;
      font-weight: 700;
    }
    .hourly-list-pop {
      color: var(--_secondary-color);
      font-size: 0.8rem;
      width: 32px;
      text-align: right;
    }

    /* --- Mise en page "round" (petit écran circulaire) --- */
    .card.round {
      aspect-ratio: 1 / 1;
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
      /* On se clippe nous-mêmes en cercle plutôt que de compter sur le
         boîtier physique : ça garantit qu'on ne dessine jamais rien au-delà
         de la zone visible, et ça donne un aperçu fidèle même testé dans
         une fenêtre carrée classique. */
      border-radius: 50%;
      overflow: hidden;
      align-items: center;
      /* flex-start plutôt que center : l'horloge doit rester collée en
         haut, pas flotter au milieu d'un bloc lui-même centré dans le
         cercle. Le contenu est désormais assez grand pour occuper
         l'essentiel de la hauteur disponible de toute façon. */
      justify-content: flex-start;
      gap: 3px;
      /* Le contenu est un empilement vertical centré, pas un bloc plein
         cadre : contrairement à un carré inscrit, il n'a pas besoin d'une
         marge symétrique généreuse pour que ses "coins" restent dans le
         cercle (il n'a pas de coins à cet endroit). Marge horizontale
         réduite (les lignes les plus larges — tuiles Aujourd'hui/Semaine —
         sont proches du centre vertical, là où la corde du cercle est la
         plus large) ; un peu plus de marge en haut/bas où le cercle se
         resserre. */
      padding: 5% 6%;
      text-align: center;
    }
    /* flex-shrink:0 sur tous les blocs : sans ça, si le contenu (agrandi
       à la demande) dépasse d'un rien la hauteur fixe du cercle, flexbox
       écrase chaque élément proportionnellement au lieu de déborder —
       ce qui corrompait le rendu du texte (hauteur de ligne comprimée en
       dessous de sa taille de police) plutôt que de simplement déborder
       de façon visible et prévisible pendant les tests. */
    .card.round > * {
      flex-shrink: 0;
    }
    .round-clock {
      font-size: clamp(2.1rem, 20cqw, 3rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    /* Date sous l'horloge, plus grande — lecture au même niveau que
       l'horloge plutôt que noyée dans une ligne d'infos secondaires. */
    .round-date {
      font-size: clamp(1.1rem, 9.5cqw, 1.4rem);
      font-weight: 600;
      margin-top: 1px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Lune + saint, sur leur propre ligne en dessous — plus petit, icône
       collée à son libellé (et non à la date, qu'elle n'illustre pas).
       min-width:0 à chaque niveau flex imbriqué, sinon l'ellipsis du span
       interne n'a jamais l'occasion de se déclencher (un flex-item ne
       rétrécit pas sous sa largeur de contenu par défaut). */
    .round-moon-line {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      color: var(--_secondary-color);
      font-size: clamp(0.85rem, 7cqw, 1.02rem);
      font-weight: 500;
      margin-top: 1px;
      max-width: 100%;
      min-width: 0;
    }
    .round-moon-line span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    .round-date-icon {
      --mdc-icon-size: clamp(13px, 5.2cqw, 17px);
      color: var(--echo-weather-moon-color, #b0bec5);
      flex-shrink: 0;
    }
    /* Icône à gauche, infos (temp/condition/maj) à droite — comme le bloc
       météo actuelle en mise en page large, pour profiter de la largeur
       disponible plutôt que d'empiler verticalement. */
    .round-current {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 14px;
      cursor: pointer;
      margin: 4px 0;
      width: 100%;
      justify-content: center;
    }
    .round-current-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 0;
      text-align: left;
    }
    .round-icon {
      width: clamp(90px, 39cqw, 126px);
      height: clamp(90px, 39cqw, 126px);
      flex-shrink: 0;
      /* Comme .current-icon en mise en page large : c'est la seule icône
         encore animée (SMIL) ici aussi, et elle porte le même filter
         drop-shadow en mode clair (cf. plus bas) — sans sa propre couche
         de composition GPU, cette combinaison avait causé un plafond de
         FPS en mise en page large, et pourrait expliquer des artefacts de
         rendu sur du matériel/pilote GPU capricieux. */
      will-change: transform;
    }
    .round-temp {
      font-size: clamp(2.6rem, 24cqw, 3.7rem);
      font-weight: 800;
      line-height: 1;
    }
    .round-condition {
      color: var(--_secondary-color);
      font-size: clamp(1.1rem, 9.5cqw, 1.35rem);
      font-weight: 500;
      margin-top: 2px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .round-meta {
      color: var(--_secondary-color);
      font-size: clamp(0.75rem, 6.2cqw, 0.92rem);
      font-weight: 600;
      margin-top: 2px;
      white-space: nowrap;
    }
    /* Pied de page sous les deux tuiles Aujourd'hui/Semaine plutôt que
       collée à une donnée du bloc météo actuelle (point de rosée, etc.)
       sans rapport direct — une info de dernière mise à jour se lit
       naturellement en bas d'écran. */
    .round-updated {
      color: var(--_secondary-color);
      font-size: clamp(0.72rem, 5.8cqw, 0.85rem);
      margin-top: 3px;
      white-space: nowrap;
    }
    /* Ligne compacte d'indicateurs (UV, qualité de l'air, vent, point de
       rosée) — juste icône + valeur, pas de libellé, pour tenir sur une
       seule ligne dans le peu d'espace restant. */
    .round-indicators {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5px 10px;
      margin-top: 5px;
      cursor: pointer;
    }
    .round-indicators:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
    }
    .round-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: clamp(1rem, 8.2cqw, 1.2rem);
      font-weight: 700;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .round-chip ha-icon {
      --mdc-icon-size: clamp(18px, 7cqw, 22px);
      flex-shrink: 0;
    }
    .round-launchers {
      display: flex;
      gap: 9px;
      margin-top: 6px;
    }
    .round-launcher {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 9px 13px;
      border-radius: 16px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
      cursor: pointer;
    }
    .round-launcher-top {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: clamp(1rem, 8.2cqw, 1.2rem);
      font-weight: 600;
      white-space: nowrap;
    }
    .round-launcher-preview {
      font-size: clamp(0.85rem, 7cqw, 1.02rem);
      font-weight: 600;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .round-launcher:focus-visible,
    .round-current:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
    }
    .round-launcher-top ha-icon {
      --mdc-icon-size: clamp(19px, 7.4cqw, 23px);
      flex-shrink: 0;
    }
    .round-chevron {
      --mdc-icon-size: clamp(18px, 6.8cqw, 22px);
      color: var(--_secondary-color);
      flex-shrink: 0;
    }
    :host(.light) .round-icon {
      filter: drop-shadow(0 0 2px rgba(10, 20, 30, 0.45))
        drop-shadow(0 0 5px rgba(10, 20, 30, 0.25));
    }

    /* --- Dialogues en mode round : boîte volontairement petite pour que
       même ses coins (pas juste son contenu) restent dans le cercle visible
       — le bouton fermer d'origine (haut-droite, cf. .detail-close) était
       justement dans la zone la plus susceptible d'être sous le boîtier
       physique. Remplacé par un bouton retour, centré, dans le flux normal
       (toujours après le contenu défilable — jamais de chevauchement
       possible, contrairement à un positionnement absolu calé au pixel). */
    ha-dialog.round-dialog {
      --mdc-dialog-min-width: 230px;
      --mdc-dialog-max-width: 230px;
    }
    .round-dialog-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .detail-list.round-detail {
      max-height: 280px;
      text-align: center;
    }
    .round-detail .detail-header {
      justify-content: center;
    }
    .round-back {
      width: 34px;
      height: 34px;
      --mdc-icon-size: 18px;
      border-radius: 50%;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--_text-color);
      flex-shrink: 0;
    }
    .round-back:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
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
