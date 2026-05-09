import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { SeaLevelEntry, LoadingState } from '@/types/types';
import { fetchSealevelData } from '@/api/sealevelApi';

interface SealevelState {
  present: SeaLevelEntry[];
  future: SeaLevelEntry[];
  status: LoadingState;
  error: string | null;
}

const initialState: SealevelState = {
  present: [],
  future: [],
  status: 'idle',
  error: null,
};

export const getSealevelData = createAsyncThunk(
  'sealevel/fetch',
  async (geoId: string, { rejectWithValue }) => {
    try {
      return await fetchSealevelData(geoId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Tuntematon virhe';
      return rejectWithValue(message);
    }
  },
);

const sealevelSlice = createSlice({
  name: 'sealevel',
  initialState,
  reducers: {
    resetSealevel: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSealevelData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getSealevelData.fulfilled, (state, action) => {
        state.status = 'success';
        state.present = action.payload.present;
        state.future = action.payload.future;
      })
      .addCase(getSealevelData.rejected, (state, action) => {
        state.status = 'error';
        state.error = (action.payload as string) ?? 'Datan haku epäonnistui';
        console.error('Merenpintadatan haku epäonnistui:', action.payload);
      });
  },
});

export const { resetSealevel } = sealevelSlice.actions;
export default sealevelSlice.reducer;
