# Changelog

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
