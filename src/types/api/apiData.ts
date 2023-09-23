export interface ApiSealevelForCity {
    fctData: SealevelFctData;
    obsData: SealevelObsData;
}

export interface ApiSealevelData {
    SeaLevel: number;
    SeaLevelN2000: number;
    epochtime: number;
}

export interface ApiWindSpeedData {
    timestamp: string;
    windSpeed: number;
}

interface SealevelFctData {
    data: ApiSealevelData[];
}

interface SealevelObsData {
    epochtime: number;
    WATLEV: number;
    WLEVN2K_PT1S_INSTANT: number;
}