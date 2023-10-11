import { createSlice } from "@reduxjs/toolkit";
import { getWeatherBuilder } from "./builders";
import { WeatherState } from "src/types/state/weatherTypes";
import { LoadingState } from "src/shared/enums/loadingState";

const initialState = {
    data: {
        futureData: [],
        presentData: []
    },
    status: LoadingState.Busy,
    reducers: {
        reset: () => initialState,
    }
} as WeatherState;

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        getWeatherBuilder(builder);
    },
});

export default weatherSlice;

export const { reset } = weatherSlice.actions;

