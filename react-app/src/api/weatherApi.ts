import type { ApiForecastResponse, ApiObservationResponse } from '@/types/apiData';
import type { WeatherEntry } from '@/types/types';
import { API_URLS } from '@/utils/constants';
import { convertForecastData, convertObservationData } from './converters/weatherConverters';

export interface WeatherResult {
  observation: WeatherEntry | null;
  forecast: WeatherEntry[];
}

/** Hae säädata kaupungille (ennuste + havainnot) */
export const fetchWeatherData = async (
  forecastPlace: string,
  observationFmisid: string,
): Promise<WeatherResult> => {
  const [forecastRes, observationRes] = await Promise.all([
    fetch(API_URLS.forecast(forecastPlace)),
    fetch(API_URLS.observation(observationFmisid)),
  ]);

  if (!forecastRes.ok) {
    throw new Error(`Sääennusteen haku epäonnistui: ${forecastRes.status}`);
  }

  const forecastJson: ApiForecastResponse = await forecastRes.json();
  const forecast = convertForecastData(forecastJson.forecastValues ?? []);

  let observation: WeatherEntry | null = null;
  if (observationRes.ok) {
    const obsJson: ApiObservationResponse = await observationRes.json();
    observation = convertObservationData(obsJson.observations ?? []);
  }

  return { observation, forecast };
};
