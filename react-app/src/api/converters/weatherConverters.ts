import type { ApiForecastDataPoint, ApiObservationDataPoint } from '@/types/apiData';
import type { WeatherEntry } from '@/types/types';
import { FORECAST_HOURS } from '@/utils/constants';
import { addHours, getFinnishWeekday, isObservationIncomplete, parseLocalTime } from '@/utils/formatting';

/** Muunna sääennuste-API:n data → WeatherEntry[] (max 60h) */
export const convertForecastData = (data: ApiForecastDataPoint[]): WeatherEntry[] => {
  if (!data?.length) return [];

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const limit = addHours(todayStart, FORECAST_HOURS);

  return data
    .filter((item) => {
      const t = new Date(item.isolocaltime);
      return t > todayStart && t < limit;
    })
    .map((item) => {
      const t = new Date(item.isolocaltime);
      return {
        weekday: getFinnishWeekday(t.getDay()),
        time: t.getHours(),
        temperature: Math.round(item.Temperature),
        windSpeed: Math.round(item.WindSpeedMS),
        windDirection: Math.round(item.WindDirection),
        windGust: Math.round(item.HourlyMaximumGust),
        smartSymbol: item.SmartSymbol,
        precipitation: item.Precipitation1h,
        precipitationProbability: item.PoP,
        feelsLike: Math.round(item.FeelsLike),
      };
    });
};

/** Muunna havaintodata → yksittäinen WeatherEntry (nykyhetki) */
export const convertObservationData = (observations: ApiObservationDataPoint[]): WeatherEntry | null => {
  if (!observations?.length) return null;

  // Jos viimeisin havainto on puutteellinen, käytä edellistä
  let obs = observations[observations.length - 1];
  if (isObservationIncomplete(obs as unknown as Record<string, unknown>, 3) && observations.length > 1) {
    obs = observations[observations.length - 2];
  }

  const t = parseLocalTime(obs.localtime);
  return {
    weekday: getFinnishWeekday(t.getDay()),
    time: t.getHours(),
    temperature: Math.round(obs.t2m),
    windSpeed: Math.round(obs.WindSpeedMS),
    windDirection: Math.round(obs.WindDirection),
    windGust: Math.round(obs.WindGust),
  };
};
