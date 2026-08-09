// Sources d'arrière-plan (digital ET analogique, chacun avec son propre
// réglage indépendant — cf. background/analog_background dans const.js) :
// une image ou un dossier d'images en local sur Home Assistant (Media
// Source, parcouru automatiquement), une source web (URL fixe ou
// plusieurs avec rotation, indépendante de satellite_entity), le fond
// dynamique de satellite_entity comme avant ("satellite"), un fond
// CSS uni/dégradé personnalisé ("css"), ou — analogique uniquement — le
// dégradé par défaut du style choisi ("style").

const VALID_FITS = ["cover", "contain", "fill"];
const DEFAULT_FIT = "cover";
const DEFAULT_INTERVAL = 300; // secondes — un diaporama photo classique
// change toutes les quelques minutes, pas toutes les secondes ni une
// fois par heure.

function backgroundSizeFor(fit) {
  if (fit === "contain") return "contain";
  if (fit === "fill") return "100% 100%";
  return "cover";
}

function cssUrlBackground(url, fit) {
  return `center / ${backgroundSizeFor(fit)} no-repeat url("${url}")`;
}

// Normalise une config brute (chaîne CSS historique, booléen historique
// de analog_background_photo, ou nouvel objet {type, ...}) vers un objet
// {type, ...} — jamais de branchement sur la forme brute ailleurs dans
// le composant, tout passe par ici.
export function normalizeBackgroundConfig(raw, legacyPhotoFlag, defaultType) {
  if (raw != null) {
    if (typeof raw === "string") return { type: "css", value: raw };
    if (typeof raw === "object") return { type: defaultType, ...raw };
  } else if (legacyPhotoFlag) {
    // Ancien analog_background_photo: true (1.3.0) — reste supporté tel
    // quel, mais seulement si analog_background lui-même n'est pas
    // défini (sinon la nouvelle forme, plus précise, prime).
    return { type: "satellite" };
  }
  return { type: defaultType };
}

// Validation légère (même esprit que _validateConfig dans
// echo-home-card.js) : avertit et retombe sur le type par défaut plutôt
// que de casser le rendu. `label` sert au message d'avertissement
// ("background" ou "analog_background").
export function validateBackgroundConfig(parsed, validTypes, defaultType, label, warn) {
  const result = { ...parsed };
  if (!validTypes.includes(result.type)) {
    warn(`${label}.type`, defaultType);
    result.type = defaultType;
  }
  if (result.fit != null && !VALID_FITS.includes(result.fit)) {
    warn(`${label}.fit`, DEFAULT_FIT);
    result.fit = DEFAULT_FIT;
  }
  if (
    result.interval != null &&
    (typeof result.interval !== "number" || !Number.isFinite(result.interval) || result.interval <= 0)
  ) {
    warn(`${label}.interval`, DEFAULT_INTERVAL);
    result.interval = DEFAULT_INTERVAL;
  }
  if (result.type === "url" && !result.url && !(result.urls?.length > 0)) {
    warn(`${label}.url`, "satellite");
    result.type = "satellite";
  }
  if (result.type === "media_folder" && !result.path) {
    warn(`${label}.path`, "satellite");
    result.type = "satellite";
  }
  return result;
}

// Parcourt un dossier Media Source HA (media-source://...) et retourne
// les media_content_id de ses fichiers image — pas les sous-dossiers
// (pas de récursion : un diaporama à plat, pas une arborescence).
async function browseImageFolder(hass, path) {
  const result = await hass.callWS({
    type: "media_source/browse_media",
    media_content_id: path,
  });
  return (result.children || [])
    .filter(
      (child) =>
        child.media_class === "image" ||
        child.media_content_type?.startsWith("image/")
    )
    .map((child) => child.media_content_id);
}

// Résout un media_content_id en URL réellement chargeable (les
// media_content_id media-source:// ne sont pas des URLs) — appelé juste
// avant d'afficher chaque image plutôt qu'une fois pour toutes à
// l'avance : certains fournisseurs Media Source renvoient des URLs
// signées à durée de vie limitée, les résoudre à la volée évite d'avoir
// à suivre leur expiration.
async function resolveMedia(hass, mediaContentId) {
  const result = await hass.callWS({
    type: "media_source/resolve_media",
    media_content_id: mediaContentId,
  });
  return result.url;
}

// Pilote une source d'arrière-plan (une par présentation — digital et
// analogique en ont chacun la leur, cf. echo-home-card.js) : résout et
// fait tourner les sources à plusieurs images (media_folder, url avec
// plusieurs urls) en tâche de fond, expose la valeur CSS `background`
// courante de façon synchrone (`cssValue`) pour render(). `onChange` est
// appelé quand cette valeur change suite à une résolution/rotation
// asynchrone, pour redéclencher un rendu (Lit).
//
// `configure()` peut être appelée à chaque rendu sans souci : elle ne
// relance le travail (nouveau parcours du dossier, nouveau minuteur de
// rotation) que si la source demandée a effectivement changé depuis le
// dernier appel (comparaison d'une signature JSON) — appeler `configure`
// depuis `render()` reste donc sûr (pas d'effet de bord à chaque rendu),
// contrairement à démarrer le travail asynchrone directement dedans.
export class BackgroundSource {
  constructor(onChange) {
    this._onChange = onChange;
    this._signature = null;
    this._images = []; // media_content_id (media_folder) ou URLs (url)
    this._resolvedUrl = null; // pour media_folder : URL résolue courante
    this._index = 0;
    this._timer = null;
    this._token = 0; // incrémenté à chaque reconfigure : les résolutions
    // asynchrones lancées par une configuration précédente s'auto-
    // annulent en se comparant à cette valeur avant d'appliquer leur
    // résultat, plutôt que d'écraser une configuration plus récente.
    this.cssValue = null;
  }

  configure(hass, parsed, context) {
    const signature = JSON.stringify([parsed, context]);
    if (signature === this._signature) return;
    this._signature = signature;
    this._token += 1;
    const token = this._token;
    clearInterval(this._timer);
    this._timer = null;
    this._images = [];
    this._index = 0;

    switch (parsed.type) {
      case "style":
        // Analogique uniquement : pas de valeur inline, --_analog-
        // default-bg (posée par echo-home-card.js) prend le relais.
        this.cssValue = null;
        return;
      case "css":
        this.cssValue = parsed.value ?? null;
        return;
      case "satellite":
        this.cssValue = context.isNightMode
          ? null
          : context.satelliteBackgroundUrl
            ? cssUrlBackground(context.satelliteBackgroundUrl, DEFAULT_FIT)
            : null;
        return;
      case "url": {
        if (context.isNightMode) {
          this.cssValue = null;
          return;
        }
        const urls = parsed.urls?.length ? parsed.urls : [parsed.url];
        this._images = urls;
        this.cssValue = cssUrlBackground(urls[0], parsed.fit || DEFAULT_FIT);
        this._startRotation(hass, parsed, token, (url) => url);
        return;
      }
      case "media_folder": {
        if (context.isNightMode) {
          this.cssValue = null;
          return;
        }
        this._loadMediaFolder(hass, parsed, token);
        return;
      }
      default:
        this.cssValue = null;
    }
  }

  async _loadMediaFolder(hass, parsed, token) {
    try {
      const images = await browseImageFolder(hass, parsed.path);
      if (token !== this._token) return; // reconfigurée entre-temps
      this._images = images;
      if (!images.length) {
        console.warn(
          `[echo-home-card] aucune image trouvée dans le dossier Media Source "${parsed.path}"`
        );
        this.cssValue = null;
        this._onChange();
        return;
      }
      await this._showMediaAt(hass, parsed, token, 0);
      this._startRotation(hass, parsed, token, (id) => resolveMedia(hass, id));
    } catch (err) {
      if (token !== this._token) return;
      console.warn(
        `[echo-home-card] impossible de parcourir le dossier Media Source "${parsed.path}"`,
        err
      );
      this.cssValue = null;
      this._onChange();
    }
  }

  async _showMediaAt(hass, parsed, token, index) {
    try {
      const url = await resolveMedia(hass, this._images[index]);
      if (token !== this._token) return;
      this.cssValue = cssUrlBackground(url, parsed.fit || DEFAULT_FIT);
      this._onChange();
    } catch (err) {
      if (token !== this._token) return;
      console.warn(
        `[echo-home-card] impossible de charger une image du dossier Media Source`,
        err
      );
    }
  }

  // Commune à "url" (rotation directe, pas de résolution) et
  // "media_folder" (résolution à chaque image, cf. _showMediaAt) —
  // seulement démarrée si plusieurs images (une source à une seule image
  // n'a pas besoin de minuteur).
  _startRotation(hass, parsed, token, resolve) {
    if (this._images.length <= 1) return;
    const intervalMs = (parsed.interval || DEFAULT_INTERVAL) * 1000;
    this._timer = setInterval(async () => {
      if (token !== this._token) return;
      this._index = (this._index + 1) % this._images.length;
      if (parsed.type === "media_folder") {
        await this._showMediaAt(hass, parsed, token, this._index);
      } else {
        this.cssValue = cssUrlBackground(this._images[this._index], parsed.fit || DEFAULT_FIT);
        this._onChange();
      }
    }, intervalMs);
  }

  destroy() {
    clearInterval(this._timer);
    this._timer = null;
    this._token += 1; // annule toute résolution encore en vol
  }
}
