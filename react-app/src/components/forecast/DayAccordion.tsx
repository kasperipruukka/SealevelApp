import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Waves, Thermometer, Clock, Compass, Wind } from 'lucide-react';
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
                <Waves className="w-3.5 h-3.5 text-foam-500" />
                <Sparkline values={seaLevels} color="#4fd1c5" height={24} className="w-24" />
                <span className="text-xs text-sea-300 whitespace-nowrap">
                  {minSea > 0 ? '+' : ''}{minSea}…{maxSea > 0 ? '+' : ''}{maxSea}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
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
            <div className="px-3 sm:px-5 pb-3 flex gap-3 sm:gap-6 border-b border-sea-600/20">
              <div className="flex-1 min-w-0">
                <div className="text-[11px] sm:text-xs text-sea-300 mb-1 truncate flex items-center gap-1">
                  <Waves className="w-3 h-3 text-foam-500 shrink-0" /> {minSea > 0 ? '+' : ''}{minSea} … {maxSea > 0 ? '+' : ''}{maxSea} cm
                </div>
                <Sparkline values={seaLevels} color="#4fd1c5" height={40} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] sm:text-xs text-sea-300 mb-1 truncate flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-amber-400 shrink-0" /> {minTemp}° … {maxTemp}°
                </div>
                <Sparkline values={temperatures} color="#f59e0b" height={40} />
              </div>
            </div>

            {/* Tuntirivit */}
            <div className="px-2 sm:px-3 py-2 space-y-1.5 overflow-x-auto">
              {/* Otsikkorivi — mobiili: ikonit, desktop: teksti */}
              <div className="flex sm:hidden items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-sea-400 border-l-4 border-transparent rounded-lg">
                <div className="w-12 shrink-0 flex justify-center"><Clock className="w-3.5 h-3.5" /></div>
                <div className="w-14 shrink-0 flex justify-center"><Waves className="w-3.5 h-3.5 text-foam-500" /></div>
                <div className="w-14 shrink-0 flex justify-center"><Thermometer className="w-3.5 h-3.5 text-amber-400" /></div>
                <div className="flex-1 flex justify-center"><Compass className="w-3.5 h-3.5" /></div>
                <div className="w-[4.5rem] shrink-0 flex justify-center"><Wind className="w-3.5 h-3.5" /></div>
              </div>
              <div className="hidden sm:flex items-center gap-3 px-4 py-1 text-xs font-medium text-sea-400 uppercase tracking-wide">
                <div className="w-14">Aika</div>
                <div className="w-20 text-center">Keskivesi</div>
                <div className="w-16 text-center">Lämpötila</div>
                <div className="flex-1">Suunta</div>
                <div className="w-28 text-center">Tuuli</div>
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
