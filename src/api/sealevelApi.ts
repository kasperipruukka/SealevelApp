import wretch  from 'wretch';
import { customElement, LitElement, state } from "lit-element";
import { LoadingState } from "src/shared/enums/loadingState";
import { addDays } from "src/shared/sharedFunctions";
import { ApiData, ApiSealevelData } from 'src/shared/types/apiData';
import { PresentFuture } from 'src/shared/enums/days';

@customElement('api-element')
export class SealevelApi extends LitElement {

    constructor() {
        super();
    }
    
    // Loads API data from Ilmatieteenlaitos.
    async loadDataAsync(): Promise<void> {
    this.loading = LoadingState.Loading;

    // Yesterdays time.
    const startTime = Math.round((new Date().getTime() / 1000) - 3600);
    // End of the week.
    const endTime = Math.round((addDays(new Date(), 7).getTime() / 1000));
    
    const url = `https://www.ilmatieteenlaitos.fi/api/weather/sealevelgraphs?geoid=-10022816&fctstarttime=${startTime}&fctendtime=${endTime}&fcttimestep=60`;

    const result = await wretch()
      .get(url)
      .json()
      .finally(() => this.loading = LoadingState.Finished) as ApiData;

    if (!result) return;

    const presentData = await this.convertPresentApiDataAsync(result);
    const futureData = await this.convertFutureApiDataAsync(result);

    if (!futureData || !presentData) return;

    this.futureData = futureData;
    this.presentData = presentData;
  }

  // Converts API data.
  async convertApiDataAsync(apiData: ApiData, day: PresentFuture) {
    const { fctData: data} = apiData;

    switch (day) {
      case PresentFuture.Present:
        const { "1": presentData } = Object.entries(data).flat() as [string, ApiSealevelData[]];
        if (!presentData) return [];     
        return presentData;  

      case PresentFuture.Future:
        const { "1": futureData } = Object.entries(data).flat() as [string, ApiSealevelData[]];
        if (!futureData) return [];
        return futureData;

      default:
        return [];
    }
  }

  // Converts present time data.
  async convertPresentApiDataAsync(apiData: ApiData): Promise<ApiSealevelData[]> {
    if (!apiData) return [];
    const data = await this.convertApiDataAsync(apiData, PresentFuture.Present)

    const presentData = data.filter((item: any) => { 
      return new Date(item.epochtime * 1000).getHours() === new Date().getHours()
        && new Date(item.epochtime * 1000).getDay() === new Date().getDay()
    });

    return presentData;
  }

  // Converts future time data.
  async convertFutureApiDataAsync(apiData: ApiData): Promise<ApiSealevelData[]> {
    if (!apiData) return [];
    const data = await this.convertApiDataAsync(apiData, PresentFuture.Future)

    const futureData = data.filter((item: any) => { 
      return new Date(item.epochtime * 1000) > new Date()
    });

    return futureData;
  }

  @state()
  public loading: LoadingState | null = null;

  @state()
  public futureData: any[] | null = null; 

  @state()
  public presentData: any[] | null = null;
}