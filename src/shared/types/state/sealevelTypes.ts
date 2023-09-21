import { LoadingState } from "src/shared/enums/loadingState";
import { SealevelData } from "../apiData";

export interface SealevelState {
    data: Data;
    status: LoadingState;
}

interface Data {
    futureData: SealevelData[] | null;
    presentData: SealevelData[] | null;
}