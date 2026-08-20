import { LitElement, html, css } from "lit";
import { ANALOG_STYLES } from "./analog-styles.js";

// Éditeur visuel (menu de config Lovelace) pour les options les plus
// courantes — entités, navigation, éléments affichés, présentation,
// localisation, zoom. Les options plus avancées (fonds personnalisés
// `background`/`analog_background`, `icons`) restent YAML uniquement :
// leur forme change selon un type choisi (url/media_folder/unsplash...),
// mal adaptée à un formulaire `ha-form` plat — cf. README, section
// "Arrière-plans". Le bouton "Modifier en YAML" de Lovelace reste
// disponible à tout moment à côté de ce formulaire pour les régler.
//
// Repose sur <ha-form>, le composant de formulaire schéma-driven du
// frontend Home Assistant (déjà présent globalement dans le DOM d'une
// instance HA — pas une dépendance de ce paquet). Convention standard
// des éditeurs de carte custom : https://developers.home-assistant.io/docs/frontend/custom-ui/lovelace-custom-card/#configuration-editor

// Clés facultatives (texte/entité) : une chaîne vide doit redevenir
// "non réglé" plutôt que polluer la config avec `clé: ""`.
const OPTIONAL_STRING_KEYS = [
  "satellite_entity",
  "weather_entity",
  "sun_entity",
  "night_mode_entity",
  "dashboard",
  "navigate_device",
  "language",
];

const LABELS = {
  satellite_entity: "Entité satellite View Assist",
  weather_entity: "Entité météo",
  sun_entity: "Entité soleil",
  night_mode_entity: "Entité mode nuit (alternative)",
  dashboard: "Dashboard",
  weather_view: "Vue météo",
  navigate_device: "Device pour view_assist.navigate",
  show_clock: "Horloge",
  show_date: "Date",
  show_weather: "Météo",
  layout: "Mise en page",
  clock_face: "Cadran au démarrage",
  analog_style: "Style du cadran analogique",
  language: "Langue",
  time_format: "Format horaire",
  zoom: "Zoom manuel",
};

const HELPERS = {
  satellite_entity:
    "Fond dynamique + mode nuit (attribute mode) — sauf si une entité mode nuit est choisie ci-dessous.",
  sun_entity:
    "Sinon sun.sun — choisit juste la variante jour/nuit de l'icône météo.",
  night_mode_entity:
    "Remplace entièrement satellite_entity.attributes.mode comme source du mode nuit : entité sun.* (nuit sous l'horizon) ou entité booléenne (nuit si état \"on\").",
  dashboard:
    "Base du chemin de navigation (ex: dashboard-view-assist) — tant que vide, le bloc météo n'est pas cliquable.",
  navigate_device: "Sinon, l'entité satellite sert de device.",
  clock_face:
    "Valeur de départ seulement — le bouton à l'écran retient ensuite le choix.",
  analog_style:
    '"auto" change de style chaque jour de la semaine. Fonds personnalisés : voir "Arrière-plans" dans le README.',
  zoom: "Filet de rattrapage si les tailles ne suivent pas correctement sur un appareil donné.",
};

const LAYOUT_OPTIONS = [
  { value: "landscape", label: "Paysage (Echo Show)" },
  { value: "round", label: "Rond (Echo Spot)" },
];

const CLOCK_FACE_OPTIONS = [
  { value: "digital", label: "Digital" },
  { value: "analog", label: "Analogique" },
];

const TIME_FORMAT_OPTIONS = [
  { value: "", label: "Automatique (langue HA)" },
  { value: "12", label: "12h" },
  { value: "24", label: "24h" },
];

// Réutilise les labels déjà maintenus dans analog-styles.js (mêmes
// noms que le README) plutôt que d'en dupliquer une copie ici, qui
// finirait par diverger comme la doc l'a fait avant d'être corrigée.
const ANALOG_STYLE_OPTIONS = [
  { value: "auto", label: "Automatique — change de style chaque jour" },
  ...Object.entries(ANALOG_STYLES).map(([key, style]) => ({
    value: key,
    label: `${key} — ${style.label}`,
  })),
];

class EchoHomeCardEditor extends LitElement {
  static properties = {
    hass: {},
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config || {};
  }

  // <ha-form> reçoit une copie de la config avec deux champs "repère" :
  // layout (null -> "landscape") et time_format (null -> ""), aucun des
  // deux n'étant une valeur réelle valide côté carte (cf. const.js) —
  // juste une valeur affichable pour le select. _valueChanged défait
  // cette traduction avant de renvoyer la config.
  get _data() {
    return {
      ...this._config,
      layout: this._config.layout === "round" ? "round" : "landscape",
      time_format: this._config.time_format || "",
    };
  }

  _computeLabel = (schemaEntry) => LABELS[schemaEntry.name] ?? schemaEntry.name;
  _computeHelper = (schemaEntry) => HELPERS[schemaEntry.name] ?? "";

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <div class="section">
        <h3>Entités</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
            { name: "satellite_entity", selector: { entity: {} } },
            {
              name: "weather_entity",
              selector: { entity: { domain: "weather" } },
            },
            { name: "sun_entity", selector: { entity: { domain: "sun" } } },
            { name: "night_mode_entity", selector: { entity: {} } },
          ]}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Navigation (bloc météo cliquable)</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
            { name: "dashboard", selector: { text: {} } },
            { name: "weather_view", selector: { text: {} } },
            { name: "navigate_device", selector: { text: {} } },
          ]}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Éléments affichés</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
            {
              type: "grid",
              name: "",
              column_min_width: "110px",
              schema: [
                { name: "show_clock", selector: { boolean: {} } },
                { name: "show_date", selector: { boolean: {} } },
                { name: "show_weather", selector: { boolean: {} } },
              ],
            },
          ]}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Présentation</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
            {
              name: "layout",
              selector: { select: { mode: "dropdown", options: LAYOUT_OPTIONS } },
            },
            {
              name: "clock_face",
              selector: {
                select: { mode: "dropdown", options: CLOCK_FACE_OPTIONS },
              },
            },
            {
              name: "analog_style",
              selector: {
                select: { mode: "dropdown", options: ANALOG_STYLE_OPTIONS },
              },
            },
          ]}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Localisation</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
            { name: "language", selector: { text: {} } },
            {
              name: "time_format",
              selector: {
                select: { mode: "dropdown", options: TIME_FORMAT_OPTIONS },
              },
            },
          ]}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Réglages fins</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
            {
              name: "zoom",
              selector: { number: { min: 0.1, max: 3, step: 0.05, mode: "box" } },
            },
          ]}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <p class="advanced-note">
        Fonds personnalisés (image, dossier, Unsplash...) et icônes
        (<code>background</code>, <code>analog_background</code>,
        <code>icons</code>) : pas encore d'éditeur visuel dédié, à régler
        via "Modifier en YAML" — voir la section "Arrière-plans" du
        <a
          href="https://git.alocoq.fr/alois/echo-dashboard/src/branch/main/packages/echo-home-card/README.md"
          target="_blank"
          rel="noreferrer"
          >README</a
        >.
      </p>
    `;
  }

  // ha-form renvoie systématiquement la config complète (les clés que ce
  // formulaire ne gère pas, ex. background/icons, traversent inchangées
  // depuis _data) — juste besoin de défaire les repères de select et de
  // retirer les champs texte/entité revenus à vide plutôt que d'écrire
  // `clé: ""` dans la config.
  _valueChanged(ev) {
    const config = { ...ev.detail.value };
    if (config.layout === "landscape") delete config.layout;
    if (!config.time_format) delete config.time_format;
    for (const key of OPTIONAL_STRING_KEYS) {
      if (!config[key]) delete config[key];
    }
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    .section {
      margin-bottom: 16px;
    }
    .section:last-of-type {
      margin-bottom: 8px;
    }
    h3 {
      font-size: 0.95em;
      font-weight: 600;
      color: var(--secondary-text-color, #666);
      margin: 0 0 8px;
    }
    .advanced-note {
      font-size: 0.85em;
      color: var(--secondary-text-color, #666);
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 12px;
    }
    .advanced-note code {
      font-size: 0.95em;
    }
    .advanced-note a {
      color: var(--primary-color, inherit);
    }
  `;
}

customElements.define("echo-home-card-editor", EchoHomeCardEditor);
