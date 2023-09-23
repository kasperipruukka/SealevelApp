import { City } from 'src/shared/enums/citys';
import { html, TemplateResult } from 'lit-html';
import { connectStore } from 'src/tools/connectStore';
import { RootState, store } from 'src/shared/state/store';
import { LoadingState } from 'src/shared/enums/loadingState';
import { getDataFetchErrorTemplate } from 'src/shared/templates/errors';
import { getLoadingTemplate, groupBy } from 'src/shared/sharedFunctions';
import { customElement, LitElement, property, state } from 'lit-element';
import { getSealevelData } from 'src/shared/state/slices/sealevel/actions';
import { getWindSpeedData } from 'src/shared/state/slices/windSpeed/actions';
import { FutureSealevelData, SeaLevelDataByWeekday } from 'src/types/seaLevel';
import "../partials/present-element.js";
import "../partials/today-element.js";
import "../partials/tomorrow-element.js";
import "../partials/dayAfterTomorrow-element.js";

@customElement('saa-element')
export class Weather extends connectStore(store)(LitElement) {
  constructor() {
    super();
  }

  protected firstUpdated(): void {
    this.init();
  }

  protected render(): TemplateResult {
    if (this.status === LoadingState.Busy) return html `${getLoadingTemplate()}`;
    return this.getTemplate();
  }

  stateChanged(state: RootState): void {
    this.sealevelFutureData = state.sealevel.data.futureData;
    this.sealevelPresentData = state.sealevel.data.presentData;
    this.status = state.sealevel.status;
  }

  private init(): void {
    this.loadData();
  }

  private loadData(): void {
    store.dispatch(getSealevelData());
    store.dispatch(getWindSpeedData())
  }

  private getTemplate(): TemplateResult {
    if (!this.sealevelPresentData || !this.sealevelFutureData ) return getDataFetchErrorTemplate();

    // Esim. maanantai, tiistai ja keskiviikko.
    const groupedFutureData = groupBy(this.sealevelFutureData, 'weekday') as FutureSealevelData;
    if (!groupedFutureData) return getDataFetchErrorTemplate();

    const [todaySealevelData, tomorrowSealevelData, dayAfterTomorrowSealevelData] = Object.values(groupedFutureData);

    return html `
    <div class="container-sm">
      <div>
        <h1>${this.currentCity}</h1>
      </div>
      <br />
      <div class="day">
        <present-element .sealevelData="${this.sealevelPresentData}"></present-element>
      </div>
      <div class="day">
        <today-element .sealevelData="${todaySealevelData}"></today-element>
      </div>
      <div class="day">
        <tomorrow-element .sealevelData="${tomorrowSealevelData}"></tomorrow-element>
      </div>
      <div class="day">
        <dayaftertomorrow-element .sealevelData="${dayAfterTomorrowSealevelData}"></dayaftertomorrow-element>
      </div>
    </div>
  `;
  }

  @state()
  private sealevelFutureData: SeaLevelDataByWeekday[] | null = null; 

  @state()
  private sealevelPresentData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private status: LoadingState = LoadingState.Busy;

  @property()
  public currentCity: City = City.Rauma;

  public createRenderRoot() {
    return this;
  }
}