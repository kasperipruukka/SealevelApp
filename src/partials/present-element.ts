import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { getDataTemplate } from "src/shared/templates/data-template";
import { DataByWeekday } from "src/shared/types/sharedTypes";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";

@customElement('present-element')
export class PresentElement extends (LitElement) {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    return html `
        <a class="day-collapse" data-bs-toggle="collapse" href="#present-collapse" role="button" aria-expanded="false" aria-controls="present-collapse">
            <h2 class="day-title">Nykyhetki</h2>
        </a>

        <div class="collapse" id="present-collapse">
            ${this.getData()}
        </div>
    `;
  }

  private getData(): TemplateResult {
    if (!this.sealevelData || !this.weatherData) return html ``;

    const sealevelData = this.sealevelData[0];
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