import { html } from 'lit-html';
import { customElement, LitElement } from 'lit-element';

@customElement('saa-element')
export class Weather extends LitElement {
  protected render() {
    return html`
      <h1>Rakennetaan mahtava sovellus!</h1>
    `;
  }

  public createRenderRoot() {
    return this;
  }
}