import { PresentFuture } from "src/shared/enums/days";

// Converts API data.
export function convertToApiWeatherData(data: any, day: PresentFuture): any[] {
    try 
    {
      switch (day) {
        case PresentFuture.Present:
          const presentResult = data.filter((item: any) => { 
            return new Date(item.timestamp).getUTCHours() === new Date().getHours()
            && new Date(item.timestamp).getDay() === new Date().getDay();
          });     
          return presentResult;  

        case PresentFuture.Future:
          const futureResult = data.filter((item: any) => {
            return new Date(item.timestamp).toUTCString() > new Date().toString();
          });
          return futureResult;
    
        default:
          return [];
      }
    }
    catch (error) 
    {
      console.error('Virhe:', error);
      return [];
    }
}