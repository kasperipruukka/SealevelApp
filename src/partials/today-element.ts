import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { SeaLevelDataByWeekday } from "src/types/seaLevel";

@customElement('today-element')
export class TodayElement extends (LitElement) {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    if (!this.sealevelData) return getDataFetchErrorTemplate();

    return html `
        <a data-bs-toggle="collapse" href="#today-collapse" role="button" aria-expanded="false" aria-controls="today-collapse">
            <h2>Tänään, ${getFinnishWeekday(new Date().getDay())}</h2>
        </a>

        ${this.sealevelData.map((item) => {
            return html `
            <div class="collapse" id="today-collapse">
                <p>
                ${item.time}
                <br /> 
                ${item.heightN2000} 
                <br /> 
                ${item.height}
                </p>
            </div>
        `;
      })}
    `;
  }

  @property()
  public sealevelData: SeaLevelDataByWeekday[] | null = null; 

  public createRenderRoot() {
    return this;
  }
}