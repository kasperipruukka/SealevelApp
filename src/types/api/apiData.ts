export interface ApiSealevelForCity {
    fctData: SealevelFctData;
    obsData: SealevelObsData;
}

export interface ApiSealevelData {
    SeaLevel: number;
    SeaLevelN2000: number;
    epochtime: number;
}

export interface ApiForecastData {
    FeelsLike: number;
    HourlyMaximumGust: number;
    PoP: number;
    Precipitation1h: number;
    SmartSymbol: number;
    Temperature: number;
    WindDirection: number;
    WindSpeedMS: number;
    geoid: number;
    isolocaltime: string;
    localtime: string;
    localtz: string;
    modtime: string;
    name: string;
}

interface SealevelFctData {
    data: ApiSealevelData[];
}

interface SealevelObsData {
    epochtime: number;
    WATLEV: number;
    WLEVN2K_PT1S_INSTANT: number;
}