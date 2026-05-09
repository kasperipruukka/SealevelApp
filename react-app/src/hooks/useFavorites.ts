import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/utils/constants';

/** Suosikkien hallinta localStorage-synkronoinnilla */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.favorites);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item): item is string => typeof item === 'string');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((cityId: string) => {
    setFavorites((prev) =>
      prev.includes(cityId) ? prev.filter((id) => id !== cityId) : [...prev, cityId],
    );
  }, []);

  const isFavorite = useCallback(
    (cityId: string) => favorites.includes(cityId),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
};
