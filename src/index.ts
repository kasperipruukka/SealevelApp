import { html, TemplateResult } from 'lit-html';
import { LitElement, customElement, css } from 'lit-element';
import './pages/saa-element.js';

@customElement('main-element')
export class Main extends LitElement {
  protected render(): TemplateResult {
    return html`
      <saa-element></saa-element>
    `;
  }

  public createRenderRoot() {
    return this;
  }
}