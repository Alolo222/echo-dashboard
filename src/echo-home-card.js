import { LitElement, html, svg, css, nothing } from "lit";
import { CARD_TAG, DEFAULT_CONFIG } from "./const.js";
import { conditionToIconSlug, iconUrl } from "./icons.js";
import { formatShortDate, formatTime, localizeCondition } from "./format.js";
import { ANALOG_STYLES, DEFAULT_ANALOG_STYLE } from "./analog-styles.js";
import {
  BackgroundSource,
  DYNAMIC_BACKGROUND_TYPES,
  normalizeBackgroundConfig,
  validateBackgroundConfig,
} from "./background.js";

// Choix digital/analogique retenu au-delà du rechargement de page — un
// device (Echo Spot) ne montre en pratique qu'une seule instance de la
// carte à la fois, une clé fixe suffit (pas besoin de la scoper par
// entité/config).
const CLOCK_FACE_STORAGE_KEY = "echo-home-card-clock-face";

// Repère "pire cas" pour la largeur de l'heure/la date (cf.
// _fitOverflowingText) — jamais utilisé pour l'affichage réel. Heure et
// jour à deux chiffres : 27/01/2000 12:59. 12 convient aux deux formats
// (rendu "12" aussi bien en 12h qu'en 24h, contrairement à un jour comme
// le 1er qui ne couvrirait que le cas à un chiffre) ; 27 couvre le jour
// du mois à deux chiffres, la principale source de variation de largeur
// de la date (l'abréviation du jour/du mois varie aussi selon la
// langue, mais dans une bien moindre mesure qu'un chiffre en plus).
const CLOCK_FIT_PROBE_DATE = new Date(2000, 0, 27, 12, 59);

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

  // Une source par présentation (digital/analogique), chacune avec son
  // propre réglage indépendant (background/analog_background, cf.
  // const.js) — cf. src/background.js. onChange redéclenche un rendu
  // Lit quand une résolution/rotation asynchrone (dossier Media Source,
  // plusieurs URLs) change la valeur CSS courante ; render() n'attend
  // jamais cette résolution, il lit juste le dernier résultat connu
  // (`.cssValue`, synchrone).
  constructor() {
    super();
    this._digitalBackground = new BackgroundSource(() => this.requestUpdate());
    this._analogBackground = new BackgroundSource(() => this.requestUpdate());
  }

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
    if (!Object.keys(ANALOG_STYLES).includes(merged.analog_style)) {
      warn("analog_style", DEFAULT_CONFIG.analog_style);
      merged.analog_style = DEFAULT_CONFIG.analog_style;
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

    // background/analog_background acceptent trois formes historiques
    // (chaîne CSS, null, et pour analog_background_photo un booléen) en
    // plus de la forme objet {type, ...} — normalizeBackgroundConfig les
    // ramène toutes à cette dernière une fois pour toutes ici, le reste
    // du composant (cf. render(), src/background.js) ne connaît que la
    // forme objet. Message plus générique que `warn` ci-dessus (pas de
    // valeur brute à afficher pour un champ imbriqué comme
    // "background.fit").
    const warnBg = (key, fallback) =>
      console.warn(
        `[echo-home-card] "${key}" invalide, valeur par défaut utilisée (${JSON.stringify(fallback)})`
      );
    merged.background = validateBackgroundConfig(
      normalizeBackgroundConfig(merged.background, false, "satellite"),
      ["css", ...DYNAMIC_BACKGROUND_TYPES],
      "satellite",
      "background",
      warnBg
    );
    let analogBackground = validateBackgroundConfig(
      normalizeBackgroundConfig(
        merged.analog_background,
        merged.analog_background_photo,
        "style"
      ),
      ["style", "css", ...DYNAMIC_BACKGROUND_TYPES],
      "style",
      "analog_background",
      warnBg
    );
    // Jamais de fond dynamique/photo en mode round, quel que soit
    // analog_background : l'écran à part sur fond uni reproduit
    // volontairement l'Echo Spot d'origine (cf. Horloge analogique,
    // README), un principe plus ancien que cette option et pas remis en
    // cause par elle.
    if (
      merged.layout === "round" &&
      DYNAMIC_BACKGROUND_TYPES.includes(analogBackground.type)
    ) {
      warnBg("analog_background.type", "style");
      analogBackground = { type: "style" };
    }
    merged.analog_background = analogBackground;

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
    // Recalcule le fit-scale (cf. _fitOverflowingText) si la carte
    // change de taille — pas pour suivre le vh/vmin de l'horloge
    // elle-même (déjà fluide via CSS), mais parce qu'un simple
    // redimensionnement ne redéclenche pas `updated()` (aucune prop Lit
    // ne change). Change surtout en aperçu d'éditeur Lovelace : sur un
    // Echo Show/Spot en usage réel, la résolution ne bouge jamais après
    // le premier rendu.
    this._resizeObserver = new ResizeObserver(() => this._fitOverflowingText());
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._clockTimer);
    this._resizeObserver?.disconnect();
    this._digitalBackground.destroy();
    this._analogBackground.destroy();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    this._fitOverflowingText();
  }

  // Filet de rattrapage pour l'heure/la date en mode digital : leur
  // taille de police (--_clock-size/--_date-size) est calculée à partir
  // de la hauteur disponible (vh/vmin) sans jamais regarder la largeur
  // réellement nécessaire, qui elle dépend du contenu — une heure à deux
  // chiffres ("23:59" plutôt que "9:41"), un format 12h qui ajoute
  // "AM"/"PM", ou une date dont l'abréviation est plus longue dans telle
  // ou telle langue. Repéré par mesure (getBoundingClientRect), pas à
  // l'œil : "23:59" en 24h déborde déjà en mode round (552px de contenu
  // sur un disque de 480px), et "11:59PM" en 12h déborde même en mode
  // large (1098px sur 960px).
  //
  // Mesuré sur un texte "pire cas" fixe (CLOCK_FIT_PROBE_DATE), jamais
  // sur l'heure/la date réellement affichées : mesurer le contenu réel
  // donnerait une échelle différente selon qu'il s'affiche "9:41" (tient
  // sans réduire) ou "23:59" (déborde, donc réduit) — la taille de la
  // police changerait alors visiblement au passage de 9h à 10h, puis
  // reviendrait à la normale à minuit. En se calant toujours sur le pire
  // cas, l'échelle ne dépend plus de l'heure du moment : une heure à un
  // chiffre et une heure à deux chiffres s'affichent à l'identique.
  //
  // Plutôt que deviner une largeur "sûre" par format/langue/mise en page
  // (quatre combinaisons à recalibrer à la main, et jamais garanti pour
  // une langue non testée), on mesure le rendu réel du pire cas et on
  // réduit seulement s'il dépasse — `scrollWidth` reflète la largeur
  // intrinsèque du contenu, `transform: scale()` (posé via --_fit-scale,
  // cf. static styles) n'affecte que le rendu visuel, pas la mesure.
  //
  // Mesuré sur un clone détaché plutôt qu'en écrivant temporairement le
  // texte pire-cas dans .clock/.date elles-mêmes puis en le restaurant :
  // Lit garde une référence interne vers le nœud texte qu'il a créé pour
  // sa liaison `${...}` ; passer par `el.textContent = ...` en remplace
  // le contenu par un *nouveau* nœud texte à chaque fois (comportement
  // du setter DOM), ce qui rend cette référence obsolète — la prochaine
  // mise à jour de Lit plante alors (`Cannot set properties of null
  // (setting 'data')`, vu en testant ce changement). Un clone n'est pas
  // suivi par Lit, donc rien à casser. Coût négligeable : un clone + une
  // lecture de layout par élément, au pire toutes les 30s (tick
  // d'horloge) ou au redimensionnement — jamais par frame.
  _fitOverflowingText() {
    const root = this.shadowRoot;
    const card = root?.querySelector(".card");
    const cfg = this._config;
    if (!card || !cfg) return;
    const locale = cfg.language || this._hass?.locale?.language || "en";
    const timeFormat =
      cfg.time_format || this._hass?.locale?.time_format || "24";
    // 92% plutôt que 100% : une petite marge, le texte ne doit pas
    // toucher pile le bord (clippé net par `.card { overflow:hidden }`
    // sinon, ou par la courbe du cercle en mode round).
    const available = card.getBoundingClientRect().width * 0.92;
    const probes = {
      ".clock": formatTime(CLOCK_FIT_PROBE_DATE, locale, timeFormat),
      ".date": formatShortDate(CLOCK_FIT_PROBE_DATE, locale),
    };
    for (const [selector, probeText] of Object.entries(probes)) {
      const el = root.querySelector(selector);
      if (!el) continue;
      const clone = el.cloneNode(false);
      clone.textContent = probeText;
      clone.style.position = "absolute";
      clone.style.visibility = "hidden";
      clone.style.left = "-9999px";
      clone.style.removeProperty("--_fit-scale"); // mesure à l'échelle 1, pas celle d'un cycle précédent
      el.parentNode.appendChild(clone);
      const needed = clone.scrollWidth;
      clone.remove();
      const scale = needed > available ? available / needed : 1;
      el.style.setProperty("--_fit-scale", scale);
    }
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

  _cardStyle(backgroundValue, extra) {
    const parts = [];
    if (backgroundValue != null) parts.push(`background:${backgroundValue}`);
    if (this._config.zoom != null && this._config.zoom !== 1) {
      parts.push(`zoom:${this._config.zoom}`);
    }
    if (extra) parts.push(extra);
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
    // L'horloge analogique était d'abord round-only (l'Echo Spot
    // d'origine avait une horloge ronde) ; disponible aussi en paysage
    // depuis 1.3.0 — cadran à droite, météo/date à gauche (cf.
    // _renderAnalogComplications et static styles), plutôt que la grosse
    // horloge digitale.
    const showAnalog = this._clockFace === "analog";

    // Sources d'arrière-plan (une par présentation, cf. src/background.js
    // et le constructeur) — configure() ne relance le travail (parcours
    // Media Source, minuteur de rotation) que si la source demandée a
    // changé depuis le dernier appel, donc appeler ça à chaque rendu ne
    // coûte rien la plupart du temps.
    const bgContext = {
      isNightMode,
      satelliteBackgroundUrl: satelliteState?.attributes?.background,
    };
    this._digitalBackground.configure(this._hass, cfg.background, bgContext);
    this._analogBackground.configure(this._hass, cfg.analog_background, bgContext);

    // Fond dynamique/photo en analogique paysage uniquement (type
    // satellite/url/media_folder de analog_background) : jamais en
    // round, où l'écran à part sur fond uni reproduit volontairement
    // l'Echo Spot d'origine (cf. Horloge analogique, README) — un
    // principe de longue date, pas remis en cause par cette option (et
    // déjà exclu à la validation, cf. _validateConfig, donc le check
    // isRound ici est une redondance défensive plutôt qu'un vrai
    // second filtre). Le style choisi (analog_style) est ignoré tant
    // qu'un fond dynamique est actif : ses couleurs ne sont pas
    // garanties lisibles sur une photo quelconque, donc on retombe sur
    // le blanc du style par défaut (aurore) comme sur le mode digital.
    const usePhotoBackground =
      showAnalog &&
      !isRound &&
      !isNightMode &&
      DYNAMIC_BACKGROUND_TYPES.includes(cfg.analog_background.type);
    // La météo n'a pas sa place la nuit : c'est justement ce que le mode
    // nuit cherche à éviter (lumière/information superflue sur un écran
    // de chevet). Entité absente/indisponible => bloc simplement absent,
    // pas d'erreur affichée (aucune entité n'est requise ici). Valable
    // pour les deux présentations (digitale ou complication sur le
    // cadran analogique, cf. _renderAnalogComplications) — seule la façon
    // de l'afficher change avec showAnalog, pas si elle s'affiche.
    const weatherAvailable =
      cfg.show_weather &&
      !isNightMode &&
      weatherState &&
      !["unavailable", "unknown"].includes(weatherState.state) &&
      weatherState.attributes.temperature != null;
    const showWeather = weatherAvailable && !showAnalog;
    const showDateText = cfg.show_date && !isNightMode;

    // Pas de fond dynamique/dégradé habituel en analogique de jour : la
    // couleur unie vient de la règle CSS .card.analog (cf. static
    // styles) — un style à part, pas une variation du digital. Exception
    // avec un fond dynamique actif (usePhotoBackground), qui passe alors
    // directement en `background` inline plutôt que par la variable CSS
    // --_analog-default-bg (cf. plus bas) — même mécanisme que le mode
    // digital. La nuit, toujours null ici : usePhotoBackground est déjà
    // à false (cf. plus haut), et le type "css" (qui prime habituellement
    // sur tout, cf. --_analog-default-bg) n'est volontairement pas une
    // exception pour l'analogique — la sobriété nocturne prime sur tout
    // fond personnalisé, cf. :host(.night) .card.analog qui reprend le
    // dessus dans tous les cas.
    const backgroundValue = showAnalog
      ? usePhotoBackground
        ? this._analogBackground.cssValue
        : null
      : this._digitalBackground.cssValue;
    // Le fond par défaut du cadran analogique vient de `analog_background`
    // si renseigné (type "css"), sinon du style choisi (cf.
    // analog-styles.js) — passé en variable CSS plutôt qu'en
    // `background` direct pour que --echo-home-analog-background (CSS,
    // cf. README) garde la priorité sur les deux si l'utilisateur la
    // personnalise via card_mod. Indépendant de `background` (mode
    // digital uniquement, cf. const.js) : les deux présentations ont
    // leur propre fond.
    const analogStyle = showAnalog
      ? usePhotoBackground
        ? ANALOG_STYLES[DEFAULT_ANALOG_STYLE]
        : ANALOG_STYLES[cfg.analog_style] || ANALOG_STYLES[DEFAULT_ANALOG_STYLE]
      : null;
    const analogDefaultBg =
      cfg.analog_background.type === "css"
        ? cfg.analog_background.value
        : analogStyle?.background;
    const cardStyle = this._cardStyle(
      backgroundValue,
      analogStyle && !usePhotoBackground
        ? `--_analog-default-bg:${analogDefaultBg}`
        : null
    );
    // L'aiguille des secondes tourne en continu via une animation CSS
    // (cf. _renderAnalogClock) plutôt qu'un rafraîchissement JS par
    // seconde — invalidée dès qu'on quitte l'analogique, pour être
    // recalculée sur le bon instant la prochaine fois qu'on y rentre
    // (l'élément SVG est recréé à chaque bascule, cf. plus bas).
    if (!showAnalog) this._secondHandDelay = undefined;
    // Le voile de lisibilité ne sert qu'au-dessus d'une photo (digital,
    // ou analogique paysage avec analog_background_photo) — inutile sur
    // le fond uni du cadran analogique classique.
    const showShader = !showAnalog || usePhotoBackground;

    return html`
      <div
        class="card ${isRound ? "round" : ""} ${showAnalog ? "analog" : ""}"
        style=${cardStyle}
      >
        ${showShader ? html`<div class="shader"></div>` : nothing}
        ${showWeather ? this._renderWeather(weatherState) : nothing}
        <div class="clockgroup">
          ${cfg.show_clock
            ? showAnalog
              ? html`
                  ${this._renderAnalogComplications(
                    analogStyle,
                    weatherAvailable ? weatherState : null,
                    showDateText,
                    now,
                    locale
                  )}
                  ${this._renderAnalogClock(now, locale, timeFormat, analogStyle)}
                `
              : html`<div class="clock">${formatTime(now, locale, timeFormat)}</div>`
            : nothing}
          ${showDateText && !showAnalog
            ? html`<div class="date">${formatShortDate(now, locale)}</div>`
            : nothing}
        </div>
        ${!isNightMode ? this._renderClockToggle(showAnalog) : nothing}
      </div>
    `;
  }

  // Météo + date, discrètes, superposées au cadran analogique — mêmes
  // données et mêmes conditions d'affichage que la vue digitale
  // (show_weather/show_date, masquées la nuit, cf. render()), juste
  // repositionnées et réduites façon guichet de date de montre
  // mécanique. Icône via <img> (comme _renderWeather) plutôt qu'un
  // glyphe dessiné à la main ou un <image> SVG : c'est le mécanisme déjà
  // utilisé pour la météo en digital, dont on sait qu'il garde les
  // icônes Meteocons animées (SMIL) — un <image> SVG référençant un SVG
  // externe ne le garantit pas selon les moteurs.
  //
  // Rendu AVANT le <svg class="analog-clock"> dans le DOM (cf. appel
  // dans render()), jamais dedans : les deux sont position:absolute
  // superposés au même endroit, donc l'ordre du DOM suffit à garantir
  // que les aiguilles/graduations restent toujours visibles par-dessus
  // (le <svg> n'a pas de fond, seul ce qu'il dessine réellement masque
  // ce qu'il y a dessous) — pas besoin de <foreignObject> ni de z-index.
  _renderAnalogComplications(style, weatherState, showDate, now, locale) {
    if (!weatherState && !showDate) return nothing;
    let weather = nothing;
    if (weatherState) {
      const slug = conditionToIconSlug(weatherState.state, this._isDarkOutside());
      const url = iconUrl(slug, this._config.icons);
      const temp = Number(weatherState.attributes.temperature).toFixed(1);
      const tempUnit = weatherState.attributes.temperature_unit || "°C";
      weather = html`
        <div class="analog-weather">
          <img
            class="analog-weather-icon"
            src=${url}
            alt=""
            style="filter:${style.comp.iconFilter || "none"}"
          />
          <span class="analog-weather-temp">${temp}${tempUnit}</span>
        </div>
      `;
    }
    return html`
      <div
        class="analog-complications"
        style="color:${style.comp.color};opacity:${style.comp.opacity}"
      >
        ${weather}
        ${showDate ? html`<div class="analog-date">${formatShortDate(now, locale)}</div>` : nothing}
      </div>
    `;
  }

  // Cadran analogique en SVG : pensé pour rappeler l'horloge ronde de
  // l'Echo Spot d'origine (avant LineageOS/View Assist), en alternative
  // au digital. Diamètre indépendant de --_clock-size (qui pilote une
  // taille de police, pas un diamètre) — cf. --_analog-size et
  // .card.round.analog .date, qui a donc sa propre position plutôt que
  // de réutiliser le calcul basé sur --_clock-size. Cinq habillages
  // possibles (cf. src/analog-styles.js, choisis via `analog_style`) :
  // mêmes primitives (graduations, chiffres, aiguilles), paramètres
  // différents — sauf "ardoise", seul style à aiguilles rectangulaires
  // plutôt que des traits (cf. _renderRectHands).
  //
  // Tout sous-template SVG (graduations, chiffres, aiguilles — construits
  // ici dans des méthodes séparées, donc interpolés dans le <svg>
  // englobant plutôt qu'écrits littéralement dedans) doit utiliser le tag
  // `svg` de Lit, jamais `html` : un sous-template `html` pour un élément
  // SVG atterrit dans le mauvais espace de noms (xhtml, pas svg) et ne
  // s'affiche pas — piège repéré en 1.1.0 en inspectant
  // `element.namespaceURI` sur le rendu réel. Seul le <svg> racine,
  // littéral dans CE template (pas construit à part), peut rester sous
  // `html`.
  _renderAnalogClock(now, locale, timeFormat, style) {
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const hourAngle = hours * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6;
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    // Angle statique, recalculé à chaque rendu (au fil du tick d'horloge,
    // toutes les 30s) : sert de repli quand l'animation ci-dessous est
    // coupée (`prefers-reduced-motion`), sinon simplement écrasé par elle
    // pendant qu'elle tourne.
    const secondAngle = seconds * 6;

    // Tourne en continu via une animation CSS (@keyframes, cf. static
    // styles) plutôt qu'un recalcul JS par seconde — un seul transform
    // animé, composité par le GPU, coûte bien moins cher qu'un re-rendu
    // Lit chaque seconde sur du matériel modeste (cf. gotchas Echo
    // Show/Spot). --_second-hand-delay décale l'animation pour qu'elle
    // démarre déjà à la bonne position (calculé une fois par entrée en
    // mode analogique) plutôt que de repartir de midi à chaque fois.
    if (this._secondHandDelay === undefined) {
      this._secondHandDelay = `-${seconds}s`;
    }

    const hands =
      style.shape === "rect"
        ? this._renderRectHands(style, hourAngle, minuteAngle, secondAngle)
        : this._renderLineHands(style, hourAngle, minuteAngle, secondAngle);

    return html`
      <svg
        class="analog-clock"
        viewBox="0 0 100 100"
        role="img"
        aria-label=${formatTime(now, locale, timeFormat)}
      >
        ${style.glow ? this._renderGlowFilter() : nothing}
        ${this._renderTicks(style.ticks, style.glow)}
        ${this._renderNumerals(style.numerals)}
        ${hands}
      </svg>
    `;
  }

  // Filtre de halo (mode "neon" uniquement). filterUnits="userSpaceOnUse"
  // avec une région exprimée en coordonnées du viewBox, pas en % de la
  // bounding box (valeur par défaut) : les aiguilles sont des <line>
  // verticales avant rotation (x1 === x2), donc leur bounding box a une
  // largeur nulle — en unités objectBoundingBox la région du filtre
  // s'écrase à zéro et Chrome n'affiche rien du tout (repéré ici :
  // aiguilles absentes du rendu alors que les graduations, elles,
  // s'affichaient).
  _renderGlowFilter() {
    return svg`
      <defs>
        <filter id="echo-home-analog-glow" filterUnits="userSpaceOnUse" x="-20" y="-20" width="140" height="140">
          <feGaussianBlur stdDeviation="1.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    `;
  }

  // Graduations : soit un trait fin proche du bord (style "aurore"
  // d'origine), soit un simple point (les 4 autres styles) — sur les 12
  // heures ("all"), les 8 non cardinales ("minor", pour laisser la place
  // aux chiffres) ou les 4 cardinales seulement ("cardinal").
  _renderTicks(cfg, glow) {
    if (!cfg) return nothing;
    const glowAttr = glow ? "url(#echo-home-analog-glow)" : undefined;
    const ticks = [];
    for (let i = 0; i < 12; i++) {
      const isCardinal = i % 3 === 0;
      if (cfg.mode === "minor" && isCardinal) continue;
      if (cfg.mode === "cardinal" && !isCardinal) continue;
      if (cfg.skip?.includes(i)) continue;
      const angle = i * 30;
      if (cfg.shape === "line") {
        ticks.push(svg`
          <line
            class="tick hand"
            x1="50"
            y1=${cfg.y1}
            x2="50"
            y2=${cfg.y2}
            stroke=${cfg.color}
            stroke-width=${cfg.width}
            opacity=${cfg.opacity}
            filter=${glowAttr ?? nothing}
            transform="rotate(${angle} 50 50)"
          />
        `);
      } else {
        const p = this._polar(cfg.radius, angle);
        const r = isCardinal ? cfg.cardinalR : cfg.minorR;
        const o = isCardinal ? cfg.cardinalOpacity : cfg.minorOpacity;
        ticks.push(svg`
          <circle class="tick hand" cx=${p.x} cy=${p.y} r=${r} fill=${cfg.color} opacity=${o} filter=${glowAttr ?? nothing} />
        `);
      }
    }
    return svg`<g class="ticks">${ticks}</g>`;
  }

  // Chiffres : "quad" (12/3/6/9, style "aurore") ou "single" (12
  // seulement, style "ardoise"). Même rayon que les graduations à chaque
  // fois — les chiffres doivent être sur le même cercle qu'elles, pas
  // ramenés vers le centre, sinon ils paraissent "flotter" au milieu du
  // cadran au lieu de marquer l'heure à la même distance du bord
  // (corrigé en 1.1.4 pour "aurore", appliqué d'emblée ici aux autres).
  _renderNumerals(cfg) {
    if (!cfg) return nothing;
    const positions =
      cfg.mode === "single"
        ? [["12", 0]]
        : [["12", 0], ["3", 1], ["6", 2], ["9", 3]];
    const numerals = positions.map(([n, i]) => {
      const p = this._polar(cfg.radius, i * 90);
      return svg`
        <text
          class="numeral hand"
          x=${p.x}
          y=${p.y}
          font-size=${cfg.size}
          font-weight=${cfg.weight}
          opacity=${cfg.opacity}
          fill=${cfg.color}
          text-anchor="middle"
          dominant-baseline="central"
        >${n}</text>
      `;
    });
    return svg`<g class="numerals">${numerals}</g>`;
  }

  // sin/cos plutôt que des positions écrites en dur pour chaque heure :
  // évite de se tromper de signe pour l'une d'elles (angle depuis midi,
  // sens horaire — x = sin, y = -cos).
  _polar(radius, angleDeg) {
    const a = (angleDeg * Math.PI) / 180;
    return { x: 50 + radius * Math.sin(a), y: 50 - radius * Math.cos(a) };
  }

  // Aiguilles "classiques" (tous les styles sauf "ardoise") : un simple
  // trait par aiguille, couleur/épaisseur/forme de bout définies par le
  // style. La seconde peut avoir une petite queue derrière le pivot et un
  // point à la pointe (styles "mono"/"neon").
  _renderLineHands(style, hourAngle, minuteAngle, secondAngle) {
    const glowAttr = style.glow ? "url(#echo-home-analog-glow)" : undefined;
    const hour = svg`
      <line
        class="hand hand-hour"
        x1="50" y1="50" x2="50" y2=${50 - style.hour.len}
        stroke=${style.hour.color}
        stroke-width=${style.hour.width}
        stroke-linecap=${style.hour.cap}
        filter=${glowAttr ?? nothing}
        transform="rotate(${hourAngle} 50 50)"
      />
    `;
    const minute = svg`
      <line
        class="hand hand-minute"
        x1="50" y1="50" x2="50" y2=${50 - style.minute.len}
        stroke=${style.minute.color}
        stroke-width=${style.minute.width}
        stroke-linecap=${style.minute.cap}
        filter=${glowAttr ?? nothing}
        transform="rotate(${minuteAngle} 50 50)"
      />
    `;
    // La trotteuse et son éventuel point en pointe (styles "mono"/"neon")
    // sont groupés : c'est le groupe entier qui tourne via l'animation
    // CSS (cf. .hand-second dans static styles), pas juste le trait —
    // sinon le point resterait fixe pendant que le trait balaie le
    // cadran en dessous.
    const s = style.second;
    const tip = s.tipDot
      ? svg`<circle class="hand" cx="50" cy=${50 - s.len} r=${s.tipDot.r} fill=${s.tipDot.fill} filter=${glowAttr ?? nothing} />`
      : nothing;
    const second = svg`
      <g
        class="hand-second"
        style="animation-delay: ${this._secondHandDelay}; transform: rotate(${secondAngle}deg)"
      >
        <line
          class="hand"
          x1="50" y1=${50 + s.tail} x2="50" y2=${50 - s.len}
          stroke=${s.color}
          stroke-width=${s.width}
          stroke-linecap=${s.cap}
          opacity=${s.opacity}
          filter=${glowAttr ?? nothing}
        />
        ${tip}
      </g>
    `;
    const center = style.center;
    const ring = center.ring
      ? svg`
          <circle
            class="hand"
            cx="50" cy="50" r=${center.ring.r} fill="none"
            stroke=${center.ring.color} stroke-width=${center.ring.width}
          />
        `
      : nothing;
    return svg`
      ${hour}${minute}${second}
      ${ring}
      <circle class="hand" cx="50" cy="50" r=${center.r} fill=${center.color} />
    `;
  }

  // Aiguilles "géométriques" (style "ardoise" uniquement) : des
  // rectangles plutôt que des traits, plus un contrepoids derrière le
  // pivot pour la seconde (elle est animée via le même mécanisme —
  // rotation continue sur le <g> englobant, cf. .hand-second dans static
  // styles, qui s'applique aussi bien à un <line> qu'à un <g>).
  _renderRectHands(style, hourAngle, minuteAngle, secondAngle) {
    const h = style.hour;
    const m = style.minute;
    const s = style.second;
    const c = style.center;
    return svg`
      <rect
        class="hand hand-hour"
        x=${50 - h.w / 2} y=${50 - h.len} width=${h.w} height=${h.len}
        fill=${h.color}
        transform="rotate(${hourAngle} 50 50)"
      />
      <rect
        class="hand hand-minute"
        x=${50 - m.w / 2} y=${50 - m.len} width=${m.w} height=${m.len}
        fill=${m.color}
        transform="rotate(${minuteAngle} 50 50)"
      />
      <g
        class="hand-second"
        style="animation-delay: ${this._secondHandDelay}; transform: rotate(${secondAngle}deg)"
      >
        <rect class="hand" x=${50 - s.w / 2} y=${50 - s.len} width=${s.w} height=${s.len} fill=${s.color} />
        <rect class="hand" x=${50 - s.w / 2} y="50" width=${s.w} height=${s.tail} fill=${s.color} />
      </g>
      <rect
        class="hand"
        x=${50 - c.size / 2} y=${50 - c.size / 2} width=${c.size} height=${c.size}
        fill=${c.color}
        transform="rotate(45 50 50)"
      />
    `;
  }

  // Petit bouton discret (round et large, masqué la nuit comme le reste
  // — pas de lumière/info superflue sur un écran de chevet) pour
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
      /* Cadran analogique en mode large (Echo Show) uniquement — sans
         effet en round, qui a son propre --_analog-size (%, cf.
         .card.round). min(vh, vw) plutôt qu'un simple vh : sur un écran
         inhabituellement étroit, une valeur purement basée sur la
         hauteur déborderait sur la colonne météo/date à gauche. */
      --_analog-landscape-size: min(80vh, 42vw);
      /* Sensiblement plus petite que --_date-size (pensée pour le mode
         digital, sous l'horloge géante) : à côté de la météo plutôt que
         sous une horloge, --_date-size la ferait presque aussi grosse
         que la température elle-même (--_weather-temp-size, quasi le
         même facteur vh) — pas ce qu'on veut d'une info secondaire. */
      --_analog-landscape-date-size: clamp(1.1rem, 8vh, 3rem);
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
      /* --_fit-scale : 1 par défaut, réduit seulement si le contenu
         réel déborde à la taille vh/vmin normale (cf.
         _fitOverflowingText) — une heure à un chiffre ("9:41") n'est
         donc jamais rétrécie inutilement, seule une heure large
         ("23:59", ou "11:59PM" en 12h) l'est. */
      transform: translate(-50%, -50%) scale(var(--_fit-scale, 1));
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
      /* transform-origin: top (pas le centre par défaut) : si
         --_fit-scale réduit le texte (cf. _fitOverflowingText, même
         filet de rattrapage que .clock pour une date à l'abréviation
         plus longue dans certaines langues), le bord haut ne doit pas
         bouger — c'est lui que la propriété top positionne avec le
         calcul d'encre ci-dessus, pas le centre de la boîte. */
      transform: translateX(-50%) scale(var(--_fit-scale, 1));
      transform-origin: top;
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

    /* Cadran analogique : un écran à part, pas une variante du digital —
       comme sur l'Echo Spot d'origine sous Alexa (avant LineageOS/View
       Assist), dont le cadran rond plein écran sert de référence même
       en mode large (Echo Show, depuis 1.3.0) : mêmes aiguilles, casées
       à droite plutôt que centrées, la météo/date prenant la place à
       gauche (cf. .analog-weather/.analog-date plus bas) — toujours pas
       de photo de fond par défaut, sauf analog_background_photo
       (paysage uniquement, cf. render()). --_analog-default-bg vient du
       style choisi (analog_style, cf. analog-styles.js et render()) —
       --echo-home-analog-background (personnalisation utilisateur, cf.
       README) garde la priorité dessus ; ignoré si
       analog_background_photo est actif (fond dynamique posé en
       background direct par render() dans ce cas, pas ici). */
    .card.analog {
      background: var(--echo-home-analog-background, var(--_analog-default-bg));
    }

    /* La nuit, même en analogique, on retombe sur le traitement nuit
       habituel (fond quasi noir) plutôt que le style choisi — l'objectif
       du mode nuit (peu de lumière émise sur un écran de chevet) prime
       sur l'esthétique. */
    :host(.night) .card.analog {
      background: var(--_default-bg);
      background-color: #0a1424;
    }

    .analog-clock {
      position: absolute;
      transition: opacity 0.4s ease;
    }

    /* Round : cadran plein écran, centré (cf. --_analog-size, 94% du
       conteneur — la carte round est toujours carrée, un % y suffit). */
    .card.round .analog-clock {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--_analog-size);
      height: var(--_analog-size);
    }

    /* Paysage : cadran plus petit, casé à droite plutôt que centré, pour
       laisser la place à la météo/date à gauche (cf. .analog-weather/
       .analog-date). --_analog-landscape-size en vh/vw (pas %, cf.
       --_clock-size) : contrairement à la carte round, la carte large
       n'est pas carrée — un % de sa largeur et un % de sa hauteur ne
       donneraient pas la même valeur, ce qui déformerait le cadran en
       ellipse. */
    .card:not(.round) .analog-clock {
      top: 50%;
      right: 4%;
      transform: translateY(-50%);
      width: var(--_analog-landscape-size);
      height: var(--_analog-landscape-size);
    }

    /* Couleurs et épaisseurs propres à chaque style (mono/aurore/clair/
       neon/ardoise) posées directement en attributs SVG par
       _renderLineHands/_renderRectHands/_renderTicks/_renderNumerals,
       pas ici : contrairement à la version à un seul style (< 1.2.0), il
       n'y a plus de couleur "currentColor" commune à surcharger. La
       nuit, .hand regroupe toutes les aiguilles/graduations/chiffres
       (cf. classes posées dans le JS) et retombe uniformément sur le
       rouge très atténué habituel, quel que soit le style de jour. */
    :host(.night) .analog-clock {
      opacity: var(--_night-opacity);
    }

    :host(.night) .analog-clock .hand {
      fill: var(--_night-color);
      stroke: var(--_night-color);
    }

    /* Tourne en continu via une animation CSS plutôt qu'un recalcul JS
       par seconde (cf. commentaire sur --_second-hand-delay dans
       _renderAnalogClock) — un seul transform animé, composité par le
       GPU, sans repeindre le reste du cadran à chaque frame. S'applique
       au groupe englobant la trotteuse (<g class="hand-second">, cf.
       _renderLineHands/_renderRectHands), pas à un unique trait : la
       queue/le contrepoids et l'éventuel point en pointe doivent tourner
       ensemble avec elle. transform-origin en unités du viewBox (50px
       50px = le centre du cadran, pas le centre de la boîte englobante
       du groupe lui-même, qui serait décalé à cause de la queue derrière
       le pivot). */
    .analog-clock .hand-second {
      transform-origin: 50px 50px;
    }

    @media (prefers-reduced-motion: no-preference) {
      .analog-clock .hand-second {
        animation: spin-second-hand 60s linear infinite;
      }
    }

    @keyframes spin-second-hand {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Météo + date associées au cadran analogique (cf.
       _renderAnalogComplications), rendues AVANT le <svg> des aiguilles
       dans le DOM pour qu'elles restent toujours visibles par-dessus
       (cf. commentaire sur cette méthode). pointer-events: none : une
       pure décoration, qui ne doit pas voler le tap destiné au bouton de
       bascule sous elle. Couleur/opacité posées en style inline par
       style analogique (cf. comp dans analog-styles.js), pas ici — pas
       de valeur commune à tous. */
    .analog-complications {
      position: absolute;
      pointer-events: none;
    }

    /* Round : superposée au cadran (même boîte que .analog-clock, donc
       alignée sur le même disque) — une complication discrète, comme un
       guichet de date sur une montre mécanique. */
    .card.round .analog-complications {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--_analog-size);
      height: var(--_analog-size);
    }

    /* Paysage : pas superposée au cadran (casé à droite, cf.
       .analog-clock) mais positionnée sur toute la carte — la météo/date
       occupent la colonne de gauche, pas un guichet discret mais un vrai
       bloc d'info à part entière (cf. .analog-weather/.analog-date plus
       bas). */
    .card:not(.round) .analog-complications {
      inset: 0;
    }

    .analog-weather {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 0.3em;
    }

    /* Round : positions choisies pour rester dans la partie du cadran
       non balayée par les chiffres (radius ~40-41 sur un viewBox 0-100,
       cf. analog-styles.js) : la météo juste au-dessus du centre, la
       date juste en dessous — symétriques sur l'axe midi-6h. Les
       aiguilles peuvent passer dessus sans gêner la lecture. */
    .card.round .analog-weather {
      left: 50%;
      top: 27%;
      transform: translate(-50%, -50%);
    }
    .card.round .analog-weather-icon {
      width: var(--_analog-weather-icon-size);
      height: var(--_analog-weather-icon-size);
    }
    .card.round .analog-weather-temp {
      font-size: var(--_analog-weather-temp-size);
    }
    .card.round .analog-date {
      left: 50%;
      top: 69%;
      transform: translate(-50%, -50%);
      font-size: var(--_analog-date-size);
    }

    /* Paysage : bloc météo/date centré sur le même axe horizontal que le
       centre du cadran (symétrique, au-dessus/en dessous), dans la
       colonne de gauche — ici, ce n'est plus une complication discrète
       mais l'info principale de ce côté de l'écran. Icône/température
       reprennent la taille du bloc météo du mode digital
       (--_weather-icon-size/--_weather-temp-size) ; la date a sa propre
       taille (--_analog-landscape-date-size), plus petite, pour rester
       secondaire par rapport à la météo au lieu de rivaliser avec elle
       (--_date-size, pensée pour être lue sous l'horloge géante du
       digital, est presque aussi grande que --_weather-temp-size — bien
       trop pour une info secondaire une fois les deux côte à côte). */
    .card:not(.round) .analog-weather {
      left: 21%;
      top: 41%;
      transform: translate(-50%, -50%);
    }
    .card:not(.round) .analog-weather-icon {
      width: var(--_weather-icon-size);
      height: var(--_weather-icon-size);
    }
    .card:not(.round) .analog-weather-temp {
      font-size: var(--_weather-temp-size);
    }
    .card:not(.round) .analog-date {
      left: 21%;
      top: 58%;
      transform: translate(-50%, -50%);
      font-size: var(--_analog-landscape-date-size);
    }

    .analog-weather-icon {
      display: block;
    }

    .analog-weather-temp {
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .analog-date {
      position: absolute;
      white-space: nowrap;
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
      /* Sensiblement plus petites que --_weather-icon-size/--_weather-
         temp-size/--_date-size ci-dessus : une complication doit rester
         discrète à côté d'aiguilles qui occupent tout l'écran, pas
         reproduire le poids visuel du bloc météo/date du mode digital. */
      --_analog-weather-icon-size: clamp(14px, 5vmin, 30px);
      --_analog-weather-temp-size: clamp(0.65rem, 4.6vmin, 1.15rem);
      --_analog-date-size: clamp(0.6rem, 4vmin, 1rem);
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
