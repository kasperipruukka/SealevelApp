import { html, TemplateResult } from 'lit-html';
import { customElement, LitElement } from 'lit-element';
import './saa-element.js'


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
                        @click="${() => {this.getMainElement()}}">
                            Tahkoluoto
                    </div>
                    <div 
                        class="button city-selection large-font"
                        @click="${() => {this.getMainElement()}}">
                            Kylmäpihlaja
                    </div>
                </div>
            </div>
        `;
    }

    private getMainElement(): void {
        const startElement = document.getElementById('start-wrapper');
        if (!startElement) return;

        startElement.classList.add('slide-out-to-left');

        const self = this;
        setTimeout(function() {
            const mainElement = document.getElementById('saa-wrapper');
            if (mainElement) {
                mainElement.classList.add('slide-in-from-right');
                mainElement.style.display = 'block';

                startElement.style.display = 'none';
                setTimeout(function() {
                    mainElement.classList.remove('slide-in-from-right');
                    startElement.classList.remove('slide-out-to-left');
                }, 1000)
            } 
            else {
                // Luodaan pää-elementti ja lisätään se DOMiin.
                const mainElement = document.createElement('saa-element');
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
