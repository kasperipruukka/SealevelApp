import { City } from 'src/shared/enums/citys';
import { html, TemplateResult } from 'lit-html';
import { connectStore } from 'src/tools/connectStore';
import { RootState, store } from 'src/shared/state/store';
import { LoadingState } from 'src/shared/enums/loadingState';
import { getTodayTemplate } from 'src/shared/templates/days/today';
import { getPresentTemplate } from 'src/shared/templates/days/now';
import { getTomorrowTemplate } from 'src/shared/templates/days/tomorrow';
import { getDataFetchErrorTemplate } from 'src/shared/templates/errors';
import { customElement, LitElement, property, state } from 'lit-element';
import { getSealevelData } from 'src/shared/state/slices/sealevel/actions';
import { getWindSpeedData } from 'src/shared/state/slices/windSpeed/actions';
import { getDayAfterTomorrowTemplate } from 'src/shared/templates/days/dayAfterTomorrow';
import { getFinnishWeekday, getLoadingTemplate, groupBy } from 'src/shared/sharedFunctions';
import { FutureSealevelData, SeaLevelDataByWeekday } from 'src/types/seaLevel';
import { ApiSealevelData } from 'src/types/api/apiData';
import { convertToSealevelData } from 'src/api/converters/sealevelConverters';

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
    const futureData = this.futureData;
    const presentData = this.presentData;
    if (!futureData || !presentData) return getDataFetchErrorTemplate();

    const presentSealevelData = convertToSealevelData(presentData);
    if (!presentSealevelData) return getDataFetchErrorTemplate();

    const groupedFutureData = groupBy(convertToSealevelData(futureData), 'weekday') as FutureSealevelData;
    if (!groupedFutureData) return getDataFetchErrorTemplate();

    const [todaySealevelData, tomorrowSealevelData, dayAfterTomorrowSealevelData] = Object.values(groupedFutureData);

    return html `
    <div class="container-sm">
      <div>
        <h1>${this.currentCity}</h1>
      </div>
      <br />
      <div class="day">
        ${getPresentTemplate(presentSealevelData)}
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
  private futureData: ApiSealevelData[] | null = null; 

  @state()
  private presentData: ApiSealevelData[] | null = null;

  @state()
  private status: LoadingState = LoadingState.Busy;

  @property()
  public currentCity: City = City.Rauma;
}