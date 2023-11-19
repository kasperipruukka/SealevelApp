import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement } from 'lit-element';
import './saa-element.js'
import { City } from 'src/shared/enums/citys.js';
import { getElementWithAnimation, hideElementWithAnimation } from 'src/shared/sharedFunctions.js';


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
                    <h1>Luvian meriveden korkeus</h1>
                    <h2>Valitse sääasema</h2>
                </div>
                <div id="city-selection-container">
                    <div 
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Pori')}}">
                            Tahkoluoto
                    </div>
                    <div 
                        class="button city-selection large-font"
                        @click="${() => {this.getMainView('Rauma')}}">
                            Kylmäpihlaja
                    </div>
                </div>
            </div>
        `;
    }

    private getMainView(selectedCity: string): void {
        const startElement = document.getElementById('start-wrapper');
        hideElementWithAnimation(startElement, 'slide-out-to-left');

        const mainElementContent = document.getElementById('saa-wrapper');
        if (!mainElementContent) {
            setTimeout(() => {
                this.createMainView(selectedCity);
            }, 300);
        }
        else {
            setTimeout(() => {
                getElementWithAnimation(mainElementContent, 'slide-in-from-right');
                this.setCurrentCity(selectedCity);
            }, 300);
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
