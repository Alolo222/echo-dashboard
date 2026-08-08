import { LitElement, html, css, nothing } from "lit";
import { CARD_TAG, DEFAULT_CONFIG } from "./const.js";
import { conditionToIconSlug, iconUrl, getStaticIconUrl } from "./icons.js";
import {
  formatDate,
  formatHour,
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
        <div class="current-icon-wrap">
          <img class="current-icon" src=${url} alt=${conditionLabel} />
        </div>
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
          ${showUv || showHumidityLine
            ? html`
                <div class="uv-group">
                  ${showUv ? this._renderIndicators(uvObj) : nothing}
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

  // Indice UV, à droite de la température — tuile à deux lignes (libellé
  // au-dessus, valeur + catégorie qualitative en dessous). L'UV a une
  // échelle universelle (OMS) donc la catégorie (Faible/Modéré/Élevé/...)
  // est fiable à afficher automatiquement, contrairement à la qualité de
  // l'air (mise de côté pour le moment : son échelle dépend entièrement
  // de l'entité choisie par l'utilisateur, pas de seuils génériques
  // fiables sans plus d'info — cf. air_quality_entity, toujours en
  // config mais non affiché ici pour l'instant). L'appelant a déjà
  // vérifié que uvObj est utilisable (évite de refaire le lookup ici).
  _renderIndicators(uvObj) {
    const category = uvCategory(uvObj.state);
    return html`
      <div class="indicator-box indicator-uv">
        <div class="indicator-label">Indice UV</div>
        <div class="indicator-row">
          <span class="indicator-value">${uvObj.state}</span>
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
            <div class="daily-item">
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
    .current-icon-wrap {
      position: relative;
      width: var(--_current-icon-size);
      height: var(--_current-icon-size);
      flex-shrink: 0;
    }
    .current-icon {
      position: relative;
      width: 100%;
      height: 100%;
      display: block;
    }
    /* Halo de lisibilité en mode clair pour l'icône actuelle : un dégradé
       radial statique derrière l'icône plutôt qu'un filter drop-shadow
       (cf. commentaire plus bas sur .hourly-icon/.daily-icon) — un fond
       qui ne change jamais est peint une seule fois par le compositeur,
       sans recalcul à chaque frame de l'icône animée par-dessus. */
    :host(.light) .current-icon-wrap::before {
      content: "";
      position: absolute;
      inset: 4%;
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        rgba(10, 20, 30, 0.32) 0%,
        rgba(10, 20, 30, 0.16) 55%,
        rgba(10, 20, 30, 0) 78%
      );
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
       traits clairs sans plaque/cercle disgracieux derrière.
       Volontairement PAS appliqué à .current-icon : c'est la seule icône
       encore animée (SMIL), et un drop-shadow sur un contenu qui change à
       chaque frame doit être recalculé à chaque frame (contrairement à un
       contenu statique, mis en cache après le premier paint) — sur le GPU
       modeste de l'Echo Show 5, ça suffisait à plafonner l'animation à
       ~10fps. Les icônes horaires/quotidiennes sont figées (cf. icons.js)
       donc le filtre n'y coûte plus qu'un calcul unique. */
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
