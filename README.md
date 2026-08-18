# Echo dashboard — View Assist

Dashboard Home Assistant pour transformer un Amazon Echo Show/Spot flashé
sous LineageOS en écran de contrôle domotique, en s'appuyant sur
[CoqPit](https://git.alocoq.fr/alois/CoqPit) (fork de View Assist
Companion App) et les cartes maison
[echo-home-card](https://git.alocoq.fr/alois/echo-home-card),
[echo-player-card](https://git.alocoq.fr/alois/echo-player-card) et
[echo-weather-card](https://git.alocoq.fr/alois/echo-weather-card).

## Historique

Ce repo contenait auparavant le début d'une app Android native
from-scratch (assistant IA, dashboard WebView, lecteur Music Assistant —
voir l'historique git avant ce commit). Ce chantier est abandonné : tout
ce qu'il visait à faire (wrapper WebView Home Assistant, pont d'auth
externe, connexion satellite) existe déjà, en plus mature et déjà validé
sur device réel, dans **CoqPit**. Repartir d'un dashboard Lovelace
[View Assist](https://github.com/dinki/View-Assist) personnalisé au-dessus
de CoqPit atteint le même objectif pour une fraction du travail — pas
besoin de réécrire un client HA WebView qui existe déjà.

L'historique git d'avant ce pivot reste consultable (`git log`), rien
n'a été supprimé.

## Contenu

- [`dashboard.yaml`](dashboard.yaml) — dashboard Lovelace complet (vues
  home/music/weather) prêt à coller dans l'éditeur YAML brut de Home
  Assistant, avec les echo-cards à la place des vues button-card par
  défaut de View Assist.

## Installation

1. Installer les 3 cartes (`echo-home-card`, `echo-player-card`,
   `echo-weather-card`) dans Home Assistant (HACS ou copie manuelle dans
   `www/` + ressource Lovelace).
2. Créer un nouveau dashboard vierge dans Home Assistant, ouvrir
   l'éditeur en mode brut (YAML), coller le contenu de `dashboard.yaml`
   — après avoir remplacé les champs marqués `# <-- À CHANGER` (entités
   satellite/media_player/météo, url_path du dashboard).
3. Dans la configuration View Assist de l'appareil satellite (Paramètres
   → Appareils), régler le champ **Dashboard** sur l'url_path choisi à
   l'étape 2.
4. Relancer CoqPit sur l'appareil — il charge automatiquement ce
   dashboard (attribut `dashboard` de l'entité satellite, lu par
   `Settings.kt` côté CoqPit).

## Limites actuelles

- Seules 3 vues sont couvertes (home/clock, music, weather) — View
  Assist en prévoit d'autres en standard (camera, alarm, calendar,
  thermostat...) : à ajouter à la main avec des cartes HA classiques si
  besoin.
- La puce "File d'attente" d'`echo-player-card` référence une vue
  `player-queue` qui n'existe pas dans `dashboard.yaml` — elle ne
  s'affiche simplement pas tant que cette vue n'est pas créée (pas
  d'erreur).
- Pas de mode `round` explicitement activé pour l'Echo Spot 1ère gen —
  voir la doc d'`echo-home-card` (`layout: round`) si l'écran est
  circulaire.

## Licence

GPLv3 — voir [LICENSE](LICENSE).
