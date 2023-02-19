import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement, state } from 'lit-element';
import wretch from "wretch"

@customElement('saa-element')
export class Weather extends LitElement {
  constructor() {
    super();
    this.init();
  }

  private init(): void {
    this.loadDataAsync();
  }

  protected render(): TemplateResult {
    return this.getDataTemplate();
  }

  private getDataTemplate(): TemplateResult {
    const data = this.data;
    if (!data) return html ``;


    const convertedData = data.map((item: any) => {
      const time = new Date(item.epochtime * 1000);
      return {
          weekday: `${this.getFinnishWeekday(time.getDay())}`,
          time: `Klo: ${time.getHours()}`,
          height: `Korkeus ${item.SeaLevel}`, 
        }
    });

    const weekdays: string[] = [];  
    const converted = convertedData.map((item) => {
      // Weekday is already added to the template.
      if (weekdays.includes(item.weekday)) {
        return html `
          <div class="${weekdays.length}">
            ${item.time} ${item.height}
          </div>
        `;
      }
      

      weekdays.push(item.weekday);
      return html `
        <div class="${weekdays.length}">
          <b>${item.weekday}</b>
        </div>
        <div class="${weekdays.length}">
          ${item.time} ${item.height}
        </div>
      `;
    });

    return html `${converted.map((c: any) => c)}`
  }

  private async loadDataAsync(): Promise<void> {
    const result: any = await wretch()
      .get('https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs?geoid=-10022816&obsstarttime=1676628600&obsendtime=1676801400&fctstarttime=1676786400&fctendtime=1676977200&obstimestep=10&fcttimestep=60')
      .json();

    const data: any = Object.values(result.fctData)[0];
    const filtered: any = data.filter((item: any) => { return new Date(item.epochtime * 1000) > new Date()});
    this.data = filtered;
  }

  private getFinnishWeekday(day: number): string {
    switch (day) {
      case 0:
        return "sunnuntai";
      case 1:
        return "maanantai";
      case 2:
        return "tiistai";
      case 3:
        return "keskiviikko";
      case 4:
        return "torstai";
      case 5:
        return "perjantai";
      case 6:
        return "lauantai";
      default:
        return "maanantai";
    }
  }

  public createRenderRoot() {
    return this;
  }

  @state()
  private data: any[] | null = null; 
}