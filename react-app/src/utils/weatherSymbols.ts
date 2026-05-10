/** SmartSymbol → suomenkielinen kuvaus + Lucide-ikonin nimi + tunnelma */

/** Sään tunnelma — visuaalinen efekti riville */
export type WeatherMood = 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'heavy-rain' | 'snow' | 'heavy-snow' | 'hail' | 'thunder' | 'freezing';

interface SymbolInfo {
  label: string;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-fog' | 'cloud-drizzle' | 'cloud-rain' | 'cloud-rain-wind' | 'cloud-snow' | 'cloud-hail' | 'cloud-lightning' | 'snowflake';
  mood: WeatherMood;
}

const SYMBOLS: Record<number, SymbolInfo> = {
  // Selkeä
  1: { label: 'Selkeää', icon: 'sun', mood: 'clear' },
  101: { label: 'Selkeää', icon: 'sun', mood: 'clear' },
  2: { label: 'Enimmäkseen selkeää', icon: 'cloud-sun', mood: 'clear' },
  102: { label: 'Enimmäkseen selkeää', icon: 'cloud-sun', mood: 'clear' },
  4: { label: 'Puolipilvistä', icon: 'cloud-sun', mood: 'cloudy' },
  104: { label: 'Puolipilvistä', icon: 'cloud-sun', mood: 'cloudy' },
  6: { label: 'Enimmäkseen pilvistä', icon: 'cloud', mood: 'cloudy' },
  106: { label: 'Enimmäkseen pilvistä', icon: 'cloud', mood: 'cloudy' },
  7: { label: 'Pilvistä', icon: 'cloud', mood: 'cloudy' },

  // Sumu
  9: { label: 'Sumua', icon: 'cloud-fog', mood: 'fog' },

  // Tihku & jäätävä
  11: { label: 'Tihkusadetta', icon: 'cloud-drizzle', mood: 'drizzle' },
  14: { label: 'Jäätävää tihkua', icon: 'cloud-drizzle', mood: 'freezing' },
  17: { label: 'Jäätävää sadetta', icon: 'cloud-rain', mood: 'freezing' },

  // Sadekuurot
  21: { label: 'Yksittäisiä sadekuuroja', icon: 'cloud-rain', mood: 'rain' },
  121: { label: 'Yksittäisiä sadekuuroja', icon: 'cloud-rain', mood: 'rain' },
  24: { label: 'Paikoin sadekuuroja', icon: 'cloud-rain', mood: 'rain' },
  124: { label: 'Paikoin sadekuuroja', icon: 'cloud-rain', mood: 'rain' },
  27: { label: 'Sadekuuroja', icon: 'cloud-rain', mood: 'rain' },

  // Vesisade — heikko
  31: { label: 'Puolipilvistä, heikkoa vesisadetta', icon: 'cloud-drizzle', mood: 'drizzle' },
  131: { label: 'Puolipilvistä, heikkoa vesisadetta', icon: 'cloud-drizzle', mood: 'drizzle' },
  34: { label: 'Pilvistä, heikkoa vesisadetta', icon: 'cloud-drizzle', mood: 'drizzle' },
  134: { label: 'Pilvistä, heikkoa vesisadetta', icon: 'cloud-drizzle', mood: 'drizzle' },
  37: { label: 'Heikkoa vesisadetta', icon: 'cloud-drizzle', mood: 'drizzle' },

  // Vesisade — kohtalainen
  32: { label: 'Puolipilvistä, kohtalaista sadetta', icon: 'cloud-rain', mood: 'rain' },
  132: { label: 'Puolipilvistä, kohtalaista sadetta', icon: 'cloud-rain', mood: 'rain' },
  35: { label: 'Pilvistä, kohtalaista sadetta', icon: 'cloud-rain', mood: 'rain' },
  135: { label: 'Pilvistä, kohtalaista sadetta', icon: 'cloud-rain', mood: 'rain' },
  38: { label: 'Kohtalaista vesisadetta', icon: 'cloud-rain', mood: 'rain' },

  // Vesisade — voimakas
  33: { label: 'Puolipilvistä, voimakasta sadetta', icon: 'cloud-rain-wind', mood: 'heavy-rain' },
  133: { label: 'Puolipilvistä, voimakasta sadetta', icon: 'cloud-rain-wind', mood: 'heavy-rain' },
  36: { label: 'Pilvistä, voimakasta sadetta', icon: 'cloud-rain-wind', mood: 'heavy-rain' },
  136: { label: 'Pilvistä, voimakasta sadetta', icon: 'cloud-rain-wind', mood: 'heavy-rain' },
  39: { label: 'Voimakasta vesisadetta', icon: 'cloud-rain-wind', mood: 'heavy-rain' },

  // Räntä
  41: { label: 'Heikkoja räntäkuuroja', icon: 'cloud-drizzle', mood: 'freezing' },
  141: { label: 'Heikkoja räntäkuuroja', icon: 'cloud-drizzle', mood: 'freezing' },
  42: { label: 'Kohtalaisia räntäkuuroja', icon: 'cloud-rain', mood: 'freezing' },
  142: { label: 'Kohtalaisia räntäkuuroja', icon: 'cloud-rain', mood: 'freezing' },
  43: { label: 'Voimakkaita räntäkuuroja', icon: 'cloud-rain-wind', mood: 'freezing' },
  143: { label: 'Voimakkaita räntäkuuroja', icon: 'cloud-rain-wind', mood: 'freezing' },
  44: { label: 'Pilvistä, heikkoja räntäkuuroja', icon: 'cloud-drizzle', mood: 'freezing' },
  144: { label: 'Pilvistä, heikkoja räntäkuuroja', icon: 'cloud-drizzle', mood: 'freezing' },
  45: { label: 'Pilvistä, kohtalaisia räntäkuuroja', icon: 'cloud-rain', mood: 'freezing' },
  145: { label: 'Pilvistä, kohtalaisia räntäkuuroja', icon: 'cloud-rain', mood: 'freezing' },
  46: { label: 'Pilvistä, voimakkaita räntäkuuroja', icon: 'cloud-rain-wind', mood: 'freezing' },
  146: { label: 'Pilvistä, voimakkaita räntäkuuroja', icon: 'cloud-rain-wind', mood: 'freezing' },
  47: { label: 'Heikkoa räntäsadetta', icon: 'cloud-drizzle', mood: 'freezing' },
  48: { label: 'Kohtalaista räntäsadetta', icon: 'cloud-rain', mood: 'freezing' },
  49: { label: 'Voimakasta räntäsadetta', icon: 'cloud-rain-wind', mood: 'freezing' },

  // Lumi
  51: { label: 'Heikkoja lumikuuroja', icon: 'cloud-snow', mood: 'snow' },
  151: { label: 'Heikkoja lumikuuroja', icon: 'cloud-snow', mood: 'snow' },
  52: { label: 'Kohtalaisia lumikuuroja', icon: 'cloud-snow', mood: 'snow' },
  152: { label: 'Kohtalaisia lumikuuroja', icon: 'cloud-snow', mood: 'snow' },
  53: { label: 'Voimakkaita lumikuuroja', icon: 'snowflake', mood: 'heavy-snow' },
  153: { label: 'Voimakkaita lumikuuroja', icon: 'snowflake', mood: 'heavy-snow' },
  54: { label: 'Pilvistä, heikkoja lumikuuroja', icon: 'cloud-snow', mood: 'snow' },
  154: { label: 'Pilvistä, heikkoja lumikuuroja', icon: 'cloud-snow', mood: 'snow' },
  55: { label: 'Pilvistä, kohtalaisia lumikuuroja', icon: 'cloud-snow', mood: 'snow' },
  155: { label: 'Pilvistä, kohtalaisia lumikuuroja', icon: 'cloud-snow', mood: 'snow' },
  56: { label: 'Pilvistä, voimakkaita lumikuuroja', icon: 'snowflake', mood: 'heavy-snow' },
  156: { label: 'Pilvistä, voimakkaita lumikuuroja', icon: 'snowflake', mood: 'heavy-snow' },
  57: { label: 'Heikkoa lumisadetta', icon: 'cloud-snow', mood: 'snow' },
  58: { label: 'Kohtalaista lumisadetta', icon: 'cloud-snow', mood: 'snow' },
  59: { label: 'Runsasta lumisadetta', icon: 'snowflake', mood: 'heavy-snow' },

  // Raekuurot
  61: { label: 'Yksittäisiä raekuuroja', icon: 'cloud-hail', mood: 'hail' },
  161: { label: 'Yksittäisiä raekuuroja', icon: 'cloud-hail', mood: 'hail' },
  64: { label: 'Paikoin raekuuroja', icon: 'cloud-hail', mood: 'hail' },
  164: { label: 'Paikoin raekuuroja', icon: 'cloud-hail', mood: 'hail' },
  67: { label: 'Raekuuroja', icon: 'cloud-hail', mood: 'hail' },

  // Ukkonen
  71: { label: 'Yksittäisiä ukkoskuuroja', icon: 'cloud-lightning', mood: 'thunder' },
  171: { label: 'Yksittäisiä ukkoskuuroja', icon: 'cloud-lightning', mood: 'thunder' },
  74: { label: 'Paikoin ukkoskuuroja', icon: 'cloud-lightning', mood: 'thunder' },
  174: { label: 'Paikoin ukkoskuuroja', icon: 'cloud-lightning', mood: 'thunder' },
  77: { label: 'Ukkoskuuroja', icon: 'cloud-lightning', mood: 'thunder' },
};

const FALLBACK: SymbolInfo = { label: 'Ei tietoa', icon: 'cloud', mood: 'cloudy' };

/** Hae SmartSymbol-koodin kuvaus */
export const getWeatherSymbol = (code: number | undefined): SymbolInfo => {
  if (code == null) return FALLBACK;
  return SYMBOLS[code] ?? FALLBACK;
};

/**
 * Palauttaa rivin taustaefektit sään ja tuulen perusteella.
 * Sää-mood ja tuulitaso ovat erillisiä kerroksia — molemmat näkyvät yhtä aikaa.
 */
export const getWeatherMoodStyle = (
  mood: WeatherMood,
  windSpeed: number,
): { bg: string; ring: string; animation: string; border: string; iconColor: string; isSevere: boolean } => {
  // 1. Sää-moodin taustaefekti + animaatio
  let weatherBg = 'bg-sea-800/50';
  let weatherRing = '';
  let weatherAnim = '';
  let weatherBorder = '';  // tyhjä = käytä merivesi-reunaa
  let iconColor = 'text-sea-300';   // oletus
  let isSevere = false;

  switch (mood) {
    case 'fog':
      weatherBg = 'bg-gradient-to-r from-gray-500/25 via-gray-400/15 to-gray-500/25';
      weatherRing = 'ring-1 ring-gray-400/25';
      weatherAnim = 'weather-mood-fog';
      weatherBorder = 'border-l-gray-400';
      iconColor = 'text-gray-300';
      isSevere = true;
      break;
    case 'drizzle':
      weatherBg = 'bg-gradient-to-r from-blue-800/20 via-blue-900/10 to-blue-800/20';
      weatherRing = 'ring-1 ring-blue-400/15';
      weatherAnim = 'weather-mood-drizzle';
      weatherBorder = 'border-l-blue-400';
      iconColor = 'text-blue-300';
      isSevere = true;
      break;
    case 'rain':
      weatherBg = 'bg-gradient-to-r from-blue-700/35 via-blue-800/20 to-blue-700/35';
      weatherRing = 'ring-1 ring-blue-400/25';
      weatherAnim = 'weather-mood-rain';
      weatherBorder = 'border-l-blue-500';
      iconColor = 'text-blue-400';
      isSevere = true;
      break;
    case 'heavy-rain':
      weatherBg = 'bg-gradient-to-r from-blue-600/45 via-blue-800/30 to-blue-600/45';
      weatherRing = 'ring-1 ring-blue-400/35';
      weatherAnim = 'weather-mood-heavy-rain';
      weatherBorder = 'border-l-blue-400';
      iconColor = 'text-blue-300';
      isSevere = true;
      break;
    case 'snow':
      weatherBg = 'bg-gradient-to-r from-slate-300/15 via-slate-400/10 to-slate-300/15';
      weatherRing = 'ring-1 ring-white/15';
      weatherAnim = 'weather-mood-snow';
      weatherBorder = 'border-l-slate-300';
      iconColor = 'text-slate-200';
      isSevere = true;
      break;
    case 'heavy-snow':
      weatherBg = 'bg-gradient-to-r from-white/20 via-slate-300/15 to-white/20';
      weatherRing = 'ring-1 ring-white/25';
      weatherAnim = 'weather-mood-heavy-snow';
      weatherBorder = 'border-l-white';
      iconColor = 'text-white';
      isSevere = true;
      break;
    case 'hail':
      weatherBg = 'bg-gradient-to-r from-cyan-700/30 via-cyan-800/18 to-cyan-700/30';
      weatherRing = 'ring-1 ring-cyan-400/30';
      weatherAnim = 'weather-mood-hail';
      weatherBorder = 'border-l-cyan-400';
      iconColor = 'text-cyan-300';
      isSevere = true;
      break;
    case 'thunder':
      weatherBg = 'bg-gradient-to-r from-purple-800/38 via-purple-900/25 to-purple-800/38';
      weatherRing = 'ring-1 ring-purple-400/30';
      weatherAnim = 'weather-mood-thunder';
      weatherBorder = 'border-l-purple-400';
      iconColor = 'text-yellow-300';
      isSevere = true;
      break;
    case 'freezing':
      weatherBg = 'bg-gradient-to-r from-indigo-700/30 via-pink-800/18 to-indigo-700/30';
      weatherRing = 'ring-1 ring-indigo-400/30';
      weatherAnim = 'weather-mood-freezing';
      weatherBorder = 'border-l-indigo-400';
      iconColor = 'text-indigo-300';
      isSevere = true;
      break;
  }

  // 2. Tuuli-overlay
  let windOverlay = '';
  let windAnim = '';
  if (windSpeed >= 21) {
    windOverlay = 'ring-2 ring-red-500/40';
    windAnim = 'weather-mood-storm';
    weatherBorder = 'border-l-red-500';
    isSevere = true;
  } else if (windSpeed >= 14) {
    windOverlay = 'ring-1 ring-orange-500/30';
    windAnim = 'weather-mood-wind';
    if (!isSevere) {
      weatherBorder = 'border-l-orange-400';
      isSevere = true;
    }
  }

  const finalRing = windOverlay || weatherRing;
  const finalAnim = [weatherAnim, windAnim].filter(Boolean).join(' ');

  return { bg: weatherBg, ring: finalRing, animation: finalAnim, border: weatherBorder, iconColor, isSevere };
};
