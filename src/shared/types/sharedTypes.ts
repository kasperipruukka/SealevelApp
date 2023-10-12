export interface DataByWeekday {
    weekday: string;
    time: number;
    height: number;
    heightN2000: number;
    Temperature: number;
    WindSpeedMS: number;
    WindDirection: number;
    HourlyMaximumGust: number;
}

export interface FutureData {
    today: DataByWeekday[];
    tomorrow: DataByWeekday[];
    dayAfterTomorrow: DataByWeekday[];
}

export enum CompassDirection {
    Pohjoinen = 0,
    Lansi = 262.5,
    Etela = 175,
    Ita = 87.5,
    Koillinen = 43.75,
    Kaakko = 131.25,
    Lounas = 218.75,
    Luode = 306.25,
}