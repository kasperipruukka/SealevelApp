import { motion } from 'framer-motion';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  cityName: string;
}

/** Sydän-suosikkipainike animaatiolla */
export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
  cityName,
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="p-2 rounded-xl hover:bg-sea-700/50 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
      aria-label={isFavorite ? `Poista ${cityName} suosikeista` : `Lisää ${cityName} suosikkeihin`}
    >
      {isFavorite ? (
        <motion.div
          key="filled"
          initial={{ scale: 0.5, rotate: -15 }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 0.4, type: 'spring' }}
        >
          <HeartSolid className="w-6 h-6 text-red-400" />
        </motion.div>
      ) : (
        <HeartOutline className="w-6 h-6 text-sea-400 hover:text-sea-200 transition-colors" />
      )}
    </motion.button>
  );
};
