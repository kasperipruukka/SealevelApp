import { createSlice } from "@reduxjs/toolkit";
import { getWindSpeedBuilder } from "./builders";
import { LoadingState } from "src/shared/enums/loadingState";
import { WindSpeedState } from "src/types/state/windSpeedTypes";

const initialState = {
    data: [],
    status: LoadingState.Busy,
    reducers: {
        reset: () => initialState,
    }
} as WindSpeedState;

const windSpeedSlice = createSlice({
    name: 'WindSpeed',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        getWindSpeedBuilder(builder);
    },
});

export default windSpeedSlice;

export const { reset } = windSpeedSlice.actions;

