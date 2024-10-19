import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement } from 'lit-element';
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
                <div class="start-heading">
                    <h1>Meriveden korkeus</h1>
                    <h2>Valitse sääasema</h2>
                </div>
                <div id="city-selection-container">
                    <a
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Föglö')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Föglö as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Föglö as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Hamina')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Hamina as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Hamina as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Hanko')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Hanko as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Hanko as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Helsinki')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Helsinki as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Helsinki as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Kaskinen')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Kaskinen as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Kaskinen as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Kemi')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Kemi as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Kemi as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Oulu')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Oulu as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Oulu as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Pietarsaari')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Pietarsaari as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Pietarsaari as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a 
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Pori')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Pori as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Pori as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a 
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font"
                        @click="${() => {this.getMainView('Porvoo')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Porvoo as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Porvoo as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a 
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font"
                        @click="${() => {this.getMainView('Raahe')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Raahe as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Raahe as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a 
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font"
                        @click="${() => {this.getMainView('Rauma')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Rauma as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Rauma as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a 
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font"
                        @click="${() => {this.getMainView('Turku')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Turku as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Turku as keyof typeof CityBaseType]}</h4>
                    </a>
                    <a 
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font"
                        @click="${() => {this.getMainView('Vaasa')}}">
                        <h2><b>${DisplayCityName[CityBaseType.Vaasa as keyof typeof CityBaseType]}</b></h2>
                        <h4>${DisplayAreaName[CityBaseType.Vaasa as keyof typeof CityBaseType]}</h4>
                    </a>
                </div>
            </div>
        `;
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
}
