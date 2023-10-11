import { LoadingState } from "src/shared/enums/loadingState";

interface Data {
    futureData: any[] | null;
    presentData: any[] | null;
}

export interface WeatherState {
    data: Data;
    status: LoadingState;
};