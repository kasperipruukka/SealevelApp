import { createAsyncThunk } from "@reduxjs/toolkit";
import { LocationGeoId } from "src/shared/enums/locations";
import { ApiSealevelForCity, ApiSealevelData } from "src/types/api/apiData";
import wretch from 'wretch';

// Haetaan merivedenkorkeus.
export const getSealevelData = createAsyncThunk("getSealevelData",
    async (geoId: LocationGeoId): Promise<ApiSealevelData[]> => {     
        
        const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs/short?geoid=${geoId}`;
        const { fctData: apiData } = await wretch(url).get().json() as ApiSealevelForCity;
        const sealevelData = Object.values(apiData)[0];
        
        return sealevelData;
    }
);