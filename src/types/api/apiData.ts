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

export interface ApiObservationData {
    name: string,
    localtz: string,
    localtime: string,
    t2m: number,
    DewPoint: number,
    Precipitation1h: null,
    TotalCloudCover: number,
    WindSpeedMS: number,
    WindDirection: number,
    WindGust: number,
    Pressure: number,
    Humidity: number,
    Visibility: number | null,
    SnowDepth: number | null;
}

interface SealevelFctData {
    data: ApiSealevelData[];
}

interface SealevelObsData {
    epochtime: number;
    WATLEV: number;
    WLEVN2K_PT1S_INSTANT: number;
}