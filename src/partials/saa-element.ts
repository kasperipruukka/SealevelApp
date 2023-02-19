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
          <h2>Tänään, ${this.getFinnishWeekday(new Date().getDay())}:</h2>
          <p>
            ${firstDay[1].map((item) => {
              return html `${item.time} <br /> ${item.heightN2000} <br /> ${item.height} <br /><br />`
            })}
          </p>
        </div>
        <div class="day">
          <h2>Huomenna, ${this.getFinnishWeekday(new Date().getDay() + 1)}:</h2>
          <p>
            ${secondDay[1].map((item) => {
              return html `${item.time} <br /> ${item.heightN2000} <br /> ${item.height} <br /><br />`
            })}
          </p>
        </div>
        <div class="day">
          <h2>Ylihuomenna, ${this.getFinnishWeekday(new Date().getDay() + 2)}:</h2>
          <p>
            ${thirdDay[1].map((item) => {
              return html `${item.time} <br /> ${item.heightN2000} <br /> ${item.height} <br /><br />`
            })}
          </p>
        </div>
      </div>
    `;
  }

  private async loadDataAsync(): Promise<void> {
    const result: any = await wretch()
      .get('https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs?geoid=-10022816&obsstarttime=1676628600&obsendtime=1676801400&fctstarttime=1676786400&fctendtime=1676977200&obstimestep=10&fcttimestep=60')
      .json();

    const data: any = Object.values(result.fctData)[0];
    this.data = data.filter((item: any) => { return new Date(item.epochtime * 1000) > new Date()});
    this.presentData = data.filter((item: any) => 
      { 
        return new Date(item.epochtime * 1000).getHours() === new Date().getHours()
          && new Date(item.epochtime * 1000).getDay() === new Date().getDay()
      });
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