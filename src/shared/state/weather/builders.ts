import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "src/shared/enums/loadingState";
import { PresentFuture } from "src/shared/enums/days";
import { getWeatherForecastData } from "./actions";
import { convertToApiWeatherData } from "src/api/converters/weatherConverters";
import { WeatherState } from "src/types/state/weatherTypes";
import { ApiForecastData } from "src/types/api/apiData";

export const getWeatherBuilder = (builder: ActionReducerMapBuilder<WeatherState>) => {
    builder.addCase(getWeatherForecastData.pending, (state) => {
        state.status = LoadingState.Busy;
    });

    builder.addCase(getWeatherForecastData.fulfilled, (state, action: PayloadAction<ApiForecastData[]>) => {
        state.status = LoadingState.Success;
        const futureApiData = convertToApiWeatherData(action.payload, PresentFuture.Future);   
        state.data.futureData = futureApiData;
    });
    
    builder.addCase(getWeatherForecastData.rejected, (state) => {
        state.status = LoadingState.Error;
    });
};