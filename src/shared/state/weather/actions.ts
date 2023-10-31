import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiForecastData, ApiObservationData } from "src/types/api/apiData";
import wretch from 'wretch';

export const getWeatherForecastData = createAsyncThunk("getWeatherForecastData",
    async (): Promise<ApiForecastData[]> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/forecasts?place=luvia&area=eurajoki`;
        const res: { forecastValues: ApiForecastData[] } = await wretch(url).get().json();
        return res.forecastValues;
    }
);

export const getWeatherObservationData = createAsyncThunk("getWeatherPresentData",
    async (): Promise<ApiObservationData | null> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/observations?fmisid=101044&observations=true`;
        const res: { observations: ApiObservationData[] } = await wretch(url).get().json();
        
        if (!res.observations) return null;
        const latestObservation = res.observations[res.observations.length - 1];
        return latestObservation;
    }
);