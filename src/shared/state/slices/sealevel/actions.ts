import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCityData, ApiDataSealevel } from "src/shared/types/apiData";
import wretch from 'wretch';

export const getSealevelData = createAsyncThunk("getSealevelData",
    async (): Promise<ApiCityData> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs/short?geoid=-10022816`;
        const { fctData } = await wretch(url).get().json() as ApiDataSealevel;
        return fctData;
    }
);