# CI

La compilation est automatisée via Gitea Actions (`.gitea/workflows/build.yml`), sur le même schéma que les autres projets de l'infra (Verso, CoqDecks, ManyCoqDecks) : le runner `native` ne fait qu'orchestrer `kubectl`, le vrai travail tourne dans un Job Kubernetes éphémère (namespace `ci`) qui construit l'image via BuildKit et la pousse sur le registre interne (`registry.git.svc.cluster.local:5000`, HTTP en clair — aucun secret nécessaire).

## Pourquoi une image Docker pour un projet Android ?

Ce n'est **pas un service à déployer** (contrairement à Verso). L'image poussée (`echo-dashboard:latest`) n'est qu'un conteneur "coffre-fort" contenant l'APK debug et les rapports de tests/lint — c'est juste un moyen pratique de réutiliser l'infra BuildKit/registre existante pour transporter un artefact de build, sans introduire de nouveau secret (token de package registry, etc.). Voir `docker/Dockerfile`, stage `artifacts`.

## Deux Dockerfiles

- `docker/ci-base.Dockerfile` — JDK 17 + Android SDK (cmdline-tools, platform 34, build-tools 34). Reconstruit uniquement quand ce fichier change (tag par hash de contenu), comme le `Dockerfile-base` de Verso.
- `docker/Dockerfile` — build réel, multi-stage :
  1. `deps` : copie uniquement les fichiers de config Gradle (`build.gradle.kts` de chaque module, `libs.versions.toml`...) et lance `./gradlew help` pour chauffer le cache de dépendances. Cette étape reste en cache registre (`--import-cache`/`--export-cache`) tant que ces fichiers ne changent pas.
  2. `build` : copie le reste du code, lance `assembleDebug testDebugUnitTest lint`.
  3. `artifacts` : image Alpine minimale ne contenant que l'APK + les rapports.

## Récupérer l'APK d'un build

Le résultat n'est pas exposé publiquement. Pour extraire l'APK de la dernière image poussée :

```bash
docker create --name echo-dashboard-extract registry.alocoq.fr/echo-dashboard:latest
docker cp echo-dashboard-extract:/artifacts ./echo-dashboard-artifacts
docker rm echo-dashboard-extract
```

(ou l'équivalent avec `crane`/`skopeo` si vous préférez ne pas tirer l'image localement.)

## Suivre un build

```bash
kubectl -n ci logs job/echo-dashboard-buildkit -c buildkit -f
```

L'onglet Actions du repo Gitea affiche aussi la sortie du workflow (orchestration + logs remontés en fin de job).
