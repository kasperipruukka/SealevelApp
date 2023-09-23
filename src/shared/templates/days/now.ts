import { TemplateResult, html } from "lit-html";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { SeaLevelDataByWeekday } from "src/types/seaLevel";

export function getPresentTemplate(data: SeaLevelDataByWeekday[]): TemplateResult {
    if (!data) return getDataFetchErrorTemplate();

    return html `
        <a data-bs-toggle="collapse" href="#present-collapse" role="button" aria-expanded="false" aria-controls="present-collapse">
            <h2>Nykyhetki</h2>
        </a>

        ${data.map((item) => {
            return html `
            <div class="collapse" id="present-collapse">
                <p>
                ${item.time}
                <br /> 
                ${item.heightN2000} 
                <br /> 
                ${item.height}
                </p>
            </div>
        `;
      })}
    `;
}