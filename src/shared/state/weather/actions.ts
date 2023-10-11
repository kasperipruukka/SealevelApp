import { createAsyncThunk } from "@reduxjs/toolkit";
import wretch from 'wretch';

export const getWeatherData = createAsyncThunk("getWeatherData",
    async (): Promise<any[]> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/forecasts?place=rauma`;
        const res = await wretch(url).get().json() as any;
        return res;
    }
);