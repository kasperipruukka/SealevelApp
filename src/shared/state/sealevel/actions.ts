import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiSealevelForCity, ApiSealevelData } from "src/types/api/apiData";
import wretch from 'wretch';

export const getSealevelData = createAsyncThunk("getSealevelData",
    async (): Promise<ApiSealevelData[]> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs/short?geoid=-10022816`;
        const { fctData: apiData } = await wretch(url).get().json() as ApiSealevelForCity;
        const sealevelData = Object.values(apiData)[0];
        return sealevelData;
    }
);