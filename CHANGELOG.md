# Changelog

## 1.4.4

- Captures `docs/` régénérées à nouveau (aucun changement de code) : le
  bouton digital/analogique y montrait un rond avec la lettre "A" ou "D"
  dedans — pas un bug de la carte, un artefact du harnais de test local
  utilisé pour produire ces captures (`<ha-icon>`, un composant du
  frontend Home Assistant réel, indisponible hors de HA ; imité par un
  repère texte minimal, suffisant pour vérifier position/contraste mais
  jamais pensé pour apparaître tel quel dans une capture montrée telle
  quelle). Remplacé par deux silhouettes SVG (montre à aiguilles / écran
  digital rectangulaire), pas des icônes MDI fidèles mais nettement
  moins trompeuses dans le contexte d'une capture.

## 1.4.3

- Captures `docs/` régénérées — la 1.4.2 (bouton digital/analogique
  repensé) et, pour `docs/screenshot.png`, la 1.3.0 (bouton disponible
  aussi en mode large) n'avaient pas été suivies d'une mise à jour des
  captures concernées, laissant sept images montrant un bouton absent
  ou périmé (icône et/ou position d'avant ces versions) :
  `screenshot.png`, `screenshot-round.png`, `screenshot-round-analog.png`,
  `screenshot-round-analog-styles.png`,
  `screenshot-round-analog-complications.png`,
  `screenshot-landscape-analog.png`, `screenshot-landscape-analog-photo.png`.
  `screenshot-night.png` vérifiée à jour (le bouton reste masqué la nuit,
  inchangé) — pas besoin d'y toucher.

## 1.4.2

- Bouton de bascule digital ↔ analogique repensé, signalé peu adapté à
  l'Echo Spot :
  - **Icône** : affiche maintenant le cadran ACTUEL plutôt que celui
    vers lequel on bascule (`clock-outline` en analogique, `clock-
    digital` en digital) — un repère d'état lisible au premier coup
    d'œil, plus utile ici qu'une convention façon bouton d'action
    classique. `clock-digital` se lisait mal une fois affiché en tout
    petit sur le cadran analogique lui-même.
  - **Position (round uniquement)** : décalé en bas à droite plutôt que
    centré en bas. Centré, le bouton finissait soit dans la pointe basse
    du cercle où la largeur disponible se rétrécit vite (position
    d'origine), soit — en le remontant pour corriger ça — à chevaucher
    le contenu déjà centré à cette hauteur (la date en digital, le
    chiffre "6" en analogique, repéré à l'écran en testant ce
    déplacement). En diagonale, il reste dans une zone large du disque
    sans entrer en concurrence avec ce contenu.
  - Cible tactile agrandie (40px → 44px) et un peu plus visible par
    défaut (opacité 0.5 → 0.55).
- Mode large inchangé (bas centré, jamais concerné par le problème de
  géométrie circulaire).

## 1.4.1

- **Deux nouveaux types d'arrière-plan** (`background`/`analog_background`,
  cf. 1.4.0) pour des photos aléatoires :
  - `picsum` : [Lorem Picsum](https://picsum.photos), aucune clé requise
    mais aucun filtrage par thème possible non plus — en creusant la
    question ("comment View Assist fait pour piocher au hasard sur
    Unsplash sans aucun réglage ?"), il s'avère que son option "Download
    random image from Unsplash" appelle en réalité `unsplash.it`, un
    ancien domaine qui redirige aujourd'hui vers ce même service Picsum
    — ce qui explique à la fois l'absence de réglage et le côté "vraiment
    aléatoire" observés. `width`/`height` suivent la taille réelle de
    l'écran par défaut (`window.innerWidth`/`innerHeight`), pas la peine
    de les préciser sauf pour économiser de la bande passante.
  - `unsplash` : la vraie API Unsplash, avec un vrai filtrage par
    mot-clé (`query`) et/ou orientation — clé API gratuite requise
    (`access_key`, compte développeur sur unsplash.com/developers,
    palier "Demo" 50 requêtes/heure). Nouvel appel `fetch()` direct
    (pas `hass.callWS`, service tiers) à chaque rotation ; une clé
    invalide, un quota dépassé ou une coupure réseau n'interrompent
    jamais l'affichage — avertit en console et garde la dernière photo
    chargée avec succès plutôt que de planter ou vider l'écran.
- Les deux jamais en mode round pour `analog_background` (même principe
  que les autres types dynamiques depuis 1.4.0) ; jamais la nuit.
- Corrigé en cours de route : passer d'un type à un autre (ex. satellite
  → unsplash) pouvait laisser affichée l'ancienne image le temps du
  premier chargement, ou pour de bon si ce premier chargement échouait
  (clé invalide dès le départ) — `media_folder` avait la même faille.
  Les deux effacent maintenant la valeur précédente avant de charger la
  nouvelle, un repli franc vers le dégradé par défaut valant mieux
  qu'une image d'un tout autre type qui n'a plus de rapport avec la
  config actuelle.
- Vérifié par Playwright (`window.fetch` mocké pour simuler l'API
  Unsplash) : succès, clé manquante (repli à la validation), erreur API
  (401), orientation invalide, rotation Picsum (nouveau tirage après
  l'intervalle), taille par défaut vs personnalisée, refus en mode
  round, non-régression complète.

## 1.4.0

- **Types d'arrière-plan précis**, pour `background` (digital) et
  `analog_background` (analogique, toujours indépendant de `background`)
  — chacun un objet `{type, ...}` plutôt qu'une simple chaîne CSS :
  - `satellite` (défaut en digital) et `style` (défaut en analogique) :
    comportement déjà existant, inchangés.
  - `css` : n'importe quelle valeur CSS `background` — une chaîne brute
    (`background: "#1a1a1a"`) reste acceptée comme raccourci équivalent,
    aucune config existante à retoucher.
  - `url` : une image web fixe, ou plusieurs qui tournent en diaporama
    (`urls` + `interval`), indépendant de `satellite_entity` — jusqu'ici
    seule une chaîne CSS ou le fond dynamique du satellite étaient
    possibles, pas d'image web personnalisée.
  - `media_folder` : dossier d'images en local sur HA, parcouru
    automatiquement via l'API Media Source (`media_source/browse_media`
    + `resolve_media`, résolution à la volée à chaque image plutôt qu'à
    l'avance — certains fournisseurs Media Source renvoient des URLs
    signées à durée de vie limitée). Ajouter/retirer une photo dans le
    dossier suffit, pas besoin de retoucher la config.
  - `fit` (`cover`/`contain`/`fill`) pour `url` et `media_folder`.
  - Nouveau module `src/background.js` (`BackgroundSource`, une instance
    par présentation) : pilote résolution et rotation en tâche de fond,
    `configure()` peut être appelée à chaque rendu sans effet de bord
    (ne relance le travail que si la source demandée a changé depuis le
    dernier appel).
- `analog_background_photo: true` (1.3.0) reste supporté tel quel,
  équivalent à `analog_background: { type: satellite }` — mais seulement
  si `analog_background` lui-même n'est pas défini.
- Jamais de type dynamique (`satellite`/`url`/`media_folder`) en mode
  round pour `analog_background` : repli silencieux (avec avertissement
  console) sur `style` — principe déjà établi pour
  `analog_background_photo`, maintenant garanti à la validation plutôt
  qu'au rendu.
- Corrigé en cours de route : la première mesure d'un dossier Media
  Source à durée de vie limitée introuvable/vide ne devait pas planter
  le rendu — testé explicitement (dossier inexistant mocké), avertit et
  retombe sur le fond par défaut plutôt que de casser la carte.
- Vérifié par Playwright (`hass.callWS` mocké pour simuler l'API Media
  Source) : parcours + résolution d'un dossier, rotation `url`/
  `media_folder` (changement effectif après l'intervalle configuré),
  filtrage des sous-dossiers/fichiers non-image, dossier introuvable,
  type invalide, les trois modes de cadrage, rétrocompatibilité
  (chaîne CSS brute, booléen `analog_background_photo`), et non-
  régression complète du reste de la carte.

## 1.3.1

- Corrigé : la date du cadran analogique en mode large rivalisait en
  taille avec la température plutôt que de rester secondaire — les deux
  utilisaient des tokens quasi identiques (`--_date-size` et
  `--_weather-temp-size`, tous deux ~15vh), sans problème quand ils sont
  loin l'un de l'autre (digital : date sous l'horloge géante, météo dans
  un coin) mais visible dès qu'ils sont côte à côte dans la même
  colonne. Nouveau token dédié `--_analog-landscape-date-size` (~8vh),
  proportionné à la météo plutôt qu'à l'horloge digitale — même rapport
  taille date/météo que dans les rendus présentés avant intégration
  (~0,55).
- Captures `docs/screenshot-landscape-analog.png` et
  `docs/screenshot-landscape-analog-photo.png` régénérées.

## 1.3.0

- **Horloge analogique en mode large (Echo Show)**, jusque-là round
  uniquement : cadran casé à droite plutôt que plein écran, météo et
  date en vrai bloc d'info à gauche (centré sur l'axe horizontal du
  cadran, symétrique) plutôt qu'en petite complication comme en round —
  il y a la place. Les cinq styles existants (`analog_style`)
  s'appliquent tels quels, juste redimensionnés/repositionnés
  (`--_analog-landscape-size`, cf. static styles) ; `clock_face` et le
  bouton de bascule fonctionnent désormais dans les deux mises en page.
- **`analog_background_photo`** : nouvelle option, mode large
  uniquement (sans effet en round, où le fond uni sans photo reste
  volontairement fidèle à l'Echo Spot d'origine) — remplace le fond uni
  du style par le fond dynamique du satellite (même mécanisme que
  `background` en digital, diaporama) avec un voile pour la lisibilité.
  `analog_style` est ignoré tant que cette option est active : les
  aiguilles/graduations repassent en blanc (comme `aurore`), une photo
  quelconque ne garantissant pas la lisibilité des couleurs d'un style
  donné.
- Conçu à partir de deux planches de rendus présentées avant intégration
  (disposition initiale, puis météo/date recentrées + vraie police/icône
  après retour que la première mouture "faisait trop basique") — la
  police Nunito/système du reste de la carte et la vraie icône Meteocons
  (déjà utilisées ailleurs, cf. `_renderWeather`/`_renderAnalogComplications`)
  s'appliquent ici sans changement de code : elles étaient déjà
  génériques, seul le mockup de présentation utilisait des repères
  provisoires (police système, glyphe dessiné à la main).
- Nouvelles captures `docs/screenshot-landscape-analog.png` et
  `docs/screenshot-landscape-analog-photo.png`.

## 1.2.5

- `docs/screenshot-round.png` régénérée : la 1.2.4 a changé la taille
  réellement rendue de l'horloge en mode round (toujours calée sur le
  pire cas désormais, cf. 1.2.4), rendant la capture existante
  trompeuse — elle montrait encore l'ancien rendu plein format d'avant
  ce correctif. Repéré en le demandant explicitement plutôt qu'au
  hasard. Mode large (paysage) inchangé (toujours à l'échelle 1 pour une
  heure normale), pas besoin d'y toucher.

## 1.2.4

- Corrigé : l'heure et la date changeaient de taille visible selon le
  nombre de chiffres affichés — signalé par l'utilisateur, confirmé par
  mesure : en mode round/24h, "9:41" (un chiffre à l'heure) s'affichait à
  pleine taille (échelle 1, cf. filet anti-débordement de la 1.2.3) alors
  que "23:59" (deux chiffres) était réduite (échelle ~0.8) — un
  changement de taille visible au passage de 9h à 10h, puis retour à la
  normale à minuit. La taille se base maintenant sur un texte "pire cas"
  fixe (heure et jour à deux chiffres, jamais affiché réellement) plutôt
  que sur l'heure/la date du moment : l'échelle ne dépend donc plus de
  quels chiffres sont affichés, seulement du format/de la langue/de la
  mise en page. Vérifié par mesure de la hauteur réellement rendue :
  identique pour une heure à un et à deux chiffres (166px en round/24h,
  212px en large/12h, 58px pour la date au 3 comme au 27 du mois).
- Corrigé en cours de route : la première implémentation mesurait en
  écrivant temporairement le texte pire-cas dans `.clock`/`.date`
  elles-mêmes avant de restaurer le texte réel — invisible à l'écran
  (échange synchrone) mais casse le suivi interne de Lit sur le nœud
  texte qu'il gère pour sa liaison `${...}` (`el.textContent =` le
  remplace par un nouveau nœud à chaque fois), provoquant une erreur au
  rendu suivant (`Cannot set properties of null`). Mesuré sur un clone
  détaché à la place — non suivi par Lit, rien à casser.

## 1.2.3

- **`analog_background`** : nouvelle option pour régler le fond du mode
  analogique indépendamment de `background` (qui ne concernait déjà que
  le digital dans les faits, mais sans façon de le dire explicitement) —
  sinon le dégradé par défaut du style choisi (`analog_style`). Simple
  champ YAML, pas besoin de `card_mod`/`--echo-home-analog-background`
  pour un réglage basique (la variable CSS reste disponible et garde la
  priorité si les deux sont définis). Vérifié : `background` n'a aucun
  effet en analogique et vice versa, dans les deux sens ; ni l'un ni
  l'autre ne s'affiche la nuit (comportement déjà existant, inchangé).
- **Correctif de débordement** : l'heure et la date en mode digital
  débordaient de l'écran dans plusieurs cas — repéré en mesurant
  (`getBoundingClientRect`), pas à l'œil : une heure à deux chiffres en
  format 24h débordait déjà en mode round ("23:59", 552px de contenu sur
  un disque de 480px), et le format 12h (qui ajoute "AM"/"PM") débordait
  même en mode large ("11:59PM", 1098px sur 960px). La date, elle,
  restait dans tous les cas testés (plusieurs langues) à une taille
  raisonnable.
  - Plutôt que deviner une largeur "sûre" par format/langue/mise en page
    (jamais garanti pour une langue non testée), l'heure et la date se
    mesurent maintenant après affichage (`scrollWidth`) et se réduisent
    (`transform: scale()`, format `--_fit-scale`) seulement si leur
    taille normale déborderait — le cas courant (heure à un chiffre,
    date française standard) n'est jamais rétréci inutilement.
  - Recalculé au redimensionnement de la carte (`ResizeObserver`), en
    plus de chaque rendu — utile surtout en aperçu d'éditeur Lovelace,
    la résolution d'un Echo Show/Spot réel ne changeant jamais après le
    premier rendu.

## 1.2.2

- Météo recentrée au-dessus du centre du cadran analogique (au lieu de
  calée à gauche en 1.2.1) — symétrique avec la date en dessous, sur
  l'axe midi-6h : rendu plus équilibré, moins comme une info plaquée
  dans un coin. Position choisie après retour en conditions réelles
  ("dans le navigateur") plutôt qu'en aperçu statique.

## 1.2.1

- **Météo et date sur le cadran analogique**, en complication discrète
  plutôt qu'absentes comme jusqu'ici : icône + température en haut à
  gauche du centre, date juste en dessous, dans la couleur propre à
  chaque style (`comp` dans `analog-styles.js`). Pilotées par les mêmes
  `show_weather`/`show_date` qu'en digital, avec les mêmes conditions
  (masquées la nuit, météo absente si l'entité est indisponible) — pas
  de nouvelle option de config.
- Icône réutilisée telle quelle de `_renderWeather` (même `<img>`, même
  résolution d'URL) plutôt qu'un glyphe redessiné ou un `<image>` SVG :
  c'est le seul mécanisme dont on sait qu'il garde les icônes Meteocons
  animées (SMIL) sur ce genre d'appareil.
- Les aiguilles (et graduations/chiffres) restent toujours visibles
  par-dessus la météo/date, comme le guichet de date d'une montre
  mécanique : la complication est un calque HTML séparé, positionné
  *avant* le `<svg>` du cadran dans le DOM plutôt que dedans — le SVG
  n'ayant pas de fond propre, l'ordre du DOM suffit à garantir l'ordre
  d'affichage sans z-index ni `<foreignObject>`.
- Corrigé en cours de route (style `clair`) : l'icône météo (blanche par
  défaut) était quasi invisible sur son fond clair. `iconFilter:
  "brightness(0)"` la repasse en silhouette encre pour ce style
  uniquement, cohérent avec le reste de son habillage (aucune autre
  couleur que l'encre).
- Nouvelle capture `docs/screenshot-round-analog-complications.png`.

## 1.2.0

- **Quatre nouveaux styles pour le cadran analogique** (mode round), en
  plus du dégradé d'origine devenu `aurore` : `mono` (fond noir,
  aiguilles blanches, seconde corail), `clair` (fond clair, aiguilles
  encre, sobre), `neon` (bleu nuit, cyan lumineux avec halo, seconde
  magenta) et `ardoise` (aiguilles rectangulaires plutôt que des traits,
  seule l'heure 12 est marquée). Choisi via la nouvelle option
  `analog_style` — un seul réglage YAML par installation, pas de bouton
  pour en changer à l'écran (contrairement à `clock_face`, qui bascule
  digital ↔ analogique). Partis d'une planche de 5 propositions
  présentée avant intégration ; `aurore` reste la valeur par défaut, donc
  aucun changement de rendu pour une config existante qui ne précise pas
  `analog_style`.
- Refactor : couleurs/épaisseurs/formes du cadran posées en attributs SVG
  par style (`src/analog-styles.js`) plutôt qu'en `currentColor` unique —
  nécessaire dès qu'un style a plusieurs couleurs à la fois (aiguilles
  d'une teinte, seconde d'une autre). Le mode nuit ignore ces couleurs et
  repasse tout en rouge très atténué quel que soit le style choisi, via
  une seule règle CSS ciblant une classe `.hand` commune à tous les
  éléments colorés (graduations, chiffres, aiguilles) plutôt que du
  `currentColor` hérité.
- Corrigé en cours de route (style `neon`) : le filtre de halo SVG
  (`feGaussianBlur`) rendait les aiguilles complètement invisibles. En
  cause : `filterUnits` par défaut (`objectBoundingBox`) calcule la
  région du filtre sur la boîte englobante de l'élément filtré — or les
  aiguilles sont des `<line>` verticales avant rotation (`x1 === x2`),
  donc une largeur de boîte nulle, qui écrase la région à rien. Fixé en
  passant `filterUnits="userSpaceOnUse"` avec une région en coordonnées
  du viewBox, indépendante de la géométrie de chaque élément filtré.
- La trotteuse respecte désormais `prefers-reduced-motion` : sans
  animation, elle affiche un angle statique recalculé au fil du tick
  d'horloge (30s) plutôt que de rester figée sur midi.
- Nouvelle capture `docs/screenshot-round-analog-styles.png` (les 5
  styles côte à côte).

## 1.1.4

- Chiffres (12/3/6/9) trop ramenés vers le centre du cadran (rayon 34)
  par rapport aux graduations des autres heures (rayon 41-45) — ils
  paraissaient flotter au milieu plutôt que marquer l'heure au même
  niveau que le reste des graduations. Repositionnés au rayon 41, sur
  le même cercle que le bord interne des graduations.

## 1.1.3

- Ajout d'une **aiguille des secondes** qui avance en continu, via une
  animation CSS (`@keyframes` + `animation-delay` négatif calé sur
  l'instant d'entrée en mode analogique) plutôt qu'un recalcul JS par
  seconde — un seul `transform` animé, composité par le GPU, pas de
  re-rendu Lit ni de repaint du reste du cadran à chaque frame. Vérifié :
  l'angle de l'aiguille avance de 6°/s (soit 360° en 60s), comme attendu.
- Chiffres à 12/3/6/9 (plutôt qu'une graduation) sur les positions
  correspondantes, comme sur une vraie photo du cadran de l'Echo Spot
  d'origine trouvée en ligne — le reste des heures garde de simples
  graduations fines.
- Dégradé de fond par défaut affiné pour se rapprocher de cette même
  photo (turquoise en haut, bleu-violet en bas), toujours personnalisable
  via `--echo-home-analog-background`.

## 1.1.2

- Le mode analogique était jusque-là juste une autre présentation de
  l'horloge, avec le fond photo/météo/date habituels autour — pas ce qui
  était demandé. C'est maintenant un véritable écran à part, comme
  l'Echo Spot d'origine sous Alexa : plus de photo de fond, plus de
  météo, plus de date, juste les aiguilles sur un fond bleu uni
  (dégradé radial, personnalisable via `--echo-home-analog-background`).
  La nuit, ce fond bleu n'est jamais utilisé — retombe sur le
  traitement nuit habituel (quasi noir), l'objectif de sobriété
  lumineuse prime sur le style.
- Les 12 graduations sont de nouveau toutes affichées (celles de midi/6h
  avaient été omises en 1.1.1 pour éviter la météo/la date — devenu
  inutile puisqu'elles ne s'affichent plus du tout en analogique).

## 1.1.1

- Le cadran analogique de la 1.1.0 était un petit médaillon (~50% du
  diamètre) au milieu de l'écran — très loin du cadran d'origine de
  l'Echo Spot, qui occupe tout le disque visible (vérifié sur une vraie
  capture du cadran "classic" trouvée en ligne). Refait en plein écran
  (`--_analog-size: 94%` du conteneur plutôt qu'un `clamp()` en px),
  graduations quasi au bord, traits plus fins (aiguilles et graduations)
  pour un rendu sobre.
- Graduations de midi et 6h omises : la météo et la date occupent déjà
  ces zones (haut/bas du cadran) et la graduation s'y superposait de
  façon maladroite plutôt que de s'effacer derrière.
- La date n'a plus de position dédiée en mode analogique : le cadran
  occupant désormais le même disque que le reste, le calcul déjà en
  place pour le mode digital (qui gère la courbe du cercle) convient
  tel quel.

## 1.1.0

- **Horloge analogique** (mode round uniquement) : cadran SVG (12
  graduations, aiguilles heure/minute) en alternative au digital, clin
  d'œil à l'horloge ronde de l'Echo Spot sous Alexa. Nouvelle option
  `clock_face` ("digital" par défaut, "analog"), et un petit bouton
  discret en bas du cadran (masqué la nuit) pour basculer — le choix est
  retenu en `localStorage` au-delà du rechargement de page.
- Corrigé en cours de route : les graduations généraires en boucle
  atterrissaient dans le mauvais espace de noms SVG (`xhtml` au lieu de
  `svg`) et ne s'affichaient pas du tout — un sous-template `html`
  séparé pour un élément SVG, au lieu du tag `svg` de Lit, casse le
  rendu. Repéré en inspectant `namespaceURI` sur le DOM réel, pas
  seulement à l'écran.
- Nouvelle capture `docs/screenshot-round-analog.png`.

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
