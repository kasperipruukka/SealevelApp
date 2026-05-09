import { motion } from 'framer-motion';
import type { CityData } from '@/types/types';
import { FavoriteButton } from './FavoriteButton';

interface CityCardProps {
  city: CityData;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
  previewData?: {
    middleWater: number | null;
    temperature: number | null;
  };
  index: number;
}

/** Kaupunkikortti — listanäkymässä */
export const CityCard: React.FC<CityCardProps> = ({
  city,
  isFavorite,
  onSelect,
  onToggleFavorite,
  previewData,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
        className="w-full flex items-center gap-3 px-4 py-4 bg-sea-800/40
          border border-sea-600/20 rounded-2xl cursor-pointer
          hover:bg-sea-700/50 hover:border-foam-500/30
          active:scale-[0.98] transition-all duration-150
          min-h-[64px] text-left group"
        aria-label={`Avaa ${city.name}`}
      >
        {/* Kaupunkitiedot */}
        <div className="flex-1 min-w-0">
          <div className="text-lg font-bold text-sea-50 group-hover:text-foam-500 transition-colors truncate">
            {city.name}
          </div>
          <div className="text-sm text-sea-400 truncate">{city.area}</div>
        </div>

        {/* Pikakatselu — lämpötila + merenpinta */}
        {previewData && (
          <div className="flex items-center gap-3 text-right">
            {previewData.temperature !== null && (
              <div className="text-right">
                <div className="text-xs text-sea-400">🌡</div>
                <div className="text-base font-bold text-sea-100">
                  {previewData.temperature > 0 ? '+' : ''}{previewData.temperature}°
                </div>
              </div>
            )}
            {previewData.middleWater !== null && (
              <div className="text-right">
                <div className="text-xs text-sea-400">🌊</div>
                <div className="text-base font-bold text-foam-500">
                  {previewData.middleWater > 0 ? '+' : ''}{previewData.middleWater} cm
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suosikkipainike */}
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
          cityName={city.name}
        />
      </div>
    </motion.div>
  );
};
