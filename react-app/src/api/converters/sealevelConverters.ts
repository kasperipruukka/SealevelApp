import type { ApiSealevelDataPoint, ApiSealevelObsPoint } from '@/types/apiData';
import type { SeaLevelEntry } from '@/types/types';
import { FORECAST_HOURS } from '@/utils/constants';
import { addHours, getFinnishWeekday } from '@/utils/formatting';

/** Muunna havaintodata → nykyhetken entry (viimeisin havaintoarvo) */
export const convertPresentSealevel = (
  obsData: ApiSealevelObsPoint[],
  fctData: ApiSealevelDataPoint[],
): SeaLevelEntry[] => {
  // Kokeile ensin havaintodatasta nykyinen tunti
  const now = new Date();

  // Hae viimeisin havaintoarvo (obsData on 10min välein)
  if (obsData?.length) {
    const currentHourObs = obsData.filter((item) => {
      const d = new Date(item.epochtime * 1000);
      return d.getHours() === now.getHours() && d.getDate() === now.getDate();
    });

    if (currentHourObs.length > 0) {
      const latest = currentHourObs[currentHourObs.length - 1];
      const d = new Date(latest.epochtime * 1000);
      return [{
        weekday: getFinnishWeekday(d.getDay()),
        time: d.getHours(),
        middleWater: Math.round(latest.WATLEV / 10), // mm → cm
        heightN2000: Math.round(latest.WLEVN2K_PT1S_INSTANT / 10), // mm → cm
      }];
    }
  }

  // Fallback: ennustedatasta nykyinen tunti
  if (fctData?.length) {
    const match = fctData.filter((item) => {
      const d = new Date(item.epochtime * 1000);
      return d.getHours() === now.getHours() && d.getDate() === now.getDate();
    });

    if (match.length > 0) {
      const item = match[0];
      const d = new Date(item.epochtime * 1000);
      return [{
        weekday: getFinnishWeekday(d.getDay()),
        time: d.getHours(),
        middleWater: Math.round(item.SeaLevel),
        heightN2000: Math.round(item.SeaLevelN2000),
      }];
    }
  }

  return [];
};

/** Muunna ennustedata → tulevaisuuden entryt (max 60h) */
export const convertFutureSealevel = (fctData: ApiSealevelDataPoint[]): SeaLevelEntry[] => {
  if (!fctData?.length) return [];

  const now = new Date();
  const limit = addHours(now, FORECAST_HOURS);

  return fctData
    .filter((item) => {
      const d = new Date(item.epochtime * 1000);
      return d > now && d < limit;
    })
    .map((item) => {
      const d = new Date(item.epochtime * 1000);
      return {
        weekday: getFinnishWeekday(d.getDay()),
        time: d.getHours(),
        middleWater: Math.round(item.SeaLevel),
        heightN2000: Math.round(item.SeaLevelN2000),
      };
    });
};
