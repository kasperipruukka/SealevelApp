import { html, LitElement, customElement, TemplateResult } from 'lit-element';
import '../partials/saa-element.js';

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