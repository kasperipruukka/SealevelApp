import { TemplateResult, html } from "lit-html";
import { getDataFetchErrorTemplate } from "./errors";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";

export function getSeaLevelTemplate(sealevelData: SeaLevelDataByWeekday): TemplateResult {
    if (!sealevelData) return getDataFetchErrorTemplate();
    
    return html `
        <p>
            ${sealevelData.time}
            <br /> 
            ${sealevelData.heightN2000} 
            <br /> 
            ${sealevelData.height}
        </p>
    `;
}