import { LitElement, html, svg, css, nothing } from "lit";
import { CARD_TAG, DEFAULT_CONFIG } from "./const.js";
import { conditionToIconSlug, iconUrl } from "./icons.js";
import { formatShortDate, formatTime, localizeCondition } from "./format.js";

// Choix digital/analogique retenu au-delà du rechargement de page — un
// device (Echo Spot) ne montre en pratique qu'une seule instance de la
// carte à la fois, une clé fixe suffit (pas besoin de la scoper par
// entité/config).
const CLOCK_FACE_STORAGE_KEY = "echo-home-card-clock-face";

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
    _clockFace: { state: true },
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
    // Seulement au tout premier setConfig : Lovelace peut rappeler
    // setConfig plusieurs fois (édition live du YAML) et on ne veut pas
    // écraser un choix déjà fait par l'utilisateur via le bouton.
    if (this._clockFace === undefined) {
      this._clockFace = this._initClockFace();
    }
  }

  // Le choix retenu en localStorage prime sur clock_face (valeur de
  // config, juste un point de départ) — cf. _toggleClockFace.
  _initClockFace() {
    try {
      const saved = localStorage.getItem(CLOCK_FACE_STORAGE_KEY);
      if (saved === "digital" || saved === "analog") return saved;
    } catch {
      // localStorage indisponible (mode privé, restrictions WebView) :
      // repli silencieux sur la config, pas de mémorisation possible.
    }
    return this._config.clock_face;
  }

  _toggleClockFace() {
    this._clockFace = this._clockFace === "analog" ? "digital" : "analog";
    try {
      localStorage.setItem(CLOCK_FACE_STORAGE_KEY, this._clockFace);
    } catch {
      // Pas grave si ça ne persiste pas : le bouton reste utilisable
      // pour la session en cours.
    }
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
    if (!["digital", "analog"].includes(merged.clock_face)) {
      warn("clock_face", DEFAULT_CONFIG.clock_face);
      merged.clock_face = DEFAULT_CONFIG.clock_face;
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
    const isRound = cfg.layout === "round";
    // L'horloge analogique n'a de sens que sur l'écran circulaire de
    // l'Echo Spot — celui qui l'avait à l'origine sous Alexa. Sur
    // l'Echo Show (paysage), toujours digitale, pas de bouton. C'est un
    // véritable écran alternatif, pas juste une autre police d'horloge :
    // comme sur l'Echo Spot d'origine, juste les aiguilles sur un fond
    // uni — pas de photo de fond, pas de météo, pas de date.
    const showAnalog = isRound && this._clockFace === "analog";
    // Le bloc météo n'a pas sa place la nuit : c'est justement ce que le
    // mode nuit cherche à éviter (lumière/information superflue sur un
    // écran de chevet). Entité absente/indisponible => bloc simplement
    // absent, pas d'erreur affichée (aucune entité n'est requise ici).
    const showWeather =
      !showAnalog &&
      cfg.show_weather &&
      !isNightMode &&
      weatherState &&
      !["unavailable", "unknown"].includes(weatherState.state) &&
      weatherState.attributes.temperature != null;

    // Pas de fond dynamique/dégradé habituel en analogique de jour : la
    // couleur unie vient de la règle CSS .card.analog (cf. static
    // styles) — un style à part, pas une variation du digital. La nuit,
    // on retombe sur le traitement nuit habituel (fond masqué) malgré
    // tout, cf. :host(.night) .card.analog qui reprend le dessus.
    const backgroundValue =
      showAnalog && !isNightMode
        ? null
        : this._backgroundValue(satelliteState, isNightMode);
    const cardStyle = this._cardStyle(backgroundValue);

    return html`
      <div
        class="card ${isRound ? "round" : ""} ${showAnalog ? "analog" : ""}"
        style=${cardStyle}
      >
        ${showAnalog ? nothing : html`<div class="shader"></div>`}
        ${showWeather ? this._renderWeather(weatherState) : nothing}
        <div class="clockgroup">
          ${cfg.show_clock
            ? showAnalog
              ? this._renderAnalogClock(now, locale, timeFormat)
              : html`<div class="clock">${formatTime(now, locale, timeFormat)}</div>`
            : nothing}
          ${cfg.show_date && !isNightMode && !showAnalog
            ? html`<div class="date">${formatShortDate(now, locale)}</div>`
            : nothing}
        </div>
        ${isRound && !isNightMode ? this._renderClockToggle(showAnalog) : nothing}
      </div>
    `;
  }

  // Cadran analogique en SVG : pensé pour rappeler l'horloge ronde de
  // l'Echo Spot d'origine (avant LineageOS/View Assist), en alternative
  // au digital. Diamètre indépendant de --_clock-size (qui pilote une
  // taille de police, pas un diamètre) — cf. --_analog-size et
  // .card.round.analog .date, qui a donc sa propre position plutôt que
  // de réutiliser le calcul basé sur --_clock-size.
  //
  // Tout est construit avec le tag `svg` de Lit (pas `html`), y compris
  // les graduations générées en boucle : un sous-template `html` séparé
  // pour un élément SVG (ex: chaque <line> de graduation dans son propre
  // `html\`...\`` avant d'être inséré dans le <svg> englobant) atterrit
  // dans le mauvais espace de noms (xhtml, pas svg) et ne s'affiche pas
  // — piège classique de Lit avec du SVG composé/généré dynamiquement,
  // repéré ici en inspectant `line.namespaceURI` sur le rendu réel.
  _renderAnalogClock(now, locale, timeFormat) {
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const hourAngle = hours * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6;
    // Graduations proches du bord (rayon max ~49 sur un viewBox de 50) :
    // le cadran est pensé plein écran (cf. --_analog-size), pas un petit
    // médaillon au milieu — donc pas de marge à ménager entre les
    // graduations et le bord du cercle comme sur une version plus petite.
    // Écran dédié, sans météo ni date superposées (cf. render()) : les
    // 12 graduations sont toutes affichées, rien à éviter.
    const ticks = [];
    for (let i = 0; i < 12; i++) {
      const major = i % 3 === 0;
      ticks.push(svg`
        <line
          class="tick"
          x1="50"
          y1=${major ? 3 : 5}
          x2="50"
          y2=${major ? 12 : 9}
          stroke-width=${major ? 2 : 1}
          transform="rotate(${i * 30} 50 50)"
        />
      `);
    }
    return html`
      <svg
        class="analog-clock"
        viewBox="0 0 100 100"
        role="img"
        aria-label=${formatTime(now, locale, timeFormat)}
      >
        <g class="ticks">${ticks}</g>
        <line
          class="hand hand-hour"
          x1="50"
          y1="50"
          x2="50"
          y2="27"
          transform="rotate(${hourAngle} 50 50)"
        />
        <line
          class="hand hand-minute"
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          transform="rotate(${minuteAngle} 50 50)"
        />
        <circle class="hand-center" cx="50" cy="50" r="2" />
      </svg>
    `;
  }

  // Petit bouton discret (mode round uniquement, masqué la nuit comme le
  // reste — pas de lumière/info superflue sur un écran de chevet) pour
  // basculer digital ↔ analogique. L'icône affichée est celle du cadran
  // vers lequel on bascule (convention usuelle pour un bouton toggle),
  // pas celle du cadran actuel.
  _renderClockToggle(showAnalog) {
    const icon = showAnalog ? "mdi:clock-digital" : "mdi:clock-outline";
    const label = showAnalog
      ? "Afficher l'horloge digitale"
      : "Afficher l'horloge analogique";
    return html`
      <button
        type="button"
        class="clock-toggle"
        aria-label=${label}
        title=${label}
        @click=${() => this._toggleClockFace()}
      >
        <ha-icon icon=${icon}></ha-icon>
      </button>
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
      /* La version précédente égalisait les *boîtes* CSS horloge/date
         (line-height:1), pas l'encre visible du texte — repéré avec une
         règle en pixels superposée sur une capture : la police (Nunito)
         réserve nettement plus d'espace vide sous le texte que dessus
         dans sa boîte de ligne (métriques mesurées via Canvas
         measureText : ~11% de la hauteur de l'horloge inutilisée en
         haut, ~15% en bas ; ~6% en haut / ~15% en bas pour la date —
         cf. les chiffres n'atteignent jamais la hauteur d'ascendante
         complète, contrairement à "Dim." avec sa majuscule). D'où
         l'écart visuel malgré des boîtes CSS symétriques. Coefficients
         ci-dessous ajustés à partir de ces mesures réelles (pas
         théoriques) pour que l'*encre* visible soit centrée dans
         l'espace sous l'horloge, pas la boîte. Toujours basé sur
         --_clock-size/--_date-size (donc correct en mode round aussi),
         mais avec des coefficients propres à Nunito — à réajuster si la
         police change (voir --echo-home-font-family). */
      /* +0.08*D par rapport au calage "encre parfaitement centrée"
         ci-dessus : léger rapprochement de l'horloge, demandé par
         l'utilisateur une fois la symétrie de base en place. */
      top: calc(75% + var(--_clock-size) * 0.175 - var(--_date-size) * 0.5315);
      left: 50%;
      transform: translateX(-50%);
      line-height: 1;
      font-size: var(--_date-size);
      color: var(--_text-color);
      opacity: 0.85;
      white-space: nowrap;
    }

    .weather {
      position: absolute;
      top: clamp(8px, 3vh, 20px);
      left: clamp(8px, 3.5%, 22px);
      z-index: 1;
      display: flex;
      align-items: center;
      gap: clamp(6px, 1.2vw, 14px);
    }

    /* En mode round, l'espace disponible sous la date se rétrécit vite
       (courbe du cercle) — le calage "encre centrée dans l'espace
       jusqu'au bas de la carte" utilisé en paysage (cf. .date ci-dessus)
       n'a pas de sens ici : il n'y a pas de vrai "bas d'écran" plat,
       juste une courbe qui grignote progressivement la largeur
       disponible. Remontée par rapport au calcul paysage pour rester
       dans la partie encore confortablement large du cercle plutôt que
       de s'approcher de la pointe basse. */
    .card.round .date {
      top: calc(75% + var(--_clock-size) * 0.175 - var(--_date-size) * 0.86);
    }

    /* En mode round, un bloc météo calé à gauche tomberait sous le
       boîtier physique (coin clippé) — cf. gotchas écran rond. Centré
       en haut à la place. */
    .card.round .weather {
      left: 50%;
      top: clamp(20px, 11%, 40px);
      transform: translateX(-50%);
    }

    /* Cadran analogique (mode round uniquement) : un écran à part, pas
       une variante du digital — comme sur l'Echo Spot d'origine sous
       Alexa (avant LineageOS/View Assist) : juste les aiguilles en plein
       écran sur un fond uni, sans photo, météo ni date (masquées dans
       render()). --_analog-size est un pourcentage du conteneur (quasi
       100%, cf. .card.round plus bas), pas un diamètre fixe en px, pour
       suivre la taille réelle de la carte. */
    .card.analog {
      background: var(
        --echo-home-analog-background,
        radial-gradient(130% 130% at 25% 15%, #2f6fb3 0%, #163c66 55%, #0a1f38 100%)
      );
    }

    /* La nuit, même en analogique, on retombe sur le traitement nuit
       habituel (fond quasi noir) plutôt que le bleu — l'objectif du mode
       nuit (peu de lumière émise sur un écran de chevet) prime sur le
       style du cadran. */
    :host(.night) .card.analog {
      background: var(--_default-bg);
      background-color: #0a1424;
    }

    .analog-clock {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--_analog-size);
      height: var(--_analog-size);
      color: var(--_text-color);
      transition: color 0.4s ease, opacity 0.4s ease;
    }

    :host(.night) .analog-clock {
      color: var(--_night-color);
      opacity: var(--_night-opacity);
    }

    .analog-clock .tick {
      stroke: currentColor;
      opacity: 0.75;
    }

    .analog-clock .hand {
      stroke: currentColor;
      stroke-linecap: round;
    }

    .analog-clock .hand-hour {
      stroke-width: 4;
    }

    .analog-clock .hand-minute {
      stroke-width: 2.6;
    }

    .analog-clock .hand-center {
      fill: currentColor;
    }

    /* Bouton discret pour basculer digital ↔ analogique — masqué la nuit
       (cf. render(), même logique que la météo/la date : pas de lumière
       ni d'info superflue sur un écran de chevet). Docké près du bas :
       même à quelques px du bord, le cercle y offre encore largement
       assez de largeur pour un petit bouton (contrairement à une ligne
       de texte, cf. .card.round .date plus haut). */
    .clock-toggle {
      position: absolute;
      left: 50%;
      bottom: clamp(10px, 5%, 20px);
      transform: translateX(-50%);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--_text-color);
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 0.2s ease;
      --mdc-icon-size: 20px;
    }

    .clock-toggle:hover,
    .clock-toggle:focus-visible {
      opacity: 1;
    }

    .clock-toggle:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
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
      --_clock-size: clamp(4rem, 50vmin, 13rem);
      --_date-size: clamp(1.6rem, 13vmin, 3.6rem);
      --_weather-icon-size: clamp(40px, 14vmin, 84px);
      --_weather-temp-size: clamp(1.6rem, 13vmin, 3.2rem);
      /* % plutôt qu'un clamp() en px/vmin : le cadran doit occuper
         quasiment tout le disque visible (cf. commentaire sur
         .analog-clock), donc suivre directement la taille réelle de la
         carte plutôt qu'une cible de taille indépendante. 94% plutôt
         que 100% pour une petite marge entre les graduations et le bord
         clippé en cercle (évite un rendu "coupé net" à l'anticrénelage
         près). */
      --_analog-size: 94%;
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
