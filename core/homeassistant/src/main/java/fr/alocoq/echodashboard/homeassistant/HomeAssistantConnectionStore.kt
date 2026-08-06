package fr.alocoq.echodashboard.homeassistant

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.homeAssistantDataStore by preferencesDataStore(name = "home_assistant_connection")

private val KEY_BASE_URL = stringPreferencesKey("base_url")
private val KEY_TOKEN = stringPreferencesKey("long_lived_token")

/**
 * Persistance des paramètres de connexion Home Assistant. Le long-lived token est
 * stocké tel quel via Jetpack DataStore ; le chiffrement au repos (androidx.security-crypto)
 * est une amélioration possible mais différée — voir docs/ARCHITECTURE.md.
 */
class HomeAssistantConnectionStore(private val context: Context) {

    val connection: Flow<HomeAssistantConnection?> =
        context.homeAssistantDataStore.data.map { prefs ->
            val baseUrl = prefs[KEY_BASE_URL]
            val token = prefs[KEY_TOKEN]
            if (baseUrl.isNullOrBlank() || token.isNullOrBlank()) {
                null
            } else {
                runCatching { HomeAssistantConnection(baseUrl, token) }.getOrNull()
            }
        }

    suspend fun save(connection: HomeAssistantConnection) {
        context.homeAssistantDataStore.edit { prefs ->
            prefs[KEY_BASE_URL] = connection.baseUrl
            prefs[KEY_TOKEN] = connection.longLivedToken
        }
    }

    suspend fun clear() {
        context.homeAssistantDataStore.edit { prefs ->
            prefs.remove(KEY_BASE_URL)
            prefs.remove(KEY_TOKEN)
        }
    }
}
