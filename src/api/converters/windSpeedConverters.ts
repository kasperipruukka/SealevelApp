import { PresentFuture } from "src/shared/enums/days";
import { getFinnishWeekday } from "src/shared/sharedFunctions";
import { ApiWindSpeedData } from "src/types/api/apiData";
import { WindSpeedDataByWeekday } from "src/types/state/windSpeedTypes";

// Converts API data.
export function convertToApiWindSpeedData(xmlData: string, day: PresentFuture): ApiWindSpeedData[] {
    try 
    {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
      const elements = xmlDoc.getElementsByTagName('wml2:point');

      const windSpeedData = Array.from(elements).map(point => {
        const timestamp = point.getElementsByTagName('wml2:time')[0]?.textContent ?? '';
        const windSpeedDecimal = point.getElementsByTagName('wml2:value')[0]?.textContent ?? '';
        if (timestamp === '' || windSpeedDecimal === '') return;
        
        const windSpeed = parseInt(windSpeedDecimal) ?? '';

        return {
            timestamp,
            windSpeed
        };
      }) as ApiWindSpeedData[];
    
      if (!windSpeedData) [];

      switch (day) {
        case PresentFuture.Present:
          const presentResult = windSpeedData.filter((item) => { 
            return new Date(item.timestamp).getUTCHours() === new Date().getHours()
            && new Date(item.timestamp).getDay() === new Date().getDay();
          });     
          return presentResult;  

        case PresentFuture.Future:
          debugger;
          const futureResult = windSpeedData.filter((item) => {
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


export function convertToWindSpeedData(apiData: ApiWindSpeedData[] | null): WindSpeedDataByWeekday[] | null {
  if (!apiData) return null;

  const windSpeedData: WindSpeedDataByWeekday[] = apiData.map((item: ApiWindSpeedData) => {
    const time = new Date(item.timestamp);
    return {
      weekday: `${getFinnishWeekday(time.getDay())}`,
      time: `Klo: ${time.getHours()}`,
      windSpeed: `Tuulen nopeus: ${item.windSpeed}`
      }
  });

  return windSpeedData;
}