import { LitElement, html, css, nothing } from "lit";
import { CARD_TAG, DEFAULT_CONFIG } from "./const.js";
import { conditionToIconSlug, iconUrl } from "./icons.js";
import { formatShortDate, formatTime, localizeCondition } from "./format.js";

// Réplique en vraie carte Lit de l'écran d'accueil (horloge + météo
// compacte) fourni par le template View Assist par défaut (button-card
// "variable_template" + "responsive_base" + "body_template"), version
// personnalisée par l'utilisateur : horloge géante, mini bloc météo
// cliquable (navigue vers la vue météo via view_assist.navigate), fond
// dynamique fourni par l'entité satellite, mode nuit (fond masqué,
// horloge rouge atténuée, date masquée) piloté par son attribut `mode`.
class EchoHomeCard extends LitElement {
  static properties = {
    _config: { state: true },
  };

  // Aucune entité n'est requise : sans rien configurer, la carte reste une
  // horloge plein écran sur fond dégradé — satellite_entity et
  // weather_entity ajoutent respectivement le fond dynamique/mode nuit et
  // le bloc météo, mais rien ne casse en leur absence.
  setConfig(config) {
    const merged = {
      ...DEFAULT_CONFIG,
      ...config,
      icons: { ...DEFAULT_CONFIG.icons, ...(config?.icons || {}) },
    };
    this._config = this._validateConfig(merged, config || {});
  }

  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que de casser le rendu — cf. echo-weather-card.
  _validateConfig(merged, rawConfig) {
    const warn = (key, fallback) =>
      console.warn(
        `[echo-home-card] "${key}" invalide (${JSON.stringify(rawConfig[key])}), valeur par défaut utilisée (${JSON.stringify(fallback)})`
      );

    if (merged.layout !== null && merged.layout !== "round") {
      warn("layout", DEFAULT_CONFIG.layout);
      merged.layout = DEFAULT_CONFIG.layout;
    }
    if (
      typeof merged.zoom !== "number" ||
      !Number.isFinite(merged.zoom) ||
      merged.zoom <= 0
    ) {
      warn("zoom", DEFAULT_CONFIG.zoom);
      merged.zoom = DEFAULT_CONFIG.zoom;
    }
    // Non bloquant : juste pour éviter la surprise silencieuse d'un bloc
    // météo affiché mais qui ne réagit jamais au tap faute d'id à passer
    // au service view_assist.navigate.
    if (merged.dashboard && !merged.navigate_device && !merged.satellite_entity) {
      console.warn(
        "[echo-home-card] \"dashboard\" est configuré mais ni \"navigate_device\" ni \"satellite_entity\" ne fournissent d'id à passer au service view_assist.navigate — le bloc météo ne sera pas cliquable."
      );
    }
    return merged;
  }

  static getStubConfig(hass) {
    const weatherEntity = Object.keys(hass.states).find((id) =>
      id.startsWith("weather.")
    );
    return weatherEntity ? { weather_entity: weatherEntity } : {};
  }

  getCardSize() {
    return 6;
  }

  connectedCallback() {
    super.connectedCallback();
    // Horloge : un simple tick à la minute (pas une boucle d'animation),
    // ne redéclenche un rendu que si horloge ou date sont effectivement
    // affichées.
    this._clockTimer = setInterval(() => {
      if (this._config?.show_clock || this._config?.show_date) {
        this.requestUpdate();
      }
    }, 30000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._clockTimer);
  }

  set hass(hass) {
    const prevSatellite = this._hass?.states[this._config?.satellite_entity];
    const prevWeather = this._hass?.states[this._config?.weather_entity];
    this._hass = hass;
    if (!this._config) return;

    const nextSatellite = hass.states[this._config.satellite_entity];
    const nextWeather = hass.states[this._config.weather_entity];
    if (prevSatellite !== nextSatellite || prevWeather !== nextWeather) {
      this.requestUpdate();
    }
  }

  get hass() {
    return this._hass;
  }

  // Jour/nuit astronomique, uniquement pour choisir la bonne variante
  // d'icône météo (ex: partiellement nuageux jour/nuit) — sans rapport
  // avec le mode nuit "écran de chevet" de l'entité satellite ci-dessous.
  _isDarkOutside() {
    const sunObj = this._hass.states[this._config.sun_entity || "sun.sun"];
    return sunObj?.state === "below_horizon";
  }

  // Mode nuit "écran de chevet" : piloté par l'attribut `mode` de l'entité
  // satellite View Assist (mode: "night"), pas par l'heure — c'est
  // l'utilisateur (ou une automatisation côté HA) qui décide quand
  // l'écran doit s'assombrir, pas la carte.
  _isNightMode(satelliteState) {
    return satelliteState?.attributes?.mode === "night";
  }

  // Résout la valeur CSS `background` de la carte : l'option `background`
  // prime toujours (override manuel, ex: couleur unie ou transparent),
  // puis l'image dynamique fournie par l'attribut `background` du
  // satellite, sinon le dégradé par défaut défini en CSS. En mode nuit,
  // aucune image : la carte reste unie (peu de lumière émise, pas de
  // fond chargé pour rien puisqu'invisible).
  _backgroundValue(satelliteState, isNightMode) {
    if (this._config.background != null) return this._config.background;
    if (isNightMode) return null;
    const url = satelliteState?.attributes?.background;
    return url ? `center / cover no-repeat url("${url}")` : null;
  }

  _cardStyle(backgroundValue) {
    const parts = [];
    if (backgroundValue != null) parts.push(`background:${backgroundValue}`);
    if (this._config.zoom != null && this._config.zoom !== 1) {
      parts.push(`zoom:${this._config.zoom}`);
    }
    return parts.join(";");
  }

  _weatherClickable() {
    return Boolean(
      this._config.dashboard &&
        (this._config.navigate_device || this._config.satellite_entity)
    );
  }

  // Service view_assist.navigate, mêmes clés que le button-card d'origine
  // (device + path) — `device` accepte l'id de l'entité satellite.
  _navigateToWeather() {
    if (!this._weatherClickable()) return;
    const device = this._config.navigate_device || this._config.satellite_entity;
    const path = `${this._config.dashboard}/${this._config.weather_view}`;
    this._hass.callService("view_assist", "navigate", { device, path });
  }

  _onWeatherKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._navigateToWeather();
    }
  }

  render() {
    if (!this._config || !this._hass) return nothing;
    const cfg = this._config;

    const satelliteState = cfg.satellite_entity
      ? this._hass.states[cfg.satellite_entity]
      : undefined;
    const isNightMode = this._isNightMode(satelliteState);
    // Classe posée sur l'hôte (comme le mode clair/sombre de
    // echo-weather-card) : tout le reste de la feuille de style s'adapte
    // à travers les tokens CSS plutôt que par des conditions dans le
    // template.
    this.classList.toggle("night", isNightMode);

    const locale = cfg.language || this._hass.locale?.language || "en";
    const timeFormat =
      cfg.time_format || this._hass.locale?.time_format || "24";
    const now = new Date();

    const weatherState = cfg.weather_entity
      ? this._hass.states[cfg.weather_entity]
      : undefined;
    // Le bloc météo n'a pas sa place la nuit : c'est justement ce que le
    // mode nuit cherche à éviter (lumière/information superflue sur un
    // écran de chevet). Entité absente/indisponible => bloc simplement
    // absent, pas d'erreur affichée (aucune entité n'est requise ici).
    const showWeather =
      cfg.show_weather &&
      !isNightMode &&
      weatherState &&
      !["unavailable", "unknown"].includes(weatherState.state) &&
      weatherState.attributes.temperature != null;

    const backgroundValue = this._backgroundValue(satelliteState, isNightMode);
    const cardStyle = this._cardStyle(backgroundValue);
    const isRound = cfg.layout === "round";

    return html`
      <div class="card ${isRound ? "round" : ""}" style=${cardStyle}>
        <div class="shader"></div>
        ${showWeather ? this._renderWeather(weatherState) : nothing}
        <div class="clockgroup">
          ${cfg.show_clock
            ? html`<div class="clock">${formatTime(now, locale, timeFormat)}</div>`
            : nothing}
          ${cfg.show_date && !isNightMode
            ? html`<div class="date">${formatShortDate(now, locale)}</div>`
            : nothing}
        </div>
      </div>
    `;
  }

  _renderWeather(weatherState) {
    const slug = conditionToIconSlug(weatherState.state, this._isDarkOutside());
    const url = iconUrl(slug, this._config.icons);
    // Une décimale + unité (ex: "21.4°C"), comme la var_weather_temperature
    // d'origine — pas un entier arrondi sans unité.
    const temp = Number(weatherState.attributes.temperature).toFixed(1);
    const tempUnit = weatherState.attributes.temperature_unit || "°C";
    const label = localizeCondition(this._hass, weatherState.state);
    const clickable = this._weatherClickable();

    return html`
      <div
        class="weather ${clickable ? "clickable" : ""}"
        role=${clickable ? "button" : nothing}
        tabindex=${clickable ? "0" : nothing}
        aria-label="${label}, ${temp}${tempUnit}"
        @click=${clickable ? () => this._navigateToWeather() : nothing}
        @keydown=${clickable ? (e) => this._onWeatherKeydown(e) : nothing}
      >
        <img class="weather-icon" src=${url} alt="" />
        <span class="weather-temp">${temp}${tempUnit}</span>
      </div>
    `;
  }

  static styles = css`
    /* Contrairement à echo-weather-card, pas besoin ici de la mécanique
       clamp()+cqw / repli vw (container queries, Chromium 105+ — cf.
       gotchas WebView embarqué) : cette carte est pensée pour occuper
       tout l'écran d'un smart display (fond de vue View Assist), pas
       pour être redimensionnée dans une grille Lovelace. Ses tailles
       fluides se basent donc directement sur vh/vmin (viewport),
       supportés depuis bien plus longtemps que les container queries et
       sans repli à prévoir. */
    :host {
      display: block;
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      /* Proportions reprises telles quelles du button-card d'origine
         (View Assist, personnalisé par l'utilisateur) : horloge à 55vh
         (volontairement plus grande que sa propre bande de grille,
         cf. .card ci-dessous), date et température météo toutes deux à
         15vh — même poids visuel, pas un sous-titre discret. Les
         clamp() ne sont là qu'en garde-fou (écran extrême), pas pour
         réduire la cible vh. */
      --_clock-size: var(--echo-home-clock-size, clamp(6rem, 55vh, 20rem));
      --_date-size: var(--echo-home-date-size, clamp(2rem, 15vh, 6rem));
      --_weather-icon-size: var(
        --echo-home-weather-icon-size,
        clamp(48px, 16vh, 130px)
      );
      --_weather-temp-size: var(
        --echo-home-weather-temp-size,
        clamp(1.8rem, 15vh, 5rem)
      );
      --_text-color: var(--echo-home-text-color, #ffffff);
      /* "red" tel quel par défaut (pas une teinte adoucie) : c'est
         volontairement discret/peu lumineux plutôt que joli — usage
         écran de chevet, cf. --_night-opacity ci-dessous. */
      --_night-color: var(--echo-home-night-color, red);
      --_night-opacity: var(--echo-home-night-opacity, 0.35);
      --_shader-color: var(--echo-home-shader-color, rgba(0, 0, 0, 0.15));
      --_radius: var(--echo-home-radius, 0px);
      --_default-bg: radial-gradient(
        130% 140% at 18% -10%,
        #1f3350 0%,
        #111e30 45%,
        #0a1424 100%
      );
      font-family: var(
        --echo-home-font-family,
        var(--primary-font-family, inherit)
      );
      color: var(--_text-color);
    }

    .card {
      position: relative;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: var(--_radius);
      background: var(--_default-bg);
      background-color: #0a1424;
      background-size: cover;
      background-position: center;
    }

    /* Écran rond (Echo Spot) : la carte se clippe elle-même en cercle
       plutôt que de compter sur le boîtier physique — cf. gotchas
       matériel. */
    .card.round {
      border-radius: 50%;
    }

    /* Assombrit légèrement toute image de fond pour garder l'horloge
       lisible dessus, jour comme nuit (sans effet en mode nuit puisqu'il
       n'y a alors pas d'image de fond, cf. _backgroundValue). */
    .shader {
      position: absolute;
      inset: 0;
      background: var(--_shader-color);
      pointer-events: none;
    }

    /* Horloge centrée sur toute la hauteur de la carte, indépendamment
       du bloc météo (positionné à part, cf. .weather ci-dessous) et de
       la date. Un flex column + justify-content:center centrerait le
       *groupe* horloge+date, pas l'horloge elle-même — comme la date est
       bien plus petite, ça tirait visiblement l'horloge au-dessus du
       centre réel de l'écran (repéré par l'utilisateur en comparant au
       rendu attendu). Positionnement absolu à la place : l'horloge est
       calée pile au centre, la date juste en dessous (décalée de la
       moitié de la taille de l'horloge + un petit espace, via
       --_clock-size plutôt qu'une valeur fixe pour rester correcte en
       mode round où --_clock-size est redéfinie, cf. .card.round). */
    .clockgroup {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .clock {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--_clock-size);
      font-weight: 700;
      line-height: 1;
      color: var(--_text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      transition: color 0.4s ease, opacity 0.4s ease;
    }

    :host(.night) .clock {
      color: var(--_night-color);
      opacity: var(--_night-opacity);
    }

    .date {
      position: absolute;
      top: 50%;
      left: 50%;
      /* line-height: 1 est nécessaire ici, pas que par cohérence avec
         .clock : le line-height par défaut du navigateur (~1.2) ajoutait
         un espace vide sous le texte assez grand pour pousser la date
         hors de l'écran (repéré par mesure exacte du rendu, pas à l'œil
         — le débordement se clippe silencieusement via overflow:hidden
         sur .card, sans erreur visible). */
      line-height: 1;
      transform: translate(-50%, calc(var(--_clock-size) * 0.5 + 0.3em));
      font-size: var(--_date-size);
      color: var(--_text-color);
      opacity: 0.85;
      white-space: nowrap;
    }

    .weather {
      position: absolute;
      top: clamp(12px, 4vh, 28px);
      left: clamp(12px, 5%, 32px);
      z-index: 1;
      display: flex;
      align-items: center;
      gap: clamp(6px, 1.2vw, 14px);
    }

    /* En mode round, un bloc météo calé à gauche tomberait sous le
       boîtier physique (coin clippé) — cf. gotchas écran rond. Centré
       en haut à la place. */
    .card.round .weather {
      left: 50%;
      top: clamp(28px, 15%, 56px);
      transform: translateX(-50%);
    }

    .weather.clickable {
      cursor: pointer;
    }
    .weather.clickable:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 4px;
      border-radius: 8px;
    }

    .weather-icon {
      width: var(--_weather-icon-size);
      height: var(--_weather-icon-size);
      flex-shrink: 0;
    }

    .weather-temp {
      font-size: var(--_weather-temp-size);
      font-weight: 600;
      color: var(--_text-color);
    }

    /* Tailles round : vmin plutôt que vh, pour rester correct même si la
       carte n'est pas exactement carrée (aperçu dans une fenêtre large,
       par exemple) — cf. même logique que echo-weather-card en mode
       round. Valeurs propres à ce layout (pas de variable CSS exposée),
       comme pour echo-weather-card. Redéfinies comme tokens (pas comme
       overrides directs de .clock/.date/...) pour que le calc() du
       décalage de la date (cf. .date ci-dessus) reste juste ici aussi. */
    .card.round {
      --_clock-size: clamp(3.6rem, 48vmin, 11rem);
      --_date-size: clamp(1.4rem, 12vmin, 3.2rem);
      --_weather-icon-size: clamp(36px, 13vmin, 72px);
      --_weather-temp-size: clamp(1.4rem, 12vmin, 2.8rem);
    }
  `;
}

customElements.define(CARD_TAG, EchoHomeCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: "Echo Home Card",
  description:
    "Écran d'accueil horloge + météo compacte pour smart displays (Echo Show 5, View Assist).",
});
