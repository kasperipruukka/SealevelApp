import { LitElement, TemplateResult, customElement, html, property } from "lit-element";
import { getFinnishWeekday } from "src/shared/sharedFunctions";
import { getDataFetchErrorTemplate } from "src/shared/templates/errors";
import { getSeaLevelTemplate } from "src/shared/templates/sealevel";
import { SeaLevelDataByWeekday } from "src/types/state/sealevelTypes";


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
        ${this.getSealevelTemplate()}
      </div>
    `;
  }

  private getSealevelTemplate(): TemplateResult {
    if (!this.sealevelData) return getDataFetchErrorTemplate();

    return html `
      ${this.sealevelData.map((item) => {
        return html `
          ${getSeaLevelTemplate(item)}
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