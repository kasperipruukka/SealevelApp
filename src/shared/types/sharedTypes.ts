export interface DataByWeekday {
    weekday: string;
    time: number;
    heightN2000: number;
    heightMiddleWater: number;
    Temperature: number;
    WindSpeedMS: number;
    WindDirection: number;
    HourlyMaximumGust: number;
}

export interface ForecastData {
    today: DataByWeekday[];
    tomorrow: DataByWeekday[];
    dayAfterTomorrow: DataByWeekday[];
}

export enum CompassDirection {
    Pohjoinen = 0,
    Länsi = 262.5,
    Etelä = 175,
    Itä = 87.5,
    Koillinen = 43.75,
    Kaakko = 131.25,
    Lounas = 218.75,
    Luode = 306.25,
}