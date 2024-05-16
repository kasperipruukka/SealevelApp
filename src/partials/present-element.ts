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
        <a 
          id="${this.collapseId}"
          href="#${this.collapseId}"
          class="day-collapse" 
          aria-expanded="false"
          href="javascript:void(0);"
          role="button"
          @click=${() => this.toggleCollapse()}>
            <h2 class="day-title button">Nyt</h2>
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
      heightN2000: sealevelData.heightN2000,
      heightMiddleWater : sealevelData.middleWater,
      HourlyMaximumGust: this.weatherData?.HourlyMaximumGust ?? 0,
      Temperature: this.weatherData?.Temperature ?? 0,
      time: this.weatherData?.time ?? 0,
      weekday: this.weatherData?.weekday ?? '',
      WindDirection: this.weatherData?.WindDirection ?? 0,
      WindSpeedMS: this.weatherData?.WindSpeedMS ?? 0
    };

    return html `${getDataTemplate([combinedData])}`;
  }

  private toggleCollapse(): void {
    const event = new CustomEvent('collapse-toggled', {
      bubbles: true,
      composed: true,
      detail: {contentId: this.contentId, collapseId: this.collapseId }
    });
    this.dispatchEvent(event);
  }

  @property()
  public sealevelData: SeaLevelDataByWeekday[] | null = null;

  @property()
  public weatherData: WeatherDataByWeekDay | null = null;

  private get contentId(): string {
    return 'present-collapse';
  }

  private get collapseId(): string {
    return 'present-collapse-container';
  }
  
  public createRenderRoot() {
    return this;
  }
}