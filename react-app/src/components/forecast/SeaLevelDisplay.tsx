import { motion } from 'framer-motion';
import type { SeaLevelStatus } from '@/types/types';
import { getSeaLevelStatus, SEA_LEVEL_STATUS_LABELS } from '@/utils/constants';
import { formatSeaLevel } from '@/utils/formatting';

interface SeaLevelDisplayProps {
  middleWater: number;
  heightN2000: number;
  size?: 'hero' | 'compact';
}

const STATUS_STYLES: Record<SeaLevelStatus, string> = {
  'very-low': 'bg-level-very-low/20 border-level-very-low text-level-very-low',
  low: 'bg-level-low/20 border-level-low text-level-low',
  normal: 'bg-level-normal/20 border-level-normal text-level-normal',
  elevated: 'bg-level-elevated/20 border-level-elevated text-level-elevated',
  high: 'bg-level-high/20 border-level-high text-level-high',
  extreme: 'bg-level-extreme/20 border-level-extreme text-level-extreme',
};

const STATUS_BAR_COLORS: Record<SeaLevelStatus, string> = {
  'very-low': 'bg-level-very-low',
  low: 'bg-level-low',
  normal: 'bg-level-normal',
  elevated: 'bg-level-elevated',
  high: 'bg-level-high',
  extreme: 'bg-level-extreme',
};

export const SeaLevelDisplay: React.FC<SeaLevelDisplayProps> = ({
  middleWater,
  heightN2000,
  size = 'hero',
}) => {
  const status = getSeaLevelStatus(middleWater);
  const label = SEA_LEVEL_STATUS_LABELS[status];
  const isHero = size === 'hero';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border-2 p-4 ${STATUS_STYLES[status]} ${isHero ? 'p-6' : 'p-3'}`}
      role="status"
      aria-label={`Keskivesi ${formatSeaLevel(middleWater)} senttimetriä, tila: ${label}`}
    >
      {/* Tilaväripalkki */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`h-2.5 w-2.5 rounded-full ${STATUS_BAR_COLORS[status]}`} />
        <span className={`font-semibold uppercase tracking-wide ${isHero ? 'text-sm' : 'text-xs'}`}>
          {label}
        </span>
      </div>

      {/* Keskivesi — HERO */}
      <div className="flex items-baseline gap-3">
        <div>
          <div className="text-sea-300 dark:text-sea-300 text-xs font-medium uppercase tracking-wider mb-1">
            Keskivesi
          </div>
          <div className={`font-bold leading-none ${isHero ? 'text-5xl' : 'text-3xl'}`}>
            {formatSeaLevel(middleWater)}
            <span className={`font-normal ${isHero ? 'text-xl' : 'text-base'} ml-1 opacity-70`}>cm</span>
          </div>
        </div>

        {/* N2000 — toissijainen */}
        <div className="ml-auto text-right opacity-70">
          <div className="text-xs font-medium uppercase tracking-wider mb-1">N2000</div>
          <div className={`font-semibold ${isHero ? 'text-xl' : 'text-lg'}`}>
            {formatSeaLevel(heightN2000)}
            <span className="text-sm ml-0.5">cm</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
