package fr.alocoq.echodashboard.homeassistant

/**
 * Paramètres de connexion à une instance Home Assistant : URL de base et
 * long-lived access token (créé côté HA, profil utilisateur > Jetons d'accès).
 */
data class HomeAssistantConnection(
    val baseUrl: String,
    val longLivedToken: String,
) {
    init {
        require(baseUrl.startsWith("http://") || baseUrl.startsWith("https://")) {
            "baseUrl doit commencer par http:// ou https://"
        }
        require(longLivedToken.isNotBlank()) { "longLivedToken ne peut pas être vide" }
    }

    /** URL de base sans slash final, pour une concaténation sans risque de double `//`. */
    val normalizedBaseUrl: String get() = baseUrl.trimEnd('/')
}
