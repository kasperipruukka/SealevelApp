import { configureStore, combineReducers } from '@reduxjs/toolkit'
import sealevelSlice from './sealevel/slice';
import weatherSlice from './weather/slice';

const reducer = combineReducers({
    sealevel: sealevelSlice.reducer,
    weather: weatherSlice.reducer,
})

export const store = configureStore({
    reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;