import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Waves, Thermometer, Wind,
  Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudRainWind,
  CloudSnow, CloudHail, CloudLightning, Snowflake,
  Droplets, ThermometerSnowflake, Eye,
} from 'lucide-react';
import type { CombinedHourlyEntry } from '@/types/types';
import { getCompassDirection, getSeaLevelStatus, getSeaLevelTextColor, getWindSpeedColor } from '@/utils/constants';
import { formatHour, formatSeaLevel, formatTemperature, formatWind } from '@/utils/formatting';
import { getWeatherSymbol, getWeatherMoodStyle } from '@/utils/weatherSymbols';
import { WindCompass } from './WindCompass';

interface WeatherRowProps {
  entry: CombinedHourlyEntry;
  index: number;
}

const ROW_BG: Record<string, string> = {
  'very-low': 'border-l-level-very-low',
  low: 'border-l-level-low',
  normal: 'border-l-level-normal',
  elevated: 'border-l-level-elevated',
  high: 'border-l-level-high',
  extreme: 'border-l-level-extreme',
};

const ICON_MAP = {
  'sun': Sun,
  'cloud-sun': CloudSun,
  'cloud': Cloud,
  'cloud-fog': CloudFog,
  'cloud-drizzle': CloudDrizzle,
  'cloud-rain': CloudRain,
  'cloud-rain-wind': CloudRainWind,
  'cloud-snow': CloudSnow,
  'cloud-hail': CloudHail,
  'cloud-lightning': CloudLightning,
  'snowflake': Snowflake,
} as const;

/** Yksittäinen tuntirivi ennustenäkymässä — klikkaamalla avautuu lisätiedot */
export const WeatherRow: React.FC<WeatherRowProps> = ({ entry, index }) => {
  const [expanded, setExpanded] = useState(false);
  const compass = getCompassDirection(entry.windDirection);
  const seaStatus = getSeaLevelStatus(entry.middleWater);
  const seaTextColor = getSeaLevelTextColor(entry.middleWater);
  const windColor = getWindSpeedColor(entry.windSpeed);
  const symbol = getWeatherSymbol(entry.smartSymbol);
  const WeatherIcon = ICON_MAP[symbol.icon];
  const moodStyle = getWeatherMoodStyle(symbol.mood, entry.windSpeed);

  // Vasen reuna: sää-mood yliajaa merivesi-värin kun on ääritilanne
  const borderClass = moodStyle.isSevere ? moodStyle.border : ROW_BG[seaStatus];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className={`relative border-l-4 ${borderClass}
        ${moodStyle.bg} ${moodStyle.ring} ${moodStyle.animation} weather-row
        rounded-lg hover:bg-sea-700/50 transition-colors duration-150`}
    >
      {/* Pieni sää-ikoni badge — näkyy vain ääritilanteissa */}
      {moodStyle.isSevere && (
        <div className={`absolute top-1 right-1 sm:top-1.5 sm:right-1.5 opacity-60 pointer-events-none ${moodStyle.iconColor}`}>
          <WeatherIcon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </div>
      )}
      {/* Päärivin klikattava alue */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-4 py-3 cursor-pointer text-left"
        aria-expanded={expanded}
      >
        {/* Aika */}
        <div className="w-12 sm:w-14 shrink-0 text-center">
          <span className="text-base sm:text-lg font-bold text-sea-50">{formatHour(entry.time)}</span>
        </div>

        {/* Keskivesi */}
        <div className="w-14 sm:w-20 shrink-0 text-center flex items-center justify-center gap-0.5 sm:gap-1">
          <Waves className="hidden sm:inline w-4 h-4 text-foam-500 shrink-0" aria-hidden="true" />
          <span className={`text-base sm:text-lg font-bold ${seaTextColor}`}>{formatSeaLevel(entry.middleWater)}</span>
          <span className="hidden sm:inline text-xs opacity-60">cm</span>
        </div>

        {/* Lämpötila */}
        <div className="w-14 sm:w-16 shrink-0 text-center flex items-center justify-center gap-0.5">
          <Thermometer className="hidden sm:inline w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
          <span className="text-base sm:text-lg font-bold text-sea-100">
            {formatTemperature(entry.temperature)}
          </span>
        </div>

        {/* Tuulen suunta */}
        <div className="flex-1 min-w-0 flex justify-center sm:justify-start">
          <WindCompass
            degrees={entry.windDirection}
            name={compass.name}
            arrow={compass.arrow}
          />
        </div>

        {/* Tuuli */}
        <div className="w-[4.5rem] sm:w-28 shrink-0 text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-0.5 sm:gap-1 flex-nowrap">
            <Wind className="hidden sm:inline w-4 h-4 text-sea-300 shrink-0" aria-hidden="true" />
            <span className={`text-sm sm:text-base font-semibold whitespace-nowrap ${windColor}`}>
              {formatWind(entry.windSpeed, entry.windGust)}
            </span>
          </div>
          <span className="text-[8px] sm:text-[10px] leading-none opacity-50">m/s</span>
        </div>

      </button>

      {/* Lisätiedot — accordion */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-3 pt-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm border-t border-sea-700/50">
              {/* Sään laatu */}
              <div className="flex items-center gap-2">
                <WeatherIcon className="w-5 h-5 text-sea-300 shrink-0" aria-hidden="true" />
                <span className="text-sea-200">{symbol.label}</span>
              </div>

              {/* Sademäärä & todennäköisyys */}
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400 shrink-0" aria-hidden="true" />
                <span className="text-sea-200">
                  {entry.precipitation != null ? `${entry.precipitation} mm` : '–'}
                  {entry.precipitationProbability != null && (
                    <span className="text-sea-400 ml-1">({entry.precipitationProbability}%)</span>
                  )}
                </span>
              </div>

              {/* Tuntuu kuin */}
              <div className="flex items-center gap-2">
                <ThermometerSnowflake className="w-5 h-5 text-cyan-400 shrink-0" aria-hidden="true" />
                <span className="text-sea-200">
                  Tuntuu {entry.feelsLike != null ? `${entry.feelsLike > 0 ? '+' : ''}${entry.feelsLike}°` : '–'}
                </span>
              </div>

              {/* N2000-korkeus */}
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-foam-400 shrink-0" aria-hidden="true" />
                <span className="text-sea-200">
                  N2000: {entry.heightN2000 > 0 ? '+' : ''}{entry.heightN2000} cm
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
