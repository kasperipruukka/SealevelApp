import { PresentFuture } from "src/shared/enums/days";
import { ApiDataSealevel, SealevelData } from "src/shared/types/apiData";

// Converts API data.
export function convertSealevelApiData(apiData: ApiDataSealevel, day: PresentFuture) {
    const { fctData: data} = apiData;
    if (!apiData) return [];

    switch (day) {
        
        // Converts present time data.
        case PresentFuture.Present:
            const { "1": presentData } = Object.entries(data).flat() as [string, SealevelData[]];
            if (!presentData) return [];

            const presentResult = presentData.filter((item: any) => { 
                return new Date(item.epochtime * 1000).getHours() === new Date().getHours()
                && new Date(item.epochtime * 1000).getDay() === new Date().getDay()
            });     
            return presentResult;  
            
        // Converts future time data.
        case PresentFuture.Future:
            const { "1": futureData } = Object.entries(data).flat() as [string, SealevelData[]];
            if (!futureData) return [];

            const futureResult = futureData.filter((item: any) => { 
                return new Date(item.epochtime * 1000) > new Date()
            });
            return futureResult;

        default:
            return [];
    }
}