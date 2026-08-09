# Changelog

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
