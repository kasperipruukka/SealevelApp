import { createAsyncThunk } from "@reduxjs/toolkit";
import { City } from "src/shared/enums/citys";
import { ApiSealevelForCity, ApiSealevelData } from "src/types/api/apiData";
import wretch from 'wretch';

export const getSealevelData = createAsyncThunk("getSealevelData",
    async (city: City): Promise<ApiSealevelData[]> => {     
        const location = city === City.Rauma ?  '-10022816' : '-10022824';

        const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs/short?geoid=${location}`;
        const { fctData: apiData } = await wretch(url).get().json() as ApiSealevelForCity;
        const sealevelData = Object.values(apiData)[0];
        return sealevelData;
    }
);