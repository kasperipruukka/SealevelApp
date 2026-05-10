import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { Thermometer, Wind, Navigation } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSealevelData } from '@/store/sealevel/sealevelSlice';
import { getWeatherData } from '@/store/weather/weatherSlice';
import { goToCityList, setLastUpdated } from '@/store/ui/uiSlice';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { CITIES, getCompassDirection, getWindSpeedColor } from '@/utils/constants';
import { formatUpdateTime, getFinnishWeekday } from '@/utils/formatting';
import { SeaLevelDisplay } from './SeaLevelDisplay';
import { DayAccordion } from './DayAccordion';
import { SkeletonForecast } from '../feedback/SkeletonForecast';
import { ErrorDisplay } from '../feedback/ErrorDisplay';
import type { CombinedHourlyEntry, SeaLevelEntry, WeatherEntry } from '@/types/types';

interface ForecastViewProps {
  cityId: string;
}

/** Yhdistä merenpinta + sää samojen tuntien perusteella */
const combineData = (
  seaEntries: SeaLevelEntry[],
  weatherEntries: WeatherEntry[],
): CombinedHourlyEntry[] => {
  return weatherEntries.map((w) => {
    const sea = seaEntries.find((s) => s.time === w.time && s.weekday === w.weekday);
    return {
      weekday: w.weekday,
      time: w.time,
      middleWater: sea?.middleWater ?? 0,
      heightN2000: sea?.heightN2000 ?? 0,
      temperature: w.temperature,
      windSpeed: w.windSpeed,
      windDirection: w.windDirection,
      windGust: w.windGust,
      smartSymbol: w.smartSymbol,
      precipitation: w.precipitation,
      precipitationProbability: w.precipitationProbability,
      feelsLike: w.feelsLike,
    };
  });
};

/** Ryhmittele päivittäin */
const groupByDay = (entries: CombinedHourlyEntry[]) => {
  const now = new Date();
  const today = getFinnishWeekday(now.getDay());
  const tomorrow = getFinnishWeekday((now.getDay() + 1) % 7);
  const dayAfter = getFinnishWeekday((now.getDay() + 2) % 7);

  const todayEntries = entries.filter((e) => e.weekday === today && e.time > now.getHours());
  const tomorrowEntries = entries.filter((e) => e.weekday === tomorrow);
  const dayAfterEntries = entries.filter((e) => e.weekday === dayAfter);

  const days = [];

  if (now.getHours() < 23 && todayEntries.length > 0) {
    days.push({ label: 'Tänään', weekday: today, entries: todayEntries });
  }
  if (tomorrowEntries.length > 0) {
    days.push({ label: 'Huomenna', weekday: tomorrow, entries: tomorrowEntries });
  }
  if (dayAfterEntries.length > 0) {
    days.push({ label: 'Ylihuomenna', weekday: dayAfter, entries: dayAfterEntries });
  }

  return days;
};

export const ForecastView: React.FC<ForecastViewProps> = ({ cityId }) => {
  const dispatch = useAppDispatch();
  const city = CITIES.find((c) => c.id === cityId);
  const sealevel = useAppSelector((s) => s.sealevel);
  const weather = useAppSelector((s) => s.weather);
  const lastUpdated = useAppSelector((s) => s.ui.lastUpdated);

  const fetchAll = useCallback(() => {
    if (!city) return;
    dispatch(getSealevelData(city.geoId));
    dispatch(getWeatherData({ forecastPlace: city.forecastPlace, observationFmisid: city.observationFmisid }));
    dispatch(setLastUpdated(formatUpdateTime()));
  }, [city, dispatch]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useAutoRefresh(fetchAll, true);

  if (!city) return null;

  const isLoading = sealevel.status === 'loading' || weather.status === 'loading';
  const hasError = sealevel.status === 'error' && weather.status === 'error';
  const partialError = sealevel.status === 'error' || weather.status === 'error';

  // Nykyhetki
  const presentSea = sealevel.present[0] ?? null;
  const presentWeather = weather.observation;

  // Ennuste päivittäin
  const combined = combineData(sealevel.future, weather.forecast);
  const days = groupByDay(combined);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col min-h-screen"
    >
      {/* Yläpalkki */}
      <header className="border-b border-sea-600/30 px-4 py-3 pr-16 sm:pr-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button
            onClick={() => dispatch(goToCityList())}
            className="p-2.5 -ml-2 rounded-xl hover:bg-sea-700/50 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Takaisin kaupunkilistaan"
          >
            <ArrowLeftIcon className="w-6 h-6 text-foam-500" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-sea-50 truncate">{city.name}</h1>
            <p className="text-sm text-sea-400 truncate">{city.area}</p>
            {lastUpdated && (
              <div className="flex sm:hidden items-center gap-1.5 text-xs text-sea-400 mt-0.5">
                <span>Päivitetty {lastUpdated}</span>
                <button
                  onClick={fetchAll}
                  className="p-1 rounded-lg hover:bg-sea-700/50 transition-colors"
                  aria-label="Päivitä tiedot"
                  disabled={isLoading}
                >
                  <ArrowPathIcon className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            )}
          </div>

          {lastUpdated && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-sea-400">
              <span>Päivitetty {lastUpdated}</span>
              <button
                onClick={fetchAll}
                className="p-2 rounded-lg hover:bg-sea-700/50 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Päivitä tiedot"
                disabled={isLoading}
              >
                <ArrowPathIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sisältö */}
      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full space-y-6">
        {isLoading && !presentSea && <SkeletonForecast />}

        {hasError && (
          <ErrorDisplay
            message="Tietojen haku epäonnistui"
            onRetry={fetchAll}
          />
        )}

        {!hasError && (
          <>
            {partialError && (
              <div className="bg-level-elevated/10 border border-level-elevated/30 rounded-xl px-4 py-3 text-sm text-level-elevated">
                Osa tiedoista ei ole saatavilla. Näytetään mitä saatiin.
              </div>
            )}

            {/* Nykyhetki: Keskivesi hero */}
            {presentSea && (
              <section aria-label="Nykyhetki">
                <h2 className="text-sm font-semibold text-sea-400 uppercase tracking-wider mb-3">
                  Nyt
                </h2>
                <SeaLevelDisplay
                  middleWater={presentSea.middleWater}
                  heightN2000={presentSea.heightN2000}
                  size="hero"
                />

                {/* Nykyhetken säädata */}
                {presentWeather && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {/* Lämpötila */}
                    <div className="bg-sea-800/40 border border-sea-600/20 rounded-2xl p-4 flex flex-col items-center gap-2">
                      <Thermometer className="w-8 h-8 text-amber-400" aria-hidden="true" />
                      <span className="text-2xl font-bold tracking-tight">
                        {presentWeather.temperature > 0 ? '+' : ''}{presentWeather.temperature}°C
                      </span>
                    </div>
                    {/* Tuuli */}
                    <div className="bg-sea-800/40 border border-sea-600/20 rounded-2xl p-4 flex flex-col items-center gap-2">
                      <Wind className="w-8 h-8 text-sea-300" aria-hidden="true" />
                      <span className={`text-2xl font-bold tracking-tight whitespace-nowrap ${getWindSpeedColor(presentWeather.windSpeed)}`}>
                        {presentWeather.windSpeed} ({presentWeather.windGust})
                      </span>
                      <span className="text-xs opacity-60">m/s</span>
                    </div>
                    {/* Tuulen suunta */}
                    <div className="bg-sea-800/40 border border-sea-600/20 rounded-2xl p-4 flex flex-col items-center gap-2">
                      <Navigation
                        className="w-8 h-8 text-foam-500 fill-foam-500/30 transition-transform duration-500"
                        style={{ transform: `rotate(${presentWeather.windDirection + 180 - 45}deg)` }}
                        aria-hidden="true"
                      />
                      <span className="text-lg font-bold tracking-tight">
                        {getCompassDirection(presentWeather.windDirection).name}
                      </span>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Ennuste päivittäin */}
            {days.length > 0 && (
              <section aria-label="Ennuste" className="space-y-3">
                <h2 className="text-sm font-semibold text-sea-400 uppercase tracking-wider">
                  Ennuste
                </h2>
                {days.map((day, i) => (
                  <DayAccordion
                    key={day.label}
                    label={`${day.label} — ${day.weekday}`}
                    entries={day.entries}
                    defaultOpen={i === 0}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </motion.div>
  );
};
