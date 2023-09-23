import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getSealevelData } from "./actions";
import { convertToApiSealevelData } from "../../../../api/converters/sealevelConverters";
import { PresentFuture } from "src/shared/enums/days";
import { LoadingState } from "src/shared/enums/loadingState";
import { SealevelState } from "src/types/state/sealevelTypes";

export const getSealevelBuilder = (builder: ActionReducerMapBuilder<SealevelState>) => {
    builder.addCase(getSealevelData.pending, (state) => {
        state.status = LoadingState.Busy;
    });
    builder.addCase(getSealevelData.fulfilled, (state, action) => {
        state.status = LoadingState.Success;
        const presentData = convertToApiSealevelData(action.payload, PresentFuture.Present);
        const futureData = convertToApiSealevelData(action.payload, PresentFuture.Future);

        state.data.futureData = futureData;
        state.data.presentData = presentData;
    });
    builder.addCase(getSealevelData.rejected, (state) => {
        state.status = LoadingState.Error;
    });
};