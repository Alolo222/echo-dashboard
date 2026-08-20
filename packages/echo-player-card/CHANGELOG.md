# Changelog

## 0.3.0

Pont optionnel avec CoqPit (requiert la version CoqPit correspondante,
docs/mass-bridge-plan.md côté CoqPit) : quand la carte tourne dans la
WebView de CoqPit et que le pont est configuré côté appareil, l'état du
lecteur (titre/artiste/position/pochette) et les commandes
lecture/pause/seek/volume passent directement par le Sendspin/Music
Assistant natif de l'appareil au lieu de faire l'aller-retour par Home
Assistant - qui pour cet appareil précis repart en fait vers lui-même.
Purement additif : sans CoqPit (navigateur, appli HA mobile...) ou sans
le pont configuré, comportement strictement identique à avant (100%
Home Assistant).

## 0.2.1

Suite aux retours sur 0.2.0, mise en page `round` (Echo Spot) :

- **Recherche tactile enfin fonctionnelle.** La zone tactile de 0.2.0
  était une forme SVG (`<circle>` + `pointer-events: stroke`) : le geste
  ne déclenchait rien du tout sur la WebView système d'un Echo Spot sous
  LineageOS (pas de mise à jour WebView via Play Store). Remplacée par
  un `<div>` HTML classique superposé à l'anneau, avec Pointer Events
  *et* Touch Events en repli l'un de l'autre (Touch Events étant l'API
  historique, plus largement supportée). Vérifié par un test DOM réel
  (happy-dom) simulant les deux séquences de gestes de bout en bout,
  jusqu'à l'appel `media_seek`.
- **Texte encore agrandi** (~1.5× par rapport à 0.2.0) : temps, titre,
  artiste.
- **Pochette légèrement en retrait de l'anneau** plutôt que pleine cadre
  jusqu'au bord de la carte — laisse un espace visible entre le disque
  et l'anneau de progression, comme demandé.

## 0.2.0

Mise en page `round` (Echo Spot) : recherche tactile sur l'anneau de
progression (glisser le doigt le long de l'anneau pour choisir la
position de lecture, comme le slider de la mise en page large — seek
au relâchement du doigt, uniquement si l'intégration le supporte) ;
boutons de transport et texte (titre, artiste, temps) agrandis
d'environ 25-30 % pour rester lisibles/atteignables sur le petit écran
rond.

## 0.1.0

Première version.

- Pochette plein cadre avec repli automatique sur un vinyle animé en
  l'absence d'`entity_picture` (ou si le chargement échoue).
- Transport (lecture/pause, précédent/suivant, shuffle, repeat, volume),
  affiché selon `supported_features` de l'entité.
- Barre de progression en direct, recherche tactile si l'intégration
  supporte le seek (mise en page large).
- Sources et regroupement multi-pièces en popover ; file d'attente en
  navigation vers une vue dédiée (`view_assist.navigate`).
- Mode nuit piloté par l'entité satellite View Assist.
- Mise en page `round` dédiée à l'Echo Spot.
