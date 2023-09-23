import { PresentFuture } from "src/shared/enums/days";
import { getFinnishWeekday } from "src/shared/sharedFunctions";
import { ApiSealevelData } from "src/types/api/apiData";
import { SeaLevelDataByWeekday } from "src/types/seaLevel";

// Converts API data.
export function convertToApiSealevelData(apiData: ApiSealevelData[], day: PresentFuture): ApiSealevelData[] {
    if (!apiData) return [];

    switch (day) {    
        // Converts present time data.
        case PresentFuture.Present:
            const presentResult = apiData.filter((item: any) => { 
                return new Date(item.epochtime * 1000).getHours() === new Date().getHours()
                && new Date(item.epochtime * 1000).getDay() === new Date().getDay()
            });     
            return presentResult;  
            
        // Converts future time data.
        case PresentFuture.Future:
            const futureResult = apiData.filter((item: any) => { 
                return new Date(item.epochtime * 1000) > new Date()
            });
            return futureResult;

        default:
            return [];
    }
}

export function convertToSealevelData(apiData: ApiSealevelData[] | null): SeaLevelDataByWeekday[] | null {
    if (!apiData) return null;

    const sealevelData: SeaLevelDataByWeekday[] = apiData.map((item: ApiSealevelData) => {
      const time = new Date(item.epochtime * 1000);
      return {
          weekday: `${getFinnishWeekday(time.getDay())}`,
          time: `Klo: ${time.getHours()}`,
          heightN2000: `N2000: ${item.SeaLevelN2000} cm`,
          height: `Keskivesi: ${item.SeaLevel} cm`
        }
    });

    return sealevelData;
  }