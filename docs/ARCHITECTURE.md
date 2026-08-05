# Architecture

Ce document trace les décisions structurantes du projet et leur justification, pour éviter d'avoir à les re-débattre à chaque contribution.

## Contexte

Cible matérielle : Amazon Echo Show 5 (1ère génération) flashé sous **LineageOS 18.1** (Android 11 / API 30), via l'exploit `checkers`. Contraintes fortes : ~1 Go de RAM, écran 5,5" 960×480, pas de Play Services officiels garantis.

Concurrents visés : [Fully Kiosk Browser](https://www.fully-kiosk.com/) (freeware fermé) et [Dashie](https://dashie.io/) (freeware fermé), tous deux mal traduits en français et avec une UX datée. Voir aussi le paysage existant : [View Assist](https://github.com/dinki/View-Assist) / [VACA](https://github.com/msp1974/ViewAssist_Companion_App) (le plus proche existant, mais wrapper WebView autour de YAML Lovelace, setup lourd), [FreeKiosk](https://github.com/RushB-fr/freekiosk) (kiosk pur, MIT, ne fait ni assistant ni musique).

## Décisions

### 1. App Android native (Kotlin), pas de PWA/wrapper web générique
Contrôle total du kiosk mode (Device Owner), des perfs sur matériel contraint, et de l'intégration micro/wake word. Une PWA n'aurait pas accès au niveau de contrôle système nécessaire (auto-boot, anti-désinstallation, gestion fine de l'écran).

### 2. Dashboard = WebView embarquant le Lovelace de l'utilisateur
On ne réinvente pas un éditeur de dashboard : Home Assistant a déjà un écosystème mature de cartes (natif + HACS) et un éditeur visuel que les utilisateurs HA connaissent déjà. La valeur ajoutée du projet est le **shell** autour : provisioning simple, réglages clairs et bien traduits, écran de veille, gestion boot/luminosité/réseau. Auth via long-lived access token, header HA masqué en mode kiosk.

### 3. Lecteur Music Assistant = écran natif (pas de WebView)
Music Assistant expose sa propre API WebSocket, plus riche que l'entité `media_player` générique de HA (parcours de bibliothèque, artwork, files d'attente). Une UI native est nécessaire pour la fluidité tactile attendue d'un lecteur de musique.

### 4. Assistant IA = uniquement via le pipeline Assist de Home Assistant
Aucune clé API tierce gérée dans l'app. L'utilisateur configure son moteur IA une seule fois côté HA (local via Ollama, OpenAI, Anthropic, etc.) et l'app appelle l'API conversation de HA. Simplicité et cohérence avec l'écosystème ; évite la duplication de configuration.

### 5. Wake word = openWakeWord, en local sur l'appareil
Même moteur que les satellites voix officiels HA (ESPHome Voice), open source, mots-clés personnalisables entraînables.

### 6. Verrouillage kiosk = Device Owner natif
Provisioning QR à la Android Enterprise (comme FreeKiosk), boot auto, anti-désinstallation, sans dépendre d'un MDM tiers.

### 7. Licence : GPLv3
Copyleft fort — empêche qu'un fork propriétaire (le problème même qu'on reproche à Fully Kiosk/Dashie) referme le travail. La clause anti-tivoïsation de la v3 est cohérente avec l'esprit jailbreak du projet. Compatible Apache-2.0 (contrairement à la GPLv2), ce qui compte vu la dépendance à AndroidX/Jetpack/Kotlin stdlib.

## Structure des modules (prévue)

```
:app                        — shell (kiosk, boot, provisioning, navigation entre les 3 modes)
:core:homeassistant         — client API/WebSocket HA (Assist, états, long-lived tokens)
:core:musicassistant        — client WebSocket Music Assistant
:feature:dashboard          — écran WebView Lovelace
:feature:music              — écran lecteur natif Music Assistant
:feature:assist             — écran assistant IA (wake word, micro, retour visuel)
:feature:kiosk-settings     — réglages, provisioning Device Owner, écran de veille
```

## Statut

Phase actuelle : scaffolding initial. Voir les issues du repo pour le détail des tâches.
