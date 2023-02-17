import { html, customElement, LitElement } from 'lit-element';

@customElement('saa-element')
export class Weather extends LitElement {
  protected render() {
    return html`
      <h3>Tässä sääsovellus, joka toimii rollupilla.</h3>
    `;
  }
}