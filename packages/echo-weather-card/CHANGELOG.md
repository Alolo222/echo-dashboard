# Changelog

## 1.0.0

Première version stable. Développée et testée en conditions réelles sur
un Amazon Echo Show 5 et un Echo Spot 1ère génération (2017), tous deux
sous LineageOS + View Assist.

### Fonctionnalités

- Carte météo compacte sans chrome (`entity: weather.xxx` seul suffit) :
  actuelle, prévisions horaires et journalières, indice UV, qualité de
  l'air, vent, point de rosée, lever/coucher du soleil, horloge, date,
  phase de lune, saint du jour.
- Deux mises en page : large (`layout: null`, Echo Show — sections
  empilées) et circulaire (`layout: round`, Echo Spot — écran d'accueil
  minimal avec navigation au tap vers des fenêtres de détail).
- Fenêtres de détail (`ha-dialog`) pour la météo actuelle, les
  prochaines heures et les prochains jours en mode round ; détail d'un
  jour cliquable dans les deux mises en page.
- Icônes [Meteocons](https://github.com/basmilius/meteocons), animées
  pour la météo actuelle uniquement (figées pour les prévisions —
  préserve le FPS sur du matériel modeste).
- Thème clair/sombre automatique d'après le soleil (`theme_mode: auto`),
  ou forcé.
- Prévisions via l'API moderne de Home Assistant (souscription
  WebSocket), avec repli sur `weather.get_forecasts`.
- Personnalisation complète via variables CSS (couleurs, tailles,
  fond, police) sans surcharger `ha-card`.
- `zoom` : filet de rattrapage manuel si les tailles fluides ne
  correspondent pas à l'attendu sur un appareil donné (WebView non
  standard, densité d'écran particulière...).
- Validation légère de la configuration (avertissement + repli sur
  défaut plutôt qu'échec silencieux ou rendu cassé).

### Notes de compatibilité

- Nécessite un navigateur/WebView supportant les *container queries*
  CSS pour un dimensionnement optimal ; repli automatique sur des
  unités `vw` sinon (voir [Taille du
  texte](README.md#taille-du-texte)).
- `ha-dialog` : testé avec l'implémentation MDC/mwc classique et la
  migration récente vers WebAwesome (`wa-dialog`) de Home Assistant.
