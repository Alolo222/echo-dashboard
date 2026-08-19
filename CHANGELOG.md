# Changelog

Ce changelog suit le **bundle** `dist/echo-dashboard.js` livré par HACS —
il avance à chaque changement du fichier livré, quelle que soit la carte
à l'origine du changement. Le détail par carte reste dans
`packages/<carte>/CHANGELOG.md` :
[echo-home-card](packages/echo-home-card/CHANGELOG.md),
[echo-player-card](packages/echo-player-card/CHANGELOG.md),
[echo-weather-card](packages/echo-weather-card/CHANGELOG.md).

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
