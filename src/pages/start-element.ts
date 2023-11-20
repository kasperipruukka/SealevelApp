import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement } from 'lit-element';
import './saa-element.js'
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
                    <a 
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font" 
                        @click="${() => {this.getMainView('Pori')}}">
                            <h2>Tahkoluoto</h2>
                    </a>
                    <a 
                        role="button"
                        href="javascript:void(0);"
                        class="button city-selection large-font"
                        @click="${() => {this.getMainView('Rauma')}}">
                            <h2>Kylmäpihlaja</h2>    
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
