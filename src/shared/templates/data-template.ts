import { TemplateResult, html } from "lit-html";
import { getDataFetchErrorTemplate } from "./errors";
import { CompassDirection, DataByWeekday } from "../types/sharedTypes";
import { calculateCompassDirection } from "../sharedFunctions";

export function getDataTemplate(data: DataByWeekday[]): TemplateResult {
    if (!data) return getDataFetchErrorTemplate();
    return html `
        <p>
            ${data.map((item) => {
                return  html `
                    <h5>Klo: ${item.time}</h5>

                    <h5>Vedenkorkeus</h5>
                        N2000: ${item.heightN2000} cm
                        <br />
                        Keskivesi: ${item.height} cm
                        <br /><br />

                    <h5>Muu sää:</h5>
                        ${item.Temperature} \u00B0C
                        <br />
                        Tuulta: ${item.WindSpeedMS} m/s
                        <br />
                        Tuulen puuska: ${item.HourlyMaximumGust} m/s
                        <br />

                        <!-- Pohjoinen 350 tai 0, Länsi 262,5, Etelä 175, Itä 87,5  -->
                        <!-- Koillinen 43,75, Kaakko 131,25, Lounas 218,75, Luode 306,25, -->
                        Tuulen suunta: ${GetCompassDirection(item.WindDirection)}
                        <br /><br />
                    
                    <hr>
                `;
            })}
        </p>
    `;
}

function GetCompassDirection(windDirection: number): string {
    return calculateCompassDirection(windDirection);
}