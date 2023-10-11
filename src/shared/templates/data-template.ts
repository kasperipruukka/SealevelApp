import { TemplateResult, html } from "lit-html";
import { getDataFetchErrorTemplate } from "./errors";
import { DataByWeekday } from "../types/sharedTypes";

export function getDataTemplate(data: DataByWeekday[]): TemplateResult {
    if (!data) return getDataFetchErrorTemplate();
    return html `
        <p>
            ${data.map((item) => {
                return  html `
                    <hr>

                    <h5>Klo: ${item.time}</h5>

                    <h5>Vedenkorkeus</h5>
                        N2000: ${item.heightN2000} cm
                        <br />
                        Keskivesi: ${item.height} cm
                        <br /><br />

                    <h5>Muu sää:</h5>
                        Lämpötila: ${item.Temperature}
                        <br />
                        Tuulta: ${item.WindSpeedMS} m/s
                        <br />
                        Tuulen puuska: ${item.HourlyMaximumGust} m/s
                        <br />
                        Tuulen suunta: ${item.WindDirection}
                        <br /><br />
                    
                    <hr>
                `;
            })}
        </p>
    `;
}