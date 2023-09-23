export interface SeaLevelData {
    weekday: string;
    time: string;
    height: string;
    heightN2000: string;
}

export interface FutureSealevelData {
    today: SeaLevelData[];
    tomorrow: SeaLevelData[];
    dayAfterTomorrow: SeaLevelData[];
}