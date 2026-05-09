import { configureStore } from '@reduxjs/toolkit';
import sealevelReducer from './sealevel/sealevelSlice';
import weatherReducer from './weather/weatherSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    sealevel: sealevelReducer,
    weather: weatherReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
