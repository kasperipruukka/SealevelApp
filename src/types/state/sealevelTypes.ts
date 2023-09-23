import { SeaLevelDataByWeekday } from "../seaLevel";
import { LoadingState } from "src/shared/enums/loadingState";

export interface SealevelState {
    data: Data;
    status: LoadingState;
}

interface Data {
    futureData: SeaLevelDataByWeekday[] | null;
    presentData: SeaLevelDataByWeekday[] | null;
}