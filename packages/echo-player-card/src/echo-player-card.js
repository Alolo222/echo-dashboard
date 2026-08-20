import { LitElement, html, css, nothing } from "lit";
import { CARD_TAG, DEFAULT_CONFIG, FEATURE } from "./const.js";
import { formatDuration, formatClockTime, currentPosition } from "./format.js";

// SELECT_SOURCE n'est pas dans FEATURE (const.js) — utilisé une seule
// fois ici, pas besoin de l'exposer plus largement.
const SELECT_SOURCE = 2048;

// Réplique en vraie carte Lit du lecteur média View Assist par défaut
// (custom:button-card qui agrandit la carte native `media-control` de
// Lovelace en plein écran sur fond noir) — même rôle, mais dans le
// langage visuel du reste de la suite (echo-home-card, echo-weather-card)
// plutôt que le chrome HA standard, avec en plus un vrai mode round pour
// l'Echo Spot (qui n'existe pas côté media-control).
//
// Pochette de l'album en fond plein cadre quand media_player_entity
// expose `entity_picture` (et que l'image charge effectivement) ;
// repli automatique sur un vinyle animé sinon — un seul composant, deux
// états, pas un réglage à choisir (cf. README, section Pochette/vinyle).
class EchoPlayerCard extends LitElement {
  static properties = {
    _config: { state: true },
    _artFailedUrl: { state: true }, // dernière entity_picture qui a fait
    // échouer le <img> (404, réseau...) — bascule sur le vinyle tant que
    // l'intégration ne fournit pas une URL différente (cf. _hasArt)
    _sourcesOpen: { state: true },
    _groupOpen: { state: true },
    _seekDragFrac: { state: true }, // 0-1 position while dragging the round ring
    // (see _renderRound/_onRingPointer*) - null when not dragging, so the ring
    // falls back to the real, HA-reported position.
  };

  constructor() {
    super();
    this._artFailedUrl = null;
    this._sourcesOpen = false;
    this._groupOpen = false;
    this._seekDragFrac = null;
  }

  // Aucune entité n'est requise pour que setConfig réussisse — sans
  // media_player_entity, la carte affiche juste un état "aucun lecteur
  // configuré" (cf. _renderEmpty) plutôt que de planter, comme le reste
  // de la suite. Elle n'est pas pour autant "utile à vide" comme
  // echo-home-card (une horloge a un sens sans rien configurer, un
  // lecteur média non plus) — la différence est assumée, pas un oubli.
  setConfig(config) {
    const merged = { ...DEFAULT_CONFIG, ...config };
    this._config = this._validateConfig(merged, config || {});
  }

  _validateConfig(merged, rawConfig) {
    const warn = (key, fallback) =>
      console.warn(
        `[echo-player-card] "${key}" invalide (${JSON.stringify(rawConfig[key])}), valeur par défaut utilisée (${JSON.stringify(fallback)})`
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
    if (!Array.isArray(merged.group_entities)) {
      warn("group_entities", DEFAULT_CONFIG.group_entities);
      merged.group_entities = DEFAULT_CONFIG.group_entities;
    }
    // Non bloquant, comme echo-home-card : évite la surprise silencieuse
    // d'une puce "File d'attente" qui ne réagit jamais au tap faute d'id
    // à passer au service view_assist.navigate.
    if (merged.dashboard && !merged.navigate_device && !merged.satellite_entity) {
      console.warn(
        '[echo-player-card] "dashboard" est configuré mais ni "navigate_device" ni "satellite_entity" ne fournissent d\'id à passer au service view_assist.navigate — la puce "File d\'attente" ne sera pas cliquable.'
      );
    }
    if (!merged.media_player_entity) {
      console.warn(
        '[echo-player-card] "media_player_entity" n\'est pas configuré — la carte affichera un état "aucun lecteur configuré".'
      );
    }
    return merged;
  }

  static getStubConfig(hass) {
    const playerEntity = Object.keys(hass.states).find((id) =>
      id.startsWith("media_player.")
    );
    return playerEntity ? { media_player_entity: playerEntity } : {};
  }

  getCardSize() {
    return 6;
  }

  connectedCallback() {
    super.connectedCallback();
    // Position "live" pendant la lecture : media_position ne change côté
    // HA qu'à chaque événement (play/pause/seek...), pas en continu — un
    // tick à la seconde ré-extrapole l'écoulement réel entre deux
    // événements (cf. currentPosition, format.js) plutôt que de laisser
    // la barre/l'anneau figés jusqu'au prochain état. Ne redéclenche un
    // rendu que si un morceau est effectivement en cours (pas de coût
    // pour un lecteur à l'arrêt).
    this._positionTimer = setInterval(() => {
      if (this._stateObj()?.state === "playing") this.requestUpdate();
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._positionTimer);
  }

  _stateObj() {
    return this._config?.media_player_entity
      ? this._hass?.states[this._config.media_player_entity]
      : undefined;
  }

  set hass(hass) {
    const cfg = this._config;
    const prevPlayer = this._hass?.states[cfg?.media_player_entity];
    const prevSatellite = this._hass?.states[cfg?.satellite_entity];
    const prevGroup = cfg?.group_entities?.map((id) => this._hass?.states[id]);
    this._hass = hass;
    if (!cfg) return;

    const nextPlayer = hass.states[cfg.media_player_entity];
    const nextSatellite = hass.states[cfg.satellite_entity];
    const nextGroup = cfg.group_entities?.map((id) => hass.states[id]);
    const groupChanged =
      prevGroup?.length !== nextGroup?.length ||
      nextGroup?.some((s, i) => s !== prevGroup[i]);
    if (prevPlayer !== nextPlayer || prevSatellite !== nextSatellite || groupChanged) {
      this.requestUpdate();
    }
  }

  get hass() {
    return this._hass;
  }

  _isNightMode(satelliteState) {
    return satelliteState?.attributes?.mode === "night";
  }

  _supports(stateObj, bit) {
    return ((stateObj.attributes.supported_features || 0) & bit) === bit;
  }

  // Une pochette est "disponible" tant que l'URL fournie n'est pas celle
  // qui a déjà échoué au chargement (cf. _onArtError) — une nouvelle URL
  // (changement de morceau) retente toujours, même si la précédente
  // avait échoué.
  _hasArt(stateObj) {
    const url = stateObj.attributes.entity_picture;
    return Boolean(url) && url !== this._artFailedUrl;
  }

  _onArtError(url) {
    this._artFailedUrl = url;
  }

  _call(domain, service, entityId, data) {
    this._hass.callService(domain, service, { entity_id: entityId, ...(data || {}) });
  }

  _playPause(stateObj) {
    this._call("media_player", "media_play_pause", stateObj.entity_id);
  }
  _prev(stateObj) {
    this._call("media_player", "media_previous_track", stateObj.entity_id);
  }
  _next(stateObj) {
    this._call("media_player", "media_next_track", stateObj.entity_id);
  }
  _toggleShuffle(stateObj) {
    this._call("media_player", "shuffle_set", stateObj.entity_id, {
      shuffle: !stateObj.attributes.shuffle,
    });
  }
  _cycleRepeat(stateObj) {
    const next = { off: "all", all: "one", one: "off" }[stateObj.attributes.repeat || "off"];
    this._call("media_player", "repeat_set", stateObj.entity_id, { repeat: next || "off" });
  }
  _setVolume(stateObj, event) {
    this._call("media_player", "volume_set", stateObj.entity_id, {
      volume_level: Number(event.target.value),
    });
  }
  _seek(stateObj, event) {
    this._call("media_player", "media_seek", stateObj.entity_id, {
      seek_position: Number(event.target.value),
    });
  }

  // Recherche tactile sur l'anneau (mode round) — le range HTML natif de
  // _renderProgress (mise en page large) n'a pas d'équivalent circulaire,
  // donc drag au doigt géré à la main via Pointer Events : down capture le
  // pointeur sur l'anneau et fige _seekDragFrac (le rendu suit alors le
  // doigt, pas l'état HA réel) ; move met à jour cette fraction ; up envoie
  // le seek réel puis relâche - un seul appel de service en fin de geste,
  // pas un par pixel (même logique que l'input range en large : @change,
  // pas @input). setPointerCapture sur down garantit que move/up
  // continuent d'arriver même si le doigt sort du cercle en cours de
  // geste (comportement standard d'un slider).
  _onRingPointerDown(stateObj, event) {
    if (!this._supports(stateObj, FEATURE.SEEK)) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    this._seekDragFrac = this._fracFromPointerEvent(event);
  }
  _onRingPointerMove(event) {
    if (this._seekDragFrac == null) return;
    this._seekDragFrac = this._fracFromPointerEvent(event);
  }
  _onRingPointerUp(stateObj, event) {
    if (this._seekDragFrac == null) return;
    const duration = stateObj.attributes.media_duration;
    const frac = this._seekDragFrac;
    this._seekDragFrac = null;
    if (duration != null) {
      this._call("media_player", "media_seek", stateObj.entity_id, {
        seek_position: frac * duration,
      });
    }
  }
  // Angle depuis midi (12h), sens horaire, normalisé en fraction 0-1 - même
  // convention que le remplissage de l'anneau (stroke-dasharray sur un
  // cercle tourné de -90deg, cf. styles). atan2(dx, -dy) plutôt que le
  // atan2(dy, dx) habituel : place directement le zéro en haut et fait
  // croître l'angle dans le sens horaire, sans étape de conversion en plus.
  _fracFromPointerEvent(event) {
    const rect = event.currentTarget.closest("svg").getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    let angle = Math.atan2(dx, -dy);
    if (angle < 0) angle += 2 * Math.PI;
    return angle / (2 * Math.PI);
  }
  _selectSource(stateObj, source) {
    this._call("media_player", "select_source", stateObj.entity_id, { source });
    this._sourcesOpen = false;
  }
  // "join" cible le lecteur principal (data.group_members = la liste
  // complète souhaitée) ; "unjoin" cible directement le membre qui doit
  // quitter le groupe — deux services HA génériques, pas symétriques en
  // paramètres (cf. doc media_player).
  _toggleGroupMember(stateObj, memberId, isMember) {
    if (isMember) {
      this._call("media_player", "unjoin", memberId);
    } else {
      const current = stateObj.attributes.group_members || [];
      this._call("media_player", "join", stateObj.entity_id, {
        group_members: [...new Set([...current, memberId])],
      });
    }
  }
  _navigateToQueue() {
    const cfg = this._config;
    const device = cfg.navigate_device || cfg.satellite_entity;
    const path = `${cfg.dashboard}/${cfg.queue_view}`;
    this._hass.callService("view_assist", "navigate", { device, path });
  }

  _cardStyle() {
    return this._config.zoom != null && this._config.zoom !== 1
      ? `zoom:${this._config.zoom}`
      : "";
  }

  render() {
    if (!this._config || !this._hass) return nothing;
    const cfg = this._config;
    const isRound = cfg.layout === "round";

    const satelliteState = cfg.satellite_entity
      ? this._hass.states[cfg.satellite_entity]
      : undefined;
    const isNightMode = this._isNightMode(satelliteState);
    this.classList.toggle("night", isNightMode);

    const stateObj = this._stateObj();
    const cardClass = `card ${isRound ? "round" : ""}`;

    if (!stateObj || ["unavailable", "unknown"].includes(stateObj.state)) {
      return html`
        <div class=${cardClass} style=${this._cardStyle()}>
          ${isRound ? this._renderRoundEmpty() : this._renderLandscapeEmpty()}
        </div>
      `;
    }

    const isPlaying = stateObj.state === "playing";
    return html`
      <div class=${cardClass} style=${this._cardStyle()}>
        ${isRound
          ? this._renderRound(stateObj, isPlaying)
          : this._renderLandscape(stateObj, isPlaying)}
      </div>
    `;
  }

  // -------------------- Round (Echo Spot) --------------------

  _renderRound(stateObj, isPlaying) {
    const attrs = stateObj.attributes;
    const hasArt = this._hasArt(stateObj);
    const duration = attrs.media_duration;
    const position = currentPosition(stateObj);
    const seekable = this._supports(stateObj, FEATURE.SEEK) && duration != null;
    // Pendant un drag, l'anneau et le temps affiché suivent le doigt
    // (_seekDragFrac), pas l'état HA réel - qui ne bouge de toute façon pas
    // avant le _seek envoyé au relâchement (cf. _onRingPointerUp).
    const dragging = seekable && this._seekDragFrac != null;
    const frac = dragging
      ? this._seekDragFrac
      : duration
        ? Math.min(1, (position || 0) / duration)
        : 0;
    const displayPosition = dragging ? frac * duration : position;

    return html`
      <div class="art-layer ${hasArt ? "" : "no-art"}">
        ${hasArt
          ? html`<img
              class="art-img"
              src=${attrs.entity_picture}
              alt=""
              @error=${() => this._onArtError(attrs.entity_picture)}
            />`
          : this._renderVinyl(isPlaying)}
      </div>
      ${hasArt ? html`<div class="scrim"></div>` : nothing}
      <svg class="ring ${dragging ? "dragging" : ""}" viewBox="0 0 100 100">
        <circle class="track" cx="50" cy="50" r="48" pathLength="100"></circle>
        <circle
          class="fill"
          cx="50"
          cy="50"
          r="48"
          pathLength="100"
          style="stroke-dasharray:${(frac * 100).toFixed(2)} 100"
        ></circle>
        ${seekable
          ? html`<circle
              class="hit-area"
              cx="50"
              cy="50"
              r="48"
              pathLength="100"
              aria-label="Position de lecture"
              @pointerdown=${(e) => this._onRingPointerDown(stateObj, e)}
              @pointermove=${(e) => this._onRingPointerMove(e)}
              @pointerup=${(e) => this._onRingPointerUp(stateObj, e)}
              @pointercancel=${(e) => this._onRingPointerUp(stateObj, e)}
            ></circle>`
          : nothing}
      </svg>
      <div class="content">
        ${duration != null
          ? html`<span class="time">${formatDuration(displayPosition)} / ${formatDuration(duration)}</span>`
          : nothing}
        <div class="track-title">${attrs.media_title || "—"}</div>
        ${attrs.media_artist ? html`<div class="track-artist">${attrs.media_artist}</div>` : nothing}
        ${this._renderTransportCompact(stateObj, isPlaying)}
      </div>
    `;
  }

  _renderRoundEmpty() {
    return html`
      <div class="art-layer no-art">${this._renderVinyl(false)}</div>
      <div class="content">
        <div class="track-title empty">
          ${this._config.media_player_entity ? "Aucune lecture" : "Aucun lecteur configuré"}
        </div>
      </div>
    `;
  }

  _renderTransportCompact(stateObj, isPlaying) {
    const canPrev = this._supports(stateObj, FEATURE.PREVIOUS_TRACK);
    const canNext = this._supports(stateObj, FEATURE.NEXT_TRACK);
    return html`
      <div class="transport">
        ${canPrev
          ? html`<button class="ctrl small" aria-label="Précédent" @click=${() => this._prev(stateObj)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>`
          : nothing}
        <button
          class="ctrl play"
          aria-label=${isPlaying ? "Pause" : "Lecture"}
          @click=${() => this._playPause(stateObj)}
        >
          <ha-icon icon=${isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${canNext
          ? html`<button class="ctrl small" aria-label="Suivant" @click=${() => this._next(stateObj)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>`
          : nothing}
      </div>
    `;
  }

  // -------------------- Large (Echo Show) --------------------

  _renderLandscape(stateObj, isPlaying) {
    const cfg = this._config;
    const attrs = stateObj.attributes;
    const hasArt = this._hasArt(stateObj);
    const duration = attrs.media_duration;
    const position = currentPosition(stateObj);
    const frac = duration ? Math.min(1, (position || 0) / duration) : 0;
    const locale = cfg.language || this._hass.locale?.language || "en";
    const timeFormat = cfg.time_format || this._hass.locale?.time_format || "24";
    const sourceLabel = attrs.source || attrs.app_name;
    const metaLine = [attrs.media_artist, attrs.media_album_name].filter(Boolean).join(" — ");

    return html`
      <div class="art-col ${hasArt ? "with-art" : "no-art"}">
        ${hasArt
          ? html`<img
              class="art-img"
              src=${attrs.entity_picture}
              alt=""
              @error=${() => this._onArtError(attrs.entity_picture)}
            />`
          : this._renderVinyl(isPlaying)}
      </div>
      <div class="info-col">
        <div class="top-row">
          <div class="device-name">
            <ha-icon icon="mdi:speaker"></ha-icon>
            <span>${attrs.friendly_name || ""}</span>
          </div>
          ${cfg.show_clock
            ? html`<span class="clock">${formatClockTime(new Date(), locale, timeFormat)}</span>`
            : nothing}
        </div>
        <div class="title-block">
          ${sourceLabel ? html`<span class="eyebrow-src">${sourceLabel}</span>` : nothing}
          <h3 class="track-title-lg">${attrs.media_title || "—"}</h3>
          ${metaLine ? html`<span class="track-meta">${metaLine}</span>` : nothing}
        </div>
        ${duration != null ? this._renderProgress(stateObj, position, duration, frac) : nothing}
        ${this._renderTransportFull(stateObj, isPlaying)}
        ${cfg.show_volume && this._supports(stateObj, FEATURE.VOLUME_SET)
          ? this._renderVolume(stateObj)
          : nothing}
        ${this._renderChips(stateObj)}
      </div>
    `;
  }

  _renderLandscapeEmpty() {
    return html`
      <div class="art-col no-art">${this._renderVinyl(false)}</div>
      <div class="info-col">
        <div class="title-block">
          <h3 class="track-title-lg empty">
            ${this._config.media_player_entity ? "Aucune lecture" : "Aucun lecteur configuré"}
          </h3>
        </div>
      </div>
    `;
  }

  _renderProgress(stateObj, position, duration, frac) {
    const seekable = this._supports(stateObj, FEATURE.SEEK);
    return html`
      <div class="progress-row">
        <time>${formatDuration(position)}</time>
        <div class="bar">
          <div class="fill" style="width:${(frac * 100).toFixed(2)}%"></div>
          ${seekable
            ? html`<input
                type="range"
                class="range-overlay"
                min="0"
                max=${duration}
                step="1"
                .value=${String(position ?? 0)}
                aria-label="Position de lecture"
                @change=${(e) => this._seek(stateObj, e)}
              />`
            : nothing}
        </div>
        <time>${formatDuration(duration)}</time>
      </div>
    `;
  }

  _renderTransportFull(stateObj, isPlaying) {
    const cfg = this._config;
    const attrs = stateObj.attributes;
    const canPrev = this._supports(stateObj, FEATURE.PREVIOUS_TRACK);
    const canNext = this._supports(stateObj, FEATURE.NEXT_TRACK);
    const canShuffle =
      cfg.show_shuffle && this._supports(stateObj, FEATURE.SHUFFLE_SET) && attrs.shuffle !== undefined;
    const canRepeat =
      cfg.show_repeat && this._supports(stateObj, FEATURE.REPEAT_SET) && attrs.repeat !== undefined;
    return html`
      <div class="transport-lg">
        ${canShuffle
          ? html`<button
              class="ctrl ghost-sm ${attrs.shuffle ? "active" : ""}"
              aria-label="Lecture aléatoire"
              aria-pressed=${attrs.shuffle ? "true" : "false"}
              @click=${() => this._toggleShuffle(stateObj)}
            >
              <ha-icon icon="mdi:shuffle"></ha-icon>
            </button>`
          : nothing}
        ${canPrev
          ? html`<button class="ctrl mid" aria-label="Précédent" @click=${() => this._prev(stateObj)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>`
          : nothing}
        <button
          class="ctrl play-lg"
          aria-label=${isPlaying ? "Pause" : "Lecture"}
          @click=${() => this._playPause(stateObj)}
        >
          <ha-icon icon=${isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${canNext
          ? html`<button class="ctrl mid" aria-label="Suivant" @click=${() => this._next(stateObj)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>`
          : nothing}
        ${canRepeat
          ? html`<button
              class="ctrl ghost-sm ${attrs.repeat && attrs.repeat !== "off" ? "active" : ""}"
              aria-label="Répéter"
              aria-pressed=${attrs.repeat && attrs.repeat !== "off" ? "true" : "false"}
              @click=${() => this._cycleRepeat(stateObj)}
            >
              <ha-icon icon=${attrs.repeat === "one" ? "mdi:repeat-once" : "mdi:repeat"}></ha-icon>
            </button>`
          : nothing}
      </div>
    `;
  }

  _renderVolume(stateObj) {
    const attrs = stateObj.attributes;
    const level = attrs.volume_level ?? 0;
    const icon =
      attrs.is_volume_muted || level === 0
        ? "mdi:volume-off"
        : level < 0.5
          ? "mdi:volume-medium"
          : "mdi:volume-high";
    return html`
      <div class="volume-row">
        <ha-icon icon=${icon}></ha-icon>
        <div class="bar">
          <div class="fill" style="width:${(level * 100).toFixed(0)}%"></div>
          <input
            type="range"
            class="range-overlay"
            min="0"
            max="1"
            step="0.01"
            .value=${String(level)}
            aria-label="Volume"
            @input=${(e) => this._setVolume(stateObj, e)}
          />
        </div>
        <span class="pct">${Math.round(level * 100)}%</span>
      </div>
    `;
  }

  // Trois accès secondaires — pas d'attribut HA générique pour une file
  // de lecture (contrairement à source_list/group_members, standard),
  // donc "File d'attente" navigue vers une vue dédiée plutôt que
  // d'essayer de deviner une UI par intégration (cf. const.js). Sources
  // et Groupe, eux, sont pilotables directement (services HA génériques)
  // et s'ouvrent en popover sur place.
  _renderChips(stateObj) {
    const cfg = this._config;
    const attrs = stateObj.attributes;
    const chips = [];

    const hasSources =
      cfg.show_source && this._supports(stateObj, SELECT_SOURCE) && attrs.source_list?.length;
    if (hasSources) {
      chips.push(html`
        <button
          class="chip"
          aria-expanded=${this._sourcesOpen ? "true" : "false"}
          @click=${() => {
            this._sourcesOpen = !this._sourcesOpen;
            this._groupOpen = false;
          }}
        >
          <ha-icon icon="mdi:cast"></ha-icon>Sources
        </button>
      `);
    }
    const hasGroup =
      cfg.show_group && this._supports(stateObj, FEATURE.GROUPING) && cfg.group_entities.length;
    if (hasGroup) {
      chips.push(html`
        <button
          class="chip"
          aria-expanded=${this._groupOpen ? "true" : "false"}
          @click=${() => {
            this._groupOpen = !this._groupOpen;
            this._sourcesOpen = false;
          }}
        >
          <ha-icon icon="mdi:speaker-multiple"></ha-icon>Groupe
        </button>
      `);
    }
    const hasQueue = cfg.show_queue && cfg.dashboard && (cfg.navigate_device || cfg.satellite_entity);
    if (hasQueue) {
      chips.push(html`
        <button class="chip" @click=${() => this._navigateToQueue()}>
          <ha-icon icon="mdi:playlist-music"></ha-icon>File d'attente
        </button>
      `);
    }
    if (!chips.length) return nothing;

    const anyOpen = this._sourcesOpen || this._groupOpen;
    return html`
      <div class="chip-row">${chips}</div>
      ${anyOpen
        ? html`<div
            class="popover-backdrop"
            @click=${() => {
              this._sourcesOpen = false;
              this._groupOpen = false;
            }}
          ></div>`
        : nothing}
      ${this._sourcesOpen ? this._renderSourcesPopover(stateObj) : nothing}
      ${this._groupOpen ? this._renderGroupPopover(stateObj) : nothing}
    `;
  }

  _renderSourcesPopover(stateObj) {
    const attrs = stateObj.attributes;
    return html`
      <div class="popover" role="listbox" @click=${(e) => e.stopPropagation()}>
        ${attrs.source_list.map(
          (src) => html`
            <button
              class="popover-item ${src === attrs.source ? "current" : ""}"
              role="option"
              aria-selected=${src === attrs.source ? "true" : "false"}
              @click=${() => this._selectSource(stateObj, src)}
            >
              ${src === attrs.source ? html`<ha-icon icon="mdi:check"></ha-icon>` : nothing}
              <span>${src}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  _renderGroupPopover(stateObj) {
    const members = stateObj.attributes.group_members || [];
    return html`
      <div class="popover" @click=${(e) => e.stopPropagation()}>
        ${this._config.group_entities.map((id) => {
          const memberState = this._hass.states[id];
          const name = memberState?.attributes?.friendly_name || id;
          const isMember = members.includes(id);
          return html`
            <button
              class="popover-item ${isMember ? "current" : ""}"
              aria-pressed=${isMember ? "true" : "false"}
              @click=${() => this._toggleGroupMember(stateObj, id, isMember)}
            >
              <ha-icon icon=${isMember ? "mdi:speaker-multiple" : "mdi:speaker-off"}></ha-icon>
              <span>${name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  // -------------------- Pochette / vinyle --------------------

  // Repli commun round + large : disque tournant pendant la lecture
  // (animation-play-state plutôt que ajouter/retirer l'animation, pour
  // reprendre la rotation là où elle s'est arrêtée à la reprise, comme
  // un vrai vinyle) — label neutre crème/tan, pas de couleur "extraite"
  // d'une pochette qui n'existe pas ici (cf. README).
  _renderVinyl(isPlaying) {
    return html`
      <div class="vinyl-wrap ${isPlaying ? "spinning" : ""}">
        <div class="vinyl"></div>
        <div class="label"></div>
      </div>
      <div class="tonearm"></div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      --_accent: var(--echo-player-accent, #ffd9a8);
      --_text-color: var(--echo-player-text-color, #ffffff);
      --_text-dim: var(--echo-player-text-dim-color, rgba(255, 255, 255, 0.7));
      --_radius: var(--echo-player-radius, 0px);
      --_night-color: var(--echo-player-night-color, red);
      --_night-opacity: var(--echo-player-night-opacity, 0.55);
      font-family: var(--echo-player-font-family, var(--primary-font-family, inherit));
      color: var(--_text-color);
    }

    :host(.night) {
      --_accent: var(--_night-color);
    }

    .card {
      position: relative;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: var(--_radius);
      background: #000;
      display: flex;
    }

    .card.round {
      border-radius: 50%;
      display: block;
    }

    .card:not(.round) {
      container-type: inline-size;
    }

    /* Mode nuit : chrome assombri/désaturé plutôt que masqué — à la
       différence d'echo-home-card (météo/date), on veut pouvoir couper
       un son de nuit sans rallumer l'écran à pleine luminosité, les
       contrôles restent donc utilisables. */
    :host(.night) .art-img,
    :host(.night) .art-col.with-art::after,
    :host(.night) .vinyl,
    :host(.night) .label {
      filter: grayscale(0.5) brightness(0.4);
    }
    :host(.night) .track-title,
    :host(.night) .track-title-lg,
    :host(.night) .track-artist,
    :host(.night) .track-meta,
    :host(.night) .time,
    :host(.night) time {
      opacity: var(--_night-opacity);
    }

    .icon,
    ha-icon {
      display: block;
    }

    .ctrl {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.07);
      color: #fff;
      border-radius: 50%;
      cursor: pointer;
      padding: 0;
      transition: transform 0.15s ease, background 0.15s ease, opacity 0.15s ease;
    }
    .ctrl:hover {
      background: rgba(255, 255, 255, 0.14);
      transform: scale(1.06);
    }
    .ctrl:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
    .ctrl:active {
      transform: scale(0.96);
    }

    time,
    .time {
      font-variant-numeric: tabular-nums;
    }

    /* -------------------- Vinyle (repli commun) -------------------- */
    .vinyl-wrap {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      aspect-ratio: 1;
      animation: spin-vinyl 7s linear infinite;
      animation-play-state: paused;
    }
    .vinyl-wrap.spinning {
      animation-play-state: running;
    }
    @media (prefers-reduced-motion: reduce) {
      .vinyl-wrap {
        animation-play-state: paused !important;
      }
    }
    @keyframes spin-vinyl {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    .vinyl {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background:
        repeating-radial-gradient(circle, rgba(255, 255, 255, 0.05) 0 2px, transparent 2px 6px),
        radial-gradient(circle at 35% 30%, #2c2c31 0%, #1a1a1e 42%, #0a0a0c 75%, #000 100%);
      box-shadow: 0 10px 26px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
    }
    .label {
      position: absolute;
      inset: 32%;
      border-radius: 50%;
      background: radial-gradient(circle at 38% 32%, #f0e2c2 0%, #d8bd8a 60%, #c2a068 100%);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35), inset 0 0 0 5px rgba(0, 0, 0, 0.08);
    }
    .label::after {
      content: "";
      position: absolute;
      inset: 46%;
      border-radius: 50%;
      background: #14100c;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
    }
    .tonearm {
      position: absolute;
      top: 4%;
      right: 8%;
      width: 6%;
      height: 36%;
      transform-origin: top center;
      transform: rotate(24deg);
      z-index: 2;
    }
    .tonearm::before {
      content: "";
      position: absolute;
      inset: 0;
      margin: 0 auto;
      width: 26%;
      height: 100%;
      left: 37%;
      background: linear-gradient(#d9dbe3, #9a9ea8);
      border-radius: 3px;
    }
    .tonearm::after {
      content: "";
      position: absolute;
      top: -10%;
      left: 50%;
      width: 13px;
      height: 13px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: #c8cad2;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    /* ==================== Round (Echo Spot) ==================== */
    .card.round {
      background: radial-gradient(130% 140% at 18% -10%, #24406a 0%, #14233c 45%, #0a1424 100%);
    }
    .card.round .art-layer {
      position: absolute;
      inset: 0;
    }
    .card.round .art-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .card.round .scrim {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.55) 30%, transparent 58%);
    }
    .card.round .ring {
      position: absolute;
      inset: 0;
      z-index: 1;
    }
    .card.round .ring circle {
      fill: none;
    }
    .card.round .ring .track {
      stroke: rgba(255, 255, 255, 0.16);
      stroke-width: 2.2;
    }
    .card.round .ring .fill {
      stroke: var(--_accent);
      stroke-width: 2.2;
      stroke-linecap: round;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      transition: stroke-dasharray 1s linear;
    }
    /* Pendant un drag, le doigt doit être suivi immédiatement : la
       transition normale (qui lisse l'avancée automatique entre deux
       updates HA) donnerait un anneau "en retard" sur le geste. */
    .card.round .ring.dragging .fill {
      transition: none;
    }
    /* Cercle invisible plus épais que le trait visible, posé par-dessus
       l'anneau pour agrandir la zone tactile réellement saisissable au
       doigt (2.2 de trait est bien trop fin à viser sur un écran rond de
       montre/Echo Spot). pointer-events: stroke plutôt que "all" pour
       ne capter que la bande de l'anneau, pas tout le disque intérieur
       (qui doit rester cliquable pour play/pause au centre). */
    .card.round .ring .hit-area {
      stroke: transparent;
      stroke-width: 22;
      pointer-events: stroke;
      cursor: grab;
      touch-action: none;
    }
    .card.round .content {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 11%;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 0 17%;
      text-align: center;
    }
    .card.round .time {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.55);
      margin-bottom: 2px;
    }
    .card.round .track-title {
      font-weight: 600;
      font-size: clamp(1.15rem, 5.6vw, 1.4rem);
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .card.round .track-title.empty {
      color: var(--_text-dim);
      font-weight: 500;
    }
    .card.round .track-artist {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.72);
    }
    .card.round .transport {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-top: 6px;
    }
    .card.round .ctrl.small {
      width: 38px;
      height: 38px;
      font-size: 19px;
    }
    .card.round .ctrl.play {
      width: 58px;
      height: 58px;
      font-size: 28px;
      background: #fff;
      color: #14100c;
      border: none;
    }
    .card.round .ctrl.play:hover {
      background: #ffe9d2;
    }
    .card.round .ctrl.small ha-icon,
    .card.round .ctrl.play ha-icon {
      --mdc-icon-size: 1.1em;
    }

    /* ==================== Large (Echo Show) ==================== */
    .card:not(.round) {
      flex-direction: row;
    }
    .art-col {
      position: relative;
      height: 100%;
      aspect-ratio: 1;
      flex-shrink: 0;
      overflow: hidden;
    }
    .art-col.with-art {
      background: #000;
    }
    .art-col .art-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .art-col.with-art::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, transparent 55%, rgba(10, 12, 18, 0.55) 100%);
    }
    .art-col.no-art {
      background: radial-gradient(150% 150% at 20% -10%, #24406a 0%, #14233c 45%, #0a1424 100%);
    }
    .art-col.no-art .vinyl-wrap {
      width: 74%;
    }

    .info-col {
      position: relative;
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: clamp(14px, 4.5%, 26px) clamp(16px, 5%, 28px);
      background: linear-gradient(165deg, #141721 0%, #0a0c12 100%);
      color: #fff;
    }
    .art-col.with-art + .info-col {
      background: linear-gradient(165deg, rgba(10, 12, 18, 0.55) 0%, #0a0c12 30%);
    }

    .top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.72rem;
      color: var(--_text-dim);
      gap: 10px;
    }
    .top-row .device-name {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .top-row .device-name span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .top-row ha-icon {
      --mdc-icon-size: 13px;
      flex-shrink: 0;
    }
    .top-row .clock {
      flex-shrink: 0;
    }

    .title-block {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: auto;
      min-width: 0;
    }
    .title-block .eyebrow-src {
      font-weight: 800;
      font-size: 0.66rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--_accent);
    }
    .title-block .track-title-lg {
      font-weight: 600;
      font-size: clamp(1.15rem, 8cqw, 1.7rem);
      line-height: 1.15;
      margin: 0;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .title-block .track-title-lg.empty {
      color: var(--_text-dim);
      font-weight: 500;
    }
    .title-block .track-meta {
      font-size: 0.86rem;
      color: var(--_text-dim);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .progress-row,
    .volume-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .progress-row time {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.55);
      flex-shrink: 0;
    }
    .volume-row {
      color: var(--_text-dim);
    }
    .volume-row ha-icon {
      --mdc-icon-size: 15px;
      flex-shrink: 0;
    }
    .volume-row .pct {
      font-size: 0.72rem;
      width: 2.6em;
      text-align: right;
      color: rgba(255, 255, 255, 0.55);
      flex-shrink: 0;
    }
    .progress-row .bar,
    .volume-row .bar {
      position: relative;
      flex: 1;
      height: 4px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.16);
    }
    .progress-row .fill {
      background: var(--_accent);
    }
    .volume-row .fill {
      background: rgba(255, 255, 255, 0.65);
    }
    .progress-row .fill,
    .volume-row .fill {
      position: absolute;
      inset: 0;
      width: 0%;
      border-radius: 999px;
      pointer-events: none;
    }
    /* Le curseur natif est superposé, transparent, uniquement pour
       l'interaction/l'accessibilité — le rendu visuel vient de .fill
       en dessous (cf. _renderProgress/_renderVolume). */
    .range-overlay {
      position: absolute;
      inset: -10px 0;
      width: 100%;
      height: 24px;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
    }
    .range-overlay:focus-visible {
      opacity: 1;
    }
    .range-overlay::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--_accent);
    }
    .range-overlay::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border: none;
      border-radius: 50%;
      background: var(--_accent);
    }

    .transport-lg {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(10px, 3cqw, 22px);
    }
    .transport-lg .ctrl.ghost-sm {
      width: 32px;
      height: 32px;
      font-size: 14px;
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.5);
    }
    .transport-lg .ctrl.ghost-sm.active {
      color: var(--_accent);
    }
    .transport-lg .ctrl.ghost-sm:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }
    .transport-lg .ctrl.mid {
      width: 38px;
      height: 38px;
      font-size: 17px;
    }
    .transport-lg .ctrl.play-lg {
      width: 52px;
      height: 52px;
      font-size: 24px;
      background: #fff;
      color: #14100c;
      border: none;
    }
    .transport-lg .ctrl.play-lg:hover {
      background: #ffe9d2;
    }
    .transport-lg .ctrl ha-icon {
      --mdc-icon-size: 1.1em;
    }

    .chip-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      position: relative;
    }
    .chip {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--_text-dim);
      font-size: 0.74rem;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .chip:hover,
    .chip[aria-expanded="true"] {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
    }
    .chip ha-icon {
      --mdc-icon-size: 14px;
    }

    .popover-backdrop {
      position: fixed;
      inset: 0;
      z-index: 3;
    }
    .popover {
      position: absolute;
      z-index: 4;
      bottom: calc(100% + 10px);
      left: 0;
      min-width: 180px;
      max-width: 260px;
      max-height: 220px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 6px;
      border-radius: 12px;
      background: #171a24;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.6);
    }
    .popover-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--_text-dim);
      font-size: 0.82rem;
      text-align: left;
      cursor: pointer;
    }
    .popover-item:hover,
    .popover-item:focus-visible {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }
    .popover-item.current {
      color: var(--_accent);
    }
    .popover-item ha-icon {
      --mdc-icon-size: 15px;
      flex-shrink: 0;
    }
    .popover-item span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;
}

customElements.define(CARD_TAG, EchoPlayerCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: "Echo Player Card",
  description:
    "Lecteur média plein écran pour smart displays (Echo Show, Echo Spot, View Assist).",
});
