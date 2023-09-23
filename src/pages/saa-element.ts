import { City } from 'src/shared/enums/citys';
import { html, TemplateResult } from 'lit-html';
import { connectStore } from 'src/tools/connectStore';
import { RootState, store } from 'src/shared/state/store';
import { LoadingState } from 'src/shared/enums/loadingState';
import { getTodayTemplate } from 'src/shared/templates/days/today';
import { getPresentTemplate } from 'src/shared/templates/days/now';
import { getDataFetchErrorTemplate } from 'src/shared/templates/errors';
import { getTomorrowTemplate } from 'src/shared/templates/days/tomorrow';
import { getLoadingTemplate, groupBy } from 'src/shared/sharedFunctions';
import { customElement, LitElement, property, state } from 'lit-element';
import { getSealevelData } from 'src/shared/state/slices/sealevel/actions';
import { getWindSpeedData } from 'src/shared/state/slices/windSpeed/actions';
import { FutureSealevelData, SeaLevelDataByWeekday } from 'src/types/seaLevel';
import { getDayAfterTomorrowTemplate } from 'src/shared/templates/days/dayAfterTomorrow';

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
    this.futureData = state.sealevel.data.futureData;
    this.presentData = state.sealevel.data.presentData;
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
    if (!this.presentData || !this.futureData ) return getDataFetchErrorTemplate();

    const groupedFutureData = groupBy(this.futureData, 'weekday') as FutureSealevelData;
    if (!groupedFutureData) return getDataFetchErrorTemplate();

    const [todaySealevelData, tomorrowSealevelData, dayAfterTomorrowSealevelData] = Object.values(groupedFutureData);

    return html `
    <div class="container-sm">
      <div>
        <h1>${this.currentCity}</h1>
      </div>
      <br />
      <div class="day">
        ${getPresentTemplate(this.presentData)}
      </div>
      <div class="day">
        ${getTodayTemplate(todaySealevelData)}
      </div>
      <div class="day">
        ${getTomorrowTemplate(tomorrowSealevelData)}
      </div>
      <div class="day">
        ${getDayAfterTomorrowTemplate(dayAfterTomorrowSealevelData)}
      </div>
    </div>
  `;
  }
  
  public createRenderRoot() {
    return this;
  }

  @state()
  private futureData: SeaLevelDataByWeekday[] | null = null; 

  @state()
  private presentData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private status: LoadingState = LoadingState.Busy;

  @property()
  public currentCity: City = City.Rauma;
}