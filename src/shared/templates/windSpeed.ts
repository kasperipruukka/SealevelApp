import { TemplateResult, html } from "lit-html";
import { getDataFetchErrorTemplate } from "./errors";
import { WindSpeedDataByWeekday } from "src/types/state/windSpeedTypes";

export function getWindSpeedTemplate(windSpeedData: WindSpeedDataByWeekday): TemplateResult {
    if (!windSpeedData) return getDataFetchErrorTemplate();
    
    return html `
        <p>
            Tuulen nopeus: ${windSpeedData.windSpeed}
        </p>
    `;
}