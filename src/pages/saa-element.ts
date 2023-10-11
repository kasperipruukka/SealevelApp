import { City } from 'src/shared/enums/citys';
import { html, TemplateResult } from 'lit-html';
import { connectStore } from 'src/tools/connectStore';
import { RootState, store } from 'src/shared/state/store';
import { LoadingState } from 'src/shared/enums/loadingState';
import { getSealevelData } from 'src/shared/state/sealevel/actions.js';
import { getDataFetchErrorTemplate } from 'src/shared/templates/errors';
import { getLoadingTemplate, groupBy } from 'src/shared/sharedFunctions';
import { customElement, LitElement, property, state } from 'lit-element';
import { getWeatherForecastData } from 'src/shared/state/weather/actions.js';
import "../partials/present-element.js";
import "../partials/today-element.js";
import "../partials/tomorrow-element.js";
import "../partials/dayAfterTomorrow-element.js";
import { WeatherDataByWeekDay } from 'src/types/state/weatherTypes.js';
import { FutureData } from 'src/shared/types/sharedTypes.js';
import { SeaLevelDataByWeekday } from 'src/types/state/sealevelTypes.js';

@customElement('saa-element')
export class Weather extends connectStore(store)(LitElement) {
  constructor() {
    super();
  }

  protected firstUpdated(): void {
    this.init();
  }

  private init(): void {
    this.loadData();
  }

  private loadData(): void {
    store.dispatch(getSealevelData());
    store.dispatch(getWeatherForecastData());
  }

  protected render(): TemplateResult {
    if (this.sealevelLoadingState === LoadingState.Error)
      return getDataFetchErrorTemplate();

    if (this.sealevelLoadingState === LoadingState.Busy) 
      return html `${getLoadingTemplate()}`;

    return this.getTemplate();
  }

  stateChanged(state: RootState): void {
    this.sealevelLoadingState = state.sealevel.status;
    this.sealevelFutureData = state.sealevel.data.futureData;
    this.sealevelPresentData = state.sealevel.data.presentData;
    this.weatherLoadingState = state.weather.status;
    this.weatherFutureData = state.weather.data.futureData;
  }

  private getTemplate(): TemplateResult {
    if (!this.sealevelPresentData || !this.sealevelFutureData || !this.weatherFutureData) 
          return getDataFetchErrorTemplate();

    // Esim. maanantai, tiistai ja keskiviikko.
    const groupedSealevelFutureData = groupBy(this.sealevelFutureData, 'weekday') as FutureData;
    const groupedWeatherFutureData = groupBy(this.weatherFutureData, 'weekday') as FutureData;


    if (!groupedSealevelFutureData || !groupedWeatherFutureData) return getDataFetchErrorTemplate();
    const [todaySealevelData, tomorrowSealevelData, dayAfterTomorrowSealevelData] = Object.values(groupedSealevelFutureData);
    const [todayWeatherData, tomorrowWeatherData, dayAfterTomorrowWeatherData] = Object.values(groupedWeatherFutureData);

    return html `
    <div class="container-sm">
      <div>
        <h1>${this.currentCity}</h1>
      </div>
      <br />
      <div class="day">
        <present-element 
          .sealevelData="${this.sealevelPresentData}">
        </present-element>
      </div>
      <div class="day">
        <today-element 
          .sealevelData="${todaySealevelData}"
          .weatherData="${todayWeatherData}">
        </today-element>
      </div>
      <div class="day">
        <tomorrow-element 
          .sealevelData="${tomorrowSealevelData}"
          .weatherData="${tomorrowWeatherData}">
        </tomorrow-element>
      </div>
      <div class="day">
        <dayaftertomorrow-element 
          .sealevelData="${dayAfterTomorrowSealevelData}"
          .weatherData="${dayAfterTomorrowWeatherData}">
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
  private weatherPresentData: WeatherDataByWeekDay[] | null = null;

  @state()
  private weatherFutureData: WeatherDataByWeekDay[] | null = null;

  @state()
  private sealevelLoadingState: LoadingState = LoadingState.Busy;

  @state()
  private weatherLoadingState: LoadingState = LoadingState.Busy;

  @property()
  public currentCity: City = City.Rauma;

  public createRenderRoot() {
    return this;
  }
}