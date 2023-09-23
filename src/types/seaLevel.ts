export interface SeaLevelDataByWeekday {
    weekday: string;
    time: string;
    height: string;
    heightN2000: string;
}

export interface FutureSealevelData {
    today: SeaLevelDataByWeekday[];
    tomorrow: SeaLevelDataByWeekday[];
    dayAfterTomorrow: SeaLevelDataByWeekday[];
}