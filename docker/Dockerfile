# Build de compilation pour Echo Dashboard. Ne produit pas une image destinée à
# tourner (ce n'est pas un service) : le stage final est une image "coffre-fort"
# qui ne contient que les artefacts de build (APK debug, rapports de tests/lint),
# à récupérer avec `docker create` + `docker cp` (voir docs/CI.md). Même logique
# que CoqDecks/ManyCoqDecks : build-only, pas de déploiement.

ARG CI_BASE_IMAGE

# --- Étape 1 : mise en cache des dépendances Gradle -------------------------
# On ne copie que les fichiers qui déclarent les dépendances (pas le code source)
# et on déclenche leur résolution. Tant que ces fichiers ne changent pas, cette
# étape reste en cache côté registre (--import-cache/--export-cache dans le
# workflow) et le run suivant saute le téléchargement des ~200 Mo de deps
# AndroidX/Compose/Kotlin.
FROM ${CI_BASE_IMAGE} AS deps
WORKDIR /workspace

COPY gradlew gradlew.bat settings.gradle.kts build.gradle.kts gradle.properties ./
COPY gradle ./gradle
COPY app/build.gradle.kts app/build.gradle.kts
COPY core/homeassistant/build.gradle.kts core/homeassistant/build.gradle.kts
COPY core/musicassistant/build.gradle.kts core/musicassistant/build.gradle.kts
COPY feature/dashboard/build.gradle.kts feature/dashboard/build.gradle.kts
COPY feature/music/build.gradle.kts feature/music/build.gradle.kts
COPY feature/assist/build.gradle.kts feature/assist/build.gradle.kts
COPY feature/kiosk-settings/build.gradle.kts feature/kiosk-settings/build.gradle.kts

RUN chmod +x gradlew && ./gradlew help --no-daemon

# --- Étape 2 : build réel ----------------------------------------------------
FROM deps AS build
COPY . .

# mkdir -p afterwards: there are no test source files yet in this scaffold,
# so testDebugUnitTest never creates app/build/test-results/ at all (no
# tests to report on) — without this, the artifacts stage's COPY of that
# directory fails outright ("not found") since it doesn't exist yet.
RUN ./gradlew assembleDebug testDebugUnitTest lint --no-daemon --stacktrace \
    && mkdir -p app/build/test-results app/build/reports

# --- Étape 3 : artefacts seuls -----------------------------------------------
FROM alpine:3.20 AS artifacts
WORKDIR /artifacts

COPY --from=build /workspace/app/build/outputs/apk/debug/*.apk ./
COPY --from=build /workspace/app/build/reports/ ./reports/app/
COPY --from=build /workspace/app/build/test-results/ ./test-results/app/
