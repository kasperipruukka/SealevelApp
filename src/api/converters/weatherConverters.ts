import { addHours, getFinnishWeekday } from "src/shared/sharedFunctions";
import { ApiForecastData, ApiObservationData } from "src/types/api/apiData";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";

// Converts Weather forecast API data.
export function convertApiForecastData(data: ApiForecastData[]): WeatherDataByWeekDay[] {
  const forecastData = data.filter((item: ApiForecastData) => {
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const timeNow = new Date(year, month, day);
    const hoursToShow = addHours(timeNow, 60);
    const forecastTime = new Date(item.isolocaltime);

    // Display forecasts for the next 60 hours.
    return forecastTime > timeNow && forecastTime < hoursToShow;
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
  });
}


// Converts Weather observation API data.
export function convertApiObservationData(data: ApiObservationData): WeatherDataByWeekDay {
  const weekday = getFinnishWeekday(new Date(convertLocalTime(data.localtime)).getDay());
  const hourNow = new Date(convertLocalTime(data.localtime)).getHours();
  return {
    weekday: weekday,
    time: hourNow,
    Temperature: Math.round(data.t2m),
    WindSpeedMS: Math.round(data.WindSpeedMS),
    WindDirection: Math.round(data.WindDirection),
    HourlyMaximumGust: Math.round(data.WindGust)
  }
}

function convertLocalTime(localtime: string): Date {
  const vuosi = parseInt(localtime.slice(0, 4), 10);
  const kuukausi = parseInt(localtime.slice(4, 6), 10) - 1; // Vähennetään 1 kuukausista, koska tammikuu on 0.
  const paiva = parseInt(localtime.slice(6, 8), 10);
  const tunti = parseInt(localtime.slice(9, 11), 10);
  const minuutti = parseInt(localtime.slice(11, 13), 10);
  const sekunti = parseInt(localtime.slice(13, 15), 10);

  const date = new Date(vuosi, kuukausi, paiva, tunti, minuutti, sekunti);
  return date;
}