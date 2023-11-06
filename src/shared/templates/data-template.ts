import { TemplateResult, html } from "lit-html";
import { DataByWeekday } from "../types/sharedTypes";
import { calculateCompassDirection } from "../sharedFunctions";

export function getDataTemplate(data: DataByWeekday[]): TemplateResult {
    if (!data) return html ``;
    return html `
        <p>
            ${data.map((item) => {
                return  html `
                    <h3 class="time">Klo: ${item.time}</h3>
                    ${getSealevelTemplate(item.heightN2000, item.height)}
                    <div class="circle-container">
                        ${getTemperatureTemplate(item.Temperature)}
                        ${getWindTemplate(item.WindSpeedMS, item.HourlyMaximumGust)}
                        <div class="circle-img">
                            <div class="medium-font">
                                ${GetCompassDirection(item.WindDirection)}
                            </div>
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

function getSealevelTemplate(n2000: number, average: number): TemplateResult {
    return html `
    <div class="sealevel-container">
        <div>N2000: ${n2000} cm</div>
        <div>Keskivesi: ${average} cm</div>
    </div>
    `;
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
    const temperatureClass = getTemperatureClass(temperature);
    return html `
        <div class="circle-img ${temperatureClass}">
            ${temperature} \u00B0C
        </div>
    `;
}

function getTemperatureClass(temperature: number): string {
    if (temperature > 25) return 'hot';
    if (temperature > 15) return 'warm';
    if (temperature > 5) return 'chilly';
    if (temperature > 0) return 'cool';
    if (temperature < 0) return 'cold';
    return '';
}