// Récupération des prévisions via le mécanisme moderne de Home Assistant :
// souscription WebSocket poussée par le serveur (pas de polling côté carte).
// Repli sur le service weather.get_forecasts si l'entité ne supporte pas la
// souscription (appel unique, sans re-fetch automatique).

import {
  FEATURE_FORECAST_DAILY,
  FEATURE_FORECAST_HOURLY,
} from "./const.js";

function supportsFeature(stateObj, feature) {
  return (
    (Number(stateObj.attributes.supported_features) & feature) !== 0
  );
}

async function fetchForecastOnce(hass, entityId, type) {
  try {
    const result = await hass.callWS({
      type: "call_service",
      domain: "weather",
      service: "get_forecasts",
      service_data: { type },
      target: { entity_id: entityId },
      return_response: true,
    });
    return result?.response?.[entityId]?.forecast || [];
  } catch (err) {
    console.warn(
      `[echo-weather-card] échec weather.get_forecasts (${type})`,
      err
    );
    return [];
  }
}

/**
 * Souscrit aux prévisions daily/hourly supportées par l'entité.
 * `onUpdate(type, forecastArray)` est appelé à chaque mise à jour poussée
 * par le serveur. Retourne une fonction de désabonnement.
 */
export function subscribeForecasts(hass, entityId, onUpdate) {
  const stateObj = hass.states[entityId];
  if (!stateObj) return () => {};

  const wanted = [];
  if (supportsFeature(stateObj, FEATURE_FORECAST_DAILY)) wanted.push("daily");
  if (supportsFeature(stateObj, FEATURE_FORECAST_HOURLY)) {
    wanted.push("hourly");
  }

  if (wanted.length === 0) {
    console.warn(
      `[echo-weather-card] ${entityId} ne supporte ni forecast daily ni hourly`
    );
    return () => {};
  }

  const unsubs = [];
  let cancelled = false;

  wanted.forEach((type) => {
    hass.connection
      .subscribeMessage(
        (event) => onUpdate(type, event.forecast || []),
        { type: "weather/subscribe_forecast", forecast_type: type, entity_id: entityId }
      )
      .then((unsub) => {
        if (cancelled) {
          unsub();
        } else {
          unsubs.push(unsub);
        }
      })
      .catch(async (err) => {
        console.warn(
          `[echo-weather-card] souscription forecast "${type}" indisponible, repli sur get_forecasts`,
          err
        );
        const forecast = await fetchForecastOnce(hass, entityId, type);
        if (!cancelled) onUpdate(type, forecast);
      });
  });

  return () => {
    cancelled = true;
    unsubs.forEach((unsub) => unsub());
  };
}
