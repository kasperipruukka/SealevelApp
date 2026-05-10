import type { CityData, CompassInfo, SeaLevelStatus } from '@/types/types';

/** API-perusosoitteet */
const API_BASE = 'https://www.ilmatieteenlaitos.fi/api/weather';

export const API_URLS = {
  sealevel: (geoId: string) => `${API_BASE}/sealevelgraphs/short?geoid=${geoId}`,
  forecast: (place: string) => `${API_BASE}/forecasts?place=${place}`,
  observation: (fmisid: string) => `${API_BASE}/observations?fmisid=${fmisid}&observations=true`,
} as const;

/** Ennusteikkuna tunteina */
export const FORECAST_HOURS = 60;

/** Automaattisen päivityksen väli (ms) */
export const AUTO_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 min

/** Haun debounce-viive (ms) */
export const SEARCH_DEBOUNCE_MS = 150;

/** localStorage-avaimet (samat kuin vanhassa apissa) */
export const STORAGE_KEYS = {
  favorites: 'favouriteCities',
  theme: 'themeMode',
} as const;

/** Kaikki 14 rannikkokaupunkia */
export const CITIES: CityData[] = [
  { id: 'kemi', name: 'Kemi', area: 'Ajos', geoId: '-100539', forecastPlace: 'kemi', observationFmisid: '101840', lat: 65.67, lon: 24.52 },
  { id: 'oulu', name: 'Oulu', area: 'Toppila', geoId: '-10022818', forecastPlace: 'oulu', observationFmisid: '108040', lat: 65.01, lon: 25.47 },
  { id: 'raahe', name: 'Raahe', area: 'Lapaluoto', geoId: '-100540', forecastPlace: 'raahe', observationFmisid: '101785', lat: 64.68, lon: 24.48 },
  { id: 'pietarsaari', name: 'Pietarsaari', area: 'Leppäluoto', geoId: '-10022819', forecastPlace: 'pietarsaari', observationFmisid: '101660', lat: 63.70, lon: 22.70 },
  { id: 'vaasa', name: 'Vaasa', area: 'Vaskiluoto', geoId: '-10022815', forecastPlace: 'vaasa', observationFmisid: '101485', lat: 63.10, lon: 21.60 },
  { id: 'kaskinen', name: 'Kaskinen', area: 'Ådskär', geoId: '-10022820', forecastPlace: 'kaskinen', observationFmisid: '101256', lat: 62.34, lon: 21.22 },
  { id: 'pori', name: 'Pori', area: 'Tahkoluoto', geoId: '-10022824', forecastPlace: 'tahkoluoto&area=pori', observationFmisid: '101267', lat: 61.63, lon: 21.38 },
  { id: 'rauma', name: 'Rauma', area: 'Kylmäpihlaja', geoId: '-10022816', forecastPlace: 'kylmäpihlaja&area=rauma', observationFmisid: '101061', lat: 61.13, lon: 21.50 },
  { id: 'turku', name: 'Turku', area: 'Ruissalo, Saaronniemi', geoId: '-10022817', forecastPlace: 'turku', observationFmisid: '100949', lat: 60.43, lon: 22.10 },
  { id: 'foglo', name: 'Föglö', area: 'Degerby', geoId: '-10022821', forecastPlace: 'f%C3%B6gl%C3%B6', observationFmisid: '151048', lat: 60.03, lon: 20.38 },
  { id: 'hanko', name: 'Hanko', area: 'Pikku Kolalahti', geoId: '-10022822', forecastPlace: 'hanko', observationFmisid: '100946', lat: 59.82, lon: 22.97 },
  { id: 'helsinki', name: 'Helsinki', area: 'Kaivopuisto', geoId: '-10022814', forecastPlace: 'helsinki', observationFmisid: '100971', lat: 60.17, lon: 24.96 },
  { id: 'porvoo', name: 'Porvoo', area: 'Emäsalo, Vaarlahti', geoId: '-100669', forecastPlace: 'porvoo', observationFmisid: '101028', lat: 60.39, lon: 25.66 },
  { id: 'hamina', name: 'Hamina', area: 'Pitäjänsaari', geoId: '-10022823', forecastPlace: 'hamina', observationFmisid: '101030', lat: 60.56, lon: 27.18 },
];

/** Suomenkieliset viikonpäivät */
export const FINNISH_WEEKDAYS: Record<number, string> = {
  0: 'sunnuntai',
  1: 'maanantai',
  2: 'tiistai',
  3: 'keskiviikko',
  4: 'torstai',
  5: 'perjantai',
  6: 'lauantai',
};

/** Ilmansuunnat 8-jaolla: 45° sektorit keskitettynä pää- ja väli-ilmansuuntiin */
const COMPASS_DIRECTIONS: { max: number; info: CompassInfo }[] = [
  { max: 22.5, info: { name: 'Pohjoinen', arrow: '↓' } },
  { max: 67.5, info: { name: 'Koillinen', arrow: '↙' } },
  { max: 112.5, info: { name: 'Itä', arrow: '←' } },
  { max: 157.5, info: { name: 'Kaakko', arrow: '↖' } },
  { max: 202.5, info: { name: 'Etelä', arrow: '↑' } },
  { max: 247.5, info: { name: 'Lounas', arrow: '↗' } },
  { max: 292.5, info: { name: 'Länsi', arrow: '→' } },
  { max: 337.5, info: { name: 'Luode', arrow: '↘' } },
  { max: 360, info: { name: 'Pohjoinen', arrow: '↓' } },
];

/** Laske ilmansuunta asteista */
export const getCompassDirection = (degrees: number): CompassInfo => {
  const normalized = ((degrees % 360) + 360) % 360;
  const match = COMPASS_DIRECTIONS.find((d) => normalized < d.max);
  return match?.info ?? { name: 'Pohjoinen', arrow: '↓' };
};

/** Merenpinnan tila värikoodausta varten */
export const getSeaLevelStatus = (cm: number): SeaLevelStatus => {
  if (cm < -30) return 'very-low';
  if (cm < -5) return 'low';
  if (cm <= 5) return 'normal';
  if (cm <= 30) return 'elevated';
  if (cm <= 60) return 'high';
  return 'extreme';
};

/** Merenpinnan tilan suomenkielinen nimi */
export const SEA_LEVEL_STATUS_LABELS: Record<SeaLevelStatus, string> = {
  'very-low': 'Erittäin matala',
  low: 'Matala',
  normal: 'Normaali',
  elevated: 'Koholla',
  high: 'Korkea',
  extreme: 'Erittäin korkea',
};

/** Merenpinnan tilan tekstiväri */
export const getSeaLevelTextColor = (cm: number): string => {
  const status = getSeaLevelStatus(cm);
  const colors: Record<SeaLevelStatus, string> = {
    'very-low': 'text-level-very-low',
    low: 'text-level-low',
    normal: 'text-level-normal',
    elevated: 'text-level-elevated',
    high: 'text-level-high',
    extreme: 'text-level-extreme',
  };
  return colors[status];
};

/** Tuulen nopeuden väriluokka (m/s) */
export const getWindSpeedColor = (speed: number): string => {
  if (speed < 4) return 'text-[#22c55e]';   // heikko
  if (speed < 8) return 'text-[#84cc16]';   // kohtalainen
  if (speed < 14) return 'text-[#eab308]';  // navakka
  if (speed < 21) return 'text-[#f97316]';  // kova
  return 'text-[#ef4444]';                   // myrsky
};

/** Haversine-etäisyys km */
export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
