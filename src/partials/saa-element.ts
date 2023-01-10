import { LitElement } from '../../node_modules/lit-element/lit-element';
import { html } from '../../node_modules/lit-html/lit-html';
import {customElement} from '../../node_modules/lit/decorators.js';

@customElement('saa-element')
export class Weather extends LitElement {
  protected render() {
    return html`
      <h3>Hello world, from the weather component!</h3>
    `;
  }
}