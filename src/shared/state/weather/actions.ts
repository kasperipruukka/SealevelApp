import { createAsyncThunk } from "@reduxjs/toolkit";
import { ForecastLocation, ObservationLocation } from "src/shared/enums/locations";
import { isObjIncomplete } from "src/shared/sharedFunctions";
import { ApiForecastData, ApiObservationData } from "src/types/api/apiData";
import wretch from 'wretch';

// Haetaan sääennustedata.
export const getWeatherForecastData = createAsyncThunk("getWeatherForecastData",
    async (place: ForecastLocation): Promise<ApiForecastData[]> => {  
        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/forecasts?place=${place}`;
        const res: { forecastValues: ApiForecastData[] } = await wretch(url).get().json();
        
        return res.forecastValues;
    }
);

// Haetaan säähavaintodata.
export const getWeatherObservationData = createAsyncThunk("getWeatherPresentData",
    async (fmisid: ObservationLocation): Promise<ApiObservationData | null> => {
        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/observations?fmisid=${fmisid}&observations=true`;
        const res: { observations: ApiObservationData[] } = await wretch(url).get().json();    
        if (!res.observations) return null;
        
        const results = res.observations;
        const latestObservation = results[results.length - 1];
        
        if (isObjIncomplete(latestObservation, 3)) {
          const secondLastIndex = results.length - 2;
          return secondLastIndex >= 0 ? results[secondLastIndex] : null;
        }
        
        return latestObservation;
    }
);