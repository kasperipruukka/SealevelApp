import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useAppSelector } from '@/store/hooks';
import { AppShell } from '@/components/layout/AppShell';
import { CityList } from '@/components/city/CityList';
import { ForecastView } from '@/components/forecast/ForecastView';

/** Sovelluksen sisäinen näkymänhallinta */
const AppContent: React.FC = () => {
  const { currentView, selectedCityId } = useAppSelector((s) => s.ui);

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
