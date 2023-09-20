import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDays } from "src/shared/sharedFunctions";
import { ApiData } from "src/shared/types/apiData";
import wretch from 'wretch';

export const getApiData = createAsyncThunk("getApiData",
    async (): Promise<ApiData> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs/short?geoid=-10022816`;
        const res = await wretch(url).get().json() as ApiData;
        return res;
    }
);