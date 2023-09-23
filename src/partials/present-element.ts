import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { getSeaLevelTemplate } from "src/shared/templates/sealevel";
import { getWindSpeedTemplate } from "src/shared/templates/windSpeed";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { WindSpeedDataByWeekday } from "src/types/state/windSpeedTypes";

@customElement('present-element')
export class PresentElement extends (LitElement) {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    if (!this.sealevelData) return getDataFetchErrorTemplate();

    return html `
        <a data-bs-toggle="collapse" href="#present-collapse" role="button" aria-expanded="false" aria-controls="present-collapse">
            <h2>Nykyhetki</h2>
        </a>

        <div class="collapse" id="present-collapse">
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