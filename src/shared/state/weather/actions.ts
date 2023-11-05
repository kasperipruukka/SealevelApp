import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiForecastData, ApiObservationData } from "src/types/api/apiData";
import wretch from 'wretch';

// Haetaan Kylmäpihlajan ennustedata.
export const getWeatherForecastData = createAsyncThunk("getWeatherForecastData",
    async (): Promise<ApiForecastData[]> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/forecasts?place=kylmäpihlaja&area=rauma`;
        const res: { forecastValues: ApiForecastData[] } = await wretch(url).get().json();
        return res.forecastValues;
    }
);

// Haetaan Kylmäpihlajan havaintodata.
export const getWeatherObservationData = createAsyncThunk("getWeatherPresentData",
    async (): Promise<ApiObservationData | null> => {        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/observations?fmisid=101061&observations=true`;
        const res: { observations: ApiObservationData[] } = await wretch(url).get().json();
        
        if (!res.observations) return null;
        const latestObservation = res.observations[res.observations.length - 1];
        return latestObservation;
    }
);