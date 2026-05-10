import { useMemo, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCity, setSearchQuery } from '@/store/ui/uiSlice';
import { useFavorites } from '@/hooks/useFavorites';
import { useGeolocation } from '@/hooks/useGeolocation';
import { CITIES } from '@/utils/constants';
import { CitySearch } from './CitySearch';
import { CityCard } from './CityCard';

/** Kaupunkilista — aloitusnäkymä */
export const CityList: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((s) => s.ui.searchQuery);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { nearestCity, loading: geoLoading, findNearest } = useGeolocation();

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch],
  );

  const handleCitySelect = useCallback(
    (cityId: string) => {
      dispatch(selectCity(cityId));
    },
    [dispatch],
  );

  // Suodatettu ja järjestetty kaupunkilista
  const sortedCities = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = query
      ? CITIES.filter(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            c.area.toLowerCase().includes(query),
        )
      : CITIES;

    // Suosikit ylös, muuten aakkosjärjestys
    return [...filtered].sort((a, b) => {
      const aFav = isFavorite(a.id) ? 0 : 1;
      const bFav = isFavorite(b.id) ? 0 : 1;
      if (aFav !== bFav) return aFav - bFav;
      return a.name.localeCompare(b.name, 'fi');
    });
  }, [searchQuery, favorites, isFavorite]);

  // Jos geolocation löysi, valitse se (useEffect estää infinite loopin)
  const hasNavigated = useRef(false);
  useEffect(() => {
    if (nearestCity && !hasNavigated.current) {
      hasNavigated.current = true;
      handleCitySelect(nearestCity.id);
    }
  }, [nearestCity, handleCitySelect]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-screen"
    >
      {/* Otsikko */}
      <header className="px-4 pt-8 pb-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl" aria-hidden="true">🌊</span>
          <h1 className="text-2xl font-bold text-sea-50">Merivedenkorkeus</h1>
        </div>
        <p className="text-sea-400 text-sm">
          Sää ja merenpintaennusteet Suomen rannikolle
        </p>
      </header>

      {/* Haku + sijainti */}
      <div className="px-4 pb-4 max-w-5xl mx-auto w-full space-y-3">
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <CitySearch onSearch={handleSearch} />
          </div>
          <button
            onClick={findNearest}
            disabled={geoLoading}
            className="flex items-center justify-center gap-2 px-3 py-3 bg-foam-500/10 border border-foam-500/30
              text-foam-500 font-medium rounded-2xl hover:bg-foam-500/20 transition-colors min-w-[48px] min-h-[48px] whitespace-nowrap"
            aria-label="Käytä sijaintia"
          >
            <MapPinIcon className={`w-5 h-5 ${geoLoading ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{geoLoading ? 'Paikannetaan...' : 'Käytä sijaintia'}</span>
          </button>
        </div>
      </div>

      {/* Kaupunkilista */}
      <main className="flex-1 px-4 pb-24 max-w-5xl mx-auto w-full">
        {favorites.length > 0 && !searchQuery && (
          <h2 className="text-xs font-semibold text-sea-400 uppercase tracking-wider mb-2 px-1">
            ❤️ Suosikit
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {sortedCities.map((city, index) => {
            const showDivider =
              !searchQuery &&
              index > 0 &&
              isFavorite(sortedCities[index - 1].id) &&
              !isFavorite(city.id);

            return (
              <div key={city.id} className={showDivider ? 'col-span-full contents' : ''}>
                {showDivider && (
                  <div className="col-span-full flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-sea-600/30" />
                    <span className="text-xs text-sea-500 uppercase tracking-wider">Kaikki kaupungit</span>
                    <div className="flex-1 h-px bg-sea-600/30" />
                  </div>
                )}
                <CityCard
                  city={city}
                  isFavorite={isFavorite(city.id)}
                  onSelect={() => handleCitySelect(city.id)}
                  onToggleFavorite={() => toggleFavorite(city.id)}
                  index={index}
                />
              </div>
            );
          })}
        </div>

        {sortedCities.length === 0 && (
          <div className="text-center py-12 text-sea-400">
            <p className="text-lg">Ei hakutuloksia</p>
            <p className="text-sm mt-1">Kokeile eri hakusanaa</p>
          </div>
        )}
      </main>
    </motion.div>
  );
};
