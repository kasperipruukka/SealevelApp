import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement, PropertyValues, state } from 'lit-element';
import './saa-element.js'
import { getElementWithAnimation, hideElementWithAnimation } from 'src/shared/sharedFunctions.js';
import { CityBaseType, DisplayCityName, DisplayAreaName } from 'src/shared/enums/locations.js';
import { CityData } from 'src/types/types.js';


@customElement('start-element')
export class StartElement extends LitElement {
    
    protected firstUpdated(_changedProperties: PropertyValues): void {
        // Haetaan localStoragesta suosikit.
        const storedFavourites = localStorage.getItem('favouriteCities');
        
        if (storedFavourites) {
            // Muutetaan tallennettu JSON takaisin taulukoksi ja asetetaan se favouriteCities-muuttujaan.
            this.favouriteCities = JSON.parse(storedFavourites);
        }
    }    

    render() {
        return html`
            ${this.getStartTemplate()}
        `;
    }

    private getStartTemplate(): TemplateResult {
        return html `
            <div id="start-wrapper">
                <div class="start-heading">
                    <h1>Meriveden korkeus</h1>
                    <h2>Valitse sääasema</h2>
                </div>
                <div class="search-icon-container ${this.isSearchActive ? 'search-active' : ''}">
                    <div class="search-input-container ${this.isSearchActive ? 'd-flex' : 'd-none'}">
                        <input
                            id="search-input" 
                            type="text"
                            class="search-input"
                            @input="${(e: CustomEvent) => this.handleSearchInput(e)}" 
                        />
                    </div>
                    <div class="search-icon cursor-pointer ${this.isSearchActive ? 'search-active' : 'p-5'}" @click="${() => this.toggleSearchMode()}">
                        ${this.isSearchActive ? html `<i class="text-danger fa-solid fa-xmark fa-xl"></i>` : html `<i class="fas fa-search fa-lg"></i>`}
                    </div>
                </div>
                <div id="city-selection-container">
                    ${this.renderAllCities()}                           
                </div>
            </div>
        `;
    }

    private renderAllCities() {
        // Järjestä kaupungit siten, että suosikit ovat ensin.
        const sortedCities = [...this.cities].sort((a, b) => {
            const aIsFavourite = this.isCityInFavourites(a.baseType);
            const bIsFavourite = this.isCityInFavourites(b.baseType);
    
            // Jos a on suosikki ja b ei ole, sijoita a ensin.
            if (aIsFavourite && !bIsFavourite) return -1;
            // Jos b on suosikki ja a ei ole, sijoita b ensin.
            if (!aIsFavourite && bIsFavourite) return 1;
            
            // Jos molemmat tai kumpikaan ei ole suosikki, pidä alkuperäinen järjestys.
            return 0;
        });
    
        return html`
            <div id="city-selection-container">
                ${sortedCities.map(city => this.renderCity(city))}
            </div>
        `;
    }
    

    private renderCity(city: CityData) {
        if (this.doesMatchSearch(city.name) || this.doesMatchSearch(city.area)) {
            return html`
                <div class="city-container d-flex flex-row align-items-center w-100">
                    <div class="favourite-container">
                        <div class="favourite" @click="${() => this.toggleFavourite(city.baseType)}">
                            ${this.isCityInFavourites(city.baseType)
                                ? html `<i class="fa-solid fa-star fa-lg"></i>`
                                : html `<i class="fa-regular fa-star fa-lg"></i>`}
                        </div>
                    </div>
                    <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView(city.name)}}">
                        <h2><b>${city.name}</b></h2>
                        <h4>${city.area}</h4>
                    </a>
                </div>
            `;
        }
        return html``;
    } 

    private isCityInFavourites(city: CityBaseType): boolean {
        return this.favouriteCities.includes(city);
    }

    private toggleFavourite(city: CityBaseType) {
        setTimeout(() => {
            if (this.isCityInFavourites(city)) {
                // Jos kaupunki on jo suosikeissa, poistetaan se.
                this.favouriteCities = this.favouriteCities.filter(favCity => favCity !== city);

                // Tallennetaan päivitetty suosikkilista localStorageen.
                localStorage.setItem('favouriteCities', JSON.stringify(this.favouriteCities));
            } 
            else {
                // Jos kaupunki ei ole suosikeissa, lisätään se.
                this.favouriteCities = [...this.favouriteCities, city];

                // Tallennetaan päivitetty suosikkilista localStorageen.
                localStorage.setItem('favouriteCities', JSON.stringify(this.favouriteCities));
            }
        }, 100);
    }

    private toggleSearchMode() {
        const inputField = document.getElementById('search-input') as HTMLInputElement;
        if (!inputField) return;
        
        this.isSearchActive = !this.isSearchActive;
        if (this.isSearchActive){
            setTimeout(() => {
                inputField.focus();
                inputField.select();
            }, 100);
        }
        else {
            this.emptyInput();
        }
    }

    /**
     * Tarkastaa, että vastaako tieto hakutermiä.
     * @param value Arvo, johon hakutermiä verrataan.
     * @returns Palauttaa true, jos tieto vastaa hakutermiä, muuten false.
     */
    private doesMatchSearch(value: string): boolean {
        return value.toLowerCase().includes(this.searchTerm.toLowerCase());
    }

    private handleSearchInput(e: CustomEvent) {
        const target = e.target as HTMLInputElement;
        this.searchTerm = target.value;
    }

    private getMainView(selectedCity: string): void {
        const startElement = document.getElementById('start-wrapper');
        setTimeout(() => {
            hideElementWithAnimation(startElement, 'slide-out-to-left');
        }, 100);

        const mainElementContent = document.getElementById('saa-wrapper');
        if (!mainElementContent) {
            setTimeout(() => {
                this.createMainView(selectedCity);
            }, 600);
        }
        else {
            setTimeout(() => {
                getElementWithAnimation(mainElementContent, 'slide-in-from-right');
                this.setCurrentCity(selectedCity);
            }, 600);
        }
    }

    private emptyInput() {
        const inputField = document.getElementById('search-input') as HTMLInputElement;
        if (!inputField) return;

        this.searchTerm = '';
        inputField.value = '';
    }

    private setCurrentCity(selectedCity: string): void {
        const mainElement = document.querySelector('saa-element');
        if (!mainElement) {
            console.log('Could not find element.');
            return;
        }
        mainElement.setAttribute('currentcity', `${selectedCity}`);
    }

    private createMainView(selectedCity: string): void {
        const mainElement = this.createMainElement(selectedCity);
        this.appendChild(mainElement);
    }

    private createMainElement(selectedCity: string): HTMLElement {
        const mainElement = document.createElement('saa-element');
        mainElement.setAttribute('currentcity', `${selectedCity}`);
        return mainElement;
    }

    public createRenderRoot() {
        return this;
    }

    @state()
    private searchTerm: string = '';

    @state()
    private isSearchActive: boolean = false;

    @state()
    private favouriteCities: Array<CityBaseType> = [];

    private readonly cities: CityData[] = [
        { name: DisplayCityName.Föglö, area: DisplayAreaName.Föglö, baseType: CityBaseType.Föglö },
        { name: DisplayCityName.Hamina, area: DisplayAreaName.Hamina, baseType: CityBaseType.Hamina },
        { name: DisplayCityName.Hanko, area: DisplayAreaName.Hanko, baseType: CityBaseType.Hanko },
        { name: DisplayCityName.Helsinki, area: DisplayAreaName.Helsinki, baseType: CityBaseType.Helsinki },
        { name: DisplayCityName.Kaskinen, area: DisplayAreaName.Kaskinen, baseType: CityBaseType.Kaskinen },
        { name: DisplayCityName.Kemi, area: DisplayAreaName.Kemi, baseType: CityBaseType.Kemi },
        { name: DisplayCityName.Oulu, area: DisplayAreaName.Oulu, baseType: CityBaseType.Oulu },
        { name: DisplayCityName.Pori, area: DisplayAreaName.Pori, baseType: CityBaseType.Pori },
        { name: DisplayCityName.Porvoo, area: DisplayAreaName.Porvoo, baseType: CityBaseType.Porvoo },
        { name: DisplayCityName.Raahe, area: DisplayAreaName.Raahe, baseType: CityBaseType.Raahe },
        { name: DisplayCityName.Rauma, area: DisplayAreaName.Rauma, baseType: CityBaseType.Rauma },
        { name: DisplayCityName.Turku, area: DisplayAreaName.Turku, baseType: CityBaseType.Turku },
        { name: DisplayCityName.Vaasa, area: DisplayAreaName.Vaasa, baseType: CityBaseType.Vaasa },        
    ]
}
