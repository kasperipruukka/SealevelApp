import { TemplateResult, html } from "lit-html";
import { getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { SeaLevelDataByWeekday } from "src/types/seaLevel";

export function getTodayTemplate(data: SeaLevelDataByWeekday[]): TemplateResult {
    if (!data) return getDataFetchErrorTemplate();

    return html `
        <a data-bs-toggle="collapse" href="#today-collapse" role="button" aria-expanded="false" aria-controls="today-collapse">
            <h2>Tänään, ${getFinnishWeekday(new Date().getDay())}</h2>
        </a>

        ${data.map((item) => {
            return html `
            <div class="collapse" id="today-collapse">
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