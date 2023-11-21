import { TemplateResult, html } from "lit-html";
import { DataByWeekday } from "../types/sharedTypes";
import { calculateCompassDirection } from "../sharedFunctions";

export function getDataTemplate(data: DataByWeekday[]): TemplateResult {
    if (!data) return html ``;
    return html `
        <p>
            ${data.map((item) => {
                return  html `
                    ${getTimeTemplate(item.weekday, item.time)}
                    ${getSealevelTemplate(item.heightN2000)}
                    <div class="circle-container">
                        ${getTemperatureTemplate(item.Temperature)}
                        ${getWindTemplate(item.WindSpeedMS, item.HourlyMaximumGust)}
                        ${getWindDirectionTemplate(item.WindDirection, item.HourlyMaximumGust)}
                    </div>
                `;
            })}
        </p>
    `;
}

function getTimeTemplate(weekday: string, time: number): TemplateResult {
    const hours = time.toString().padStart(2, '0');

    return html `
        <h3 class="time white">
            ${weekday}
            <br />
            ${hours}:00
        </h3>
    `;
}

function getSealevelTemplate(sealevel: number): TemplateResult {
    const sealevelClass = getNumberColor(sealevel);
    
    return html `
        <div class="sealevel-master-container">
            <div class="large-circle-img">
                <div class="sealevel-container">
                    <div class="small-font gray">
                        N2000
                    </div>
                    <div>
                        <span class="xlarge-font ${sealevelClass}">${sealevel}</span> <span class="xlarge-font">cm</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getWindTemplate(windSpeed: number, gust: number): TemplateResult {
    const windClass = getNumberColor(windSpeed);
    const gustClass = getNumberColor(gust);
    
    return html `
        <div class="circle-img windContainer">
            <div>
                <span class="large-font ${windClass}">${windSpeed}</span> <span class="large-font">m/s</span>
            </div>
            <div>  
                <span class="medium-font gray small-padding">(</span><span class="large-font ${gustClass}">${gust}</span> <span class="large-font">m/s</span><span class="medium-font gray small-padding">)</span>
            </div>
        </div>
    `;
}

function getTemperatureTemplate(temperature: number): TemplateResult {
    const temperatureClass = getNumberColor(temperature);

    return html `
        <div class="circle-img large-font">
            <span class="${temperatureClass}">${temperature}</span>
            &nbsp;
            <span>\u00B0C</span>
        </div>
    `;
}

function getWindDirectionTemplate(direction: number, gust: number): TemplateResult {
    const windDirection = GetCompassDirection(direction);
    const arrowColor = getNumberColor(gust);

    return html `
        <div class="circle-img wind-direction-container">
            <span class="large-font">${windDirection}</span>
            <span class="xlarge-font ${arrowColor}">${getWindDirectionArrow(windDirection)}</span>
        </div>
    `
}

// Pohjoinen 350 tai 0, Länsi 262,5, Etelä 175, Itä 87,5, Koillinen 43,75, Kaakko 131,25, Lounas 218,75, Luode 306,25
function GetCompassDirection(windDirection: number): string {
    return calculateCompassDirection(windDirection);
}

function getWindDirectionArrow(windDirection: string): string {
    const direction = windDirection.toLowerCase(); // Muutetaan suunta pieniksi kirjaimiksi

    switch (direction) {
        case 'pohjoinen':
            return '↓'; // Pohjoinen
        case 'koillinen':
            return '↙'; // Koillinen
        case 'itä':
            return '←'; // Itä
        case 'kaakko':
            return '↖'; // Kaakko
        case 'etelä':
            return '↑'; // Etelä
        case 'lounas':
            return '↗'; // Lounas
        case 'länsi':
            return '→'; // Länsi
        case 'luode':
            return '↘'; // Luode
        default:
            return '?';
    }
}

function getNumberColor(n: number): string {
    if (n >= 30) return 'super-hot';
    if (n > 25) return 'hot';
    if (n > 15) return 'warm';
    if (n > 5) return 'chilly';
    if (n > 0) return 'cool';
    if (n <= 0) return 'cold';
    if (n < -15) return 'extra-cold';
    if (n < -30) return 'super-cold';
    return '';
}