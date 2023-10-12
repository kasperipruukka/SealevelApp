import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiForecastData } from "src/types/api/apiData";
import wretch from 'wretch';

export const getWeatherForecastData = createAsyncThunk("getWeatherForecastData",
    async (): Promise<ApiForecastData[]> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/forecasts?place=luvia&area=eurajoki`;
        const res: { forecastValues: ApiForecastData[] } = await wretch(url).get().json();
        return res.forecastValues;
    }
);