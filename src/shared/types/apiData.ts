export interface ApiDataSealevel {
    fctData: ApiCityData;
}

export interface ApiCityData {
    data: {[key: string]: SealevelData[]};
}

export interface SealevelData {
    SeaLevel: number;
    SeaLevelN2000: number;
    epochtime: number;
}

export interface WindSpeedData {
    timestamp: string;
    windSpeed: number;
}