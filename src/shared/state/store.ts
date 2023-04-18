import { configureStore, combineReducers } from '@reduxjs/toolkit'
import testiSlice from './slices/testi/slice';

const reducer = combineReducers({
    testi: testiSlice.reducer,
})

export const store = configureStore({
    reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;