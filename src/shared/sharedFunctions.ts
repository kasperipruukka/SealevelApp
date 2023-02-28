import { html, TemplateResult } from "lit-html";

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