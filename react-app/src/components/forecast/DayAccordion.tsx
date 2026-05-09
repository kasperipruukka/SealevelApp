import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import type { CombinedHourlyEntry } from '@/types/types';
import { WeatherRow } from './WeatherRow';
import { Sparkline } from './Sparkline';

interface DayAccordionProps {
  label: string;
  entries: CombinedHourlyEntry[];
  defaultOpen?: boolean;
}

/** Päiväkohtainen avattava osio ennusteelle */
export const DayAccordion: React.FC<DayAccordionProps> = ({
  label,
  entries,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (entries.length === 0) return null;

  const seaLevels = entries.map((e) => e.middleWater);
  const temperatures = entries.map((e) => e.temperature);
  const minSea = Math.min(...seaLevels);
  const maxSea = Math.max(...seaLevels);
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);

  return (
    <div className="rounded-2xl bg-sea-800/40 border border-sea-600/30 overflow-hidden day-accordion">
      {/* Otsikko */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-sea-700/30 transition-colors duration-150 min-h-[56px]"
        aria-expanded={isOpen}
        aria-controls={`day-${label}`}
      >
        <div className="flex-1">
          <h3 className="text-lg font-bold text-sea-50 text-left">{label}</h3>

          {/* Sparkline-esikatselut kun kiinni */}
          {!isOpen && (
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs text-sea-300">🌊</span>
                <Sparkline values={seaLevels} color="#4fd1c5" height={24} className="w-24" />
                <span className="text-xs text-sea-300 whitespace-nowrap">
                  {minSea > 0 ? '+' : ''}{minSea}…{maxSea > 0 ? '+' : ''}{maxSea}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-sea-300">🌡</span>
                <Sparkline values={temperatures} color="#f59e0b" height={24} className="w-24" />
                <span className="text-xs text-sea-300 whitespace-nowrap">{minTemp}…{maxTemp}°</span>
              </div>
            </div>
          )}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon className="w-6 h-6 text-sea-300" />
        </motion.div>
      </button>

      {/* Sisältö */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`day-${label}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {/* Sparkline-kaaviot auki-tilassa */}
            <div className="px-5 pb-3 flex gap-6  border-b border-sea-600/20">
              <div className="flex-1">
                <div className="text-xs text-sea-300 uppercase tracking-wide mb-1">
                  🌊 Keskivesi ({minSea > 0 ? '+' : ''}{minSea} … {maxSea > 0 ? '+' : ''}{maxSea} cm)
                </div>
                <Sparkline values={seaLevels} color="#4fd1c5" height={40} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-sea-300 uppercase tracking-wide mb-1">
                  🌡 Lämpötila ({minTemp}° … {maxTemp}°)
                </div>
                <Sparkline values={temperatures} color="#f59e0b" height={40} />
              </div>
            </div>

            {/* Tuntirivit */}
            <div className="px-3 py-2 space-y-1.5">
              {/* Otsikkorivi */}
              <div className="flex items-center gap-3 px-4 py-1 text-xs font-medium text-sea-400 uppercase tracking-wide">
                <div className="w-14">Aika</div>
                <div className="w-20 text-center">Keskivesi</div>
                <div className="w-16 text-center">Lämpötila</div>
                <div className="w-28 text-center">Tuuli</div>
                <div className="flex-1">Suunta</div>
              </div>
              {entries.map((entry, i) => (
                <WeatherRow key={`${entry.time}-${i}`} entry={entry} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
