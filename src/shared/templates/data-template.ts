import { TemplateResult, html } from "lit-html";
import { DataByWeekday } from "../types/sharedTypes";
import { calculateCompassDirection } from "../sharedFunctions";

export function getDataTemplate(data: DataByWeekday[]): TemplateResult {
    if (!data) return html ``;
    return html `
        <p>
            ${data.map((item) => {
                return  html `
                    <h3>Klo: ${item.time}</h3>
                    
                    <!-- <p>Vedenkorkeus</p> -->
                    <p>
                        N2000: ${item.heightN2000} cm
                        <br />
                        Keskivesi: ${item.height} cm 
                    </p>

                    <!-- <p>Muu sää</p> -->
                    <p>
                        ${item.Temperature} \u00B0C
                        <br />
                        Tuulta: ${item.WindSpeedMS} m/s
                        <br />
                        Tuulen puuska: ${item.HourlyMaximumGust} m/s
                        <br />
                        Tuulen suunta: ${GetCompassDirection(item.WindDirection)}
                    </p>  
                    <hr>
                `;
            })}
        </p>
    `;
}

// Pohjoinen 350 tai 0, Länsi 262,5, Etelä 175, Itä 87,5, Koillinen 43,75, Kaakko 131,25, Lounas 218,75, Luode 306,25
function GetCompassDirection(windDirection: number): string {
    return calculateCompassDirection(windDirection);
}