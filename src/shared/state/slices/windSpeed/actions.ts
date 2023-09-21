import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDays, addHours, finlandUTCHour } from "src/shared/sharedFunctions";
import wretch from 'wretch';

export const getWindSpeedData = createAsyncThunk("getWindSpeedData",
    async (): Promise<string> => {
        // Today's time.
        const startTime = addHours(new Date(), finlandUTCHour()).toISOString();
        // The day after tomorrow.
        const endTime = addDays(new Date(), 2).toISOString();
        // City location. (Rauma)
        const location = '61.129167,21.505556';
        
        const baseUrl = 'https://opendata.fmi.fi/wfs';
        const query = {
        request: 'getFeature',
        starttime: startTime,
        endtime: endTime,
        latlon: location,
        storedquery_id: 'fmi::forecast::harmonie::surface::point::timevaluepair',
        parameters: 'WindSpeedMS',
        };

        const queryString = new URLSearchParams(query).toString();
        const url = `${baseUrl}?${queryString}`;
        
        const res = await wretch(url).get().text();
        return res;
    }
);