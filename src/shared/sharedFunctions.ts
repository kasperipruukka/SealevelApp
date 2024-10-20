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
      return "sunnuntai";
      case 1:
      return "maanantai";
      case 2:
      return "tiistai";
      case 3:
      return "keskiviikko";
      case 4:
      return "torstai";
      case 5:
      return "perjantai";
      case 6:
      return "lauantai";
      default:
      return "maanantai";
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
 * Laskee lähimmän ilmansuunnan numerollisen syötteen perusteella.
 *
 * @param number Syötenumero, jolla määritetään lähin ilmansuunta.
 * @returns Lähin ilmansuunta pienellä kirjoitettuna merkkijonona ("pohjoinen", "länsi", jne.).
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
      nearestDirection = enumValue as CompassDirection;
    }
  }

  return nearestDirection !== null ? CompassDirection[nearestDirection] : 'virhe';
}

/**
 * Piilottaa halutun elementin ja näyttää animaation.
 * @param element 
 * @param animation 
 */
export function hideElementWithAnimation(element: HTMLElement | null, animation: string): void {
  if (!element || !animation) {
    console.log('Could not find element.');
    return;
  }
  
  element.classList.add(animation);
  setTimeout(() => {
    element.classList.remove(animation);
    element.style.display = 'none';
  }, 100);
}


/**
 * Hakee halutun elementin ja näyttää animaation.
 * @param element 
 * @param animation 
 */
export function getElementWithAnimation(element: HTMLElement | null, animation: string, displayType?: string): void {
  if (!element || !animation)  {
    console.log('Could not find element.');
    return;
  }

  element.classList.add(animation);
  element.style.display = displayType ?? 'block';
  setTimeout(() => {
    element.classList.remove(animation);
  }, 800);
}

/**
 * Tarkistaa, onko objektissa liikaa null-arvoisia propertyjä.
 * @param obj Tarkasteltava objekti.
 * @param threshold Kynnysarvo, jonka ylittyessä objekti katsotaan vialliseksi.
 * @returns Palauttaa true, jos objekti on viallinen, muuten false.
 */
export function isObjIncomplete(obj: object, threshold: number): boolean {
  const eiNullPropertys = Object.values(obj).filter((value) => value == null); 
  return eiNullPropertys.length > threshold;
}