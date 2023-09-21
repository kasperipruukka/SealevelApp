import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement, state } from 'lit-element';
import { SeaLevelData } from 'src/shared/types/seaLevel';
import { Days } from 'src/shared/enums/days';
import { DatanHakuEpaonnistuiMsg } from 'src/shared/errors/messages/errorMsg';
import { LoadingState } from 'src/shared/enums/loadingState';
import { getFinnishWeekday, getLoadingTemplate, groupBy } from 'src/shared/sharedFunctions';
import { RootState, store } from 'src/shared/state/store';
import { connectStore } from 'src/tools/connectStore';
import { getSealevelData } from 'src/shared/state/slices/sealevel/actions';
import { SealevelData } from 'src/shared/types/apiData';
import { getWindSpeedData } from 'src/shared/state/slices/windSpeed/actions';

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

  private getTemplate(): TemplateResult {
    const futureData = this.futureData;
    const presentData = this.presentData;
    if (!futureData || !presentData) return html `${DatanHakuEpaonnistuiMsg}`;

    return this.getSealevelTemplate(futureData, presentData);
  }

  private getSealevelTemplate(futureData: SealevelData[], presentData: SealevelData[]): TemplateResult {
    if (!futureData || !presentData) return html `${DatanHakuEpaonnistuiMsg}`;

    const convertedfutureData = this.getConvertedSeaLevelData(futureData);
    const convertedpresentData = this.getConvertedSeaLevelData(presentData);
    const groupedDataByWeekday = groupBy(convertedfutureData, 'weekday');
    if (!convertedfutureData || !groupedDataByWeekday || !convertedpresentData) return html `${DatanHakuEpaonnistuiMsg}`;

    const todayData = this.getSeaLevelDataForDay(groupedDataByWeekday, Days.Today);
    const tomorrowData = this.getSeaLevelDataForDay(groupedDataByWeekday, Days.Tomorrow);
    const dayAfterTomorrowData = this.getSeaLevelDataForDay(groupedDataByWeekday, Days.DayAfterTomorrow);

    if (!todayData || !tomorrowData || !dayAfterTomorrowData) return html `${DatanHakuEpaonnistuiMsg}`;

    return html `
    <div class="container-sm">
      <div>
        <h1>Rauma</h1>
      </div>
      <br />
      <div class="day">
        ${this.getTemplateForNow(convertedpresentData)}
      </div>
      <div class="day">
        ${this.getTemplateForDay(todayData, Days.Today)}
      </div>
      <div class="day">
        ${this.getTemplateForDay(tomorrowData, Days.Tomorrow)}
      </div>
      <div class="day">
        ${this.getTemplateForDay(dayAfterTomorrowData, Days.DayAfterTomorrow)}
      </div>
    </div>
  `;
  }

  private getTemplateForNow(presentData: any): TemplateResult {
    if (!presentData) return html `${DatanHakuEpaonnistuiMsg}`;

    return html `
      <h2>Nyt:</h2>
      <p>
        ${presentData.map((item: any) => {
          return html `${item.time} <br /> ${item.heightN2000} <br /> ${item.height} <br /><br />`
        })}
      </p>
    `;
  }

  private getTemplateForDay(data: [string, any[]], dayNumber: Days): TemplateResult {
    if (!data) return html `${DatanHakuEpaonnistuiMsg}`;

    const headerTemplate = this.getHeader(dayNumber);
    const bodyTemplate = data[1].map((item) => {
      return html `
        <p>
          ${item.time} <br /> ${item.heightN2000} <br /> ${item.height} <br /><br />
        </p>
      `;
    });

    return html `
      ${headerTemplate}
      <div class="collapse" id="${this.getCollapseId(dayNumber)}">
        ${bodyTemplate}
      </div> 
    `
  }


  private getCollapseId(day: Days): string {
    switch (day) {
      case Days.Today:
        return 'today-collapse'

      case Days.Tomorrow:
        return 'tomorrow-collapse'

      case Days.DayAfterTomorrow:
        return 'dayaftertomorrow-collapse'
      
      default:
        return '';
    }
  }

  private getConvertedSeaLevelData(apiData: SealevelData[]): SeaLevelData[] | null {
    if (!apiData) return null;

    const sealevelData: SeaLevelData[] = apiData.map((item: SealevelData) => {
      const time = new Date(item.epochtime * 1000);
      return {
          weekday: `${getFinnishWeekday(time.getDay())}`,
          time: `Klo: ${time.getHours()}`,
          heightN2000: `N2000: ${item.SeaLevelN2000} cm`,
          height: `Keskivesi: ${item.SeaLevel} cm`
        }
    });

    return sealevelData;
  }

  private getSeaLevelDataForDay(data: any, day: number): [string, any[]] {
    if (!data) return ['', []];

    switch (day) {
      case Days.Today:
        const todayData = Object.entries(data)[0] as [string, any[]];
        return todayData ?? ['', []];
      
      case Days.Tomorrow:   
        const tomorrowData = Object.entries(data)[1] as [string, any[]]; 
        return tomorrowData ?? ['', []];
      
      case Days.DayAfterTomorrow: 
        const dayAfterTomorrowData = Object.entries(data)[2] as [string, any[]];
        return dayAfterTomorrowData ?? ['', []];
      
      default:
        return ['', []];
    }
  }

  private getHeader(dayNum: number): TemplateResult {
    switch (dayNum) {
      case Days.Today: return html `
        <a data-bs-toggle="collapse" href="#today-collapse" role="button" aria-expanded="false" aria-controls="today-collapse">
          <h2>Tänään, ${getFinnishWeekday(new Date().getDay() + dayNum)}:</h2>
        </a>
      `;
      case Days.Tomorrow: return html `
        <a data-bs-toggle="collapse" href="#tomorrow-collapse" role="button" aria-expanded="false" aria-controls="tomorrow-collapse">
          <h2>Huomenna, ${getFinnishWeekday(new Date().getDay() + dayNum)}:</h2>
        </a>
      `;
      case Days.DayAfterTomorrow: return html `
        <a data-bs-toggle="collapse" href="#dayaftertomorrow-collapse" role="button" aria-expanded="false" aria-controls="dayaftertomorrow-collapse">
          <h2>Ylihuomenna, ${getFinnishWeekday(new Date().getDay() + dayNum)}:</h2>
        </a>
      `;
      default:
        return html `${DatanHakuEpaonnistuiMsg}`;
    }
  }

  private init(): void {
    this.loadData();
  }

  private loadData(): void {
    store.dispatch(getSealevelData());
    store.dispatch(getWindSpeedData())
  }

  public createRenderRoot() {
    return this;
  }

  @state()
  private futureData: SealevelData[] | null = null; 

  @state()
  private presentData: SealevelData[] | null = null;

  @state()
  private status: LoadingState = LoadingState.Busy;
}