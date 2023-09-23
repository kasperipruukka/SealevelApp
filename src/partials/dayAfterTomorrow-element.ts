import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { addDays, getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { getSeaLevelTemplate } from "src/shared/templates/sealevel";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";

@customElement('dayaftertomorrow-element')
export class DayAfterTomorrowElement extends (LitElement) {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    if (!this.sealevelData) return getDataFetchErrorTemplate();

    return html `
        <a data-bs-toggle="collapse" href="#dayaftertomorrow-collapse" role="button" aria-expanded="false" aria-controls="dayaftertomorrow-collapse">
          <h2>Ylihuomenna, ${getFinnishWeekday(addDays(new Date(), 2).getDay())}</h2>
        </a>

        ${this.sealevelData.map((item) => {
            return html `
            <div class="collapse" id="dayaftertomorrow-collapse">
              ${getSeaLevelTemplate(item)}
            </div>
        `;
      })}
    `;
  }

  @property()
  public sealevelData: SeaLevelDataByWeekday[] | null = null; 

  public createRenderRoot() {
    return this;
  }
}