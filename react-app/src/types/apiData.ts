/** Ilmatieteen laitoksen API-vastaukset */

export interface ApiSealevelResponse {
  fctData: Record<string, ApiSealevelDataPoint[]>;
  obsData: Record<string, ApiSealevelObsPoint[]>;
}

export interface ApiSealevelObsPoint {
  epochtime: number;
  WATLEV: number;
  WLEVN2K_PT1S_INSTANT: number;
}

export interface ApiSealevelDataPoint {
  SeaLevel: number;
  SeaLevelN2000: number;
  epochtime: number;
}

export interface ApiForecastResponse {
  forecastValues: ApiForecastDataPoint[];
}

export interface ApiForecastDataPoint {
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

export interface ApiObservationResponse {
  observations: ApiObservationDataPoint[];
}

export interface ApiObservationDataPoint {
  name: string;
  localtz: string;
  localtime: string;
  t2m: number;
  DewPoint: number;
  Precipitation1h: number | null;
  TotalCloudCover: number;
  WindSpeedMS: number;
  WindDirection: number;
  WindGust: number;
  Pressure: number;
  Humidity: number;
  Visibility: number | null;
  SnowDepth: number | null;
}
