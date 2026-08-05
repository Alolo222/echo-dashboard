# Image de base pour la CI : JDK 17 + Android SDK (cmdline-tools, platform-tools,
# platform 34, build-tools 34). C'est la partie lourde et rarement changeante du
# build (~1 Go de téléchargements) — voir .gitea/workflows/build.yml, qui ne
# reconstruit cette image que lorsque ce fichier change (tag par hash de contenu),
# à l'image de ce que fait Verso pour son Dockerfile-base.
FROM eclipse-temurin:17-jdk-jammy

ENV ANDROID_SDK_ROOT=/opt/android-sdk \
    ANDROID_HOME=/opt/android-sdk
ENV PATH="${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}"

RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip curl \
    && rm -rf /var/lib/apt/lists/*

# Version des cmdline-tools : à bumper manuellement de temps en temps
# (https://developer.android.com/studio#command-line-tools-only).
ARG CMDLINE_TOOLS_VERSION=11076708

RUN mkdir -p "${ANDROID_SDK_ROOT}/cmdline-tools" \
    && curl -sL -o /tmp/tools.zip \
       "https://dl.google.com/android/repository/commandlinetools-linux-${CMDLINE_TOOLS_VERSION}_latest.zip" \
    && unzip -q /tmp/tools.zip -d "${ANDROID_SDK_ROOT}/cmdline-tools" \
    && mv "${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools" "${ANDROID_SDK_ROOT}/cmdline-tools/latest" \
    && rm /tmp/tools.zip

# compileSdk/targetSdk = 34, minSdk = 30 (Android 11 / LineageOS 18.1 sur l'Echo
# Show 5) — voir app/build.gradle.kts. Garder synchronisé avec ce fichier.
RUN yes | sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" \
        "platform-tools" "platforms;android-34" "build-tools;34.0.0" > /dev/null \
    && yes | sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --licenses > /dev/null
