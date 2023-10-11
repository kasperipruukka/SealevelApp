import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { addDays, getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { getSeaLevelTemplate } from "src/shared/templates/sealevel";
import { getWeatherTemplate } from "src/shared/templates/weather";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";

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


      <div class="collapse" id="dayaftertomorrow-collapse">
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