import { TemplateResult, html } from "lit-html";
import { addDays, getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { SeaLevelDataByWeekday } from "src/types/seaLevel";

export function getTomorrowTemplate(data: SeaLevelDataByWeekday[]): TemplateResult {
    if (!data) return getDataFetchErrorTemplate();

    return html `
        <a data-bs-toggle="collapse" href="#tomorrow-collapse" role="button" aria-expanded="false" aria-controls="tomorrow-collapse">
            <h2>Huomenna, ${getFinnishWeekday(addDays(new Date(), 1).getDay())}</h2>
        </a>

        ${data.map((item) => {
            return html `
            <div class="collapse" id="tomorrow-collapse">
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