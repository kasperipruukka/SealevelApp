import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { getSeaLevelTemplate } from "src/shared/templates/sealevel";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";

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
            ${this.getDataTemplate()}
        </div>
    `;
  }

  private getDataTemplate(): TemplateResult {
    if (!this.sealevelData) return getDataFetchErrorTemplate();

    return html `
      ${this.sealevelData.map((item) => {
        return html `
          ${getSeaLevelTemplate(item)}
        `;
      })}
    `;
  }

  @property()
  public sealevelData: SeaLevelDataByWeekday[] | null = null;

  @property()
  public weatherData: WeatherDataByWeekDay[] | null = null;
  
  public createRenderRoot() {
    return this;
  }
}