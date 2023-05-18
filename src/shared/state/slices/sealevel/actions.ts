import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDays } from "src/shared/sharedFunctions";
import { ApiData } from "src/shared/types/apiData";
import wretch from 'wretch';

export const getApiData = createAsyncThunk("getApiData",
    async (): Promise<ApiData> => {
        // Yesterdays time.
        const startTime = Math.round((new Date().getTime() / 1000) - 3600);
        // End of the week.
        const endTime = Math.round((addDays(new Date(), 7).getTime() / 1000));
        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs?geoid=-10022816&fctstarttime=${startTime}&fctendtime=${endTime}&fcttimestep=60`;
        const res = await wretch(url).get().json() as ApiData;
        return res;
    }
);