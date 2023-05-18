import { LoadingState } from "src/shared/enums/loadingState";
import { ApiSealevelData } from "../apiData";

export interface TestiState {
    data: Data;
    status: LoadingState;
}

interface Data {
    futureData: ApiSealevelData[] | null;
    presentData: ApiSealevelData[] | null;
}