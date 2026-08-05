# Contribuer

Merci de l'intérêt porté à Echo Dashboard 🙌

## Prérequis

- Android Studio (dernière version stable) ou JDK 17 + Android SDK en ligne de commande.
- Un appareil Android (API 30+) ou émulateur pour tester ; idéalement un Echo Show 5 flashé LineageOS 18.1 pour valider en conditions réelles.

## Démarrer

```bash
git clone https://git.alocoq.fr/alois/Echo-dashboard.git
cd Echo-dashboard
./gradlew assembleDebug
```

## Structure du projet

Voir [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) pour le détail des modules et des décisions d'architecture.

## Traductions

Les chaînes de caractères vivent dans `app/src/main/res/values/strings.xml` (anglais, référence) et `values-<locale>/strings.xml` pour chaque langue. Toute contribution de traduction est bienvenue, en particulier pour maintenir une traduction française de qualité — c'est un des points de départ du projet.

## Style de code

- Kotlin idiomatique, `ktlint`/style officiel Kotlin (`kotlin.code.style=official`).
- Compose pour toute nouvelle UI native.
- Un module `:feature:*` ne doit dépendre que des modules `:core:*` dont il a besoin, jamais d'un autre `:feature:*`.

## Licence

En contribuant, vous acceptez que votre code soit distribué sous licence [GPLv3](LICENSE).
