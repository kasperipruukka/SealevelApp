import { DataByWeekday } from "src/shared/types/sharedTypes";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";
import { getDataTemplate } from "src/shared/templates/data-template";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { addDays, getFinnishWeekday } from "src/shared/sharedFunctions";
import { LitElement, TemplateResult, customElement, html, property } from "lit-element";

@customElement('dayaftertomorrow-element')
export class DayAfterTomorrowElement extends (LitElement) {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    return html `
      <a class="day-collapse" data-bs-toggle="collapse" href="#dayaftertomorrow-collapse" role="button" aria-expanded="false" aria-controls="dayaftertomorrow-collapse">
        <h2 class="day-title">Ylihuomenna</h2>
      </a>


      <div class="collapse" id="dayaftertomorrow-collapse">
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