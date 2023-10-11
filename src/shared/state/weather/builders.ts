import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { LoadingState } from "src/shared/enums/loadingState";
import { PresentFuture } from "src/shared/enums/days";
import { getWeatherData } from "./actions";
import { convertToApiWeatherData } from "src/api/converters/weatherConverters";

export const getWeatherBuilder = (builder: ActionReducerMapBuilder<any>) => {
    builder.addCase(getWeatherData.pending, (state) => {
        state.status = LoadingState.Busy;
    });

    builder.addCase(getWeatherData.fulfilled, (state, action) => {
        state.status = LoadingState.Success;
        debugger;

        const presentApiData = convertToApiWeatherData(action.payload, PresentFuture.Present);
        const futureApiData = convertToApiWeatherData(action.payload, PresentFuture.Future);
        
        state.data.futureData = [];
        state.data.presentData = [];
    });
    
    builder.addCase(getWeatherData.rejected, (state) => {
        state.status = LoadingState.Error;
    });
};