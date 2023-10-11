import { TemplateResult, html } from "lit-html";
import { getDataFetchErrorTemplate } from "./errors";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";

export function getWeatherTemplate(weatherData: WeatherDataByWeekDay): TemplateResult {
    if (!weatherData) return getDataFetchErrorTemplate();
    
    return html `
        <p>
            ${weatherData.Temperature}
            <br /> 
            ${weatherData.WindSpeedMS} 
            <br /> 
            ${weatherData.WindDirection}
            <br /> 
            ${weatherData.HourlyMaximumGust}
        </p>
    `;
}