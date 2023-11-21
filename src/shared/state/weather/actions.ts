import { createAsyncThunk } from "@reduxjs/toolkit";
import { City } from "src/shared/enums/citys";
import { isObjIncomplete } from "src/shared/sharedFunctions";
import { ApiForecastData, ApiObservationData } from "src/types/api/apiData";
import wretch from 'wretch';

// Haetaan ennustedata.
export const getWeatherForecastData = createAsyncThunk("getWeatherForecastData",
    async (city: City): Promise<ApiForecastData[]> => {  
        const location = city === City.Rauma ?  'kylmäpihlaja&area=rauma' : 'tahkoluoto&area=pori';
        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/forecasts?place=${location}`;
        const res: { forecastValues: ApiForecastData[] } = await wretch(url).get().json();
        return res.forecastValues;
    }
);

// Haetaan havaintodata.
export const getWeatherObservationData = createAsyncThunk("getWeatherPresentData",
    async (city: City): Promise<ApiObservationData | null> => {
        const location = city === City.Rauma ? '101061' : '101267';
        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/observations?fmisid=${location}&observations=true`;
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