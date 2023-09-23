export interface ApiSealevelForCity {
    fctData: FctData;
    obsData: ObsData;
}

export interface ApiSealevelData {
    SeaLevel: number;
    SeaLevelN2000: number;
    epochtime: number;
}

export interface WindSpeedData {
    timestamp: string;
    windSpeed: number;
}

interface FctData {
    data: ApiSealevelData[];
}

interface ObsData {
    epochtime: number;
    WATLEV: number;
    WLEVN2K_PT1S_INSTANT: number;
}