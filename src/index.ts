import './partials/saa-element.ts';
import { LitElement } from '../node_modules/lit-element/lit-element';
import { html } from '../node_modules/lit-html/lit-html';
import {customElement} from '../node_modules/lit/decorators.js';

@customElement('main-element')
export class Main extends LitElement {
  protected render() {
    return html`
      <saa-element></saa-element>
    `;
  }
}