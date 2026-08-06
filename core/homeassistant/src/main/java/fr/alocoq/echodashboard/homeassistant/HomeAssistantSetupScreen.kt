package fr.alocoq.echodashboard.homeassistant

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

/** État du formulaire de couplage à une instance Home Assistant. */
private sealed interface SetupState {
    data object Idle : SetupState
    data object Checking : SetupState
    data class Error(val message: String) : SetupState
}

/**
 * Écran de première configuration : URL de l'instance HA + long-lived access token.
 * Vérifie la connexion avant de sauvegarder, pour éviter de couplér avec des
 * paramètres invalides.
 */
@Composable
fun HomeAssistantSetupScreen(
    store: HomeAssistantConnectionStore,
    api: HomeAssistantApi = HomeAssistantApi(),
    onConnected: () -> Unit,
) {
    var baseUrl by remember { mutableStateOf("http://homeassistant.local:8123") }
    var token by remember { mutableStateOf("") }
    var state by remember { mutableStateOf<SetupState>(SetupState.Idle) }
    val scope = rememberCoroutineScope()
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(
            text = stringResource(R.string.ha_setup_title),
            style = MaterialTheme.typography.headlineSmall,
        )

        OutlinedTextField(
            value = baseUrl,
            onValueChange = { baseUrl = it },
            label = { Text(stringResource(R.string.ha_setup_url_label)) },
            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 16.dp),
        )

        OutlinedTextField(
            value = token,
            onValueChange = { token = it },
            label = { Text(stringResource(R.string.ha_setup_token_label)) },
            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 8.dp),
        )

        when (val current = state) {
            is SetupState.Error -> Text(
                text = current.message,
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.padding(top = 8.dp),
            )
            SetupState.Checking -> CircularProgressIndicator(modifier = Modifier.padding(top = 16.dp))
            SetupState.Idle -> Unit
        }

        Button(
            enabled = state != SetupState.Checking,
            onClick = {
                state = SetupState.Checking
                scope.launch {
                    val connection = runCatching { HomeAssistantConnection(baseUrl, token) }
                        .getOrElse {
                            state = SetupState.Error(it.message.orEmpty())
                            return@launch
                        }
                    when (val result = api.testConnection(connection)) {
                        ConnectionCheckResult.Success -> {
                            store.save(connection)
                            onConnected()
                        }
                        ConnectionCheckResult.InvalidToken ->
                            state = SetupState.Error(context.getString(R.string.ha_setup_error_invalid_token))
                        is ConnectionCheckResult.NetworkError ->
                            state = SetupState.Error(context.getString(R.string.ha_setup_error_network))
                        is ConnectionCheckResult.UnexpectedError ->
                            state = SetupState.Error(context.getString(R.string.ha_setup_error_unexpected, result.httpCode))
                    }
                }
            },
            modifier = Modifier.padding(top = 16.dp),
        ) {
            Text(stringResource(R.string.ha_setup_connect))
        }
    }
}
