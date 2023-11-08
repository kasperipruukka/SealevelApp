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

        // Asetetaan aloitus-osio piiloon.
        startElement.style.display = 'none';

        // Luodaan pää-elementti ja lisätään se DOMiin.
        const mainElement = document.createElement('saa-element');
        this.appendChild(mainElement);
    }

    public createRenderRoot() {
        return this;
    }
}
