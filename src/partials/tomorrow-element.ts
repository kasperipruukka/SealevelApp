import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { addDays, getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { getSeaLevelTemplate } from "src/shared/templates/sealevel";
import { getWeatherTemplate } from "src/shared/templates/weather";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";

@customElement('tomorrow-element')
export class TomorrowElement extends (LitElement) {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    if (!this.sealevelData) return getDataFetchErrorTemplate();

    return html `
      <a data-bs-toggle="collapse" href="#tomorrow-collapse" role="button" aria-expanded="false" aria-controls="tomorrow-collapse">
          <h2>Huomenna, ${getFinnishWeekday(addDays(new Date(), 1).getDay())}</h2>
      </a>

      <div class="collapse" id="tomorrow-collapse">
        ${this.getDataTemplate()}
      </div>
    `;
  }

  private getDataTemplate(): TemplateResult {
    if (!this.sealevelData || !this.weatherData) return getDataFetchErrorTemplate();

    return html `
      ${this.sealevelData.map((item) => {
        return html `
          ${getSeaLevelTemplate(item)}
        `;
      })}
      ${this.weatherData.map((item) => {
        return html `
          ${getWeatherTemplate(item)}
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