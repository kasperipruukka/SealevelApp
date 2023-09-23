import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { getSeaLevelTemplate } from "src/shared/templates/sealevel";
import { getWindSpeedTemplate } from "src/shared/templates/windSpeed";
import { ApiWindSpeedData } from "src/types/api/apiData";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { WindSpeedDataByWeekday } from "src/types/state/windSpeedTypes";

@customElement('today-element')
export class TodayElement extends (LitElement) {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    return html `
      <a data-bs-toggle="collapse" href="#today-collapse" role="button" aria-expanded="false" aria-controls="today-collapse">
        <h2>Tänään, ${getFinnishWeekday(new Date().getDay())}</h2>
      </a>

      <div class="collapse" id="today-collapse">
        ${this.getSealevelTemplate()}
        ${this.getWindSpeedTemplate()}
      </div>
    `;
  }

  private getSealevelTemplate(): TemplateResult {
    if (!this.sealevelData) return getDataFetchErrorTemplate();

    return html `
      ${this.sealevelData.map((item) => {
        return html `
          ${getSeaLevelTemplate(item)}
        `;
      })}
    `;
  }

  private getWindSpeedTemplate(): TemplateResult {
    if (!this.windSpeedData) return getDataFetchErrorTemplate();

    return html `
      ${this.windSpeedData.map((item) => {
        return html `
          ${getWindSpeedTemplate(item)}
        `;
      })}
    `;
  }

  @property()
  public sealevelData: SeaLevelDataByWeekday[] | null = null;
  
  @property()
  public windSpeedData: WindSpeedDataByWeekday[] | null = null;

  public createRenderRoot() {
    return this;
  }
}