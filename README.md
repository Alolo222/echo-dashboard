# Echo Dashboard

Un dashboard open source pour transformer un Amazon Echo Show 5 flashé sous [LineageOS](https://lineageos.org/) en véritable écran de contrôle domotique : assistant IA, lecteur [Music Assistant](https://www.music-assistant.io/), et dashboard [Home Assistant](https://www.home-assistant.io/) personnalisable — le tout dans une interface native, soignée, et correctement traduite en français.

## Pourquoi ce projet ?

Les solutions existantes pour ce genre d'usage (Fully Kiosk Browser, Dashie) sont des freewares fermés, avec des traductions françaises approximatives et des interfaces vieillissantes. Ce projet vise à faire une alternative **entièrement open source**, pensée dès le départ pour du multilingue propre et une UX moderne.

Le paysage open source existant a été étudié avant de démarrer — voir [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#contexte) pour le détail des projets comparables (View Assist, FreeKiosk, massDroid...) et pourquoi aucun ne couvre exactement ce périmètre.

## Fonctionnalités visées

- 🏠 **Dashboard** — affichage du Lovelace de votre instance Home Assistant, dans un shell kiosk propre (pas de réinvention de l'éditeur de dashboard : on s'appuie sur l'écosystème HA existant).
- 🎵 **Musique** — lecteur natif pour Music Assistant : bibliothèque, artwork, files d'attente, contrôle tactile fluide.
- 🎙️ **Assistant IA** — wake word local (openWakeWord), branché sur le pipeline Assist de Home Assistant (compatible avec le moteur IA de votre choix : local ou cloud).
- 🔒 **Mode kiosk** — verrouillage Device Owner natif, démarrage automatique, écran de veille, réglages clairs en français et en anglais.

## Matériel cible

Amazon Echo Show 5 (1ère génération) flashé sous LineageOS 18.1 (Android 11). Devrait fonctionner sur tout appareil Android similaire (API 30+) en usage écran fixe.

## Statut

🚧 Projet en tout début de développement. Voir les [issues](../../issues) pour l'avancement.

Chaque push sur `main` déclenche une compilation automatique (Gitea Actions) — voir [`docs/CI.md`](docs/CI.md) pour le fonctionnement et comment récupérer l'APK d'un build.

## Licence

Distribué sous licence [GPLv3](LICENSE) — voir [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#7-licence--gplv3) pour la justification de ce choix.

## Contribuer

Les contributions sont bienvenues. Le projet en est à ses fondations : toute aide sur l'architecture, les retours d'expérience LineageOS/Echo Show, ou la traduction est utile.
