package fr.alocoq.echodashboard

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Dashboard
import androidx.compose.material.icons.filled.MusicNote
import androidx.compose.material.icons.filled.RecordVoiceOver
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import fr.alocoq.echodashboard.feature.dashboard.DashboardScreen

/**
 * Shell de navigation entre les 3 modes principaux de l'app. À terme, chaque route
 * ici délègue à l'écran fourni par le module `:feature:*` correspondant (voir
 * docs/ARCHITECTURE.md) ; pour l'instant ce sont des écrans-substituts en attendant
 * l'implémentation de chaque module.
 */
private sealed class Destination(val route: String, val labelRes: Int) {
    data object Dashboard : Destination("dashboard", R.string.nav_dashboard)
    data object Music : Destination("music", R.string.nav_music)
    data object Assist : Destination("assist", R.string.nav_assist)
}

private val destinations = listOf(Destination.Dashboard, Destination.Music, Destination.Assist)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MaterialTheme {
                EchoDashboardApp()
            }
        }
    }
}

@Composable
private fun EchoDashboardApp() {
    val navController = rememberNavController()

    Scaffold(
        bottomBar = {
            NavigationBar {
                val backStackEntry by navController.currentBackStackEntryAsState()
                val currentDestination = backStackEntry?.destination

                destinations.forEach { destination ->
                    val selected = currentDestination?.hierarchy?.any { it.route == destination.route } == true
                    NavigationBarItem(
                        selected = selected,
                        onClick = {
                            navController.navigate(destination.route) {
                                popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        },
                        icon = { Icon(iconFor(destination), contentDescription = null) },
                        label = { Text(stringResource(destination.labelRes)) },
                    )
                }
            }
        },
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Destination.Dashboard.route,
            modifier = Modifier.padding(innerPadding),
        ) {
            composable(Destination.Dashboard.route) { DashboardScreen() }
            composable(Destination.Music.route) { PlaceholderScreen(Destination.Music.labelRes) }
            composable(Destination.Assist.route) { PlaceholderScreen(Destination.Assist.labelRes) }
        }
    }
}

private fun iconFor(destination: Destination) = when (destination) {
    Destination.Dashboard -> Icons.Filled.Dashboard
    Destination.Music -> Icons.Filled.MusicNote
    Destination.Assist -> Icons.Filled.RecordVoiceOver
}

@Composable
private fun PlaceholderScreen(labelRes: Int) {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text(stringResource(R.string.placeholder_screen, stringResource(labelRes)))
    }
}
