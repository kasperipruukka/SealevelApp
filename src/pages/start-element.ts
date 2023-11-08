import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement } from 'lit-element';
import './saa-element.js'
import { City } from 'src/shared/enums/citys.js';


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
                        @click="${() => {this.getMainElement('Pori')}}">
                            Tahkoluoto
                    </div>
                    <div 
                        class="button city-selection large-font"
                        @click="${() => {this.getMainElement('Rauma')}}">
                            Kylmäpihlaja
                    </div>
                </div>
            </div>
        `;
    }

    private getMainElement(selectedCity: string): void {
        const startElement = document.getElementById('start-wrapper');
        if (!startElement) return;

        startElement.classList.add('slide-out-to-left');

        const self = this;
        setTimeout(function() {
            const mainElement = document.getElementById('saa-wrapper');
            if (mainElement) {
                startElement.style.display = 'none';
                const saaElement = document.querySelector('saa-element');
                if (!saaElement) return;

                saaElement.setAttribute('currentcity', `${selectedCity}`);

                mainElement.classList.add('slide-in-from-right');
                mainElement.style.display = 'block';
                setTimeout(function() {
                    mainElement.classList.remove('slide-in-from-right');
                    startElement.classList.remove('slide-out-to-left');
                }, 1000)
            } 
            else {
                // Luodaan pää-elementti ja lisätään se DOMiin.
                const mainElement = document.createElement('saa-element');
                mainElement.setAttribute('currentcity', `${selectedCity}`);
                self.appendChild(mainElement);
                

                startElement.style.display = 'none';
                startElement.classList.remove('slide-out-to-left');
                startElement.classList.add('slide-in-from-left');
            }
          }, 500);
    }

    public createRenderRoot() {
        return this;
    }
}
