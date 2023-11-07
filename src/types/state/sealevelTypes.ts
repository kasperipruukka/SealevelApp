import { LoadingState } from "src/shared/enums/loadingState";

interface Data {
    futureData: SeaLevelDataByWeekday[] | null;
    presentData: SeaLevelDataByWeekday[] | null;
}

export interface SealevelState {
    data: Data;
    status: LoadingState;
}

export interface SeaLevelDataByWeekday {
    weekday: string;
    time: number;
    heightN2000: number;
}