# echo-player-card

> [!NOTE]
> Projet à vocation personnelle : développé pour mes propres appareils
> (Echo Show 5 / Echo Spot). Il ne sera pas activement maintenu et les
> issues ne sont pas ouvertes. Envie de l'améliorer, de l'adapter ou
> d'aller plus loin ? Forkez le dépôt !

Lecteur média Home Assistant plein écran pour les petits smart displays
(Amazon Echo Show 5 / Echo Spot sous LineageOS/VACA + [View
Assist](https://dinki.github.io/View-Assist/)) — mais fonctionne dans
n'importe quel dashboard Lovelace. Pochette d'album en fond plein cadre
(repli sur un vinyle animé si aucune pochette n'est disponible), barre
de progression, transport complet, volume, sources et regroupement
multi-pièces.

C'est le remplacement, en vraie carte Lit, du lecteur média View Assist
par défaut — qui se contente d'agrandir la carte native
`custom:mod-card` + `media-control` de Lovelace en plein écran sur fond
noir. Même rôle (contrôler `media_player_entity` depuis l'écran), mais
dans le langage visuel du reste de la suite
([echo-home-card](https://git.alocoq.fr/alois/echo-home-card),
[echo-weather-card](https://git.alocoq.fr/alois/echo-weather-card))
plutôt que le chrome HA standard, avec en plus un vrai mode round pour
l'Echo Spot (qui n'existe pas côté `media-control`).

Statut : en développement (0.x) — pas encore vérifié sur Echo Show 5 /
Echo Spot en usage réel.

## Fonctionnalités

- **Pochette plein cadre ou vinyle** : la pochette de l'album
  (`entity_picture`) occupe tout l'écran (round) ou une colonne carrée
  (large). Si elle est absente, ou si l'URL fournie ne charge pas, la
  carte bascule automatiquement sur un vinyle animé (qui tourne pendant
  la lecture) — un seul composant, deux états, pas un réglage à
  choisir. Voir [Pochette et repli vinyle](#pochette-et-repli-vinyle).
- **Transport complet** : lecture/pause, précédent/suivant,
  lecture aléatoire, répétition (off/tout/un titre), volume — chaque
  contrôle n'apparaît que si l'intégration derrière
  `media_player_entity` le supporte réellement (cf.
  `supported_features`), pas de bouton mort à l'écran.
- **Barre de progression en direct** : la position affichée avance en
  continu entre deux mises à jour réelles de Home Assistant (qui
  n'arrivent qu'à chaque changement d'état, pas seconde par seconde),
  et devient une vraie poignée de recherche si l'intégration supporte
  le seek (mise en page large uniquement — l'anneau du mode round reste
  un simple indicateur, pas de recherche tactile en cercle).
- **Sources et regroupement multi-pièces** en popover sur place
  (`media_player.select_source`, `media_player.join`/`unjoin`) —
  mise en page large uniquement. **File d'attente** : navigue vers une
  vue dédiée du dashboard (`view_assist.navigate`, comme le bloc météo
  d'echo-home-card) plutôt que d'essayer d'afficher une liste de
  lecture — Home Assistant n'expose aucun attribut générique pour une
  file d'attente, contrairement à `source_list`/`group_members` qui
  sont standard.
- **Mode nuit** : piloté par l'attribut `mode` de l'entité satellite
  View Assist (`mode: "night"`, comme echo-home-card) — chrome assombri
  et désaturé, mais les contrôles restent utilisables (contrairement à
  la météo/date d'echo-home-card qui disparaissent complètement :
  couper un son de nuit doit rester possible sans rallumer l'écran à
  pleine luminosité).
- Mise en page alternative `layout: round` pour l'Echo Spot (écran
  circulaire) : pochette/vinyle plein cadre, anneau de progression au
  ras du bord, transport minimal (précédent/lecture/suivant) — le reste
  (shuffle/repeat/volume/sources/groupe) est réservé à la mise en page
  large, l'écran rond n'a pas la place pour tout caser lisiblement.
- Fonctionne sans planter si `media_player_entity` n'est pas configurée
  ou indisponible (affiche un état "aucune lecture" plutôt qu'une carte
  cassée) — mais contrairement à echo-home-card, cette carte n'a pas
  vraiment de sens sans entité : c'est un lecteur, pas une horloge.
- Thème personnalisable via variables CSS, sans surcharge de `ha-card`.

## Installation

### Via HACS (recommandé)

1. HACS → menu ⋮ → **Dépôts personnalisés**.
2. URL : `https://git.alocoq.fr/alois/echo-player-card`, catégorie
   **Dashboard**.
3. Installer **Echo Player Card**, puis recharger le frontend (Ctrl+F5
   sur la page du dashboard).

### Manuelle

1. Copier `dist/echo-player-card.js` dans `<config>/www/` (par exemple
   `<config>/www/echo-player-card.js`).
2. Ajouter la ressource dans **Paramètres → Tableaux de bord →
   Ressources** :
   - URL : `/local/echo-player-card.js`
   - Type : Module JavaScript
3. Recharger le frontend.

## Démarrage rapide

```yaml
type: custom:echo-player-card
media_player_entity: media_player.salon
satellite_entity: sensor.viewassist_salon
```

### L'utiliser comme vue lecteur View Assist

Dans la définition de la vue « music »/« media » de votre dashboard View
Assist, remplacer la carte `custom:button-card` (qui agrandit
`media-control` en plein écran) par celle-ci — `media_player_entity`
correspond à `variables.var_musicplayer_device` du template d'origine
(le plus souvent `sensor.viewassist_xxx.attributes.musicplayer_device`).

## Configuration complète

```yaml
type: custom:echo-player-card

# --- Entités ---
media_player_entity: null       # requis en pratique — sans elle, la
                                 # carte affiche juste "aucun lecteur
                                 # configuré"
satellite_entity: null          # entité satellite View Assist — lit
                                 # attributes.mode ("night" => mode nuit)

# --- Navigation (puce "File d'attente" uniquement) ---
dashboard: null                 # base du chemin envoyé à
                                 # view_assist.navigate, ex:
                                 # "dashboard-view-assist" — tant que non
                                 # renseigné, la puce ne s'affiche pas
queue_view: player-queue        # ajouté à `dashboard` -> "${dashboard}/${queue_view}"
navigate_device: null           # id passé en `device` au service —
                                 # sinon satellite_entity

# --- Regroupement multi-pièces ---
group_entities: []              # autres media_player proposés au
                                 # regroupement (media_player.join/unjoin)
                                 # — ex: [media_player.cuisine, media_player.chambre]
                                 # sans cette liste, la puce "Groupe"
                                 # reste masquée même si l'intégration
                                 # supporte le regroupement

# --- Éléments affichés (masqués si l'intégration ne les supporte pas,
# quelle que soit la valeur ci-dessous) ---
show_shuffle: true
show_repeat: true
show_volume: true
show_source: true
show_group: true
show_queue: true
show_clock: true                # petite heure en coin (mise en page large)

# --- Localisation ---
language: null                  # ex: "fr" — sinon hérite de hass.locale
time_format: null                # "12" ou "24" — sinon hérite de hass.locale

# --- Mise en page ---
layout: null                    # null (large, Echo Show) ou "round" (Echo Spot)

# --- Apparence ---
zoom: 1                          # facteur d'échelle manuel (CSS zoom),
                                  # filet de rattrapage si les tailles
                                  # fluides ne suivent pas correctement
```

## Pochette et repli vinyle

La pochette (`media_player_entity.attributes.entity_picture`) s'affiche
en fond plein cadre dès qu'elle est disponible **et charge
effectivement** — une URL qui répond en 404 (lien mort, jeton expiré)
fait aussi basculer sur le vinyle, pas seulement une pochette absente.
Dès que l'intégration expose une nouvelle URL (changement de morceau),
la carte retente de charger une image avant de retomber sur le vinyle.

Aucun réglage n'existe pour choisir explicitement entre les deux : c'est
un seul composant à deux états, pas deux styles. Le label du vinyle est
neutre (crème/tan), pas une couleur "extraite" d'une pochette qui
n'existe pas.

## Fonctionnalités et `supported_features`

Chaque contrôle (précédent/suivant, shuffle, repeat, volume, seek,
sources, regroupement) ne s'affiche que si le bit
[`supported_features`](https://www.home-assistant.io/integrations/media_player/)
correspondant est présent sur l'entité — les réglages `show_*`
permettent de masquer un contrôle supporté, jamais d'en faire
apparaître un qui ne l'est pas. Les intégrations media_player n'exposent
pas toutes le même sous-ensemble (Sonos, Spotify, Cast, Squeezebox...) :
c'est normal et attendu que la carte affiche des contrôles différents
selon l'entité configurée.

## CSS personnalisées

| Variable | Rôle | Défaut |
| --- | --- | --- |
| `--echo-player-accent` | Anneau/barre de progression, éléments actifs | `#ffd9a8` |
| `--echo-player-text-color` | Texte principal | `#ffffff` |
| `--echo-player-text-dim-color` | Texte secondaire (artiste, méta) | `rgba(255,255,255,.7)` |
| `--echo-player-radius` | Rayon des coins (mise en page large uniquement) | `0px` |
| `--echo-player-night-color` | Accent en mode nuit | `red` |
| `--echo-player-night-opacity` | Opacité du texte en mode nuit | `0.55` |
| `--echo-player-font-family` | Police — sinon `--primary-font-family` du thème HA | hérité |

## Licence

MIT — voir [LICENSE](LICENSE).
