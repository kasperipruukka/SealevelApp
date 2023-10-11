import { PresentFuture } from "src/shared/enums/days";
import { addHours, getFinnishWeekday } from "src/shared/sharedFunctions";
import { ApiForecastData } from "src/types/api/apiData";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";

// Converts API data.
export function convertToApiWeatherData(data: ApiForecastData[], day: PresentFuture): WeatherDataByWeekDay[] {
  switch (day) {
    case PresentFuture.Present:
      const presentResult = data.filter((item: ApiForecastData) => {
        new Date(item.isolocaltime) === new Date();
      });
      return [];

    case PresentFuture.Future:
      const forecastData = data.filter((item: ApiForecastData) => {
        const now = new Date();
        // Haetaan saman verran sääennustetietoja kuin merenkorkeusennusteitakin on saatavilla.
        const endTime = addHours(new Date(now.getFullYear(), now.getMonth(), now.getDate()), 63);
        const itemTime = new Date(item.isolocaltime);
        return itemTime > now && itemTime < endTime;
      });
      
      return forecastData.map((item) => {
        const weekday = getFinnishWeekday(new Date(item.isolocaltime).getDay());
        const hourNow = new Date(item.isolocaltime).getHours();
        const weatherData: WeatherDataByWeekDay = {
          weekday: weekday,
          time: hourNow,
          Temperature: Math.round(item.Temperature),
          WindSpeedMS: Math.round(item.WindSpeedMS),
          WindDirection: Math.round(item.WindDirection),
          HourlyMaximumGust: Math.round(item.HourlyMaximumGust)
        };

        return weatherData;
      })

    default:
      return [];
  }
}