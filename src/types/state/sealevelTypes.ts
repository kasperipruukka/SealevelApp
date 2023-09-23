import { LoadingState } from "src/shared/enums/loadingState";
import { ApiSealevelData } from "../api/apiData";

export interface SealevelState {
    data: Data;
    status: LoadingState;
}

interface Data {
    futureData: ApiSealevelData[] | null;
    presentData: ApiSealevelData[] | null;
}