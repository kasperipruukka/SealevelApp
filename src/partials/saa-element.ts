import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement, state } from 'lit-element';
import { SealevelForecastData } from 'src/types/seaLevel';
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

    const converted = data.map((item) => {
      return html `
        Pvm: ${item.aika} Korkeus: ${item.korkeus}
        <br />
        <br />
      `
    });

    return html `${converted.map(c => c)}`
  }

  private async loadDataAsync(): Promise<void> {
    const result: any = await wretch()
      .get('https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs?geoid=-10022816&obsstarttime=1676628600&obsendtime=1676801400&fctstarttime=1676786400&fctendtime=1676977200&obstimestep=10&fcttimestep=60')
      .json();

    const data: any = Object.values(result.fctData)[0];
    const convertedData: SealevelForecastData[] = data.map((item: any) => {
      const time = new Date(item.epochtime * 1000)
      return {
        aika: `${time.getDate()}.${time.getMonth()}.${time.getFullYear()} Klo: ${time.getHours()}`,
        korkeus: item.SeaLevel, 
      }
    });

    this.data = convertedData
  }

  public createRenderRoot() {
    return this;
  }

  @state()
  private data: SealevelForecastData[] | null = null; 
}