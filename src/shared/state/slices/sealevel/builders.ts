import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { SealevelState } from "src/shared/types/state/sealevelTypes";
import { getSealevelData } from "./actions";
import { convertSealevelApiData } from "../../../../api/converters/sealevelConverter";
import { PresentFuture } from "src/shared/enums/days";
import { LoadingState } from "src/shared/enums/loadingState";

export const getSealevelBuilder = (builder: ActionReducerMapBuilder<SealevelState>) => {
    builder.addCase(getSealevelData.pending, (state) => {
        state.status = LoadingState.Busy;
    });
    builder.addCase(getSealevelData.fulfilled, (state, action) => {
        state.status = LoadingState.Success;
        const presentData = convertSealevelApiData(action.payload, PresentFuture.Present);
        const futureData = convertSealevelApiData(action.payload, PresentFuture.Future);

        state.data.futureData = futureData;
        state.data.presentData = presentData;
    });
    builder.addCase(getSealevelData.rejected, (state) => {
        state.status = LoadingState.Error;
    });
};