import type { ApiSealevelResponse } from '@/types/apiData';
import type { SeaLevelEntry } from '@/types/types';
import { API_URLS } from '@/utils/constants';
import { convertPresentSealevel, convertFutureSealevel } from './converters/sealevelConverters';

export interface SealevelResult {
  present: SeaLevelEntry[];
  future: SeaLevelEntry[];
}

/** Hae merenpintadata kaupungille */
export const fetchSealevelData = async (geoId: string): Promise<SealevelResult> => {
  const url = API_URLS.sealevel(geoId);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Merenpintadatan haku epäonnistui: ${response.status}`);
  }

  const json: ApiSealevelResponse = await response.json();

  // API palauttaa datan kaupungin nimellä avaimena, esim. "Helsinki Kaivopuisto"
  const fctEntries = Object.values(json.fctData ?? {})[0] ?? [];
  const obsEntries = Object.values(json.obsData ?? {})[0] ?? [];

  return {
    present: convertPresentSealevel(obsEntries, fctEntries),
    future: convertFutureSealevel(fctEntries),
  };
};
