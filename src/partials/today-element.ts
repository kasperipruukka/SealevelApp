import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataTemplate } from "src/shared/templates/data-template";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { DataByWeekday } from "src/shared/types/sharedTypes";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";


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
        ${this.getDataTemplate()}
      </div>
    `;
  }

  private getDataTemplate(): TemplateResult {
    if (!this.sealevelData || !this.weatherData) return getDataFetchErrorTemplate();
    
    const combinedData: DataByWeekday[] = this.weatherData.map((item) => {
      const matchingSeaLevelData = this.sealevelData!.find((seaLevelItem) => seaLevelItem.time === item.time);
      return {
        ...item,
        height: matchingSeaLevelData ? matchingSeaLevelData.height : 0,
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