import { DataByWeekday } from "src/shared/types/sharedTypes";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";
import { getDataTemplate } from "src/shared/templates/data-template";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { LitElement, TemplateResult, customElement, html, property } from "lit-element";

@customElement('tomorrow-element')
export class TomorrowElement extends (LitElement) {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    return html `
      <a class="day-collapse" data-bs-toggle="collapse" href="#tomorrow-collapse" role="button" aria-expanded="false" aria-controls="tomorrow-collapse">
          <h2 class="day-title">Huomenna</h2>
      </a>

      <div class="collapse" id="tomorrow-collapse">
        ${this.getData()}
      </div>
    `;
  }

  private getData(): TemplateResult {
    if (!this.sealevelData || !this.weatherData) return html ``;
    
    const combinedData: DataByWeekday[] = this.weatherData.map((item) => {
      const matchingSeaLevelData = this.sealevelData!.find((seaLevelItem) => seaLevelItem.time === item.time);
      return {
        ...item,
        heightN2000: matchingSeaLevelData ? matchingSeaLevelData.heightN2000 : 0,
      };
    });

    return html `${getDataTemplate(combinedData)}`;
  }

  @property()
  public sealevelData: SeaLevelDataByWeekday[] | null = null;

  @property()
  public weatherData: WeatherDataByWeekDay[] | null = null;

  public createRenderRoot() {
    return this;
  }
}