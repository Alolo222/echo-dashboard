# Changelog

Ce changelog suit le **bundle** `dist/echo-dashboard.js` livré par HACS —
il avance à chaque changement du fichier livré, quelle que soit la carte
à l'origine du changement. Le détail par carte reste dans
`packages/<carte>/CHANGELOG.md` :
[echo-home-card](packages/echo-home-card/CHANGELOG.md),
[echo-player-card](packages/echo-player-card/CHANGELOG.md),
[echo-weather-card](packages/echo-weather-card/CHANGELOG.md).

## 1.4.0

`echo-player-card` passe à 0.2.0 : recherche tactile sur l'anneau de
progression en mise en page `round` (Echo Spot), et boutons/texte
agrandis d'environ 25-30 % dans cette même mise en page. Détail complet
dans
[packages/echo-player-card/CHANGELOG.md](packages/echo-player-card/CHANGELOG.md#020).

## 1.3.1

Documentation uniquement, aucun changement de code/dist : nouvelle
section **"Police pour tout le dashboard"** dans ce README — comment
charger une police (Nunito ou autre, pas installée sur l'appareil par
défaut) et l'appliquer via un thème HA à tout le dashboard, plutôt que
par carte. Manquait complètement jusqu'ici (chaque carte se contentait
de dire qu'elle hérite de `--primary-font-family` si définie, sans dire
comment la définir). `dashboard.yaml` gagne un exemple `theme:` commenté
en tête ; les README de echo-home-card/echo-weather-card/echo-player-card
pointent désormais vers cette section plutôt que de laisser deviner.

## 1.3.0

`echo-home-card` passe à 1.7.0 : menu de configuration visuel dans
l'éditeur de carte Lovelace (entités, navigation, éléments affichés,
mise en page/cadran, localisation, zoom) — plus besoin d'écrire le YAML
à la main pour l'essentiel. Fonds personnalisés/icônes restent YAML
uniquement. Détail complet dans
[packages/echo-home-card/CHANGELOG.md](packages/echo-home-card/CHANGELOG.md#170).

## 1.2.5

`echo-home-card` passe à 1.6.5 : docs uniquement (pas de changement de
code) — clarifie les noms des 4 styles de nuit dédiés (`aurore_night`,
`corail_night`, `atlas_night`, `soleil_night`), pas assez lisibles dans
le README/la capture jusqu'ici. Détail complet dans
[packages/echo-home-card/CHANGELOG.md](packages/echo-home-card/CHANGELOG.md#165).

## 1.2.4

`echo-home-card` passe à 1.6.4 : nouvelle option `night_mode_entity`
(source alternative pour le mode nuit — entité "sun" ou booléenne — à la
place de `satellite_entity.attributes.mode`, pénible à localiser selon
l'intégration View Assist installée). Détail complet dans
[packages/echo-home-card/CHANGELOG.md](packages/echo-home-card/CHANGELOG.md#164).

## 1.2.3

`echo-home-card` passe à 1.6.3 : météo/date agrandies sur le cadran
analogique, bouton de bascule remonté en mode round (était dans les
graduations). Détail complet dans
[packages/echo-home-card/CHANGELOG.md](packages/echo-home-card/CHANGELOG.md#163).

## 1.2.2

`echo-home-card` passe à 1.6.2 : corrige un saut de la trotteuse en mode
analogique (l'aiguille des secondes pouvait sauter vers une position
fausse à chaque re-rendu hors tick de minute — météo, entité satellite
— pas seulement une fois par minute). Détail complet dans
[packages/echo-home-card/CHANGELOG.md](packages/echo-home-card/CHANGELOG.md#162).

## 1.2.1

`echo-home-card` passe à 1.6.1 : les concepts de nuit (`aurore_night`,
`corail_night`, `atlas_night`, `soleil_night`) exposés en style à part,
sélectionnable pour prévisualiser un thème de nuit sans attendre/forcer
la vraie nuit. Détail complet dans
[packages/echo-home-card/CHANGELOG.md](packages/echo-home-card/CHANGELOG.md#161).

## 1.2.0

`echo-home-card` passe à 1.6.0 : les 7 styles analogiques planétaires de
1.5.0 remplacés par un ensemble à thème libre (corail, grenat, prisme,
atlas, carbone, soleil restylé), affiné sur plusieurs itérations avec
retours visuels réels. Nuits repensées "vibrantes" plutôt qu'atténuées.
Détail complet dans
[packages/echo-home-card/CHANGELOG.md](packages/echo-home-card/CHANGELOG.md#160).

## 1.1.0

`echo-home-card` passe à 1.5.0 : sept nouveaux styles de cadran
analogique planétaires (un par jour de la semaine, `analog_style: auto`
pour un choix automatique selon le jour), avec palette de nuit propre à
chacun. Détail complet dans
[packages/echo-home-card/CHANGELOG.md](packages/echo-home-card/CHANGELOG.md#150).

## 1.0.0

Première version du bundle. Fusionne les 3 repos précédemment séparés
(historique git complet conservé via `git subtree` dans `packages/`) en
une seule installation HACS :

- `echo-home-card` 1.4.5
- `echo-player-card` 0.1.0
- `echo-weather-card` 1.0.0

Aucun changement fonctionnel dans les cartes elles-mêmes à cette étape —
uniquement le regroupement en un seul `dist/echo-dashboard.js` (voir
`README.md`, section "Installer echo-dashboard").
