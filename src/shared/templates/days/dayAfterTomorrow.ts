import { TemplateResult, html } from "lit-html";
import { addDays, getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { SeaLevelDataByWeekday } from "src/types/seaLevel";

export function getDayAfterTomorrowTemplate(data: SeaLevelDataByWeekday[]): TemplateResult {
    if (!data) return getDataFetchErrorTemplate();

    return html `
        <a data-bs-toggle="collapse" href="#dayaftertomorrow-collapse" role="button" aria-expanded="false" aria-controls="dayaftertomorrow-collapse">
          <h2>Ylihuomenna, ${getFinnishWeekday(addDays(new Date(), 2).getDay())}</h2>
        </a>

        ${data.map((item) => {
            return html `
            <div class="collapse" id="dayaftertomorrow-collapse">
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