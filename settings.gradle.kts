pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "echo-dashboard"

include(":app")
include(":core:homeassistant")
include(":core:musicassistant")
include(":feature:dashboard")
include(":feature:music")
include(":feature:assist")
include(":feature:kiosk-settings")
