# echo-dashboard

Bundle HACS unique regroupant 3 cartes Lovelace maison — **echo-home-card**
(horloge + météo compacte), **echo-player-card** (lecteur média plein
écran) et **echo-weather-card** (météo détaillée) — pour smart displays
Home Assistant (Echo Show 5 / Echo Spot sous LineageOS + [View
Assist](https://github.com/dinki/View-Assist)), plus le `dashboard.yaml`
de référence pour les utiliser ensemble.

Une seule installation HACS donne accès aux 3 tags
`custom:echo-home-card` / `custom:echo-player-card` /
`custom:echo-weather-card` (même principe que
[Mushroom](https://github.com/piitaya/lovelace-mushroom) : tout est
regroupé dans un seul `dist/echo-dashboard.js`). Chaque carte garde son
propre code, sa propre version et son propre changelog dans
[`packages/`](packages) — voir le README de chacune pour le détail de ses
options (`packages/echo-home-card/README.md`,
`packages/echo-player-card/README.md`,
`packages/echo-weather-card/README.md`). Ce README-ci ne couvre que
l'assemblage : installation du bundle et mise en place du dashboard
`dashboard.yaml` qui les utilise toutes les trois.

C'est aussi ce qui manquait pour que CoqPit arrête d'afficher le
dashboard View Assist générique : l'app lit l'attribut `dashboard` de
l'entité satellite View Assist (voir `settings["ha_dashboard"]` dans
`Settings.kt` côté CoqPit) — tant que cet attribut ne pointe pas vers un
dashboard existant, elle affiche le dashboard par défaut. Aucun
changement côté APK n'est nécessaire : une fois ce dashboard créé et
l'attribut réglé côté HA, CoqPit le chargera automatiquement.

## 1. Installer echo-dashboard dans Home Assistant

Une seule carte à ajouter (HACS → Frontend → dépôt personnalisé
`echo-dashboard`, ou copie manuelle de `dist/echo-dashboard.js` dans
`www/` + ressource Lovelace) — les 3 tags `custom:echo-*-card` sont
disponibles immédiatement après, aucune étape supplémentaire par carte.

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

## Barre d'onglets en haut de l'écran → Browsermod, pas `subview`

`dashboard.yaml` garde volontairement les 3 vues (`home`, `music`,
`weather`) normales, sans `subview: true`. Un essai réel avec
`subview: true` sur music/weather a bien fait disparaître la barre
d'onglets, mais a aussi cassé le **swipe tactile** entre les vues : une
vue `subview` sort du carrousel swipable de HA en plus de sortir de la
barre d'onglets — comportement natif HA, pas contournable en YAML.

La bonne solution, c'est celle du [wiki officiel View
Assist](https://github.com/dinki/View-Assist/wiki/View-Assist-dashboard-and-views#browsermod-settings) :
masquer le header (qui contient la barre d'onglets) **visuellement** via
[Browsermod](https://github.com/thomasloven/hass-browser_mod), pas en
retirant des vues du dashboard — les 3 vues restent normales, swipe
compris, seul le chrome autour disparaît.

1. Installer Browsermod (HACS → Intégrations)
2. Ouvrir Browsermod depuis la barre latérale HA → **Frontend Settings**
3. **Hide Header** → **+ Add Browser Setting** → sélectionner le
   navigateur de l'appareil (l'Echo Spot/Show, identifié par sa
   connexion WebView CoqPit) → activer → OK
4. **Hide Sidebar** → même procédure
5. (Optionnel) **Default Dashboard** → même procédure → choisir
   `ViewAssist` — pratique si l'appareil a plusieurs dashboards, pour
   qu'il revienne toujours sur celui-ci par défaut

Répéter pour chaque appareil satellite visuel.

## Écran circulaire (Echo Spot)

`layout: round` est réglé par défaut sur les 3 cartes dans
`dashboard.yaml` — **ce n'est pas automatique**, aucune des cartes ne
détecte la forme de l'écran, c'est un réglage YAML explicite par carte
(pas un réglage global du dashboard). Si ce même dashboard sert aussi un
Echo Show rectangulaire, retire ces lignes `layout: round` (ou passe à
`layout: null`) sur les cartes concernées — potentiellement en dupliquant
le dashboard (un par forme d'écran) si les deux types d'appareils
partagent le même Home Assistant.
