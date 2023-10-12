import { Days } from "./enums/days";
import { html, TemplateResult } from "lit-html";
import { CompassDirection } from "./types/sharedTypes";

// GroupBy function
export function groupBy(xs: any, key: any) {
    return xs.reduce(function(rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
}

// Function to add days.
export function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// Function to add hours.
export function addHours(date: Date, hours: number) {
  var result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

// Is it winter or summertime? Returns integer 2 or 3.
export function finlandUTCHour(): 2 | 3 {
  return new Date().getTimezoneOffset() === 120 ? 2 : 3;
}

// Loading spinner.
export function getLoadingTemplate(): TemplateResult {
    return html `
      <div class="container">
        <div class="row vh-100">
          <div class="loader"></div>
        </div>
      </div>
    `;
  }

// Get finnish weekday.
export function getFinnishWeekday(day: number): string {
  switch (day) {
      case 0:
      return "sunnuntaina";
      case 1:
      return "maanantaina";
      case 2:
      return "tiistaina";
      case 3:
      return "keskiviikkona";
      case 4:
      return "torstaina";
      case 5:
      return "perjantaina";
      case 6:
      return "lauantaina";
      default:
      return "maanantaina";
  }
}

// Gives an Id for a collapse-item.
export function getCollapseId(day: Days): string {
  switch (day) {
    case Days.Present:
    return 'present-collapse';

    case Days.Today:
      return 'today-collapse';

    case Days.Tomorrow:
      return 'tomorrow-collapse';

    case Days.DayAfterTomorrow:
      return 'dayaftertomorrow-collapse';
    
    default:
      return '';
  }
}

/**
 * Calculates the nearest compass direction based on a numerical input.
 *
 * @param number The input number to determine the nearest compass direction.
 * @returns The nearest compass direction as a lowercase string ("north," "west," etc.).
 */
/**
 * Calculates the nearest compass direction based on a numerical input.
 *
 * @param number The input number to determine the nearest compass direction.
 * @returns The nearest compass direction as a lowercase string ("north," "west," etc.).
 */
export function calculateCompassDirection(number: number): string {
  const roundedNumber = Math.round(number);
  let nearestDirection: CompassDirection | null = null;
  let smallestDistance = Number.MAX_VALUE;

  for (const direction in CompassDirection) {
    const enumValue = CompassDirection[direction];
    if (typeof enumValue !== 'number' || enumValue > 350) continue;

    const distance = Math.abs(roundedNumber - enumValue);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      nearestDirection = enumValue;
    }
  }

  return nearestDirection ? CompassDirection[nearestDirection] : "Unknown direction";
}