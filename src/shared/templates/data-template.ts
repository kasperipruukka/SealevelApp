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
                    <p>
                        N2000: ${item.heightN2000} cm
                        <br />
                        Keskivesi: ${item.height} cm 
                    </p>
                    <p>
                        <span class="circle-img">${item.Temperature} \u00B0C</span>
                        <span class="circle-img">${item.WindSpeedMS} m/s</span>
                        <span class="circle-img">${item.HourlyMaximumGust} m/s</span>
                        <span class="circle-img">
                            <span class="arrow ${getArrowClass(GetCompassDirection(item.WindDirection))}"></span>
                            <span class="small-font">${GetCompassDirection(item.WindDirection)}</span>
                        </span>
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

function getArrowClass(direction: string): string {
    switch (direction) {
        case "Pohjoinen":
            return 'arrow-up';
        case "Länsi":  
            return 'arrow-left';
        case "Etelä":
            return 'arrow-down';
        case "Itä":  
            return 'arrow-right';
        case "Koillinen":
            return 'arrow-northeast';
        case "Kaakko":  
            return 'arrow-southeast';
        case "Lounas":
            return 'arrow-southwest';
        case "Luode":  
            return 'arrow-northwest';
        default:
            return ''
    }
}