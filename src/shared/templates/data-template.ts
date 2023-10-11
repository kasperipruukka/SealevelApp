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
                    
                    Klo: ${item.time}
                    <br /><br />

                    Vedenkorkeus
                    <br /> 
                    N2000: ${item.heightN2000} cm
                    <br /> 
                    Keskivesi: ${item.height} cm
                    <br /><br />

                    Muu sää:
                    <br />
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