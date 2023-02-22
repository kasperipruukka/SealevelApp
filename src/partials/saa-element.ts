import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement, state } from 'lit-element';
import wretch from "wretch"

@customElement('saa-element')
export class Weather extends LitElement {
  constructor() {
    super();
    this.init();
  }

  protected render(): TemplateResult {
    return this.getDataTemplate();
  }

  private init(): void {
    this.loadDataAsync();
  }

  private getDataTemplate(): TemplateResult {
    const data = this.data;
    const presentData = this.presentData;
    if (!data || !presentData) return html ``;


    const convertedData = data.map((item: any) => {
      const time = new Date(item.epochtime * 1000);
      return {
          weekday: `${this.getFinnishWeekday(time.getDay())}`,
          time: `Klo: ${time.getHours()}`,
          height: `Keskivesi ${item.SeaLevel} cm`,
          heightN2000: `N2000 ${item.SeaLevelN2000} cm`,
        }
    });

    const convertedPresentData = presentData.map((item: any) => {
      const time = new Date(item.epochtime * 1000);
      return {
          weekday: `${this.getFinnishWeekday(time.getDay())}`,
          time: `Klo: ${time.getHours()}`,
          height: `Keskivesi ${item.SeaLevel} cm`,
          heightN2000: `N2000 ${item.SeaLevelN2000} cm`,
        }
    });

    const dataByWeekday = this.groupBy(convertedData, 'weekday');
    const firstDay = Object.entries(dataByWeekday)[0] as [string, any[]];
    const secondDay = Object.entries(dataByWeekday)[1] as [string, any[]];
    const thirdDay = Object.entries(dataByWeekday)[2] as [string, any[]];

    return html `
      <div class="container-sm">
        <div>
          <h1>Rauman meriveden korkeus</h1>
        </div>
        <br />
        <div class="day">
          <h2>Nyt:</h2>
          <p>
            ${convertedPresentData.map((item) => {
              return html `${item.time} <br /> ${item.heightN2000} <br /> ${item.height} <br /><br />`
            })}
          </p>
        </div>
        <div class="day">
          ${this.getTemplateForDay(firstDay, 0)}
        </div>
        <div class="day">
          ${this.getTemplateForDay(secondDay, 1)}
        </div>
        <div class="day">
          ${this.getTemplateForDay(thirdDay, 2)}
        </div>
      </div>
    `;
  }

  private getTemplateForDay(day: [string, any[]], dayNumber: number) {
    if (!day) return html ``;
    
    const bodyTemplate = day[1].map((item) => {
      return html `<p>${item.time} <br /> ${item.heightN2000} <br /> ${item.height} <br /><br /></p>`
    });

    const headerTemplate = this.getHeader(dayNumber);

    return html `
      ${headerTemplate}
      ${bodyTemplate}
    `
  }

  private getHeader(dayNum: number): TemplateResult {
    switch (dayNum) {
      case 0: return html `<h2>Tänään, ${this.getFinnishWeekday(new Date().getDay() + dayNum)}:</h2>`;
      case 1: return html `<h2>Huomenna, ${this.getFinnishWeekday(new Date().getDay() + dayNum)}:</h2>`
      case 2: return html `<h2>Ylihuomenna, ${this.getFinnishWeekday(new Date().getDay() + dayNum)}:</h2>`
      default:
        return html ``;
    }
  }

  private async loadDataAsync(): Promise<void> {
    const startTime = Math.round((new Date().getTime() / 1000));
    const endTime = Math.round((this.addDays(new Date(), 7).getTime() / 1000));
    const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs?geoid=-10022816&fctstarttime=${startTime}&fctendtime=${endTime}&fcttimestep=60`;

    console.log(url);

    const result: any = await wretch()
      .get(url)
      .json();

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

  public createRenderRoot() {
    return this;
  }

  @state()
  private data: any[] | null = null; 

  @state()
  private presentData: any[] | null = null;
}