// Point d'entrée unique du bundle HACS "echo-dashboard".
//
// Chaque carte s'enregistre elle-même (customElements.define + ajout à
// window.customCards) dès qu'elle est importée — ce fichier ne fait donc
// qu'importer les 3 cartes pour effet de bord, afin que Vite les regroupe
// en un seul dist/echo-dashboard.js. C'est le fichier que HACS installe et
// que Lovelace charge comme ressource unique ; les 3 tags
// custom:echo-home-card / echo-player-card / echo-weather-card deviennent
// disponibles immédiatement, sans configuration supplémentaire (même
// principe que piitaya/lovelace-mushroom).
//
// Chaque carte garde son propre code source, sa propre version (package.json)
// et son propre CHANGELOG.md dans packages/<carte>/ — seul ce bundle a sa
// propre version (voir package.json et CHANGELOG.md à la racine), qui
// avance dès que le fichier livré change, quelle que soit la carte à
// l'origine du changement.
import "../packages/echo-home-card/src/echo-home-card.js";
import "../packages/echo-player-card/src/echo-player-card.js";
import "../packages/echo-weather-card/src/echo-weather-card.js";
