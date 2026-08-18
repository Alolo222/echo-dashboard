# Dashboard View Assist — echo-cards

Dashboard Home Assistant pour remplacer les vues par défaut de [View
Assist](https://github.com/dinki/View-Assist) par les cartes maison
[echo-home-card](https://git.alocoq.fr/alois/echo-home-card),
[echo-player-card](https://git.alocoq.fr/alois/echo-player-card) et
[echo-weather-card](https://git.alocoq.fr/alois/echo-weather-card).

C'est ce qui manquait pour que CoqPit arrête d'afficher le dashboard View
Assist générique : l'app lit l'attribut `dashboard` de l'entité satellite
View Assist (voir `settings["ha_dashboard"]` dans `Settings.kt` côté
CoqPit) — tant que cet attribut ne pointe pas vers un dashboard existant,
elle affiche le dashboard par défaut. Aucun changement côté APK n'est
nécessaire : une fois ce dashboard créé et l'attribut réglé côté HA,
CoqPit le chargera automatiquement.

## 1. Installer les 3 cartes dans Home Assistant

Si elles ne le sont pas déjà (HACS → Frontend → dépôt personnalisé, ou
copie manuelle de `dist/echo-*-card.js` dans `www/` + ressource
Lovelace) :
- `echo-home-card`
- `echo-player-card`
- `echo-weather-card`

Chaque repo a ses instructions d'installation dans son propre README.

## 2. Créer le nouveau dashboard

- Home Assistant → **Paramètres** → **Tableaux de bord** → **Ajouter un
  tableau de bord** → **Nouveau tableau de bord vierge**
- Titre : `ViewAssist` (ou ce que tu veux), icône libre
- **Note l'url_path proposé/choisi** (ex: `echo-view-assist`) — c'est la
  valeur à mettre partout où ce README dit `dashboard: echo-view-assist`
  dans `dashboard.yaml`
- Ouvre le nouveau dashboard → ⋮ → **Modifier le tableau de bord** → ⋮ →
  **Éditeur en mode brut (YAML)**
- Remplace tout le contenu par celui de [`dashboard.yaml`](dashboard.yaml)
  de ce dossier, après avoir remplacé les 6 champs marqués
  `# <-- À CHANGER` (entité satellite, media_player, entité météo,
  url_path du dashboard)
- **Enregistrer**

## 3. Pointer le satellite View Assist vers ce dashboard

- Home Assistant → **Paramètres** → **Appareils et services** →
  **Appareils** → ton appareil satellite (l'Echo Spot/Show concerné)
- Dans sa configuration View Assist, champ **Dashboard** : mets le même
  url_path que celui utilisé dans `dashboard.yaml` (ex:
  `/echo-view-assist` — avec ou sans le `/` initial selon ce que
  l'intégration attend, vérifie ce qu'elle propose)

## 4. Vérifier

Relance CoqPit sur l'appareil (ou attends le prochain rafraîchissement de
la WebView) — il doit maintenant charger la vue `home` de ce nouveau
dashboard au lieu du dashboard View Assist par défaut.

## Limites de cette première version

- Seules 3 vues sont couvertes (home/clock, music, weather) — View Assist
  en prévoit d'autres en standard (camera, alarm, calendar, thermostat,
  etc., voir `views/` du repo officiel) : à ajouter à la main dans
  `dashboard.yaml` avec des cartes standards HA si besoin, les echo-cards
  ne couvrent que ces 3 usages pour l'instant.
- La puce "File d'attente" d'`echo-player-card` référence une vue
  `player-queue` qui n'existe pas dans ce `dashboard.yaml` — elle ne
  s'affichera juste pas tant que cette vue n'est pas créée (aucune
  erreur, comportement documenté de la carte).

## Barre d'onglets en haut de l'écran

`dashboard.yaml` met `subview: true` sur les vues `music` et `weather`
(pas sur `home`) pour éviter que Home Assistant affiche une barre
d'onglets (Home | Music | Weather) — ce chrome HA n'a pas de sens ici
puisque la navigation se fait par `view_assist.navigate` (tap sur
l'horloge, la météo, la puce file d'attente), jamais en cliquant un
onglet. Avec une seule vue non-subview (`home`), HA masque la barre
entièrement.

Ceci dit, une vue `subview` affiche quand même une fine barre en haut
avec son nom + un bouton retour tant qu'on y est (comportement HA natif,
pas configurable par YAML) — bien moins gênant qu'une barre d'onglets
complète, mais pas du chrome zéro absolu. Pour la faire disparaître
totalement, il faut passer par du CSS (`card-mod` sur la vue, ou
Browsermod "Hide Header" si déjà installé pour d'autres raisons) — pas
inclus ici pour ne pas ajouter une dépendance HACS de plus si ce n'est
pas déjà gênant en pratique.

## Écran circulaire (Echo Spot)

`layout: round` est réglé par défaut sur les 3 cartes dans
`dashboard.yaml` — **ce n'est pas automatique**, aucune des cartes ne
détecte la forme de l'écran, c'est un réglage YAML explicite par carte
(pas un réglage global du dashboard). Si ce même dashboard sert aussi un
Echo Show rectangulaire, retire ces lignes `layout: round` (ou passe à
`layout: null`) sur les cartes concernées — potentiellement en dupliquant
le dashboard (un par forme d'écran) si les deux types d'appareils
partagent le même Home Assistant.
