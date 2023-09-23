import { LoadingState } from "src/shared/enums/loadingState";

interface Data {
    futureData: WindSpeedDataByWeekday[] | null;
    presentData: WindSpeedDataByWeekday[] | null;
}

export interface WindSpeedState {
    data: Data;
    status: LoadingState;
}

export interface WindSpeedDataByWeekday {
    weekday: string;
    time: string;
    windSpeed: string;
}

export interface FutureWindSpeedData {
    today: WindSpeedDataByWeekday[];
    tomorrow: WindSpeedDataByWeekday[];
    dayAfterTomorrow: WindSpeedDataByWeekday[];
}