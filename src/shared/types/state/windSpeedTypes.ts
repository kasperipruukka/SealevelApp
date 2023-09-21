import { LoadingState } from "src/shared/enums/loadingState";
import { WindSpeedData } from "../apiData";

export interface WindSpeedState {
    data: WindSpeedData[] | null;
    status: LoadingState;
}