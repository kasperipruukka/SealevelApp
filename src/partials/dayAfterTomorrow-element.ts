import { DataByWeekday } from "src/shared/types/sharedTypes";
import { WeatherDataByWeekDay } from "src/types/state/weatherTypes";
import { getDataTemplate } from "src/shared/templates/data-template";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";
import { LitElement, TemplateResult, customElement, html, property } from "lit-element";

@customElement('dayaftertomorrow-element')
export class DayAfterTomorrowElement extends (LitElement) {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    return html `
      <a 
        id="${this.collapseId}"
        class="day-collapse" 
        aria-expanded="false" 
        href="javascript:void(0);" 
        role="button"
        @click=${() => this.toggleCollapse()}>
          <h2 class="day-title button">Ylihuomenna</h2>
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
    return 'dayaftertomorrow-collapse';
  }

  private get collapseId(): string {
    return 'dayaftertomorrow-collapse-container';
  }

  public createRenderRoot() {
    return this;
  }
}