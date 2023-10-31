import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { getDataTemplate } from "src/shared/templates/data-template";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { DataByWeekday } from "src/shared/types/sharedTypes";
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
    if (!this.sealevelData || !this.weatherData) return getDataFetchErrorTemplate();

    const sealevelData = this.sealevelData[0];
    debugger;
    const combinedData: DataByWeekday = {
      height: sealevelData.height,
      heightN2000: sealevelData.heightN2000,
      HourlyMaximumGust: this.weatherData?.HourlyMaximumGust ?? 0,
      Temperature: this.weatherData?.Temperature ?? 0,
      time: this.weatherData?.time ?? 0,
      weekday: this.weatherData?.weekday ?? '',
      WindDirection: this.weatherData?.WindDirection ?? 0,
      WindSpeedMS: this.weatherData?.WindSpeedMS ?? 0
    };

    return html `${getDataTemplate([combinedData])}`;
  }

  @property()
  public sealevelData: SeaLevelDataByWeekday[] | null = null;

  @property()
  public weatherData: WeatherDataByWeekDay | null = null;
  
  public createRenderRoot() {
    return this;
  }
}