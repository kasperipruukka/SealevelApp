import { html, TemplateResult } from 'lit-html';
import { connectStore } from 'src/tools/connectStore';
import { RootState, store } from 'src/shared/state/store';
import { LoadingState } from 'src/shared/enums/loadingState';
import { getSealevelData } from 'src/shared/state/sealevel/actions.js';
import { getDataFetchErrorTemplate } from 'src/shared/templates/errors';
import { getElementWithAnimation, getLoadingTemplate, groupBy, hideElementWithAnimation } from 'src/shared/sharedFunctions';
import { customElement, LitElement, property, state } from 'lit-element';
import { getWeatherForecastData, getWeatherObservationData } from 'src/shared/state/weather/actions.js';
import "../partials/present-element.js";
import "../partials/today-element.js";
import "../partials/tomorrow-element.js";
import "../partials/dayAfterTomorrow-element.js";
import { WeatherDataByWeekDay } from 'src/types/state/weatherTypes.js';
import { ForecastData } from 'src/shared/types/sharedTypes.js';
import { SeaLevelDataByWeekday } from 'src/types/state/sealevelTypes.js';
import '../pages/start-element.js'
import { CityBaseType, DisplayCityName, DisplayAreaName, ForecastLocation, LocationGeoId, ObservationLocation } from 'src/shared/enums/locations.js';

@customElement('saa-element')
export class Weather extends connectStore(store)(LitElement) {
  constructor() {
    super();
  }

  private init(): void {
    this.loadData();
    this.setCurrentHour();
  }

  private loadData(): void {
    store.dispatch(getSealevelData(LocationGeoId[this.currentcity as keyof typeof CityBaseType]));
    store.dispatch(getWeatherForecastData(ForecastLocation[this.currentcity as keyof typeof CityBaseType]));
    store.dispatch(getWeatherObservationData(ObservationLocation[this.currentcity as keyof typeof CityBaseType]));
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

    const showTodayElement: boolean = this.currentHour <= 23;
    return this.getDayTemplates(showTodayElement);   
    }

  private getDayTemplates(showTodayElement: boolean): TemplateResult {
      return html `
        <div id="saa-wrapper" class="container-lg">
          <div class="main-element-heading">
              <h1>${DisplayCityName[this.currentcity as keyof typeof CityBaseType]}</h1>
              <h3>${DisplayAreaName[this.currentcity as keyof typeof CityBaseType]}</h3>
          </div>
          <div class="day">
            <present-element 
              .sealevelData="${this.sealevelObservationData}"
              .weatherData="${this.weatherObservationData}">
            </present-element>
          </div>
          ${ showTodayElement ? 
              html `
                <div class="day">
                  <today-element 
                    .sealevelData="${this.todaySealevelForecastData}"
                    .weatherData="${this.todayWeatherForecastData}">
                  </today-element>
                </div>
              `
              : html ``
          }
          ${ showTodayElement ?
            html `
              <div class="day">
                <tomorrow-element 
                  .sealevelData="${this.tomorrowSealevelForecastData}"
                  .weatherData="${this.tomorrowWeatherForecastData}">
                </tomorrow-element>
              </div>
            `
            : html `
                <div class="day">
                  <tomorrow-element 
                    .sealevelData="${this.todaySealevelForecastData}"
                    .weatherData="${this.todayWeatherForecastData}">
                  </tomorrow-element>
                </div>
            `         
          }
          ${ showTodayElement ?
            html `
              <div class="day">
                <dayaftertomorrow-element 
                  .sealevelData="${this.dayAfterTomorrowSealevelForecastData}"
                  .weatherData="${this.dayAfterTomorrowWeatherForecastData}">
                </dayaftertomorrow-element>
              </div>
            `
            : html `
                <div class="day">
                  <dayaftertomorrow-element 
                    .sealevelData="${this.tomorrowSealevelForecastData}"
                    .weatherData="${this.tomorrowWeatherForecastData}">
                  </dayaftertomorrow-element>
                </div>
            `         
          }
        </div>
        <div class="backbutton-container">
          <a
            id="backbutton" 
            href="javascript:void(0);" 
            class="backbutton medium-font"
            role="button"
            @click="${() => {this.getStartView()}}">
              Vaihda sääasemaa
          </a>
        </div>
      `;
  }

  private getStartView(): void {
    const mainElement = document.getElementById('saa-wrapper');
    hideElementWithAnimation(mainElement, 'slide-out-to-right');

    const backbutton = document.getElementById('backbutton');
    hideElementWithAnimation(backbutton, 'slide-out-to-bottom');

    setTimeout(() => {
      const startElement = document.getElementById('start-wrapper');
      getElementWithAnimation(startElement, 'slide-in-from-left');

      const searchInput = document.getElementById('search-input') as HTMLInputElement;
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus();
          searchInput.select();
        }, 200);
      }
    }, 300);
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    if (name === 'currentcity' && value) {
      switch (value) {
        case "Kemi":
          this.currentcity = CityBaseType.Kemi;
          break;
        case "Oulu":
          this.currentcity = CityBaseType.Oulu;
          break;
        case "Raahe":
          this.currentcity = CityBaseType.Raahe;
          break;
        case "Pietarsaari":
          this.currentcity = CityBaseType.Pietarsaari;
          break;
        case "Vaasa":
          this.currentcity = CityBaseType.Vaasa;
          break;
        case "Kaskinen":
          this.currentcity = CityBaseType.Kaskinen;
          break;
        case "Pori":
          this.currentcity = CityBaseType.Pori;
          break;
        case "Rauma":
          this.currentcity = CityBaseType.Rauma;
          break;
        case "Turku":
          this.currentcity = CityBaseType.Turku;
          break;
        case "Föglö":
          this.currentcity = CityBaseType.Föglö;
          break;
        case "Hanko":
          this.currentcity = CityBaseType.Hanko;
          break;
        case "Helsinki":
          this.currentcity = CityBaseType.Helsinki;
          break;
        case "Porvoo":
          this.currentcity = CityBaseType.Porvoo;
          break;
        case "Hamina":
          this.currentcity = CityBaseType.Hamina;
          break;
        default:
          break;
      }
    }

    this.init();
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

    this.sealevelObservationData = state.sealevel.data.presentData;
    this.weatherObservationData = state.weather.data.observationData;

    this.setSealevelForecastData(state.sealevel.data.futureData);
    this.setWeatherForecastData(state.weather.data.futureData);
  }

  private setSealevelForecastData(data: SeaLevelDataByWeekday[] | null): void {
    if (!data) return;

    // Esim. maanantai, tiistai ja keskiviikko.
    const dataByDays = groupBy(data, 'weekday') as ForecastData;
    const [todaySealevelData, tomorrowSealevelData, dayAfterTomorrowSealevelData] = Object.values(dataByDays);
    
    this.todaySealevelForecastData = todaySealevelData ?? null;
    this.tomorrowSealevelForecastData = tomorrowSealevelData ?? null;
    this.dayAfterTomorrowSealevelForecastData = dayAfterTomorrowSealevelData ?? null;
  }

  private setWeatherForecastData(data: WeatherDataByWeekDay[] | null): void {
    if (!data) return;

     // Esim. maanantai, tiistai ja keskiviikko.
    const dataByDays = groupBy(data, 'weekday') as ForecastData;
    const [todayWeatherData, tomorrowWeatherData, dayAfterTomorrowWeatherData] = Object.values(dataByDays);

    this.todayWeatherForecastData = todayWeatherData ?? null;
    this.tomorrowWeatherForecastData = tomorrowWeatherData ?? null;
    this.dayAfterTomorrowWeatherForecastData = dayAfterTomorrowWeatherData ?? null;
  }

  private isLoading(): boolean {
    return this.sealevelLoadingState === LoadingState.Busy
      || this.weatherLoadingState === LoadingState.Busy;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('collapse-toggled', (event) => this.handleCollapseToggled(event as CustomEvent));
  }

  private handleCollapseToggled(event: CustomEvent) {
    this.toggleCollapses(event);
  }

  private toggleCollapses(event: CustomEvent): void {
    document.querySelectorAll('.collapse').forEach(element => {
      const isClickedElement = element.id === event.detail.contentId;
      const isExpanded = element.classList.contains('show');     
      
      element.classList.toggle('show', isClickedElement ? !isExpanded : false);
    });

    document.querySelectorAll('.day-collapse').forEach(element => {
      const isClickedElement = element.id === event.detail.collapseId;
      const isExpanded = (element as HTMLElement).getAttribute('aria-expanded') === 'true';
      
      element.setAttribute('aria-expanded', isClickedElement ? (!isExpanded).toString() : 'false');
    });
  }

  private setCurrentHour(): void {
    this.currentHour = new Date().getHours();
  }

  @state()
  private todaySealevelForecastData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private tomorrowSealevelForecastData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private dayAfterTomorrowSealevelForecastData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private todayWeatherForecastData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private tomorrowWeatherForecastData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private dayAfterTomorrowWeatherForecastData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private sealevelObservationData: SeaLevelDataByWeekday[] | null = null;

  @state()
  private weatherObservationData: WeatherDataByWeekDay | null = null;

  @state()
  private sealevelLoadingState: LoadingState = LoadingState.Busy;

  @state()
  private weatherLoadingState: LoadingState = LoadingState.Busy;

  @state()
  private loading: boolean = true;

  @state()
  private currentHour = 0;

  @property()
  public currentcity: CityBaseType = CityBaseType.Rauma;

  public createRenderRoot() {
    return this;
  }
}