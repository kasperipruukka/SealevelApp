import { City } from 'src/shared/enums/citys';
import { html, TemplateResult } from 'lit-html';
import { connectStore } from 'src/tools/connectStore';
import { RootState, store } from 'src/shared/state/store';
import { LoadingState } from 'src/shared/enums/loadingState';
import { getDataFetchErrorTemplate } from 'src/shared/templates/errors';
import { getLoadingTemplate, groupBy } from 'src/shared/sharedFunctions';
import { customElement, LitElement, property, state } from 'lit-element';
import { FutureWindSpeedData, WindSpeedDataByWeekday } from 'src/types/state/windSpeedTypes.js';
import { getSealevelData } from 'src/shared/state/sealevel/actions.js';
import { getWindSpeedData } from 'src/shared/state/windSpeed/actions.js';
import "../partials/present-element.js";
import "../partials/today-element.js";
import "../partials/tomorrow-element.js";
import "../partials/dayAfterTomorrow-element.js";
import { FutureSealevelData, SeaLevelDataByWeekday } from 'src/types/state/sealevelTypes.js';

@customElement('saa-element')
export class Weather extends connectStore(store)(LitElement) {
  constructor() {
    super();
  }

  protected firstUpdated(): void {
    this.init();
  }

  protected render(): TemplateResult {
    if (this.sealevelLoadingState === LoadingState.Error
        || this.windSpeedLoadingState === LoadingState.Error)
          return getDataFetchErrorTemplate();

    if (this.sealevelLoadingState === LoadingState.Busy 
      || this.windSpeedLoadingState === LoadingState.Busy) 
        return html `${getLoadingTemplate()}`;

    return this.getTemplate();
  }

  stateChanged(state: RootState): void {
    this.sealevelLoadingState = state.sealevel.status;
    this.sealevelFutureData = state.sealevel.data.futureData;
    this.sealevelPresentData = state.sealevel.data.presentData;

    this.windSpeedLoadingState = state.windspeed.status
    this.windSpeedFutureData = state.windspeed.data.futureData;
    this.windSpeedPresentData = state.windspeed.data.presentData;
  }

  private init(): void {
    this.loadData();
  }

  private loadData(): void {
    store.dispatch(getSealevelData());
    store.dispatch(getWindSpeedData());
  }

  private getTemplate(): TemplateResult {
    if (!this.sealevelPresentData 
        || !this.sealevelFutureData 
        || !this.windSpeedPresentData 
        || !this.windSpeedFutureData ) 
          return getDataFetchErrorTemplate();

    // Esim. maanantai, tiistai ja keskiviikko.
    const groupedWindSpeedData = groupBy(this.windSpeedFutureData, 'weekday') as FutureWindSpeedData;
    const groupedSealevelFutureData = groupBy(this.sealevelFutureData, 'weekday') as FutureSealevelData;

    if (!groupedSealevelFutureData) return getDataFetchErrorTemplate();
    const [todaySealevelData, tomorrowSealevelData, dayAfterTomorrowSealevelData] = Object.values(groupedSealevelFutureData);
    const [todayWindSpeedData, tomorrowWindSpeedData, dayAfterTomorrowWindSpeedData] = Object.values(groupedWindSpeedData);

    return html `
    <div class="container-sm">
      <div>
        <h1>${this.currentCity}</h1>
      </div>
      <br />
      <div class="day">
        <present-element 
          .sealevelData="${this.sealevelPresentData}"
          .windSpeedData="${this.windSpeedPresentData}">
        </present-element>
      </div>
      <div class="day">
        <today-element 
          .sealevelData="${todaySealevelData}"
          .windSpeedData="${todayWindSpeedData}">
        </today-element>
      </div>
      <div class="day">
        <tomorrow-element 
          .sealevelData="${tomorrowSealevelData}"
          .windSpeedData="${tomorrowWindSpeedData}">
        </tomorrow-element>
      </div>
      <div class="day">
        <dayaftertomorrow-element 
          .sealevelData="${dayAfterTomorrowSealevelData}"
          .windSpeedData="${dayAfterTomorrowWindSpeedData}">
        </dayaftertomorrow-element>
      </div>
    </div>
  `;
  }

  @state()
  private sealevelPresentData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private sealevelFutureData: SeaLevelDataByWeekday[] | null = null; 

  @state()
  private windSpeedPresentData: WindSpeedDataByWeekday[] | null = null;

  @state()
  private windSpeedFutureData: WindSpeedDataByWeekday[] | null = null;

  @state()
  private sealevelLoadingState: LoadingState = LoadingState.Busy;

  @state()
  private windSpeedLoadingState: LoadingState = LoadingState.Busy;

  @property()
  public currentCity: City = City.Rauma;

  public createRenderRoot() {
    return this;
  }
}