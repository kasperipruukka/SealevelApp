import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getWindSpeedData } from "./actions";
import { LoadingState } from "src/shared/enums/loadingState";
import { convertToApiWindSpeedData, convertToWindSpeedData } from "src/api/converters/windSpeedConverters";
import { WindSpeedState } from "src/types/state/windSpeedTypes";
import { PresentFuture } from "src/shared/enums/days";

export const getWindSpeedBuilder = (builder: ActionReducerMapBuilder<WindSpeedState>) => {
    builder.addCase(getWindSpeedData.pending, (state) => {
        state.status = LoadingState.Busy;
    });

    builder.addCase(getWindSpeedData.fulfilled, (state, action) => {
        state.status = LoadingState.Success;

        const presentApiData = convertToApiWindSpeedData(action.payload, PresentFuture.Present);
        const futureApiData = convertToApiWindSpeedData(action.payload, PresentFuture.Future);

        const presentData = convertToWindSpeedData(presentApiData);
        const futureData = convertToWindSpeedData(futureApiData); 

        state.data.futureData = futureData;
        state.data.presentData = presentData;
    });
    
    builder.addCase(getWindSpeedData.rejected, (state) => {
        state.status = LoadingState.Error;
    });
};