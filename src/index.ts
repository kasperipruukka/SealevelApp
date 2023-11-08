import { html, TemplateResult } from 'lit-html';
import { LitElement, customElement } from 'lit-element';
import './pages/start-element.js'


@customElement('main-element')
export class Main extends LitElement {
  protected render(): TemplateResult {
    return html`
      <start-element></start-element>
    `;
  }

  public createRenderRoot() {
    return this;
  }
}