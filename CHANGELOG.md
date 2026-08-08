# Changelog

## 1.0.2

- Portage fidèle des proportions du button-card d'origine, remplaçant
  l'échelle "maison" introduite en 1.0.0/1.0.1 : grille à 3 bandes
  (15vh/50vh/15vh) avec horloge à 55vh, date **et** bloc météo tous deux
  à 15vh (même poids visuel, pas un sous-titre discret) — la 1.0.1
  agrandissait déjà tout, mais avec des ratios propres à la carte plutôt
  que ceux de l'original.
- Bloc météo repositionné en haut de la colonne de gauche (comme
  l'original, `grid-template-areas: "weather status"`), toujours
  recentré en mode round pour rester hors des coins clippés par le
  boîtier.
- Captures docs/ régénérées.

## 1.0.1

- Horloge, date et bloc météo nettement plus grands (horloge notamment,
  qui se rapproche désormais de l'échelle "55vh" du template View Assist
  d'origine) — le texte occupait trop peu d'espace à l'écran en v1.0.0.

## 1.0.0

Première version. Réplique en vraie carte Lit la vue d'accueil View
Assist (horloge + météo compacte, `custom:button-card` personnalisé) :
mêmes attributs lus (`mode`, `background` sur l'entité satellite) et même
service appelé au tap sur la météo (`view_assist.navigate`).

### Fonctionnalités

- Horloge géante + date sur fond dynamique (attribut `background` de
  l'entité satellite), avec voile sombre pour la lisibilité.
- Mini bloc météo cliquable (icône [Meteocons](https://github.com/basmilius/meteocons)
  + température), navigue vers la vue météo via `view_assist.navigate`.
- Mode nuit piloté par l'attribut `mode` du satellite : fond masqué,
  horloge rouge très atténuée, date et météo masquées.
- Deux mises en page : large (`layout: null`, Echo Show) et circulaire
  (`layout: round`, Echo Spot — bloc météo repositionné hors des coins
  clippés par le boîtier).
- Aucune entité requise — fonctionne comme simple horloge sans config.
- Tailles fluides basées sur `vh`/`vmin` (pas besoin de la mécanique
  `cqw`/repli `vw` de echo-weather-card, cette carte étant pensée pour du
  plein écran).
- Personnalisation via variables CSS (couleurs, tailles, police) sans
  surcharger `ha-card`.
- `zoom` : filet de rattrapage manuel si les tailles fluides ne
  correspondent pas à l'attendu sur un appareil donné.
- Validation légère de la configuration (avertissement + repli sur
  défaut plutôt qu'échec silencieux).

### Notes de compatibilité

- Testé en rendu headless (Playwright, 960x480 et 480x480, scénarios
  jour/nuit/round) : aucune erreur console, service `view_assist.navigate`
  bien appelé au tap. Vérification sur Echo Show 5 / Echo Spot 1ère gen
  réels à faire avant usage quotidien (GPU/WebView différents d'un
  navigateur headless).
