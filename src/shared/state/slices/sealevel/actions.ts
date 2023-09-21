import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiDataSealevel } from "src/shared/types/apiData";
import wretch from 'wretch';

export const getSealevelData = createAsyncThunk("getSealevelData",
    async (): Promise<ApiDataSealevel> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs/short?geoid=-10022816`;
        const res = await wretch(url).get().json() as ApiDataSealevel;
        return res;
    }
);