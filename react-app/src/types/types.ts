/** Kaupungin perustiedot */
export interface CityData {
  id: string;
  name: string;
  area: string;
  geoId: string;
  forecastPlace: string;
  observationFmisid: string;
  lat: number;
  lon: number;
}

/** Merenpinnan data aikaleimatulla rivillä */
export interface SeaLevelEntry {
  weekday: string;
  time: number;
  middleWater: number;
  heightN2000: number;
}

/** Säädata aikaleimatulla rivillä */
export interface WeatherEntry {
  weekday: string;
  time: number;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
}

/** Yhdistetty tuntirivi — merenpinta + sää */
export interface CombinedHourlyEntry {
  weekday: string;
  time: number;
  middleWater: number;
  heightN2000: number;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
}

/** Päiväkohtainen data */
export interface DayForecast {
  label: string;
  weekday: string;
  entries: CombinedHourlyEntry[];
}

/** Latauksen tila */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/** Merenpinnan taso — visuaalinen indikaattori */
export type SeaLevelStatus = 'very-low' | 'low' | 'normal' | 'elevated' | 'high' | 'extreme';

/** Ilmansuunnat */
export interface CompassInfo {
  name: string;
  arrow: string;
}

/** Teema */
export type ThemeMode = 'dark' | 'light';

/** Näkymä */
export type AppView = 'city-list' | 'forecast' | 'comparison';
