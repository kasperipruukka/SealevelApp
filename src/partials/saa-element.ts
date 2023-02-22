import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement, state } from 'lit-element';
import wretch from "wretch"
import { SeaLevelData } from 'src/types/seaLevel';
import { Days } from 'src/enums/days';
import { DatanHakuEpaonnistuiMsg } from 'src/shared/errors/messages/errorMsg';
import { LoadingState } from 'src/shared/enums/loadingState';

@customElement('saa-element')
export class Weather extends LitElement {
  constructor() {
    super();
    this.init();
  }

  protected render(): TemplateResult {
    if (this.loading === LoadingState.Loading) return html `${this.getLoadingTemplate()}`;
    return this.getTemplate();
  }

  private getTemplate(): TemplateResult {
    const data = this.data;
    const presentData = this.presentData;
    if (!data || !presentData) return html `${DatanHakuEpaonnistuiMsg}`;

    return this.getSealevelTemplate(data, presentData);
  }

  private getSealevelTemplate(data: any[], presentData: any[]): TemplateResult {
    if (!data || !presentData) return html `${DatanHakuEpaonnistuiMsg}`;

    const sealevelData = this.getConvertedSeaLevelData(data);
    const presentSealevelData = this.getConvertedSeaLevelData(presentData);
    const groupedDataByWeekday = this.groupBy(sealevelData, 'weekday');
    if (!sealevelData || !groupedDataByWeekday || !presentSealevelData) return html `${DatanHakuEpaonnistuiMsg}`;

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
        ${this.getTodaysSealevelTemplate(presentSealevelData)}
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

  private getLoadingTemplate(): TemplateResult {
    return html `
      <div class="container">
        <div class="row vh-100">
          <div class="loader"></div>
        </div>
      </div>
    `;
  }

  private getTodaysSealevelTemplate(presentData: any): TemplateResult {
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

  private getConvertedSeaLevelData(data: any): SeaLevelData[] | null {
    if (!data) return null;

    const sealevelData: SeaLevelData[] =  data.map((item: any) => {
      const time = new Date(item.epochtime * 1000);
      return {
          weekday: `${this.getFinnishWeekday(time.getDay())}`,
          time: `Klo: ${time.getHours()}`,
          height: `Keskivesi ${item.SeaLevel} cm`,
          heightN2000: `N2000 ${item.SeaLevelN2000} cm`,
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
          <h2>Tänään, ${this.getFinnishWeekday(new Date().getDay() + dayNum)}:</h2>
        </a>
      `;
      case Days.Tomorrow: return html `
        <a data-bs-toggle="collapse" href="#tomorrow-collapse" role="button" aria-expanded="false" aria-controls="tomorrow-collapse">
          <h2>Huomenna, ${this.getFinnishWeekday(new Date().getDay() + dayNum)}:</h2>
        </a>
      `;
      case Days.DayAfterTomorrow: return html `
        <a data-bs-toggle="collapse" href="#dayaftertomorrow-collapse" role="button" aria-expanded="false" aria-controls="dayaftertomorrow-collapse">
          <h2>Ylihuomenna, ${this.getFinnishWeekday(new Date().getDay() + dayNum)}:</h2>
        </a>
      `;
      default:
        return html `${DatanHakuEpaonnistuiMsg}`;
    }
  }

  private async loadDataAsync(): Promise<void> {
    this.loading = LoadingState.Loading;
    const startTime = Math.round((new Date().getTime() / 1000) - 3600);
    const endTime = Math.round((this.addDays(new Date(), 7).getTime() / 1000));
    const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs?geoid=-10022816&fctstarttime=${startTime}&fctendtime=${endTime}&fcttimestep=60`;

    const result: any = await wretch()
      .get(url)
      .json()
      .finally(() => {
        setInterval(() => {this.loading = LoadingState.Finished}, 600)
      })

    const data: any = Object.values(result.fctData)[0];
    this.data = data.filter((item: any) => { return new Date(item.epochtime * 1000) > new Date()});
    this.presentData = data.filter((item: any) => 
      { 
        return new Date(item.epochtime * 1000).getHours() === new Date().getHours()
          && new Date(item.epochtime * 1000).getDay() === new Date().getDay()
      });
  }

  private addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private groupBy(xs: any, key: any) {
    return xs.reduce(function(rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  private getFinnishWeekday(day: number): string {
    switch (day) {
      case 0:
        return "sunnuntaina";
      case 1:
        return "maanantaina";
      case 2:
        return "tiistaina";
      case 3:
        return "keskiviikkona";
      case 4:
        return "torstaina";
      case 5:
        return "perjantaina";
      case 6:
        return "lauantaina";
      default:
        return "maanantaina";
    }
  }

  private init(): void {
    this.loadDataAsync();
  }

  public createRenderRoot() {
    return this;
  }

  @state()
  private data: any[] | null = null; 

  @state()
  private presentData: any[] | null = null;

  @state()
  private loading: LoadingState = LoadingState.Finished;
}