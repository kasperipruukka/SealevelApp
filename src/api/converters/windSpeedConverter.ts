import { WindSpeedData } from "src/shared/types/apiData";

// Converts API data.
export function convertWindSpeedData(xmlData: string): WindSpeedData[] {
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
      }) as WindSpeedData[];

      if (!windSpeedData) [];
      return windSpeedData;
    }
    catch (error) 
    {
      console.error('Virhe:', error);
      return [];
    }
  }