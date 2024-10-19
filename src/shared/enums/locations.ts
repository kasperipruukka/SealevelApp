/**
    Pohjatason määrittely.
 */
export enum CityBaseType {
    Kemi = 'Kemi',
    Oulu = 'Oulu',
    Raahe = 'Raahe',
    Pietarsaari = 'Pietarsaari',
    Vaasa = 'Vaasa',
    Kaskinen = 'Kaskinen',
    Pori = 'Pori',
    Rauma = 'Rauma',
    Turku = 'Turku',
    Föglö = 'Föglö',
    Hanko = 'Hanko',
    Helsinki = 'Helsinki',
    Porvoo = 'Porvoo',
    Hamina = 'Hamina'
}

/**
    Käytetään paikkatietojen esittämiseen käyttöliittymässä.
    Kaupungin nimi.
 */
export enum DisplayCityName {
    Kemi = 'Kemi',
    Oulu = 'Oulu',
    Raahe = 'Raahe',
    Pietarsaari = 'Pietarsaari',
    Vaasa = 'Vaasa',
    Kaskinen = 'Kaskinen',
    Pori = 'Pori',
    Rauma = 'Rauma',
    Turku = 'Turku',
    Föglö = 'Föglö',
    Hanko = 'Hanko',
    Helsinki = 'Helsinki',
    Porvoo = 'Porvoo',
    Hamina = 'Hamina'
}

/**
    Käytetään paikkatietojen esittämiseen käyttöliittymässä.
    Tarkentava nimi sijainnille.
 */
export enum DisplayAreaName {
    Kemi = 'Ajos',
    Oulu = 'Toppila',
    Raahe = 'Lapaluoto',
    Pietarsaari = 'Pietarsaari, Leppäluoto',
    Vaasa = 'Vaskiluoto',
    Kaskinen = 'Ådskär',
    Pori = 'Tahkoluoto',
    Rauma = 'Kylmäpihlaja',
    Turku = 'Ruissalo, Saaronniemi',
    Föglö = 'Degerby',
    Hanko = 'Pikku Kolalahti',
    Helsinki = 'Kaivopuisto',
    Porvoo = 'Emäsalo, Vaarlahti',
    Hamina = 'Pitäjänsaari'
}

/**
    Käytetään paikkakunnan vedenkorkeuden selvittämisessä.
 */
export enum LocationGeoId {
    Kemi = '-100539',
    Oulu = '-10022818',
    Raahe = '-100540',
    Pietarsaari = '-10022819',
    Vaasa = '-10022815',
    Kaskinen = '-10022820',
    Pori = '-10022824',
    Rauma = '-10022816',
    Turku = '-10022817',
    Föglö = '-10022821',
    Hanko = '-10022822',
    Helsinki = '-10022814',
    Porvoo = '-100669',
    Hamina = '-10022823'
}

/**
    Käytetään paikkakunnan sään selvittämisessä.
 */
export enum ForecastLocation {
    Kemi = 'kemi',
    Oulu = 'oulu',
    Raahe = 'raahe',
    Pietarsaari = 'pietarsaari',
    Vaasa = 'vaasa',
    Kaskinen = 'kaskinen',
    Pori = 'tahkoluoto&area=pori',
    Rauma = 'kylmäpihlaja&area=rauma',
    Turku = 'turku',
    Föglö = 'f%C3%B6gl%C3%B6',
    Hanko = 'hanko',
    Helsinki = 'helsinki',
    Porvoo = 'porvoo',
    Hamina = 'hamina'
}

/**
    Käytetään sään havaintodatan selvittämisessä.
 */
export enum ObservationLocation {
    Kemi = '101840',
    Oulu = '108040',
    Raahe = '101785',
    Pietarsaari = '101660',
    Vaasa = '101485',
    Kaskinen = '101256',
    Pori = '101267',
    Rauma = '101061',
    Turku = '100949',
    Föglö = '151048',
    Hanko = '100946',
    Helsinki = '100971',
    Porvoo = '101028',
    Hamina = '101030'
}