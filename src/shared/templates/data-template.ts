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
                    <div class="circle-container">
                        ${getTemperatureTemplate(item.Temperature)}
                        ${getWindTemplate(item.WindSpeedMS, item.HourlyMaximumGust)}
                        <div class="circle-img">
                            <div class="small-font">${GetCompassDirection(item.WindDirection)}</div>
                        </div>
                    </div>
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

function getWindTemplate(windSpeed: number, gust: number): TemplateResult {
    return html `
        <div class="circle-img small-font windContainer">
            <div class="wind">${windSpeed} m/s</div>
            <div class="gust">${gust} m/s</div>
        </div>
    `;
}

function getTemperatureTemplate(temperature: number): TemplateResult {
    let temperatureClass = '';
    if (temperature > 25) temperatureClass = 'hot';
    if (temperature > 15) temperatureClass = 'warm';
    if (temperature > 5) temperatureClass = 'chilly';
    if (temperature > 0) temperatureClass = 'cool';
    if (temperature < 0) temperatureClass = 'cold';
    
    return html `
        <!-- <div class="circle-img ${temperatureClass}"> -->
        <div class="circle-img cool">
            ${temperature} \u00B0C
        </div>
    `;
}