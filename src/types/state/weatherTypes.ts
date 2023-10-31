import { LoadingState } from "src/shared/enums/loadingState";

interface Data {
    futureData: WeatherDataByWeekDay[] | null;
    observationData: WeatherDataByWeekDay | null;
}

export interface WeatherState {
    data: Data;
    status: LoadingState;
};

export interface WeatherDataByWeekDay {
    weekday: string;
    time: number;
    Temperature: number;
    WindSpeedMS: number;
    WindDirection: number;
    HourlyMaximumGust: number;
}