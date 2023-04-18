import { createAsyncThunk } from "@reduxjs/toolkit";
import { SeaLevelData } from "src/shared/types/seaLevel";
import wretch from 'wretch';

export const testiHaku = createAsyncThunk(
    "testihaku",
    async (testi: string): Promise<SeaLevelData> => {
        const res: { data: SeaLevelData } = await wretch(`${testi}`)
        .get()
        .json();

        return res.data;
    }
);