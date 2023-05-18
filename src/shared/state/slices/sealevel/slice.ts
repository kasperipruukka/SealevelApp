import { createSlice } from "@reduxjs/toolkit";
import { getSealevelBuilder } from "./builders";
import { SealevelState } from "src/shared/types/state/sealevelTypes";
import { LoadingState } from "src/shared/enums/loadingState";

const initialState = {
    data: {
        futureData: [],
        presentData: [],
    },
    status: LoadingState.Busy,
    reducers: {
        reset: () => initialState,
    }
} as SealevelState;

const sealevelSlice = createSlice({
    name: 'Sealevel',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        getSealevelBuilder(builder);
    },
});

export default sealevelSlice;

export const { reset } = sealevelSlice.actions;

