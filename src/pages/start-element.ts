import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement, state } from 'lit-element';
import './saa-element.js'
import { getElementWithAnimation, hideElementWithAnimation } from 'src/shared/sharedFunctions.js';
import { CityBaseType, DisplayCityName, DisplayAreaName } from 'src/shared/enums/locations.js';


@customElement('start-element')
export class StartElement extends LitElement {
    render() {
        return html`
            ${this.getStartTemplate()}
        `;
    }

    private getStartTemplate(): TemplateResult {
        return html `
            <div id="start-wrapper">
                <div class="search-icon-container ${this.isSearchActive ? 'search-active' : ''}">
                    <div class="trash-can cursor-pointer ${this.isSearchActive ? 'search-active' : ''}" @click="${() => this.emptyInput()}">
                        ${this.isSearchActive ? html `<i class="fa-regular fa-trash-can fa-xl"></i>` : html ``}
                    </div>
                    <div class="search-input-container ${this.isSearchActive ? 'd-flex' : 'd-none'}">
                        <input
                            id="search-input" 
                            type="text"
                            class="search-input"
                            @input="${(e: CustomEvent) => this.handleSearchInput(e)}" 
                        />
                    </div>
                    <div class="cursor-pointer search-icon ${this.isSearchActive ? 'search-active' : ''}" @click="${() => this.toggleSearchMode()}">
                        ${this.isSearchActive ? html `<i class="text-danger fa-solid fa-xmark fa-2xl"></i>` : html `<i class="fas fa-search fa-lg"></i>`}
                    </div>

                </div>
                <div class="start-heading">
                    <h1>Meriveden korkeus</h1>
                    <h2>Valitse sääasema</h2>
                </div>
                <div id="city-selection-container">
                    ${this.doesMatchSearch(DisplayCityName.Föglö) || this.doesMatchSearch(DisplayAreaName.Föglö)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Föglö')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Föglö as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Föglö as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                        
                    ${this.doesMatchSearch(DisplayCityName.Hamina) || this.doesMatchSearch(DisplayAreaName.Hamina)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Hamina')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Hamina as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Hamina as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Hanko) || this.doesMatchSearch(DisplayAreaName.Hanko)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Hanko')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Hanko as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Hanko as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Helsinki) || this.doesMatchSearch(DisplayAreaName.Helsinki)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Helsinki')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Helsinki as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Helsinki as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Kaskinen) || this.doesMatchSearch(DisplayAreaName.Kaskinen)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Kaskinen')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Kaskinen as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Kaskinen as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Kemi) || this.doesMatchSearch(DisplayAreaName.Kemi)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Kemi')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Kemi as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Kemi as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Oulu) || this.doesMatchSearch(DisplayAreaName.Oulu)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Oulu')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Oulu as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Oulu as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Pietarsaari) || this.doesMatchSearch(DisplayAreaName.Pietarsaari)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Pietarsaari')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Pietarsaari as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Pietarsaari as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Pori) || this.doesMatchSearch(DisplayAreaName.Pori)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Pori')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Pori as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Pori as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Porvoo) || this.doesMatchSearch(DisplayAreaName.Porvoo)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Porvoo')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Porvoo as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Porvoo as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Raahe) || this.doesMatchSearch(DisplayAreaName.Raahe)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Raahe')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Raahe as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Raahe as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Rauma) || this.doesMatchSearch(DisplayAreaName.Rauma)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Rauma')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Rauma as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Rauma as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Turku) || this.doesMatchSearch(DisplayAreaName.Turku)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Turku')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Turku as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Turku as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                    ${this.doesMatchSearch(DisplayCityName.Vaasa) || this.doesMatchSearch(DisplayAreaName.Vaasa)
                        ? html`
                            <a role="button" href="javascript:void(0);" class="button city-selection large-font" @click="${() => {this.getMainView('Vaasa')}}">
                                <h2><b>${DisplayCityName[CityBaseType.Vaasa as keyof typeof CityBaseType]}</b></h2>
                                <h4>${DisplayAreaName[CityBaseType.Vaasa as keyof typeof CityBaseType]}</h4>
                            </a>`
                        : html``}
                    
                </div>
            </div>
        `;
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
}
