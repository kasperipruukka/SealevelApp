import { useEffect, useRef } from 'react';
import { AUTO_REFRESH_INTERVAL } from '@/utils/constants';

/** Automaattinen päivitys tietyin väliajoin */
export const useAutoRefresh = (callback: () => void, enabled: boolean = true) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      callbackRef.current();
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [enabled]);
};
