import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { TestiState } from "src/shared/types/state/testiTypes";
import { getApiData } from "./actions";
import { convertApiData } from "../../converters/apiDataConverters";
import { PresentFuture } from "src/shared/enums/days";
import { LoadingState } from "src/shared/enums/loadingState";

export const getTestiBuilder = (builder: ActionReducerMapBuilder<TestiState>) => {
    builder.addCase(getApiData.pending, (state) => {
        state.status = LoadingState.Busy;
    });
    builder.addCase(getApiData.fulfilled, (state, action) => {
        state.status = LoadingState.Success;
        const presentData = convertApiData(action.payload, PresentFuture.Present);
        const futureData = convertApiData(action.payload, PresentFuture.Future);

        state.data.futureData = futureData;
        state.data.presentData = presentData;
    });
    builder.addCase(getApiData.rejected, (state) => {
        state.status = LoadingState.Error;
    });
};