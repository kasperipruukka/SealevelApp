import { motion } from 'framer-motion';
import type { CombinedHourlyEntry } from '@/types/types';
import { getCompassDirection, getSeaLevelStatus, getTemperatureColor } from '@/utils/constants';
import { formatHour, formatSeaLevel, formatTemperature, formatWind } from '@/utils/formatting';
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

/** Yksittäinen tuntirivi ennustenäkymässä */
export const WeatherRow: React.FC<WeatherRowProps> = ({ entry, index }) => {
  const compass = getCompassDirection(entry.windDirection);
  const seaStatus = getSeaLevelStatus(entry.middleWater);
  const tempColor = getTemperatureColor(entry.temperature);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className={`flex items-center gap-3 px-4 py-3 border-l-4 ${ROW_BG[seaStatus]}
        bg-sea-800/50 weather-row
        rounded-lg hover:bg-sea-700/50 transition-colors duration-150`}
    >
      {/* Aika */}
      <div className="w-14 shrink-0">
        <span className="text-lg font-bold text-sea-50">{formatHour(entry.time)}</span>
      </div>

      {/* Keskivesi */}
      <div className="w-20 shrink-0 text-center flex items-center justify-center gap-1">
        <span className="text-base" aria-hidden="true">🌊</span>
        <span className="text-lg font-bold">{formatSeaLevel(entry.middleWater)}</span>
        <span className="text-xs opacity-60">cm</span>
      </div>

      {/* Lämpötila */}
      <div className="w-16 shrink-0 text-center flex items-center justify-center gap-0.5">
        <span className="text-base" aria-hidden="true">🌡️</span>
        <span className={`text-lg font-bold ${tempColor}`}>
          {formatTemperature(entry.temperature)}
        </span>
      </div>

      {/* Tuuli */}
      <div className="w-28 shrink-0 text-center flex items-center justify-center gap-1 flex-nowrap">
        <span className="text-base" aria-hidden="true">💨</span>
        <span className="text-base font-semibold whitespace-nowrap">
          {formatWind(entry.windSpeed, entry.windGust)}
        </span>
        <span className="text-xs opacity-60">m/s</span>
      </div>

      {/* Tuulen suunta */}
      <div className="flex-1 min-w-0">
        <WindCompass
          degrees={entry.windDirection}
          name={compass.name}
          arrow={compass.arrow}
        />
      </div>
    </motion.div>
  );
};
