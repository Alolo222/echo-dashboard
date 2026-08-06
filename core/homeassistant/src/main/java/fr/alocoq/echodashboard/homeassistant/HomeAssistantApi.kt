package fr.alocoq.echodashboard.homeassistant

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException

/** Résultat d'une vérification de connexion à une instance Home Assistant. */
sealed interface ConnectionCheckResult {
    data object Success : ConnectionCheckResult
    data object InvalidToken : ConnectionCheckResult
    data class NetworkError(val cause: Throwable) : ConnectionCheckResult
    data class UnexpectedError(val httpCode: Int) : ConnectionCheckResult
}

/** Client REST minimal pour Home Assistant — pour l'instant, uniquement la vérification de connexion. */
class HomeAssistantApi(private val client: OkHttpClient = OkHttpClient()) {

    suspend fun testConnection(connection: HomeAssistantConnection): ConnectionCheckResult =
        withContext(Dispatchers.IO) {
            val request = Request.Builder()
                .url("${connection.normalizedBaseUrl}/api/")
                .header("Authorization", "Bearer ${connection.longLivedToken}")
                .get()
                .build()

            try {
                client.newCall(request).execute().use { response ->
                    when {
                        response.isSuccessful -> ConnectionCheckResult.Success
                        response.code == 401 -> ConnectionCheckResult.InvalidToken
                        else -> ConnectionCheckResult.UnexpectedError(response.code)
                    }
                }
            } catch (e: IOException) {
                ConnectionCheckResult.NetworkError(e)
            }
        }
}
