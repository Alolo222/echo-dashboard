package fr.alocoq.echodashboard.homeassistant

import android.net.Uri
import android.webkit.WebView
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature
import org.json.JSONObject

/**
 * Implémente le protocole "External Authentication" v2 de Home Assistant
 * (frontend chargé avec `?external_auth=1`, communique via `window.externalAppV2`).
 * Permet à la WebView de fournir le long-lived token sans jamais l'injecter dans le
 * DOM ni l'exposer à du JS tiers.
 *
 * Utilise `WebViewCompat.addWebMessageListener` (API V2, origin-aware) plutôt que
 * `addJavascriptInterface` : ce dernier est vulnérable à l'exfiltration de token via
 * des iframes cross-origin (cf. GHSA-7jp2-p2fw-mgvf). Ici, chaque message est vérifié
 * contre l'origine de l'instance HA configurée et contre `isMainFrame` avant tout
 * traitement, et seuls des noms de callback whitelistés sont interpolés dans le JS
 * exécuté en retour.
 */
object ExternalAuthBridge {

    private const val JS_OBJECT_NAME = "externalAppV2"
    private val ALLOWED_CALLBACKS = setOf("externalAuthSetToken", "externalAuthRevokeToken")

    /** @return true si le bridge a pu être installé (nécessite le support WebView v2). */
    fun install(webView: WebView, connection: HomeAssistantConnection): Boolean {
        if (!WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)) return false
        val origin = originOf(connection.baseUrl) ?: return false

        WebViewCompat.addWebMessageListener(webView, JS_OBJECT_NAME, setOf(origin)) { view, message, sourceOrigin, isMainFrame, _ ->
            handleMessage(view, connection, message.data, sourceOrigin, isMainFrame)
        }
        return true
    }

    private fun handleMessage(
        webView: WebView,
        connection: HomeAssistantConnection,
        rawMessage: String?,
        sourceOrigin: Uri,
        isMainFrame: Boolean,
    ) {
        if (!isMainFrame) return
        if (originOf(connection.baseUrl) != normalizedOrigin(sourceOrigin)) return

        val message = rawMessage ?: return
        val json = runCatching { JSONObject(message) }.getOrNull() ?: return
        val type = json.optString("type")
        val payload = json.optJSONObject("payload") ?: JSONObject()
        val callback = payload.optString("callback")
        if (callback !in ALLOWED_CALLBACKS) return

        when (type) {
            "getExternalAuth" -> respondWithToken(webView, connection, callback)
            "revokeExternalAuth" -> respondToRevoke(webView, callback)
        }
    }

    private fun respondWithToken(webView: WebView, connection: HomeAssistantConnection, callback: String) {
        val tokenJson = JSONObject()
            .put("access_token", connection.longLivedToken)
            .put("expires_in", 1800)
            .toString()
        webView.post {
            webView.evaluateJavascript("window.$callback(true, $tokenJson)", null)
        }
    }

    private fun respondToRevoke(webView: WebView, callback: String) {
        // Rien à invalider réellement côté long-lived token : usage kiosk mono-instance.
        webView.post {
            webView.evaluateJavascript("window.$callback(true)", null)
        }
    }

    private fun originOf(url: String): String? {
        val uri = runCatching { Uri.parse(url) }.getOrNull() ?: return null
        return buildOrigin(uri.scheme, uri.host, uri.port)
    }

    private fun normalizedOrigin(uri: Uri): String? = buildOrigin(uri.scheme, uri.host, uri.port)

    private fun buildOrigin(scheme: String?, host: String?, port: Int): String? {
        if (scheme.isNullOrBlank() || host.isNullOrBlank()) return null
        val defaultPort = if (scheme == "https") 443 else 80
        val effectivePort = if (port == -1) defaultPort else port
        return "$scheme://$host:$effectivePort"
    }
}
