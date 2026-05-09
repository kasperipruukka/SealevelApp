import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/utils/constants';
import type { ThemeMode } from '@/types/types';

/** Teeman hallinta — seuraa OS:a oletuksena, tallennetaan localStorage */
export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.theme);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch { /* fallback */ }

    // Oletus: tumma teema (merellä parempi)
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
};
