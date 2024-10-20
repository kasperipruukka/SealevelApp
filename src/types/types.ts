import { CityBaseType, DisplayAreaName, DisplayCityName } from "src/shared/enums/locations";

export interface CityData {
    name: DisplayCityName;
    area:  DisplayAreaName;
    baseType: CityBaseType;
}