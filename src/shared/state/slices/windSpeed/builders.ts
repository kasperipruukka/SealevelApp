import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getWindSpeedData } from "./actions";
import { LoadingState } from "src/shared/enums/loadingState";
import { convertWindSpeedData } from "src/api/converters/windSpeedConverters";
import { WindSpeedState } from "src/types/state/windSpeedTypes";

export const getWindSpeedBuilder = (builder: ActionReducerMapBuilder<WindSpeedState>) => {
    builder.addCase(getWindSpeedData.pending, (state) => {
        state.status = LoadingState.Busy;
    });
    builder.addCase(getWindSpeedData.fulfilled, (state, action) => {
        const windSpeedData = convertWindSpeedData(action.payload);
        console.log(windSpeedData);
        state.data = windSpeedData;
        state.status = LoadingState.Success;
    });
    builder.addCase(getWindSpeedData.rejected, (state) => {
        state.status = LoadingState.Error;
    });
};