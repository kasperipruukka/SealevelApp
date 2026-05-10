import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { goToCityList, selectCity } from '@/store/ui/uiSlice';
import { AppShell } from '@/components/layout/AppShell';
import { CityList } from '@/components/city/CityList';
import { ForecastView } from '@/components/forecast/ForecastView';

/** Sovelluksen sisäinen näkymänhallinta */
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentView, selectedCityId } = useAppSelector((s) => s.ui);
  const isPopState = useRef(false);

  // Kuuntele selaimen back/forward-nappeja
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      isPopState.current = true;
      const cityId = e.state?.cityId as string | undefined;
      if (cityId) {
        dispatch(selectCity(cityId));
      } else {
        dispatch(goToCityList());
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [dispatch]);

  // Pushaa history-entry kun Redux-tila vaihtuu (paitsi popstate-triggeröity)
  useEffect(() => {
    if (isPopState.current) {
      isPopState.current = false;
      return;
    }
    if (currentView === 'forecast' && selectedCityId) {
      window.history.pushState({ cityId: selectedCityId }, '', `#${selectedCityId}`);
    } else if (currentView === 'city-list') {
      // Korvaa nykyinen entry ilman hashia (ei pushata uutta)
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [currentView, selectedCityId]);

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        {currentView === 'city-list' && <CityList key="city-list" />}
        {(currentView === 'forecast' || currentView === 'comparison') && selectedCityId && (
          <ForecastView key={`forecast-${selectedCityId}`} cityId={selectedCityId} />
        )}
      </AnimatePresence>
    </AppShell>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
