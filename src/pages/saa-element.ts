import { City } from 'src/shared/enums/citys';
import { html, TemplateResult } from 'lit-html';
import { connectStore } from 'src/tools/connectStore';
import { RootState, store } from 'src/shared/state/store';
import { LoadingState } from 'src/shared/enums/loadingState';
import { getSealevelData } from 'src/shared/state/sealevel/actions.js';
import { getDataFetchErrorTemplate } from 'src/shared/templates/errors';
import { getLoadingTemplate, groupBy } from 'src/shared/sharedFunctions';
import { customElement, LitElement, property, state } from 'lit-element';
import { getWeatherForecastData, getWeatherObservationData } from 'src/shared/state/weather/actions.js';
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
    this.setCurrentHour();
  }

  private loadData(): void {
    store.dispatch(getSealevelData());
    store.dispatch(getWeatherForecastData());
    store.dispatch(getWeatherObservationData());
  }

  protected render(): TemplateResult {
    if (this.sealevelLoadingState === LoadingState.Error || this.weatherLoadingState === LoadingState.Error)
      return getDataFetchErrorTemplate();

    if (this.loading) 
      return html `${getLoadingTemplate()}`;
    
    return this.getTemplate();
  }

  private getTemplate(): TemplateResult {
    if (this.sealevelLoadingState === LoadingState.Error  || this.weatherLoadingState === LoadingState.Error) 
          return getDataFetchErrorTemplate();
        
    // Esim. maanantai, tiistai ja keskiviikko.
    const groupedSealevelFutureData = groupBy(this.sealevelFutureData, 'weekday') as FutureData;
    const groupedWeatherFutureData = groupBy(this.weatherFutureData, 'weekday') as FutureData;

    const [todaySealevelData, tomorrowSealevelData, dayAfterTomorrowSealevelData] = Object.values(groupedSealevelFutureData);
    const [todayWeatherData, tomorrowWeatherData, dayAfterTomorrowWeatherData] = Object.values(groupedWeatherFutureData);

    return this.currentHour >= 23 
      ? this.getUnusualDayTemplates(
        todaySealevelData, 
        todayWeatherData, 
        tomorrowSealevelData, 
        tomorrowWeatherData
      )
      : this.getDayTemplates(
        todaySealevelData, 
        todayWeatherData, 
        tomorrowSealevelData, 
        tomorrowWeatherData, 
        dayAfterTomorrowSealevelData, 
        dayAfterTomorrowWeatherData
      );   
    }

  private getDayTemplates(
    todaySealevelData: SeaLevelDataByWeekday[],
    todayWeatherData: WeatherDataByWeekDay[],
    tomorrowSealevelData: SeaLevelDataByWeekday[],
    tomorrowWeatherData: WeatherDataByWeekDay[],
    dayAfterTomorrowSealevelData: SeaLevelDataByWeekday[],
    dayAfterTomorrowWeatherData: WeatherDataByWeekDay[]): TemplateResult {
      return html `
        <div class="container-lg">
          <div>
            <h1 class="currentCity">${this.currentCity}</h1>
          </div>
          <br />
          <div class="day">
            <present-element 
              .sealevelData="${this.sealevelPresentData}"
              .weatherData="${this.weatherObservationData}">
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

  private getUnusualDayTemplates(
    todaySealevelData: SeaLevelDataByWeekday[],
    todayWeatherData: WeatherDataByWeekDay[],
    tomorrowSealevelData: SeaLevelDataByWeekday[],
    tomorrowWeatherData: WeatherDataByWeekDay[]): TemplateResult {
      return html `
        <div class="container-lg">
          <div>
            <h1 class="currentCity">${this.currentCity}</h1>
          </div>
          <div class="day">
            <present-element 
              .sealevelData="${this.sealevelPresentData}"
              .weatherData="${this.weatherObservationData}">
            </present-element>
          </div>
          <div class="day">
            <tomorrow-element 
              .sealevelData="${todaySealevelData}"
              .weatherData="${todayWeatherData}">
            </tomorrow-element>
          </div>
          <div class="day">
            <dayaftertomorrow-element 
              .sealevelData="${tomorrowSealevelData}"
              .weatherData="${tomorrowWeatherData}">
            </dayaftertomorrow-element>
          </div>
        </div>
      `;
  }

  stateChanged(state: RootState): void {
    if (this.sealevelLoadingState !== state.sealevel.status) {
      this.sealevelLoadingState = state.sealevel.status;
      this.loading = this.isLoading();
    }
    if (this.weatherLoadingState !== state.weather.status) {
      this.weatherLoadingState = state.weather.status;
      this.loading = this.isLoading();
    }

    this.sealevelFutureData = state.sealevel.data.futureData;
    this.sealevelPresentData = state.sealevel.data.presentData;
    this.weatherFutureData = state.weather.data.futureData;
    this.weatherObservationData = state.weather.data.observationData;
  }

  private isLoading(): boolean {
    return this.sealevelLoadingState === LoadingState.Busy
            || this.weatherLoadingState === LoadingState.Busy;
  }

  private setCurrentHour(): void {
    this.currentHour = new Date().getHours();
  }

  @state()
  private sealevelPresentData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private sealevelFutureData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private weatherObservationData: WeatherDataByWeekDay | null = null;

  @state()
  private weatherFutureData: WeatherDataByWeekDay[] | null = null;

  @state()
  private sealevelLoadingState: LoadingState = LoadingState.Busy;

  @state()
  private weatherLoadingState: LoadingState = LoadingState.Busy;

  @state()
  private loading: boolean = true;

  @state()
  private currentHour = 0;

  @property()
  public currentCity: City = City.Rauma;

  public createRenderRoot() {
    return this;
  }
}