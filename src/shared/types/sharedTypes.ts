import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";

export interface DataByWeekday {
    weekday: string;
    time: number;
    height: number;
    heightN2000: number;
    Temperature: number;
    WindSpeedMS: number;
    WindDirection: number;
    HourlyMaximumGust: number;
}

export interface FutureData {
    today: DataByWeekday[];
    tomorrow: DataByWeekday[];
    dayAfterTomorrow: DataByWeekday[];
}