import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { WeatherEntry, LoadingState } from '@/types/types';
import { fetchWeatherData } from '@/api/weatherApi';

interface WeatherState {
  observation: WeatherEntry | null;
  forecast: WeatherEntry[];
  status: LoadingState;
  error: string | null;
}

const initialState: WeatherState = {
  observation: null,
  forecast: [],
  status: 'idle',
  error: null,
};

export const getWeatherData = createAsyncThunk(
  'weather/fetch',
  async (params: { forecastPlace: string; observationFmisid: string }, { rejectWithValue }) => {
    try {
      return await fetchWeatherData(params.forecastPlace, params.observationFmisid);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Tuntematon virhe';
      return rejectWithValue(message);
    }
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    resetWeather: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.status = 'success';
        state.observation = action.payload.observation;
        state.forecast = action.payload.forecast;
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        state.status = 'error';
        state.error = (action.payload as string) ?? 'Säädata haku epäonnistui';
        console.error('Säädatan haku epäonnistui:', action.payload);
      });
  },
});

export const { resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
