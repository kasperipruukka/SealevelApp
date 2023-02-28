export interface ApiData {
    fctData: ApiCity;
    obsData: object;
}

export interface ApiCity {
    data: {[key: string]: ApiSealevelData[]};
}

export interface ApiSealevelData {
    SeaLevel: number;
    SeaLevelN2000: number;
    epochtime: number;
}