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
    if (!data) return html ``;


    const convertedData = data.map((item: any) => {
      const time = new Date(item.epochtime * 1000);
      return {
          weekday: `${this.getFinnishWeekday(time.getDay())}`,
          time: `Klo: ${time.getHours()}`,
          height: `Korkeus ${item.SeaLevel} cm`, 
        }
    });

    const weekdays: string[] = [];  
    const converted = convertedData.map((item) => {
      // Weekday is already added to the template.
      if (weekdays.includes(item.weekday)) {
        return html `
          <div class="${this.getDynamicClassnameForWeekdayColumn(weekdays.length)}">
            ${item.time} ${item.height}
          </div>
        `;
      }
      

      weekdays.push(item.weekday);
      return html `
        <div class="${this.getDynamicClassnameForWeekdayColumn(weekdays.length)}">
          <b>${item.weekday}</b>
        </div>
        <div class="${this.getDynamicClassnameForWeekdayColumn(weekdays.length)}">
          ${item.time} ${item.height}
        </div>
      `;
    });

    return html `
      <h1>Rauman meriveden korkeusennuste:</h1>
      <div class="columns">
        ${converted.map((c: any) => c)}
      </div>
    `
  }

  private async loadDataAsync(): Promise<void> {
    const result: any = await wretch()
      .get('https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs?geoid=-10022816&obsstarttime=1676628600&obsendtime=1676801400&fctstarttime=1676786400&fctendtime=1676977200&obstimestep=10&fcttimestep=60')
      .json();

    const data: any = Object.values(result.fctData)[0];
    const filtered: any = data.filter((item: any) => { return new Date(item.epochtime * 1000) > new Date()});
    this.data = filtered;
  }

  private getDynamicClassnameForWeekdayColumn(weekday: number): string {
    if (weekday === 1) return 'first-column';
    if (weekday === 2) return 'second-column';
    if (weekday === 3) return 'third-column';
    return '';
  }

  private getFinnishWeekday(day: number): string {
    switch (day) {
      case 0:
        return "Sunnuntai";
      case 1:
        return "Maanantai";
      case 2:
        return "Tiistai";
      case 3:
        return "Keskiviikko";
      case 4:
        return "Torstai";
      case 5:
        return "Perjantai";
      case 6:
        return "Lauantai";
      default:
        return "Maanantai";
    }
  }

  public createRenderRoot() {
    return this;
  }

  @state()
  private data: any[] | null = null; 
}