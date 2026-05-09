import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppView, ThemeMode } from '@/types/types';

interface UiState {
  selectedCityId: string | null;
  compareCityId: string | null;
  currentView: AppView;
  theme: ThemeMode;
  lastUpdated: string | null;
  searchQuery: string;
}

const initialState: UiState = {
  selectedCityId: null,
  compareCityId: null,
  currentView: 'city-list',
  theme: 'dark',
  lastUpdated: null,
  searchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<string>) => {
      state.selectedCityId = action.payload;
      state.compareCityId = null;
      state.currentView = 'forecast';
    },
    selectCompareCity: (state, action: PayloadAction<string>) => {
      state.compareCityId = action.payload;
      state.currentView = 'comparison';
    },
    clearCompareCity: (state) => {
      state.compareCityId = null;
      state.currentView = 'forecast';
    },
    goToCityList: (state) => {
      state.currentView = 'city-list';
      state.selectedCityId = null;
      state.compareCityId = null;
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    setLastUpdated: (state, action: PayloadAction<string>) => {
      state.lastUpdated = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  selectCity,
  selectCompareCity,
  clearCompareCity,
  goToCityList,
  setTheme,
  setLastUpdated,
  setSearchQuery,
} = uiSlice.actions;

export default uiSlice.reducer;
