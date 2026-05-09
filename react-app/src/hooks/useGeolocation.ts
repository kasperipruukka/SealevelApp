import { useState, useCallback } from 'react';
import { CITIES, haversineDistance } from '@/utils/constants';
import type { CityData } from '@/types/types';

/** Etsi lähin kaupunki käyttäjän sijainnin perusteella */
export const useGeolocation = () => {
  const [nearestCity, setNearestCity] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findNearest = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Selain ei tue paikannusta');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let closest: CityData | null = null;
        let minDistance = Infinity;

        for (const city of CITIES) {
          const distance = haversineDistance(latitude, longitude, city.lat, city.lon);
          if (distance < minDistance) {
            minDistance = distance;
            closest = city;
          }
        }

        setNearestCity(closest);
        setLoading(false);
      },
      () => {
        setError('Paikannuslupa evätty');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 },
    );
  }, []);

  return { nearestCity, loading, error, findNearest };
};
