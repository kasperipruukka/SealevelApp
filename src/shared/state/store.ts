import { configureStore, combineReducers } from '@reduxjs/toolkit'
import sealevelSlice from './sealevel/slice';
import windSpeedSlice from './windSpeed/slice';

const reducer = combineReducers({
    sealevel: sealevelSlice.reducer,
    windspeed: windSpeedSlice.reducer,
})

export const store = configureStore({
    reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;