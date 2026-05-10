import { FINNISH_WEEKDAYS } from './constants';

/** Suomenkielinen viikonpäivä numerosta */
export const getFinnishWeekday = (day: number): string => {
  return FINNISH_WEEKDAYS[day] ?? 'maanantai';
};

/** Lisää tunteja päivämäärään */
export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

/** Muotoile kellonaika: "14" */
export const formatHour = (hour: number): string => {
  return `${hour}`;
};

/** Muotoile keskivesi: "+12" tai "-5" — aina etumerkki */
export const formatSeaLevel = (cm: number): string => {
  return cm > 0 ? `+${cm}` : `${cm}`;
};

/** Muotoile lämpötila: "+8°" tai "-3°" */
export const formatTemperature = (temp: number): string => {
  return temp > 0 ? `+${temp}°` : `${temp}°`;
};

/** Muotoile tuuli: "7 (12)" — keskituuli (puuska) */
export const formatWind = (speed: number, gust: number): string => {
  return gust > speed ? `${speed} (${gust})` : `${speed}`;
};

/** Parsii ilmatieteenlaitos.fi:n localtime-kentän: "20260509T140000" → Date */
export const parseLocalTime = (localtime: string): Date => {
  const year = parseInt(localtime.slice(0, 4), 10);
  const month = parseInt(localtime.slice(4, 6), 10) - 1;
  const day = parseInt(localtime.slice(6, 8), 10);
  const hour = parseInt(localtime.slice(9, 11), 10);
  const minute = parseInt(localtime.slice(11, 13), 10);
  const second = parseInt(localtime.slice(13, 15), 10);
  return new Date(year, month, day, hour, minute, second);
};

/** Nykyinen kellonaika muotoiltuna: "klo 14:35" */
export const formatUpdateTime = (): string => {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `klo ${h}:${m}`;
};

/** Ryhmittele taulukko avaimen mukaan */
export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = String(item[key]);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
};

/** Tarkista onko havaintodata epätäydellinen */
export const isObservationIncomplete = (obj: Record<string, unknown>, threshold: number): boolean => {
  const nullCount = Object.values(obj).filter((v) => v == null).length;
  return nullCount > threshold;
};
