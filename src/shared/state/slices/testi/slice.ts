import { createSlice } from "@reduxjs/toolkit";
import { getTestiBuilder } from "./builders";
import { TestiState } from "src/shared/types/state/testiTypes";
import { LoadingState } from "src/shared/enums/loadingState";

const initialState = {
    data: {
        futureData: [],
        presentData: [],
    },
    status: LoadingState.Success,
    reducers: {
        reset: () => initialState,
    }
} as TestiState;

const testiSlice = createSlice({
    name: 'testi',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        getTestiBuilder(builder);
    },
});

export default testiSlice;

export const { reset } = testiSlice.actions;

