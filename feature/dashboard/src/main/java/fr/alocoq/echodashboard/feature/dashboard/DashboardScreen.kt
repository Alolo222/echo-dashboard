package fr.alocoq.echodashboard.feature.dashboard

import android.annotation.SuppressLint
import android.net.Uri
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.viewinterop.AndroidView
import fr.alocoq.echodashboard.homeassistant.ExternalAuthBridge
import fr.alocoq.echodashboard.homeassistant.HomeAssistantConnection
import fr.alocoq.echodashboard.homeassistant.HomeAssistantConnectionStore
import fr.alocoq.echodashboard.homeassistant.HomeAssistantSetupScreen

/**
 * Écran principal du mode Dashboard : redirige vers le couplage si aucune instance
 * Home Assistant n'est configurée, sinon affiche son Lovelace en WebView.
 */
@Composable
fun DashboardScreen() {
    val context = LocalContext.current
    val store = remember { HomeAssistantConnectionStore(context) }
    val connection by store.connection.collectAsState(initial = null)

    when (val current = connection) {
        null -> HomeAssistantSetupScreen(store = store, onConnected = {})
        else -> DashboardWebView(connection = current)
    }
}

private sealed interface LoadState {
    data object Loading : LoadState
    data object Loaded : LoadState
    data class Error(val description: String) : LoadState
}

@Composable
private fun DashboardWebView(connection: HomeAssistantConnection) {
    var loadState by remember(connection) { mutableStateOf<LoadState>(LoadState.Loading) }
    var reloadToken by remember(connection) { mutableIntStateOf(0) }

    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        AndroidWebView(
            connection = connection,
            reloadToken = reloadToken,
            onLoadStateChanged = { loadState = it },
        )

        when (val state = loadState) {
            LoadState.Loading -> CircularProgressIndicator()
            is LoadState.Error -> Column(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Text(stringResource(R.string.dashboard_load_error, state.description))
                Button(onClick = { reloadToken++ }) {
                    Text(stringResource(R.string.dashboard_retry))
                }
            }
            LoadState.Loaded -> Unit
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
private fun AndroidWebView(
    connection: HomeAssistantConnection,
    reloadToken: Int,
    onLoadStateChanged: (LoadState) -> Unit,
) {
    // key(reloadToken) force la recréation de la WebView (via une nouvelle factory)
    // à chaque tentative de rechargement après erreur.
    key(reloadToken) {
        AndroidView(
            factory = { context ->
                WebView(context).apply {
                    settings.javaScriptEnabled = true
                    settings.domStorageEnabled = true
                    webViewClient = object : WebViewClient() {
                        override fun onPageFinished(view: WebView, url: String) {
                            onLoadStateChanged(LoadState.Loaded)
                        }

                        override fun onReceivedError(
                            view: WebView,
                            errorCode: Int,
                            description: String?,
                            failingUrl: String?,
                        ) {
                            onLoadStateChanged(LoadState.Error(description.orEmpty()))
                        }
                    }
                    val bridgeInstalled = ExternalAuthBridge.install(this, connection)
                    loadUrl(dashboardUrl(connection, bridgeInstalled))
                }
            },
            modifier = Modifier.fillMaxSize(),
        )
    }
}

private fun dashboardUrl(connection: HomeAssistantConnection, bridgeInstalled: Boolean): String {
    val builder = Uri.parse(connection.normalizedBaseUrl).buildUpon()
    return if (bridgeInstalled) {
        builder.appendQueryParameter("external_auth", "1").build().toString()
    } else {
        builder.build().toString()
    }
}
