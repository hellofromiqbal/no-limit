import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import type { PopulationData } from '../types/types';

interface PopulationState {
  data: PopulationData[];
  loading: boolean;
  error: string | null;
};

const initialState: PopulationState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPopulation = createAsyncThunk(
  'population/fetchPopulation',
  async () => {
    const res = await api.get('/data?drilldowns=Nation&measures=Population');
    return res.data.data.map((item: any) => ({
      Year: item.Year,
      Population: item.Population,
    }));
  }
);

const populationSlice = createSlice({
  name: 'population',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopulation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopulation.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchPopulation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch population data';
      });
  },
});

export default populationSlice.reducer;