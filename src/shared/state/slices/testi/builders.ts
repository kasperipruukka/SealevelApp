import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { TestiState } from "src/shared/types/state/testiTypes";
import { testiHaku } from "./actions";

export const getTestiBuilder = (builder: ActionReducerMapBuilder<TestiState>) => {
    builder.addCase(testiHaku.pending, (state) => {
        state.status = 'Busy';
        state.data = '';
    });
    builder.addCase(testiHaku.fulfilled, (state, action) => {
        state.status = 'Success';
        state.data = '';
    });
    builder.addCase(testiHaku.rejected, (state) => {
        state.status = 'Error';
        state.data = '';
    });
};