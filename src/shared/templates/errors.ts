import { TemplateResult, html } from "lit-html";

export function getDataFetchErrorTemplate(): TemplateResult {
    return html `${DatanHakuEpaonnistuiMsg}`;
}

const DatanHakuEpaonnistuiMsg: string = 'Datan haku epäonnistui.';