import { configureStore, combineReducers } from '@reduxjs/toolkit'
import sealevelSlice from './slices/sealevel/slice';

const reducer = combineReducers({
    sealevel: sealevelSlice.reducer,
})

export const store = configureStore({
    reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;