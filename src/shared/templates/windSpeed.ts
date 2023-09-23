import { TemplateResult, html } from "lit-html";
import { getDataFetchErrorTemplate } from "./errors";
import { ApiWindSpeedData } from "src/types/api/apiData";

export function getWindSpeedTemplate(windSpeedData: ApiWindSpeedData): TemplateResult {
    if (!windSpeedData) return getDataFetchErrorTemplate();
    
    return html `
        <p>
            Tuulen nopeus: ${windSpeedData.windSpeed}
        </p>
    `;
}