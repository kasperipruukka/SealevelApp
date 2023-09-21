export interface ApiDataSealevel {
    fctData: ApiCity;
    obsData: object;
}

export interface ApiCity {
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