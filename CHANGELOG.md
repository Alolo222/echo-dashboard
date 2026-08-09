# Changelog

## 1.0.10

- Capture `docs/screenshot-round.png` de la 1.0.9 livrée par erreur avec
  la règle de mesure en pixels encore visible dessus (script de nettoyage
  qui n'a pas retiré l'overlay) — régénérée proprement.
- Polices du mode round agrandies (Echo Spot : écran plus petit,
  bénéficie de tailles plus généreuses) : horloge ~176px→208px, date
  ~51px→58px, icône météo ~62px→67px, température météo ~45px→51px sur
  un écran 480x480. Repositionnement de la date (1.0.9) toujours correct
  après coup (vérifié) puisque basé sur des coefficients relatifs, pas
  des valeurs fixes.

## 1.0.9

- Mode round : position de la date revue spécifiquement pour l'écran
  circulaire, plutôt que de réutiliser telle quelle la formule pensée
  pour un écran rectangulaire (paysage). Cette dernière centre l'encre
  dans l'espace jusqu'au "bas d'écran" — une notion qui n'existe pas
  vraiment sur un cercle, où la largeur disponible se rétrécit
  progressivement vers le bas plutôt que de s'arrêter net sur un bord
  plat. La date sied désormais plus haut, dans la partie du cercle
  encore confortablement large (marge horizontale disponible à hauteur
  du bas du texte : ~375px contre ~345px avant, mesuré).

## 1.0.8

- Ajustements fins demandés après la 1.0.7 : météo un peu plus dans le
  coin (top/left réduits d'environ un tiers), date légèrement remontée
  (~6px, coefficient du calcul d'encre ajusté de 0.4515 à 0.5315×D).

## 1.0.7

- **Bloc météo** : retour au retrait d'origine (1.0.4). Les 1.0.5/1.0.6
  étaient parties dans le mauvais sens/la mauvaise ampleur — signalé par
  l'utilisateur ("c'est pire, encore plus éloignée du bord").
- **Date toujours pas centrée sous l'horloge**, cette fois corrigé pour
  de bon : le calcul précédent égalisait les *boîtes* CSS
  (line-height:1), pas l'*encre* réellement visible du texte. Mesuré
  précisément via Canvas `measureText` (métriques de police réelles,
  pas la boîte de ligne) : la police (Nunito) laisse ~11-15% de vide
  sous les chiffres de l'horloge et ~6-15% sous la date, de façon
  asymétrique — d'où l'écart malgré des boîtes CSS égales. Nouveau
  calcul basé sur ces mesures réelles (coefficients empiriques propres
  à Nunito) : écart horloge→date et date→bas d'écran mesurés à 45.7px
  et 45.3px (0.4px d'écart, contre 62px/29px avant).
- Vérifié cette fois avec une règle en pixels superposée sur une
  capture à fond uni, en plus des mesures — pas seulement à l'œil sur
  la capture finale.

## 1.0.6

- Le retrait météo de la 1.0.5 était trop subtil pour être perceptible
  (~12px d'écart sur 960px de large). Nettement plus marqué cette fois
  (mesuré : 90px depuis la gauche, 43px depuis le haut, contre 44/29
  avant — plus du double).
- Pour clarifier un doute : ni `--_date-size` ni `--_weather-temp-size`
  n'ont changé depuis la 1.0.2 (vérifié dans l'historique et par
  mesure : les deux valent 72px sur 960x480, identique). L'impression de
  police plus grosse sur la météo vient du format ajouté en 1.0.3
  (`21.4°C` au lieu de `21°`, texte plus long à taille égale).

## 1.0.5

- Espace horloge→date désormais égal à l'espace date→bas d'écran (18px
  de chaque côté sur 960x480, vérifié par mesure exacte) — la date
  était trop basse par rapport à l'horloge. Calculé via `--_clock-size`
  et `--_date-size` plutôt qu'une valeur fixe, donc correct aussi en
  mode round.
- Bloc météo davantage en retrait du coin haut-gauche (paysage) / du
  bord haut (round).

## 1.0.4

- La 1.0.3 centrait le *groupe* horloge+date (flex column), pas
  l'horloge elle-même — la date, bien plus petite, tirait visiblement
  l'horloge au-dessus du centre réel de l'écran. Toujours visible sur la
  capture, signalé par l'utilisateur. Horloge et date sont maintenant
  positionnées indépendamment (absolu, centrées sur leurs propres axes) :
  l'horloge est pile au centre (vérifié par mesure exacte : milieu à
  240px sur 480, pas juste "à l'œil"), la date juste en dessous.
- Corrige au passage un débordement bas d'écran de la date (line-height
  par défaut du navigateur trop généreux, clippé silencieusement par
  `overflow: hidden` — invisible sur la capture précédente mais réel).
- Captures docs/ régénérées.

## 1.0.3

- **Horloge + date vraiment centrées verticalement.** La grille à 3
  bandes de la 1.0.2 (héritée du button-card d'origine) ancrait le bloc
  horloge+date en haut de l'écran, avec un vide en dessous — repéré sur
  appareil réel (photo de référence à l'appui). Le bloc météo est
  maintenant positionné indépendamment (overlay absolu en haut), et le
  groupe horloge+date se centre sur toute la hauteur de la carte, sans
  changer les tailles (déjà correctes depuis la 1.0.2).
- Température météo affichée avec sa décimale et son unité (`21.4°C`)
  plutôt qu'arrondie sans unité (`21°`), pour correspondre au format
  d'origine.
- Captures docs/ régénérées.

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
