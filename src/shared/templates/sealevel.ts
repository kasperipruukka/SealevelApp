import { TemplateResult, html } from "lit-html";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";

export function getSeaLevelTemplate(sealevelData: SeaLevelDataByWeekday): TemplateResult {
    if (!sealevelData) return html ``;
    
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