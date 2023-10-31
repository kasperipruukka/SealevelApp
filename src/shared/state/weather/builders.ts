import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "src/shared/enums/loadingState";
import { PresentFuture } from "src/shared/enums/days";
import { getWeatherForecastData, getWeatherObservationData } from "./actions";
import { convertApiForecastData, convertApiObservationData } from "src/api/converters/weatherConverters";
import { WeatherState } from "src/types/state/weatherTypes";
import { ApiForecastData, ApiObservationData } from "src/types/api/apiData";

export const getWeatherBuilder = (builder: ActionReducerMapBuilder<WeatherState>) => {

    // Forecast data
    builder.addCase(getWeatherForecastData.pending, (state) => {
        state.status = LoadingState.Busy;
    });

    builder.addCase(getWeatherForecastData.fulfilled, (state, action: PayloadAction<ApiForecastData[]>) => {
        state.status = LoadingState.Success;
        const futureApiData = convertApiForecastData(action.payload);   
        state.data.futureData = futureApiData;
    });
    
    builder.addCase(getWeatherForecastData.rejected, (state) => {
        state.status = LoadingState.Error;
    });

    // Observation data
    builder.addCase(getWeatherObservationData.pending, (state) => {
        state.status = LoadingState.Busy;
    });

    builder.addCase(getWeatherObservationData.fulfilled, (state, action: PayloadAction<ApiObservationData | null>) => {
        state.status = LoadingState.Success;
        if (action.payload) {
            const observationData = convertApiObservationData(action.payload);   
            state.data.observationData = observationData;
        }
    });
    
    builder.addCase(getWeatherObservationData.rejected, (state) => {
        state.status = LoadingState.Error;
    });
};