import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { getDataTemplate } from "src/shared/templates/data-template";
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
      <a 
        id="${this.collapseId}"
        href="#${this.collapseId}"
        class="day-collapse" 
        aria-expanded="false" 
        href="javascript:void(0);" 
        role="button" 
        @click=${() => this.toggleCollapse()}>
          <h2 class="day-title button">Tänään</h2>
      </a>

      <div class="collapse" id="today-collapse">
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
        heightMiddleWater: matchingSeaLevelData ? matchingSeaLevelData.middleWater : 0,
      };
    });

    return html `${getDataTemplate(combinedData)}`;
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
  public weatherData: WeatherDataByWeekDay[] | null = null;

  private get contentId(): string {
    return 'today-collapse';
  }

  private get collapseId(): string {
    return 'today-collapse-container';
  }

  public createRenderRoot() {
    return this;
  }
}